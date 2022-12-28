import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import Menu from "./menu";
import Breadcrumbs from "@components/breadcrumbs";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const VerticalLayout = ({ children, bcTitle = "Title", bcData = [] }) => {
  const [redirect, setRedirect] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  // const { user: currentUser } = useSelector((state) => state.auth);
  // if (!currentUser) {
  //   return <Navigate replace to="/login" />;
  // }

  if (windowWidth < 1200) {
    document.body.classList.add("vertical-overlay-menu");
    document.body.classList.remove("vertical-menu-modern");

    if (!menuVisibility) {
      document.body.classList.add("menu-hide");
      document.body.classList.remove("menu-open");
    } else {
      document.body.classList.remove("menu-hide");
      document.body.classList.add("menu-open");
    }
  } else {
    document.body.classList.remove("vertical-overlay-menu");
    document.body.classList.add("vertical-menu-modern");
  }

  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener("resize", handleWindowWidth);
    }

    document.body.classList.add("pace-done");
    document.body.classList.add("vertical-layout");
    document.body.classList.add("vertical-menu-modern");
    document.body.classList.add("navbar-floating");
    document.body.classList.add("footer-static");
    document.body.classList.add("menu-expanded");

    return function cleanup() {
      document.body.classList.remove("pace-done");
      document.body.classList.remove("vertical-layout");
      document.body.classList.remove("vertical-menu-modern");
      document.body.classList.remove("navbar-floating");
      document.body.classList.remove("footer-static");
      document.body.classList.remove("menu-expanded");
    };
  }, []);

  return (
    <>
      <Navbar
        menuVisibility={menuVisibility}
        setMenuVisibility={setMenuVisibility}
      />
      <Menu
        menuVisibility={menuVisibility}
        setMenuVisibility={setMenuVisibility}
      />

      <div className="app-content content">
        <div className="content-overlay"></div>
        {/* <div className="header-navbar-shadow"></div> */}
        <div className="content-wrapper container-xxl p-0">
          <Breadcrumbs data={bcData} />
          <div className="content-body">{children}</div>
        </div>
      </div>
    </>
  );
};

export default VerticalLayout;
