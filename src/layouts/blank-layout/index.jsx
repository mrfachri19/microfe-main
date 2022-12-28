import React, { useEffect } from "react";

const BlankLayout = ({ children }) => {

  useEffect(() => {
    document.body.classList.add('pace-done');
    document.body.classList.add('vertical-layout');
    document.body.classList.add('vertical-menu-modern');
    document.body.classList.add('blank-page');
    document.body.classList.add('navbar-floating');
    document.body.classList.add('footer-static');

    return function cleanup() {
      document.body.classList.remove('pace-done');
      document.body.classList.remove('vertical-layout');
      document.body.classList.remove('vertical-menu-modern');
      document.body.classList.remove('blank-page');
      document.body.classList.remove('navbar-floating');
      document.body.classList.remove('footer-static');
    };
  }, []);

  return (
    <React.Fragment>
      <div className="app-content content ">
        <div className="content-overlay"></div>
        {/* <div className="header-navbar-shadow"></div> */}
        <div className="content-wrapper">
          <div className="content-header row">
          </div>
          <div className="content-body">
            {children}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default BlankLayout;