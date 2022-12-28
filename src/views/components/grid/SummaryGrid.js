import React from 'react';
import PropTypes from 'prop-types';

export default function SummaryGrid(props) {
  const { backgroundColor, borderColor, border, children, className } = props;

  return (
    <div className={`d-grid bg-${backgroundColor} w-full border-${border} border-${borderColor}-300 ${className}`}>
      {children}
    </div>
  );
}

SummaryGrid.defaultProps = {
  backgroundColor: "transparent",
  border: "0",
  borderColor: "tertiary",
  className: "",
  children: null,
};

SummaryGrid.propTypes = {
  backgroundColor:PropTypes.string,
  border:PropTypes.string,
  borderColor:PropTypes.string,
  className:PropTypes.string,
  children:PropTypes.node,
};
