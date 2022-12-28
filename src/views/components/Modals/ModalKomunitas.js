// ** React Imports
import React, { useEffect, useState, Fragment } from "react";

// ** Reactstrap Imports
import { useDispatch, useSelector } from "react-redux";

import { toggleModalKomunitas, storeModalKomunitas } from '../../../redux/modalToggle'

import notFoundSearch from '@src/assets/img/404-page.svg'
import birthdayImg from '@src/assets/img/Birthday.svg';

import {
  Row,
  Card,
  Modal,
  CardBody,
  ModalBody,
  ModalHeader,
  CardImg,
  Badge
} from 'reactstrap'

import { getMobile, getMobileV2 } from '@src/api';


export default function RenderModal() {
  return (
    <ModalKomunitas />
  );
}

const ModalKomunitas = () => {
  const { isModalKomunitas, idKomunitas, objKomunitas, memberKomunitas, postKomunitas, likeKomunitas, avatarKomunitas, userIdKomunitas } = useSelector((state) => state.modal);
  const dispatch = useDispatch();  
  const [pageData, setPageData] = useState([]);

  function unshowModal() {
    dispatch(toggleModalKomunitas(false));
  }

  function getDataKomunitas(id,obj,userId){
     // console.log(obj);
    if (obj == 'community'){
      getMobile('community/view/'+id).then(res => {
        setPageData(res.data.data)
         // console.log('community data =>', res);
      })
    }else{
      getMobile('page/view/'+id).then(res => {
        setPageData(res.data.data)
         // console.log('Page data =>', res);
      })
    }
    
  }


  return (
    <>
    <Fragment>
      {isModalKomunitas ? 
        <Modal isOpen={isModalKomunitas}
          toggle={unshowModal} className='modal-dialog-centered modal-refer-earn modal-lg'>
       <ModalHeader className='bg-transparent' toggle={unshowModal}></ModalHeader>
       <ModalBody className='pb-5 px-sm-0 bg-transparent'>
         <div className='px-sm-4 mx-50'>
           <Row>
            <div className='col-md-12'>
            <Card className='card-profile'>
              <CardImg className='img-fluid' src={avatarKomunitas} top />
              <CardBody>
                <div className='profile-image-wrapper'>
                  <div className='profile-image'>
                      <div className="avatar">
                        <img src={avatarKomunitas} alt="avatarImg" height="32" width="32"/>
                      </div>
                  </div>
                </div>
                <h3>{pageData.title}</h3>
                <h6 className='text-muted'>{pageData.slug}</h6>
                <Badge className='profile-badge' color='light-primary' onClick={e => {  console.log('Selamat join'); }}>
                  Join
                </Badge>
                <hr className='mb-2' />
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <h6 className='text-muted fw-bolder'>Pengikut</h6>
                    <h3 className='mb-0'>{(0+memberKomunitas)}</h3>
                  </div>
                  <div>
                    <h6 className='text-muted fw-bolder'>Post</h6>
                    <h3 className='mb-0'>{(0+postKomunitas)}</h3>
                  </div>
                  <div>
                    <h6 className='text-muted fw-bolder'>Disukai</h6>
                    <h3 className='mb-0'>{(0+likeKomunitas)}</h3>
                  </div>
                </div>
              </CardBody>
            </Card>
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
