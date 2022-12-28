// ** React Imports
import { Link } from "react-router-dom";
import { getTasks, updateTask, selectTask, addTask, deleteTask, reOrderTasks, categoryRequest } from './store'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Mail, Star, Check, Trash, Plus } from "react-feather";

// ** Reactstrap Imports
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import React, { useEffect, useState } from "react";

const TodoSidebar = (props) => {
  // ** Props
  const {
    handleTaskSidebar,
    setMainSidebar,
    mainSidebar,
    dispatch,
    getTasks,
    params
  } = props;
  const [categories, setCatgeories] = useState("");
  const category = useSelector((state) => state.request.category.category);
  // ** Functions To Handle List Item Filter
  const handleFilter = (filter) => {
    dispatch(getTasks({ ...params, filter }));
  };
  function handleCategoryProcessed() {
    dispatch(categoryRequest({ category: "dashboard_web" }));
  };
  function handleCategoryNotification() {
    dispatch(categoryRequest({ category: "notification_web" }));
  };
  function handleCategoryApproval() {
    dispatch(categoryRequest({ category: "need_approve_web" }));
  };

  const handleTag = (tag) => {
    dispatch(getTasks({ ...params, tag }));
  };

  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    if (
      // (params.filter && params.filter === value) ||
      // (params.tag && params.tag === value)
      category === value
    ) {
      return true;
    } else {
      return false;
    }
  };

  // ** Functions To Handle Add Task Click
  const handleAddClick = () => {
    handleTaskSidebar();
    setMainSidebar();
  };

  useEffect(() => {
    dispatch(categoryRequest({ category: "dashboard_web" }));
  }, [1])


  return (
    <div
      className={classnames("sidebar-left", {
        show: mainSidebar === true
      })}
    >
      <div className="sidebar">
        <div className="sidebar-content todo-sidebar">
          <div className="todo-app-menu">
            <div className="add-task">
              <Button color="primary" onClick={handleAddClick} block>
                Pengajuan Baru
                <Plus
                  className="cursor-pointer"
                  size={14}
                  style={{ marginLeft: "10px" }}
                />
              </Button>
            </div>
            <PerfectScrollbar
              className="sidebar-menu-list"
              options={{ wheelPropagation: false }}
            >
              <ListGroup tag="div" className="list-group-filters">
                <ListGroupItem
                  // action
                  tag={Link}
                  to={"/app/request"}
                  active={handleActiveItem("dashboard_web")}
                  onClick={handleCategoryProcessed}
                >
                  <span className="align-middle">Diproses</span>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to={"/app/request"}
                  active={handleActiveItem("notification_web")}
                  onClick={handleCategoryNotification}
                  action
                >
                  <span className="align-middle">Notifikasi</span>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to={"/app/request"}
                  active={handleActiveItem("need_approve_web")}
                  onClick={handleCategoryApproval}
                  action
                >
                  <span className="align-middle">Persetujuan</span>
                </ListGroupItem>
              </ListGroup>
            </PerfectScrollbar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoSidebar;
