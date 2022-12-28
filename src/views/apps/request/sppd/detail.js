// ** React Imports
import React, { Fragment, useEffect, useState } from 'react'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, List, Col, Input, Form, Button, Label, FormFeedback, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle, Badge } from 'reactstrap'

// ** Third Party Components
import Flatpickr from 'react-flatpickr'
import PerfectScrollbar from "react-perfect-scrollbar";

import {
    setIsValidationModal,
    setIsPostApproved,
    setIsValidationModalYes,
    categoryRequest
} from "../store";

import { Link } from 'react-router-dom';

// ** Styles Imports
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";

// ** Utils
import Avatar from "@components/avatar";
import { isObjEmpty, selectThemeColors } from "@utils";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dailyCostSppd, getApprovalSppd, getHistoriesSppd, postApprovalSppd, getNotifyCuti } from '../../../../api';
import TimelineCustom from '@components/timeline/sppdTimeline'
import { toggleModalSppd } from '../../../../redux/modalToggle';
import ModalSppd from "@src/views/components/Modals/ModalSppd";
import ValidationModal from '../modals/ValidationModal';
import SuccessModal from '../modals/SuccessModal';
import { getUsernik } from '../../../../utils/storage'

import { CalendarLtr12Regular, Send16Filled, CheckmarkCircle20Filled, DismissCircle20Filled, CalendarCancel16Filled, DocumentPdf32Regular } from "@fluentui/react-icons";

