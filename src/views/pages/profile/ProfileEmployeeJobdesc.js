// ** Reactstrap Imports
import { Card, CardBody, CardText, Input, Col, Button } from 'reactstrap'
//
import NoData from '@src/assets/img/404-page.svg'

import React, { useEffect, useState, Fragment } from "react";

import { Earth16Filled, PersonLock16Filled, CaretRight24Regular } from "@fluentui/react-icons";

import { getDJM } from "@src/api";

const ProfileEmployeeJobdesk = ({ nik }) => {
  const [listDJM, setData] = useState([]);
  function getDjmData() {

    getDJM(
      `?nik=${nik}`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
       // console.log("data employee djm => ", tempList);
      setData(tempList);
    });
  }
  useEffect(() => {
    getDjmData();
  }, []);

  return (
    <Card>
      <CardBody>
        <div className='row'>
          {!Array.isArray(listDJM) ? (
            <>
              <Col md="6">
                <span className='mb-4 fw-bold fs-4'>Nama unit</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="text" className="form-control" value={listDJM.UNIT_NAME} />
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <span className='mb-4 fw-bold fs-4'>Job Title</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="text" className="form-control" value={listDJM.JOB_TITLE} />
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <span className='mb-4 fw-bold fs-4'>Job Family</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="text" className="form-control" value={listDJM.JOB_FAMILY} />
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <span className='mb-4 fw-bold fs-4'>Editorial</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="text" className="form-control" value={listDJM.EDITORIAL} />
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <span className='mb-4 fw-bold fs-4'>Report To</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="text" className="form-control" value={listDJM.REPORT_TO} />
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col>
              {/* <Col md="6">
                <span className='mb-4 fw-bold fs-4'>Tanggal Lahir</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="text" className="form-control" value={listDJM.JOB_FAMILY}/>
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col> */}
              <Col md="12">
                <span className='mb-4 fw-bold fs-4'>Job Responsibilities</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="textarea" className="form-control" value={listDJM.JOB_RESPONSIBILITIES.length > 0 ? (
                        listDJM.JOB_RESPONSIBILITIES.map(list => (
                          - { list }
                        ))
                      ) : '-'} />
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <span className='mb-4 fw-bold fs-4'>Job Performance</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="text" className="form-control" value={listDJM.JOB_PERFORMANCE_INDICATORS.length > 0 ? (
                        listDJM.JOB_PERFORMANCE_INDICATORS.map(list => (
                          - { list }
                        ))
                      ) : '-'} />
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <span className='mb-4 fw-bold fs-4'>Job Authorities</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="text" className="form-control" value={listDJM.JOB_AUTHORITIES.length > 0 ? (
                        listDJM.JOB_AUTHORITIES.map(list => (
                          - { list }
                        ))
                      ) : '-'} />
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <span className='mb-4 fw-bold fs-4'>Job Requirement</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="text" className="form-control" value={listDJM.JOB_PREREQUISITE.length > 0 ? (
                        listDJM.JOB_PREREQUISITE.map(list => (
                          - { list }
                        ))
                      ) : '-'} />
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="6">
                <span className='mb-4 fw-bold fs-4'>Job Statement</span>
                <div className="mb-2">
                  <div className="mb-2">
                    <div className="mb-2 input-group">
                      <Input type="text" className="form-control" value={listDJM.MISSION_STATEMENT.length > 0 ? (
                        listDJM.MISSION_STATEMENT.map(list => (
                          - { list }
                        ))
                      ) : '-'} />
                      <span className="input-group-text bg-tertiary-50 text-primary cursor-pointer"><Earth16Filled /></span>
                    </div>
                  </div>
                </div>
              </Col>
              <Col md="12">&nbsp;</Col>
              <div>
                <span className='mb-4 fw-bold fs-4'>Value & Believes</span>
              </div>
              <Col md="12">&nbsp;</Col>
              <div>
                {listDJM.VALUES_BELIEFS.length > 0 ? (
                  listDJM.VALUES_BELIEFS.map(list => (
                    <>
                      <Button color='primary' size='sm'>{list.TEXT}</Button> &nbsp;
                    </>
                  ))
                ) : '-'}
              </div>
              <Col md="12">&nbsp;</Col>
              <div>
                <span className='mb-4 fw-bold fs-4'>Digital Leadership & Competencies</span>
              </div>
              <Col md="12">&nbsp;</Col>
              <div>
                {listDJM.COMPETENCY_PROPENSITY_GAUGE.length > 0 ? (
                  listDJM.COMPETENCY_PROPENSITY_GAUGE.map(list => (
                    <>
                      <Button color='primary' size='sm'>{list.TEXT}</Button> &nbsp;
                    </>
                  ))
                ) : '-'}
              </div>
              <Col md="12">&nbsp;</Col>
              <div>
                <span className='mb-4 fw-bold fs-4'>Technical Competencies & Key Element</span>
              </div>
              <Col md="12">&nbsp;</Col>
              <div>
                {listDJM.COMPETENCY_PROPENSITY_GAUGE.length > 0 ? (
                  listDJM.COMPETENCY_PROPENSITY_GAUGE.map(list => (
                    <>
                      <Button color='primary' size='sm'>{list.TEXT}</Button> &nbsp;
                    </>
                  ))
                ) : '-'}
              </div>
              <Col md="12">&nbsp;</Col>
              <div>
                <span className='mb-4 fw-bold fs-4'>Kontak Pengelola (Media Saran dan Perbaikan)</span>
                <p> Jika ada masukan berupa kritik / saran dapat menghubungi kontak atau mengisi feedback pada aplikasi ini.</p>
              </div>  </>
          ) : 
          <img alt="..." className="w-100 align-middle border-0" src={NoData} />
          }
        </div>
      </CardBody>
    </Card>
  )
}

export default ProfileEmployeeJobdesk
