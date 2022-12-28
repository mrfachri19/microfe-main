// ** React Imports
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateRedux } from './store';

// ** Icons Imports
import { TextBulletListLtrFilled } from "@fluentui/react-icons";

// ** Reactstrap Imports
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button } from 'reactstrap';
import Tooltip from '@src/views/components/tooltips/Tooltips';

const ProfileHeader = ({ dataHeader }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { profileRedux } = useSelector((state) => state.profile);
  const [isOpen, setIsOpen] = useState(false);
  const tabSelect = searchParams.get("tab");


  const toggle = () => setIsOpen(!isOpen);
  const toggleTab = (tab, index) => {
    dispatch(updateRedux({
      tabProfile : tab, 
      tabProfileIndex : index,
      subTabProfile : profileRedux.availableTabsProfile[index].listChild[0] || tab
    }));
    setSearchParams({tab : tab});
  }

  const renderHeaderMenu = profileRedux.availableTabsProfile.map((tab, index) => {
    return (
      <NavItem key={tab.tab} className={tab.status ? "":"d-none"}>
        <NavLink 
          className='fw-bold py-0' 
          active={ profileRedux.tabProfile == tab.tab } 
          onClick={() => toggleTab(tab.tab, index)}
        >
          <Tooltip tooltips={tab.label} id={`tooltips-profile-${tab.tab}`}>
            <span className='d-none d-md-block py-4 px-7'>{tab.label}</span>
            <div className='d-block d-md-none py-4 px-6'>
              <tab.icon className='fs-7' />
            </div>
          </Tooltip>
        </NavLink>
      </NavItem>
    )
  })

  return (
    <Card className='profile-header mb-7'>
      {
        (dataHeader.cover) ? 
        <CardImg src={dataHeader.cover} alt='User Profile Image' top /> :
        <div className='card-img-top'></div>
      }
      
      <div className='position-relative'>
        <div className='profile-img-container d-flex align-items-center'>
          <div className='profile-img rounded-circle avatar photo-karyawan'>
            <img className='rounded-circle img-fluid' src={dataHeader.avatar} alt='Card image' height='100%' width='100%'/>
          </div>
          <div className='profile-title ms-3'>
            <h4 className='text-white ps-7'>{dataHeader.fullname} | {dataHeader.username}</h4>
            <p className='text-white mb-8 py-4 ps-7'>{dataHeader.jabatan}</p>
          </div>
        </div>
      </div>
      <div className='profile-header-nav'>
        <Navbar container={false} className='justify-content-end justify-content-md-between w-100 pb-0 ' expand='md' light>
          <Button color='primary' className='btn-icon navbar-toggler mb-3' onClick={toggle}>
            <TextBulletListLtrFilled className='fs-7' />
          </Button>
          <Collapse isOpen={isOpen} navbar>
            <div className='profile-tabs d-flex justify-content-between flex-wrap mt-1 mt-md-0'>
              <Nav className='mb-0' tabs fill>
                {renderHeaderMenu}
              </Nav>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </Card>
  )
}

export default ProfileHeader
