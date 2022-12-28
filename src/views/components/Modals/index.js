import React from 'react';
import PropTypes from 'prop-types';

export default function Modal(props) {
  const { children, className, closeModal } = props;

  return (
    <>
        <div className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ${className}`}  onClick={closeModal}>
            {children}
        </div>
        <div className="opacity-60 fixed inset-0 z-40 bg-neutral-900"></div>
    </>
  );
}

Modal.defaultProps = {
  className: '',
  closeModal: () => {},
};

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  closeModal: PropTypes.func
};
