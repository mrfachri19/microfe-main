// ** Router imports
import React, { lazy } from "react";

// ** Router imports
import { useRoutes, Navigate } from "react-router-dom";

// ** Layouts
import BlankLayout from "@layouts/BlankLayout";

// ** Utils
import { isSessionActive, clearStorages } from "@src/utils/storage";
import LoginBasic from "../views/pages/authentication/LoginBasic";
import Ingenium from "../views/pages/Ingenium";
// import Admin from "../layouts/admin/Admin"
// ** Components
const Error = lazy(() => import("../views/pages/misc/Error"));
const Login = lazy(() => import("../views/pages/authentication/Login"));
const DashboardEcommerce = lazy(() => import('../views/dashboard/ecommerce'))
const NotAuthorized = lazy(() => import("../views/pages/misc/NotAuthorized"));

const Router = ({ allRoutes }) => {
  const user = isSessionActive();
  const getHomeRoute = () => {
    if (user) {
      return "/dashboard";
    } else {
      clearStorages();
      return "/login";
    }
  };

  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    {
      path: "/login",
      element: (user) ? <Navigate replace to={"/dashboard"} /> : <LoginBasic />,
    },
    {
      path: "/marketplace",
      // element: <BlankLayout />,
      children: [{ path: "/marketplace", element: <Ingenium /> }]
    },
    {
      path: "/auth/not-auth",
      // element: <BlankLayout />,
      children: [{ path: "/auth/not-auth", element: <NotAuthorized /> }]
    },
    {
      path: "*",
      // element: <BlankLayout />,
      children: [{ path: "*", element: <Error /> }]
    },
    ...allRoutes
  ]);

  return routes;
};

export default Router;
