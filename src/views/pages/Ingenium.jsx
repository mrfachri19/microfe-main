import React, { Fragment,lazy } from "react";
// import KedinasanCard from "ingenium_container/KedinasanCard";
import { Col,Row } from "reactstrap";
import { getToken, getTokenAPIM } from "../../utils/storage";
import { loadModule } from "../../utils/remote-module";

const Application = lazy(() =>
    loadModule(
        'https://ingenium-container-tempsurvey.apps.osh.telkom.co.id/remoteEntry.js',
        'ingenium_container',
        './KedinasanCard',
    ),
);

export default function Ingenium() {
  const token = getToken();
  return (
    <Fragment>
      <Row>
        <Col>
           <Application token={token} pendidikan />
           <Application token={token} innovation /> 
        </Col>
      </Row>
    </Fragment>
  );
}

// export default Ingenium;
