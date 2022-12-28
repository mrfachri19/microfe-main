// ** Reactstrap Imports
import { Card, CardBody, CardText, Input, Col, Button, UncontrolledTooltip, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

import React, { useEffect, useState, Fragment } from "react";

import { Earth16Filled, LockClosed16Filled, PeopleTeam16Filled, Person16Filled, CalendarLtr16Regular } from "@fluentui/react-icons";

import { getConnector } from "@src/api";

import {getUsernik} from "../../../utils/storage"
import { useDispatch, useSelector } from "react-redux";
import {toggleModalPrivacyCentra, storeModalPrivacyCentra } from '../../../redux/modalToggle';
import ModalPrivacyCentra from "@src/views/components/Modals/ModalPrivacyCentra";
import telkom from '../../../assets/icons/telkom-indonesia.svg'

import * as moment from 'moment'
import { formatDate } from '@fullcalendar/react';


const ProfileEmployeeDinas = ({ nik, data }) => {
  const dispatch = useDispatch();
  const [dataEmployeeDinasConnector, setDataEmployeeDinasConnector] = useState([]);
  const [listEmployeeDinasConnector, setListEmployeeDinasConnector] = useState([]);
  const [iconPrivacy, setIconPrivacy] = useState({
    'public' : <Earth16Filled/>,
    'private' : <LockClosed16Filled/>,
    'team' : <PeopleTeam16Filled/>,
    'friend' : <Person16Filled/>
  });
  const { isModalPrivacyCentra } = useSelector((state) => state.modal);
  const userNik = getUsernik()
  function getEmployeeDinassConnector() {
    getConnector(
      `?vendor=centra&id=riwayat-dinas&nik=${nik}`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
      setDataEmployeeDinasConnector(tempList);
      setListEmployeeDinasConnector(tempList.value);
       // console.log('data employee pendidikan connector =>',res.data.data);
    });
  }
  

  function openModal(modal, nik, kode_data, privacy) {
    dispatch(modal(true));
    dispatch(storeModalPrivacyCentra({
      nik : nik, 
      kode_data : kode_data, 
      privacy : privacy
    }));
  }

  useEffect(() => {
    if (!isModalPrivacyCentra){
      getEmployeeDinassConnector()
    }
  }, [isModalPrivacyCentra]);

  function start_end(start,end) {
    let bulan = ['',"Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
    let start_date = `${start.substring(6,8)} ${bulan[parseInt(start.substring(4,6))]} ${start.substring(0,4)}`
    let end_date = end.substring(0,4) == '9999' ? 'Sekarang' : `${end.substring(6,8)} ${bulan[parseInt(end.substring(4,6))]} ${end.substring(0,4)}`
    return `${start_date} - ${end_date}`
  }

  const renderDinas = () => {
    return listEmployeeDinasConnector.map(item => {
      return (<>
        <Col md='1'>
          <div>
            <img alt="..." className="w-100 align-middle border-0" src={telkom} />
          </div>
        </Col>
        <Col md='10'>
          <div className='row'>
            <div className='mb-2 mt-2'><span className='bg-primary-100 rounded p-1 border border-primary-500 text-primary-600'> <CalendarLtr16Regular/> {start_end(item.start_date,item.end_date)} </span></div>
            <div className='mb-2 mt-2'> <span  className='fs-4 fw-bold'>{item.posisi}</span><span className='fs-4 fw-normal text-tertiary'> | Band {item.band}</span></div>
            <div className='fs-4 fw-normal mb-4'>{item.unit} / {item.divisi}</div>
          </div>
        </Col>
        <Col md='1'>
        </Col>
        <hr className='mb-3'/>
        </>
      )
    })
  }

  return (
    <>
    <Card>
      <CardBody>
        {/* <h4 className='mb-4 fw-bold text-primary'>Biografi</h4>
        <CardText className='mb-12'>{data.bio}</CardText> */}

        <div className='row'>
        <Col md="8" className='mb-8'></Col> 
        <Col md="4" className='mb-4'>
        <div className="mb-2">
        <div className="mb-2">
          {dataEmployeeDinasConnector && ( ((userNik!=nik) && (dataEmployeeDinasConnector.privacy == "private")) || ((userNik!=nik) && (dataEmployeeDinasConnector.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeDinasConnector.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          ('')
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeDinasConnector ? (`Privasi Data (${dataEmployeeDinasConnector.privacy})`) : null}/>
            { dataEmployeeDinasConnector && (dataEmployeeDinasConnector.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeDinasConnector.kode_data,dataEmployeeDinasConnector.privacy)}>{dataEmployeeDinasConnector ? 
                iconPrivacy[dataEmployeeDinasConnector.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeDinasConnector.t_pendidikan ? 
                // iconPrivacy[dataEmployeeDinasConnector.t_pendidikan.privacy] : iconPrivacy['public']}</span>
                ''
              )
            }
          </div>
          )}
        </div>
      </div>
        </Col> 
            <div className='row'>
            {dataEmployeeDinasConnector && ( ((userNik!=nik) && (dataEmployeeDinasConnector.privacy == "private")) || ((userNik!=nik) && (dataEmployeeDinasConnector.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeDinasConnector.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeDinasConnector.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeDinasConnector.kode_data}>
              Data ini disembunyikan oleh pengguna ({dataEmployeeDinasConnector.v_company_home.privacy == "private" ? dataEmployeeDinasConnector.v_company_home.privacy:dataEmployeeDinasConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (renderDinas())
          }
              
            </div>
        </div>
      </CardBody>
    </Card>
    <ModalPrivacyCentra/>
    </>
  )
}

export default ProfileEmployeeDinas
