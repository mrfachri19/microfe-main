// ** React Imports
import { useEffect, useState, useCallback } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'
import AvatarGroup from '@components/avatar-group'

// ** Reactstrap Imports
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardBody, 
  Badge,
  Button,
  Col,
  Row
 } from 'reactstrap'

import notFoundSearch from '@src/assets/img/404-page.svg'

import { addFriend, addKomunitas, getConectionStatus } from '@src/api';

import { useDispatch, useSelector } from "react-redux";

import { Link } from 'react-router-dom';

import {toggleModalKomunitas, storeModalKomunitas } from '@store/modalToggle';
import ModalKomunitas from "@src/views/components/Modals/ModalKomunitas";
import toastAlert from "@src/utils/alert";

// ** Icons Imports
import {
  PersonAddRegular,
  PersonClockRegular,
  PersonDeleteRegular
} from "@fluentui/react-icons";

const SearchAction = (props) => {
  const { userData } = useSelector((state) => state.auth);
  const [userId, setUserId] = useState(userData.id_user);
  const dispatch = useDispatch();

  function openModal(modal,data) {
    dispatch(modal(true));
    dispatch(storeModalKomunitas({
      userId : userId, 
      id : data.id, 
      obj : data.obj,
      avatar : data.avatar,
      member : data.totalMember,
      post : data.totalPost,
      like : data.totalLike
    }));
  }

  function addFriendById(userId,toUserId) {
    addFriend(
      {
        "userId": userId,
        "toUserId": toUserId
      }
      ).then((res) => {
        if (res.data.status != 200) {
          toastAlert("error",`error ${res.data.status} : ${res.data.message}`);
          document.getElementById(`addf-${toUserId}`).classList.remove("d-none");
          document.getElementById(`drf-${toUserId}`).classList.add("d-none");          
        } else {
          document.getElementById(`addf-${toUserId}`).classList.add("d-none");
          document.getElementById(`drf-${toUserId}`).classList.remove("d-none");
          toastAlert("success","Pengajuan pertemanan dikirim.");
        }
    });
  }

  function unfollowCommunity(userId,toUserId) {
    getConectionStatus(`unfollow/${userId}/${toUserId}`).then((res) => {
      //  // console.log(res);
    });
  }
  
  function followCommunity(userId,toUserId) {
    addKomunitas(
      {
        "toUserId": toUserId,
        "userId": userId
      }
    ).then((res) => {
      //  // console.log(res);
    });
  }

  function unFriendById(userId,toUserId, friennStatus) {
    getConectionStatus(`unfriend/${userId}/${toUserId}`).then((res) => {
      if (res.data.status != 200){
        toastAlert("error",`error ${res.data.status} : ${res.data.message}`);
        document.getElementById(`addf-${toUserId}`).classList.add("d-none");
        if (friennStatus == 0) {
          document.getElementById(`drf-${toUserId}`).classList.remove("d-none");          
        }else{
          document.getElementById(`delf-${toUserId}`).classList.remove("d-none");
        }
      } else {
        document.getElementById(`delf-${toUserId}`).classList.add("d-none");
        document.getElementById(`drf-${toUserId}`).classList.add("d-none");
        document.getElementById(`addf-${toUserId}`).classList.remove("d-none");
        toastAlert("success","Pertemanan dihapus.");
      }
    });
  }

  const renderAvatar = (mutuals) => {
    let dataMutuals = []
    mutuals.map((item,i) => {
      if (i < 3){
        dataMutuals.push({
          title: item.name,
          placement: 'bottom',
          img: item.photo,
          onClick: () => {window.open("/profile/"+item.nik)},
          imgHeight: 33,
          imgWidth: 33
        });
      }
    })
    if (mutuals.length > 0){
      dataMutuals.push({
        meta : `${mutuals.length - 0} Teman Bersama`
      });
    }
    //  // console.log("jancuk", dataMutuals);
    return <AvatarGroup className="photo-karyawan-group" data={dataMutuals} />
  }

  const renderSearchData = () => {
    if (props.loading == true){
      return (
        <>
          <div className="text-center mt-10 mb-10">Loading...</div>
        </>
      )
    }
    
    if (props.listData.length < 1){
      return (
        <>
          <img alt="..." className="w-100 align-middle border-0" src={notFoundSearch} />
        </>
      )
    }

    return props.listData.map(item => {
      if (props.action==1){
        return (
          <div className='d-flex list-search-items py-4 px-8' key={item.id}>
            <div className='d-flex'>
              <Link to={item.username != 'peduli_covid' ? `/profile/${item.username}` : '#'}>
                <Avatar className='mb-auto mx-auto photo-karyawan' img={item.avatar} imgHeight='64' imgWidth='64' />
              </Link>
            </div>          
            <div className='ms-7 flex-fill'>
              <div className='profile-user-info'>
                <Link className="text-tertiary-700 fw-bold" to={item.username != 'peduli_covid' ? `/profile/${item.username}` : '#'}>
                  {item.fullname} | {item.username}
                </Link>
                <div>
                  <small className='text-tertiary-600'>{item.jabatan}</small>
                </div>
                <div>
                  <small className='text-tertiary-600'>{item.perusahaan}</small>
                </div>
                <div>
                  {renderAvatar(item.mutuals)}
                </div>
              </div>
            </div>
            <div className='my-auto ms-auto'>
              <Button color='primary-100' size='sm' className={`m-auto fw-bold text-primary ${item.friendshipStatus == 2 ? '' : 'd-none'}`} id={`addf-${item.id}`} onClick={ () => {addFriendById(userId,item.id)}}><PersonAddRegular /> Tambahkan Pertemanan</Button>
              <Button color='secondary-100' size='sm' className={`m-auto fw-bold text-secondary ${item.friendshipStatus == 1 ? '' : 'd-none'}`} id={`delf-${item.id}`} onClick={ () => {unFriendById(userId,item.id,item.friendshipStatus)}}><PersonDeleteRegular /> Hapus Pertemanan</Button>
              <Button color='info-100' size='sm' className={`m-auto fw-bold text-info ${item.friendshipStatus == 0 ? '' : 'd-none'}`} id={`drf-${item.id}`} onClick={ () => {toastAlert('info', `Sedang menunggu konfirmasi dari ${item.fullname}`)}}><PersonClockRegular /> Menunggu Persetujuan</Button>
            </div>
          </div>
      )
      
      } else if (props.action == 2){
        return (
          <>
          <div className='row' key={item.id}>
            <Col md="2">
              <Avatar className='me-1 photo-karyawan' img={item.avatar} imgHeight='64' imgWidth='64' onClick={() => openModal(toggleModalKomunitas, item)} />
            </Col>          
            <Col md="10">
              <Row>
                <Col md="7">
                <div className='profile-user-info'>
                  <div>
                    <small className='text-bold'>{item.fullname} </small>
                  </div>
                  <div>
                    <small className='text-muted'>{item.totalMember} Member</small>
                  </div>
                </div>
                </Col>
                <Col md="5">
                  <div className='d-flex justify-content-center'>
                      <Button color='primary' size='sm' className={`m-auto ${item.canJoin != 0 && item.privacy==1 && item.member == false ? '' : 'd-none'}`} id={`addf-${item.id}`} onClick={ () => {followCommunity(userId,item.id)}}><PersonAdd16Regular /> Ikuti</Button>
                      <Button color='primary' size='sm' className={`m-auto ${item.member == true ? '' : 'd-none'}`} id={`addf-${item.id}`} onClick={ () => {unfollowCommunity(userId,item.id)}}><PersonAdd16Regular /> Batal Ikuti</Button>
                  </div>
                </Col>
              </Row>
              <hr></hr>
            </Col>          
          </div>
          </>
        )
      } else {
        return (
          <>
            <div className='row' key={item.id}>
              <div className='d-flex justify-content-start align-items-center mb-1 col-sm-9'>
                <Avatar className='me-1 photo-karyawan' img={item.avatar} imgHeight='40' imgWidth='40' />
                <div className='profile-user-info'>
                  <div>
                    <small className='text-bold'>{item.fullname} | {item.username}</small>
                  </div>
                  <div>
                    <small className='text-muted'>{item.jabatan}</small>
                  </div>
                  <div>
                    <small className='text-muted'>{item.perusahaan}</small>
                  </div>
                </div>
              </div>
              <div className='d-flex justify-content-center col-sm-3'>
                {item.friendshipStatus == 2 ? (
                  <Button color='primary' size='sm' className='m-auto'><PersonAdd16Regular /> Tambahkan Pertemanan</Button>
                ) : item.friendshipStatus == 1 ? (
                  <Button color='secondary' size='sm' className='m-auto'><PersonAdd16Regular /> Hapus Pertemanan</Button>
                )
                  : <Button color='info' size='sm' className='m-auto'><PersonAdd16Regular /> Menunggu Persetujuan</Button>}
              </div>
            </div>
          </> 
        )
      }
    })
  }

  return (
    <>
    <Card className='card-transaction'>
        <div className='mt-4 mb-2 ms-5 fw-bold text-tertiary-700'>Sekitar {props.countData} Hasil</div>
      <CardHeader>
        <CardTitle tag='h4' className='fw-bolder text-tertiary-700'>{props.actionName}</CardTitle>
      </CardHeader>
      <CardBody className="d-block list-search">
          {renderSearchData()}
      </CardBody>
    </Card>
    <ModalKomunitas/>
    </>
  )
}

export default SearchAction
