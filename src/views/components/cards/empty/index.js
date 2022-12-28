import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardTitle, CardBody, Button } from 'reactstrap';
// ** Icons Imports
import { PresenceBlockedRegular } from "@fluentui/react-icons";
  
export default function CardEmpty(props) {
  const { action, actionLabel, actionOnclik, cardTitle, children, className, text } = props;
  
  return (
    <Fragment>
      <Card className={className}>
        {cardTitle ? 
        <CardHeader className="pb-1">
          <CardTitle tag="h4">{cardTitle}</CardTitle>
        </CardHeader>:
        <></>
        }
        <CardBody className='card-empty'>
          <div className='empty-ilu'>
            <PresenceBlockedRegular className="fs-10 d-block mx-auto mb-2 text-tertiary-400" height="100%"/>
            <span className='fs-6 fw-bolder text-center text-tertiary-400 mb-7 d-block'>{text}</span>
            {action ? 
            <Button className="d-flex mx-auto" onClick={actionOnclik} color="primary" size='sm'>{actionLabel}</Button>:
            <></>
            }
          </div>
        </CardBody>
        {children}
      </Card>
    </Fragment>
  );
}
  
CardEmpty.defaultProps = {
  action: false,
  actionLabel: '',
  actionOnclik: () => {},
  cardTitle: '',
  className: '',
  text: 'Tidak ada data',
};
  
CardEmpty.propTypes = {
  action: PropTypes.bool,
  actionLabel: PropTypes.string,
  actionOnclik: PropTypes.func,
  cardTitle: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  text: PropTypes.string
};
  