// ** Reactstrap Imports
import { Card, CardBody, CardText, Input, Col, Button, UncontrolledTooltip, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

import React, { useEffect, useState, Fragment } from "react";

import { Earth16Filled, LockClosed16Filled, PeopleTeam16Filled, Person16Filled } from "@fluentui/react-icons";

import { getConnector } from "@src/api";

import {getUsernik} from "../../../utils/storage"
import { useDispatch, useSelector } from "react-redux";
import {toggleModalPrivacyCentra, storeModalPrivacyCentra } from '../../../redux/modalToggle';
import ModalPrivacyCentra from "@src/views/components/Modals/ModalPrivacyCentra";

const ProfileEmployeeCertification = ({ nik, data }) => {
  const dispatch = useDispatch();
  const [dataEmployeeCertificationConnector, setDataEmployeeCertificationConnector] = useState([]);
  const [listEmployeeCertificationConnector, setListEmployeeCertificationConnector] = useState([]);
  const [iconPrivacy, setIconPrivacy] = useState({
    'public' : <Earth16Filled/>,
    'private' : <LockClosed16Filled/>,
    'team' : <PeopleTeam16Filled/>,
    'friend' : <Person16Filled/>
  });
  const { isModalPrivacyCentra } = useSelector((state) => state.modal);
  const userNik = getUsernik()
  function getEmployeeCertificationsConnector() {
    getConnector(
      `?vendor=centra&id=sertifikasi&nik=${nik}`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
      setDataEmployeeCertificationConnector(tempList);
      setListEmployeeCertificationConnector(tempList.value);
       // console.log('data employee certification connector =>',res.data.data);
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
      getEmployeeCertificationsConnector()
    }
  }, [isModalPrivacyCentra]);

  function render_tgl(tgl) {
    let bulan = ['',"Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
    let start_date = `${tgl.substring(6,8)} ${bulan[parseInt(tgl.substring(4,6))]} ${tgl.substring(0,4)}`
    return `${start_date}`
  }

  const renderCertification = () => {
    return listEmployeeCertificationConnector.map(item => {
      return (
          <>
          <div className='row'>
            <Col md='10'>
              <div className='row'>
                <div className='fs-4 fw-bold mt-4 mb-2'>{item.nama}</div>
                  {item.penyelenggara == "" || item.penyelenggara == null ? "" : (<div className='fs-4 fw-normal text-tertiary mb-2'>Diselenggarakan oleh {item.penyelenggara}</div>)}
                <div className='fs-4 fw-bold text-tertiary mb-2'>{item.tanggal_expire != null ? (`Valid sampai ${render_tgl(item.tanggal_expire)}`) : ''}</div>
            </div>
            </Col>
            <Col md='2'>
            </Col>
          </div>
            <hr/>
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
          {dataEmployeeCertificationConnector && ( ((userNik!=nik) && (dataEmployeeCertificationConnector.privacy == "private")) || ((userNik!=nik) && (dataEmployeeCertificationConnector.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeCertificationConnector.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          ('')
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeCertificationConnector ? (`Privasi Data (${dataEmployeeCertificationConnector.privacy})`) : null}/>
            { dataEmployeeCertificationConnector && (dataEmployeeCertificationConnector.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeCertificationConnector.kode_data,dataEmployeeCertificationConnector.privacy)}>{dataEmployeeCertificationConnector ? 
                iconPrivacy[dataEmployeeCertificationConnector.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeCertificationConnector.t_pendidikan ? 
                // iconPrivacy[dataEmployeeCertificationConnector.t_pendidikan.privacy] : iconPrivacy['public']}</span>
                ''
              )
            }
          </div>
          )}
        </div>
      </div>
        </Col> 
            <div className='row'>
            {dataEmployeeCertificationConnector && ( ((userNik!=nik) && (dataEmployeeCertificationConnector.privacy == "private")) || ((userNik!=nik) && (dataEmployeeCertificationConnector.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeCertificationConnector.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeCertificationConnector.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeCertificationConnector.kode_data}>
              Data ini disembunyikan oleh pengguna ({dataEmployeeCertificationConnector.v_company_home.privacy == "private" ? dataEmployeeCertificationConnector.v_company_home.privacy:dataEmployeeCertificationConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (renderCertification())
          }
              
            </div>
        </div>
      </CardBody>
    </Card>
    <ModalPrivacyCentra/>
    </>
  )
}

export default ProfileEmployeeCertification
