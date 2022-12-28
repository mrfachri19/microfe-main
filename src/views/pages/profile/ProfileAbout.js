// ** Reactstrap Imports
import { Card, CardBody, CardText, Input, Col, Button, UncontrolledTooltip, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

import React, { useEffect, useState, Fragment } from "react";

import { Earth16Filled, LockClosed16Filled, PeopleTeam16Filled, Person16Filled } from "@fluentui/react-icons";

import { getConnector } from "@src/api";

import {getUsernik} from "../../../utils/storage"
import { useDispatch, useSelector } from "react-redux";
import {toggleModalPrivacyCentra, storeModalPrivacyCentra } from '../../../redux/modalToggle';
import ModalPrivacyCentra from "@src/views/components/Modals/ModalPrivacyCentra";

const ProfileAbout = ({ nik, data }) => {
  const dispatch = useDispatch();
  const [dataEmployeeConnector, setDataEmployeeConnector] = useState([]);
  const [dataEmployeeKomunikasiConnector, setDataEmployeeKomunikasiConnector] = useState([]);
  const [iconPrivacy, setIconPrivacy] = useState({
    'public' : <Earth16Filled/>,
    'private' : <LockClosed16Filled/>,
    'team' : <PeopleTeam16Filled/>,
    'friend' : <Person16Filled/>
  });
  const { isModalPrivacyCentra } = useSelector((state) => state.modal);
  const userNik = getUsernik()
  function getEmployeeDatasConnector() {
    getConnector(
      `?vendor=centra&id=data-diri&nik=${nik}`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
      setDataEmployeeConnector(tempList);
       // console.log('data employee connector =>', res.data.data);
    });
  }
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
      getEmployeeDatasConnector();
      getEmployeeKomunikasiDatasConnector()
    }
  }, [isModalPrivacyCentra]);

  return (
    <>
    <Card>
      <CardBody>
        <h4 className='mb-4 fw-bold text-primary'>Biografi</h4>
        <CardText className='mb-12'>{data.bio}</CardText>

        <div className='row'>
          {/* <Col md="6" className='mb-4'>
            <span className='mb-4 fw-bold fs-4'>Nama</span>
            <div className="mb-2">
              <div className="mb-2">
               
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" value={dataEmployeeConnector.v_nama ? dataEmployeeConnector.v_nama.value : null}/>
                  
                </div>
              </div>
            </div>
          </Col>
          <Col md="6" className='mb-4'>
            <span className='mb-4 fw-bold fs-4'>NIK</span>
            <div className="mb-2">
              <div className="mb-2">
               
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" value={dataEmployeeConnector.n_nik ? dataEmployeeConnector.n_nik.value : null}/>
                  
                </div>
              </div>
            </div>
          </Col> */}
          <Col md="6" className='mb-4'>
            <span className='mb-4 fw-bold fs-4'>Perusahaan</span>
            <div className="mb-2">
              <div className="mb-2">
                {dataEmployeeConnector.v_company_home && ( ((userNik!=nik) && (dataEmployeeConnector.v_company_home.privacy == "private")) || ((userNik!=nik) && (dataEmployeeConnector.v_company_home.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeConnector.v_company_home.privacy == "friend") && (data.friendshipStatus == 2))) ? 
                (<>
                 <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
                  <a id={dataEmployeeConnector.v_company_home.kode_data}>
                    Disembunyikan
                  </a>
                  <UncontrolledTooltip placement='bottom' target={dataEmployeeConnector.v_company_home.kode_data}>
                    Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
                  </UncontrolledTooltip>
                  </div>
                  </>)
                : (
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" value={dataEmployeeConnector.v_company_home ? dataEmployeeConnector.v_company_home.value : null}/>
                  { dataEmployeeConnector.v_company_home && (dataEmployeeConnector.v_company_home.shareable == "options") && (userNik==nik) ? 
                    (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeConnector.v_company_home.kode_data,dataEmployeeConnector.v_company_home.privacy)}>{dataEmployeeConnector.v_company_home ? 
                      iconPrivacy[dataEmployeeConnector.v_company_home.privacy] : iconPrivacy['public']}</span>) : 
                    (
                      // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeConnector.v_company_home ? 
                      // iconPrivacy[dataEmployeeConnector.v_company_home.privacy] : iconPrivacy['public']}</span>
                      ''
                    )
                  }
                </div>
                )}
              </div>
            </div>
          </Col>
          <Col md="6" className='mb-4'>
          <span className='mb-4 fw-bold fs-4'>Jabatan</span>
          <div className="mb-2">
            <div className="mb-2">
              {dataEmployeeConnector.v_posisi && ( ((userNik!=nik) && (dataEmployeeConnector.v_posisi.privacy == "private")) || ((userNik!=nik) && (dataEmployeeConnector.v_posisi.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeConnector.v_posisi.privacy == "friend") && (data.friendshipStatus == 2))) ? 
              (<>
               <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
                <a id={dataEmployeeConnector.v_posisi.kode_data}>
                  Disembunyikan
                </a>
                <UncontrolledTooltip placement='bottom' target={dataEmployeeConnector.v_posisi.kode_data}>
                  Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
                </UncontrolledTooltip>
                </div>
                </>)
              : (
              <div className="mb-2 input-group">
                <Input type="text" className="form-control" value={dataEmployeeConnector.v_posisi ? dataEmployeeConnector.v_posisi.value : null}/>
                { dataEmployeeConnector.v_posisi && (dataEmployeeConnector.v_posisi.shareable == "options") && (userNik==nik) ? 
                  (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeConnector.v_posisi.kode_data,dataEmployeeConnector.v_posisi.privacy)}>{dataEmployeeConnector.v_posisi ? 
                    iconPrivacy[dataEmployeeConnector.v_posisi.privacy] : iconPrivacy['public']}</span>) : 
                  (
                    // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeConnector.v_posisi ? 
                    // iconPrivacy[dataEmployeeConnector.v_posisi.privacy] : iconPrivacy['public']}</span>
                    ''
                  )
                }
              </div>
              )}
            </div>
          </div>
        </Col>
        <Col md="6" className='mb-4'>
        <span className='mb-4 fw-bold fs-4'>Divisi</span>
        <div className="mb-2">
          <div className="mb-2">
            {dataEmployeeConnector.v_divisi && ( ((userNik!=nik) && (dataEmployeeConnector.v_divisi.privacy == "private")) || ((userNik!=nik) && (dataEmployeeConnector.v_divisi.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeConnector.v_divisi.privacy == "friend") && (data.friendshipStatus == 2))) ? 
            (<>
             <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
              <a id={dataEmployeeConnector.v_divisi.kode_data}>
                Disembunyikan
              </a>
              <UncontrolledTooltip placement='bottom' target={dataEmployeeConnector.v_divisi.kode_data}>
                Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
              </UncontrolledTooltip>
              </div>
              </>)
            : (
            <div className="mb-2 input-group">
              <Input type="text" className="form-control" value={dataEmployeeConnector.v_divisi ? dataEmployeeConnector.v_divisi.value : null}/>
              { dataEmployeeConnector.v_divisi && (dataEmployeeConnector.v_divisi.shareable == "options") && (userNik==nik) ? 
                (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeConnector.v_divisi.kode_data,dataEmployeeConnector.v_divisi.privacy)}>{dataEmployeeConnector.v_divisi ? 
                  iconPrivacy[dataEmployeeConnector.v_divisi.privacy] : iconPrivacy['public']}</span>) : 
                (
                  // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeConnector.v_divisi ? 
                  // iconPrivacy[dataEmployeeConnector.v_divisi.privacy] : iconPrivacy['public']}</span>
                  ''
                )
              }
            </div>
            )}
          </div>
        </div>
      </Col>
      <Col md="6" className='mb-4'>
      <span className='mb-4 fw-bold fs-4'>Kelahiran</span>
      <div className="mb-2">
        <div className="mb-2">
          {dataEmployeeConnector.v_kota_lahir && ( ((userNik!=nik) && (dataEmployeeConnector.v_kota_lahir.privacy == "private")) || ((userNik!=nik) && (dataEmployeeConnector.v_kota_lahir.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeConnector.v_kota_lahir.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeConnector.v_kota_lahir.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeConnector.v_kota_lahir.kode_data}>
              Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeConnector.v_kota_lahir ? (`${dataEmployeeConnector.v_kota_lahir.value}, ${dataEmployeeConnector.tgl_lahir.value}`) : null}/>
            { dataEmployeeConnector.v_kota_lahir && (dataEmployeeConnector.v_kota_lahir.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeConnector.v_kota_lahir.kode_data,dataEmployeeConnector.v_kota_lahir.privacy)}>{dataEmployeeConnector.v_kota_lahir ? 
                iconPrivacy[dataEmployeeConnector.v_kota_lahir.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeConnector.v_kota_lahir ? 
                // iconPrivacy[dataEmployeeConnector.v_kota_lahir.privacy] : iconPrivacy['public']}</span>
                ''
              )
            }
          </div>
          )}
        </div>
      </div>
    </Col>
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
              Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
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
        </div>
      </CardBody>
    </Card>
    <ModalPrivacyCentra/>
    </>
  )
}

export default ProfileAbout
