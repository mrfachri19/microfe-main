// ** React Imports
import React, { Fragment, useEffect, useState } from 'react'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label, FormFeedback, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Badge } from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import PerfectScrollbar from "react-perfect-scrollbar";
import Select, { components } from "react-select"; //eslint-disable-line
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Styles Imports
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";

// ** Utils
import Avatar from "@components/avatar";
import { isObjEmpty, selectThemeColors } from "@utils";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFWA, getSearchKaryawan, postPermohonan } from '../../../../api';

import {
    selectPermohonanId,
    setIsPernyataanModal,
    setIsPernyataanModalYes,
    setIsImageModal,
    setIsLocationModal,
    setIdWfhLocation,
    setWfhLocationLat,
    setWfhLocationLong,
    setWfhLocationLat1,
    setWfhLocationLong1,
    setWfhLocationLat2,
    setWfhLocationLong2,
    setWfhLocationLat3,
    setWfhLocationLong3,
    setWfhLocationLat4,
    setWfhLocationLong4,
    setIsDragable,
} from "../store";
import PernyataanFwaModal from '../modals/PernyataanFwa';
import moment from "moment";

import { X, Plus } from 'react-feather'
import { SlideDown } from 'react-slidedown'
import { AddSquare20Regular, Delete20Filled, Location20Filled } from '@fluentui/react-icons';
import ImageFwaModal from '../modals/ImageFwaModal';
import LocationModal from '../modals/LocationModal';
import toastAlert from "@src/utils/alert";

const MultipleColumnForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [senin, setSenin] = React.useState("");
    const [selasa, setSelasa] = React.useState("");
    const [rabu, setRabu] = React.useState("");
    const [kamis, setKamis] = React.useState("");
    const [jumat, setJumat] = React.useState("");
    const [sabtu, setSabtu] = React.useState("");
    const [minggu, setMinggu] = React.useState("");
    const [alamatWfo, setAlamatWfo] = React.useState("");
    const [gedungWfo, setGedungWfo] = React.useState("");
    const [kotaWfo, setKotaWfo] = React.useState("");
    const [alamatWfh, setAlamatWfh] = React.useState("");
    const [wfhCity, setWfhCity] = React.useState("");
    const [wfhRegion, setWfhRegion] = React.useState("");
    const [alamatWfh1, setAlamatWfh1] = React.useState("");
    const [wfhCity1, setWfhCity1] = React.useState("");
    const [wfhRegion1, setWfhRegion1] = React.useState("");
    const [alamatWfh2, setAlamatWfh2] = React.useState("");
    const [wfhCity2, setWfhCity2] = React.useState("");
    const [wfhRegion2, setWfhRegion2] = React.useState("");
    const [alamatWfh3, setAlamatWfh3] = React.useState("");
    const [wfhCity3, setWfhCity3] = React.useState("");
    const [wfhRegion3, setWfhRegion3] = React.useState("");
    const [alamatWfh4, setAlamatWfh4] = React.useState("");
    const [wfhCity4, setWfhCity4] = React.useState("");
    const [wfhRegion4, setWfhRegion4] = React.useState("");
    const [hpUtama, setHpUtama] = React.useState("");
    const [hpKedua, setHpKedua] = React.useState("");
    const [hpDarurat, setHpDarurat] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [rowAlamatWfh, setAddRowAlamatWfh] = React.useState(false);
    const [rowAlamatWfh1, setAddRowAlamatWfh1] = React.useState(false);
    const [rowAlamatWfh2, setAddRowAlamatWfh2] = React.useState(false);
    const [rowAlamatWfh3, setAddRowAlamatWfh3] = React.useState(false);
    // const [rowAlamatWfh4, setAddRowAlamatWfh4] = React.useState(false);
    const [showSnakebar, setShowSnakebar] = React.useState(false);
    //
    const [listLeader, setListLeader] = React.useState([]);
    // const [showAtasan, setShowAtasan] = React.useState(false);
    // const [atasanNik, setAtasanNik] = React.useState('');
    // const [atasanName, setAtasanName] = React.useState('');
    // const [atasanPhoto, setAtasanPhoto] = React.useState('');
    // const [atasanPosisi, setAtasanPosisi] = React.useState('');
    // const [showPartisipan, setShowPartisipan] = React.useState(false);
    // const [isValidModel, setIsValidModel] = React.useState(false);
    const [isNotValidModel, setIsNotValidModel] = React.useState(false);
    const [listPartisipan, setListPartisipan] = React.useState([]);
    const [listNotificationPerson, setListNotificationPerson] = React.useState([]);
    const [listNotifications, setListNotifications] = React.useState([]);
    const [listModelFwa, setListModelFwa] = React.useState([]);
    // const [entryNotoficationPerson, setEntryNotoficationPerson] = React.useState({});
    // const [partisipanName, setPartisipanName] = React.useState("");
    // const [partisipanNik, setPartisipanNik] = React.useState("");
    // const [partisipanPhoto, setPartisipanPhoto] = React.useState("");
    // const [partisipanPosisi, setPartisipanPosisi] = React.useState("");
    const [keyword, setKeyword] = React.useState("");
    // const [location, setLocation] = React.useState("");
    // const [isExist, setIsExist] = React.useState(false);
    const [offset, setOffset] = React.useState(0);

    // const [guests, setGuests] = useState({})
    // const [listAlamatWfh, setListAlamatWfh] = React.useState([]);

    const isPernyataanModal = useSelector((state) => state.request.isPernyataanModal.isPernyataanModal);
    const isPernyataanModalYes = useSelector((state) => state.request.isPernyataanModalYes.isPernyataanModalYes);
    const isImageModal = useSelector((state) => state.request.isImageModal.isImageModal);
    const isLocationModal = useSelector((state) => state.request.isLocationModal.isLocationModal);
    const wfhLocationLat = useSelector((state) => state.request.wfhLocationLat.wfhLocationLat);
    const wfhLocationLong = useSelector((state) => state.request.wfhLocationLong.wfhLocationLong);
    const wfhLocationLat1 = useSelector((state) => state.request.wfhLocationLat1.wfhLocationLat1);
    const wfhLocationLong1 = useSelector((state) => state.request.wfhLocationLong1.wfhLocationLong1);
    const wfhLocationLat2 = useSelector((state) => state.request.wfhLocationLat2.wfhLocationLat2);
    const wfhLocationLong2 = useSelector((state) => state.request.wfhLocationLong2.wfhLocationLong2);
    const wfhLocationLat3 = useSelector((state) => state.request.wfhLocationLat3.wfhLocationLat3);
    const wfhLocationLong3 = useSelector((state) => state.request.wfhLocationLong3.wfhLocationLong3);
    const wfhLocationLat4 = useSelector((state) => state.request.wfhLocationLat4.wfhLocationLat4);
    const wfhLocationLong4 = useSelector((state) => state.request.wfhLocationLong4.wfhLocationLong4);

    const idWfhLocation = useSelector((state) => state.request.idWfhLocation.idWfhLocation);
    const isDragable = useSelector((state) => state.request.isDragable.isDragable);

    const [pernyataanCheck, setPernyataanCheck] = React.useState(false)
    const [listInitialData, setListInitialData] = React.useState({})

    const [modelFwa, setModelFwa] = useState({
        value: "-",
        label: "Pilih Model FWA"
    });

    const [hubDarurat, setHubDarurat] = useState({
        value: "-",
        label: "Pilih Hubungan"
    });

    const assigneeOptions = [
        { value: '1 WFO - 4 WFH', label: "1 WFO - 4 WFH" },
        { value: '2 WFO - 3 WFH', label: "2 WFO - 3 WFH" },
        { value: '3 WFO - 2 WFH', label: "3 WFO - 2 WFH" },
        { value: '4 WFO - 1 WFH', label: '4 WFO - 1 WFH' },
        { value: '5 WFO', label: '5 WFO' },
        { value: '5 WFH', label: '5 WFH' },
    ];

    const optionsHub = [
        { value: 'Orang Tua', label: "Orang Tua" },
        { value: 'Saudara Kandung', label: "Saudara Kandung" },
        { value: 'Mertua', label: 'Mertua' },
        { value: 'Pasangan', label: 'Pasangan' },
        { value: 'Anak', label: 'Anak' },
        { value: 'Lainnya', label: 'Lainnya' },
    ];
    // ** States

    const dataHari = [
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jum'at",
        "Sabtu",
        "Minggu"
    ];

    function PostFwa() {
        let dataWfh = [
            {
                name: "",
                latitude: wfhLocationLat ? wfhLocationLat : "0",
                longitude: wfhLocationLong ? wfhLocationLong : "0",
                address_detail: alamatWfh,
                city: wfhCity,
                region: wfhRegion,
                country: ""
            },
            {
                name: "",
                latitude: wfhLocationLat1 ? wfhLocationLat1 : "0",
                longitude: wfhLocationLong1 ? wfhLocationLong1 : "0",
                address_detail: alamatWfh1,
                city: wfhCity1,
                region: wfhRegion1,
                country: ""
            },
            {
                name: "",
                latitude: wfhLocationLat2 ? wfhLocationLat2 : "0",
                longitude: wfhLocationLong2 ? wfhLocationLong2 : "0",
                address_detail: alamatWfh2,
                city: wfhCity2,
                region: wfhRegion2,
                country: ""
            },
            {
                name: "",
                latitude: wfhLocationLat3 ? wfhLocationLat3 : "0",
                longitude: wfhLocationLong3 ? wfhLocationLong3 : "0",
                address_detail: alamatWfh3,
                city: wfhCity3,
                region: wfhRegion3,
                country: ""
            },
            {
                name: "",
                latitude: wfhLocationLat4 ? wfhLocationLat4 : "0",
                longitude: wfhLocationLong4 ? wfhLocationLong4 : "0",
                address_detail: alamatWfh4,
                city: wfhCity4,
                region: wfhRegion4,
                country: ""
            }
        ];

        let data = {
            submission_start_date: moment(startDate).format("YYYY-MM-DD"),
            submission_end_date: moment(endDate).format("YYYY-MM-DD"),
            approver_nik: listLeader.nik,
            approver_name: listLeader.name,
            alamat_wfhs: dataWfh,
            alamat_wfo: alamatWfo,
            alamat_wfo_gedung: gedungWfo,
            alamat_wfo_kota: kotaWfo,
            hp_primary: hpUtama,
            hp_secondary: hpKedua,
            model_fwa: modelFwa.value,
            senin: senin,
            selasa: selasa,
            rabu: rabu,
            kamis: kamis,
            jumat: jumat,
            sabtu: sabtu,
            minggu: minggu,
            notifications: listNotifications,
            comment: comment,
            darurat_no: hpDarurat,
            darurat_nama: "",
            darurat_hub: hubDarurat.value,
            email_secondary: email
        };

        postPermohonan(data).then((res) => {
            //  // console.log("post permohononan", res);
            toastAlert("success", "Berhasil membuat Permohonan!");
            dispatch(setIsPernyataanModalYes({ isPernyataanModalYes: false }))
            navigate('/app/request')
        });
    }

    function getLeaderData() {
        getFWA("flexi/place/employee/leader").then((res) => {
            var tempList = [];
            tempList = res.data.data;
            // ("List Data Leader ", tempList);
            setListLeader(tempList)

        });
    }

    // function getModelFwaData() {
    //     getFWA("flexi/place/model").then((res) => {
    //         var tempList = [];
    //         tempList = res.data.data;
    //         // ("List Data Model ", tempList);
    //         setListModelFwa(tempList)

    //     });

    // }
    function getInitialFwaData() {
        getFWA("flexi/place/0").then((res) => {
            var tempList = [];
            tempList = res.data.data;
            // ("List Data Initial ", tempList);
            setListInitialData(tempList)
            setModelFwa({
                value: tempList.model_fwa,
                label: tempList.model_fwa
            })
            setHubDarurat({
                value: tempList.darurat_hub,
                label: tempList.darurat_hub
            })
            setAlamatWfo(tempList.alamat_wfo)
            setGedungWfo(tempList.alamat_wfo_gedung)
            setKotaWfo(tempList.alamat_wfo_kota)
            setHpDarurat(tempList.darurat_no)
            setHpUtama(tempList.hp_primary)
            setHpKedua(tempList.hp_secondary)
            setEmail(tempList.email_secondary)
            setComment(tempList.comment)
            // setStartDate(tempList.submission_start_date)

            var data = tempList.alamat_wfhs
            const result1 = data.map((v) => (v.address_detail != "" ? v.address_detail : null));
            const result2 = data.map((v) => (v.city != "" ? v.city : null));
            const result3 = data.map((v) => (v.region != "" ? v.region : null));
            const result4 = data.map((v) => (v.latitude != "" ? v.latitude : null));
            const result5 = data.map((v) => (v.longitude != "" ? v.longitude : null));
            // // ("hasil result olahan alamat wfh", result1);
            if (result1[0] != null) {
                setAlamatWfh(result1[0])
                setWfhRegion(result2[0])
                setWfhCity(result3[0])
                //  // console.log("latitude wfh lokasi", result4[0])
                dispatch(setWfhLocationLat({
                    wfhLocationLat: result4[0] ? result4[0] : "0",
                }))
                dispatch(setWfhLocationLong({
                    wfhLocationLong: result5[0] ? result5[0] : "0",
                }))
            }
            if (result1[1] != null) {
                setAddRowAlamatWfh(true)
                setAlamatWfh1(result1[1])
                setWfhRegion1(result2[1])
                setWfhCity1(result3[1])
                dispatch(setWfhLocationLat1({
                    wfhLocationLat1: result4[1] ? result4[1] : "0",
                }))
                dispatch(setWfhLocationLong1({
                    wfhLocationLong1: result5[1] ? result5[1] : "0",
                }))
            }
            if (result1[2] != null) {
                setAddRowAlamatWfh1(true)
                setAlamatWfh2(result1[2])
                setWfhRegion2(result2[2])
                setWfhCity2(result3[2])
                dispatch(setWfhLocationLat2({
                    wfhLocationLat2: result4[2] ? result4[2] : "0",
                }))
                dispatch(setWfhLocationLong2({
                    wfhLocationLong2: result5[2] ? result5[2] : "0",
                }))
            }
            if (result1[3] != null) {
                setAddRowAlamatWfh2(true)
                setAlamatWfh3(result1[3])
                setWfhRegion3(result2[3])
                setWfhCity3(result3[3])
                dispatch(setWfhLocationLat3({
                    wfhLocationLat3: result4[3] ? result4[3] : "0",
                }))
                dispatch(setWfhLocationLong3({
                    wfhLocationLong3: result5[3] ? result5[3] : "0",
                }))
            }
            if (result1[4] != null) {
                setAddRowAlamatWfh3(true)
                setAlamatWfh4(result1[4])
                setWfhRegion4(result2[4])
                setWfhCity4(result3[4])
                dispatch(setWfhLocationLat4({
                    wfhLocationLat4: result4[4] ? result4[4] : "0",
                }))
                dispatch(setWfhLocationLong4({
                    wfhLocationLong4: result5[4] ? result5[4] : "0",
                }))
            }

            // let tempData = [];
            // for (let i = 0; i < tempList.justifications.length; i++) {
            //     tempData.push({
            //         label: tempList.justifications[i].name,
            //         value: tempList.justifications[i].nik,
            //         avatar: tempList.justifications[i].foto,
            //         key: i + 1
            //     });
            // }
            // setListNotifications(tempData);
            // // ("list temData partisipan", tempData)
        });
    }

    function getPartisipanData() {
        getSearchKaryawan(`?limit=5&offset=${offset}&keyword=${keyword}`).then((res) => {
            var tempList = [];
            tempList = res.data.data;
            // ("List Data Partisipan => ", tempList);
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
            // ("list temData partisipan", tempData)
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        PostFwa();
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
            // ("ini email abis validasi", data.email)
        }
    }

    const AssigneeComponent = ({ data, ...props }) => {
        return (
            <components.Option {...props}>
                <div className="d-flex align-items-center">
                    <p className="mb-0">{data.label}</p>
                </div>
            </components.Option>
        );
    };

    // const handleSetPartisipan = (item) => {
    //     var existingEntries = listNotificationPerson;
    //     // ("yang ini", existingEntries)
    //     try {
    //         const temp = existingEntries.filter((entry, indexEntry) => {
    //             if (listNotificationPerson.length > 0 && entry.nik === item.nik) {
    //                 // ("data udah ada")
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
    //         // ("data berhasil ditambah", existingEntries)
    //     }
    // };

    // const handleRemovePartisipan = (item) => {
    //     var existingEntries = listNotificationPerson;
    //     // ("ini hapus", item)
    //     existingEntries = existingEntries.filter((entry, indexEntry) => {
    //         return entry.nik != item.nik
    //     })
    //     setListNotificationPerson(existingEntries)
    // }

    useEffect(() => {
        getPartisipanData();
    }, [keyword]);

    useEffect(() => {
        if (modelFwa.label === "1 WFO - 4 WFH") {
            setSenin("WFO")
            setSelasa("WFH")
            setRabu("WFH")
            setKamis("WFH")
            setJumat("WFH")
        } if (modelFwa.label === "2 WFO - 3 WFH") {
            setSenin("WFO")
            setSelasa("WFO")
            setRabu("WFH")
            setKamis("WFH")
            setJumat("WFH")
        } if (modelFwa.label === "3 WFO - 2 WFH") {
            setSenin("WFO")
            setSelasa("WFO")
            setRabu("WFO")
            setKamis("WFH")
            setJumat("WFH")
        } if (modelFwa.label === "4 WFO - 1 WFH") {
            setSenin("WFO")
            setSelasa("WFO")
            setRabu("WFO")
            setKamis("WFO")
            setJumat("WFH")
        } if (modelFwa.label === "5 WFO") {
            setSenin("WFO")
            setSelasa("WFO")
            setRabu("WFO")
            setKamis("WFO")
            setJumat("WFO")
        } if (modelFwa.label === "5 WFH") {
            setSenin("WFH")
            setSelasa("WFH")
            setRabu("WFH")
            setKamis("WFH")
            setJumat("WFH")
        }
    }, [modelFwa]);
    useEffect(() => {
        setIsNotValidModel(false)
        if (((modelFwa.label === "1 WFO - 4 WFH") != (
            (senin === "WFO" && selasa === "WFH" && rabu === "WFH" && kamis === "WFH" && jumat === "WFH") ||
            (senin === "WFH" && selasa === "WFO" && rabu === "WFH" && kamis === "WFH" && jumat === "WFH") ||
            (senin === "WFH" && selasa === "WFH" && rabu === "WFO" && kamis === "WFH" && jumat === "WFH") ||
            (senin === "WFH" && selasa === "WFH" && rabu === "WFH" && kamis === "WFO" && jumat === "WFH") ||
            (senin === "WFH" && selasa === "WFH" && rabu === "WFH" && kamis === "WFH" && jumat === "WFO")))) {
            setIsNotValidModel(true)
        } if (((modelFwa.label === "2 WFO - 3 WFH" != (
            (senin === "WFO" && selasa === "WFO" && rabu === "WFH" && kamis === "WFH" && jumat === "WFH") ||
            (senin === "WFO" && selasa === "WFH" && rabu === "WFO" && kamis === "WFH" && jumat === "WFH") ||
            (senin === "WFO" && selasa === "WFH" && rabu === "WFH" && kamis === "WFO" && jumat === "WFH") ||
            (senin === "WFO" && selasa === "WFH" && rabu === "WFH" && kamis === "WFH" && jumat === "WFO") ||
            (senin === "WFH" && selasa === "WFO" && rabu === "WFO" && kamis === "WFH" && jumat === "WFH") ||
            (senin === "WFH" && selasa === "WFO" && rabu === "WFH" && kamis === "WFO" && jumat === "WFH") ||
            (senin === "WFH" && selasa === "WFO" && rabu === "WFH" && kamis === "WFH" && jumat === "WFO") ||
            (senin === "WFH" && selasa === "WFH" && rabu === "WFO" && kamis === "WFO" && jumat === "WFH") ||
            (senin === "WFH" && selasa === "WFH" && rabu === "WFO" && kamis === "WFH" && jumat === "WFO") ||
            (senin === "WFH" && selasa === "WFH" && rabu === "WFH" && kamis === "WFO" && jumat === "WFO"))))) {
            setIsNotValidModel(true)
        } if (((modelFwa.label === "3 WFO - 2 WFH" != (
            (senin === "WFH" && selasa === "WFH" && rabu === "WFO" && kamis === "WFO" && jumat === "WFO") ||
            (senin === "WFH" && selasa === "WFO" && rabu === "WFH" && kamis === "WFO" && jumat === "WFO") ||
            (senin === "WFH" && selasa === "WFO" && rabu === "WFO" && kamis === "WFH" && jumat === "WFO") ||
            (senin === "WFH" && selasa === "WFO" && rabu === "WFO" && kamis === "WFO" && jumat === "WFH") ||
            (senin === "WFO" && selasa === "WFH" && rabu === "WFH" && kamis === "WFO" && jumat === "WFO") ||
            (senin === "WFO" && selasa === "WFH" && rabu === "WFO" && kamis === "WFH" && jumat === "WFO") ||
            (senin === "WFO" && selasa === "WFH" && rabu === "WFO" && kamis === "WFO" && jumat === "WFH") ||
            (senin === "WFO" && selasa === "WFO" && rabu === "WFH" && kamis === "WFH" && jumat === "WFO") ||
            (senin === "WFO" && selasa === "WFO" && rabu === "WFH" && kamis === "WFO" && jumat === "WFH") ||
            (senin === "WFO" && selasa === "WFO" && rabu === "WFO" && kamis === "WFH" && jumat === "WFH"))))) {
            setIsNotValidModel(true)
        } if (((modelFwa.label === "4 WFO - 1 WFH" != (
            (senin === "WFH" && selasa === "WFO" && rabu === "WFO" && kamis === "WFO" && jumat === "WFO") ||
            (senin === "WFO" && selasa === "WFH" && rabu === "WFO" && kamis === "WFO" && jumat === "WFO") ||
            (senin === "WFO" && selasa === "WFO" && rabu === "WFH" && kamis === "WFO" && jumat === "WFO") ||
            (senin === "WFO" && selasa === "WFO" && rabu === "WFO" && kamis === "WFH" && jumat === "WFO") ||
            (senin === "WFO" && selasa === "WFO" && rabu === "WFO" && kamis === "WFO" && jumat === "WFH"))))) {
            setIsNotValidModel(true)
        } if (((modelFwa.label === "5 WFO") != (senin === "WFO" && selasa === "WFO" && rabu === "WFO" && kamis === "WFO" && jumat === "WFO"))) {
            setIsNotValidModel(true)
        } if (((modelFwa.label === "5 WFH") != (senin === "WFH" && selasa === "WFH" && rabu === "WFH" && kamis === "WFH" && jumat === "WFH"))) {
            setIsNotValidModel(true)
        }
    }, [senin, selasa, rabu, kamis, jumat, sabtu, minggu]);

    useEffect(() => {
        setSabtu("OFF")
        setMinggu("OFF")
        getLeaderData()
        // getModelFwaData()
        getInitialFwaData()
        dispatch(setIsPernyataanModalYes({ isPernyataanModalYes: false }))
        dispatch(setIsDragable({
            isDragable: true
        }))
    }, [1])

    // const GuestsComponent = ({ data, ...props }) => {
    //     return (
    //         <components.Option {...props}>
    //             <div className='d-flex flex-wrap align-items-center'>
    //                 <Avatar className='my-0 me-1' size='sm' img={data.avatar} />
    //                 <div>{data.label}</div>
    //             </div>
    //         </components.Option>
    //     )
    // }
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
        // // ("list notification person", listNotificationPerson)
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
        // ("list notification person", tempData)

    }, [listNotificationPerson])

    useEffect(() => {
        // ("hasil lemparan location lat modal", wfhLocationLat1)
        // ("hasil lemparan location long modal", wfhLocationLong1)
    }, [wfhLocationLat1, wfhLocationLong1])



    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4' className='text-primary'>Buat Pengajuan FWA</CardTitle>
            </CardHeader>
            <CardBody>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Row className="mb-6">
                            <Col md='4' sm='12'>
                                <Label className='form-label' htmlFor='nameMulti'>
                                    Tanggal Mulai
                                </Label>
                                <Flatpickr className='form-control' options={{
                                    minDate: 'today',
                                    dateFormat: "d F Y"
                                }} value={startDate} onChange={(date) => setStartDate(date)} id='default-picker' />
                            </Col>
                        </Row>
                        <Row className="mb-6">
                            <Col md='4' sm='12'>
                                <Label className='form-label' htmlFor='lastNameMulti'>
                                    Model FWA
                                </Label>
                                <Select
                                    id="task-assignee"
                                    className="react-select"
                                    classNamePrefix="select"
                                    isClearable={false}
                                    options={assigneeOptions}
                                    theme={selectThemeColors}
                                    value={modelFwa}
                                    onChange={(data) => setModelFwa(data)}
                                    components={{ Option: AssigneeComponent }}
                                />
                            </Col>
                        </Row>
                        <Row className='mb-6'>
                            <div className="mt-4">
                                <div className="d-flex">
                                    {dataHari.map((item, index) => (
                                        <div key={index} style={{ maxWidth: "max-content" }} className={`h-100 border-2 border overflow-hidden rounded bg-white me-5 ${(((item === "Senin" && senin) || (item === "Selasa" && selasa) || (item === "Rabu" && rabu) || (item === "Kamis" && kamis) || (item === "Jum'at" && jumat)) && !isNotValidModel)
                                            ? "border-primary"
                                            : ((item === "Minggu" && (minggu === "OFF")) || (item === "Sabtu" && (sabtu === "OFF"))) && isNotValidModel ? "border-secondary" : isNotValidModel ? "border-warning" : "border-secondary"
                                            }`}
                                        >
                                            <div className={`${(((item === "Senin" && senin) || (item === "Selasa" && selasa) || (item === "Rabu" && rabu) || (item === "Kamis" && kamis) || (item === "Jum'at" && jumat)) && !isNotValidModel)
                                                ? "bg-primary"
                                                : ((item === "Minggu" && (minggu === "OFF")) || (item === "Sabtu" && (sabtu === "OFF"))) && isNotValidModel ? "bg-secondary" : isNotValidModel ? "bg-warning" : "bg-secondary"
                                                } text-white justify-content-center py-2 px-10`}
                                            >
                                                <div className="d-grid justify-content-center fw-bolder">
                                                    {item}
                                                </div>
                                            </div>
                                            <div className="justify-content-center py-4 px-10">
                                                <div key={item} className="form-check d-flex">
                                                    {item === "Senin" ? (
                                                        <Input type='radio' name="senin"
                                                            id="senin"
                                                            checked={senin === "WFH" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSenin("WFH");
                                                            }} />
                                                    ) : item === "Selasa" ? (
                                                        <Input type='radio' name="selasa"
                                                            id="selasa"
                                                            checked={selasa === "WFH" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSelasa("WFH");
                                                            }} />
                                                    ) : item === "Rabu" ? (
                                                        <Input type='radio' name="rabu"
                                                            id="rabu"
                                                            checked={rabu === "WFH" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setRabu("WFH");
                                                            }} />
                                                    ) : item === "Kamis" ? (
                                                        <Input type='radio' name="kamis"
                                                            id="kamis"
                                                            checked={kamis === "WFH" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setKamis("WFH");
                                                            }} />
                                                    ) : item === "Jum'at" ? (
                                                        <Input type='radio' name="jumat"
                                                            id="jumat"
                                                            checked={jumat === "WFH" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setJumat("WFH");
                                                            }} />
                                                    ) : item === "Sabtu" ? (
                                                        <Input type='radio' name="sabtu"
                                                            id="sabtu"
                                                            checked={sabtu === "WFH" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSabtu("WFH");
                                                            }} />
                                                    ) : (
                                                        <Input type='radio' name="minggu"
                                                            id="minggu"
                                                            checked={minggu === "WFH" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setMinggu("WFH");
                                                            }} />
                                                    )}
                                                    <Label className='form-check-label ms-2' htmlFor='wfhDays'>
                                                        WFH
                                                    </Label>
                                                </div>
                                                <div className="form-check d-flex">
                                                    {item === "Senin" ? (
                                                        <Input type='radio' name="senin"
                                                            id="senin"
                                                            checked={senin === "WFO" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSenin("WFO");
                                                            }} />
                                                    ) : item === "Selasa" ? (
                                                        <Input
                                                            type="radio"
                                                            name="selasa"
                                                            id="selasa"
                                                            checked={selasa === "WFO" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSelasa("WFO");
                                                            }}
                                                        />
                                                    ) : item === "Rabu" ? (
                                                        <Input
                                                            type="radio"
                                                            name="rabu"
                                                            id="rabu"
                                                            checked={rabu === "WFO" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setRabu("WFO");
                                                            }}
                                                        />
                                                    ) : item === "Kamis" ? (
                                                        <Input
                                                            type="radio"
                                                            name="kamis"
                                                            id="kamis"
                                                            checked={kamis === "WFO" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setKamis("WFO");
                                                            }}
                                                        />
                                                    ) : item === "Jum'at" ? (
                                                        <Input
                                                            type="radio"
                                                            name="jumat"
                                                            id="jumat"
                                                            checked={jumat === "WFO" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setJumat("WFO");
                                                            }}
                                                        />
                                                    ) : item === "Sabtu" ? (
                                                        <Input
                                                            type="radio"
                                                            name="sabtu"
                                                            id="sabtu"
                                                            checked={sabtu === "WFO" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSabtu("WFO");
                                                            }}
                                                        />
                                                    ) : (
                                                        <Input
                                                            type="radio"
                                                            name="minggu"
                                                            id="minggu"
                                                            checked={minggu === "WFO" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setMinggu("WFO");
                                                            }}
                                                        />
                                                    )}
                                                    <Label className='form-check-label ms-2' htmlFor='wfoDays'>
                                                        WFO
                                                    </Label>
                                                </div>
                                                <div className="form-check d-flex">
                                                    {item === "Senin" ? (
                                                        <Input
                                                            type="radio"
                                                            name="senin"
                                                            id="senin"
                                                            checked={senin === "OFF" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSenin("OFF");
                                                            }}
                                                        />
                                                    ) : item === "Selasa" ? (
                                                        <Input
                                                            type="radio"
                                                            name="selasa"
                                                            id="selasa"
                                                            checked={selasa === "OFF" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSelasa("OFF");
                                                            }}
                                                        />
                                                    ) : item === "Rabu" ? (
                                                        <Input
                                                            type="radio"
                                                            name="rabu"
                                                            id="rabu"
                                                            checked={rabu === "OFF" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setRabu("OFF");
                                                            }}
                                                        />
                                                    ) : item === "Kamis" ? (
                                                        <Input
                                                            type="radio"
                                                            name="kamis"
                                                            id="kamis"
                                                            checked={kamis === "OFF" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setKamis("OFF");
                                                            }}
                                                        />
                                                    ) : item === "Jum'at" ? (
                                                        <Input
                                                            type="radio"
                                                            name="jumat"
                                                            id="jumat"
                                                            checked={jumat === "OFF" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setJumat("OFF");
                                                            }}
                                                        />
                                                    ) : item === "Sabtu" ? (
                                                        <Input
                                                            type="radio"
                                                            name="sabtu"
                                                            id="sabtu"
                                                            checked={sabtu === "OFF" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSabtu("OFF");
                                                            }}
                                                        />
                                                    ) : (
                                                        <Input
                                                            type="radio"
                                                            name="minggu"
                                                            id="minggu"
                                                            checked={minggu === "OFF" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setMinggu("OFF");
                                                            }}
                                                        />
                                                    )}
                                                    <Label className='form-check-label ms-2' htmlFor='offDays'>
                                                        OFF
                                                    </Label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Row>
                        <Row className={`mb-6 ${isNotValidModel ? "" : "d-none"}`}>
                            <Col md="12">
                                <Badge tag='div' color={`light-warning`}>
                                    Pembagian model tidak sesuai, perhitungan hanya berlaku untuk hari kerja
                                </Badge>
                            </Col>
                        </Row>
                        <h6>Informasi Alamat</h6>
                        <Row className="mb-6">
                            <Label className='form-label'>
                                Alamat WFO
                            </Label>
                            <Col md='4' sm='12'>
                                <Input type='text' name='alamatWfo' id='alamatWfo'
                                    placeholder="Nama Alamat"
                                    defaultValue={listInitialData.alamat_wfo}
                                    onChange={(e) => setAlamatWfo(e.target.value)} />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='gedungWfo' id='gedungWfo'
                                    defaultValue={listInitialData.alamat_wfo_gedung}
                                    placeholder="Gedung"
                                    onChange={(e) => setGedungWfo(e.target.value)} />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kotaWfo' id='kotaWfo'
                                    defaultValue={listInitialData.alamat_wfo_kota}
                                    placeholder="Kota"
                                    onChange={(e) => setKotaWfo(e.target.value)} />
                            </Col>
                        </Row>
                        <Label className='form-label'>
                            Alamat WFH
                        </Label>
                        <Row className="mb-4">
                            <Col md='4' sm='12'>
                                <Input type='text' name='alamatWfh' id='alamatWfh'
                                    value={alamatWfh}
                                    placeholder="Nama Jalan"
                                    onChange={(e) => setAlamatWfh(e.target.value)} />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kecamatanWfh' id='kecamatanWfh' value={wfhRegion}
                                    placeholder="Kecamatan"
                                    onChange={(e) => setWfhRegion(e.target.value)} />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kotaWfh' id='kotaWfh' value={wfhCity}
                                    placeholder="Kota"
                                    onChange={(e) => setWfhCity(e.target.value)} />
                            </Col>
                            <Col md='2' className='d-grid align-items-center'>
                                <div>
                                    <span title="Lokasi" className="me-3 cursor-pointer"
                                        onClick={(() => {
                                            dispatch(setIsLocationModal({ isLocationModal: true }))
                                            dispatch(setIdWfhLocation({
                                                idWfhLocation: "0",
                                            }))
                                            //  // console.log(idWfhLocation)
                                        })}
                                    >
                                        <Location20Filled color={wfhLocationLat ? "#319795" : "#718096"} size={20} />
                                    </span>
                                    <span title="Hapus" className="me-3 cursor-pointer"
                                        onClick={(() => {
                                            setAlamatWfh(""),
                                                setWfhRegion(""),
                                                setWfhCity("")
                                            dispatch(setWfhLocationLat({
                                                wfhLocationLat: "",
                                            }))
                                            dispatch(setWfhLocationLong({
                                                wfhLocationLong: "",
                                            }))
                                        })} >
                                        <Delete20Filled color="#718096" size={20} />
                                    </span>
                                    <span title="Tambah Alamat" className={`cursor-pointer ${rowAlamatWfh ? "d-none" : ""}`} onClick={(() => { setAddRowAlamatWfh(true) })}>
                                        <AddSquare20Regular color="#718096" size={20} />
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Row className={`mb-4  ${rowAlamatWfh ? "" : "d-none"}`}>
                            <Col md='4' sm='12'>
                                <Input type='text' name='alamatWfh1' id='alamatWfh1' value={alamatWfh1}
                                    placeholder="Nama Jalan"
                                    onChange={(e) => setAlamatWfh1(e.target.value)} />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kecamatanWfh' id='kecamatanWfh' value={wfhRegion1}
                                    placeholder="Kecamatan"
                                    onChange={(e) => setWfhRegion1(e.target.value)} />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kotaWfh' id='kotaWfh' value={wfhCity1}
                                    placeholder="Kota"
                                    onChange={(e) => setWfhCity1(e.target.value)} />
                            </Col>
                            <Col md='2' className='d-grid align-items-center'>
                                <div>
                                    <span title="Lokasi" className="me-3 cursor-pointer"
                                        onClick={(() => {
                                            // dispatch({
                                            //     type: "set", isLocationModal: true,
                                            //     idWfhLocation: "0"
                                            // });
                                            dispatch(setIsLocationModal({ isLocationModal: true }))
                                            dispatch(setIdWfhLocation({
                                                idWfhLocation: "1",
                                            }))
                                        })}
                                    >
                                        <Location20Filled color={wfhLocationLat1 ? "#319795" : "#718096"} size={20} />
                                    </span>
                                    <span title="Hapus" className="me-3 cursor-pointer"
                                        onClick={(() => {
                                            setAlamatWfh1(""),
                                                setWfhRegion1(""),
                                                setWfhCity1(""),
                                                setAddRowAlamatWfh(false)
                                            // dispatch({
                                            //     type: "set", wfhLocationLat: ""
                                            // });
                                            dispatch(setWfhLocationLat1({
                                                wfhLocationLat1: "",
                                            }))
                                            dispatch(setWfhLocationLong1({
                                                wfhLocationLong1: "",
                                            }))
                                        })} >
                                        <Delete20Filled color="#718096" size={20} />
                                    </span>
                                    <span title="Tambah Alamat" className={`cursor-pointer ${rowAlamatWfh1 ? "d-none" : ""}`} onClick={(() => { setAddRowAlamatWfh1(true) })}>
                                        <AddSquare20Regular color="#718096" size={20} />
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Row className={`mb-4  ${rowAlamatWfh1 ? "" : "d-none"}`}>
                            <Col md='4' sm='12'>
                                <Input type='text' name='alamatWfh2' id='alamatWfh2' value={alamatWfh2}
                                    placeholder="Nama Jalan"
                                    onChange={(e) => setAlamatWfh2(e.target.value)} />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kecamatanWf2' id='kecamatanWf2' value={wfhRegion2}
                                    placeholder="Kecamatan"
                                    onChange={(e) => setWfhRegion2(e.target.value)} />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kotaWf2' id='kotaWf2' value={wfhCity2}
                                    placeholder="Kota"
                                    onChange={(e) => setWfhCity2(e.target.value)} />
                            </Col>
                            <Col md='2' className='d-grid align-items-center'>
                                <div>
                                    <span title="Lokasi" className="me-3 cursor-pointer"
                                        onClick={(() => {
                                            // dispatch({
                                            //     type: "set", isLocationModal: true,
                                            //     idWfhLocation: "0"
                                            // });
                                            dispatch(setIsLocationModal({ isLocationModal: true }))
                                            dispatch(setIdWfhLocation({
                                                idWfhLocation: "2",
                                            }))
                                        })}
                                    >
                                        <Location20Filled color={wfhLocationLat2 ? "#319795" : "#718096"} size={20} />
                                    </span>
                                    <span title="Hapus" className="me-3 cursor-pointer"
                                        onClick={(() => {
                                            setAlamatWfh2(""),
                                                setWfhRegion2(""),
                                                setWfhCity2(""),
                                                setAddRowAlamatWfh1(false)
                                            dispatch(setWfhLocationLat2({
                                                wfhLocationLat2: "",
                                            }))
                                            dispatch(setWfhLocationLong2({
                                                wfhLocationLong2: "",
                                            }))
                                        })} >
                                        <Delete20Filled color="#718096" size={20} />
                                    </span>
                                    <span title="Tambah Alamat" className={`cursor-pointer ${rowAlamatWfh2 ? "d-none" : ""}`} onClick={(() => { setAddRowAlamatWfh2(true) })}>
                                        <AddSquare20Regular color="#718096" size={20} />
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Row className={`mb-4  ${rowAlamatWfh2 ? "" : "d-none"}`}>
                            <Col md='4' sm='12'>
                                <Input type='text' name='alamatWfh3' id='alamatWfh3' value={alamatWfh3}
                                    placeholder="Nama Jalan"
                                    onChange={(e) => setAlamatWfh3(e.target.value)} />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kecamatanWf3' id='kecamatanWf3' value={wfhRegion3}
                                    placeholder="Kecamatan"
                                    onChange={(e) => setWfhRegion3(e.target.value)} />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kotaWf3' id='kotaWf3' value={wfhCity3}
                                    placeholder="Kota"
                                    onChange={(e) => setWfhCity3(e.target.value)} />
                            </Col>
                            <Col md='2' className='d-grid align-items-center'>
                                <div>
                                    <span title="Lokasi" className="me-3 cursor-pointer"
                                        onClick={(() => {
                                            // dispatch({
                                            //     type: "set", isLocationModal: true,
                                            //     idWfhLocation: "0"
                                            // });
                                            dispatch(setIsLocationModal({ isLocationModal: true }))
                                            dispatch(setIdWfhLocation({
                                                idWfhLocation: "3",
                                            }))
                                        })}
                                    >
                                        <Location20Filled color={wfhLocationLat3 ? "#319795" : "#718096"} size={20} />
                                    </span>
                                    <span title="Hapus" className="me-3 cursor-pointer"
                                        onClick={(() => {
                                            setAlamatWfh3(""),
                                                setWfhRegion3(""),
                                                setWfhCity3(""),
                                                setAddRowAlamatWfh2(false)
                                            dispatch(setWfhLocationLat3({
                                                wfhLocationLat3: "",
                                            }))
                                            dispatch(setWfhLocationLong3({
                                                wfhLocationLong3: "",
                                            }))
                                        })} >
                                        <Delete20Filled color="#718096" size={20} />
                                    </span>
                                    <span title="Tambah Alamat" className={`cursor-pointer ${rowAlamatWfh3 ? "d-none" : ""}`} onClick={(() => { setAddRowAlamatWfh3(true) })}>
                                        <AddSquare20Regular color="#718096" size={20} />
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Row className={`mb-4  ${rowAlamatWfh3 ? "" : "d-none"}`}>
                            <Col md='4' sm='12'>
                                <Input type='text' name='alamatWfh4' id='alamatWfh4' value={alamatWfh4}
                                    placeholder="Nama Jalan"
                                    onChange={(e) => setAlamatWfh4(e.target.value)} />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kecamatanWf4' id='kecamatanWf4' value={wfhRegion4}
                                    placeholder="Kecamatan"
                                    onChange={(e) => setWfhRegion4(e.target.value)} />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kotaWf4' id='kotaWf4' value={wfhCity4}
                                    placeholder="Kota"
                                    onChange={(e) => setWfhCity4(e.target.value)} />
                            </Col>
                            <Col md='2' className='d-grid align-items-center'>
                                <div>
                                    <span title="Lokasi" className="me-3 cursor-pointer"
                                        onClick={(() => {
                                            // dispatch({
                                            //     type: "set", isLocationModal: true,
                                            //     idWfhLocation: "0"
                                            // });
                                            dispatch(setIsLocationModal({ isLocationModal: true }))
                                            dispatch(setIdWfhLocation({
                                                idWfhLocation: "4",
                                            }))
                                        })}
                                    >
                                        <Location20Filled color={wfhLocationLat4 ? "#319795" : "#718096"} size={20} />
                                    </span>
                                    <span title="Hapus" className="me-3 cursor-pointer"
                                        onClick={(() => {
                                            setAlamatWfh4(""),
                                                setWfhRegion4(""),
                                                setWfhCity4(""),
                                                setAddRowAlamatWfh3(false)
                                            dispatch(setWfhLocationLat4({
                                                wfhLocationLat4: "",
                                            }))
                                            dispatch(setWfhLocationLong4({
                                                wfhLocationLong4: "",
                                            }))
                                        })} >
                                        <Delete20Filled color="#718096" size={20} />
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <h6>Informasi Kontak</h6>
                        <Row className="mb-6">
                            <Col md='4' sm='12'>
                                <Label className='form-label' htmlFor='kontakUtama'>
                                    Kontak Utama
                                </Label>
                                <Input type='text' name='kontakUtama' id='kontakUtama'
                                    value={hpUtama}
                                    placeholder="Kontak utama"
                                    onChange={(e) => setHpUtama(e.target.value)} />
                            </Col>
                            <Col md='4' sm='12'>
                                <Label className='form-label' htmlFor='kontakLainnya'>
                                    Kontak Lainnya
                                </Label>
                                <Input type='text' name='kontakLainnya' id='kontakLainnya'
                                    value={hpKedua}
                                    placeholder="Kontak Lainnya"
                                    onChange={(e) => setHpKedua(e.target.value)} />
                            </Col>
                        </Row>
                        <Row className="mb-6">
                            <Col md='4' sm='12'>
                                <Label className='form-label' htmlFor='kontakDarurat'>
                                    Kontak Darurat
                                </Label>
                                <Input type='text' name='kontakDarurat' id='kontakDarurat'
                                    value={hpDarurat}
                                    placeholder="Kontak darurat"
                                    onChange={(e) => setHpDarurat(e.target.value)} />
                            </Col>
                            <Col md='4' sm='12'>
                                <Label className='form-label' htmlFor='hubunganKontak'>
                                    Hubungan Kontak Darurat
                                </Label>
                                <Select
                                    id="task-assignee"
                                    className="react-select"
                                    classNamePrefix="select"
                                    isClearable={false}
                                    options={optionsHub}
                                    theme={selectThemeColors}
                                    value={hubDarurat}
                                    onChange={(data) => setHubDarurat(data)}
                                    components={{ Option: AssigneeComponent }}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-6">
                            <Col md='4' sm='12'>
                                <Label className='form-label' htmlFor='email'>
                                    Alamat Email (bukan email perusahaan)
                                </Label>
                                <Input type='text' name='email' id='email' placeholder='Alamat Email (bukan email perusahaan)'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </Col>
                        </Row>
                        <Row className="mb-6">
                            <Col md='12' sm='12'>
                                <Label className='form-label' htmlFor='alasan'>
                                    Alasan Mengajukan FWA
                                </Label>
                                <Input type="textarea" name='alasan' id='alasan'
                                    value={comment}
                                    placeholder="-"
                                    onChange={(e) => setComment(e.target.value)} />
                            </Col>
                        </Row>
                        <Row className="mb-6" style={{ minHeight: "max-content" }}>
                            <Col md='6' sm='12'>
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
                            <Col md='6' sm='12'>
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
                                    // onChange={data => // ("ini ke klik select", [...data])}
                                    components={{
                                        Option: PartisipantComponent
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className='mb-6'>
                            <Col md='12' sm='12'>
                                <div className='fs-4 mb-6' htmlFor='denganIni'>
                                    Dengan ini saya menyatakan bersedia mentaati peraturan FWA
                                    sepenuhnya yang terdiri dari dan tidak terbatas pada:
                                </div>
                            </Col>
                            <Col md='12' sm='12'>
                                <div className='form-check form-check-success mb-6'>
                                    <Input type='checkbox' id='peraturanCheck' checked={pernyataanCheck} onClick={() => setPernyataanCheck(!pernyataanCheck)} />
                                    <Label className='form-check-label' htmlFor='peraturanCheck'>
                                        Peraturan perusahaan dan kebijakan FWA yang berlaku.{" "}
                                        <a className="text-info cursor-pointer"
                                            onClick={() => { dispatch(setIsImageModal({ isImageModal: true })) }}
                                        >
                                            Lihat selengkapnya
                                        </a>
                                    </Label>
                                </div>
                            </Col>
                            <Col md='12' sm='12'>
                                <div className='form-check form-check-success mb-6'>
                                    <Input type='checkbox' id='faktaCheck' checked={isPernyataanModalYes === true ? true : false} onClick={() => { dispatch(setIsPernyataanModal({ isPernyataanModal: true })) }} />
                                    <Label className='form-check-label' htmlFor='faktaCheck'>
                                        Menyanggupi fakta kesanggupan pelaksanaan FWA
                                    </Label>
                                </div>
                            </Col>
                        </Row>
                        <Col sm='12'>
                            <Row>
                                <Col className='d-grid justify-content-start'>
                                    <Button className='me-1' color='primary' type='submit' disabled={!isPernyataanModalYes} onClick={() => { handleSubmit }}>
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
                <ImageFwaModal />
                <PernyataanFwaModal noHp={hpUtama} tanggal={startDate} />
                <LocationModal />
            </CardBody>
        </Card >
    )
}

const CreateFwa = () => {
    return (
        <Fragment>
            <Row>
                <PerfectScrollbar
                    className='media-list scrollable-container'
                    options={{
                        wheelPropagation: false
                    }}>
                    <Col sm='12'>
                        {MultipleColumnForm()}
                    </Col>
                </PerfectScrollbar>
            </Row>
        </Fragment>
    )
}
export default CreateFwa
