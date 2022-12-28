// ** React Imports
import React, { useEffect, useState, Fragment } from "react";

// ** Reactstrap Imports
import { useDispatch, useSelector } from "react-redux";

import { toggleModalPrivacyCentra, storeModalPrivacyCentra } from '../../../redux/modalToggle'

import {
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Label
} from 'reactstrap'
import { Earth16Regular, LockClosed12Regular, PeopleTeam16Regular, Person16Regular } from "@fluentui/react-icons";

import { postConnector } from '@src/api';


export default function RenderModal() {
  return (
    <ModalPrivacyCentra />
  );
}

const ModalPrivacyCentra = () => {
  const { isModalPrivacyCentra, kode_data, privacy, nik } = useSelector((state) => state.modal);
  const dispatch = useDispatch();  

  function unshowModal() {
    dispatch(toggleModalPrivacyCentra(false));
  }

  function postEmployeeDatasConnector(newPrivacy) {
    postConnector({
      "vendor" : "centra",
      "id" : "profile",
      "nik" : nik,
      "kode_data" : kode_data,
      "privacy" : newPrivacy
    }).then((res) => {
       // console.log(res.data.body)
      unshowModal()
    });
  }

  // useEffect(() => {
  //   postEmployeeDatasConnector()
  // }, [privacy]);


  return (
    <>
    <Fragment>
      {isModalPrivacyCentra ? 
        <Modal isOpen={isModalPrivacyCentra}
          toggle={unshowModal} className='modal-dialog modal-dialog-centered'>
       
       <ModalBody className='pb-5 px-sm-0 bg-transparent'>
         <div className='px-sm-4 mx-50'>
          <Row>
            <div className="col-12">
              <Row>
                <div className="col-11 mt-4 mb-4 fs-5">
                  Pilih kepada siapa kamu ingin menampilkan data ini :
                </div>
                <div className="col-1">
                  <button type="button" onClick={unshowModal} className="btn-close" aria-label="Close"></button>
                </div>
              </Row>
            </div>
            <div className="col-12 mt-4">
              <Row>
                <div className="col-2">
                  <Label for="public">
                    <Earth16Regular color="tertiary"/>
                  </Label>
                </div>
                <div className="col-8">
                  <Label className="fw-bold fs-4" for="public">
                    Public
                  </Label>
                  <p className="fs-3">Semua orang bisa melihat data ini</p>
                </div>
                <div className="col-2">
                  <Input type='radio' onChange={(e) => { postEmployeeDatasConnector('public') }} name="privacy" id="public" defaultChecked={privacy == 'public' || !privacy? true : false} />
                </div>
              </Row>
            </div>
            <div className="col-12 mt-4">
              <Row>
                <div className="col-2">
                  <Label for="friend">
                    <Person16Regular color="tertiary"/>
                  </Label>
                </div>
                <div className="col-8">
                  <Label className="fw-bold fs-4" for="friend">
                    Friend
                  </Label>
                  <p className="fs-3">Hanya teman kamu yang bisa melihat data ini</p>
                </div>
                <div className="col-2">
                  <Input type='radio' onChange={(e) => { postEmployeeDatasConnector('friend') }}  name="privacy" id="friend" defaultChecked={privacy == 'friend'} />
                </div>
              </Row>
            </div>
            <div className="col-12 mt-4">
              <Row>
                <div className="col-2">
                  <Label for="team">
                    <PeopleTeam16Regular color="tertiary"/>
                  </Label>
                </div>
                <div className="col-8">
                  <Label className="fw-bold fs-4" for="team">
                    Team
                  </Label>
                  <p className="fs-3">Hanya tim / rekan kerja bisa melihat data ini</p>
                </div>
                <div className="col-2">
                  <Input type='radio' onChange={(e) => { postEmployeeDatasConnector('team') }}  name="privacy" id="team" defaultChecked={privacy == 'team'} />
                </div>
              </Row>
            </div>
            <div className="col-12 mt-4">
              <Row>
                <div className="col-2">
                  <Label for="private">
                    <LockClosed12Regular color="tertiary"/>
                  </Label>
                </div>
                <div className="col-8">
                  <Label className="fw-bold fs-4" for="private">
                    Private
                  </Label>
                  <p className="fs-3">Hanya kamu yang bisa melihat data ini</p>
                </div>
                <div className="col-2">
                  <Input type='radio' onChange={(e) => { postEmployeeDatasConnector('private') }}  name="privacy" id="private" defaultChecked={privacy == 'private'} />
                </div>
              </Row>
            </div>
          </Row>
         </div>
       </ModalBody>
     </Modal>:<></>
      }

    </Fragment>
    </>
  )
}
