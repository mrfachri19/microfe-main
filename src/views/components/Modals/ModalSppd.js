// ** React Imports
import React, { useEffect, useState, Fragment } from "react";

// ** Reactstrap Imports
import { useDispatch, useSelector } from "react-redux";

import { toggleModalSppd, storeModalSppd } from '../../../redux/modalToggle'

import { createSppd, getSearchKaryawan, listPetugasSppd, uploadSppd, transportCostSppd, dailyCostSppd, getHistoriesSppd } from '../../../api';

import { Row, Col, Card, Modal, CardBody, ModalBody, ModalHeader, CardImg, Badge } from 'reactstrap'

import { setStatusCost } from "../../apps/request/store";

export default function RenderModal() {
    return (
        <ModalSppd />
    );
}

const ModalSppd = ({ id }) => {
    const { isModalSppd } = useSelector((state) => state.modal);
    const dispatch = useDispatch();
    const [dailyCost, setDailyCost] = useState([]);
    const [transportCost, setTransportCost] = useState([]);
    const selectedPermohonanId = useSelector((state) => state.request.selectedPermohonanId.selectedPermohonanId);
    const costStatus = useSelector((state) => state.request.costStatus);
    let totalTransport = 0
    let totalDaily = 0
    function getDetailSppd() {
        dispatch(setStatusCost("notFound"))
        let sppdid = window.location.pathname.split('/').at(-1)
        if (selectedPermohonanId) {
            sppdid = selectedPermohonanId
        }
        dailyCostSppd(
            `/${sppdid}`
        ).then((res) => {
            var tempList = [];
            tempList = res.data.data;
            //  // console.log("Data Harian => ", tempList);
            setDailyCost(tempList);
            if (tempList.length > 0) {
                dispatch(setStatusCost("costFound"))
            }
        });
        transportCostSppd(
            `/${sppdid}`
        ).then((res) => {
            var tempList = [];
            tempList = res.data.data;
            //  // console.log("Data Transport => ", tempList);
            setTransportCost(tempList);
            if (tempList.length > 0) {
                dispatch(setStatusCost("costFound"))
            }
        });

    }

    function unshowModal() {
        dispatch(toggleModalSppd(false));
    }

    useEffect(() => {
        getDetailSppd();
    }, [1]);

    return (
        <>
            <Fragment>
                {isModalSppd ?
                    <Modal isOpen={isModalSppd}
                        toggle={unshowModal} className='modal-dialog-centered modal-refer-earn modal-md'>
                        <ModalHeader className='bg-transparent' toggle={unshowModal}></ModalHeader>
                        <ModalBody className='pb-5 px-sm-0'>
                            <div className='px-sm-4 mx-50'>
                                <h3 className='text-center mb-1'>Detail Biaya</h3>
                                {transportCost.length > 0 ? (
                                    <>
                                        <div className='mb-5'>
                                            <h6>Kendaraan</h6>
                                            <br />
                                            <Row>
                                                {transportCost.map(item =>
                                                (
                                                    <>
                                                        <Col sm="6">
                                                            {item.jenis_angkutan}
                                                        </Col>
                                                        <Col sm="6">
                                                            {item.asal} {item.tujuan !== '-' ? " - " + item.tujuan : ''}
                                                        </Col>
                                                        <Col sm="6">
                                                            Harga Rp. {item.harga} (x {item.pengali})
                                                        </Col>
                                                        <Col sm="6">
                                                            Rp. {item.total}
                                                        </Col>
                                                        <Col sm="12"><div className="d-none">{totalTransport += item.total}</div>&nbsp;</Col>
                                                    </>
                                                ))}
                                            </Row>
                                        </div>
                                        <div className='mb-5'>
                                            <Row>
                                                <Col sm="6">
                                                    Total :
                                                </Col>
                                                <Col sm="6">
                                                    Rp. {totalTransport}
                                                </Col>
                                            </Row>
                                        </div>
                                    </>
                                ) : 'Belum ada data biaya Transport'}
                                <hr></hr>
                                {dailyCost.length > 0 ? (
                                    <>
                                        <div className='mb-5'>
                                            <h6>Harian</h6>
                                            <br />
                                            <Row>
                                                {dailyCost.map(item =>
                                                (
                                                    <>
                                                        <Col sm="12">
                                                            {item.berangkat} {item.kembali == item.berangkat ? "" : ' - ' + item.kembali} ({item.lama} Hari)
                                                        </Col>
                                                        <Col sm="6">
                                                            Tarif : Rp. {item.tarif} ({item.persen} %)
                                                        </Col>
                                                        <Col sm="6">
                                                            Rp. {item.total}
                                                        </Col>
                                                        <Col sm="12" className="fw-bold"><div className="d-none">{totalDaily += item.total}</div>&nbsp;</Col>
                                                    </>
                                                ))}
                                            </Row>
                                        </div>
                                        <div className='mb-5'>
                                            <Row>
                                                <Col sm="6">
                                                    Total :
                                                </Col>
                                                <Col sm="6">
                                                    Rp. {totalDaily}
                                                </Col>
                                            </Row>

                                        </div>
                                    </>
                                ) : 'Belum ada data biaya Harian'}
                            </div>
                        </ModalBody>
                    </Modal> : <></>
                }

            </Fragment>
        </>
    )
}
