// ** React Imports
import React, { Fragment, useEffect, useState } from 'react'

// ** Reactstrap Imports
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Row,
    Col,
    Input,
    Form,
    Button,
    Label,
    FormFeedback,
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    Badge,
    Container,
    InputGroup,
    InputGroupText,
    ListGroup,
    ListGroupItem
} from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import Select, { components } from "react-select"; //eslint-disable-line
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import parse from "html-react-parser";
import {
    AddSquare20Regular,
    AddCircle20Regular,
    Delete20Filled,
    Location20Filled,
    Delete20Regular,
    SearchRegular,
    CalendarLtr20Regular,
    Info24Regular,
    Info16Regular,
    Info16Filled,
    Flag24Filled,
    Attach24Filled,
    Pause24Regular,
    Play24Regular,
    RecordStop24Regular,
    BranchFork24Filled,
    TextDescription24Filled,
    TargetArrow24Filled,
    Delete24Filled,
    PersonClockFilled,
    ListFilled,
    Add24Filled,
    Add20Filled,
    Add16Filled,
    Edit16Filled
} from "@fluentui/react-icons";

// ** Styles Imports
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";

// ** Utils
import Avatar from "@components/avatar";
import { isObjEmpty, selectThemeColors } from "@utils";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { approvalCuti, cancelCuti, getCuti, getFWA, getSearchKaryawan, getTaskCuti, getNotifyCuti, postCuti, uploadLampiranCuti } from '../../../../api';
import TimelineCuti from '@components/timeline/cuti'
import EmptyCard from '@src/views/components/cards/empty';

import {
    categoryRequest,
    selectPermohonanId,
    setIsValidationModalYes,
    setIsPostApproved,
    setIsValidationModal
} from "../store";

import {
    getTasks,
    updateTask,
    selectTask,
    addTask,
    deleteTask,
    reOrderTasks,
    categoryTask,
    fetchLabels,
    setIsSidebarTask
} from '../../todo/store';

import moment from "moment";

import { FileText, X, DownloadCloud, MoreVertical } from 'react-feather'
import { SlideDown } from 'react-slidedown'
import SuccessModal from '../modals/SuccessModal';
import toastAlert from "@src/utils/alert";
import FileUploaderMultiple from '../../../forms/form-elements/file-uploader/FileUploaderMultiple';
import '@styles/react/libs/file-uploader/file-uploader.scss'
import CONFIG from '../../../../config/index'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { getUsernik } from '../../../../utils/storage';
import ValidationModal from '../modals/ValidationModal';
import TaskSidebar from '../../todo/TaskSidebar';