const MultipleColumnForm = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const category = useSelector((state) => state.request.category.category);
    const costStatus = useSelector((state) => state.request.costStatus);
    const [confirmation, setConfirmation] = React.useState("APPROVE");
    const [notifyList, setListNotify] = React.useState([]);
    const [approvalDeskripsi, setApprovalDeskripsi] = React.useState("");
    const isValidationModal = useSelector((state) => state.request.isValidationModal.isValidationModal);
    const isValidationModalYes = useSelector((state) => state.request.isValidationModalYes.isValidationModalYes);
    const selectedPermohonanId = useSelector((state) => state.request.selectedPermohonanId.selectedPermohonanId);
    const isPostApproved = useSelector((state) => state.request.isPostApproved.isPostApproved);
    const [showSnakebar, setShowSnakebar] = React.useState(false);
    const handleSubmit = (event) => {
        event.preventDefault();
        PostSppd();
    };
    const [detailSppd, setDetailSppd] = useState([]);
    const nik = getUsernik();

    function getDetailSppd() {
        let sppdid = window.location.pathname.split('/').at(-1)
        if (selectedPermohonanId) {
            sppdid = selectedPermohonanId
        }
        if (localStorage.getItem("checkTab") == "need_approve_web") {
            getApprovalSppd(
                `/${sppdid}?appVersion=5.0.5`
            ).then((res) => {
                dispatch(categoryRequest({ category: "need_approve_web" }));
                var tempList = [];
                tempList = res.data.data;
                //  // console.log("Data Sppd => ", tempList);
                setDetailSppd(tempList);
                getNotifyCuti(`?reference_id=${sppdid}&limit=10&offset=0`).then((res2) => {
                    var tempList2 = [];
                    tempList2 = res2.data.data;
                    //  // console.log("Data notify => ", tempList2);
                    setListNotify(tempList2);
                });
            });
        } else {
            getHistoriesSppd(
                `/${sppdid}?appVersion=5.0.5`
            ).then((res) => {
                dispatch(categoryRequest({ category: "dashboard_web" }));
                var tempList = [];
                tempList = res.data.data;
                 // console.log("Data Sppd => ", tempList);
                setDetailSppd(tempList);
            });
        }
    }

    function openModal(modal, data) {
        dispatch(modal(true));
    }

    function approvalSppd() {
        let sppdid = window.location.pathname.split('/').at(-1)
        if (selectedPermohonanId) {
            sppdid = selectedPermohonanId
        }

        let data = {
            request_id: parseInt(sppdid),
            action: confirmation,
            comment: approvalDeskripsi,
            sisa_anggaran: 0,
            sisa_sekarang: 0
        };

        postApprovalSppd(data).then((res) => {
            setShowSnakebar(true);
            dispatch(setIsPostApproved({ isPostApproved: false }))
            dispatch(setIsValidationModal({ isValidationModal: false }))
            dispatch(categoryRequest({ category: "dashboard_web" }));
            dispatch(setIsValidationModalYes({ isValidationModalYes: true }))
            setTimeout(() => {
                navigate("/app/request")
            }, 3000);
        }).catch(function (error) {
             // console.log(error.toJSON());
        });;

    }

    useEffect(() => {
        getDetailSppd();
        //  // console.log("ID permohonan", selectedPermohonanId)
    }, [1]);

    useEffect(() => {
        if (isPostApproved === true) {
            if (category === "dashboard_web") {
                // Cancel()
                setShowSnakebar(true);
                // toastAlert("success", "Berhasil setujui permohonan");
                // dispatch({ type: "set", isValidationModalYes: true });
                dispatch(setIsPostApproved({ isPostApproved: false }))
                dispatch(setIsValidationModal({ isValidationModal: false }))
                dispatch(categoryRequest({ category: "dashboard_web" }));
                dispatch(setIsValidationModalYes({ isValidationModalYes: true }))
                setTimeout(() => {
                    navigate("/app/request")
                }, 3000);
            }
            if (category === "need_approve_web") {
                approvalSppd()
                //  // console.log(confirmation)
                // Cancel()

            }
        }
    }, [isPostApproved])

    return (

        !Array.isArray(detailSppd) ? (
            <>
                <Card>
                    <CardHeader>
                        <CardTitle tag='h4' className='text-primary'>Detail SPPD</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            <Row className="mb-6">
                                <Col md='6' sm='6'>
                                    <Label className='form-label'>
                                        Pemohon
                                    </Label>
                                    <div className='d-flex justify-content-start align-items-center mb-1'>
                                        {detailSppd.pemohon ? (
                                            <>
                                                <Avatar className='me-1 mb-auto photo-karyawan ' img={detailSppd.pemohon.photo} imgHeight='40' imgWidth='40' />
                                                <div>&nbsp;&nbsp;</div>
                                                <div className='profile-user-info'>
                                                    <div>
                                                        <small className='mb-0'>{detailSppd.pemohon.name}</small>
                                                    </div>
                                                    <div>
                                                        <small className='text-muted'>{detailSppd.pemohon.posisi}</small>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Avatar className='me-1 mb-auto photo-karyawan ' img={`https://diarium.telkom.co.id/getfoto/` + detailSppd.nik} imgHeight='40' imgWidth='40' />
                                                <div>&nbsp;&nbsp;</div>
                                                <div className='profile-user-info'>
                                                    <div>
                                                        <small className='mb-0'>{detailSppd.name}</small>
                                                    </div>
                                                    <div>
                                                        <small className='text-muted'>{detailSppd.jabatan}</small>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </Col>
                                <Col md='6' sm='6'>
                                </Col>
                            </Row>
                            <Row className="mb-6">
                                <Col md='6' sm='6'>
                                    <Label className='form-label'>
                                        Tempat Asal
                                    </Label>
                                    <Input type='text' name='destination' id='destination'
                                        placeholder="Tempat Asal" value={detailSppd.destination.split(" - ")[0]} disabled />
                                </Col>
                                <Col md='6' sm='6'>
                                    <Label className='form-label'>
                                        Tempat Tujuan
                                    </Label>
                                    <Input type='text' name='destination' id='destination'
                                        placeholder="Tempat Tujuan" value={detailSppd.destination.split(" - ")[1]} disabled />
                                </Col>
                            </Row>
                            <Row className="mb-6">
                                <Col md='6' sm='6'>
                                    <Label className='form-label'>
                                        Tanggal Mulai
                                    </Label>
                                    <Input type='text' name='destination' id='destination'
                                        placeholder="Tempat Tujuan" value={detailSppd.date_depart} disabled />
                                </Col>
                                <Col md='6' sm='6'>
                                    <Label className='form-label'>
                                        Tanggal Akhir
                                    </Label>
                                    <Input type='text' name='destination' id='destination'
                                        placeholder="Tempat Tujuan" value={detailSppd.date_return} disabled />
                                </Col>
                            </Row>
                            <Row className="mb-6">
                                <Label className='form-label'>
                                    Keterangan
                                </Label>
                                <Col md='12' sm='12'>
                                    <Input type='textarea' name='description' rows='4' id='description' value={detailSppd.description}
                                        placeholder="Keterangan" disabled />
                                </Col>
                            </Row>
                            <Row className="mb-6">
                                <Col md='6' sm='12'>
                                    <Label className='form-label'>
                                        Dasar Perjalanan Dinas
                                    </Label>
                                    <Input type='text' name='dasar' id='dasar'
                                        placeholder="No. Kontak utama" value={detailSppd.dasar} disabled />
                                </Col>
                                <Col md='6' sm='12'>
                                    <Label className='form-label'>
                                        Maksud dan Tujuan
                                    </Label>
                                    <Input type='text' name='maksud' id='maksud'
                                        placeholder="Maksud dan Tujuan" value={detailSppd.maksud} disabled />
                                </Col>
                            </Row>
                            <Row className="mb-6">
                                <Col md='6' sm='12'>
                                    <Label className='form-label'>
                                        GL Account
                                    </Label>
                                    <Input type='text' name='gl_account' id='gl_account'
                                        placeholder="GL Account" value={detailSppd.gl_account} disabled />
                                </Col>
                                <Col md='6' sm='12'>
                                    <Label className='form-label'>
                                        Cost Center ID
                                    </Label>
                                    <Input type='text' name='cost_center' id='cost_center'
                                        placeholder="No. Kontak darurat" value={detailSppd.cost_center} disabled />
                                </Col>
                            </Row>
                            <Row className="mb-6">
                                <Col md='6' sm='12'>
                                    <Label className='form-label'>
                                        Kode Aktifitas
                                    </Label>
                                    <Input type='text' name='activity_code' id='activity_code' placeholder='Kode Aktifitas' value={detailSppd.activity_code} disabled />
                                </Col>
                                <Col md='6' sm='12'>
                                    <Label className='form-label'>
                                        Catatan
                                    </Label>
                                    <Input type="text" name='note' id='note' placeholder="Catatan" value={detailSppd.note} disabled />
                                </Col>
                            </Row>
                            <Row>
                                <Col md='12'>
                                    {costStatus == 'costFound' ? (
                                        <Button onClick={() => openModal(toggleModalSppd, 's')} color="primary" size='sm'> Lihat Detail</Button>
                                    ) : null}
                                </Col>
                            </Row>
                            <Row className="mb-6">
                                <Col md='6' sm='12'>
                                    <Label className='form-label'>
                                        Lampiran
                                    </Label>
                                    <div style={{ padding: '10px' }} className={detailSppd.attachments.length > 0 ? `ms-2 border-2 border rounded-2 border-tertiary` : ''}>
                                        <Row>
                                            {detailSppd.attachments.map(item => (
                                                <>
                                                    <Col sm="9" className="ms-2 border-2 border rounded-2 border-tertiary">
                                                        <a href={`${item.file_path}`} target="_blank"><DocumentPdf32Regular /> ${item.file_path.split('/').at(-1).substring(item.file_path.split('/').at(-1).length - 50)}</a>
                                                    </Col>
                                                </>
                                            ))}
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="mb-6">
                                <Col md='4' sm='12'>
                                    <Label className='form-label'>
                                        Pemeriksa
                                    </Label>
                                    <div style={{ padding: '10px' }} className={detailSppd.pemeriksas.length > 0 ? `ms-2 border-2 border rounded-2 border-tertiary` : ''}>
                                        {detailSppd.pemeriksas.map(item => (
                                            <>
                                                <div className='d-flex justify-content-start align-items-center mb-1' style={{ paddingTop: '8px', paddingBottom: '8px' }}>
                                                    <Avatar className='me-1 mb-auto photo-karyawan ' img={`https://diarium.telkom.co.id/getfoto/` + item.nik} imgHeight='40' imgWidth='40' />
                                                    <div>&nbsp;&nbsp;</div>
                                                    <div className='profile-user-info'>
                                                        <div>
                                                            <small className='mb-0'>{item.name}</small>
                                                        </div>
                                                        <div>
                                                            <small className='text-muted'>{item.posisi}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </Col>
                                <Col md='4' sm='12'>
                                    <Label className='form-label'>
                                        Diberitahukan Kepada
                                    </Label>
                                    {detailSppd.notified_to ? (
                                        <>
                                            <div style={{ padding: '10px' }} className={detailSppd.notified_to.length > 0 ? `ms-2 border-2 border rounded-2 border-tertiary` : ''}>
                                                {detailSppd.notified_to ? detailSppd.notified_to.map(item => (
                                                    <>
                                                        <div className='d-flex justify-content-start align-items-center mb-1' style={{ paddingTop: '8px', paddingBottom: '8px' }}>
                                                            <Avatar className='me-1 mb-auto photo-karyawan ' img={item.photo_notified} imgHeight='40' imgWidth='40' />
                                                            <div>&nbsp;&nbsp;</div>
                                                            <div className='profile-user-info'>
                                                                <div>
                                                                    <small className='mb-0'>{item.name_notified}</small>
                                                                </div>
                                                                <div>
                                                                    {/* <small className='text-muted'>{item.posisi}</small> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )) : null}
                                            </div>
                                        </>
                                    ) : notifyList.length > 0 ? (
                                        <>
                                            <div style={{ padding: '10px' }} className={notifyList.length > 0 ? `ms-2 border-2 border rounded-2 border-tertiary` : ''}>
                                                {notifyList ? notifyList.map(item => (
                                                    <>
                                                        <div className='d-flex justify-content-start align-items-center mb-1' style={{ paddingTop: '8px', paddingBottom: '8px' }}>
                                                            <Avatar className='me-1 mb-auto photo-karyawan ' img={`https://diarium.telkom.co.id/getfoto/` + item.nik_notified} imgHeight='40' imgWidth='40' />
                                                            <div>&nbsp;&nbsp;</div>
                                                            <div className='profile-user-info'>
                                                                <div>
                                                                    <small className='mb-0'>{item.name_notified}</small>
                                                                </div>
                                                                <div>
                                                                    <small className='text-muted'>{item.nik_notified}</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                )) : null}
                                            </div>
                                        </>
                                    ) : null}
                                </Col>
                                <Col md='4' sm='12'>
                                    <Label className='form-label'>
                                        Petugas
                                    </Label>
                                    <div style={{ padding: '10px' }} className={detailSppd.petugases.length > 0 || !Array.isArray(detailSppd.petugases) ? `ms-2 border-2 border rounded-2 border-tertiary` :  console.log(detailSppd.petugases)}>
                                        {Array.isArray(detailSppd.petugases) ? (
                                            detailSppd.petugases.map(item => (
                                                <>
                                                    <div className='d-flex justify-content-start align-items-center mb-1' style={{ paddingTop: '8px', paddingBottom: '8px' }}>
                                                        <Avatar className='me-1 mb-auto photo-karyawan ' img={`https://diarium.telkom.co.id/getfoto/` + item.nik} imgHeight='40' imgWidth='40' />
                                                        <div>&nbsp;&nbsp;</div>
                                                        <div className='profile-user-info'>
                                                            <div>
                                                                <small className='mb-0'>{item.name}</small>
                                                            </div>
                                                            <div>
                                                                <small className='text-muted'>{item.jabatan}</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ))
                                        ) :
                                            <>
                                                <div className='d-flex justify-content-start align-items-center mb-1' style={{ paddingTop: '8px', paddingBottom: '8px' }}>
                                                    <Avatar className='me-1 mb-auto photo-karyawan ' img={`https://diarium.telkom.co.id/getfoto/` + detailSppd.petugases['fiatur']['nik']} imgHeight='40' imgWidth='40' />
                                                    <div>&nbsp;&nbsp;</div>
                                                    <div className='profile-user-info'>
                                                        <div>
                                                            <small className='mb-0'>{detailSppd.petugases['fiatur']['name']}</small>
                                                        </div>
                                                        <div>
                                                            <small className='text-muted'>{detailSppd.petugases['fiatur']['jabatan']}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-start align-items-center mb-1' style={{ paddingTop: '8px', paddingBottom: '8px' }}>
                                                    <Avatar className='me-1 mb-auto photo-karyawan ' img={`https://diarium.telkom.co.id/getfoto/` + detailSppd.petugases['pembuatRincian']['nik']} imgHeight='40' imgWidth='40' />
                                                    <div>&nbsp;&nbsp;</div>
                                                    <div className='profile-user-info'>
                                                        <div>
                                                            <small className='mb-0'>{detailSppd.petugases['pembuatRincian']['name']}</small>
                                                        </div>
                                                        <div>
                                                            <small className='text-muted'>{detailSppd.petugases['pembuatRincian']['jabatan']}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-start align-items-center mb-1' style={{ paddingTop: '8px', paddingBottom: '8px' }}>
                                                    <Avatar className='me-1 mb-auto photo-karyawan ' img={`https://diarium.telkom.co.id/getfoto/` + detailSppd.petugases['posting']['nik']} imgHeight='40' imgWidth='40' />
                                                    <div>&nbsp;&nbsp;</div>
                                                    <div className='profile-user-info'>
                                                        <div>
                                                            <small className='mb-0'>{detailSppd.petugases['posting']['name']}</small>
                                                        </div>
                                                        <div>
                                                            <small className='text-muted'>{detailSppd.petugases['posting']['jabatan']}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        }
                                    </div>
                                </Col>

                            </Row>
                            <Row className="mb-6">
                                <Col md='5' sm='12'>
                                    <Label className='form-label' htmlFor='statusPermohonan'>
                                        Status Permohonan
                                    </Label>
                                    <div className='ms-2 border-2 border rounded-2 border-tertiary'>
                                        <div className='my-5 mx-5'>
                                            <TimelineCustom className='ms-50 mb-0' data={detailSppd.comments} />
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className={`mb-6 ${detailSppd.approval_button === "enabled" ? "d-none" : ""}`}>
                                <div className='border-2 border-top mx-4'>
                                </div>
                            </Row>
                            <Row className={`mb-6 ${detailSppd.approval_button === "enabled" ? "" : "d-none"}`}>
                                <h6 className="text-tertiary-800 fw-bolder mb-7">
                                    Konfirmasi
                                </h6>
                                <Label className='form-check-label mb-7'>
                                    Silahkan konfirmasi permohonan, Kamu juga bisa memasukkan deskripsi
                                </Label>
                                <Row className='mb-10'>
                                    <Col md='2' sm='6'>
                                        <Input type='radio' name="confirmationSelected"
                                            id="confirmationApprove"
                                            style={{ width: "16px", height: "16px" }}
                                            onClick={() => {
                                                setConfirmation("APPROVE")
                                            }} />
                                        <Label className='form-check-label ms-2' htmlFor='confirmationApprove'>
                                            Setuju
                                        </Label>
                                    </Col>

                                    <Col md='2' sm='6'>
                                        <Input type='radio' name="confirmationSelected"
                                            id="confirmationKembalikan"
                                            style={{ width: "16px", height: "16px" }}
                                            onClick={() => {
                                                setConfirmation("RETURN")
                                            }} />
                                        <Label className='form-check-label ms-2' htmlFor='confirmationKembalikan'>
                                            Kembalikan
                                        </Label>
                                    </Col>
                                    {detailSppd.nik == nik ? (
                                        <>
                                            <Col md='2' sm='6'>
                                                <Input type='radio' name="confirmationSelected"
                                                    id="confirmationBatalkan"
                                                    style={{ width: "16px", height: "16px" }}
                                                    onClick={() => {
                                                        setConfirmation("CANCEL")
                                                    }} />
                                                <Label className='form-check-label ms-2' htmlFor='confirmationBatalkan'>
                                                    Batalkan
                                                </Label>
                                            </Col>
                                        </>
                                    ) : null}

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
                            <Col sm='12' className={`${detailSppd.approval_button === "enabled" ? "" : "d-none"}`}>
                                <div className='d-flex'>
                                    {/* <Button className={`${category != "need_approve_web" ? "" : detailSppd.status != "Sedang Proses" ? "" : "d-none"}`} color='primary' onClick={() => dispatch(setIsValidationModal({ isValidationModal: true }))}>
                                        <span className='text-white fw-bolder'>
                                            Batalkan
                                        </span>
                                    </Button> */}
                                    <Button className={`${detailSppd.approval_button === "enabled" ? "" : "d-none"}`} color='primary' onClick={() => dispatch(setIsValidationModal({ isValidationModal: true }))}>
                                        <span className='text-white fw-bolder'>
                                            Konfirmasi
                                        </span>
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <ValidationModal text={confirmation === "APPROVE" ? "Kamu akan mengkonfirmasi permohonan SPPD" : confirmation === 'CANCEL' ? "Kamu akan membatalkan permohonan SPPD" : "Kamu akan mengembalikan permohonan SPPD"} />
                        <SuccessModal text={confirmation === "APPROVE" ? "Persetujuan permohonan SPPD berhasil dilakukan..!" : confirmation === 'CANCEL' ? "Pembatalan permohonan SPPD berhasil dilakukan..!" : "Pengembalian permohonan SPPD berhasil dilakukan..!"} />
                    </CardBody>
                    <ModalSppd />
                </Card >
            </>
        ) :
            <>
                Loading your data..
            </>
    )
}

const DetailSppd = () => {
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
                {/* <ModalKomunitas/> */}
            </Row>
        </Fragment>
    )
}
export default DetailSppd
