// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Reactstrap Imports
import { useDispatch, useSelector } from "react-redux";

import { toggleSaranPintarModal } from '../../../redux/modalToggle'

import {
  Row,
  Col,
  Card,
  Label,
  Input,
  Modal,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  InputGroup,
  ModalHeader,
  InputGroupText
} from 'reactstrap'

import aktivitas from '../../../assets/images/healthy-lifestyle/Fitness stats-pana.png'
import polaMakan from '../../../assets/images/healthy-lifestyle/Eating healthy food-bro.png'
import istirahat from '../../../assets/images/healthy-lifestyle/Sleep analysis-amico.png'

// ** Icons Imports
import { Award, Gift, MessageSquare, Clipboard, Facebook, Twitter, Linkedin } from 'react-feather'



export default function RenderModal() {
  return (
    <ImageModal />
  );
}

const data = [
  {
    icon: aktivitas,
    title: 'Lakukan aktivitas fisik',
    subtitle: 'Sehat pikiran berawal dari sehat jasmani'
  },
  {
    icon: polaMakan,
    title: 'Jaga Pola Makan',
    subtitle: 'Pola makan sehat mencegah penyakit berat'
  },
  {
    icon: istirahat,
    title: 'Cukupi waktu istirahat',
    subtitle: 'Tanpa kesehatan hidup tak akan ada artinya'
  }
]

const ImageModal = () => {
  const { isForYouModal } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  function unshowModal() {
    dispatch(toggleSaranPintarModal(false));
    // alert(JSON.stringify(isForYouModal))
  }

  return (
    <Fragment>
      {isForYouModal ? 
        <Modal isOpen={isForYouModal}
          toggle={unshowModal} className='modal-dialog-centered modal-refer-earn modal-lg'>
       <ModalHeader className='bg-transparent' toggle={unshowModal}></ModalHeader>
       <ModalBody className='pb-5 px-sm-0'>
         <div className='px-sm-4 mx-50'>
           <h3 className='text-center mb-1'>Mari jaga pola hidup Sehat!</h3>
           <p className='text-center mb-5'>
              Hargai tubuhmu dengan melaksanakan pola hidup sehat.
             <br />
             Hari tuamu cerminan pola hidupmu
           </p>
           <Row className='mb-4'>
             {data.map((item, index) => {
               return (
                 <Col xs={12} lg={4} key={index}>
                   <div className='d-flex justify-content-center mb-1'>
                     <div className='modal-refer-earn-step d-flex width-100 height-100 rounded-circle justify-content-center align-items-center bg-light-primary'>
                     <img alt="..." className="w-100 align-middle border-0" style={{ borderRadius: "9999px" }} src={item.icon} />
                     </div>
                   </div>
                   <div className='text-center'>
                     <h6 className='fw-bolder mb-1'>{item.title}</h6>
                     <p>{item.subtitle}</p>
                   </div>
                 </Col>
               )
             })}
           </Row>
         </div>
       </ModalBody>
     </Modal>:<></>
      }

    </Fragment>
  )
}
