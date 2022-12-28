// ** React Imports
import React, { Fragment, useState } from 'react'

// ** Reactstrap Imports
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Label,
    Input
} from 'reactstrap'

import {
    setIsPernyataanModal,
    setIsPernyataanModalYes
} from "../store";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from '../../../../utils/storage';


const PernyataanFwaModal = ({ noHp, tanggal }) => {
    // ** State
    const datauser = getUserData();
    const [check1, setCheck1] = React.useState(false)
    const [check2, setCheck2] = React.useState(false)
    const [check3, setCheck3] = React.useState(false)
    const [check4, setCheck4] = React.useState(false)
    const [check5, setCheck5] = React.useState(false)
    const [check6, setCheck6] = React.useState(false)
    const [check7, setCheck7] = React.useState(false)
    const [check8, setCheck8] = React.useState(false)

    // const datauser = getUserData();
    const dispatch = useDispatch();

    const isPernyataanModal = useSelector((state) => state.request.isPernyataanModal.isPernyataanModal);
    const isPernyataanModalYes = useSelector((state) => state.request.isPernyataanModalYes.isPernyataanModalYes);

    return (
        <Fragment >
            <Modal
                isOpen={isPernyataanModal}
                toggle={() => dispatch(setIsPernyataanModal({ isPernyataanModal: false }))}
                className={`modal-dialog-centered modal-lg`}
            >
                <ModalHeader toggle={() => dispatch(setIsPernyataanModal({ isPernyataanModal: false }))}>
                </ModalHeader>
                <ModalBody className='pb-5 px-sm-4 mx-50'>
                    <h5 className='address-title text-center mb-1'>Pernyataan FWA</h5>
                    <p className='address-subtitle text-center mb-2 pb-75'>Saya yang membuat pernyataan di bawah ini :</p>
                    <div className="d-grid justify-content-start pt-5">
                        <table className="w-1/3 text-sm">
                            <tbody>
                                <tr>
                                    <td className="w-1/4 min-w-1/13">Nama</td>
                                    <td className="w-3/4 min-w-max">: {datauser.nama}</td>
                                </tr>
                                <tr>
                                    <td className="w-1/4 min-w-1/13">NIK</td>
                                    <td className="w-3/4 min-w-max">: {datauser.user}</td>
                                </tr>
                                <tr>
                                    <td className="w-1/4 min-w-1/13">Jabatan</td>
                                    <td className="w-3/4 min-w-max">: {datauser.jabatan}</td>
                                </tr>
                                <tr>
                                    <td className="w-1/4 min-w-1/13">No. HP</td>
                                    <td className="w-3/4 min-w-max">: {noHp}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="text-left pt-4 flex-auto d-flex mb-6">
                        Berkaitan dengan permohonan pelaksanaan Flexi Working Arrangement (FWA) yang saya ajukan, dengan ini menyatakan kesanggupan dan kesediaan kami untuk terikat pada hal-hal yang kami nyatakan sebagai berikut :
                    </div>
                    <Row tag='form' className='gy-1 gx-2 mx-2'>
                        <Col xs={12}>
                            <div className='form-check form-check-success mb-5'>
                                <Input type='checkbox' id='check1' onChange={() => {
                                    setCheck1(!check1)
                                }} />
                                <Label className='form-check-label' for='check1'>
                                    Menaati dan melaksanakan Peraturan Perundang-undangan, Peraturan Perusahaan dan/atau kebijakan Perusahaan yang berlaku;
                                </Label>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div className='form-check form-check-success mb-5'>
                                <Input type='checkbox' id='check2' onChange={() => {
                                    setCheck2(!check2)
                                }} />
                                <Label className='form-check-label' for='check2'>
                                    Melaksanakan Etika Pelaksanaan Flexible Working Arrangement (Do's & Don’ts) yang terdapat di aplikasi kolaborasi Diarium;
                                </Label>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div className='form-check form-check-success mb-5'>
                                <Input type='checkbox' id='check3' onChange={() => {
                                    setCheck3(!check3)
                                }} />
                                <Label className='form-check-label' for='check3'>
                                    Melakukan presensi secara online di aplikasi kolaborasi (check-in dan check-out di awal waktu dan di akhir waktu kerja serta lapor posisi pada pukul 10.00 dan 14.00 waktu setempat pada saat WFH);
                                </Label>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div className='form-check form-check-success mb-5'>
                                <Input type='checkbox' id='check4' onChange={() => {
                                    setCheck4(!check4)
                                }} />
                                <Label className='form-check-label' for='check4'>
                                    Bersedia untuk tetap dapat dihubungi dan menghubungi, baik melalui media Video Conference, Nota Dinas, Email Telkom, Telepon, Pesan Singkat pada aplikasi media sosial maupun media lain yang telah disepakati dengan Atasan selama pelaksanaan FWA;
                                </Label>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div className='form-check form-check-success mb-5'>
                                <Input type='checkbox' id='check5' onChange={() => {
                                    setCheck5(!check5)
                                }} />
                                <Label className='form-check-label' for='check5'>
                                    Menyelsaikan pekerjaan sesuai dengan target waktu penyelsaian yang telah disepakati dengan atasan;
                                </Label>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div className='form-check form-check-success mb-5'>
                                <Input type='checkbox' id='check6' onChange={() => {
                                    setCheck6(!check6)
                                }} />
                                <Label className='form-check-label' for='check6'>
                                    Bersedia dan siap ke kantor Telkom sesuai dengan PSA apabila diperlukan atasan;
                                </Label>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div className='form-check form-check-success mb-5'>
                                <Input type='checkbox' id='check7' onChange={() => {
                                    setCheck7(!check7)
                                }} />
                                <Label className='form-check-label' for='check7'>
                                    Apabila saya melaksanakan FWA diluar PSA yang telah ditetapkan maka saya bersedia dan  siap datang ke kantor Telkom sesuai PSA dalam waktu yang disepakati dengan atasan dengan mempertimbangkan jarak tempuh dan sarana transportasi yang tersedia.
                                </Label>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div className='form-check form-check-success mb-5'>
                                <Input type='checkbox' id='check8' onChange={() => {
                                    setCheck8(!check8)
                                }} />
                                <Label className='form-check-label' for='check8'>
                                    Bila saya terbukti melanggar pernyataan ini, saya bersedia diberikan sanksi sesuai dengan ketentuan Telkom yang berlaku.
                                </Label>
                            </div>
                        </Col>
                        <Col xs={12}>
                            <div className="ms-7 mb-5">
                                <div className="text-sm font-semibold">
                                    {moment(tanggal).format("DD MMMM YYYY")}
                                    {/* 25 April 2022 */}
                                </div>
                                <div className="text-sm font-semibold pt-2">
                                    <div>
                                        {datauser.nama}
                                    </div>
                                    <div>
                                        NIK {datauser.user}
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className='text-center' xs={12}>
                            <Button className='me-1 mt-2 mb-5' color='primary' disabled={check1 && check2 && check3 && check4 && check5 && check6 && check7 && check8 ? false : true} onClick={() => { dispatch(setIsPernyataanModalYes({ isPernyataanModalYes: true })), dispatch(setIsPernyataanModal({ isPernyataanModal: false })) }}>
                                OK
                            </Button>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default PernyataanFwaModal
