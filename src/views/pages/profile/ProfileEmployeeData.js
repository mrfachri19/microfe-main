// ** Reactstrap Imports
import { Card, CardBody, CardText, Input, Col, Button, UncontrolledTooltip, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

import React, { useEffect, useState, Fragment } from "react";

import { Earth16Filled, LockClosed16Filled, PeopleTeam16Filled, Person16Filled } from "@fluentui/react-icons";

import { getConnector } from "@src/api";

import {getUsernik} from "../../../utils/storage"
import { useDispatch, useSelector } from "react-redux";
import {toggleModalPrivacyCentra, storeModalPrivacyCentra } from '../../../redux/modalToggle';
import ModalPrivacyCentra from "@src/views/components/Modals/ModalPrivacyCentra";

const ProfileEmployeeData = ({ nik, data }) => {
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
    }
  }, [isModalPrivacyCentra]);

  return (
    <>
    <Card>
      <CardBody>
        <h4 className='mb-4 fw-bold text-primary'>Informasi Pribadi</h4>
        {/* <CardText>{nik}</CardText> */}

        <div className='row'>
          <Col md="6" className='mb-4'>
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
          </Col>
          <Col md="6" className='mb-4'>
            <span className='mb-4 fw-bold fs-4'>Jenis Kelamin</span>
            <div className="mb-2">
              <div className="mb-2">
                {dataEmployeeConnector.v_jenis_kelamin && ( ((userNik!=nik) && (dataEmployeeConnector.v_jenis_kelamin.privacy == "private")) || ((userNik!=nik) && (dataEmployeeConnector.v_jenis_kelamin.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeConnector.v_jenis_kelamin.privacy == "friend") && (data.friendshipStatus == 2))) ? 
                (<>
                 <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
                  <a id={dataEmployeeConnector.v_jenis_kelamin.kode_data}>
                    Disembunyikan
                  </a>
                  <UncontrolledTooltip placement='bottom' target={dataEmployeeConnector.v_jenis_kelamin.kode_data}>
                    Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
                  </UncontrolledTooltip>
                  </div>
                  </>)
                : (
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" value={dataEmployeeConnector.v_jenis_kelamin ? dataEmployeeConnector.v_jenis_kelamin.value : null}/>
                  { dataEmployeeConnector.v_jenis_kelamin && (dataEmployeeConnector.v_jenis_kelamin.shareable == "options") && (userNik==nik) ? 
                    (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeConnector.v_jenis_kelamin.kode_data,dataEmployeeConnector.v_jenis_kelamin.privacy)}>{dataEmployeeConnector.v_jenis_kelamin ? 
                      iconPrivacy[dataEmployeeConnector.v_jenis_kelamin.privacy] : iconPrivacy['public']}</span>) : 
                    (
                      // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeConnector.v_jenis_kelamin ? 
                      // iconPrivacy[dataEmployeeConnector.v_jenis_kelamin.privacy] : iconPrivacy['public']}</span>
                      ''
                    )
                  }
                </div>
                )}
              </div>
            </div>
          </Col>
          <Col md="6" className='mb-4'>
            <span className='mb-4 fw-bold fs-4'>Agama</span>
            <div className="mb-2">
              <div className="mb-2">
                {dataEmployeeConnector.v_agama && ( ((userNik!=nik) && (dataEmployeeConnector.v_agama.privacy == "private")) || ((userNik!=nik) && (dataEmployeeConnector.v_agama.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeConnector.v_agama.privacy == "friend") && (data.friendshipStatus == 2))) ? 
                (<>
                 <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
                  <a id={dataEmployeeConnector.v_agama.kode_data}>
                    Disembunyikan
                  </a>
                  <UncontrolledTooltip placement='bottom' target={dataEmployeeConnector.v_agama.kode_data}>
                    Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
                  </UncontrolledTooltip>
                  </div>
                  </>)
                : (
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" value={dataEmployeeConnector.v_agama ? dataEmployeeConnector.v_agama.value : null}/>
                  { dataEmployeeConnector.v_agama && (dataEmployeeConnector.v_agama.shareable == "options") && (userNik==nik) ? 
                    (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeConnector.v_agama.kode_data,dataEmployeeConnector.v_agama.privacy)}>{dataEmployeeConnector.v_agama ? 
                      iconPrivacy[dataEmployeeConnector.v_agama.privacy] : iconPrivacy['public']}</span>) : 
                    (
                      // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeConnector.v_agama ? 
                      // iconPrivacy[dataEmployeeConnector.v_agama.privacy] : iconPrivacy['public']}</span>
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
            <span className='mb-4 fw-bold fs-4'>Status Karyawan</span>
            <div className="mb-2">
              <div className="mb-2">
                {dataEmployeeConnector.v_status_karyawan && ( ((userNik!=nik) && (dataEmployeeConnector.v_status_karyawan.privacy == "private")) || ((userNik!=nik) && (dataEmployeeConnector.v_status_karyawan.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeConnector.v_status_karyawan.privacy == "friend") && (data.friendshipStatus == 2))) ? 
                (<>
                 <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
                  <a id={dataEmployeeConnector.v_status_karyawan.kode_data}>
                    Disembunyikan
                  </a>
                  <UncontrolledTooltip placement='bottom' target={dataEmployeeConnector.v_status_karyawan.kode_data}>
                    Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
                  </UncontrolledTooltip>
                  </div>
                  </>)
                : (
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" value={dataEmployeeConnector.v_status_karyawan ? dataEmployeeConnector.v_status_karyawan.value : null}/>
                  { dataEmployeeConnector.v_status_karyawan && (dataEmployeeConnector.v_status_karyawan.shareable == "options") && (userNik==nik) ? 
                    (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeConnector.v_status_karyawan.kode_data,dataEmployeeConnector.v_status_karyawan.privacy)}>{dataEmployeeConnector.v_status_karyawan ? 
                      iconPrivacy[dataEmployeeConnector.v_status_karyawan.privacy] : iconPrivacy['public']}</span>) : 
                    (
                      // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeConnector.v_status_karyawan ? 
                      // iconPrivacy[dataEmployeeConnector.v_status_karyawan.privacy] : iconPrivacy['public']}</span>
                      ''
                    )
                  }
                </div>
                )}
              </div>
            </div>
          </Col>
          <Col md="6" className='mb-4'>
            <span className='mb-4 fw-bold fs-4'>Loker</span>
            <div className="mb-2">
              <div className="mb-2">
                {dataEmployeeConnector.v_lokasi_kerja && ( ((userNik!=nik) && (dataEmployeeConnector.v_lokasi_kerja.privacy == "private")) || ((userNik!=nik) && (dataEmployeeConnector.v_lokasi_kerja.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeConnector.v_lokasi_kerja.privacy == "friend") && (data.friendshipStatus == 2))) ? 
                (<>
                 <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
                  <a id={dataEmployeeConnector.v_lokasi_kerja.kode_data}>
                    Disembunyikan
                  </a>
                  <UncontrolledTooltip placement='bottom' target={dataEmployeeConnector.v_lokasi_kerja.kode_data}>
                    Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
                  </UncontrolledTooltip>
                  </div>
                  </>)
                : (
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" value={dataEmployeeConnector.v_lokasi_kerja ? dataEmployeeConnector.v_lokasi_kerja.value : null}/>
                  { dataEmployeeConnector.v_lokasi_kerja && (dataEmployeeConnector.v_lokasi_kerja.shareable == "options") && (userNik==nik) ? 
                    (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeConnector.v_lokasi_kerja.kode_data,dataEmployeeConnector.v_lokasi_kerja.privacy)}>{dataEmployeeConnector.v_lokasi_kerja ? 
                      iconPrivacy[dataEmployeeConnector.v_lokasi_kerja.privacy] : iconPrivacy['public']}</span>) : 
                    (
                      // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeConnector.v_lokasi_kerja ? 
                      // iconPrivacy[dataEmployeeConnector.v_lokasi_kerja.privacy] : iconPrivacy['public']}</span>
                      ''
                    )
                  }
                </div>
                )}
              </div>
            </div>
          </Col>
          <Col md="6" className='mb-4 d-none'>
            <span className='mb-4 fw-bold fs-4'>Tanggal Loker</span>
            <div className="mb-2">
              <div className="mb-2">
                {dataEmployeeConnector.v_tgl_kerja && ( ((userNik!=nik) && (dataEmployeeConnector.v_tgl_kerja.privacy == "private")) || ((userNik!=nik) && (dataEmployeeConnector.v_tgl_kerja.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeConnector.v_tgl_kerja.privacy == "friend") && (data.friendshipStatus == 2))) ? 
                (<>
                 <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
                  <a id={dataEmployeeConnector.v_tgl_kerja.kode_data}>
                    Disembunyikan
                  </a>
                  <UncontrolledTooltip placement='bottom' target={dataEmployeeConnector.v_tgl_kerja.kode_data}>
                    Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
                  </UncontrolledTooltip>
                  </div>
                  </>)
                : (
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" value={dataEmployeeConnector.v_tgl_kerja ? dataEmployeeConnector.v_tgl_kerja.value : null}/>
                  { dataEmployeeConnector.v_tgl_kerja && (dataEmployeeConnector.v_tgl_kerja.shareable == "options") && (userNik==nik) ? 
                    (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeConnector.v_tgl_kerja.kode_data,dataEmployeeConnector.v_tgl_kerja.privacy)}>{dataEmployeeConnector.v_tgl_kerja ? 
                      iconPrivacy[dataEmployeeConnector.v_tgl_kerja.privacy] : iconPrivacy['public']}</span>) : 
                    (
                      // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeConnector.v_tgl_kerja ? 
                      // iconPrivacy[dataEmployeeConnector.v_tgl_kerja.privacy] : iconPrivacy['public']}</span>
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
            <span className='mb-4 fw-bold fs-4'>Unit</span>
            <div className="mb-2">
              <div className="mb-2">
                {dataEmployeeConnector.v_unit && ( ((userNik!=nik) && (dataEmployeeConnector.v_unit.privacy == "private")) || ((userNik!=nik) && (dataEmployeeConnector.v_unit.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeConnector.v_unit.privacy == "friend") && (data.friendshipStatus == 2))) ? 
                (<>
                 <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
                  <a id={dataEmployeeConnector.v_unit.kode_data}>
                    Disembunyikan
                  </a>
                  <UncontrolledTooltip placement='bottom' target={dataEmployeeConnector.v_unit.kode_data}>
                    Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
                  </UncontrolledTooltip>
                  </div>
                  </>)
                : (
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" value={dataEmployeeConnector.v_unit ? dataEmployeeConnector.v_unit.value : null}/>
                  { dataEmployeeConnector.v_unit && (dataEmployeeConnector.v_unit.shareable == "options") && (userNik==nik) ? 
                    (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeConnector.v_unit.kode_data,dataEmployeeConnector.v_unit.privacy)}>{dataEmployeeConnector.v_unit ? 
                      iconPrivacy[dataEmployeeConnector.v_unit.privacy] : iconPrivacy['public']}</span>) : 
                    (
                      // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeConnector.v_unit ? 
                      // iconPrivacy[dataEmployeeConnector.v_unit.privacy] : iconPrivacy['public']}</span>
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
            <span className='mb-4 fw-bold fs-4'>Band Host</span>
            <div className="mb-2">
              <div className="mb-2">
                {dataEmployeeConnector.v_band_host && ( ((userNik!=nik) && (dataEmployeeConnector.v_band_host.privacy == "private")) || ((userNik!=nik) && (dataEmployeeConnector.v_band_host.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeConnector.v_band_host.privacy == "friend") && (data.friendshipStatus == 2))) ? 
                (<>
                 <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
                  <a id={dataEmployeeConnector.v_band_host.kode_data}>
                    Disembunyikan
                  </a>
                  <UncontrolledTooltip placement='bottom' target={dataEmployeeConnector.v_band_host.kode_data}>
                    Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
                  </UncontrolledTooltip>
                  </div>
                  </>)
                : (
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" value={dataEmployeeConnector.v_band_host ? dataEmployeeConnector.v_band_host.value : null}/>
                  { dataEmployeeConnector.v_band_host && (dataEmployeeConnector.v_band_host.shareable == "options") && (userNik==nik) ? 
                    (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeConnector.v_band_host.kode_data,dataEmployeeConnector.v_band_host.privacy)}>{dataEmployeeConnector.v_band_host ? 
                      iconPrivacy[dataEmployeeConnector.v_band_host.privacy] : iconPrivacy['public']}</span>) : 
                    (
                      // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeConnector.v_band_host ? 
                      // iconPrivacy[dataEmployeeConnector.v_band_host.privacy] : iconPrivacy['public']}</span>
                      ''
                    )
                  }
                </div>
                )}
              </div>
            </div>
          </Col>
          <Col md="6" className='mb-4 d-none'>
            <span className='mb-4 fw-bold fs-4'>Band Home</span>
            <div className="mb-2">
              <div className="mb-2">
                {dataEmployeeConnector.v_band_home && ( ((userNik!=nik) && (dataEmployeeConnector.v_band_home.privacy == "private")) || ((userNik!=nik) && (dataEmployeeConnector.v_band_home.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeConnector.v_band_home.privacy == "friend") && (data.friendshipStatus == 2))) ? 
                (<>
                 <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
                  <a id={dataEmployeeConnector.v_band_home.kode_data}>
                    Disembunyikan
                  </a>
                  <UncontrolledTooltip placement='bottom' target={dataEmployeeConnector.v_band_home.kode_data}>
                    Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
                  </UncontrolledTooltip>
                  </div>
                  </>)
                : (
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" value={dataEmployeeConnector.v_band_home ? dataEmployeeConnector.v_band_home.value : null}/>
                  { dataEmployeeConnector.v_band_home && (dataEmployeeConnector.v_band_home.shareable == "options") && (userNik==nik) ? 
                    (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeConnector.v_band_home.kode_data,dataEmployeeConnector.v_band_home.privacy)}>{dataEmployeeConnector.v_band_home ? 
                      iconPrivacy[dataEmployeeConnector.v_band_home.privacy] : iconPrivacy['public']}</span>) : 
                    (
                      // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeConnector.v_band_home ? 
                      // iconPrivacy[dataEmployeeConnector.v_band_home.privacy] : iconPrivacy['public']}</span>
                      ''
                    )
                  }
                </div>
                )}
              </div>
            </div>
          </Col>
          <Col md="6" className='mb-4'>
            <span className='mb-4 fw-bold fs-4'>Atasan</span>
            <div className="mb-2">
              <div className="mb-2">
               
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" value={dataEmployeeConnector.n_nik_lead ? `${dataEmployeeConnector.v_name_lead.value} | ${dataEmployeeConnector.n_nik_lead.value}` : null}/>
                </div>
              </div>
            </div>
          </Col>
          <Col md="6" className='mb-4'>
            <span className='mb-4 fw-bold fs-4'>Jabatan Atasan</span>
            <div className="mb-2">
              <div className="mb-2">
               
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" value={dataEmployeeConnector.v_posisi_lead ? dataEmployeeConnector.v_posisi_lead.value : null}/>
                  
                </div>
              </div>
            </div>
          </Col>
          <Col md="6" className='mb-4'>
            <span className='mb-4 fw-bold fs-4'>Alamat Kantor</span>
            <div className="mb-2">
              <div className="mb-2">
                {dataEmployeeConnector.v_alamat_kantor && ( ((userNik!=nik) && (dataEmployeeConnector.v_alamat_kantor.privacy == "private")) || ((userNik!=nik) && (dataEmployeeConnector.v_alamat_kantor.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeConnector.v_alamat_kantor.privacy == "friend") && (data.friendshipStatus == 2))) ? 
                (<>
                 <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
                  <a id={dataEmployeeConnector.v_alamat_kantor.kode_data}>
                    Disembunyikan
                  </a>
                  <UncontrolledTooltip placement='bottom' target={dataEmployeeConnector.v_alamat_kantor.kode_data}>
                    Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
                  </UncontrolledTooltip>
                  </div>
                  </>)
                : (
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" value={dataEmployeeConnector.v_alamat_kantor ? dataEmployeeConnector.v_alamat_kantor.value : null}/>
                  { dataEmployeeConnector.v_alamat_kantor && (dataEmployeeConnector.v_alamat_kantor.shareable == "options") && (userNik==nik) ? 
                    (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeConnector.v_alamat_kantor.kode_data,dataEmployeeConnector.v_alamat_kantor.privacy)}>{dataEmployeeConnector.v_alamat_kantor ? 
                      iconPrivacy[dataEmployeeConnector.v_alamat_kantor.privacy] : iconPrivacy['public']}</span>) : 
                    (
                      // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeConnector.v_alamat_kantor ? 
                      // iconPrivacy[dataEmployeeConnector.v_alamat_kantor.privacy] : iconPrivacy['public']}</span>
                      ''
                    )
                  }
                </div>
                )}
              </div>
            </div>
          </Col>
          <Col md="6" className='mb-4'>
            <span className='mb-4 fw-bold fs-4'>Alamat Rumah</span>
            <div className="mb-2">
              <div className="mb-2">
                {dataEmployeeConnector.v_alamat_rumah && ( ((userNik!=nik) && (dataEmployeeConnector.v_alamat_rumah.privacy == "private")) || ((userNik!=nik) && (dataEmployeeConnector.v_alamat_rumah.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeConnector.v_alamat_rumah.privacy == "friend") && (data.friendshipStatus == 2))) ? 
                (<>
                 <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
                  <a id={dataEmployeeConnector.v_alamat_rumah.kode_data}>
                    Disembunyikan
                  </a>
                  <UncontrolledTooltip placement='bottom' target={dataEmployeeConnector.v_alamat_rumah.kode_data}>
                    Data ini disembunyikan oleh pengguna ({dataEmployeeConnector.v_company_home.privacy == "private" ? dataEmployeeConnector.v_company_home.privacy:dataEmployeeConnector.v_company_home.privacy+" Only"})
                  </UncontrolledTooltip>
                  </div>
                  </>)
                : (
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" value={dataEmployeeConnector.v_alamat_rumah ? dataEmployeeConnector.v_alamat_rumah.value : null}/>
                  { dataEmployeeConnector.v_alamat_rumah && (dataEmployeeConnector.v_alamat_rumah.shareable == "options") && (userNik==nik) ? 
                    (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeConnector.v_alamat_rumah.kode_data,dataEmployeeConnector.v_alamat_rumah.privacy)}>{dataEmployeeConnector.v_alamat_rumah ? 
                      iconPrivacy[dataEmployeeConnector.v_alamat_rumah.privacy] : iconPrivacy['public']}</span>) : 
                    (
                      // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeConnector.v_alamat_rumah ? 
                      // iconPrivacy[dataEmployeeConnector.v_alamat_rumah.privacy] : iconPrivacy['public']}</span>
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

export default ProfileEmployeeData
