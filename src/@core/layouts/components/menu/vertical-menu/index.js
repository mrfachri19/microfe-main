// ** React Imports
import React,{ Fragment, useState, useRef } from "react";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Vertical Menu Components
import VerticalMenuHeader from "./VerticalMenuHeader";
import VerticalNavMenuItems from "./VerticalNavMenuItems";
import {
  HomeFilled,
  TaskListSquareLtrFilled,
  CalendarLtrFilled,
  PeopleCommunityFilled,
  PersonNoteFilled,
  PeopleTeamFilled,
  NewsFilled,
  PersonFeedbackFilled,
  Star12Filled,
} from "@fluentui/react-icons";
import { FileText, Circle } from "react-feather";
// import feedback from '@src/assets/icons/feedback.svg';
import { HiOutlineStar } from "react-icons/hi";

import { toggelRatingModal } from '../../../../../redux/modalToggle';
// import RatingModal from "../../components/Modals/RatingModal";

import { useDispatch, useSelector } from "react-redux";



  
const Sidebar = (props) => {
  const dispatch = useDispatch();
  
  function openModal() {
    dispatch(toggelRatingModal(true));
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
      navLink: "/dashboard"
    },
    // {
    //   id: "socialConnect",
    //   title: "Social Connect",
    //   icon: <NewsFilled height="100%" size={20} />,
    //   navLink: "/employee"
    // },
    {
      id: "tugas",
      title: "Tugas",
      icon: <TaskListSquareLtrFilled height="100%" size={20} />,
      navLink: "/app/todo"
    },
    {
      id: "kalender",
      title: "Kalender",
      icon: <CalendarLtrFilled height="100%" size={20} />,
      navLink: "/app/calendar"
    },
    // {
    //   id: "anggotaTim",
    //   title: "Anggota Tim",
    //   icon: <PeopleTeamFilled height="100%" size={20} />,
    //   navLink: "/employee"
    // },
    // {
    //   id: "kolaborasi",
    //   title: "Kolaborasi",
    //   icon: <PeopleCommunityFilled height="100%" size={20} />,
    //   navLink: "/employee"
    // },
    {
      id: "request",
      title: "Pengajuan",
      icon: <PersonNoteFilled height="100%" size={20} />,
      navLink: "/app/request"
    },
    // {
    //   id: "employeeSelfService",
    //   title: "Employee Self Service",
    //   icon: <PersonNoteFilled height="100%" size={20} />,
    //   navLink: "/app/request",
    //   children: [
    //     {
    //       id: "request",
    //       title: "Pengajuan",
    //       icon: <Circle size={12} />,
    //       navLink: "/app/request"
    //     }
    //   ]
    // },
    // {
    //   id: "apps",
    //   title: "Applications",
    //   icon: <FileText size={20} />,
    //   children: [
    //     {
    //       id: "marketplace",
    //       title: "Marketplace",
    //       icon: <Circle size={12} />,
    //       navLink: "/marketplace"
    //     }
    //   ]
    // },
    {
      id: "feedback",
      title: "Feedback",
      icon: <PersonFeedbackFilled height="100%" size={20} />,
      navLink: "/feedback"
    },
    {
      id: "penilaian",
      title: "Beri Penilaian",
      icon: <Star12Filled height="100%" size={20}  />,
      onclick: dispatch(toggelRatingModal(true)),
      navLink: "/penilaian"
    },

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

  // ** Props
  const { menuCollapsed, menu, skin } = props;

  // ** States
  const [groupOpen, setGroupOpen] = useState([]);
  const [groupActive, setGroupActive] = useState([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState([]);
  const [activeItem, setActiveItem] = useState(null);

  // ** Menu Hover State
  const [menuHover, setMenuHover] = useState(false);

  // ** Ref
  const shadowRef = useRef(null);

  // ** Function to handle Mouse Enter
  const onMouseEnter = () => {
    setMenuHover(true);
  };

  // ** Scroll Menu
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

  return (
    <Fragment>
      <div
        className={classnames(
          "main-menu menu-fixed menu-accordion menu-shadow",
          {
            expanded: menuHover || menuCollapsed === false,
            "menu-light": skin !== "semi-dark" && skin !== "dark",
            "menu-dark": skin === "semi-dark" || skin === "dark"
          }
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setMenuHover(false)}
      >
        <Fragment>
          {/* Vertical Menu Header */}
          <VerticalMenuHeader
            setGroupOpen={setGroupOpen}
            menuHover={menuHover}
            {...props}
          />
          {/* Vertical Menu Header Shadow */}
          <div className="shadow-bottom" ref={shadowRef}></div>
          {/* Perfect Scrollbar */}
          <PerfectScrollbar
            className="main-menu-content pt-4"
            options={{ wheelPropagation: false }}
            onScrollY={(container) => scrollMenu(container)}
          >
            <ul className="navigation navigation-main side-menu-main" >
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
              />
            </ul>
          </PerfectScrollbar>
        </Fragment>
      </div>
    </Fragment>
  );
};

export default Sidebar;
