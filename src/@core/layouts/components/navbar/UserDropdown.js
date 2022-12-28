// ** React Imports
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { getUserData } from '@src/utils/storage';

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "@store/authentication";

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch();

  // ** State
  const { userData } = useSelector((state) => state.auth);

  //** Vars
  const history = useNavigate();
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item" direction='start'>
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <div className="user-nav d-sm-flex d-none">
          <span className="user-name fw-bold">
            {userData.nama}
          </span>
          <span className="user-status">{userData.username}</span>
        </div>
        <Avatar
          className="photo-karyawan"
          img={
            `https://diarium.telkom.co.id/getfoto/${userData.username}` || defaultAvatar
          }
          imgHeight="40"
          imgWidth="40"
        />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/profile">
          <User size={14} className="me-75" />
          <span className="align-middle">Profile</span>
        </DropdownItem>
        {/* <DropdownItem tag={Link} to="/app/email">
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
        <DropdownItem
          tag={Link}
          to="/login"
          onClick={() => dispatch(handleLogout())}
        >
          <Power size={14} className="me-75" />
          <span className="align-middle">Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
