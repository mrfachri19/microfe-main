// ** Reactstrap Imports
import { Card, CardBody, CardText, Input, Col, Button, UncontrolledTooltip, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

import React, { useEffect, useState, Fragment } from "react";

import { Earth16Filled, LockClosed16Filled, PeopleTeam16Filled, Person16Filled } from "@fluentui/react-icons";

import { getConnector } from "@src/api";

import {getUsernik} from "../../../utils/storage"
import { useDispatch, useSelector } from "react-redux";
import {toggleModalPrivacyCentra, storeModalPrivacyCentra } from '../../../redux/modalToggle';
import ModalPrivacyCentra from "@src/views/components/Modals/ModalPrivacyCentra";

const ProfileEmployeeKomunikasiData = ({ nik, data }) => {
  const dispatch = useDispatch();
  const [dataEmployeeKomunikasiConnector, setDataEmployeeKomunikasiConnector] = useState([]);
  const [iconPrivacy, setIconPrivacy] = useState({
    'public' : <Earth16Filled/>,
    'private' : <LockClosed16Filled/>,
    'team' : <PeopleTeam16Filled/>,
    'friend' : <Person16Filled/>
  });
  const { isModalPrivacyCentra } = useSelector((state) => state.modal);
  const userNik = getUsernik()
  function getEmployeeKomunikasiDatasConnector() {
    getConnector(
      `?vendor=centra&id=komunikasiv2&nik=${nik}`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
      setDataEmployeeKomunikasiConnector(tempList);
       // console.log('data employee komunikasi connector =>',res.data.data);
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
      getEmployeeKomunikasiDatasConnector()
    }
  }, [isModalPrivacyCentra]);

  return (
    <>
    <Card>
      <CardBody>
        {/* <h4 className='mb-4 fw-bold text-primary'>Biografi</h4>
        <CardText className='mb-12'>{data.bio}</CardText> */}

        <div className='row'>
        <Col md="6" className='mb-4'>
      <span className='mb-4 fw-bold fs-4'>Nomor Telepon</span>
      <div className="mb-2">
        <div className="mb-2">
          {dataEmployeeKomunikasiConnector.n_whatsapp && ( ((userNik!=nik) && (dataEmployeeKomunikasiConnector.n_whatsapp.privacy == "private")) || ((userNik!=nik) && (dataEmployeeKomunikasiConnector.n_whatsapp.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeKomunikasiConnector.n_whatsapp.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeKomunikasiConnector.n_whatsapp.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeKomunikasiConnector.n_whatsapp.kode_data}>
              Data ini disembunyikan oleh pengguna ({dataEmployeeKomunikasiConnector.v_company_home.privacy == "private" ? dataEmployeeKomunikasiConnector.v_company_home.privacy:dataEmployeeKomunikasiConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeKomunikasiConnector.n_whatsapp ? dataEmployeeKomunikasiConnector.n_whatsapp.value : null}/>
            { dataEmployeeKomunikasiConnector.n_whatsapp && (dataEmployeeKomunikasiConnector.n_whatsapp.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeKomunikasiConnector.n_whatsapp.kode_data,dataEmployeeKomunikasiConnector.n_whatsapp.privacy)}>{dataEmployeeKomunikasiConnector.n_whatsapp ? 
                iconPrivacy[dataEmployeeKomunikasiConnector.n_whatsapp.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeKomunikasiConnector.n_whatsapp ? 
                // iconPrivacy[dataEmployeeKomunikasiConnector.n_whatsapp.privacy] : iconPrivacy['public']}</span>
                ''
              )
            }
          </div>
          )}
        </div>
      </div>
    </Col> 
    <Col md="6" className='mb-4'>
      <span className='mb-4 fw-bold fs-4'>Nomor GSM</span>
      <div className="mb-2">
        <div className="mb-2">
          {dataEmployeeKomunikasiConnector.n_gsm && ( ((userNik!=nik) && (dataEmployeeKomunikasiConnector.n_gsm.privacy == "private")) || ((userNik!=nik) && (dataEmployeeKomunikasiConnector.n_gsm.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeKomunikasiConnector.n_gsm.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeKomunikasiConnector.n_gsm.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeKomunikasiConnector.n_gsm.kode_data}>
              Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeKomunikasiConnector.n_gsm ? dataEmployeeKomunikasiConnector.n_gsm.value : null}/>
            { dataEmployeeKomunikasiConnector.n_gsm && (dataEmployeeKomunikasiConnector.n_gsm.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeKomunikasiConnector.n_gsm.kode_data,dataEmployeeKomunikasiConnector.n_gsm.privacy)}>{dataEmployeeKomunikasiConnector.n_gsm ? 
                iconPrivacy[dataEmployeeKomunikasiConnector.n_gsm.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeKomunikasiConnector.n_gsm ? 
                // iconPrivacy[dataEmployeeKomunikasiConnector.n_gsm.privacy] : iconPrivacy['public']}</span>
                ''
              )
            }
          </div>
          )}
        </div>
      </div>
    </Col> 
    <Col md="6" className='mb-4'>
      <span className='mb-4 fw-bold fs-4'>Nomor LinkAja</span>
      <div className="mb-2">
        <div className="mb-2">
          {dataEmployeeKomunikasiConnector.n_linkaja && ( ((userNik!=nik) && (dataEmployeeKomunikasiConnector.n_linkaja.privacy == "private")) || ((userNik!=nik) && (dataEmployeeKomunikasiConnector.n_linkaja.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeKomunikasiConnector.n_linkaja.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeKomunikasiConnector.n_linkaja.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeKomunikasiConnector.n_linkaja.kode_data}>
              Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeKomunikasiConnector.n_linkaja ? dataEmployeeKomunikasiConnector.n_linkaja.value : null}/>
            { dataEmployeeKomunikasiConnector.n_linkaja && (dataEmployeeKomunikasiConnector.n_linkaja.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeKomunikasiConnector.n_linkaja.kode_data,dataEmployeeKomunikasiConnector.n_linkaja.privacy)}>{dataEmployeeKomunikasiConnector.n_linkaja ? 
                iconPrivacy[dataEmployeeKomunikasiConnector.n_linkaja.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeKomunikasiConnector.n_linkaja ? 
                // iconPrivacy[dataEmployeeKomunikasiConnector.n_linkaja.privacy] : iconPrivacy['public']}</span>
                ''
              )
            }
          </div>
          )}
        </div>
      </div>
    </Col> 
    <Col md="6" className='mb-4'>
      <span className='mb-4 fw-bold fs-4'>Email Perusahaan</span>
      <div className="mb-2">
        <div className="mb-2">
          {dataEmployeeKomunikasiConnector.email_corporate && ( ((userNik!=nik) && (dataEmployeeKomunikasiConnector.email_corporate.privacy == "private")) || ((userNik!=nik) && (dataEmployeeKomunikasiConnector.email_corporate.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeKomunikasiConnector.email_corporate.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeKomunikasiConnector.email_corporate.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeKomunikasiConnector.email_corporate.kode_data}>
              Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeKomunikasiConnector.email_corporate ? dataEmployeeKomunikasiConnector.email_corporate.value : null}/>
            { dataEmployeeKomunikasiConnector.email_corporate && (dataEmployeeKomunikasiConnector.email_corporate.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeKomunikasiConnector.email_corporate.kode_data,dataEmployeeKomunikasiConnector.email_corporate.privacy)}>{dataEmployeeKomunikasiConnector.email_corporate ? 
                iconPrivacy[dataEmployeeKomunikasiConnector.email_corporate.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeKomunikasiConnector.email_corporate ? 
                // iconPrivacy[dataEmployeeKomunikasiConnector.email_corporate.privacy] : iconPrivacy['public']}</span>
                ''
              )
            }
          </div>
          )}
        </div>
      </div>
    </Col> 
    <Col md="6" className='mb-4'>
      <span className='mb-4 fw-bold fs-4'>Email Pribadi</span>
      <div className="mb-2">
        <div className="mb-2">
          {dataEmployeeKomunikasiConnector.email_pribadi && ( ((userNik!=nik) && (dataEmployeeKomunikasiConnector.email_pribadi.privacy == "private")) || ((userNik!=nik) && (dataEmployeeKomunikasiConnector.email_pribadi.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeKomunikasiConnector.email_pribadi.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeKomunikasiConnector.email_pribadi.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeKomunikasiConnector.email_pribadi.kode_data}>
              Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeKomunikasiConnector.email_pribadi ? dataEmployeeKomunikasiConnector.email_pribadi.value : null}/>
            { dataEmployeeKomunikasiConnector.email_pribadi && (dataEmployeeKomunikasiConnector.email_pribadi.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeKomunikasiConnector.email_pribadi.kode_data,dataEmployeeKomunikasiConnector.email_pribadi.privacy)}>{dataEmployeeKomunikasiConnector.email_pribadi ? 
                iconPrivacy[dataEmployeeKomunikasiConnector.email_pribadi.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeKomunikasiConnector.email_pribadi ? 
                // iconPrivacy[dataEmployeeKomunikasiConnector.email_pribadi.privacy] : iconPrivacy['public']}</span>
                ''
              )
            }
          </div>
          )}
        </div>
      </div>
    </Col> 
        </div>
      </CardBody>
    </Card>
    <ModalPrivacyCentra/>
    </>
  )
}

export default ProfileEmployeeKomunikasiData
