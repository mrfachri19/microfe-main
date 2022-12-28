// ** Reactstrap Imports
import { Card, CardBody, CardText, Input, Col } from 'reactstrap'

import React, { useEffect, useState, Fragment, lazy } from "react";

import { Earth16Filled, PersonLock16Filled, CaretRight24Regular } from "@fluentui/react-icons";

import NoData from '@src/assets/img/404-page.svg'

import { getPWB } from '../../../api';

import { getToken, getTokenAPIM } from "../../../utils/storage";
import { loadModule } from "../../../utils/remote-module";

const Application = lazy(() =>
  loadModule(
    'https://ingenium-container-tempsurvey.apps.osh.telkom.co.id/remoteEntry.js',
    'ingenium_container',
    './KedinasanCard',
  ),
);

const ProfileEmployeeEducation = ({ nik }) => {
  const [listEducation, setEducation] = useState([]);
  const token = getToken();
  function getEducation() {

    // getPWB(
    //   `riwayat_pendidikan/${nik}`
    // ).then((res) => {
    //   var tempList = [];
    //   tempList = res.data.data;
    //    // console.log("data employee => ", tempList);
    //   setEducation(tempList);
    // });
  }
  useEffect(() => {
    getEducation();
  }, []);

  return (
    <Card>
      <CardBody>
        <div className='row list-profile-edu'>
          <Application token={token} pendidikan />
          {/* <Application token={token} innovation />
          <Application token={token} recognition />
          <Application token={token} specialAssignment={true} />
          <Application token={token} socialLeader={true} /> */}
        
          {/* <Application token={token} innovation /> */}
          {/* {listEducation.length > 0 ? (
            listEducation.map((item, index) => (
              <>
              <Col md="12" className='list-profile-edu-items mx-8 px-0' key={`profile-edu-${index}`}>
                <div className="">
                  <div>
                    <h5 className='mb-4 fw-bold text-gray-900'>{item.INSTITUSI}</h5>
                  </div>
                  <div className="mb-2 text-tertiary-600 fs-4">
                    {item.JURUSAN}
                  </div>
                  <div className="mb-2 text-tertiary-500 fs-4">
                    {item.TGL_SELESAI}
                  </div>
                </div>
              </Col>
              
              </>
            ))
          ) :
            <img alt="..." className="w-100 align-middle border-0" src={NoData} />
          } */}
        </div>
      </CardBody>
    </Card>
  )
}

export default ProfileEmployeeEducation
