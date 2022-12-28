// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Reactstrap Imports
import { Modal } from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";

import { toggleImageModal, storeDataModal } from '../../../redux/modalToggle';

import { unEntity } from '@src/utils/normalizeInput';

export default function RenderModal() {
  return (
    <ImageModal />
  );
}

const ImageModal = () => {
  const dispatch = useDispatch();
  const { isImageModal, modalImageContent, modalCaptionContent, modalUrlContent } = useSelector((state) => state.modal);

  function unshowModal() {
    dispatch(toggleImageModal(false));
    dispatch(storeDataModal({
      caption : "", 
      image : "", 
      url : ""
    }));
  }

  return (
    <Fragment>
      {isImageModal ? 
        <Modal
          isOpen={isImageModal}
          toggle={unshowModal}
          className="modal-image-preview"
        >
          <img alt="image-banner-modal" src={modalImageContent} />
          <div className={`image-caption ${modalCaptionContent? '':'d-none'}`}>
            {unEntity(modalCaptionContent)}
            <a className={`${modalUrlContent ? 'badge bg-light-primary rounded-pill mt-2':'d-none'}`} href={modalUrlContent} target="_blank">Pelajari lebih lanjut</a>
          </div>
        </Modal>:<></>
      }

    </Fragment>
  )
}
