// ** React Imports
import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateRedux } from './store';

// ** Reactstrap Imports
import { Card, ListGroup, ListGroupItem, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button } from 'reactstrap';
import Tooltip from '@src/views/components/tooltips/Tooltips';

const ProfileSubtab = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { profileRedux } = useSelector((state) => state.profile);
  const tabSelect = searchParams.get("tab");
  const subTabSelect = searchParams.get("subtab");

  const toggleTab = (tab) => {
    // alert(tab);
    dispatch(updateRedux({
      subTabProfile : tab
    }));
    setSearchParams({tab : profileRedux.tabProfile, subtab:tab});
  }

  const renderSideMenu = profileRedux.availableTabsProfile[profileRedux.tabProfileIndex].childs.map((tab, index) => {
    return (
      <ListGroupItem
        action
        // tag={Link}
        className='cursor-pointer'
        key={`profile-menu-${index}`}
        active={profileRedux.subTabProfile === tab.tab}
        onClick={() => toggleTab(tab.tab)}
      >
        <span className="align-middle">{tab.label}</span>
      </ListGroupItem>
    )
  })

  return (
    <>
    {profileRedux.availableTabsProfile[profileRedux.tabProfileIndex].childs.length > 0 ? 
    <Card className='profile-subtab mb-7 overflow-hidden'>
      <div className='py-5 px-7 text-primary-700 fw-700 fs-5 subtab-header mb-2'>{profileRedux.availableTabsProfile[profileRedux.tabProfileIndex].label}</div>
      <ListGroup tag="div" className="list-group-filters mb-7">
        {renderSideMenu}
      </ListGroup>
    </Card>:
    <></>
    }
    </>
  )
}

export default ProfileSubtab
