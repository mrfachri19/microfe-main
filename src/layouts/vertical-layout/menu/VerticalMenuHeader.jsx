import React from "react";
import { NavLink } from "react-router-dom";
import { Disc, X, Circle } from "react-feather";

const VerticalMenuHeader = (props) => {
  const appName = process.env.APP_NAME;
  const appLogoImage =
    require("@src/assets/img/Diarium-Logo.svg").default;
  const menuCollapsed = props.menuCollapsed;

  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => props.setMenuCollapsed(true)}
        />
      );
    } else {
      return (
        <Circle
          size={20}
          data-tour="toggle-icon"
          className="text-primary toggle-icon d-none d-xl-block"
          onClick={() => props.setMenuCollapsed(false)}
        />
      );
    }
  };

  return (
    <div className="navbar-header">
      <ul className="nav navbar-nav flex-row">
        <li className="nav-item me-auto">
          <NavLink to="/" className="navbar-brand">
            <span className="">
              <img src={appLogoImage} alt="logo" style={{width: "95px", height: "23px"}}/>
            </span>
            {/* <h2 className="brand-text mb-0">{appName}</h2> */}
          </NavLink>
        </li>
        <li className="nav-item nav-toggle">
          <div className="nav-link modern-nav-toggle cursor-pointer">
            <Toggler />
            <X
              onClick={() => props.setMenuVisibility(false)}
              className="toggle-icon icon-x d-block d-xl-none"
              size={20}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default VerticalMenuHeader;
