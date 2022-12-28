import React, { Fragment, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import VerticalMenuHeader from "./VerticalMenuHeader";
import VerticalNavMenuItems from "./VerticalNavMenuItems";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Mail,
  MessageSquare,
  CheckSquare,
  Calendar,
  FileText,
  Circle,
  ShoppingCart,
  User,
  Shield,
  Users
} from "react-feather";
import {
  HomeFilled,
  TaskListSquareLtrFilled,
  CalendarLtrFilled,
  PeopleCommunityFilled,
  PersonNoteFilled,
  PeopleTeamFilled,
  NewsFilled
} from "@fluentui/react-icons";

const Menu = (props) => {
  const [groupOpen, setGroupOpen] = useState([]);
  const [groupActive, setGroupActive] = useState([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [menuHover, setMenuHover] = useState(false);
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const shadowRef = useRef(null);

  const scrollMenu = (container) => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.add("d-block");
      }
    } else {
      if (shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.remove("d-block");
      }
    }
  };

  if (menuCollapsed) {
    document.body.classList.remove("menu-expanded");
    document.body.classList.add("menu-collapsed");
  } else {
    document.body.classList.add("menu-expanded");
    document.body.classList.remove("menu-collapsed");
  }

  const mainMenu = document.getElementsByClassName("main-menu");
  const navbarHeader = document.getElementsByClassName("navbar-header");
  if (mainMenu.length > 0 && navbarHeader.length > 0) {
    if (menuHover) {
      mainMenu[0].classList.add("expanded");
      navbarHeader[0].classList.add("expanded");
    } else {
      mainMenu[0].classList.remove("expanded");
      navbarHeader[0].classList.remove("expanded");
    }
  }

  const menuData = [
    // {
    //   header: "Apps & Pages",
    // },
    // {
    //   id: 'email',
    //   title: 'Email',
    //   icon: <Mail size={20} />,
    //   navLink: '/app/email'
    // },
    // {
    //   id: 'chat',
    //   title: 'Chat',
    //   icon: <MessageSquare size={20} />,
    //   navLink: '/app/chat'
    // },
    // {
    //   id: 'todo',
    //   title: 'Todo',
    //   icon: <CheckSquare size={20} />,
    //   navLink: '/app/todo'
    // },
    // {
    //   id: 'home',
    //   title: 'Home',
    //   icon: <Calendar size={20} />,
    //   navLink: '/'
    // },
    {
      id: "home",
      title: "Home",
      icon: <HomeFilled height="100%" size={20} />,
      navLink: "/employee"
    },
    {
      id: "socialConnect",
      title: "Social Connect",
      icon: <NewsFilled height="100%" size={20} />,
      navLink: "/employee"
    },
    {
      id: "tugas",
      title: "Tugas",
      icon: <TaskListSquareLtrFilled height="100%" size={20} />,
      navLink: "/employee"
    },
    {
      id: "kalender",
      title: "Kalender",
      icon: <CalendarLtrFilled height="100%" size={20} />,
      navLink: "/employee"
    },
    {
      id: "anggotaTim",
      title: "Anggota Tim",
      icon: <PeopleTeamFilled height="100%" size={20} />,
      navLink: "/employee"
    },
    {
      id: "kolaborasi",
      title: "Kolaborasi",
      icon: <PeopleCommunityFilled height="100%" size={20} />,
      navLink: "/employee"
    },
    {
      id: "employeeSelfService",
      title: "Employee Self Service",
      icon: <PersonNoteFilled height="100%" size={20} />,
      navLink: "/employee",
      children: [
        {
          id: "marketplace",
          title: "Marketplace",
          icon: <Circle size={12} />,
          navLink: "/marketplace"
        }
      ]
    },
    {
      id: "apps",
      title: "Applications",
      icon: <FileText size={20} />,
      children: [
        {
          id: "marketplace",
          title: "Marketplace",
          icon: <Circle size={12} />,
          navLink: "/marketplace"
        }
      ]
    }

    // {
    //   id: 'roles-permissions',
    //   title: 'Roles & Permissions',
    //   icon: <Shield size={20} />,
    //   children: [
    //     {
    //       id: 'roles',
    //       title: 'Roles',
    //       icon: <Circle size={12} />,
    //       navLink: '/app/roles'
    //     },
    //     {
    //       id: 'permissions',
    //       title: 'Permissions',
    //       icon: <Circle size={12} />,
    //       navLink: '/app/permissions'
    //     }
    //   ]
    // },
    // {
    //   id: 'eCommerce',
    //   title: 'eCommerce',
    //   icon: <ShoppingCart size={20} />,
    //   children: [
    //     {
    //       id: 'shop',
    //       title: 'Shop',
    //       icon: <Circle size={12} />,
    //       navLink: '/app/ecommerce/shop'
    //     },
    //     {
    //       id: 'detail',
    //       title: 'Details',
    //       icon: <Circle size={12} />,
    //       navLink: '/app/ecommerce/product-detail'
    //     },
    //     {
    //       id: 'wishList',
    //       title: 'Wish List',
    //       icon: <Circle size={12} />,
    //       navLink: '/app/ecommerce/wishlist'
    //     },
    //     {
    //       id: 'checkout',
    //       title: 'Checkout',
    //       icon: <Circle size={12} />,
    //       navLink: '/app/ecommerce/checkout'
    //     }
    //   ]
    // },
    // {
    //   id: 'users',
    //   title: 'User',
    //   icon: <User size={20} />,
    //   children: [
    //     {
    //       id: 'list',
    //       title: 'List',
    //       icon: <Circle size={12} />,
    //       navLink: '/app/user/list'
    //     },
    //     {
    //       id: 'view',
    //       title: 'View',
    //       icon: <Circle size={12} />,
    //       navLink: '/app/user/view'
    //     }
    //   ]
    // }
  ];

  return (
    <Fragment>
      <div
        className={classnames(
          "main-menu menu-fixed menu-accordion menu-shadow",
          {
            expanded: false,
            "menu-light": true,
            "menu-dark": false
          }
        )}
        onMouseEnter={() => setMenuHover(true)}
        onMouseLeave={() => setMenuHover(false)}
      >
        <Fragment>
          <VerticalMenuHeader
            menuCollapsed={menuCollapsed}
            setMenuCollapsed={setMenuCollapsed}
            menuVisibility={props.menuVisibility}
            setMenuVisibility={props.setMenuVisibility}
          />
          <div className="shadow-bottom" ref={shadowRef}></div>
          <PerfectScrollbar
            className="main-menu-content"
            options={{ wheelPropagation: false }}
            onScrollY={(container) => scrollMenu(container)}
          >
            <ul className="navigation navigation-main">
              <VerticalNavMenuItems
                items={menuData}
                menuData={menuData}
                menuHover={menuHover}
                groupOpen={groupOpen}
                activeItem={activeItem}
                groupActive={groupActive}
                setGroupOpen={setGroupOpen}
                menuCollapsed={menuCollapsed}
                setActiveItem={setActiveItem}
                setGroupActive={setGroupActive}
                currentActiveGroup={currentActiveGroup}
                setCurrentActiveGroup={setCurrentActiveGroup}
                menuVisibility={props.menuVisibility}
                setMenuVisibility={props.setMenuVisibility}
              />
            </ul>
          </PerfectScrollbar>
        </Fragment>
      </div>
    </Fragment>
  );
};

export default Menu;
