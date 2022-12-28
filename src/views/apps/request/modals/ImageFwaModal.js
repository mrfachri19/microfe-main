// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import {
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap'

import {
    setIsImageModal
} from "../store";
import { useDispatch, useSelector } from "react-redux";
import KebijakanImage from '@src/assets/img/kebijakan-fwa.jpg'


const ImageFwaModal = () => {
    // ** State
    const dispatch = useDispatch();
    const isImageModal = useSelector((state) => state.request.isImageModal.isImageModal);

    return (
        <Fragment >
            <Modal
                isOpen={isImageModal}
                toggle={() => dispatch(setIsImageModal({ isImageModal: false }))}
                className={`modal-dialog-centered modal-sm`}
            >
                <ModalHeader toggle={() => dispatch(setIsImageModal({ isImageModal: false }))}>
                </ModalHeader>
                <ModalBody className='d-grid justify-items-center justify-content-center align-items-center'>
                    <img
                        alt="..."
                        src={KebijakanImage}
                        className={"w-96"}
                    ></img>{" "}
                </ModalBody>
            </Modal>
        </Fragment>
    )
}

export default ImageFwaModal
