import React from 'react';
import PropTypes from 'prop-types';

export default function ProfileFriend(props) {
  const { border, className, children } = props;

  return (
    <div className={`grid grid-cols-[4rem,_1fr,_13.5rem] border-${border} border-tertiary-300 last:border-0 py-4 first:pt-0 last:pb-0 ${className}`}>
      {children}
    </div>
  );
}

ProfileFriend.defaultProps = {
  border: "b-2",
  className: "",
};

ProfileFriend.propTypes = {
  border:PropTypes.string,
  className:PropTypes.string,
  children: PropTypes.node,
};
