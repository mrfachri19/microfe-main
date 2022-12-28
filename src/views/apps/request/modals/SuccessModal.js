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
    setIsValidationModalYes,
} from "../store";
import { useDispatch, useSelector } from "react-redux";
import SuccessImage from '@src/assets/icons/success-fwa.svg'


const SuccessModal = ({ text }) => {
    // ** State
    const dispatch = useDispatch();
    const isValidationModalYes = useSelector((state) => state.request.isValidationModalYes.isValidationModalYes);

    useEffect(() => {
        dispatch(setIsValidationModalYes({ isValidationModalYes: false }))
    }, [1]);

    return (
        <Fragment >
            <Modal
                isOpen={isValidationModalYes}
                toggle={() => dispatch(setIsValidationModalYes({ isValidationModalYes: false }))}
                className={`modal-dialog-centered`}
            >
                <ModalHeader toggle={() => dispatch(setIsValidationModalYes({ isValidationModalYes: false }))}>
                </ModalHeader>
                <ModalBody className='pb-5 px-sm-4 mx-50'>
                    <h5 className='text-primary-500 fw-bolder text-center mb-5'>
                        {text}
                    </h5>
                    <div className='d-grid justify-content-center'>
                        <img
                            alt="..."
                            src={SuccessImage}
                            style={{ width: "18rem" }}
                        ></img>{" "}
                    </div>
                    <div className="mb-10 d-grid justify-content-center">
                        <Button color='primary' style={{ width: '7.063rem' }}>
                            <span className='text-white fw-bolder'>
                                OK
                            </span>
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default SuccessModal
