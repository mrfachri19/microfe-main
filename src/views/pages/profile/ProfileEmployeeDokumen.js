// ** Reactstrap Imports
import { Card, CardBody, CardText, Input, Col, Button, UncontrolledTooltip, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

import React, { useEffect, useState, Fragment } from "react";

import { Earth16Filled, LockClosed16Filled, PeopleTeam16Filled, Person16Filled } from "@fluentui/react-icons";

import { getConnector } from "@src/api";

import {getUsernik} from "../../../utils/storage"
import { useDispatch, useSelector } from "react-redux";
import {toggleModalPrivacyCentra, storeModalPrivacyCentra } from '../../../redux/modalToggle';
import ModalPrivacyCentra from "@src/views/components/Modals/ModalPrivacyCentra";

const ProfileEmployeeDokumen = ({ nik, data }) => {
  const dispatch = useDispatch();
  const [dataEmployeeDokumenConnector, setDataEmployeeDokumenConnector] = useState([]);
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
      `?vendor=centra&id=dokumen-penting&nik=${nik}`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
      setDataEmployeeDokumenConnector(tempList);
       // console.log('data employee dokumen connector =>',res.data.data);
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
        <Col md="6" className='mb-4 d-none'>
      <span className='mb-4 fw-bold fs-4'>Kartu Keluarga</span>
      <div className="mb-2">
        <div className="mb-2">
          {dataEmployeeDokumenConnector.n_kk && ( ((userNik!=nik) && (dataEmployeeDokumenConnector.n_kk.privacy == "private")) || ((userNik!=nik) && (dataEmployeeDokumenConnector.n_kk.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeDokumenConnector.n_kk.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeDokumenConnector.n_kk.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeDokumenConnector.n_kk.kode_data}>
              Data ini disembunyikan oleh pengguna ({dataEmployeeDokumenConnector.v_company_home.privacy == "private" ? dataEmployeeDokumenConnector.v_company_home.privacy:dataEmployeeDokumenConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeDokumenConnector.n_kk ? dataEmployeeDokumenConnector.n_kk.value : null}/>
            { dataEmployeeDokumenConnector.n_kk && (dataEmployeeDokumenConnector.n_kk.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeDokumenConnector.n_kk.kode_data,dataEmployeeDokumenConnector.n_kk.privacy)}>{dataEmployeeDokumenConnector.n_kk ? 
                iconPrivacy[dataEmployeeDokumenConnector.n_kk.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeDokumenConnector.n_kk ? 
                // iconPrivacy[dataEmployeeDokumenConnector.n_kk.privacy] : iconPrivacy['public']}</span>
                ''
              )
            }
          </div>
          )}
        </div>
      </div>
    </Col> 
    <Col md="6" className='mb-4'>
      <span className='mb-4 fw-bold fs-4'>BPJS Kesehatan</span>
      <div className="mb-2">
        <div className="mb-2">
          {dataEmployeeDokumenConnector.n_bpjs_kes && ( ((userNik!=nik) && (dataEmployeeDokumenConnector.n_bpjs_kes.privacy == "private")) || ((userNik!=nik) && (dataEmployeeDokumenConnector.n_bpjs_kes.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeDokumenConnector.n_bpjs_kes.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeDokumenConnector.n_bpjs_kes.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeDokumenConnector.n_bpjs_kes.kode_data}>
              Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeDokumenConnector.n_bpjs_kes ? dataEmployeeDokumenConnector.n_bpjs_kes.value : null}/>
            { dataEmployeeDokumenConnector.n_bpjs_kes && (dataEmployeeDokumenConnector.n_bpjs_kes.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeDokumenConnector.n_bpjs_kes.kode_data,dataEmployeeDokumenConnector.n_bpjs_kes.privacy)}>{dataEmployeeDokumenConnector.n_bpjs_kes ? 
                iconPrivacy[dataEmployeeDokumenConnector.n_bpjs_kes.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeDokumenConnector.n_bpjs_kes ? 
                // iconPrivacy[dataEmployeeDokumenConnector.n_bpjs_kes.privacy] : iconPrivacy['public']}</span>
                ''
              )
            }
          </div>
          )}
        </div>
      </div>
    </Col> 
    <Col md="6" className='mb-4'>
      <span className='mb-4 fw-bold fs-4'>BPJS Ketenagakerjaan</span>
      <div className="mb-2">
        <div className="mb-2">
          {dataEmployeeDokumenConnector.n_bpjs_tk && ( ((userNik!=nik) && (dataEmployeeDokumenConnector.n_bpjs_tk.privacy == "private")) || ((userNik!=nik) && (dataEmployeeDokumenConnector.n_bpjs_tk.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeDokumenConnector.n_bpjs_tk.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeDokumenConnector.n_bpjs_tk.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeDokumenConnector.n_bpjs_tk.kode_data}>
              Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeDokumenConnector.n_bpjs_tk ? dataEmployeeDokumenConnector.n_bpjs_tk.value : null}/>
            { dataEmployeeDokumenConnector.n_bpjs_tk && (dataEmployeeDokumenConnector.n_bpjs_tk.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeDokumenConnector.n_bpjs_tk.kode_data,dataEmployeeDokumenConnector.n_bpjs_tk.privacy)}>{dataEmployeeDokumenConnector.n_bpjs_tk ? 
                iconPrivacy[dataEmployeeDokumenConnector.n_bpjs_tk.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeDokumenConnector.n_bpjs_tk ? 
                // iconPrivacy[dataEmployeeDokumenConnector.n_bpjs_tk.privacy] : iconPrivacy['public']}</span>
                ''
              )
            }
          </div>
          )}
        </div>
      </div>
    </Col> 
    <Col md="6" className='mb-4'>
      <span className='mb-4 fw-bold fs-4'>KTP</span>
      <div className="mb-2">
        <div className="mb-2">
          {dataEmployeeDokumenConnector.n_ktp && ( ((userNik!=nik) && (dataEmployeeDokumenConnector.n_ktp.privacy == "private")) || ((userNik!=nik) && (dataEmployeeDokumenConnector.n_ktp.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeDokumenConnector.n_ktp.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeDokumenConnector.n_ktp.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeDokumenConnector.n_ktp.kode_data}>
              Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeDokumenConnector.n_ktp ? dataEmployeeDokumenConnector.n_ktp.value : null}/>
            { dataEmployeeDokumenConnector.n_ktp && (dataEmployeeDokumenConnector.n_ktp.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeDokumenConnector.n_ktp.kode_data,dataEmployeeDokumenConnector.n_ktp.privacy)}>{dataEmployeeDokumenConnector.n_ktp ? 
                iconPrivacy[dataEmployeeDokumenConnector.n_ktp.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeDokumenConnector.n_ktp ? 
                // iconPrivacy[dataEmployeeDokumenConnector.n_ktp.privacy] : iconPrivacy['public']}</span>
                ''
              )
            }
          </div>
          )}
        </div>
      </div>
    </Col> 
    <Col md="6" className='mb-4'>
      <span className='mb-4 fw-bold fs-4'>NPWP</span>
      <div className="mb-2">
        <div className="mb-2">
          {dataEmployeeDokumenConnector.n_npwp && ( ((userNik!=nik) && (dataEmployeeDokumenConnector.n_npwp.privacy == "private")) || ((userNik!=nik) && (dataEmployeeDokumenConnector.n_npwp.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeDokumenConnector.n_npwp.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeDokumenConnector.n_npwp.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeDokumenConnector.n_npwp.kode_data}>
              Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeDokumenConnector.n_npwp ? dataEmployeeDokumenConnector.n_npwp.value : null}/>
            { dataEmployeeDokumenConnector.n_npwp && (dataEmployeeDokumenConnector.n_npwp.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeDokumenConnector.n_npwp.kode_data,dataEmployeeDokumenConnector.n_npwp.privacy)}>{dataEmployeeDokumenConnector.n_npwp ? 
                iconPrivacy[dataEmployeeDokumenConnector.n_npwp.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeDokumenConnector.n_npwp ? 
                // iconPrivacy[dataEmployeeDokumenConnector.n_npwp.privacy] : iconPrivacy['public']}</span>
                ''
              )
            }
          </div>
          )}
        </div>
      </div>
    </Col>
    <Col md="6" className='mb-4'>
      <span className='mb-4 fw-bold fs-4'>EFIN</span>
      <div className="mb-2">
        <div className="mb-2">
          {dataEmployeeDokumenConnector.n_efin && ( ((userNik!=nik) && (dataEmployeeDokumenConnector.n_efin.privacy == "private")) || ((userNik!=nik) && (dataEmployeeDokumenConnector.n_efin.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeDokumenConnector.n_efin.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeDokumenConnector.n_efin.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeDokumenConnector.n_efin.kode_data}>
              Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeDokumenConnector.n_efin ? dataEmployeeDokumenConnector.n_efin.value : null}/>
            { dataEmployeeDokumenConnector.n_efin && (dataEmployeeDokumenConnector.n_efin.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeDokumenConnector.n_efin.kode_data,dataEmployeeDokumenConnector.n_efin.privacy)}>{dataEmployeeDokumenConnector.n_efin ? 
                iconPrivacy[dataEmployeeDokumenConnector.n_efin.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeDokumenConnector.n_efin ? 
                // iconPrivacy[dataEmployeeDokumenConnector.n_efin.privacy] : iconPrivacy['public']}</span>
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

export default ProfileEmployeeDokumen
