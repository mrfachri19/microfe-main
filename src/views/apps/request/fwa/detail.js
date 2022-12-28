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
    UncontrolledButtonDropdown,
    DropdownMenu,
    DropdownItem,
    DropdownToggle
} from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import PerfectScrollbar from "react-perfect-scrollbar";
import Select, { components } from "react-select"; //eslint-disable-line
import moment from "moment";

// ** Styles Imports
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";

// ** Utils
import { isObjEmpty, selectThemeColors } from "@utils";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@components/avatar";
import Timeline from '@components/timeline'
import TimelineCustom from '@components/timeline/custom'
import AvatarGroup from '@components/avatar-group'
import jsonImg from '@src/assets/images/icons/json.png'
import ceo from '@src/assets/images/portrait/small/avatar-s-9.jpg'

// ** Icons Imports

import {
    categoryRequest,
    selectPermohonanId,
    setIsValidationModal,
    setIsPostApproved,
    setIsValidationModalYes,
    setIsLocationModal,
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
    setIdWfhLocation,
    setIsDragable
} from "../store";
import { approvalPermohonan, cancelPermohonan, getFWA } from '../../../../api';
import { List, MoreVertical } from 'react-feather'
import ValidationModal from '../modals/ValidationModal';
import SuccessModal from '../modals/SuccessModal';
import toastAlert from "@src/utils/alert";
import { AddSquare20Regular, Delete20Filled, Location20Filled } from '@fluentui/react-icons';
import LocationModal from '../modals/LocationModal';


