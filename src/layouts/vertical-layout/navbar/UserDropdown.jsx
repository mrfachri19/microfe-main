import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Avatar from "@components/avatar";

import { useDispatch, useSelector } from "react-redux";
// import { logout } from "@redux/auth.redux";

// ** Third Party Components
import { User, Mail, Power } from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap";

import defaultAvatar from "@src/assets/icons/team-2-800x800.jpg";

const UserDropdown = () => {
  const dispatch = useDispatch();
  const [userMeta, setUserMeta] = useState({});
  const authRedux = useSelector((state) => state.auth);

  useEffect(() => {
    setUserMeta(authRedux.user);
  }, [authRedux]);

  const userAvatar =
    // (userMeta.username &&
    //   `https://diarium.telkom.co.id/getfoto/${userMeta.username}`) ||
    defaultAvatar;

  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none " style={{marginLeft: "5px"}}>
          <span className="user-name fw-bold">
            {/* {userMeta.name?.length > 10
              ? userMeta.name.substring(0, 10) + " ..."
              : userMeta.name} */}
              {/* user */}
              {localStorage.getItem("nama")}
          </span>
          <span className="user-status">{localStorage.getItem("nik")}</span>
        </div>
        <Avatar
          imgClassName="avatar-circle"
          img={userAvatar}
          imgHeight="40"
          imgWidth="40"
          status="online"
        />
      </DropdownToggle>
      <DropdownMenu end>
        {/* <DropdownItem tag={Link} to="/pages/profile">
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/app/email">
          <Mail size={14} className="me-75" />
          <span className="align-middle">Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/app/todo">
          <CheckSquare size={14} className="me-75" />
          <span className="align-middle">Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/app/chat">
          <MessageSquare size={14} className="me-75" />
          <span className="align-middle">Chats</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to="/pages/account-settings">
          <Settings size={14} className="me-75" />
          <span className="align-middle">Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/pages/pricing">
          <CreditCard size={14} className="me-75" />
          <span className="align-middle">Pricing</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/pages/faq">
          <HelpCircle size={14} className="me-75" />
          <span className="align-middle">FAQ</span>
        </DropdownItem> */}
        <DropdownItem tag={Link} to="/profile">
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/login" onClick={() => alert("tes")}>
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
