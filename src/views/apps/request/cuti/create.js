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
import PerfectScrollbar from "react-perfect-scrollbar";
import Select, { components } from "react-select"; //eslint-disable-line
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
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
    Info16Filled
} from "@fluentui/react-icons";

// ** Styles Imports
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import '@styles/react/libs/file-uploader/file-uploader.scss'

// ** Utils
import Avatar from "@components/avatar";
import { isObjEmpty, selectThemeColors } from "@utils";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFWA, getSearchKaryawan, postCountDate, postCuti, uploadLampiranCuti } from '../../../../api';

import {
    setIsValidationModalYes
} from "../store";
import moment from "moment";

import { FileText, X, DownloadCloud } from 'react-feather'
import JenisCuti from './jenisCuti';
import SuccessModal from '../modals/SuccessModal';
import toastAlert from "@src/utils/alert";
import { getUsernik } from "../../../../utils/storage";

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'

// ** GA app
// import PageViewGa from "@src/config/pageViewGa.js";

const MultipleColumnForm = () => {
    const navigate = useNavigate();
    const dataUserNik = getUsernik();
    const dispatch = useDispatch();
    const [listNotifications, setListNotifications] = React.useState([]);
    // const [isNotValidModel, setIsNotValidModel] = React.useState(false);

    // ** States redux
    const selectedJenisCuti = useSelector((state) => state.request.selectedJenisCuti.selectedJenisCuti);
    const selectedRoleCode = useSelector((state) => state.request.selectedRoleCode.selectedRoleCode);
    const selectedRoleCodeAdv = useSelector((state) => state.request.selectedRoleCodeAdv.selectedRoleCodeAdv);
    const dataQuota = useSelector((state) => state.request.dataQuota.dataQuota);
    const dataCalender = useSelector((state) => state.request.dataCalender.dataCalender);
    const cuper = useSelector((state) => state.request.cuper.cuper);
    const journeyStatus = useSelector((state) => state.request.journeyStatus.journeyStatus);
    const isValidationModalYes = useSelector((state) => state.request.isValidationModalYes.isValidationModalYes);

    // usestate
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [dateKeberangkatan, setDateKeberangkatan] = useState("");
    const [dateKepulangan, setDateKepulangan] = useState("");
    const [jumlahHariCuti, setJumlahHariCuti] = React.useState("");
    const [jumlahHariKeberangkatan, setJumlahHariKeberangkatan] = React.useState("");
    const [jumlahHariKepulangan, setJumlahHariKepulangan] = React.useState("");
    const [cutiPerjalanan, setCutiPerjalanan] = React.useState(null);
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
    const [usedCalender, setUsedCalender] = React.useState([]);
    const [usedCalenderJourney, setUsedCalenderJourney] = React.useState([]);
    // const [redCalender, setRedCalender] = React.useState([]);

    function getLeaderData() {
        getFWA("flexi/place/employee/leader").then((res) => {
            var tempList = [];
            tempList = res.data.data;
            //  // console.log("List Data Leader ", tempList);
            setListLeader(tempList)

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

    // function daysCounter(date1, date2) {
    //     return Math.ceil(((date2 - date1) / 8.64e7) + 1);
    // }

    const handleSetPartisipan = (item) => {
        var existingEntries = listNotificationPerson;
        //  // console.log("yang ini", existingEntries)
        try {
            const temp = existingEntries.filter((entry, indexEntry) => {
                if (listNotificationPerson.length > 0 && entry.nik === item.nik) {
                    //  // console.log("data udah ada")
                    setIsExistData(true)
                    return true
                }
            })
        } catch (err) {
            return false
        }
        if (isExist === false) {
            existingEntries.push({
                nik: item.nik,
                name: item.name,
                photo: item.foto,
                posisi: item.v_short_posisi
            })
            setListNotificationPerson(existingEntries)
            //  // console.log("data berhasil ditambah", existingEntries)
        }
    };

    useEffect(() => {
        getLeaderData()
        setJumlahHariCuti("")
        setJumlahHariKeberangkatan("")
        setJumlahHariKepulangan("")
    }, [1])

    useEffect(() => {
        if (dataCalender) {
            let data = dataCalender.used_date
            let results = data.map(date => new Date(date))
            let data1 = dataCalender.red_date
            let results1 = data1.map(date1 => new Date(date1))
            let tempData = [...results, ...results1]
            setUsedCalender(tempData)
        }
    }, [dataCalender])

    useEffect(() => {
        if (cuper) {
            let data = cuper.data_calendar.used_date
            let results = data.map(date => new Date(date))
            setUsedCalenderJourney(results)
        }
    }, [cuper])

    // useEffect(() => {
    //      // console.log("role code", selectedRoleCode)
    //      // console.log("role code advance", selectedRoleCodeAdv)
    // }, [selectedJenisCuti, selectedRoleCode, selectedRoleCodeAdv])

    useEffect(() => {
        if (cutiPerjalanan === false) {
            setDateKeberangkatan("")
            setDateKepulangan("")
            setJumlahHariKeberangkatan("")
            setJumlahHariKepulangan("")
        }
    }, [cutiPerjalanan])

    useEffect(() => {
        //  // console.log("ini startdate", startDate)
        //  // console.log("ini endDate", endDate)
        if (startDate && endDate) {
            let data = {
                nik: dataUserNik,
                id_role: selectedRoleCode,
                startdate: moment(startDate).format("YYYY-MM-DD"),
                enddate: moment(endDate).format("YYYY-MM-DD")
            }

            postCountDate(data).then((res) => {
                var tempList = [];
                tempList = res.data;
                //  // console.log("List Data hutung tanggal => ", res);
                setJumlahHariCuti(tempList.jml_hari_cuti)
            });
        }
        if (startDate > endDate) {
            toastAlert("warning", "Tanggal awal tidak boleh lebih dari Tanggal akhir");
            setJumlahHariCuti("")
        }

    }, [startDate, endDate])

    useEffect(() => {
        //  // console.log("ini range keberangkatan", dateKeberangkatan[0])
        if (dateKeberangkatan) {
            let data = {
                nik: dataUserNik,
                id_role: selectedRoleCode,
                startdate: moment(dateKeberangkatan[0]).format("YYYY-MM-DD"),
                enddate: moment(dateKeberangkatan[1]).format("YYYY-MM-DD")
            }
            postCountDate(data).then((res) => {
                var tempList = [];
                tempList = res.data;
                //  // console.log("List Data hutung tanggal => ", res);
                setJumlahHariKeberangkatan(tempList.jml_hari_cuti)
                if (cuper) {
                    if (tempList.jml_hari_cuti > cuper.get_max_trip_day_before) {
                        toastAlert("warning", `Maksimal ${cuper.get_max_trip_day_before} hari keberangkatan`);
                    }
                }
            });
        }
    }, [dateKeberangkatan])

    useEffect(() => {
        //  // console.log("ini range kepulangan", moment(dateKepulangan[0]).format("YYYY-MM-DD"))
        if (dateKepulangan) {
            let data = {
                nik: dataUserNik,
                id_role: selectedRoleCode,
                startdate: moment(dateKepulangan[0]).format("YYYY-MM-DD"),
                enddate: moment(dateKepulangan[1]).format("YYYY-MM-DD")
            }
            postCountDate(data).then((res) => {
                var tempList = [];
                tempList = res.data;
                //  // console.log("List Data hutung tanggal => ", res);
                setJumlahHariKepulangan(tempList.jml_hari_cuti)
                if (cuper) {
                    if (tempList.jml_hari_cuti > cuper.get_max_trip_day_after) {
                        toastAlert("warning", `Maksimal ${cuper.get_max_trip_day_after} hari keberangkatan`);
                    }
                }
            });
        }
    }, [dateKepulangan])

    useEffect(() => {
        if (dataQuota) {
            if (jumlahHariCuti > dataQuota.quota_remain) {
                toastAlert("warning", "Kuota Cuti Kamu Sudah Habis");
            }
        }
    }, [jumlahHariCuti])

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

    const handleSubmit = (event) => {
        event.preventDefault();
        PostCutiData()
    };

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

    const PartisipantComponent = ({ data, ...props }) => {
        return (
            <components.Option {...props}>
                <div className='d-flex flex-wrap align-items-center'>
                    <Avatar className='my-0 me-1' size='sm' img={data.avatar} />
                    <div>{data.label}</div>
                </div>
            </components.Option>
        )
    }

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

    //file uploader
    const [files, setFiles] = useState([])
    const [listLampiran, setListLampiran] = React.useState([]);
    const [hasilUpload, setHasilUpload] = React.useState([]);
    const [hasilUpload1, setHasilUpload1] = React.useState([]);
    const [hasilUpload2, setHasilUpload2] = React.useState([]);
    const [hasilUpload3, setHasilUpload3] = React.useState([]);
    const [hasilUpload4, setHasilUpload4] = React.useState([]);

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop: acceptedFiles => {
            setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
        }
    })

    const renderFilePreview = file => {
        if (file.type.startsWith('image')) {
            return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
        } else {
            return <FileText size='28' />
        }
    }

    const handleRemoveFile = file => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter(i => i.name !== file.name)
        setFiles([...filtered])
    }

    const renderFileSize = size => {
        if (Math.round(size / 100) / 10 > 1000) {
            return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
        } else {
            return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
        }
    }

    const fileList = files.map((file, index) => (
        <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
            <div className='file-details d-flex align-items-center'>
                <div className='file-preview me-1'>{renderFilePreview(file)}</div>
                <div>
                    <p className='file-name mb-0'>{file.name}</p>
                    <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
                </div>
            </div>
            <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
                <X size={14} />
            </Button>
        </ListGroupItem>
    ))

    // const handleRemoveAllFiles = () => {
    //     setFiles([])
    // }
    // function postLampiran() {
    //     axios.post(`${CONFIG.API_URL}/gateway/telkom-diarium-mobilecollaborate/1.0/mobile/file/upload/single/dok-cuti/46982`, formData)
    //         .then(res => {
    //              // console.log(res);
    //              // console.log("data lampiran terpisah", res.data);
    //         })
    // }

    useEffect(() => {
        //  // console.log("ini file yang diupload", files)
        // var data = files
        // for (let i = 0; i < data.length; i++) {
        //     const formData = new FormData();
        //     formData.append("file", files[i]);
        //     uploadLampiranCuti(formData).then((res) => {
        //         var tempList = [];
        //         tempList = res.data;
        //          // console.log("balikan data abis upload =>", tempList);
        //          // console.log(tempList.data.filename);
        //         let tempData = [];
        //         for (let i = 0; i < tempList.length; i++) {
        //             tempData.push({
        //                 path: tempList[i].data.path,
        //                 filename: tempList[i].data.filename
        //             });
        //              // console.log("ini tempData lampiran", tempData)
        //         }
        //         setListLampiran(tempData);
        //          // console.log("list lampiran data cuti", tempData)
        //     });
        // }
        if (files.length === 1) {
            const formData = new FormData();
            formData.append("file", files[0]);
            uploadLampiranCuti(formData).then((res) => {
                var tempList = [];
                tempList = res.data;
                //  // console.log("balikan data abis upload =>", tempList);
                //  // console.log(tempList.data.filename);
                setHasilUpload(tempList.data);
            });
        }
        if (files.length === 2) {
            const formData = new FormData();
            formData.append("file", files[1]);
            uploadLampiranCuti(formData).then((res) => {
                var tempList = [];
                tempList = res.data;
                //  // console.log("balikan data abis upload =>", tempList);
                //  // console.log(tempList.data.filename);
                setHasilUpload1(tempList.data);
            });
        }
        if (files.length === 3) {
            const formData = new FormData();
            formData.append("file", files[2]);
            uploadLampiranCuti(formData).then((res) => {
                var tempList = [];
                tempList = res.data;
                //  // console.log("balikan data abis upload =>", tempList);
                //  // console.log(tempList.data.filename);
                setHasilUpload2(tempList.data);
            });
        }
        if (files.length === 4) {
            const formData = new FormData();
            formData.append("file", files[3]);
            uploadLampiranCuti(formData).then((res) => {
                var tempList = [];
                tempList = res.data;
                //  // console.log("balikan data abis upload =>", tempList);
                //  // console.log(tempList.data.filename);
                setHasilUpload3(tempList.data);
            });
        }
        if (files.length === 5) {
            const formData = new FormData();
            formData.append("file", files[4]);
            uploadLampiranCuti(formData).then((res) => {
                var tempList = [];
                tempList = res.data;
                //  // console.log("balikan data abis upload =>", tempList);
                //  // console.log(tempList.data.filename);
                setHasilUpload4(tempList.data);
            });
        }
    }, [files])

    // function uploadLampiranTask() {
    //     const formData = new FormData();
    //     formData.append("file", files[0]);
    //     uploadLampiranCuti(formData).then((res) => {
    //         var tempList = [];
    //         tempList = res.data;
    //          // console.log("balikan data abis upload =>", tempList);
    //          // console.log(tempList.data.filename);
    //     });
    // }


    return (
        <>
            <div style={{ minWidth: "max-width" }}>
                <div className='w-100'>
                    <JenisCuti />
                </div>
                <Card className={`${selectedJenisCuti ? "" : "d-none"}`}>
                    <CardHeader>
                        <CardTitle tag='h4' className='text-primary'>Buat Pengajuan Cuti</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={handleSubmit}>
                            <Row md='12' sm='12'>
                                {dataQuota ?
                                    <>
                                        <Row className="mb-6">
                                            <Col md='4' sm='12'>
                                                <Label className='form-label' htmlFor='kuota'>
                                                    Kuota
                                                </Label>
                                                <Input type='text' name='kuota' id='kuota'
                                                    defaultValue={dataQuota.quota_full}
                                                    placeholder="Kuota"
                                                    disabled />
                                            </Col>
                                            <Col md='4' sm='12'>
                                                <Label className='form-label' htmlFor='terpakai'>
                                                    Terpakai
                                                </Label>
                                                <Input type='text' name='terpakai' id='terpakai'
                                                    defaultValue={dataQuota.quota_usage}
                                                    placeholder="Terpakai"
                                                    disabled />
                                            </Col>
                                            <Col md='4' sm='12'>
                                                <Label className='form-label' htmlFor='tersisa'>
                                                    Tersisa
                                                </Label>
                                                <Input type='text' name='tersisa' id='tersisa'
                                                    defaultValue={dataQuota.quota_remain}
                                                    placeholder="Tersisa"
                                                    disabled />
                                            </Col>
                                        </Row>
                                    </> :
                                    <>
                                    </>}
                                <Row className="mb-6">
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='startDate'>
                                            Tanggal Mulai
                                        </Label>
                                        <InputGroup className='mb-2' disabled>
                                            <Flatpickr className='form-control' options={{
                                                minDate: 'today',
                                                disable: usedCalender,
                                                // disable: redCalender,
                                                dateFormat: "d F Y"
                                            }} value={startDate} onChange={(date) => setStartDate(date[0])} id='default-picker' />
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
                                            <Flatpickr className='form-control' options={{
                                                minDate: 'today',
                                                disable: usedCalender,
                                                // disable: redCalender,
                                                dateFormat: "d F Y"
                                            }} value={endDate} onChange={(date) => setEndDate(date[0])} id='default-picker' />
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
                                                defaultValue={jumlahHariCuti}
                                                placeholder="0"
                                                disabled />
                                            <InputGroupText className='bg-tertiary-200 text-tertiary-500'>Hari</InputGroupText>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Label className='form-check-label mb-7'>
                                    Cuti Perjalanan
                                </Label>
                                <Row className='mb-10'>
                                    <Col md='2' sm='6'>
                                        <Input type='radio' name="cutiPerjalananYes"
                                            id="cutiPerjalananYes"
                                            checked={cutiPerjalanan === true ? true : false}
                                            style={{ width: "16px", height: "16px" }}
                                            disabled={!journeyStatus}
                                            onClick={() => {
                                                setCutiPerjalanan(true)
                                            }} />
                                        <Label className='form-check-label ms-2' disabled={!journeyStatus} htmlFor='cutiPerjalananYes'>
                                            Setuju
                                        </Label>
                                    </Col>
                                    <Col md='2' sm='6'>
                                        <Input type='radio' name="cutiPerjalananNo"
                                            id="cutiPerjalananNo"
                                            checked={cutiPerjalanan === false ? true : false}
                                            style={{ width: "16px", height: "16px" }}
                                            disabled={!journeyStatus}
                                            onClick={() => {
                                                setCutiPerjalanan(false)
                                            }} />
                                        <Label className='form-check-label ms-2' disabled={!journeyStatus} dia htmlFor='cutiPerjalananNo'>
                                            Tidak
                                        </Label>
                                    </Col>
                                </Row>
                                <h6 className={`text-tertiary-800 fw-normal fs-4 mb-6 ${journeyStatus ? "d-none" : ""}`}>
                                    <span className="me-3">
                                        <Info16Filled color="#A0AEC0" />
                                    </span>
                                    Cuti  Perjalanan Sudah Terpakai
                                </h6>
                                <Row className={`mb-6 ${cutiPerjalanan ? "" : "d-none"}`}>
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='dateKeberangkatan'>
                                            Periode Keberangkatan Perjalanan{" "}<span className="text-secondary-500">*</span>
                                        </Label>
                                        <InputGroup className='mb-2'>
                                            <Flatpickr className='form-control' options={{
                                                mode: 'range',
                                                // minDate: 'today',
                                                // disable: [startDate, endDate],
                                                disable: usedCalenderJourney,
                                                dateFormat: "d F Y"
                                            }} value={dateKeberangkatan} placeholder="Pilih Tanggal" onChange={(date) => { setDateKeberangkatan(date) }} id='default-picker' />
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
                                                defaultValue={jumlahHariKeberangkatan}
                                                disabled />
                                            <InputGroupText className='bg-tertiary-200 text-tertiary-500'>Hari</InputGroupText>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className={`mb-6 ${cutiPerjalanan ? "" : "d-none"}`}>
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='dateKepulangan'>
                                            Periode Kepulangan Perjalanan{" "}<span className="text-secondary-500">*</span>
                                        </Label>
                                        <InputGroup className='mb-2'>
                                            <Flatpickr className='form-control' options={{
                                                mode: 'range',
                                                // disable: [startDate, endDate,
                                                //     {
                                                //         from: dateKeberangkatan[0],
                                                //         to: dateKeberangkatan[1]
                                                //     },],
                                                disable: usedCalenderJourney,
                                                // minDate: 'today',
                                                dateFormat: "d F Y"
                                            }} value={dateKepulangan} placeholder="Pilih Tanggal" onChange={(date) => setDateKepulangan(date)} id='default-picker' />
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
                                                defaultValue={jumlahHariKepulangan}
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
                                            value={alamatCuti}
                                            placeholder="-"
                                            onChange={(e) => setAlamatCuti(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row className="mb-6">
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='telepon'>
                                            Telepon
                                        </Label>
                                        <Input type='text' name='telepon' id='telepon'
                                            value={telepon}
                                            placeholder="Telepon"
                                            onChange={(e) => setTelepon(e.target.value)} />
                                    </Col>
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='alasanCuti'>
                                            Alasan Cuti
                                        </Label>
                                        <Input type='text' name='alasanCuti' id='alasanCuti'
                                            value={alasanCuti}
                                            placeholder="Alasan Cuti"
                                            onChange={(e) => setAlasanCuti(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row className="mb-6" style={{ minHeight: "max-content" }}>
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='cityMulti'>
                                            Lampiran
                                        </Label>
                                        <div {...getRootProps({ className: 'dropzone' })} style={{ minHeight: "fit-content" }}>
                                            <input {...getInputProps()} />
                                            <div className='d-flex align-items-center justify-content-center flex-column'>
                                                <DownloadCloud size={64} />
                                                <h5>Drop Files here or click to upload</h5>
                                                <p className='text-tertiary text-center'>
                                                    Drop files here or click{' '}
                                                    <a href='/' onClick={e => e.preventDefault()}>
                                                        browse
                                                    </a>{' '}
                                                    thorough your machine
                                                </p>
                                            </div>
                                        </div>
                                        {files.length ? (
                                            <Fragment>
                                                <ListGroup className='my-2'>{fileList}</ListGroup>
                                                {/* <div className='d-flex justify-content-end'>
                                                    <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                                                        Remove All
                                                    </Button>
                                                    <Button color='primary'>Upload Files</Button>
                                                </div> */}
                                            </Fragment>
                                        ) : null}
                                    </Col>
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='cityMulti'>
                                            Persetujuan Atasan
                                        </Label>
                                        <div className='d-flex ms-2'>
                                            <div className={`bg-white`}
                                                style={{ width: "40px", height: "40px", borderRadius: "9999px" }}>
                                                <Avatar
                                                    className="photo-karyawan"
                                                    img={listLeader.photo}
                                                    imgHeight="40"
                                                    imgWidth="40"
                                                />
                                            </div>
                                            <div className='my-auto ms-1'>
                                                <div className='mb-0 fs-4'>
                                                    {listLeader.name} | {listLeader.nik}
                                                </div>
                                                <small>{listLeader.posisi}</small>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md='4' sm='12'>
                                        <Label className='form-label' htmlFor='guests'>
                                            Diberitahukan Kepada
                                        </Label>
                                        <Select
                                            isMulti
                                            id='notificationPerson'
                                            className='react-select'
                                            classNamePrefix='select'
                                            placeholder='Pilih Karyawan'
                                            isClearable={false}
                                            options={listPartisipan}
                                            theme={selectThemeColors}
                                            // value={listNotificationPerson}
                                            value={listNotificationPerson.length ? [...listNotificationPerson] : null}
                                            onChange={data => setListNotificationPerson([...data])}
                                            // onChange={item => handleSetPartisipan(item)}
                                            // onChange={data =>  // console.log("ini ke klik select", [...data])}
                                            components={{
                                                Option: PartisipantComponent
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="mb-10">
                                    <Col md='12' sm='12'>
                                        <Label className='form-label' htmlFor='komentar'>
                                            Komentar
                                        </Label>
                                        <Input type="textarea" name='komentar' id='komentar'
                                            value={comment}
                                            placeholder="-"
                                            onChange={(e) => setComment(e.target.value)} />
                                    </Col>
                                </Row>
                                <Col sm='12'>
                                    <Row>
                                        <Col className='d-grid justify-content-start'>
                                            <Button className='me-1' color='primary' type='submit'
                                                onClick={() => { handleSubmit }}
                                            >
                                                <span className='text-white fw-bolder'>
                                                    Kirim Pengajuan
                                                </span>
                                            </Button>
                                        </Col>
                                        <Col className='d-grid justify-content-end'>
                                            <Button color='primary-100' type='cancel' onClick={() => navigate("/app/request")}>
                                                <span className='text-primary fw-bolder'>
                                                    Batal
                                                </span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card >
            </div>
        </>
    )
}

const CreateCuti = () => {
    return (
        <Fragment>
            {/* <PageViewGa /> */}
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
                <SuccessModal text={"Pengajuan cuti persetujuan berhasil dikirim !"} />
            </div>
        </Fragment>
    )
}
export default CreateCuti
