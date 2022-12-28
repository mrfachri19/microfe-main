// ** Reactstrap Imports
import { Card, CardBody, CardText, Input, Col, Button, UncontrolledTooltip, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

import React, { useEffect, useState, Fragment } from "react";

import { Earth16Filled, LockClosed16Filled, PeopleTeam16Filled, Person16Filled, CalendarLtr16Regular, Location16Regular } from "@fluentui/react-icons";

import { getConnector } from "@src/api";

import {getUsernik} from "../../../utils/storage"
import { useDispatch, useSelector } from "react-redux";
import {toggleModalPrivacyCentra, storeModalPrivacyCentra } from '../../../redux/modalToggle';
import ModalPrivacyCentra from "@src/views/components/Modals/ModalPrivacyCentra";

const ProfileEmployeeTraining = ({ nik, data }) => {
  const dispatch = useDispatch();
  const [dataEmployeeTrainingConnector, setDataEmployeeTrainingConnector] = useState([]);
  const [listEmployeeTrainingConnector, setListEmployeeTrainingConnector] = useState([]);
  const [iconPrivacy, setIconPrivacy] = useState({
    'public' : <Earth16Filled/>,
    'private' : <LockClosed16Filled/>,
    'team' : <PeopleTeam16Filled/>,
    'friend' : <Person16Filled/>
  });
  const { isModalPrivacyCentra } = useSelector((state) => state.modal);
  const userNik = getUsernik()
  function getEmployeeTrainingsConnector() {
    getConnector(
      `?vendor=centra&id=pelatihan&nik=${nik}`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
      setDataEmployeeTrainingConnector(tempList);
      setListEmployeeTrainingConnector(tempList.value);
       // console.log('data employee pelatihan connector =>',res.data.data);
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
      getEmployeeTrainingsConnector()
    }
  }, [isModalPrivacyCentra]);

  function start_end(start,end) {
    let bulan = ['',"Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
    let start_date = `${start.substring(6,8)} ${bulan[parseInt(start.substring(4,6))]} ${start.substring(0,4)}`
    let end_date = end.substring(0,4) == '9999' ? 'Sekarang' : `${end.substring(6,8)} ${bulan[parseInt(end.substring(4,6))]} ${end.substring(0,4)}`
    if (start.substring(0,6) == end.substring(0,6)){
      return `${start.substring(6,8)} - ${end.substring(6,8)} ${bulan[parseInt(start.substring(4,6))]} ${start.substring(0,4)}`
    }
    return `${start_date} - ${end_date}`
  }

  const renderTraining = () => {
    return listEmployeeTrainingConnector.map(item => {
      return (
          <div className='row'>
            <div className='fs-4 fw-bold mt-4 mb-2'>{item.nama}</div>
            {item.penyelenggara == "" ? "" : (<div className='fs-3 fw-bold mt-4 mb-2'>Diselenggarakan oleh {item.penyelenggara}</div>)}
            <div className='fs-4 fw-normal mt-4 mb-2'><Location16Regular/> {item.lokasi_pelatihan}</div>
            <div className='fs-4 fw-normal mt-4 mb-2'><CalendarLtr16Regular/> {start_end(item.start_date,item.end_date)}</div>
            <hr/>
          </div>
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
          {dataEmployeeTrainingConnector && ( ((userNik!=nik) && (dataEmployeeTrainingConnector.privacy == "private")) || ((userNik!=nik) && (dataEmployeeTrainingConnector.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeTrainingConnector.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          ('')
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeTrainingConnector ? (`Privasi Data (${dataEmployeeTrainingConnector.privacy})`) : null}/>
            { dataEmployeeTrainingConnector && (dataEmployeeTrainingConnector.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeTrainingConnector.kode_data,dataEmployeeTrainingConnector.privacy)}>{dataEmployeeTrainingConnector ? 
                iconPrivacy[dataEmployeeTrainingConnector.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeTrainingConnector.t_pendidikan ? 
                // iconPrivacy[dataEmployeeTrainingConnector.t_pendidikan.privacy] : iconPrivacy['public']}</span>
                ''
              )
            }
          </div>
          )}
        </div>
      </div>
        </Col> 
            <div className='row'>
            {dataEmployeeTrainingConnector && ( ((userNik!=nik) && (dataEmployeeTrainingConnector.privacy == "private")) || ((userNik!=nik) && (dataEmployeeTrainingConnector.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeTrainingConnector.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeTrainingConnector.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeTrainingConnector.kode_data}>
              Data ini disembunyikan oleh pengguna ({dataEmployeeTrainingConnector.v_company_home.privacy == "private" ? dataEmployeeTrainingConnector.v_company_home.privacy:dataEmployeeTrainingConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (renderTraining())
          }
              
            </div>
        </div>
      </CardBody>
    </Card>
    <ModalPrivacyCentra/>
    </>
  )
}

export default ProfileEmployeeTraining
