import React from "react";
// import NavbarBookmarks from "./NavbarBookmarks";
import NavbarUser from "./NavbarUser";
import NavbarBookmarks from "./NavbarBookmarks";
import NavbarSearch from "./NavbarSearch";

export default function Navbar(props) {
  // const setMenuVisibility = true;

  return (
    <nav
      className="header-navbar navbar align-items-center fixed-top navbar-shadow navbar navbar-expand-lg navbar-light mb-3 mt-2"
      style={{ marginLeft: "95px", marginRight: "95px" }}
    >
      <div className="navbar-container d-flex content align-items-center">
        <NavbarSearch {...props} />
        <NavbarBookmarks {...props} />
        <NavbarUser {...props} />
      </div>
    </nav>
  );
}
