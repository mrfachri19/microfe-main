// ** React Imports
import { Link } from "react-router-dom";
import { categoryTask, toggleFromCreate } from "./store";
import { getTimeManagementV2 } from "../../../api";
import { getUsernik } from "../../../utils/storage";
import { mobileVersion, mobileVersion2 } from "../../../store";
import moment from "moment";
// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Mail, Star, Check, Trash, Plus } from "react-feather";

// ** Reactstrap Imports
import { Badge, Button, ListGroup, ListGroupItem } from "reactstrap";
import React, { useEffect, useState } from "react";

const TodoSidebar = (props) => {
  // ** Props
  const {
    handleTaskSidebar,
    setMainSidebar,
    mainSidebar,
    dispatch,
    getTasks,
    params,
    catgory
  } = props;
  const [categories, setCatgeories] = useState("");
  // ** Functions To Handle List Item Filter
  const handleFilter = (filter) => {
    dispatch(getTasks({ ...params, filter }));
  };
  function handleCategory() {
    dispatch(categoryTask("today"));
  }
  function handleCategorydone() {
    dispatch(categoryTask("done" ));
  }
  function handleCategorylate() {
    dispatch(categoryTask("late"));
  }
  function handleCategoryassignment() {
    dispatch(categoryTask("assignment"));
  }
  function handleCategorymendatang() {
    dispatch(categoryTask("upcoming"));
  }
  function handleCategorybesok() {
    dispatch(categoryTask( "tomorrow"));
  }

  // count list task
  const nik = getUsernik();
  const [count, setCount] = React.useState(0);
  const [countBesok, setCountBesok] = React.useState(0);
  const [CountPenugasan, setCountPenugasan] = React.useState(0);
  const [countMendatang, setCountMendatang] = React.useState(0);
  const [countSelesai, setCountSelesai] = React.useState(0);
  const [countLate, setCountLate] = React.useState(0);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  // today
  function getTaskData() {
    getTimeManagementV2(
      `activity/new?action=my_activity&limit=1&offset=0&nik=${nik}&start_date=${moment(
        startDate
      ).format("YYYY-MM-DD")}&end_date=${moment(endDate).format(
        "YYYY-MM-DD"
      )}&appVersion=${mobileVersion}&category=today`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data.count;
      setCount(tempList);
    });
  }

  // tomorrow
  function getTaskDataTomorrow() {
    getTimeManagementV2(
      `activity/new?action=my_activity&limit=1&offset=0&nik=${nik}&start_date=${moment(
        startDate
      ).format("YYYY-MM-DD")}&end_date=${moment(endDate).format(
        "YYYY-MM-DD"
      )}&appVersion=${mobileVersion}&category=tomorrow`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data.count;
      setCountBesok(tempList);
    });
  }

  // Late
  function getTaskDataLate() {
    getTimeManagementV2(
      `activity/new?action=my_activity&limit=1&offset=0&nik=${nik}&start_date=${moment(
        startDate
      ).format("YYYY-MM-DD")}&end_date=${moment(endDate).format(
        "YYYY-MM-DD"
      )}&appVersion=${mobileVersion}&category=late`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data.count;
      setCountLate(tempList);
    });
  }

  // done
  function getTaskDataDone() {
    getTimeManagementV2(
      `activity/new?action=my_activity&limit=1&offset=0&nik=${nik}&start_date=${moment(
        startDate
      ).format("YYYY-MM-DD")}&end_date=${moment(endDate).format(
        "YYYY-MM-DD"
      )}&appVersion=${mobileVersion}&category=done`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data.count;
      setCountSelesai(tempList);
    });
  }

  // upcoming
  function getTaskDataUpcoming() {
    getTimeManagementV2(
      `activity/new?action=my_activity&limit=1&offset=0&nik=${nik}&start_date=${moment(
        startDate
      ).format("YYYY-MM-DD")}&end_date=${moment(endDate).format(
        "YYYY-MM-DD"
      )}&appVersion=${mobileVersion}&category=upcoming`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data.count;
      setCountMendatang(tempList);
    });
  }

  // assignment
  function getTaskDataAssignment() {
    getTimeManagementV2(
      `activity/new?action=my_activity&limit=1&offset=0&nik=${nik}&start_date=${moment(
        startDate
      ).format("YYYY-MM-DD")}&end_date=${moment(endDate).format(
        "YYYY-MM-DD"
      )}&appVersion=${mobileVersion}&category=assignment`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data.count;
      setCountPenugasan(tempList);
    });
  }

  useEffect(() => {
    getTaskData();
    getTaskDataTomorrow();
    getTaskDataLate();
    getTaskDataDone();
    getTaskDataUpcoming();
    getTaskDataAssignment();
    handleActiveItem();
  }, []);

  const handleTag = (tag) => {
    dispatch(getTasks({ ...params, tag }));
  };

  // ** Functions To Active List Item
  const handleActiveItem = (value) => {
    if (
      (params.filter && params.filter === value) ||
      (params.tag && params.tag === value)
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
    dispatch(toggleFromCreate(true));
  };

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
                Tambah Tugas
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
                  action
                  tag={Link}
                  to={"/app/todo/"}
                  active={params.filter === "" && params.tag === ""}
                  onClick={handleCategory}
                >
                  {/* <Mail className='me-75' size={18} /> */}
                  <span className="align-middle">Tugas hari ini</span>
                  <Badge
                    className={count ? "float-end" : "d-none"}
                    color="light-primary"
                    pill
                  >
                    {count}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to={"/app/todo/done"}
                  active={handleActiveItem("done")}
                  onClick={handleCategorydone}
                  action
                >
                  {/* <Star className='me-75' size={18} /> */}
                  <span className="align-middle">Selesai</span>
                  <Badge
                    className={countSelesai ? "float-end" : "d-none"}
                    color="light-primary"
                    pill
                  >
                    {countSelesai}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to={"/app/todo/late"}
                  active={handleActiveItem("late")}
                  onClick={handleCategorylate}
                  action
                >
                  {/* <Check className='me-75' size={18} /> */}
                  <span className="align-middle">Terlambat</span>
                  <Badge
                    className={countLate ? "float-end" : "d-none"}
                    color="light-primary"
                    pill
                  >
                    {countLate}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to={"/app/todo/assignment"}
                  active={handleActiveItem("assignment")}
                  onClick={handleCategoryassignment}
                  action
                >
                  {/* <Trash className='me-75' size={18} /> */}
                  <span className="align-middle">Penugasan</span>
                  <Badge
                    className={CountPenugasan ? "float-end" : "d-none"}
                    color="light-primary"
                    pill
                  >
                    {CountPenugasan}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to={"/app/todo/upcoming"}
                  active={handleActiveItem("upcoming")}
                  onClick={handleCategorymendatang}
                  action
                >
                  {/* <Trash className='me-75' size={18} /> */}
                  <span className="align-middle">Mendatang</span>
                  <Badge
                    className={countMendatang ? "float-end" : "d-none"}
                    color="light-primary"
                    pill
                  >
                    {countMendatang}
                  </Badge>
                </ListGroupItem>
                <ListGroupItem
                  tag={Link}
                  to={"/app/todo/tomorrow"}
                  active={handleActiveItem("tomorrow")}
                  onClick={handleCategorybesok}
                  action
                >
                  {/* <Trash className='me-75' size={18} /> */}
                  <span className="align-middle">Besok</span>
                  <Badge
                    className={countBesok ? "float-end" : "d-none"}
                    color="light-primary"
                    pill
                  >
                    {countBesok}
                  </Badge>
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
