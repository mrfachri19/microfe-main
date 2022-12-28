// ** React Imports
// import { Fragment } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle, ShoppingCart, Grid, List } from 'react-feather'

// ** Reactstrap Imports
import { Button, Badge, Input, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown, Nav, NavItem, NavLink, TabContent, TabPane, Label } from 'reactstrap'

import React, { useEffect, useState, Fragment } from "react";
import PropTypes from 'prop-types';
import ScrollBar from "react-perfect-scrollbar";
// import { getMobile, getMobileNew, postNotif } from "../../../api";
// import Ballon from "../../Ballon";
// import ProfilePicture from "../../Image/ProfilePicture";
import { DismissRegular } from "@fluentui/react-icons";
// import { getUserData } from "../../../utils/storage.js";
// import CardFriendlist from "./CardFriendlist";
// import CardBirthday from "./CardBirthday";
// import CardNotifFilter from "./CardNotifFilter";
import { useDispatch, useSelector } from "react-redux";
import { getMenuConfig } from '../../../../api';
// import { DismissRegular, GridFilled, TextBulletListLtrRegular, ChevronRightFilled, ChevronLeftFilled } from "@fluentui/react-icons";
import { getUserData } from '../../../../utils/storage'
import CardMenuGrid from '../../../../views/components/cards/menuConfig/grid'
import CardMenuList from '../../../../views/components/cards/menuConfig/list'
import EmptyCard from '@src/views/components/cards/empty';