const MultipleColumnForm = () => {
    const navigate = useNavigate();
    const dataUserNik = getUsernik();
    const dispatch = useDispatch();
    const [listNotifications, setListNotifications] = React.useState([]);
    const [listJustification, setListJustification] = React.useState([]);
    const [confirmation, setConfirmation] = React.useState("");
    const [approvalDeskripsi, setApprovalDeskripsi] = React.useState("");
    // const [isNotValidModel, setIsNotValidModel] = React.useState(false);

    // ** States
    const selectedJenisCuti = useSelector((state) => state.request.selectedJenisCuti.selectedJenisCuti);
    const selectedRoleCode = useSelector((state) => state.request.selectedRoleCode.selectedRoleCode);
    const selectedRoleCodeAdv = useSelector((state) => state.request.selectedRoleCodeAdv.selectedRoleCodeAdv);
    const dataQuota = useSelector((state) => state.request.dataQuota.dataQuota);
    const cuper = useSelector((state) => state.request.cuper.cuper);
    const journeyStatus = useSelector((state) => state.request.journeyStatus.journeyStatus);
    const selectedPermohonanId = useSelector((state) => state.request.selectedPermohonanId.selectedPermohonanId);
    const category = useSelector((state) => state.request.category.category);
    const isValidationModal = useSelector((state) => state.request.isValidationModal.isValidationModal);
    const isValidationModalYes = useSelector((state) => state.request.isValidationModalYes.isValidationModalYes);
    const isPostApproved = useSelector((state) => state.request.isPostApproved.isPostApproved);

    //tugas
    const store = useSelector((state) => state.todo);
    const isSidebarTask = useSelector((state) => state.todo.isSidebarTask.isSidebarTask);
    const [sort, setSort] = useState("");
    const paramsURL = useParams();
    const params = {
        filter: paramsURL.filter || "",
        q: query || "",
        sortBy: sort || "",
        tag: paramsURL.tag || ""
    };

    function useQuery() {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();
    useEffect(() => {
        //  // console.log("ini id dari atas", query.get("id"))
    }, [1])

    // usestate
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [dateKeberangkatan, setDateKeberangkatan] = useState(new Date());
    // const [endDateKeberangkatan, setEndDateKeberangkatan] = useState(new Date());
    const [dateKepulangan, setDateKepulangan] = useState(new Date());
    // const [endDateKepulangan, setEndDateKepulangan] = useState(new Date());
    const [showSnakebar, setShowSnakebar] = React.useState(false);
    const [jumlahHariCuti, setJumlahHariCuti] = React.useState("");
    const [jumlahHariKeberangkatan, setJumlahHariKeberangkatan] = React.useState("");
    const [jumlahHariKepulangan, setJumlahHariKepulangan] = React.useState("");
    // const [jenisCuti, setJenisCuti] = React.useState("");
    const [cutiPerjalanan, setCutiPerjalanan] = React.useState(null);
    const [listDetailCuti, setListDetailCuti] = React.useState([]);
    const [listDocumentCuti, setListDocumentCuti] = React.useState({});
    const [listApprover, setListApprover] = React.useState([]);
    const [listNotifyCuti, setListNotifyCuti] = React.useState([]);
    const [listRoleCuti, setListRoleCuti] = React.useState({});
    const [listUserCuti, setListUserCuti] = React.useState({});
    const [alamatCuti, setAlamatCuti] = React.useState("");
    const [alasanCuti, setAlasanCuti] = React.useState("");
    const [telepon, setTelepon] = React.useState("");
    const [comment, setComment] = React.useState("");

    const [listLeader, setListLeader] = React.useState([]);
    // const [showAtasan, setShowAtasan] = React.useState(false);
    // const [showPartisipan, setShowPartisipan] = React.useState(false);
    const [listPartisipan, setListPartisipan] = React.useState([]);
    const [listNotificationPerson, setListNotificationPerson] = React.useState([]);
    const [keyword, setKeyword] = React.useState("");
    const [isExist, setIsExist] = React.useState(false);
    const [offset, setOffset] = React.useState(0);
    const [textModal, setTextModal] = React.useState("");
    const [listDataTask, setListDataTask] = useState([]);
    const [countDataTask, setCountDataTask] = useState(0);
    const [openTaskSidebar, setOpenTaskSidebar] = useState(false);
    const [editCuti, setEditCuti] = useState(false);
    const [idFromUrl, setIdFromUrl] = React.useState(window.location.href.split('/')[6]);

    function cancelCutiData() {

        let data = {
            nik_pemohon: '' + listUserCuti.nik,
            document_id: selectedPermohonanId ? ('' + selectedPermohonanId) : idFromUrl,
            start_cancel: listDocumentCuti.start_leave,
            end_cancel: listDocumentCuti.end_leave,
            cancel_number: "2",
            tanggal_dibatalkan: (listDocumentCuti.start_leave, listDocumentCuti.end_leave),
            cancel_cuper: "0",
            comment: comment,
        };

        cancelCuti(data).then((res) => {
            //  // console.log("cancel pengajuan cuti", res);
            if (res.data.status === 'failed') {
                toastAlert("warning", `${res.data.message}`);
                dispatch(setIsValidationModal({ isValidationModal: false }))
                dispatch(setIsPostApproved({ isPostApproved: false }))
            }
            if (res.data.status != 'failed') {
                toastAlert("success", "Berhasil membatalkan Cuti!");
                dispatch(setIsPostApproved({ isPostApproved: false }))
                dispatch(setIsValidationModal({ isValidationModal: false }))
                dispatch(categoryRequest({ category: "dashboard_web" }));
                dispatch(setIsValidationModalYes({ isValidationModalYes: true }))
                setTimeout(() => {
                    navigate("/app/request")
                }, 3000);
            }
        });
    }

    function approvalCutiData() {

        let data = {
            document_id: selectedPermohonanId,
            nik_approval: "880019",
            status_approval: confirmation ? confirmation : "",
            comment: approvalDeskripsi
        };

        approvalCuti(data).then((res) => {
            //  // console.log("Konfirmasi pengajuan cuti", res);
            setShowSnakebar(true);
            if (res.data.status === 'failed') {
                toastAlert("warning", `${res.data.message}`);
                dispatch(setIsValidationModal({ isValidationModal: false }))
                dispatch(setIsPostApproved({ isPostApproved: false }))
            }
            if (res.data.status != 'failed') {
                toastAlert("success", "Berhasil mengkonfirmasi Cuti!");
                dispatch(setIsPostApproved({ isPostApproved: false }))
                dispatch(setIsValidationModal({ isValidationModal: false }))
                dispatch(categoryRequest({ category: "dashboard_web" }));
                dispatch(setIsValidationModalYes({ isValidationModalYes: true }))
                setTimeout(() => {
                    navigate("/app/request")
                }, 3000);
            }
        });
    }

    function PostCutiData() {
        let dataLampiran = [
            {
                path: hasilUpload.path ? hasilUpload.path : "",
                filename: hasilUpload.filename ? hasilUpload.filename : ""
            },
            {
                path: hasilUpload1.path ? hasilUpload1.path : "",
                filename: hasilUpload1.filename ? hasilUpload1.filename : ""
            },
            {
                path: hasilUpload2.path ? hasilUpload2.path : "",
                filename: hasilUpload2.filename ? hasilUpload2.filename : ""
            },
            {
                path: hasilUpload3.path ? hasilUpload3.path : "",
                filename: hasilUpload3.filename ? hasilUpload3.filename : ""
            },
            {
                path: hasilUpload4.path ? hasilUpload4.path : "",
                filename: hasilUpload4.filename ? hasilUpload4.filename : ""
            },
        ];

        let data = {
            nik_pemohon: dataUserNik,
            role_id: selectedRoleCode,
            advance_role_id: "0",
            start_leave: moment(startDate).format("YYYY-MM-DD"),
            end_leave: moment(endDate).format("YYYY-MM-DD"),
            leaving_number: 2,
            start_depart: cutiPerjalanan ? moment(dateKeberangkatan[0]).format("YYYY-MM-DD") : "",
            end_depart: cutiPerjalanan ? moment(dateKeberangkatan[1]).format("YYYY-MM-DD") : "",
            start_return: cutiPerjalanan ? moment(dateKepulangan[0]).format("YYYY-MM-DD") : "",
            end_return: cutiPerjalanan ? moment(dateKepulangan[1]).format("YYYY-MM-DD") : "",
            depart_trip_number: "",
            return_trip_number: "",
            leaving_reason: alasanCuti,
            leaving_address: alamatCuti,
            phone_number: telepon,
            comment: comment,
            nik_atasan: listLeader.nik,
            notification: listNotifications,
            dokumen_id: "",
            attachment: dataLampiran,
            tanggal_terpakai: (moment(startDate).format("YYYY-MM-DD"), moment(endDate).format("YYYY-MM-DD")),
        };

        postCuti(data).then((res) => {
            //  // console.log("post Cuti", res);
            if (res.data.status === 'failed') {
                toastAlert("warning", `${res.data.message}`);
            }
            if (res.data.status != 'failed') {
                toastAlert("success", "Berhasil mengajukan Cuti!");
                dispatch(setIsValidationModalYes({ isValidationModalYes: true }))
                setTimeout(() => {
                    navigate("/app/request")
                }, 3000);
            }
        });
    }

    function getTaskData() {
        getTaskCuti(`?action=my_activity&category=cuti&start_date=-&limit=10&offset=0&appVersion=5.0.6&cuti_id=${selectedPermohonanId ? selectedPermohonanId : idFromUrl}`).then((res) => {
            var tempList = [];
            tempList = res.data;
            //  // console.log("List Data Task cuti => ", res.data);
            setListDataTask(tempList.data.detail);
            //  // console.log("ini count tugas", tempList.data.count)
            setCountDataTask(tempList.data.count)
        });
    }

    function getNotifyData() {
        getNotifyCuti(`?language=id&userTimezone=GMT+7&isDev=true&limit=6&offset=0&appVersion=5.0.6&reference_id=${selectedPermohonanId ? selectedPermohonanId : idFromUrl}`).then((res) => {
            var tempList = [];
            tempList = res.data.data;
            //  // console.log("List Data Notify cuti => ", res);
            setListNotifyCuti(tempList);
        });
    }

    function getDetailCutiData() {
        getCuti(`detail-dokumen-cuti/${dataUserNik}/${selectedPermohonanId ? selectedPermohonanId : idFromUrl}`).then((res) => {
            var tempList = [];
            tempList = res.data;
            //  // console.log("List Detail Cuti", tempList);
            // setListDetailCuti(tempList.document)
            setListDocumentCuti(tempList.data.document)
            setFiles(tempList.data.attachment)
            setListApprover(tempList.data.approver)
            setListRoleCuti(tempList.data.role)
            setListUserCuti(tempList.data.user)
            setListJustification(tempList.timeline)
            if (tempList.data.document.start_depart != null) {
                //  // console.log("day nya ini", new Date(tempList.data.document.start_depart))
                //  // console.log("hasil day counter", daysCounter1(new Date(tempList.data.document.start_depart), new Date(tempList.data.document.end_depart)))
                setJumlahHariKeberangkatan(daysCounter1(new Date(tempList.data.document.start_depart), new Date(tempList.data.document.end_depart)))
            }
            if (tempList.data.document.start_return != null) {
                //  // console.log("day nya ini", new Date(tempList.data.document.start_return))
                //  // console.log("hasil day counter", daysCounter1(new Date(tempList.data.document.start_return), new Date(tempList.data.document.end_return)))
                setJumlahHariKepulangan(daysCounter1(new Date(tempList.data.document.start_return), new Date(tempList.data.document.end_return)))
            }
        });
    }

    useEffect(() => {
        dispatch(selectPermohonanId({ selectedPermohonanId: idFromUrl }))
    }, [idFromUrl])


    // useEffect(() => {
    //      // console.log("ini range keberangkatan", dateKeberangkatan[0])
    //     if (dateKeberangkatan) {
    //         let data = {
    //             nik: dataUserNik,
    //             id_role: selectedRoleCode,
    //             startdate: moment(dateKeberangkatan[0]).format("YYYY-MM-DD"),
    //             enddate: moment(dateKeberangkatan[1]).format("YYYY-MM-DD")
    //         }
    //         postCountDate(data).then((res) => {
    //             var tempList = [];
    //             tempList = res.data;
    //              // console.log("List Data hutung tanggal => ", res);
    //             setJumlahHariKeberangkatan(tempList.jml_hari_cuti)
    //             if (cuper) {
    //                 if (tempList.jml_hari_cuti > cuper.get_max_trip_day_before) {
    //                     toastAlert("warning", `Maksimal ${cuper.get_max_trip_day_before} hari keberangkatan`);
    //                 }
    //             }
    //         });
    //     }
    // }, [dateKeberangkatan])

    function getLeaderData() {
        getFWA("flexi/place/employee/leader").then((res) => {
            var tempList = [];
            tempList = res.data.data;
            //  // console.log("List Data Leader ", tempList);
            setListLeader(tempList)

        });
    }

    function getPartisipanData() {
        getSearchKaryawan(`?limit=5&offset=${offset}&keyword=${keyword}`).then((res) => {
            var tempList = [];
            tempList = res.data.data;
            //  // console.log("List Data Partisipan => ", tempList);
            setListPartisipan(tempList);
        });
    }

    function daysCounter(date1, date2) {
        return Math.ceil(((date2 - date1) / 8.64e7) + 1);
    }

    function daysCounter1(date1, date2) {
        return Math.ceil(((date2 - date1) / 8.64e7));
    }

    // const handleSetPartisipan = (item) => {
    //     var existingEntries = listNotificationPerson;
    //      // console.log("yang ini", existingEntries)
    //     try {
    //         const temp = existingEntries.filter((entry, indexEntry) => {
    //             if (listNotificationPerson.length > 0 && entry.nik === item.nik) {
    //                  // console.log("data udah ada")
    //                 setIsExistData(true)
    //                 return true
    //             }
    //         })
    //     } catch (err) {
    //         return false
    //     }
    //     if (isExist === false) {
    //         existingEntries.push({
    //             nik: item.nik,
    //             name: item.name,
    //             photo: item.foto,
    //             posisi: item.v_short_posisi
    //         })
    //         setListNotificationPerson(existingEntries)
    //          // console.log("data berhasil ditambah", existingEntries)
    //     }
    // };

    useEffect(() => {
        getDetailCutiData()
        getLeaderData()
        setJumlahHariCuti("")
        getTaskData()
        getNotifyData()
    }, [1])

    useEffect(() => {
        getTaskData()
        setOpenTaskSidebar(false)
    }, [isSidebarTask])


    // useEffect(() => {
    //      // console.log("role code", selectedRoleCode)
    //      // console.log("role code advance", selectedRoleCodeAdv)
    // }, [selectedJenisCuti, selectedRoleCode, selectedRoleCodeAdv])

    useEffect(() => {
        if (cutiPerjalanan === false) {
            setDateKeberangkatan(new Date())
            setDateKepulangan(new Date())
            setJumlahHariKeberangkatan("")
            setJumlahHariKepulangan("")
        }
    }, [cutiPerjalanan])

    useEffect(() => {
        //  // console.log("ini startdate", startDate)
        //  // console.log("ini endDate", endDate)
        if (startDate > endDate) {
            toastAlert("warning", "Tanggal awal tidak boleh lebih dari Tanggal akhir");
            setJumlahHariCuti("")
        }
        if (endDate >= startDate) {
            setJumlahHariCuti(daysCounter(startDate, endDate))
        }
    }, [startDate, endDate])

    useEffect(() => {
        //  // console.log("ini range keberangkatan", moment(listDocumentCuti.start_depart).format("YYYY-MM-DD"))
        if (daysCounter(moment(listDocumentCuti.start_depart).format("YYYY-MM-DD"), moment(listDocumentCuti.end_depart).format("YYYY-MM-DD")) > 0) {
            setJumlahHariKeberangkatan(daysCounter(moment(listDocumentCuti.start_depart).format("YYYY-MM-DD"), moment(listDocumentCuti.end_depart).format("YYYY-MM-DD")))
        }
    }, [listDocumentCuti])

    useEffect(() => {
        //  // console.log("ini range kepulangan", (listDocumentCuti.start_return, listDocumentCuti.end_return))
        if (listDocumentCuti.start_return) {
            if (daysCounter(listDocumentCuti.start_return, listDocumentCuti.end_return) > 0) {
                setJumlahHariKepulangan(daysCounter(listDocumentCuti.start_return, listDocumentCuti.end_return))
            }
        }
    }, [listDocumentCuti.start_return, listDocumentCuti.end_return])

    useEffect(() => {
        if (dataQuota) {
            if (jumlahHariCuti > dataQuota.quota_remain) {
                toastAlert("warning", "Kuota Cuti Kamu Sudah Habis");
            }
        }
    }, [jumlahHariCuti])

    function getLeaderData() {
        getFWA("flexi/place/employee/leader").then((res) => {
            var tempList = [];
            tempList = res.data.data;
            //  // console.log("List Data Leader ", tempList);
            setListLeader(tempList)

        });
    }

    function getPartisipanData() {
        getSearchKaryawan(`?limit=5&offset=${offset}&keyword=${keyword}`).then((res) => {
            var tempList = [];
            tempList = res.data.data;
            //  // console.log("List Data Partisipan => ", tempList);
            let tempData = [];
            for (let i = 0; i < tempList.length; i++) {
                tempData.push({
                    label: tempList[i].name,
                    value: tempList[i].nik,
                    avatar: tempList[i].foto,
                    key: i + 1
                });
            }
            setListPartisipan(tempData);
            //  // console.log("list temData partisipan", tempData)
        });
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     PostCutiData()
    // };

    const SignupSchema = yup.object().shape({
        email: yup.string().email().required(),
        lastName: yup.string().min(3).required(),
        firstName: yup.string().min(3).required(),
        password: yup.string().min(6).required()
    })

    const {
        // reset,
        control,
        // handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

    const onChangeValid = data => {
        if (Object.values(data).every(field => field.length > 0)) {
            //  // console.log("ini email abis validasi", data.email)
        }
    }

    useEffect(() => {
        getPartisipanData();
    }, [keyword]);

    useEffect(() => {
        getLeaderData()
    }, [1])

    // const PartisipantComponent = ({ data, ...props }) => {
    //     return (
    //         <components.Option {...props}>
    //             <div className='d-flex flex-wrap align-items-center'>
    //                 <Avatar className='my-0 me-1' size='sm' img={data.avatar} />
    //                 <div>{data.label}</div>
    //             </div>
    //         </components.Option>
    //     )
    // }

    useEffect(() => {
        //  // console.log("list notification person", listNotificationPerson)
        var data = listNotificationPerson
        let tempData = [];
        // tempData = listNotificationPerson
        for (let i = 0; i < data.length; i++) {
            tempData.push({
                name: data[i].label,
                nik: data[i].value,
                photo: data[i].avatar
                // key: i + 1
            });
        }
        setListNotifications(tempData);
        //  // console.log("list notification person", tempData)

    }, [listNotificationPerson])

    const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar)

    //file uploader
    const [files, setFiles] = useState([])
    // const [listLampiran, setListLampiran] = React.useState([]);
    const [hasilUpload, setHasilUpload] = React.useState([]);
    const [hasilUpload1, setHasilUpload1] = React.useState([]);
    const [hasilUpload2, setHasilUpload2] = React.useState([]);
    const [hasilUpload3, setHasilUpload3] = React.useState([]);
    const [hasilUpload4, setHasilUpload4] = React.useState([]);

    // const [files, setFiles] = useState([])

    // const { getRootProps, getInputProps } = useDropzone({
    //     multiple: false,
    //     onDrop: acceptedFiles => {
    //         setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
    //     }
    // })

    // const renderFilePreview = file => {
    //     if (file.type.startsWith('image')) {
    //         return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
    //     } else {
    //         return <FileText size='28' />
    //     }
    // }

    // const handleRemoveFile = file => {
    //     const uploadedFiles = files
    //     const filtered = uploadedFiles.filter(i => i.name !== file.name)
    //     setFiles([...filtered])
    // }

    // const renderFileSize = size => {
    //     if (Math.round(size / 100) / 10 > 1000) {
    //         return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
    //     } else {
    //         return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
    //     }
    // }
    const fileList = files.filter(filterFile => filterFile.filename != "").map((file, index) => (
        <ListGroupItem key={`${file.filename}-${index}`} className='d-flex align-items-center justify-content-between'>
            <a href={file.path} target="_blank">
                <div className='file-details d-flex align-items-center'>
                    {/* <div className='file-preview me-1'>{renderFilePreview(file)}</div> */}
                    <div>
                        <p className='file-name mb-0'>{file.filename}</p>
                        {/* <p className='file-size mb-0'>{renderFileSize(file.size)}</p> */}
                    </div>
                </div>
                {/* <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
                <X size={14} />
            </Button> */}
            </a>
        </ListGroupItem>
    ))

    useEffect(() => {
        if (isPostApproved === true) {
            if (category != "need_approve_web") {
                cancelCutiData()
                setTextModal("Pembatalan pengajuan berhasil dilakukan !")
            }
            if (category === "need_approve_web") {
                approvalCutiData()
                setTextModal("Pengajuan berhasil dikirim !")
            }
        }
    }, [isPostApproved])

    const renderTasks = () => {
        return (
            <>
                {countDataTask > 0 ? (
                    <>
                        {listDataTask.map((item, index) => {
                            return (
                                <div key={item.id} className="business-item p-0">
                                    <div
                                        className="d-flex"
                                    >
                                        <div className="d-flex py-4 px-5 my-auto">
                                            <UncontrolledButtonDropdown className="side-button">
                                                <DropdownToggle className="border-0" color="">
                                                    <div
                                                        style={{
                                                            width: "20px",
                                                            height: "20px",
                                                            borderRadius: "4px"
                                                        }}
                                                        className={`${item.status === "TO DO"
                                                            ? "graytask"
                                                            : item.status === "IN PROGRESS"
                                                                ? "bluetask"
                                                                : item.status === "DONE"
                                                                    ? "greentask"
                                                                    : "whitetask"
                                                            }`}
                                                    ></div>
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem
                                                        className="d-flex"
                                                    >
                                                        <div
                                                            style={{
                                                                width: "20px",
                                                                height: "20px",
                                                                borderRadius: "4px"
                                                            }}
                                                            className="graytask me-3"
                                                        ></div>
                                                        To Do
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        className="d-flex"
                                                    >
                                                        <div
                                                            style={{
                                                                width: "20px",
                                                                height: "20px",
                                                                borderRadius: "4px"
                                                            }}
                                                            className="bluetask me-3"
                                                        ></div>{" "}
                                                        In Progress
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        className="d-flex"
                                                    >
                                                        <div
                                                            style={{
                                                                width: "20px",
                                                                height: "20px",
                                                                borderRadius: "4px"
                                                            }}
                                                            className="greentask  me-3"
                                                        ></div>{" "}
                                                        Done
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledButtonDropdown>
                                        </div>
                                        <div className="d-flex flex-fill pointer-cursor"
                                        >
                                            <Label
                                                className="form-check-label flex-fill my-auto"
                                                for={item.id}
                                            >
                                                {parse(item.description)}
                                            </Label>
                                            <div
                                                className="d-flex flex-row-reverse me-2 ms-auto my-auto me-4"
                                                style={{ width: "40%" }}
                                            >
                                                <div
                                                    className={`d-flex flex-row align-items-middle ${item.end_date ? "" : "d-none"
                                                        }`}
                                                    title={`Harus selesai pada ${moment(
                                                        item.end_date,
                                                        "YYYY-MM-DD"
                                                    ).format("D MMMM YYYY")}`}
                                                >
                                                    <PersonClockFilled
                                                        className="fs-6 text-tertiary-500"
                                                        height="100%"
                                                    />
                                                </div>
                                                <div
                                                    className={`d-flex flex-row align-items-middle me-2 ${item.is_description_exists ? "" : "d-none"
                                                        }`}
                                                    title={item.description_text}
                                                >
                                                    <ListFilled className="fs-6 text-tertiary-500" height="100%" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <EmptyCard
                        className="my-5"
                        text="Tidak ada Tugas Cuti"
                    >
                    </EmptyCard>
                )}
            </>
        );
    };

    return (
        <>
            <div style={{ minWidth: "max-width" }}>
                <Card>
                    <CardHeader>
                        <CardTitle tag='h4' className='text-primary'>Detail Pengajuan Cuti</CardTitle>
                        {/* <Button className={`${listDocumentCuti.status === "Rejected" ? "" : "d-none"}`} color='primary' onClick={() => setEditCuti(true)}>
                            <span className='text-white fw-bolder'>
                                Edit
                            </span>
                            <Edit16Filled
                                color="white"
                                style={{ marginLeft: "10px" }}
                            />
                        </Button> */}
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <Row md='12' sm='12'>
                                <Row className="mb-6">
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='kuota'>
                                            Jenis Cuti
                                        </Label>
                                        <Input type='text' name='kuota' id='kuota'
                                            defaultValue={listRoleCuti ? listRoleCuti.role_name : ""}
                                            placeholder="Jenis Cuti"
                                            disabled />
                                    </Col>
                                </Row>
                                <Row className="mb-6">
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='tanggalMulai'>
                                            Tanggal Mulai
                                        </Label>
                                        <InputGroup className='mb-2' disabled>
                                            <Input type='text' name='tanggalMulai' id='tanggalMulai'
                                                placeholder="0"
                                                value={`${listDocumentCuti ? moment(listDocumentCuti.start_leave).format("DD MMMM YYYY") : "-"}`}
                                                disabled />
                                            {/* <Flatpickr className='form-control' options={{
                                                minDate: 'today',
                                                dateFormat: "d F Y"
                                            }}
                                                defaultValue={listDocumentCuti ? moment(listDocumentCuti.start_leave).format("DD MMMM YYYY") : "-"}
                                                disabled id='default-picker' /> */}
                                            <InputGroupText className='bg-tertiary-200 text-tertiary-500'>
                                                <CalendarLtr20Regular color="#A0AEC0" />
                                            </InputGroupText>
                                        </InputGroup>
                                    </Col>
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='endDate'>
                                            Tanggal Akhir
                                        </Label>
                                        <InputGroup className='mb-2' disabled>
                                            <Input type='text' name='endDate' id='endDate'
                                                placeholder="0"
                                                value={`${moment(listDocumentCuti.end_leave).format("DD MMMM YYYY")}`}
                                                disabled />
                                            {/* <Flatpickr className='form-control' options={{
                                                minDate: 'today',
                                                dateFormat: "d F Y"
                                            }}
                                                defaultValue={listDocumentCuti ? moment(listDocumentCuti.end_leave).format("DD MMMM YYYY") : "-"}
                                                disabled id='default-picker' /> */}
                                            <InputGroupText className='bg-tertiary-200 text-tertiary-500'>
                                                <CalendarLtr20Regular color="#A0AEC0" />
                                            </InputGroupText>
                                        </InputGroup>
                                    </Col>
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='jumlahCuti'>
                                            Jumlah Cuti (Hari Kerja)
                                        </Label>
                                        <InputGroup className='mb-2' disabled>
                                            <Input type='text' name='jumlahCuti' id='jumlahCuti'
                                                defaultValue={listDocumentCuti.leaving_number}
                                                placeholder="0"
                                                disabled />
                                            <InputGroupText className='bg-tertiary-200 text-tertiary-500'>Hari</InputGroupText>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className={`mb-6 ${listDocumentCuti.start_depart != null ? "" : "d-none"}`}>
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='dateKeberangkatan'>
                                            Periode Keberangkatan Perjalanan{" "}<span className="text-secondary-500">*</span>
                                        </Label>
                                        <InputGroup className='mb-2'>
                                            <Input type='text' name='dateKepulangan' id='dateKepulangan'
                                                placeholder="0"
                                                value={`${moment(listDocumentCuti.start_depart).format("DD MMMM YYYY")} - ${moment(listDocumentCuti.end_depart).format("DD MMMM YYYY")}`}
                                                disabled />
                                            {/* <Flatpickr className='form-control' options={{
                                                mode: "range",
                                                minDate: 'today',
                                                dateFormat: "d F Y",
                                                defaultDate: [moment(listDocumentCuti.start_depart).format("YYYY-MM-DD"), moment(listDocumentCuti.end_depart).format("YYYY-MM-DD")]
                                            }}
                                                defaultValue={listDocumentCuti ? listDocumentCuti.start_depart : "-"}
                                                id='default-picker' disabled /> */}
                                            <InputGroupText className='bg-tertiary-200 text-tertiary-500'>
                                                <CalendarLtr20Regular color="#A0AEC0" />
                                            </InputGroupText>
                                        </InputGroup>
                                    </Col>
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='jumlahBerangkat'>
                                            Jumlah Berangkat (Hari Kerja)
                                        </Label>
                                        <InputGroup className='mb-2' disabled>
                                            <Input type='text' name='jumlahBerangkat' id='jumlahBerangkat'
                                                placeholder="0"
                                                defaultValue={listDocumentCuti.depart_trip_number}
                                                disabled />
                                            <InputGroupText className='bg-tertiary-200 text-tertiary-500'>Hari</InputGroupText>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className={`mb-6 ${listDocumentCuti.start_return != null ? "" : "d-none"}`}>
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='dateKepulangan'>
                                            Periode Kepulangan Perjalanan{" "}<span className="text-secondary-500">*</span>
                                        </Label>
                                        <InputGroup className='mb-2'>
                                            <Input type='text' name='dateKepulangan' id='dateKepulangan'
                                                placeholder="0"
                                                value={`${moment(listDocumentCuti.start_return).format("DD MMMM YYYY")} - ${moment(listDocumentCuti.end_return).format("DD MMMM YYYY")}`}
                                                disabled />
                                            {/* <Flatpickr className='form-control' options={{
                                                mode: 'range',
                                                minDate: 'today',
                                                dateFormat: "d F Y"
                                            }} defaultValue={listDocumentCuti ? listDocumentCuti.start_return : "-"} id='default-picker' disabled /> */}
                                            <InputGroupText className='bg-tertiary-200 text-tertiary-500'>
                                                <CalendarLtr20Regular color="#A0AEC0" />
                                            </InputGroupText>
                                        </InputGroup>
                                    </Col>
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='JumlahKepulangan'>
                                            Jumlah Berangkat (Hari Kerja)
                                        </Label>
                                        <InputGroup className='mb-2' disabled>
                                            <Input type='text' name='JumlahKepulangan' id='JumlahKepulangan'
                                                defaultValue={listDocumentCuti.return_trip_number}
                                                placeholder="0"
                                                disabled />
                                            <InputGroupText className='bg-tertiary-200 text-tertiary-500'>Hari</InputGroupText>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className="mb-6">
                                    <Col md='12' sm='12'>
                                        <Label className='form-label' htmlFor='alamatCuti'>
                                            Alamat Cuti
                                        </Label>
                                        <Input type="textarea" name='alamatCuti' id='alamatCuti'
                                            // value={alamatCuti}
                                            disabled
                                            defaultValue={listDocumentCuti ? listDocumentCuti.address : ""}
                                            placeholder="-" />
                                    </Col>
                                </Row>
                                <Row className="mb-6">
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='telepon'>
                                            Telepon
                                        </Label>
                                        <Input type='text' name='telepon' id='telepon'
                                            // value={telepon}
                                            disabled
                                            defaultValue={listDocumentCuti ? listDocumentCuti.phone_number : ""}
                                            placeholder="Telepon" />
                                    </Col>
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='alasanCuti'>
                                            Alasan Cuti
                                        </Label>
                                        <Input type='text' name='alasanCuti' id='alasanCuti'
                                            // value={alasanCuti}
                                            disabled
                                            defaultValue={listDocumentCuti ? listDocumentCuti.reason : ""}
                                            placeholder="Alasan Cuti" />
                                    </Col>
                                </Row>
                                <Row className="mb-6" style={{ minHeight: "max-content" }}>
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='cityMulti'>
                                            Lampiran
                                        </Label>
                                        {files.length ? (
                                            <Fragment>
                                                <ListGroup className='my-2 border-2 border rounded-2 border-tertiary'>{fileList}</ListGroup>
                                            </Fragment>
                                        ) : null}
                                    </Col>
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='cityMulti'>
                                            Persetujuan Atasan
                                        </Label>
                                        {listApprover.map((item, index) => (
                                            <div key={index} className='d-flex ms-2'>
                                                <div className={`bg-white`}
                                                    style={{ width: "40px", height: "40px", borderRadius: "9999px" }}>
                                                    <Avatar
                                                        className="photo-karyawan"
                                                        img={item.foto}
                                                        imgHeight="40"
                                                        imgWidth="40"
                                                    />
                                                </div>
                                                <div className='my-auto ms-1'>
                                                    <div className='mb-0 fs-4'>
                                                        {item.nama_approver} | {item.nik_approver}
                                                    </div>
                                                    <small>{item.posisi_approver}</small>
                                                </div>
                                            </div>
                                        ))}
                                    </Col>
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='guests'>
                                            Diberitahukan Kepada
                                        </Label>
                                        {listNotifyCuti.map((item, index) => (
                                            <div key={index} className='d-flex ms-2'>
                                                <div className={`bg-white`}
                                                    style={{ width: "40px", height: "40px", borderRadius: "9999px" }}>
                                                    <Avatar
                                                        className="photo-karyawan"
                                                        img={`https://diarium.telkom.co.id/getfoto/${item.nik_notified}`}
                                                        imgHeight="40"
                                                        imgWidth="40"
                                                    />
                                                </div>
                                                <div className='my-auto ms-1'>
                                                    <div className='mb-0 fs-4'>
                                                        {item.name_notified} | {item.nik_notified}
                                                    </div>
                                                    {/* <small>{item.position}</small> */}
                                                </div>
                                            </div>
                                        ))}
                                    </Col>
                                </Row>
                                <Row className={`mb-6 ${category === "notification_web" ? "d-none" : category != "need_approve_web" ? "" : "d-none"}`}>
                                    <div className='border-2 border-top mx-4'>
                                    </div>
                                </Row>
                                <h6 className={`mb-75 ${category === "notification_web" ? "d-none" : category != "need_approve_web" ? "" : "d-none"}`}>Tugas Cuti</h6>
                                <Row className={`mb-6 ${category === "notification_web" ? "d-none" : category != "need_approve_web" ? "" : "d-none"}`}>
                                    <PerfectScrollbar style={{ height: "225px", width: "50%", minHeight: "max-content" }}>
                                        <div className="business-items">{renderTasks()}</div>
                                    </PerfectScrollbar>
                                    <span className='text-primary fs-4 fw-bolder d-flex flex-row align-middle cursor-pointer mt-3' onClick={() => setOpenTaskSidebar(!openTaskSidebar)}>
                                        <span className="me-3 ms-3">
                                            <Add20Filled color="primary" />
                                        </span>
                                        <span className='my-auto'>
                                            Tambah Tugas Cuti
                                        </span>
                                    </span>
                                </Row>
                                <Row className={`mb-6 ${category === "notification_web" ? "d-none" : category != "need_approve_web" ? "" : "d-none"}`}>
                                    <div className='border-2 border-bottom mx-4'>
                                    </div>
                                </Row>
                                <Row className="mb-6">
                                    <Col md='5' sm='12'>
                                        <Label className='form-label' htmlFor='statusPermohonan'>
                                            Status Pengajuan
                                        </Label>
                                        <div className='ms-2 border-2 border rounded-2 border-tertiary'>
                                            <div className='my-5 mx-5'>
                                                <TimelineCuti className='ms-50 mb-0' data={listJustification} />
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                {/* <Row className={`mb-10 ${category != "need_approve_web" ? "" : "d-none"}`}>
                                    <Col md='12' sm='12'>
                                        <Label className='form-label' htmlFor='komentar'>
                                            Komentar
                                        </Label>
                                        <Input type="textarea" name='komentar' id='komentar'
                                            value={comment}
                                            placeholder="-"
                                            onChange={(e) => setComment(e.target.value)} />
                                    </Col>
                                </Row> */}
                                <Row className={`mb-6 ${category != "need_approve_web" ? "d-none" : ""}`}>
                                    <div className='border-2 border-top mx-4'>
                                    </div>
                                </Row>
                                <Row className={`mb-6 ${category != "need_approve_web" ? "d-none" : ""}`}>
                                    <h6 className="text-tertiary-800 fw-bolder mb-7">
                                        Konfirmasi
                                    </h6>
                                    <Label className='form-check-label mb-7'>
                                        Silahkan konfirmasi pengajuan, Kamu juga bisa memasukkan deskripsi
                                    </Label>
                                    <Row className='mb-10'>
                                        <Col md='2' sm='6'>
                                            <Input type='radio' name="confirmationApprove"
                                                id="confirmationApprove"
                                                checked={confirmation === "approve" ? true : false}
                                                style={{ width: "16px", height: "16px" }}
                                                onClick={() => {
                                                    setConfirmation("approve")
                                                }} />
                                            <Label className='form-check-label ms-2' htmlFor='confirmationApprove'>
                                                Setuju
                                            </Label>
                                        </Col>
                                        <Col md='2' sm='6'>
                                            <Input type='radio' name="confirmationReject"
                                                id="confirmationReject"
                                                checked={confirmation === "reject" ? true : false}
                                                style={{ width: "16px", height: "16px" }}
                                                onClick={() => {
                                                    setConfirmation("reject")
                                                }} />
                                            <Label className='form-check-label ms-2' htmlFor='confirmationReject'>
                                                Tidak Setuju
                                            </Label>
                                        </Col>
                                        {/* <Col md='2' sm='6'>
                                            <Input type='radio' name="confirmationReturn"
                                                id="confirmationReturn"
                                                checked={confirmation === "return" ? true : false}
                                                style={{ width: "16px", height: "16px" }}
                                                onClick={() => {
                                                    setConfirmation("return")
                                                }} />
                                            <Label className='form-check-label ms-2' htmlFor='confirmationReturn'>
                                                Kembalikan
                                            </Label>
                                        </Col> */}
                                    </Row>
                                    <Row className='mb-10'>
                                        <Col md='12' sm='12'>
                                            <Label className='form-label' htmlFor='deskripsi'>
                                                Deskripsi
                                            </Label>
                                            <Input type="textarea" name='deskripsi' id='deskripsi'
                                                value={approvalDeskripsi}
                                                placeholder="-"
                                                onChange={(e) => setApprovalDeskripsi(e.target.value)} />
                                        </Col>
                                    </Row>
                                </Row>
                                <Col sm='12' className={``}>
                                    <div className='d-flex'>
                                        {/* <Button className={`${listDocumentCuti.status === "Completed" ? "" : "d-none"}`} color='primary' onClick={() => dispatch(setIsValidationModal({ isValidationModal: true }))}>
                                            <span className='text-white fw-bolder'>
                                                Batalkan
                                            </span>
                                        </Button> */}
                                        <Button className={`${category === "need_approve_web" ? "" : "d-none"}`} color='primary' onClick={() => dispatch(setIsValidationModal({ isValidationModal: true }))}>
                                            <span className='text-white fw-bolder'>
                                                Konfirmasi
                                            </span>
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                        <ValidationModal text={category === "need_approve_web" ? "Kamu akan mengkonfirmasi pengajuan Cuti" : "Kamu akan membatalkan pembuatan pengajuan Cuti"} />
                        <SuccessModal text={textModal} />
                        <TaskSidebar
                            dispatch={dispatch}
                            store={store}
                            params={params}
                            open={openTaskSidebar}
                            selectTask={selectTask}
                            deleteTask={deleteTask}
                            handleTaskSidebar={handleTaskSidebar}
                            fetchLabels={fetchLabels}
                        />
                    </CardBody>
                </Card >
            </div>
        </>
    )
}

const DetailCuti = () => {
    return (
        <Fragment>
            <div className='w-100'>
                <PerfectScrollbar
                    className={`media-list scrollable-container`}
                    options={{
                        wheelPropagation: false
                    }}>
                    <Col sm='12'>
                        {MultipleColumnForm()}
                    </Col>
                </PerfectScrollbar>
                {/* <SuccessModal text={"Pengajuan cuti persetujuan berhasil dikirim !"} /> */}
            </div>
        </Fragment>
    )
}
export default DetailCuti
