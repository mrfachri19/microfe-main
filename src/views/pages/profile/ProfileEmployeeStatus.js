// ** Reactstrap Imports
import { Card, CardBody, CardText, Input, Col } from 'reactstrap'

import React, { useEffect, useState, Fragment } from "react";

import { Earth16Filled, PersonLock16Filled, CaretRight24Regular } from "@fluentui/react-icons";

import { getEmployee } from "@src/api";

const ProfileEmployeeData = ({ nik }) => {
  const [listNewsfeed, setlistNewsfeed] = useState([]);
  function getNewsfeedHomeData() {

    getEmployee(
      `/${localStorage.getItem('nik')}`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
       // console.log("data employee => ", tempList);
      setlistNewsfeed(tempList);
    });
  }
  useEffect(() => {
    getNewsfeedHomeData();
  }, []);

  return (
    <Card>
      <CardBody>
        <span className='mb-4 fw-bold fs-4' color='primary'>Informasi Pribadi</span>
        {/* <CardText>{nik}</CardText> */}

        <div className='row'>
          <Col md="6">
            <span className='mb-4 fw-bold fs-4'>Tanggal Lahir</span>
            <div className="mb-2 input-group">
              <div className="mb-2 input-group">
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" />
                  <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                </div>
              </div>
            </div>
          </Col>
          <Col md="6">
            <span className='mb-4 fw-bold fs-4'>Kota Asal</span>
            <div className="mb-2 input-group">
              <div className="mb-2 input-group">
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" />
                  <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                </div>
              </div>
            </div>
          </Col>
          <Col md="12">
            <span className='mb-4 fw-bold fs-4'>Alamat Tinggal</span>
            <div className="mb-2 input-group">
              <div className="mb-2 input-group">
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" />
                  <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                </div>
              </div>
            </div>
          </Col>
          <Col md="6">
            <span className='mb-4 fw-bold fs-4'>Nomor Telepon</span>
            <div className="mb-2 input-group">
              <div className="mb-2 input-group">
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" />
                  <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                </div>
              </div>
            </div>
          </Col>
          <Col md="6">
            <span className='mb-4 fw-bold fs-4'>Email</span>
            <div className="mb-2 input-group">
              <div className="mb-2 input-group">
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" />
                  <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                </div>
              </div>
            </div>
          </Col>
        </div>
        <span className='mb-4 fw-bold fs-4' color='primary'>Informasi Dinas</span>
        {/* <CardText>{nik}</CardText> */}

        <div className='row'>
          <Col md="6">
            <span className='mb-4 fw-bold fs-4'>Posisi</span>
            <div className="mb-2 input-group">
              <div className="mb-2 input-group">
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" />
                  <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                </div>
              </div>
            </div>
          </Col>
          <Col md="6">
            <span className='mb-4 fw-bold fs-4'>Band Posisi</span>
            <div className="mb-2 input-group">
              <div className="mb-2 input-group">
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" />
                  <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                </div>
              </div>
            </div>
          </Col>
          <Col md="6">
            <span className='mb-4 fw-bold fs-4'>Unit</span>
            <div className="mb-2 input-group">
              <div className="mb-2 input-group">
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" />
                  <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                </div>
              </div>
            </div>
          </Col>
          <Col md="6">
            <span className='mb-4 fw-bold fs-4'>Divisi</span>
            <div className="mb-2 input-group">
              <div className="mb-2 input-group">
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" />
                  <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                </div>
              </div>
            </div>
          </Col>
          <Col md="6">
            <span className='mb-4 fw-bold fs-4'>Perusahaan</span>
            <div className="mb-2 input-group">
              <div className="mb-2 input-group">
                <div className="mb-2 input-group">
                  <Input type="text" className="form-control" />
                  <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                </div>
              </div>
            </div>
          </Col>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProfileEmployeeData
