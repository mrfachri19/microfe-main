// ** React Imports
import React, { useEffect, useState, Fragment } from "react";
import { Link, useParams } from "react-router-dom"
import { getTimeManagementV2, updateTask, deleteTask } from "@src/api";
import {
  getUsernik,
  getToken,
  getTokenAPIM,
  getUserData
} from "@src/utils/storage";

import { idTask, categoryTask, modalTugas } from "./store";
import { mobileVersion, mobileVersion2 } from "@src/store";
import ModalTask from "./ModalTask";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import toastAlert from "@src/utils/alert";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Blank Avatar Image
import blankAvatar from "@src/assets/images/avatars/avatar-blank.png";

// ** Third Party Components
import classnames from "classnames";
import { ReactSortable } from "react-sortablejs";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Menu, Search, MoreVertical } from "react-feather";
import "./task.css";
// fluent
import {
  SearchRegular,
  Delete24Filled,
  Flag28Filled,
  BranchFork24Filled,
  TextDescription24Filled,
  Attach24Filled,
  TargetArrow24Filled,
  Play24Regular,
  Pause24Regular,
  RecordStop24Regular
} from "@fluentui/react-icons";
// ** Reactstrap Imports
import {
  Input,
  Badge,
  InputGroup,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { selectPermohonanId } from "../request/store";

const Tasks = (props) => {
  // ** Props
  const {
    query,
    tasks,
    params,
    setSort,
    dispatch,
    getTasks,
    setQuery,
    // updateTask,
    selectTask,
    reOrderTasks,
    handleTaskSidebar,
    handleMainSidebar
  } = props;

  // ** Function to selectTask on click
  const handleTaskClick = (obj) => {
    dispatch(selectTask(obj));
    handleTaskSidebar();
  };
  //  delete task
  const id_Task = useSelector((state) => state.todo.idTask.idTask);
  const succesTugas = useSelector(
    (state) => state.todo.succesUpdate.succesUpdate
  );
  const modalShow = useSelector((state) => state.todo.modaltask.modalTugas);
  const { successCreateTugas } = useSelector((state) => state.todo);
  const [succesDelete, setSuccesDelete] = useState(false);
  const [succesTodo, setSuccessTodo] = useState(false);
  const [succesInprogress, setSuccessInprogress] = useState(false);
  const [succesDone, setSuccessDone] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [currentPageTask, setCurrentPageTask] = useState(1);

  //  // console.log(succesTugas, "test update");

  const deleteTaskTugas = () => {
    const datauser = getUserData();
    const TokenAPIM = getTokenAPIM();
    const TokenAuth = getToken();
    const datapost = {
      task_id: id_Task,
      create_by: datauser.user
    }
    setRefreshData(false);
    deleteTask(datapost).then(() => {
      setModal(false);
      toastAlert("success", "Tugas berhasil dihapus");
      setRefreshData(true);
    })
    .catch((err) => {
      toastAlert("error", err.message);
      console.error(err);
    });
  };
  // modal
  const ModalConfig = [
    {
      id: 5,
      btnTitle: "Delete Tugas",
      modalTitle: "Delete Tugas",
      modalClass: "modal-sm"
    }
  ];

  const [modal, setModal] = useState(false);

  const renderModal = ModalConfig.map((item) => {
    return (
      <Fragment key={item.id}>
        {/* <div>
            <Button
              color="primary"
              // onClick={() => toggleModal(item.id)}
              key={item.title}
              outline
            >
              {item.btnTitle}
            </Button>
          </div> */}
        <Modal
          key={item.id}
          isOpen={modal}
          toggle={() => setModal(false)}
          className={`modal-dialog-centered ${item.modalClass}`}
        >
          <ModalHeader toggle={() => setModal(false)}>
            {item.modalTitle}
            {item.title}
          </ModalHeader>
          <ModalBody>
            <Fragment>
              <p>Apakah kamu yakin menghapus data ?</p>
            </Fragment>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={deleteTaskTugas} outline>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  });
  // search task
  function showModalTugas() {
    dispatch(modalTugas({ modalTugas: true }));
  }
  const [searchKeyword, setSearchKeyword] = useState("");

  // task list
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [limit, setLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [listDataTask, setListDataTask] = useState([]);
  const datauser = getUsernik();
  const [count, setCount] = useState(0);
  const category = useSelector((state) => state.todo.category);

  function getTaskData() {
    getTimeManagementV2(
      `activity/new?action=my_activity&limit=${limit}&offset=${pageNumber - 1}`+
      `&nik=${datauser}&appVersion=${mobileVersion2}&category=${category}`+
      `&start_date=${moment(startDate).format("YYYY-MM-DD")}`+
      `&end_date=${moment(endDate).format("YYYY-MM-DD")}`+
      `${(searchKeyword) ? "&keyword="+searchKeyword:''}`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
       // console.log("List Data Task => ", tempList.detail);
      setListDataTask(tempList.detail);
      setCount(tempList.count);
    });
  }

  function updateTaskDataTodo() {
    let data = {
      task_id: id_Task,
      status: 1
    };
    setRefreshData(false);
    updateTask(data).then((res) => {
       // console.log("update modal =>", res);
      toastAlert("success", "Berhasil Update Data!");
      setRefreshData(true);
    })
    .catch((err) => {
      toastAlert("error", err.message);
      console.error(err);
    });
  }
  function updateTaskDataInProgress() {
    let data = {
      task_id: id_Task,
      status: 2
    };
    setRefreshData(false);
    updateTask(data).then((res) => {
       // console.log("update modal =>", res);
      toastAlert("success", "Berhasil Update Data!");
      setRefreshData(true);
    })
    .catch((err) => {
      toastAlert("error", err.message);
      console.error(err);
    });
  }
  function updateTaskDataDone() {
    let data = {
      task_id: id_Task,
      status: 3
    };
    setRefreshData(false);
    updateTask(data).then((res) => {
       // console.log("update modal =>", res);
      toastAlert("success", "Berhasil Update Data!");
      setRefreshData(true);
    })
    .catch((err) => {
      toastAlert("error", err.message);
      console.error(err);
    });
  }

  function updateTaskPriority(priority) {
    let data = {
      task_id: id_Task,
      prioritas: priority
    };
    setRefreshData(false);
    updateTask(data).then((res) => {
      toastAlert("success", "Berhasil Update Data!");
      setRefreshData(true);
    })
    .catch((err) => {
      toastAlert("error", err.message);
      console.error(err);
    });
  }
  const countPages = count / limit;

  const taskPagination = () => {
    return (
      <>
        <ReactPaginate
          previousLabel={""}
          nextLabel={""}
          breakLabel="..."
          pageCount={Math.ceil(countPages) || 1}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          activeClassName="active"
          forcePage={currentPageTask !== 0 ? currentPageTask - 1 : 0}
          onPageChange={(pageSelected) => {
            setPageNumber(pageSelected.selected + 1);
          }}
          pageClassName="page-item"
          breakClassName="page-item"
          nextLinkClassName="page-link"
          pageLinkClassName="page-link"
          breakLinkClassName="page-link"
          previousLinkClassName="page-link"
          nextClassName="page-item next-item"
          previousClassName="page-item prev-item"
          containerClassName={
            "pagination react-paginate separated-pagination justify-content-center mt-5"
          }
        />
      </>
    );
  };

  const renderTasks = () => {
    return (
      <PerfectScrollbar
        className="list-group todo-task-list-wrapper"
        // options={{ wheelPropagation: false }}
        containerRef={(ref) => {
          if (ref) {
            ref._getBoundingClientRect = ref.getBoundingClientRect;

            ref.getBoundingClientRect = () => {
              const original = ref._getBoundingClientRect();

              return { ...original, height: Math.floor(original.height) };
            };
          }
        }}
      >
        {listDataTask.length ? (
          <ReactSortable
            tag="ul"
            list={tasks}
            // handle=".drag-icon"
            className="todo-task-list media-list"
            setList={() => {}}
          >
            {listDataTask.map((item, index) => {
              return (
                <li
                  key={item.id}
                  className={classnames("todo-item", {
                    completed: item.isCompleted
                  })}
                >
                  <div
                    className="todo-title-wrapper"
                    onClick={() => dispatch(idTask({ idTask: item.task_id }))}
                  >
                    <div className="todo-title-area">
                      <MoreVertical className="drag-icon" />
                      <UncontrolledButtonDropdown className="side-button">
                        <DropdownToggle className="border-0" color="">
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "4px"
                            }}
                            className={`${
                              item.status === "TO DO"
                                ? "graytask"
                                : item.status === "IN PROGRESS"
                                ? "bluetask"
                                : item.status === "DONE"
                                ? "greentask"
                                : "whitetask"
                            }`}
                          ></div>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            onClick={() => updateTaskDataTodo()}
                            className={
                              item.status === "TO DO" ? "d-none" : "d-flex"
                            }
                          >
                            <div
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "4px"
                              }}
                              className="graytask me-3"
                            ></div>
                            To Do
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => updateTaskDataInProgress()}
                            className={
                              item.status === "IN PROGRESS"
                                ? "d-none"
                                : "d-flex"
                            }
                          >
                            <div
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "4px"
                              }}
                              className="bluetask me-3"
                            ></div>{" "}
                            In Progress
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => updateTaskDataDone()}
                            className={
                              item.status === "DONE" ? "d-none" : "d-flex"
                            }
                          >
                            <div
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "4px"
                              }}
                              className="greentask  me-3"
                            ></div>{" "}
                            Done
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>

                      <span
                        onClick={showModalTugas}
                        className="todo-title me-5"
                      >
                        {item.description}
                      </span>
                      <div
                        title="Attachments"
                        className={` badge-wrapper me-5 ${
                          item.attachments.length > 0 ? "" : "d-none"
                        }`}
                      >
                        <Attach24Filled
                          style={{
                            width: "20px",
                            color: "#A0AEC0",
                            opacity: "0.5"
                          }}
                          height="100%"
                        />
                      </div>

                      <UncontrolledButtonDropdown className="side-button">
                        <DropdownToggle className="border-0" color="">
                          <Badge
                            className={`text-capitalize me-5 py-2 px-3 text-${
                              item.priority_value == 1 ? "red-700" : 
                              item.priority_value == 2 ? "warning-700" :
                              item.priority_value == 3 ? "info-600" :
                              item.priority_value == 4 ? "tertiary-700" :
                              "tertiary-600"
                            }`}
                            color="light"
                            pill
                          >
                            <Flag28Filled
                              className={`me-2 ${item.priority_value < 5 && item.priority_value > 0 ? '':'d-none'}`}
                            />
                            <span>{
                              item.priority_value == 1 ? "Darurat" : 
                              item.priority_value == 2 ? "Tinggi" :
                              item.priority_value == 3 ? "Normal" :
                              item.priority_value == 4 ? "Rendah" :
                              "Tidak Ada"
                            }</span>
                          </Badge>
                        </DropdownToggle>
                        <DropdownMenu>
                          {[5,4,3,2,1].map((n) => (
                            (n != item.priority_value) ? 
                            <DropdownItem
                              key={`priority-task-${item.id}${n}`}
                              onClick={() => updateTaskPriority(n)}
                            >
                              <Badge
                                className={`text-capitalize me-5 py-2 px-3 text-${
                                  n == 1 ? "red-700" : 
                                  n == 2 ? "warning-700" :
                                  n == 3 ? "info-600" :
                                  n == 4 ? "tertiary-700" :
                                  "tertiary-600"
                                }`}
                                color="light"
                                pill
                              >
                                <Flag28Filled
                                  className={`me-2 ${n  < 5? '':'d-none'}`}
                                />
                                <span>{
                                  n == 1 ? "Darurat" : 
                                  n == 2 ? "Tinggi" :
                                  n == 3 ? "Normal" :
                                  n == 4 ? "Rendah" :
                                  "Tidak Ada"
                                }</span>
                              </Badge>
                            </DropdownItem>:
                            <></>
                          ))}
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                      {/* 
                      <div
                        style={{ borderWidth: "5px", borderColor: "#A0AEC0" }}
                        title="Tracking time"
                        className={` me-5  ${item.track_duration ? "" : "d-none"
                          }`}
                      >
                        {item.status === "TO DO" ? (
                          <Pause24Regular
                            style={{
                              width: "20px",
                              color: "#A0AEC0",
                              opacity: "0.5"
                            }}
                            height="100%"
                          />
                        ) : item.status === "IN PROGRESS" ? (
                          <Play24Regular
                            style={{
                              width: "20px",
                              color: "#A0AEC0",
                              opacity: "0.5"
                            }}
                            height="100%"
                          />
                        ) : item.status === "DONE" ? (
                          <RecordStop24Regular
                            style={{
                              width: "20px",
                              color: "#A0AEC0",
                              opacity: "0.5"
                            }}
                            height="100%"
                          />
                        ) : (
                          <RecordStop24Regular
                            style={{
                              width: "20px",
                              color: "#A0AEC0",
                              opacity: "0.5"
                            }}
                            height="100%"
                          />
                        )}

                        <span
                          style={{ fontSize: "16px", fontWeight: "400" }}
                          className={` ${item.status === "IN PROGRESS"
                              ? "red-500"
                              : "tertiary-500"
                            } `}
                        >
                          <span className="me-5"> {item.track_duration}</span>
                        </span>
                      </div> */}
                      <div
                        // style={{ borderWidth: "5px", borderColor: "#A0AEC0" }}
                        title="Subtask"
                        className={` badge-wrapper me-5  ${
                          item.sub_task_count > 0 ? "" : "d-none"
                        }`}
                      >
                        <BranchFork24Filled
                          style={{
                            width: "20px",
                            color: "#A0AEC0",
                            opacity: "0.5"
                          }}
                          height="100%"
                        />
                        {item.sub_task_count}
                      </div>
                      <div
                        title="Description"
                        className={` badge-wrapper me-5  ${
                          item.description_text ? "" : "d-none"
                        }`}
                      >
                        <TextDescription24Filled
                          style={{
                            width: "20px",
                            color: "#A0AEC0",
                            opacity: "0.5"
                          }}
                          height="100%"
                        />
                      </div>
                      <div
                        title="Okr"
                        className={` badge-wrapper me-5  ${
                          item.id_okr ? "" : "d-none"
                        }`}
                      >
                        <TargetArrow24Filled
                          style={{
                            width: "20px",
                            color: "#A0AEC0",
                            opacity: "0.5"
                          }}
                          height="100%"
                        />
                      </div>
                      {item.assigned_employees.map((item, index) => (
                        <Avatar
                          key={`assingee-task-${item.id}${index}`}
                          className="photo-karyawan"
                          img={item.photo}
                          imgHeight="32"
                          imgWidth="32"
                        />
                      ))}
                    </div>
                    <div className="todo-item-action mt-lg-0 mt-50">
                      <div title="delete" className={` badge-wrapper me-5`}>
                        <Delete24Filled
                          onClick={() => setModal(!modal)}
                          style={{
                            width: "20px",
                            color: "#A0AEC0",
                            opacity: "0.8"
                          }}
                          height="100%"
                        />
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ReactSortable>
        ) : (
          <div className="no-results show">
            <h5> Data not found </h5>
          </div>
        )}
        {listDataTask.length > 9 ? (
          <div
            className="list-group todo-task-list-wrapper"
            // options={{ wheelPropagation: false }}
          >
            {taskPagination()}
          </div>
        ) : (
          <></>
        )}
      </PerfectScrollbar>
    );
  };

  const handleFilter = (e) => {
    setQuery(e.target.value);
    dispatch(getTasks(params));
  };

  const handleSort = (e, val) => {
    e.preventDefault();
    setSort(val);
    dispatch(getTasks({ ...params }));
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getTaskData();
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
    
  }, [searchKeyword]);

  useEffect(() => {
    if ( category ) {
      if (params.filter){
        if (params.filter == category) {
          getTaskData();
        }
      } else {
        getTaskData();
      }
    }
  }, [category, pageNumber, limit]);
  
  useEffect(() => {
    if (refreshData) {
      getTaskData();
    }
  }, [refreshData]);

  useEffect(() => {
    if (!successCreateTugas) {
      getTaskData();
    }
  }, [successCreateTugas]);
  

  useEffect(() => {
    dispatch(selectPermohonanId({ selectedPermohonanId: "" }));
    dispatch(categoryTask(params.filter || "today" ));
  }, [1]);

  return (
    <div className="todo-app-list">
      <div className="app-fixed-search d-flex align-items-center">
        <div
          className="sidebar-toggle cursor-pointer d-block d-lg-none ms-1"
          onClick={handleMainSidebar}
        >
          <Menu size={21} />
        </div>
        <div
          className="d-flex align-content-center justify-content-between w-100"
        >
          <InputGroup className="input-group-merge">
            <InputGroupText>
              <Search className="text-muted" size={14} />
            </InputGroupText>
            <Input
              placeholder="Search task"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </InputGroup>
        </div>
      </div>
      {renderTasks()}
      <div className="demo-inline-spacing">{renderModal}</div>;
      <ModalTask />
    </div>
  );
};

export default Tasks;
