// ** React Imports
import React, { Fragment, useEffect, useState } from 'react'

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
    setIsValidationModal,
    setIsPostApproved,
} from "../store";
import { useDispatch, useSelector } from "react-redux";
import { Info24Regular } from "@fluentui/react-icons";


const ValidationModal = ({ text }) => {
    // ** State
    const dispatch = useDispatch();

    const isValidationModal = useSelector((state) => state.request.isValidationModal.isValidationModal);
    const isPostApproved = useSelector((state) => state.request.isPostApproved.isPostApproved);

    useEffect(() => {
        dispatch(setIsValidationModal({ isValidationModal: false }))
        dispatch(setIsPostApproved({ isPostApproved: false }))
    }, [1]);

    return (
        <Fragment >
            <Modal
                isOpen={isValidationModal}
                toggle={() => dispatch(setIsValidationModal({ isValidationModal: false }))}
                className={`modal-dialog-centered`}
            >
                <ModalHeader toggle={() => dispatch(setIsValidationModal({ isValidationModal: false }))}>
                </ModalHeader>
                <ModalBody className='pb-5 px-sm-4 mx-50'>
                    <h5 className='text-black fw-bolder text-center' style={{ marginBottom: '4.75rem' }}>
                        <span className="me-5">
                            <Info24Regular color="#1A202C" />
                        </span>
                        Apakah Kamu Yakin?
                    </h5>
                    <h6 className='text-black fw-bolder text-center' style={{ marginBottom: '4.75rem' }}>
                        {text}
                    </h6>
                    <div className="mb-10 d-grid justify-content-center">
                        <Button className='me-1' color='primary' style={{ width: '19.5rem' }} onClick={() => dispatch(setIsPostApproved({ isPostApproved: true }))}>
                            <span className='text-white fw-bolder'>
                                Iya
                            </span>
                        </Button>
                        <Button color='primary-100 mt-3' type='cancel' style={{ width: '19.5rem' }} onClick={() => dispatch(setIsValidationModal({ isValidationModal: false }))}>
                            <span className='text-primary fw-bolder'>
                                Tidak
                            </span>
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default ValidationModal
