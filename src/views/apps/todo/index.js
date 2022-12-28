// ** React Imports
import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumbs from "@components/breadcrumbs";

// ** Third Party Components
import classnames from "classnames";

// ** Todo App Components
import Tasks from "./Tasks";
import Sidebar from "./Sidebar";
import TaskSidebar from "./TaskSidebar";
import { toggleFromCreate } from "./store";

// ** Store & Actions
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  updateTask,
  selectTask,
  addTask,
  deleteTask,
  reOrderTasks,
  categoryTask,
  fetchLabels,
  addPartisipan,
  clearPartisipan,
  removePartisipan,
  fetchPartisipans
} from "./store";

// ** Styles
import "@styles/react/apps/app-todo.scss";

import BreadcrumbsDefault from "../../components/breadcrumbs/BreadcrumbsDefault";
import { Breadcrumb } from "reactstrap";
import ModalTask from "./ModalTask";

const TODO = () => {
  // ** States
  const [sort, setSort] = useState("");
  const [query, setQuery] = useState("");
  const [mainSidebar, setMainSidebar] = useState(false);
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false);

  // ** Store Vars
  const dispatch = useDispatch();
  const store = useSelector((state) => state.todo);
  const category = useSelector((state) => state.todo.category.category);
  //  // console.log(category, "reduxtodo");

  // ** URL Params
  const paramsURL = useParams();
  const params = {
    filter: paramsURL.filter || "",
    q: query || "",
    sortBy: sort || "",
    tag: paramsURL.tag || ""
  };

  // ** Function to handle Left sidebar & Task sidebar
  const handleMainSidebar = () => setMainSidebar(!mainSidebar);
  const handleTaskSidebar = () => {
    console.log("dispatch jancuk",!openTaskSidebar);
    setOpenTaskSidebar(!openTaskSidebar);
    dispatch(toggleFromCreate(!openTaskSidebar));
  }

  // ** Get Tasks on mount & based on dependency change
  // useEffect(() => {
  //   dispatch(
  //     getTasks({
  //       filter: paramsURL.filter || "",
  //       q: query || "",
  //       sortBy: sort || "",
  //       tag: paramsURL.tag || ""
  //     })
  //   );
  // }, [store.tasks.length, paramsURL.filter, paramsURL.tag, query, sort]);

  // sidebar task

  return (
    <>
      <Fragment>
        <Sidebar
          store={store}
          params={params}
          getTasks={getTasks}
          dispatch={dispatch}
          mainSidebar={mainSidebar}
          urlFilter={paramsURL.filter}
          setMainSidebar={setMainSidebar}
          handleTaskSidebar={handleTaskSidebar}
        />

        <div className="content-right">
          <div className="content-wrapper">
            <div className="content-body">
              <div
                className={classnames("body-content-overlay", {
                  show: mainSidebar === true
                })}
                onClick={handleMainSidebar}
              ></div>

              <Tasks
                store={store}
                tasks={store.tasks}
                sort={sort}
                query={query}
                params={params}
                setSort={setSort}
                setQuery={setQuery}
                dispatch={dispatch}
                getTasks={getTasks}
                paramsURL={paramsURL}
                updateTask={updateTask}
                selectTask={selectTask}
                reOrderTasks={reOrderTasks}
                handleMainSidebar={handleMainSidebar}
                handleTaskSidebar={handleTaskSidebar}
              />

              <TaskSidebar
                store={store}
                params={params}
                addTask={addTask}
                dispatch={dispatch}
                open={openTaskSidebar}
                updateTask={updateTask}
                selectTask={selectTask}
                deleteTask={deleteTask}
                handleTaskSidebar={handleTaskSidebar}
                fetchLabels={fetchLabels}
                fetchPartisipans={fetchPartisipans}
                addPartisipan={addPartisipan}
                removePartisipan={removePartisipan}
                clearPartisipan={clearPartisipan}
              />
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default TODO;
