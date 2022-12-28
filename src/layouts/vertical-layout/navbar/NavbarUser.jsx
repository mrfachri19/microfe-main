import React from "react";
// ** Dropdowns Imports
// import IntlDropdown from './IntlDropdown'
// import CartDropdown from './CartDropdown'
import UserDropdown from "./UserDropdown";
// import NavbarSearch from './NavbarSearch'
import NotificationDropdown from './NotificationDropdown'

// ** Third Party Components
import { Sun, Moon } from "react-feather";

// ** Reactstrap Imports
import { NavItem, NavLink } from "reactstrap";

const NavbarUser = (props) => {
  // ** Props
  const { skin, setSkin } = props;

  return (
    <ul className="nav navbar-nav align-items-center ms-auto">
      {/* <IntlDropdown /> */}
      {/* <NavItem className='d-none d-lg-block'>
        <NavLink className='nav-link-style'>
          <ThemeToggler />
        </NavLink>
      </NavItem>
      <NavbarSearch />
      <CartDropdown /> */}
      <NotificationDropdown />
      <UserDropdown />
    </ul>
  );
};
export default NavbarUser;
