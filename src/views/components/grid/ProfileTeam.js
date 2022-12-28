import React from 'react';
import PropTypes from 'prop-types';

export default function ProfileTeam(props) {
  const { border, className, children, onClick } = props;

  return (
    <div className={`grid grid-cols-[4rem,_1fr,_10.5rem] 2xl:grid-cols-[4rem,_1fr,_13.5rem] border-${border} border-tertiary-300 last:border-0 py-4 ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

ProfileTeam.defaultProps = {
  border: "b-2",
  className: "",
  onClick: () => {},
};

ProfileTeam.propTypes = {
  border:PropTypes.string,
  className:PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};
