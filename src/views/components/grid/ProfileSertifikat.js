import React from 'react';
import PropTypes from 'prop-types';

export default function ProfileSertifikat(props) {
  const { border, className, children } = props;

  return (
    <div className={`grid grid-cols-[1fr,_13.5rem] border-${border} border-tertiary-300 last:border-0 py-3 first:pt-0 last:pb-0 ${className}`}>
      {children}
    </div>
  );
}

ProfileSertifikat.defaultProps = {
  border: "b-2",
  className: "",
};

ProfileSertifikat.propTypes = {
  border:PropTypes.string,
  className:PropTypes.string,
  children: PropTypes.node,
};
