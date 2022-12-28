import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody } from 'reactstrap';
// ** Icons Imports
import { PresenceBlockedRegular } from "@fluentui/react-icons";
  
export default function CardEmpty(props) {
  const { children, className, text } = props;
  
  return (
    <Fragment>
      <Card className={`card-empty ${className}`}>
        <CardBody className='empty-ilu'>
          <PresenceBlockedRegular className="fs-10 d-block mx-auto mb-2 text-tertiary-400" height="100%"/>
          <span className='fs-6 fw-bolder text-center text-tertiary-400'>{text}</span>
        </CardBody>
        {children}
      </Card>
    </Fragment>
  );
}
  
CardEmpty.defaultProps = {
  className: '',
  text: 'Tidak ada data'
};
  
CardEmpty.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  text: PropTypes.string
};
  