const MenuConfigDropdown = () => {

  const [listMenuCollaboration, setListMenuCollaboration] = React.useState([])
  const [listMenuEss, setListMenuEss] = React.useState([])
  const [listMenuWellness, setListMenuWellness] = React.useState([])
  const [showGrid, setShowGrid] = React.useState(false)
  const [showList, setShowList] = React.useState(false)
  const [showAll, setShowAll] = React.useState(true)
  const [showCollaboration, setShowCollaboration] = React.useState(false)
  const [showEss, setShowEss] = React.useState(false)
  const [showWellness, setShowWellness] = React.useState(false)

  const containerRef = React.createRef();
  const sliderTimerRef = React.createRef();

  const [active, setActive] = useState('1')

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  function getMenuConfigData() {
    getMenuConfig(`?grouping=true&appVersion=5.0.5&userTimezone=GMT+7&language=en&usedFor=web_new`).then((res) => {
      var tempList = [];
      tempList = res.data.data;
      //  // console.log("List data Menu => ", tempList);
      // const result = tempList.map((v) => v.menuConfigResponses);
      //  // console.log("hasil filter menu",result);
      setListMenuCollaboration(tempList[0].menuConfigResponses)
      setListMenuEss(tempList[1].menuConfigResponses)
      setListMenuWellness(tempList[2].menuConfigResponses)
      // const categoryList = tempList.map((v) => v.category);
      //  // console.log("List kategory menu", categoryList);
      // setListMenuCategory(categoryList)
    });
  }

  function slide(direction) {
    clearInterval(sliderTimerRef.current);
    let scrollCompleted = 0;

    sliderTimerRef.current = setInterval(function () {
      var slider = containerRef.current?.scrollLeft;

      if (direction === 'left') {
        containerRef.current.scrollLeft = slider - 500;
        //  // console.log("Kepencet kiri", containerRef.current.scrollLeft)
      } else {
        containerRef.current.scrollLeft = slider + 500;
        //  // console.log("Kepencet kanan", containerRef.current.scrollLeft)
      }
      scrollCompleted += 500;
      if (scrollCompleted >= 500) {
        clearInterval(sliderTimerRef.current);
      }
    }, 50);
  }

  useEffect(() => {
    return () => {
      clearInterval(sliderTimerRef.current);
    };
  }, []);

  useEffect(() => {
    getMenuConfigData()
  }, [1])

  const renderNotificationItems = () => {
    return (
      <>
        <Nav tabs fill className='mb-0'>
          <NavItem>
            <NavLink
              className='py-3'
              active={active === '1'}
              onClick={() => {
                toggle('1')
              }}
            >
              Semua
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className='py-3'
              active={active === '2'}
              onClick={() => {
                toggle('2')
              }}
            >
              Collaboration
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className='py-3'
              active={active === '3'}
              onClick={() => {
                toggle('3')
              }}
            >
              Employee Self Service
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className='py-3'
              active={active === '4'}
              onClick={() => {
                toggle('4')
              }}
            >
              Wellness
            </NavLink>
          </NavItem>
        </Nav>
        <PerfectScrollbar
          component='li'
          className='media-list scrollable-container'
          options={{
            wheelPropagation: false
          }}
        >
          <TabContent className='py-50' activeTab={active}>
            {showGrid ?
              <>
                <TabPane tabId='1'>
                  {listMenuCollaboration.length ?
                    <CardMenuGrid listMenu={listMenuCollaboration} title="Collaboration" /> :
                    null}
                  {listMenuEss.length ?
                    <CardMenuGrid listMenu={listMenuEss} title="Employee Self Service" /> :
                    null}
                  {listMenuWellness.length ?
                    <CardMenuGrid listMenu={listMenuWellness} title="Wellness" /> :
                    null}
                </TabPane>
                <TabPane tabId='2'>
                  {listMenuCollaboration.length ?
                    <CardMenuGrid listMenu={listMenuCollaboration} title="Collaboration" /> :
                    <EmptyCard
                      className="my-5 bg-white shadow-none"
                      text="Belum Tersedia"
                    >
                    </EmptyCard>}
                </TabPane>
                <TabPane tabId='3'>
                  {listMenuEss.length ?
                    <CardMenuGrid listMenu={listMenuEss} title="Employee Self Service" /> :
                    <EmptyCard
                      className="my-5 bg-white shadow-none"
                      text="Belum Tersedia"
                    >
                    </EmptyCard>}
                </TabPane>
                <TabPane tabId='4'>
                  {listMenuWellness.length ?
                    <CardMenuGrid listMenu={listMenuWellness} title="Wellness" /> :
                    <EmptyCard
                      className="my-5 bg-white shadow-none"
                      text="Belum Tersedia"
                    >
                    </EmptyCard>}
                </TabPane>
              </> :
              <>
                <TabPane tabId='1'>
                  {listMenuCollaboration.length ?
                    <CardMenuList listMenu={listMenuCollaboration} title="Collaboration" /> :
                    null}
                  {listMenuEss.length ?
                    <CardMenuList listMenu={listMenuEss} title="Employee Self Service" /> :
                    null}
                  {listMenuWellness.length ?
                    <CardMenuList listMenu={listMenuWellness} title="Wellness" /> :
                    null}
                </TabPane>
                <TabPane tabId='2'>
                  {listMenuCollaboration.length ?
                    <CardMenuList listMenu={listMenuCollaboration} title="Collaboration" /> :
                    <EmptyCard
                      className="my-5 bg-white shadow-none"
                      text="Belum Tersedia"
                    >
                    </EmptyCard>}
                </TabPane>
                <TabPane tabId='3'>
                  {listMenuEss.length ?
                    <CardMenuList listMenu={listMenuEss} title="Employee Self Service" /> :
                    <EmptyCard
                      className="my-5 bg-white shadow-none"
                      text="Belum Tersedia"
                    >
                    </EmptyCard>}
                </TabPane>
                <TabPane tabId='4'>
                  {listMenuWellness.length ?
                    <CardMenuList listMenu={listMenuWellness} title="Wellness" /> :
                    <EmptyCard
                      className="my-5 bg-white shadow-none"
                      text="Belum Tersedia"
                    >
                    </EmptyCard>}
                </TabPane>
              </>}
          </TabContent>
        </PerfectScrollbar>
      </>
    )
  }
  /*eslint-enable */

  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item' direction='start'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
        <Grid size={21} />
      </DropdownToggle>
      <DropdownMenu end className='dropdown-menu-media' >
        <li className='dropdown-menu-header'>
          <div className='d-flex' style={{ marginLeft: "1.5rem", marginRight: "1.5rem", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
            <h4 className='notification-title mb-0 me-auto'>Menu</h4>
            {/* <div className='form-check form-switch d-flex justify-content-center cursor-pointer'>
              <Input type='switch' name='unRead' id='unRead' onClick={() => { setUnread(!unread),  // console.log(unread) }} />
              <Label className="form-check-label my-auto ms-1" for="unRead">
                Unread
              </Label>
            </div> */}
            <div className='bg-tertiary-100'>
              <Button color={`${showGrid ? "primary" : "tertiary-100"}`} className='btn-icon btn-round' onClick={() => { setShowGrid(true) }}>
                <Grid size={16} color={`${showGrid ? "#fff" : "#A0AEC0"}`} />
              </Button>
              <Button color={`${showGrid ? "tertiary-100" : "primary"}`} className='btn-icon btn-round' onClick={() => { setShowGrid(false) }}>
                <List size={16} color={`${showGrid ? "#A0AEC0" : "#fff"}`} />
              </Button>
            </div>
          </div>
        </li>
        {renderNotificationItems()}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default MenuConfigDropdown
