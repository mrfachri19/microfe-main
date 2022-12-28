// ** Icons Import
// import { Heart } from 'react-feather'
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const { deployVersion } = useSelector((state) => state.auth);
  const tab = useLocation();

  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block'>
        Copyright © {new Date().getFullYear()}{' '}
        <span className='d-none d-sm-inline-block'>Allrights Reserved</span>
      </span>
      <span className='float-md-center float-end d-block m-auto version-info'>
        {deployVersion}
      </span>
      {tab.pathname == "/login" ? 
      <a className='float-md-end d-none d-md-block' href="https://t.me/hchelpdesk_bot" target="_blank">
        Need help? Call HC Help desk
      </a>
      :<></>
      }
    </p>
  )
}

export default Footer
