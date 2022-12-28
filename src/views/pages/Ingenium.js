import React, { Fragment, lazy } from "react";
// import avatar from "ingenium_container/Avatar";
import { Col, Row } from "reactstrap";
import { getToken, getTokenAPIM } from "../../utils/storage";
import {loadModule} from "../../utils/remote-module";
const TestLoad = lazy(() => {
  loadModule(
    "https://ingenium-container-tempsurvey.apps.osh.telkom.co.id/remoteEntry.js",
    "ingenium_container",
    "./KedinasanCard"
  );
});

function Ingenium() {
  const token = getToken();
  return (
    <Fragment>
      <Row>
        <Col>
          <TestLoad token={token} pendidikan />
        </Col>
      </Row>
    </Fragment>
  );
}

export default Ingenium;
