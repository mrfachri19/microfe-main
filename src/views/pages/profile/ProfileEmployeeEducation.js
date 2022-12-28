// ** Reactstrap Imports
import { Card, CardBody, CardText, Input, Col, Button, UncontrolledTooltip, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

import React, { useEffect, useState, Fragment } from "react";

import { Earth16Filled, LockClosed16Filled, PeopleTeam16Filled, Person16Filled } from "@fluentui/react-icons";

import { getConnector } from "@src/api";

import {getUsernik} from "../../../utils/storage"
import { useDispatch, useSelector } from "react-redux";
import {toggleModalPrivacyCentra, storeModalPrivacyCentra } from '../../../redux/modalToggle';
import ModalPrivacyCentra from "@src/views/components/Modals/ModalPrivacyCentra";


const ProfileEmployeeEducation = ({ nik, data }) => {
  const dispatch = useDispatch();
  const [dataEmployeeEducationConnector, setDataEmployeeEducationConnector] = useState([]);
  const [listEmployeeEducationConnector, setListEmployeeEducationConnector] = useState([]);
  const [iconPrivacy, setIconPrivacy] = useState({
    'public' : <Earth16Filled/>,
    'private' : <LockClosed16Filled/>,
    'team' : <PeopleTeam16Filled/>,
    'friend' : <Person16Filled/>
  });
  const { isModalPrivacyCentra } = useSelector((state) => state.modal);
  const userNik = getUsernik()
  function getEmployeeEducationsConnector() {
    getConnector(
      `?vendor=centra&id=pendidikan&nik=${nik}`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
      setDataEmployeeEducationConnector(tempList);
      setListEmployeeEducationConnector(tempList.value);
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
      getEmployeeEducationsConnector()
    }
  }, [isModalPrivacyCentra]);

  const renderEducation = () => {
    return listEmployeeEducationConnector.map(item => {
      return (
        <Col md='12'>
          <div className='row'>
            <div className='fs-4 fw-bold mt-4 mb-2'>{item.institusi}</div>
            <div className='fs-3 fw-normal text-tertiary mb-2'>{item.jurusan}</div>
            <div className='fs-4 fw-normal mb-2'>{(item.tgl_selesai).substring(0,4)}</div>
            <hr/>
          </div>
        </Col>
      )
    })
  }

  return (
    <>
    <Card>
      <CardBody>

        <div className='row'>
        <Col md="8" className='mb-8'></Col> 
        <Col md="4" className='mb-4'>
        <div className="mb-2">
        <div className="mb-2">
          {dataEmployeeEducationConnector && ( ((userNik!=nik) && (dataEmployeeEducationConnector.privacy == "private")) || ((userNik!=nik) && (dataEmployeeEducationConnector.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeEducationConnector.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          ('')
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeEducationConnector ? (`Privasi Data (${dataEmployeeEducationConnector.privacy})`) : null}/>
            { dataEmployeeEducationConnector && (dataEmployeeEducationConnector.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeEducationConnector.kode_data,dataEmployeeEducationConnector.privacy)}>{dataEmployeeEducationConnector ? 
                iconPrivacy[dataEmployeeEducationConnector.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeEducationConnector.t_pendidikan ? 
                // iconPrivacy[dataEmployeeEducationConnector.t_pendidikan.privacy] : iconPrivacy['public']}</span>
                ''
              )
            }
          </div>
          )}
        </div>
      </div>
        </Col> 
            <div className='row'>
            {dataEmployeeEducationConnector && ( ((userNik!=nik) && (dataEmployeeEducationConnector.privacy == "private")) || ((userNik!=nik) && (dataEmployeeEducationConnector.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeEducationConnector.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeEducationConnector.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeEducationConnector.kode_data}>
              Data ini disembunyikan oleh pengguna ({dataEmployeeEducationConnector.v_company_home.privacy == "private" ? dataEmployeeEducationConnector.v_company_home.privacy:dataEmployeeEducationConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (renderEducation())
          }
              
            </div>
        </div>
      </CardBody>
    </Card>
    <ModalPrivacyCentra/>
    </>
  )
}

export default ProfileEmployeeEducation
