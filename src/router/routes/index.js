// ** React Imports
import React, { Fragment } from "react";

// ** Routes Imports
import AppRoutes from "./Apps";
import FormRoutes from "./Forms";
import PagesRoutes from "./Pages";
import TablesRoutes from "./Tables";
import ChartsRoutes from "./Charts";
import DashboardRoutes from "./Dashboards";
import UiElementRoutes from "./UiElements";
import ExtensionsRoutes from "./Extensions";
import PageLayoutsRoutes from "./PageLayouts";
import AuthenticationRoutes from "./Authentication";

// // ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";
import PrivateRoute from "@components/routes/PrivateRoute";

// ** Utils
import { isObjEmpty } from "@utils";

const getLayout = {
  blank: <VerticalLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/dashboard";

// ** Merge Routes
const Routes = [
  // ...AuthenticationRoutes,
  ...DashboardRoutes,
  // PageViewGa(...AppRoutes),
  ...AppRoutes,
  // ...PagesRoutes,
  // ...UiElementRoutes,
  // ...ExtensionsRoutes,
  // ...PageLayoutsRoutes,
  // ...FormRoutes,
  // ...TablesRoutes,
  // ...ChartsRoutes
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      // if (
      //   (route.meta && route.meta.layout && route.meta.layout === layout) ||
      //   ((route.meta === undefined || route.meta.layout === undefined) &&
      //     defaultLayout === layout)
      // ) {
        let RouteTag = PrivateRoute;

        // ** Check for public or private route
        if (route.meta) {
          // route.meta.layout === "blank" ? (isBlank = false) : (isBlank = false);
          RouteTag = PrivateRoute;
        }
        if (route.element) {
          const Wrapper = LayoutWrapper;
          // eslint-disable-next-line multiline-ternary
          // isObjEmpty(route.element.props) && isBlank === false
            // ? // eslint-disable-next-line multiline-ternary
              // LayoutWrapper
            // : 
            // Fragment;

          route.element = (
            <Wrapper {...getRouteMeta(route)}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      // }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
