// ** Reactstrap Imports
import { Card, CardBody, CardText, Input, Col } from 'reactstrap'

import React, { useEffect, useState, Fragment, lazy } from "react";

import { Earth16Filled, PersonLock16Filled, CaretRight24Regular } from "@fluentui/react-icons";

import { getEmployee } from "@src/api";
import { getToken, getTokenAPIM } from "../../../utils/storage";
import { loadModule } from "../../../utils/remote-module";

const Application = lazy(() =>
  loadModule(
    'https://ingenium-container-tempsurvey.apps.osh.telkom.co.id/remoteEntry.js',
    'ingenium_container',
    './KedinasanCard',
  ),
);

const ProfileEmployeeData = ({ nik }) => {
  const [listNewsfeed, setlistNewsfeed] = useState([]);
  const token = getToken();
  function getNewsfeedHomeData() {

    // getEmployee(
    //   `/${localStorage.getItem('nik')}`
    // ).then((res) => {
    //   var tempList = [];
    //   tempList = res.data.data;
    //    // console.log("data employee => ", tempList);
    //   setlistNewsfeed(tempList);
    // });
  }
  useEffect(() => {
    getNewsfeedHomeData();
  }, []);

  return (
    <Card>
      <CardBody>
      <Application token={token} recognition />
      </CardBody>
    </Card>
  )
}

export default ProfileEmployeeData