const MultipleColumnForm = () => {
    const [picker, setPicker] = useState(new Date())
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [senin, setSenin] = React.useState("");
    const [selasa, setSelasa] = React.useState("");
    const [rabu, setRabu] = React.useState("");
    const [kamis, setKamis] = React.useState("");
    const [jumat, setJumat] = React.useState("");
    const [sabtu, setSabtu] = React.useState("");
    const [minggu, setMinggu] = React.useState("");
    const [notificaionNik, setNotificaionNik] = React.useState("");
    const [notificaionNama, setNotificaionNama] = React.useState("");
    const [showSnakebar, setShowSnakebar] = React.useState(false);
    const [listNotificationPerson, setListNotificationPerson] = React.useState([]);
    const [listPermohonanDetail, setListPermohonanDetail] = React.useState([]);
    const [listJustification, setListJustification] = React.useState([]);
    const [listAlamatWfh, setListAlamatWfh] = React.useState([]);
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
    const [rowAlamatWfh, setAddRowAlamatWfh] = React.useState(false);
    const [rowAlamatWfh1, setAddRowAlamatWfh1] = React.useState(false);
    const [rowAlamatWfh2, setAddRowAlamatWfh2] = React.useState(false);
    const [rowAlamatWfh3, setAddRowAlamatWfh3] = React.useState(false);
    const [confirmation, setConfirmation] = React.useState(true);
    const [approvalDeskripsi, setApprovalDeskripsi] = React.useState("");
    const [textModal, setTextModal] = React.useState("");
    const [idFromUrl, setIdFromUrl] = React.useState(window.location.href.split('/')[6]);
    const selectedPermohonanId = useSelector((state) => state.request.selectedPermohonanId.selectedPermohonanId);
    const category = useSelector((state) => state.request.category.category);
    const isValidationModal = useSelector((state) => state.request.isValidationModal.isValidationModal);
    const isValidationModalYes = useSelector((state) => state.request.isValidationModalYes.isValidationModalYes);
    const isPostApproved = useSelector((state) => state.request.isPostApproved.isPostApproved);
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

    function getPermohonanData() {
        getFWA(`flexi/place/${selectedPermohonanId ? selectedPermohonanId : idFromUrl}`).then((res) => {
            var tempList = [];
            tempList = res.data.data;
            //  // console.log("List Data Permohonan Detail ", tempList);
            setListPermohonanDetail(tempList)
            setListJustification(tempList.justifications)
            //  // console.log("List Data justification ", tempList.justifications);
            setListNotificationPerson(tempList.notifications)

            setListAlamatWfh(tempList.alamat_wfhs)
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

        });
    }

    useEffect(() => {
        getPermohonanData()
        dispatch(setIsDragable({
            isDragable: false
        }))
        //  // console.log("ID permohonan", selectedPermohonanId)
    }, [1])

    const AssigneeComponent = ({ data, ...props }) => {
        return (
            <components.Option {...props}>
                <div className="d-flex align-items-center">
                    <img
                        className="d-block rounded-circle me-50"
                        src={data.img}
                        height="26"
                        width="26"
                        alt={data.label}
                    />
                    <p className="mb-0">{data.label}</p>
                </div>
            </components.Option>
        );
    };
    const dataHari = [
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jum'at",
        "Sabtu",
        "Minggu"
    ];

    function CancelFwa() {

        let data = {
            id: selectedPermohonanId ? selectedPermohonanId : idFromUrl
        };

        cancelPermohonan(data).then((res) => {
            //  // console.log("cancel permohononan", res);
            toastAlert("success", "Berhasil membatalkan permohonan");
            dispatch(setIsPostApproved({ isPostApproved: false }))
            dispatch(setIsValidationModal({ isValidationModal: false }))
            dispatch(categoryRequest({ category: "dashboard_web" }));
            dispatch(setIsValidationModalYes({ isValidationModalYes: true }))
            setTimeout(() => {
                navigate("/app/request")
            }, 3000);
        });
    }

    function approvalFwa() {

        let data = {
            id: selectedPermohonanId ? selectedPermohonanId : idFromUrl,
            action: confirmation ? "APPROVE" : "REJECT",
            model_fwa: listPermohonanDetail.model_fwa,
            senin: listPermohonanDetail.senin,
            selasa: listPermohonanDetail.selasa,
            rabu: listPermohonanDetail.rabu,
            kamis: listPermohonanDetail.kamis,
            jumat: listPermohonanDetail.jumat,
            sabtu: listPermohonanDetail.sabtu,
            minggu: listPermohonanDetail.minggu,
            comment: approvalDeskripsi
        };

        approvalPermohonan(data).then((res) => {
            //  // console.log("Konfirmasi permohononan", res);
            setShowSnakebar(true);
            toastAlert("success", "Berhasil setujui permohonan");
            dispatch(setIsPostApproved({ isPostApproved: false }))
            dispatch(setIsValidationModal({ isValidationModal: false }))
            dispatch(categoryRequest({ category: "dashboard_web" }));
            dispatch(setIsValidationModalYes({ isValidationModalYes: true }))
            setTimeout(() => {
                navigate("/app/request")
            }, 3000);
        });
    }

    useEffect(() => {
        if (isPostApproved === true) {
            if (category != "need_approve_web") {
                CancelFwa()
                setTextModal("Pembatalan permohonan berhasil dilakukan !")
            }
            if (category === "need_approve_web") {
                approvalFwa()
                setTextModal("Permohonan persetujuan berhasil dikirim !")
            }
        }
    }, [isPostApproved])

    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4' className='text-primary'>Detail Pengajuan FWA</CardTitle>
            </CardHeader>
            <CardBody>
                <Form>
                    <Row>
                        <Row className="mb-6">
                            <Col md='4' sm='12'>
                                <Label className='form-label' htmlFor='nameMulti'>
                                    Tanggal Mulai
                                </Label>
                                <Input type='text' name='tanggalMulai' id='tanggalMulai'
                                    placeholder="0"
                                    value={`${listPermohonanDetail ? moment(listPermohonanDetail.submission_start_date).format("DD MMMM YYYY") : "-"}`}
                                    disabled />
                            </Col>
                        </Row>
                        <Row className="mb-6">
                            <Col md='4' sm='12'>
                                <Label className='form-label' htmlFor='modelFwa'>
                                    Model FWA
                                </Label>
                                <Input type='text' name='modelFwa' id='modelFwa' defaultValue={listPermohonanDetail.model_fwa} disabled placeholder='Model FWA' />
                            </Col>
                        </Row>
                        <Row className='mb-6'>
                            <div className="mt-4">
                                <div className="d-flex">
                                    {dataHari.map((item, index) => (
                                        <div key={index} style={{ maxWidth: "max-content" }} className={`h-100 border-2 border overflow-hidden rounded bg-white me-5 ${item === "Minggu"
                                            ? "border-secondary"
                                            : item === "Sabtu"
                                                ? "border-secondary"
                                                : item === "Senin" && senin
                                                    ? "border-primary"
                                                    : item === "Selasa" && selasa
                                                        ? "border-primary"
                                                        : item === "Rabu" && rabu
                                                            ? "border-primary"
                                                            : item === "Kamis" && kamis
                                                                ? "border-primary"
                                                                : item === "Jum'at" && jumat
                                                                    ? "border-primary"
                                                                    : "border-primary"
                                            }`}
                                        >
                                            <div className={`${item === "Minggu"
                                                ? "bg-secondary"
                                                : item === "Sabtu"
                                                    ? "bg-secondary"
                                                    : item === "Senin" && senin
                                                        ? "bg-primary"
                                                        : item === "Selasa" && selasa
                                                            ? "bg-primary"
                                                            : item === "Rabu" && rabu
                                                                ? "bg-primary"
                                                                : item === "Kamis" && kamis
                                                                    ? "bg-primary"
                                                                    : item === "Jum'at" && jumat
                                                                        ? "bg-primary"
                                                                        : "bg-primary"
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
                                                            checked={listPermohonanDetail.senin === "WFH" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSenin("WFH");
                                                            }} disabled
                                                            readOnly />
                                                    ) : item === "Selasa" ? (
                                                        <Input type='radio' name="selasa"
                                                            id="selasa"
                                                            checked={listPermohonanDetail.selasa === "WFH" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSelasa("WFH");
                                                            }} disabled
                                                            readOnly />
                                                    ) : item === "Rabu" ? (
                                                        <Input type='radio' name="rabu"
                                                            id="rabu"
                                                            checked={listPermohonanDetail.rabu === "WFH" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setRabu("WFH");
                                                            }} disabled
                                                            readOnly />
                                                    ) : item === "Kamis" ? (
                                                        <Input type='radio' name="kamis"
                                                            id="kamis"
                                                            checked={listPermohonanDetail.kamis === "WFH" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setKamis("WFH");
                                                            }} disabled
                                                            readOnly />
                                                    ) : item === "Jum'at" ? (
                                                        <Input type='radio' name="jumat"
                                                            id="jumat"
                                                            checked={listPermohonanDetail.jumat === "WFH" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setJumat("WFH");
                                                            }} disabled
                                                            readOnly />
                                                    ) : item === "Sabtu" ? (
                                                        <Input type='radio' name="sabtu"
                                                            id="sabtu"
                                                            checked={listPermohonanDetail.sabtu === "WFH" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSabtu("WFH");
                                                            }} disabled
                                                            readOnly />
                                                    ) : (
                                                        <Input type='radio' name="minggu"
                                                            id="minggu"
                                                            checked={listPermohonanDetail.minggu === "WFH" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setMinggu("WFH");
                                                            }} disabled
                                                            readOnly />
                                                    )}
                                                    <Label className='form-check-label ms-2' htmlFor='wfhDays'>
                                                        WFH
                                                    </Label>
                                                </div>
                                                <div className="form-check d-flex">
                                                    {item === "Senin" ? (
                                                        <Input type='radio' name="senin"
                                                            id="senin"
                                                            checked={listPermohonanDetail.senin === "WFO" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSenin("WFO");
                                                            }} disabled
                                                            readOnly />
                                                    ) : item === "Selasa" ? (
                                                        <Input
                                                            type="radio"
                                                            name="selasa"
                                                            id="selasa"
                                                            checked={listPermohonanDetail.selasa === "WFO" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSelasa("WFO");
                                                            }}
                                                            disabled
                                                            readOnly
                                                        />
                                                    ) : item === "Rabu" ? (
                                                        <Input
                                                            type="radio"
                                                            name="rabu"
                                                            id="rabu"
                                                            checked={listPermohonanDetail.rabu === "WFO" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setRabu("WFO");
                                                            }}
                                                            disabled
                                                            readOnly
                                                        />
                                                    ) : item === "Kamis" ? (
                                                        <Input
                                                            type="radio"
                                                            name="kamis"
                                                            id="kamis"
                                                            checked={listPermohonanDetail.kamis === "WFO" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setKamis("WFO");
                                                            }}
                                                            disabled
                                                            readOnly
                                                        />
                                                    ) : item === "Jum'at" ? (
                                                        <Input
                                                            type="radio"
                                                            name="jumat"
                                                            id="jumat"
                                                            checked={listPermohonanDetail.jumat === "WFO" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setJumat("WFO");
                                                            }}
                                                            disabled
                                                            readOnly
                                                        />
                                                    ) : item === "Sabtu" ? (
                                                        <Input
                                                            type="radio"
                                                            name="sabtu"
                                                            id="sabtu"
                                                            checked={listPermohonanDetail.sabtu === "WFO" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSabtu("WFO");
                                                            }}
                                                            disabled
                                                            readOnly
                                                        />
                                                    ) : (
                                                        <Input
                                                            type="radio"
                                                            name="minggu"
                                                            id="minggu"
                                                            checked={listPermohonanDetail.minggu === "WFO" ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setMinggu("WFO");
                                                            }}
                                                            disabled
                                                            readOnly
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
                                                            checked={listPermohonanDetail.senin === null ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSenin("OFF");
                                                            }}
                                                            disabled
                                                            readOnly
                                                        />
                                                    ) : item === "Selasa" ? (
                                                        <Input
                                                            type="radio"
                                                            name="selasa"
                                                            id="selasa"
                                                            checked={listPermohonanDetail.selasa === null ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSelasa("OFF");
                                                            }}
                                                            disabled
                                                            readOnly
                                                        />
                                                    ) : item === "Rabu" ? (
                                                        <Input
                                                            type="radio"
                                                            name="rabu"
                                                            id="rabu"
                                                            checked={listPermohonanDetail.rabu === null ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setRabu("OFF");
                                                            }}
                                                            disabled
                                                            readOnly
                                                        />
                                                    ) : item === "Kamis" ? (
                                                        <Input
                                                            type="radio"
                                                            name="kamis"
                                                            id="kamis"
                                                            checked={listPermohonanDetail.kamis === null ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setKamis("OFF");
                                                            }}
                                                            disabled
                                                            readOnly
                                                        />
                                                    ) : item === "Jum'at" ? (
                                                        <Input
                                                            type="radio"
                                                            name="jumat"
                                                            id="jumat"
                                                            checked={listPermohonanDetail.jumat === null ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setJumat("OFF");
                                                            }}
                                                            disabled
                                                            readOnly
                                                        />
                                                    ) : item === "Sabtu" ? (
                                                        <Input
                                                            type="radio"
                                                            name="sabtu"
                                                            id="sabtu"
                                                            checked={listPermohonanDetail.sabtu === null ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setSabtu("OFF");
                                                            }}
                                                            disabled
                                                            readOnly
                                                        />
                                                    ) : (
                                                        <Input
                                                            type="radio"
                                                            name="minggu"
                                                            id="minggu"
                                                            checked={listPermohonanDetail.minggu === null ? true : false}
                                                            style={{ width: "16px", height: "16px" }}
                                                            onClick={() => {
                                                                setMinggu("OFF");
                                                            }}
                                                            disabled
                                                            readOnly
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
                        <h6>Informasi Alamat</h6>
                        <Row className="mb-6">
                            <Label className='form-label'>
                                Alamat WFO
                            </Label>
                            <Col md='4' sm='12'>
                                <Input type='text' name='alamatWfo' id='alamatWfo' placeholder='Nama Alamat' defaultValue={listPermohonanDetail.alamat_wfo ? listPermohonanDetail.alamat_wfo : ""}
                                    disabled />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='gedungWfo' id='gedungWfo' defaultValue={listPermohonanDetail.alamat_wfo_gedung ? listPermohonanDetail.alamat_wfo_gedung : ""}
                                    placeholder="Gedung"
                                    disabled />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kotaWfo' id='kotaWfo' defaultValue={listPermohonanDetail.alamat_wfo_kota ? listPermohonanDetail.alamat_wfo_kota : ""}
                                    placeholder="Kota"
                                    disabled />
                            </Col>
                        </Row>
                        <Label className={`form-label ${listAlamatWfh.length > 0 ? "" : "d-none"}`}>
                            Alamat WFH
                        </Label>
                        <Row className="mb-4">
                            <Col md='4' sm='12'>
                                <Input type='text' name='alamatWfh' id='alamatWfh'
                                    value={alamatWfh}
                                    placeholder="Nama Jalan"
                                    disabled
                                />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kecamatanWfh' id='kecamatanWfh' value={wfhRegion}
                                    placeholder="Kecamatan"
                                    disabled
                                />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kotaWfh' id='kotaWfh' value={wfhCity}
                                    placeholder="Kota"
                                    disabled
                                />
                            </Col>
                            <Col md='2' className='d-grid align-items-center'>
                                <div>
                                    <span title="Lokasi" className="me-3 cursor-pointer"
                                        onClick={(() => {
                                            dispatch(setIsLocationModal({ isLocationModal: true }))
                                            dispatch(setIdWfhLocation({
                                                idWfhLocation: "0",
                                            }))
                                        })}
                                    >
                                        <Location20Filled color={wfhLocationLat ? "#319795" : "#718096"} size={20} />
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Row className={`mb-4  ${rowAlamatWfh ? "" : "d-none"}`}>
                            <Col md='4' sm='12'>
                                <Input type='text' name='alamatWfh1' id='alamatWfh1' value={alamatWfh1}
                                    placeholder="Nama Jalan"
                                    disabled
                                />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kecamatanWfh' id='kecamatanWfh' value={wfhRegion1}
                                    placeholder="Kecamatan"
                                    disabled
                                />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kotaWfh' id='kotaWfh' value={wfhCity1}
                                    placeholder="Kota"
                                    disabled
                                />
                            </Col>
                            <Col md='2' className='d-grid align-items-center'>
                                <div>
                                    <span title="Lokasi" className="me-3 cursor-pointer"
                                        onClick={(() => {
                                            dispatch(setIsLocationModal({ isLocationModal: true }))
                                            dispatch(setIdWfhLocation({
                                                idWfhLocation: "1",
                                            }))
                                        })}
                                    >
                                        <Location20Filled color={wfhLocationLat1 ? "#319795" : "#718096"} size={20} />
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Row className={`mb-4  ${rowAlamatWfh1 ? "" : "d-none"}`}>
                            <Col md='4' sm='12'>
                                <Input type='text' name='alamatWfh2' id='alamatWfh2' value={alamatWfh2}
                                    placeholder="Nama Jalan"
                                    disabled
                                />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kecamatanWf2' id='kecamatanWf2' value={wfhRegion2}
                                    placeholder="Kecamatan"
                                    disabled
                                />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kotaWf2' id='kotaWf2' value={wfhCity2}
                                    placeholder="Kota"
                                    disabled
                                />
                            </Col>
                            <Col md='2' className='d-grid align-items-center'>
                                <div>
                                    <span title="Lokasi" className="me-3 cursor-pointer"
                                        onClick={(() => {
                                            dispatch(setIsLocationModal({ isLocationModal: true }))
                                            dispatch(setIdWfhLocation({
                                                idWfhLocation: "2",
                                            }))
                                        })}
                                    >
                                        <Location20Filled color={wfhLocationLat2 ? "#319795" : "#718096"} size={20} />
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Row className={`mb-4  ${rowAlamatWfh2 ? "" : "d-none"}`}>
                            <Col md='4' sm='12'>
                                <Input type='text' name='alamatWfh3' id='alamatWfh3' value={alamatWfh3}
                                    placeholder="Nama Jalan"
                                    disabled
                                />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kecamatanWf3' id='kecamatanWf3' value={wfhRegion3}
                                    placeholder="Kecamatan"
                                    disabled
                                />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kotaWf3' id='kotaWf3' value={wfhCity3}
                                    placeholder="Kota"
                                    disabled
                                />
                            </Col>
                            <Col md='2' className='d-grid align-items-center'>
                                <div>
                                    <span title="Lokasi" className="me-3 cursor-pointer"
                                        onClick={(() => {
                                            dispatch(setIsLocationModal({ isLocationModal: true }))
                                            dispatch(setIdWfhLocation({
                                                idWfhLocation: "3",
                                            }))
                                        })}
                                    >
                                        <Location20Filled color={wfhLocationLat3 ? "#319795" : "#718096"} size={20} />
                                    </span>
                                </div>
                            </Col>
                        </Row>
                        <Row className={`mb-4  ${rowAlamatWfh3 ? "" : "d-none"}`}>
                            <Col md='4' sm='12'>
                                <Input type='text' name='alamatWfh4' id='alamatWfh4' value={alamatWfh4}
                                    placeholder="Nama Jalan"
                                    disabled
                                />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kecamatanWf4' id='kecamatanWf4' value={wfhRegion4}
                                    placeholder="Kecamatan"
                                    disabled
                                />
                            </Col>
                            <Col md='3' sm='12'>
                                <Input type='text' name='kotaWf4' id='kotaWf4' value={wfhCity4}
                                    placeholder="Kota"
                                    disabled
                                />
                            </Col>
                            <Col md='2' className='d-grid align-items-center'>
                                <div>
                                    <span title="Lokasi" className="me-3 cursor-pointer"
                                        onClick={(() => {
                                            dispatch(setIsLocationModal({ isLocationModal: true }))
                                            dispatch(setIdWfhLocation({
                                                idWfhLocation: "4",
                                            }))
                                        })}
                                    >
                                        <Location20Filled color={wfhLocationLat4 ? "#319795" : "#718096"} size={20} />
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
                                <Input type='text' name='kontakUtama' id='kontakUtama' defaultValue={listPermohonanDetail.hp_primary}
                                    placeholder="No Kontak utama"
                                    disabled />
                            </Col>
                            <Col md='4' sm='12'>
                                <Label className='form-label' htmlFor='kontakLainnya'>
                                    Kontak Lainnya
                                </Label>
                                <Input type='text' name='kontakLainnya' id='kontakLainnya' defaultValue={listPermohonanDetail.hp_secondary}
                                    placeholder="No Kontak Lainnya"
                                    disabled />
                            </Col>
                        </Row>
                        <Row className="mb-6">
                            <Col md='4' sm='12'>
                                <Label className='form-label' htmlFor='kontakDarurat'>
                                    Kontak Darurat
                                </Label>
                                <Input type='text' name='kontakDarurat' id='kontakDarurat' defaultValue={listPermohonanDetail.darurat_no}
                                    placeholder="No Kontak darurat"
                                    disabled />
                            </Col>
                            <Col md='4' sm='12'>
                                <Label className='form-label' htmlFor='hubunganKontak'>
                                    Hubungan Kontak Darurat
                                </Label>
                                <Input type='text' name='hubunganKontak' id='hubunganKontak' defaultValue={listPermohonanDetail.darurat_hub}
                                    placeholder="Pilih Hubungan"
                                    disabled />
                            </Col>
                        </Row>
                        <Row className="mb-6">
                            <Col md='4' sm='12'>
                                <Label className='form-label' htmlFor='email'>
                                    Alamat Email (bukan email perusahaan)
                                </Label>
                                <Input type='text' name='email' id='email' defaultValue={listPermohonanDetail.email_secondary}
                                    placeholder="Email"
                                    disabled />
                            </Col>
                        </Row>
                        <Row className="mb-6">
                            <Col md='12' sm='12'>
                                <Label className='form-label' htmlFor='alasan'>
                                    Alasan Mengajukan FWA
                                </Label>
                                <Input type="textarea" name='alasan' id='alasan' placeholder='Alasan' disabled defaultValue={listPermohonanDetail.comment} />
                            </Col>
                        </Row>
                        <Row className="mb-6" style={{ minHeight: "max-content" }}>
                            <Col md='6' sm='12'>
                                <Label className='form-label' htmlFor='cityMulti'>
                                    Persetujuan Atasan
                                </Label>
                                {listPermohonanDetail.approver_name ?
                                    <>
                                        <div className='d-flex ms-2'>
                                            <div className={`bg-white`}
                                                style={{ width: "40px", height: "40px", borderRadius: "9999px" }}>
                                                <Avatar
                                                    className="photo-karyawan"
                                                    img={listPermohonanDetail.approver_photo}
                                                    imgHeight="40"
                                                    imgWidth="40"
                                                />
                                            </div>
                                            <div className='my-auto ms-1'>
                                                <div className='mb-0 fs-4'>
                                                    {listPermohonanDetail.approver_name} | {listPermohonanDetail.approver_nik}
                                                </div>
                                                <small>{listPermohonanDetail.approver_posisi}</small>
                                            </div>
                                        </div>
                                    </> :
                                    <>
                                    </>}
                            </Col>
                            <Col md='6' sm='12' className={`${listNotificationPerson.length > 0 ? "" : "d-none"}`} >
                                <Label className='form-label' htmlFor='cityMulti'>
                                    Diberitahukan Kepada
                                </Label>
                                {listNotificationPerson.length > 3 ?
                                    <>
                                        <div style={{ minHeight: "min-content" }}>
                                            <PerfectScrollbar style={{ maxWidth: "min-content" }}>
                                                <div className="me-5" style={{ height: "10rem" }}>
                                                    {listNotificationPerson.map((item, index) => (
                                                        <div key={index} className="d-flex ms-2">
                                                            <div className={`bg-white`}
                                                                style={{ width: "40px", height: "40px", borderRadius: "9999px" }}>
                                                                <Avatar
                                                                    className="photo-karyawan"
                                                                    img={item.photo}
                                                                    imgHeight="40"
                                                                    imgWidth="40"
                                                                />
                                                            </div>
                                                            <div className='my-auto ms-1'>
                                                                <div className='mb-0 fs-4'>
                                                                    {item.name} - {item.nik}
                                                                </div>
                                                                <small>{item.posisi}</small>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </PerfectScrollbar>
                                        </div>
                                    </> :
                                    <>
                                        {listNotificationPerson.slice(0, 3).map((item, index) => (
                                            <div key={index} className="d-flex ms-2">
                                                <div className={`bg-white`}
                                                    style={{ width: "40px", height: "40px", borderRadius: "9999px" }}>
                                                    <Avatar
                                                        className="photo-karyawan"
                                                        img={item.photo}
                                                        imgHeight="40"
                                                        imgWidth="40"
                                                    />
                                                </div>
                                                <div className='my-auto ms-1'>
                                                    <div className='mb-0 fs-4'>
                                                        {item.name} - {item.nik}
                                                    </div>
                                                    <small>{item.posisi}</small>
                                                </div>
                                            </div>
                                        ))}
                                    </>}
                            </Col>
                        </Row>
                        <Row className="mb-6">
                            <Col md='5' sm='12'>
                                <Label className='form-label' htmlFor='statusPermohonan'>
                                    Status Permohonan
                                </Label>
                                <div className='ms-2 border-2 border rounded-2 border-tertiary'>
                                    <div className='my-5 mx-5'>
                                        <TimelineCustom className='ms-50 mb-0' data={listJustification} />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className={`mb-6 ${category != "need_approve_web" ? "d-none" : ""}`}>
                            <div className='border-2 border-top mx-4'>
                            </div>
                        </Row>
                        <Row className={`mb-6 ${category != "need_approve_web" ? "d-none" : ""}`}>
                            <h6 className="text-tertiary-800 fw-bolder mb-7">
                                Konfirmasi
                            </h6>
                            <Label className='form-check-label mb-7'>
                                Silahkan konfirmasi permohonan, Kamu juga bisa memasukkan deskripsi
                            </Label>
                            <Row className='mb-10'>
                                <Col md='2' sm='6'>
                                    <Input type='radio' name="confirmationYes"
                                        id="confirmationYes"
                                        checked={confirmation === true ? true : false}
                                        style={{ width: "16px", height: "16px" }}
                                        onClick={() => {
                                            setConfirmation(true)
                                        }} />
                                    <Label className='form-check-label ms-2' htmlFor='confirmationYes'>
                                        Setuju
                                    </Label>
                                </Col>
                                <Col md='2' sm='6'>
                                    <Input type='radio' name="confirmationNo"
                                        id="confirmationNo"
                                        checked={confirmation === false ? true : false}
                                        style={{ width: "16px", height: "16px" }}
                                        onClick={() => {
                                            setConfirmation(false)
                                        }} />
                                    <Label className='form-check-label ms-2' htmlFor='confirmationNo'>
                                        Tidak
                                    </Label>
                                </Col>
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
                        <Col sm='12' className={`${listPermohonanDetail.status != 0 ? "d-none" : ""}`}>
                            <div className='d-flex'>
                                <Button className={`${category != "need_approve_web" ? "" : listPermohonanDetail.status != 0 ? "d-none" : "d-none"}`} color='primary' onClick={() => dispatch(setIsValidationModal({ isValidationModal: true }))}>
                                    <span className='text-white fw-bolder'>
                                        Batalkan
                                    </span>
                                </Button>
                                <Button className={`${category === "need_approve_web" ? "" : "d-none"}`} color='primary' onClick={() => dispatch(setIsValidationModal({ isValidationModal: true }))}>
                                    <span className='text-white fw-bolder'>
                                        Konfirmasi
                                    </span>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
                <ValidationModal text={category === "need_approve_web" ? "Kamu akan mengkonfirmasi permohonan FWA" : "Kamu akan membatalkan pembuatan permohonan FWA"} />
                <SuccessModal text={textModal} />
                <LocationModal />
            </CardBody>
        </Card>
    )
}

const DetailFwa = () => {
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
export default DetailFwa
