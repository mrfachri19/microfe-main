import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap'

export default function Tooltips(props) {
  const { children, className, id, tooltips } = props;

  return (
    <Fragment>
      <div className={className} id={id}>
        {children}
      </div>
      <UncontrolledTooltip placement='top' target={id}>
        {tooltips}
      </UncontrolledTooltip>
    </Fragment>
  );
}

Tooltips.defaultProps = {
  className: '',
  id: "UnControlledTooltips",
  tooltips: "tooltips"
};

Tooltips.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
  tooltips: PropTypes.string
};
