// ** Reactstrap Imports
import { Card, CardBody, CardText, Input, Col } from 'reactstrap'

import React, { useEffect, useState, Fragment } from "react";

import NoData from '@src/assets/img/404-page.svg'

import { Earth16Filled, PersonLock16Filled, CaretRight24Regular } from "@fluentui/react-icons";

import { getPWB } from "@src/api";

const ProfileEmployeeFamily = ({ nik }) => {
  const [ortu, setOrtu] = useState([]);
  const [pasangan, setPasangan] = useState([]);
  const [anak, setAnak] = useState([]);
  function getEmployeeFamily() {
    getPWB(
      `orang_tua/${nik}`
    ).then((res) => {
      let tempList = [];
      tempList = res.data.data;
       // console.log("data employee ortu => ", tempList);
      setOrtu(tempList);
    });
    getPWB(
      `anak/${nik}`
    ).then((res) => {
      let tempList = [];
      tempList = res.data.data;
       // console.log("data employee anak => ", tempList);
      setAnak(tempList);
    });
    getPWB(
      `pasangan/${nik}`
    ).then((res) => {
      let tempList = [];
      tempList = res.data.data;
       // console.log("data employee pasangan => ", tempList);
      setPasangan(tempList);
    });
  }
  useEffect(() => {
    getEmployeeFamily();
  }, []);

  return (
    <Card>
      <CardBody>
        {!Array.isArray(ortu) ? (
          <>
            <h4 className='mb-4 fw-bold text-primary'>Orang Tua</h4>
            <div className='row'>
              <Col md="6">
                <span className='mb-4 fw-bold fs-4'>Nama Ayah Kandung</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="text" className="form-control" value={ortu['dataOrangTua'][0]['NAMA']} />
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <span className='mb-4 fw-bold fs-4'>Kota Asal</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="text" className="form-control" value={ortu['dataOrangTua'][0]['TEMPATLAHIR']} />
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <span className='mb-4 fw-bold fs-4'>Tanggal Lahir</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="text" className="form-control" value={ortu['dataOrangTua'][0]['TGLLAHIR']} />
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6"></Col>
              <Col md="12">&nbsp;</Col>
              <Col md="6">
                <span className='mb-4 fw-bold fs-4'>Nama Ibu Kandung</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="text" className="form-control" value={ortu['dataOrangTua'][1]['NAMA']} />
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <span className='mb-4 fw-bold fs-4'>Kota Asal</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="text" className="form-control" value={ortu['dataOrangTua'][1]['TEMPATLAHIR']} />
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <span className='mb-4 fw-bold fs-4'>Tanggal Lahir</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="text" className="form-control" value={ortu['dataOrangTua'][1]['TGLLAHIR']} />
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col>

            </div>
          </>
        ) :
          <img alt="..." className="w-100 align-middle border-0" src={NoData} />
        }
        <Col md="12">&nbsp;</Col>
        {!Array.isArray(pasangan) ? (
          <>
            <h4 className='mb-4 fw-bold text-primary'>Pasangan</h4>

            {pasangan['dataPasangan'].map(item => (
              <div className='row'>
                <Col md="6">
                  <span className='mb-4 fw-bold fs-4'>Nama Lengkap</span>
                  <div className="mb-2">
                    <div className="mb-2">
                      <div className="mb-2 input-group">
                        <Input type="text" className="form-control" value={item.V_NAMA_FAMILY} />
                        <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <span className='mb-4 fw-bold fs-4'>Tanggal Lahir</span>
                  <div className="mb-2">
                    <div className="mb-2">
                      <div className="mb-2 input-group">
                        <Input type="text" className="form-control" value={item.D_TGL_LAHIR} />
                        <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md="6">
                  <span className='mb-4 fw-bold fs-4'>Pernikahan</span>
                  <div className="mb-2">
                    <div className="mb-2">
                      <div className="mb-2 input-group">
                        <Input type="text" className="form-control" value={item.D_TGL_NIKAH} />
                        <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                      </div>
                    </div>
                  </div>
                </Col>
              </div>
            ))

            }

          </>
        ) : null}
        <Col md="12">&nbsp;</Col>
        {!Array.isArray(anak) ? (
          <>
            <h4 className='mb-4 fw-bold text-primary'>Anak</h4>
            <div className='row'>
              {anak['dataAnak'].map(item => (
                <>
                  <Col md="6">
                    <span className='mb-4 fw-bold fs-4'>Nama Lengkap</span>
                    <div className="mb-2">
                      <div className="mb-2">
                        <div className="mb-2 input-group">
                          <Input type="text" className="form-control" value={item.NAMA} />
                          <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <span className='mb-4 fw-bold fs-4'>Tanggal Lahir</span>
                    <div className="mb-2">
                      <div className="mb-2">
                        <div className="mb-2 input-group">
                          <Input type="text" className="form-control" value={item.TGL_LAHIR} />
                          <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <span className='mb-4 fw-bold fs-4'>Jenis Kelamin</span>
                    <div className="mb-2">
                      <div className="mb-2">
                        <div className="mb-2 input-group">
                          <Input type="text" className="form-control" value={item.SEX} />
                          <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <span className='mb-4 fw-bold fs-4'>Nikes</span>
                    <div className="mb-2">
                      <div className="mb-2">
                        <div className="mb-2 input-group">
                          <Input type="text" className="form-control" value={item.NIKES} />
                          <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="6">
                    <span className='mb-4 fw-bold fs-4'>Tunjangan Kesehatan</span>
                    <div className="mb-2">
                      <div className="mb-2">
                        <div className="mb-2 input-group">
                          <Input type="text" className="form-control" value={item.STATUS_TANGGUNGAN} />
                          <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="6"></Col>
                  <Col md="12">&nbsp;</Col>
                </>
              ))}
            </div>
          </>
        ) :
          null
        }
      </CardBody>
    </Card>
  )
}

export default ProfileEmployeeFamily
