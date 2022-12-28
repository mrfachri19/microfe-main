import React from 'react';
import PropTypes from 'prop-types';

export default function Skeleton(props) {
  const { className } = props;

  return (
    <div className={"animate-pulse bg-tertiary-300 "+className}></div>
  );
}

Skeleton.defaultProps = {
  className: 'w-full h-full',
};

Skeleton.propTypes = {
  className: PropTypes.string,
};
