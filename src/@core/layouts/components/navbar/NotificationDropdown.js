// ** React Imports
// import { Fragment } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'
import parse from 'html-react-parser';

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle } from 'react-feather'
import { FoodCakeRegular } from "@fluentui/react-icons"

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
import { getMobile, getMobileNew, postNotif } from '@src/api'
import { getUserData } from '@src/utils/storage'
import EmptyCard from '@src/views/components/cards/empty';

const NotificationDropdown = () => {
  const [read, setRead] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [showBirthday, setShowBirthday] = useState(false)
  const [showFriendlist, setShowFriendlist] = useState(false)
  const [listNotif, setListNotif] = useState([])
  const [listNotifOlder, setListNotifOlder] = useState([])
  const [listNotifFilter, setListNotifFilter] = useState([])
  const [listFriendRequest, setListFriendRequest] = useState([])
  const [listUserBirthday, setListUserBirthday] = useState([])
  const [listUnseen, setListUnseen] = useState([])
  const [unseenAll, setUnseenAll] = useState("");
  const [filterString, setFilterString] = useState("");
  const datauser = getUserData();
  const dispatch = useDispatch();
  const notificationCount = useSelector((state) => state.notificationCount);
  const [unread, setUnread] = useState(false);


  const [active, setActive] = useState('1')

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }

  function getNotifData() {
    let data = {
      limit: 10,
      offset: 0,
      filters: []
    };
    postNotif(data).then((res) => {
      var tempList = [];
      tempList = res.data.data;
      //  // console.log("List Data Notif => ", tempList);
      setListNotif(tempList[0].details || [])
      setListNotifOlder(tempList[1].details || [])
    });
  }

  function getNotifDataFilter() {
    let data = {
      limit: 10,
      offset: 0,
      filters: [
        {
          filterCode: filterString
        }
      ]
    };
    postNotif(data).then((res) => {
      var tempList = [];
      tempList = res.data.data;
      //  // console.log("List Data Notif Filter => ", tempList);
      setListNotifFilter(tempList[1].details || [])
    });
  }

  function getUnseenFilter() {
    let data = {
      limit: 10,
      offset: 0,
      filters: [
        {
          filterCode: "unread"
        }
      ]
    };
    postNotif(data).then((res) => {
      var tempList = [];
      tempList = res.data.data;
      //  // console.log("List Data Notif Unseen Filter => ", tempList[0].details);
      setListUnseen(tempList[0].details)
    });
  }

  function updateSeenAllData() {
    getMobile("notification/general/seen/all").then((res) => {
      var tempList = [];
      tempList = res.data;
      //  // console.log("List seen all => ", tempList);
      getNotifData()
      getNotifUnseenData()
      getFriendRequestData()
      getUserBirthdayData()
      getUnseenFilter()
    });
  }

  function getFriendRequestData() {
    getMobile(`connection/friendrequests/${datauser.id_user}/10/0`).then((res) => {
      var tempList = [];
      tempList = res.data.data;
      //  // console.log("List Friend Request => ", tempList);
      setListFriendRequest(tempList || [])

    });
  }

  function getUserBirthdayData() {
    getMobileNew(`user/birthday/friend/${datauser.id_user}/10/0`).then((res) => {
      var tempList = [];
      tempList = res.data.data;
      //  // console.log("List user birthday => ", tempList);
      setListUserBirthday(tempList || [])

    });
  }

  function getNotifUnseenData() {
    getMobile("notificaion/unseen").then((res) => {
      var tempList = [];
      tempList = res.data;
      //  // console.log("List data unseen => ", tempList);
      setUnseenAll(tempList.total)
      dispatch({ type: "set", notificationCount: tempList.total });
    });
  }

  useEffect(() => {
    setShowAll(true)
    getNotifData()
    getNotifUnseenData()
    getFriendRequestData()
    getUserBirthdayData()
    getUnseenFilter()
  }, [1])

  useEffect(() => {
    getNotifDataFilter()
  }, [filterString])

  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <>
        <Nav tabs fill className='mb-0' style={{ paddingBottom: "15px" }}>
          <NavItem>
            <NavLink
              className='py-3'
              active={active === '1'}
              onClick={() => {
                toggle('1')
              }}
            >
              All
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
              Info
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
              Birthday
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
              Friendlist
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
            <TabPane tabId='1'>
              {unread ?
                <>
                  {listUnseen.map((item, index) => {
                    return (
                      <a
                        key={index}
                        className='d-flex bg-info-100'
                        href={item.switch ? '#' : '/'}
                        onClick={e => {
                          if (!item.switch) {
                            e.preventDefault()
                          }
                        }}
                      >
                        <div
                          className={classnames('list-item d-flex', {
                            'align-items-start': !item.switch,
                            'align-items-center': item.switch
                          })}
                        >
                          <Fragment>
                            <div className='me-4'>
                              <Avatar
                                className="photo-karyawan"
                                {...(item.avatar
                                  ? { img: item.avatar, imgHeight: 40, imgWidth: 40 }
                                  : item.avatarContent
                                    ? {
                                      content: item.avatarContent,
                                      color: item.color
                                    }
                                    : item.avatarIcon
                                      ? {
                                        icon: item.avatarIcon,
                                        color: item.color
                                      }
                                      : null)}
                              />
                            </div>
                            <div className={`list-item-body flex-grow-1 ${item.seen > 0 ? "text-tertiary-900" : "text-primary"}`}>
                              {parse(item.info)}
                              <div className={item.buttonText ? 'd-none' : 'd-none'}>
                                <Button className={`${item.seen > 0 ? 'text-primary' : 'text-primary'} fw-bold`} color={item.seen > 0 ? 'primary-100' : 'primary-100'} size='sm'>
                                  {item.buttonText}
                                </Button>
                              </div>
                              <div>
                                <small className='notification-text fw-normal text-tertiary'>{item.createdAt}</small>
                              </div>
                            </div>
                          </Fragment>
                        </div>
                      </a>
                    )
                  })}
                </> :
                <>
                  {listNotif.map((item, index) => {
                    return (
                      <a
                        key={index}
                        className={`d-flex ${item.seen > 0 ? "bg-white" : "bg-info-100"}`}
                        href={item.switch ? '#' : '/'}
                        onClick={e => {
                          if (!item.switch) {
                            e.preventDefault()
                          }
                        }}
                      >
                        <div
                          className={classnames('list-item d-flex', {
                            'align-items-start': !item.switch,
                            'align-items-center': item.switch
                          })}
                        >
                          <Fragment>
                            <div className='me-4'>
                              <Avatar
                                className="photo-karyawan"
                                {...(item.avatar
                                  ? { img: item.avatar, imgHeight: 40, imgWidth: 40 }
                                  : item.avatarContent
                                    ? {
                                      content: item.avatarContent,
                                      color: item.color
                                    }
                                    : item.avatarIcon
                                      ? {
                                        icon: item.avatarIcon,
                                        color: item.color
                                      }
                                      : null)}
                              />
                            </div>
                            <div className={`list-item-body flex-grow-1 ${item.seen > 0 ? "text-tertiary-900" : "text-primary"}`}>
                              {parse(item.info)}
                              <div className={item.buttonText ? 'd-none' : 'd-none'}>
                                <Button className={`${item.seen > 0 ? 'text-primary' : 'text-primary'} fw-bold`} color={item.seen > 0 ? 'primary-100' : 'primary-100'} size='sm'>
                                  {item.buttonText}
                                </Button>
                              </div>
                              <div>
                                <small className='notification-text fw-normal text-tertiary'>{item.createdAt}</small>
                              </div>
                            </div>
                          </Fragment>
                        </div>
                      </a>
                    )
                  })}
                  {listNotifOlder.map((item, index) => {
                    return (
                      <a
                        key={index}
                        className='d-flex'
                        href={item.switch ? '#' : '/'}
                        onClick={e => {
                          if (!item.switch) {
                            e.preventDefault()
                          }
                        }}
                      >
                        <div
                          className={classnames('list-item d-flex', {
                            'align-items-start': !item.switch,
                            'align-items-center': item.switch
                          })}
                        >
                          <Fragment>
                            <div className='me-4'>
                              <Avatar
                                className="photo-karyawan"
                                {...(item.avatar
                                  ? { img: item.avatar, imgHeight: 40, imgWidth: 40 }
                                  : item.avatarContent
                                    ? {
                                      content: item.avatarContent,
                                      color: item.color
                                    }
                                    : item.avatarIcon
                                      ? {
                                        icon: item.avatarIcon,
                                        color: item.color
                                      }
                                      : null)}
                              />
                            </div>
                            <div className={`list-item-body flex-grow-1 text-tertiary-600`}>
                              {parse(item.info)}
                              <div className={item.buttonText ? 'd-none' : 'd-none'}>
                                <Button className={`${item.seen > 0 ? 'text-primary' : 'text-primary'} fw-bold`} color={item.seen > 0 ? 'primary-100' : 'primary-100'} size='sm'>
                                  {item.buttonText}
                                </Button>
                              </div>
                              <div>
                                <small className='notification-text fw-normal text-tertiary'>{item.createdAt}</small>
                              </div>
                            </div>
                          </Fragment>
                        </div>
                      </a>
                    )
                  })}
                </>}
            </TabPane>
            <TabPane tabId='2'>
              {listNotifFilter.length ?
                <>
                  {listNotifFilter.map((item, index) => {
                    return (
                      <a
                        key={index}
                        className='d-flex'
                        href={item.switch ? '#' : '/'}
                        onClick={e => {
                          if (!item.switch) {
                            e.preventDefault()
                          }
                        }}
                      >
                        <div
                          className={classnames('list-item d-flex', {
                            'align-items-start': !item.switch,
                            'align-items-center': item.switch
                          })}
                        >
                          <Fragment>
                            <div className='me-4'>
                              <Avatar
                                className="photo-karyawan"
                                {...(item.avatar
                                  ? { img: item.avatar, imgHeight: 40, imgWidth: 40 }
                                  : item.avatarContent
                                    ? {
                                      content: item.avatarContent,
                                      color: item.color
                                    }
                                    : item.avatarIcon
                                      ? {
                                        icon: item.avatarIcon,
                                        color: item.color
                                      }
                                      : null)}
                              />
                            </div>
                            <div className={`list-item-body flex-grow-1 ${item.seen > 0 ? "text-tertiary-900" : "text-primary"}`}>
                              {parse(item.info)}
                              <div className={item.buttonText ? 'd-none' : 'd-none'}>
                                <Button className={`${item.seen > 0 ? 'text-primary' : 'text-primary'} fw-bold`} color={item.seen > 0 ? 'primary-100' : 'primary-100'} size='sm'>
                                  {item.buttonText}
                                </Button>
                              </div>
                              <div>
                                <small className='notification-text fw-normal text-tertiary'>{item.createdAt}</small>
                              </div>
                            </div>
                          </Fragment>
                        </div>
                      </a>
                    )
                  })}
                </> :
                <EmptyCard
                  className="my-5 bg-white shadow-none"
                  text="Tidak ada Notif"
                >
                </EmptyCard>
              }
            </TabPane>
            <TabPane tabId='3'>
              {listUserBirthday.length ?
                <>
                  {listUserBirthday.map((item, index) => {
                    return (
                      <a
                        key={index}
                        className={`d-flex`}
                        href={item.switch ? '#' : '/'}
                        onClick={e => {
                          if (!item.switch) {
                            e.preventDefault()
                          }
                        }}
                      >
                        <div
                          className={classnames('list-item d-flex', {
                            'align-items-start': !item.switch,
                            'align-items-center': item.switch
                          })}
                        >
                          <Fragment>
                            <div className='me-4'>
                              <Avatar
                                className="photo-karyawan"
                                {...(item.avatar
                                  ? { img: item.avatar, imgHeight: 40, imgWidth: 40 }
                                  : item.avatarContent
                                    ? {
                                      content: item.avatarContent,
                                      color: item.color
                                    }
                                    : item.avatarIcon
                                      ? {
                                        icon: item.avatarIcon,
                                        color: item.color
                                      }
                                      : null)}
                              />
                            </div>
                            <div className={`list-item-body flex-grow-1 text-tertiary-900 fw-bold`}>
                              {item.fullname}
                              <div>
                                <small className='notification-text fw-normal text-tertiary'>{item.divisi}</small>
                              </div>
                              <div className='d-none'>
                                <Button className='text-primary fw-bold' color='primary-100' size='sm'>
                                  <FoodCakeRegular /> Kirim Ucapan
                                </Button>
                              </div>
                            </div>
                          </Fragment>
                        </div>
                      </a>
                    )
                  })}
                </> :
                <EmptyCard
                  className="my-5 bg-white shadow-none"
                  text="Tidak ada Notif"
                >
                </EmptyCard>
              }
            </TabPane>
            <TabPane tabId='4'>
              {listFriendRequest.length ?
                <>
                  {listFriendRequest.map((item, index) => {
                    return (
                      <a
                        key={index}
                        className={`d-flex`}
                        href={item.switch ? '#' : '/'}
                        onClick={e => {
                          if (!item.switch) {
                            e.preventDefault()
                          }
                        }}
                      >
                        <div
                          className={classnames('list-item d-flex', {
                            'align-items-start': !item.switch,
                            'align-items-center': item.switch
                          })}
                        >
                          <Fragment>
                            <div className='me-4'>
                              <Avatar
                                className="photo-karyawan"
                                {...(item.owner.avatar
                                  ? { img: item.owner.avatar, imgHeight: 40, imgWidth: 40 }
                                  : item.avatarContent
                                    ? {
                                      content: item.avatarContent,
                                      color: item.color
                                    }
                                    : item.avatarIcon
                                      ? {
                                        icon: item.avatarIcon,
                                        color: item.color
                                      }
                                      : null)}
                              />
                            </div>
                            <div className={`list-item-body flex-grow-1 text-tertiary-900`}>
                              <b>{item.owner.fullname}</b> meminta untuk berteman dengan kamu
                              <div className={`${item.friendshipStatus ? 'd-none' : 'd-none'} notification-firend-confirmation`}>
                                <Button className='text-primary fw-bold' color='primary-100' block size='sm'>
                                  Hapus
                                </Button>
                                <Button className='fw-bold' color='primary' block size='sm'>
                                  Konfirmasi
                                </Button>
                              </div>
                              <div>
                                <small className='notification-text fw-normal text-tertiary'>{item.createdAt}</small>
                              </div>
                            </div>
                          </Fragment>
                        </div>
                      </a>
                    )
                  })}
                </> :
                <EmptyCard
                  className="my-5 bg-white shadow-none"
                  text="Tidak ada Notif"
                >
                </EmptyCard>
              }
            </TabPane>
          </TabContent>
        </PerfectScrollbar>
      </>
    )
  }
  /*eslint-enable */

  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item' direction='start'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
        <Bell size={21} />
        <Badge pill color='danger' className={`badge-up ${unseenAll > 0 ? "" : "hidden"}`}>
          {unseenAll}
        </Badge>
      </DropdownToggle>
      <DropdownMenu end className='dropdown-menu-media' >
        <li className='dropdown-menu-header'>
          <div className='d-flex' style={{ marginLeft: "1.5rem", marginRight: "1.5rem", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
            <h4 className='notification-title mb-0 me-auto'>Notifications</h4>
            <div className='form-check form-switch d-flex justify-content-center cursor-pointer'>
              <Input type='switch' name='unRead' id='unRead' onClick={() => { setUnread(!unread) }} />
              <Label className="form-check-label my-auto ms-1" for="unRead">
                Unread
              </Label>
            </div>
          </div>
        </li>
        {renderNotificationItems()}
        <li className='dropdown-menu-footer'>
          <Button color='primary' block
            onClick={(() => {
              updateSeenAllData()
            })}>
            Read all notifications
          </Button>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
