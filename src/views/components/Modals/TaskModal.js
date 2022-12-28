import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTimeManagementV2,
  updateTask,
  postComent,
  addTask,
  getTimeLog,
  postTrackingTime,
  getOkrId
} from "../../api";
import { mobileVersion } from "../../store";
import ReactDatePicker from "react-datepicker";
import Modal from ".";
import "../DatePicker/DatePicker.css";
import ProfilePicture from "../Image/ProfilePicture";
import ScrollBar from "react-perfect-scrollbar";
import moment from "moment";
import toastAlert from "../../utils/alert";
import { EditFilled, DeleteFilled, InfoRegular } from "fluent-icons-react";
import { getUserData } from "../../utils/storage.js";
import Spinner from "../Content/Spinner";

export default function TaskModal() {
  const datauser = getUserData();
  const dispatch = useDispatch();
  const isDetailTask = useSelector((state) => state.isDetailTask);
  const { userData } = useSelector((state) => state.auth);
  // detail task
  const isDetailTaskId = useSelector((state) => state.isDetailTaskId);
  const { isIdOkr } = useSelector((state) => state);
  const { isIdTimeTracking } = useSelector((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  //
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const isBuatTugas = useSelector((state) => state.isBuatTugas);
  const [listComent, setListComent] = useState([]);
  const [subtask, setSubTask] = useState("");
  const [listdataTaskId, setListdataTaskid] = useState([]);
  const [timeLog, setTimeLog] = useState([]);
  const [timeday, settimeDay] = useState(0);
  const [timeHour, setTimeHour] = useState(0);
  const [timeMinute, setTimeMinute] = useState(0);
  const [timeSecond, setTimeSecond] = useState(0);
  const [showStatusProgress, setShowStatusProgress] = React.useState(false);
  const [showTrackingTime, setShowTrackingtime] = React.useState(false);
  const [showRiwayatTime, setShowRiwayatTime] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    React.useState(false);
  const [timeTask, setTimeTask] = React.useState([]);
  const [listAssignedEmployee, setAssigndEmployee] = React.useState([]);
  const [trackingTimeTask, setTrackingTimeTask] = React.useState([]);
  const [listLampiran, setListLampiran] = React.useState([]);
  const [listSubtask, setListSubtask] = React.useState([]);
  //
  const [coment, setComent] = useState("");
  const [atachement, setAtachement] = useState([]);
  const [showSnakebar, setShowSnakebar] = React.useState(false);
  const [listOkrId, setListOkrId] = React.useState([]);
  const [successCreateSubtask, setSuccesCreateSubtask] = React.useState(false);
  const [succesUpdateTodo, setSuccesUpdateTodo] = React.useState(false);
  const [succesUpdateInprogress, setSuccesUpdateInprogress] =
    React.useState(false);
  const [succesUpdateDone, setSuccesUpdateDone] = React.useState(false);
  const [successUpdateTimeTracking, setSuccessUpdateTimeTracking] =
    React.useState(false);
  const [successDeleteTimeTracking, setSuccesDeleteTimeTracking] =
    React.useState(false);

  // task
  function getTaskDataDetail() {
    getTimeManagementV2(
      `activity?tipe=0&id=${isDetailTaskId}&nik=${datauser.user}`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
       // console.log("List Data Task id => ", tempList);
      setListdataTaskid(tempList);
      setAssigndEmployee(tempList.assigned_employees);
      setTrackingTimeTask(tempList.tracking_time);
      setListLampiran(tempList.attachments);
      setListSubtask(tempList.sub_task);
    });
  }

  function getOkrById() {
    getOkrId(`${isIdOkr}`).then((res) => {
      var tempList = [];
      tempList = res.data.data;
       // console.log("List OKR Id => ", tempList);
      setListOkrId(tempList);
    });
  }

  // time tracking
  function getTimeTracking() {
    getTimeLog(`/tracking_time?id_task=${isDetailTaskId}`).then((res) => {
      var tempList = [];
      tempList = res.data.data;
       // console.log("List time tracking => ", tempList);
      setTimeLog(tempList);
      setTimeTask(tempList.task_tracking);
    });
  }

  function editTimeTracking() {
    let timeduration =
      timeday * 86400 + timeHour * 3600 + timeMinute * 60 + timeSecond;
    let update = timeduration.toString();
    let data = {
      tracking_id: isIdTimeTracking,
      action: "update",
      duration: update,
      userTimezone: "GMT+7"
    };
    postTrackingTime(data).then((res) => {
       // console.log("edit time tracking =>", res);
      setShowSnakebar(true);
      toastAlert("success", "Berhasil Update Data!");
    });
    setSuccessUpdateTimeTracking(true);
  }

  function deleteTimeTracking() {
    let data = {
      tracking_id: isIdTimeTracking,
      action: "delete",
      duration: "10",
      userTimezone: "GMT+7"
    };
    postTrackingTime(data).then((res) => {
       // console.log("delete time tracking =>", res);
      setShowSnakebar(true);
      toastAlert("success", "Berhasil Delete Data!");
    });
    setSuccesDeleteTimeTracking(true);
  }

  function postSubtask() {
    let data = {
      task_id: isDetailTaskId,
      action: "sub_task",
      app_version: "5.0.5",
      user_timezone: "GMT+7",
      sub_tasks: [
        {
          sub_task_name: subtask,
          nik: datauser.user
        }
      ]
    };
    addTask(data).then((res) => {
       // console.log("post Subtask =>", res);
      setShowSnakebar(true);
      toastAlert("success", "Berhasil Update Data!");
      setSuccesCreateSubtask(true);
      setSubTask("");
      setIsLoading(false);
      toastAlert("success", "Berhasil Post Data!");
    });
  }

  function updateTaskDataTodo(id) {
    let data = {
      task_id: id,
      status: 1
    };
    updateTask(data).then((res) => {
       // console.log("update modal =>", res);
      setShowSnakebar(true);
      toastAlert("success", "Berhasil Update Data!");
      setSuccesUpdateTodo(true);
    });
  }
  function updateTaskDataInProgress(id) {
    let data = {
      task_id: id,
      status: 2
    };
    updateTask(data).then((res) => {
       // console.log("update modal =>", res);
      setShowSnakebar(true);
      toastAlert("success", "Berhasil Update Data!");
      setSuccesUpdateInprogress(true);
    });
  }
  function updateTaskDataDone(id) {
    let data = {
      task_id: id,
      status: 3
    };
    updateTask(data).then((res) => {
       // console.log("update modal =>", res);
      setShowSnakebar(true);
      toastAlert("success", "Berhasil Update Data!");
      setSuccesUpdateDone(true);
    });
  }

  // comment
  function updateComent() {
    let data = {
      id: isDetailTaskId,
      tipe: 2,
      comment_flag: "",
      comment: coment,
      attachment_file_names: atachement
    };
    postComent(data).then((res) => {
       // console.log("update coment data =>", res);
    });
  }

  function getComment() {
    getTimeManagementV2(
      `comments?tipe=2&id=${isDetailTaskId}&limit=10&offset=0&userTimezone=GMT%2B7&nik=${userData.username}&appVersion=${mobileVersion}`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
       // console.log("List Data comment => ", tempList);
      setListComent(tempList);
    });
  }

  useEffect(() => {
    if (isDetailTask) {
      getTaskDataDetail();
      getOkrById();
      getComment();
      getTimeTracking();
    }
    if (successCreateSubtask) {
      setSubTask("");
    }
  }, [
    successCreateSubtask,
    isDetailTask,
    successCreateSubtask,
    succesUpdateTodo,
    succesUpdateInprogress,
    succesUpdateDone,
    successUpdateTimeTracking,
    successDeleteTimeTracking
  ]);

  return (
    <>
      {isDetailTask ? (
        <>
          <Modal className="rounded-3xl">
            <div className="relative w-1/2 mx-auto rounded-3xl">
              <div className="border-0 shadow-lg relative flex flex-col w-full rounded-3xl bg-white outline-none focus:outline-none pb-10">
                {/*header*/}
                <div className="flex flex-wrap items-center rounded-t-3xl bg-green-300 border-tertiary-400 pl-8 py-5">
                  <div className="relative w-full px-2 max-w-full flex-grow flex-1">
                    <span className="text-white fw-bold text-xl">Tugas</span>
                  </div>
                  <div
                    className="relative flex-row-reverse pr-3 cursor-pointer"
                    onClick={() => {
                      dispatch({ type: "set", isDetailTask: false });
                    }}
                  >
                    <img
                      alt="..."
                      src={
                        process.env.REACT_APP_API_URL_MAINAPP +
                        "/assets/icons/dismiss-green.svg"
                      }
                      className={"w-5"}
                    ></img>{" "}
                  </div>
                </div>
                {/*body*/}
                <div className="flex grid-cols-2">
                  <div className="flex relative border-b-2 w-1/2">
                    <div className="border-0 fw-bold py-2 w-full text-tertiary-900 relative bg-transparent rounded text-sm outline-none focus:outline-none focus:ring pl-7">
                      <div className="flex-row flex">
                        {listdataTaskId.priority === 4 ? (
                          <div
                            className="flex-row flex pl-3 rounded-lg ml-3 w-28 my-2 mr-2"
                            onClick={() => {
                              setPrioritasNull(4);
                              setPriority(false);
                            }}
                            style={{
                              backgroundColor: "#C6F6D5"
                            }}
                          >
                            <img
                              alt="..."
                              className=""
                              src={
                                process.env.REACT_APP_API_URL_MAINAPP +
                                "/assets/icons/flag-low.svg"
                              }
                            />
                            <span className="font-normal text-base py-2 px-4 text-green-600">
                              Low
                            </span>
                          </div>
                        ) : listdataTaskId.priority === 2 ? (
                          <div
                            className="flex-row flex pl-3 rounded-lg ml-3 w-28 my-2 mr-2"
                            onClick={() => {
                              setPrioritasNull(2);
                              setPriority(false);
                            }}
                            style={{
                              backgroundColor: "#FEFCBF"
                            }}
                          >
                            <img
                              alt="..."
                              className=""
                              src={
                                process.env.REACT_APP_API_URL_MAINAPP +
                                "/assets/icons/flag-high.svg"
                              }
                            />
                            <span
                              className="font-normal text-base  py-2 px-4 rounded-xl"
                              style={{
                                color: "#D69E2E"
                              }}
                            >
                              High
                            </span>
                          </div>
                        ) : listdataTaskId.priority === 3 ? (
                          <div
                            className="flex-row flex pl-3 rounded-lg ml-3 w-28 my-2 mr-2"
                            onClick={() => {
                              setPrioritasNull(3);
                              setPriority(false);
                            }}
                            style={{
                              backgroundColor: "#EDF2F7"
                            }}
                          >
                            <img
                              alt="..."
                              className=""
                              src={
                                process.env.REACT_APP_API_URL_MAINAPP +
                                "/assets/icons/flag-normal.svg"
                              }
                            />
                            <span
                              className="font-normal text-base py-2 px-4 rounded-xl"
                              style={{
                                color: "#718096"
                              }}
                            >
                              Normal
                            </span>
                          </div>
                        ) : listdataTaskId.priority === 1 ? (
                          <div
                            className="flex-row flex pl-3 rounded-lg ml-3 w-28 my-2 mr-2"
                            onClick={() => {
                              setPrioritasNull(1);
                              setPriority(false);
                            }}
                            style={{
                              backgroundColor: "#FEEBC8"
                            }}
                          >
                            <img
                              alt="..."
                              className=""
                              src={
                                process.env.REACT_APP_API_URL_MAINAPP +
                                "/assets/icons/flag-urgent.svg"
                              }
                            />
                            <span
                              className="font-normal text-base py-2 px-4 rounded-xl"
                              style={{
                                color: "#DD6B20"
                              }}
                            >
                              Urgent
                            </span>
                          </div>
                        ) : (
                          <span className="font-normal text-base text-tertiary-700 hidden bg-tertiary-100 p-2 rounded-xl mr-3">
                            Tidak ada
                          </span>
                        )}
                        {listAssignedEmployee.map((item) => (
                          <span className="inline-flex items-center justify-center">
                            <ProfilePicture
                              className="w-10 h-10"
                              src={item.photo || "https://ibb.co/4YxxfNY"}
                            />
                          </span>
                        ))}
                        <span
                          className={`inline-flex items-center ml-7 ${
                            listdataTaskId.status === "TO DO"
                              ? "text-grey-70"
                              : listdataTaskId.status === "IN PROGRESS"
                              ? "text-blue-600"
                              : listdataTaskId.status === "DONE"
                              ? "text-green-600"
                              : ""
                          }`}
                        >
                          {trackingTimeTask.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex relative border-b-2 w-1/2">
                    <div className="border-0 fw-bold py-2 w-full text-tertiary-900 relative bg-transparent rounded text-sm outline-none focus:outline-none focus:ring pl-7">
                      <div className="flex-row flex">
                        <span className="font-normal text-tertiary-600 text-base py-2 px-4 rounded-xl ml-3">
                          Dibuat
                        </span>
                        <span className="fw-bold text-tertiary-600 text-base py-2 px-4 rounded-xl">
                          {listdataTaskId.start_date}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full">
                  <ScrollBar>
                    <div className="h-98 relative px-6 pt-6 grid-cols-2">
                      <form className="">
                        <div className=" flex flex-row align-middle mb-8">
                          <label className="text-sm fw-bold pr-5">
                            Status Task
                          </label>

                          <div className="flex flex-row align-middle mr-5">
                            <label className="text-sm fw-bold  text-tertiary-600 pr-2">
                              To do
                            </label>
                            {listdataTaskId.status === "TO DO" ? (
                              <div className="w-5 h-5 rounded bg-tertiary-400"></div>
                            ) : (
                              <div
                                className="w-5 h-5 rounded bg-white border-2 cursor-pointer"
                                onClick={() => {
                                  updateTaskDataTodo(isDetailTaskId);
                                }}
                              ></div>
                            )}
                          </div>
                          <div className="flex flex-row align-middle mr-5">
                            <label className="text-sm fw-bold  text-tertiary-600 pr-2">
                              In Progress
                            </label>
                            {listdataTaskId.status === "IN PROGRESS" ? (
                              <div className="w-5 h-5 rounded bg-accentInformation-500"></div>
                            ) : (
                              <div
                                className="w-5 h-5 rounded bg-white border-2 cursor-pointer"
                                onClick={() => {
                                  updateTaskDataInProgress(isDetailTaskId);
                                }}
                              ></div>
                            )}
                          </div>
                          <div className="flex flex-row align-middle mr-5">
                            <label className="text-sm fw-bold  text-tertiary-600 pr-2">
                              Done
                            </label>
                            {listdataTaskId.status === "DONE" ? (
                              <div className="w-5 h-5 rounded bg-accentSuccess-500"></div>
                            ) : (
                              <div
                                className="w-5 h-5 rounded bg-white border-2 cursor-pointer"
                                onClick={() => {
                                  updateTaskDataDone(isDetailTaskId);
                                }}
                              ></div>
                            )}
                          </div>
                        </div>

                        <div className="relative w-full mb-8">
                          <label
                            className="block text-black text-sm fw-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Nama Tugas
                          </label>
                          <input
                            type="text"
                            name="acara"
                            className="px-4 py-3 placeholder-tertiary-300 border text-black bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={listdataTaskId.description}
                            disabled
                          />
                        </div>
                        <div className="flex flex-row w-full mb-8">
                          <div className=" grid-cols-2- pr-4">
                            <label
                              className="block text-black text-sm fw-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Tanggal Mulai
                            </label>
                            <div className="flex flex-row">
                              <div className="relative flex flex-row w-full mb-4">
                                <div className="flex flex-row w-full">
                                  <div className="mt-1 relative rounded-md shadow-sm w-full">
                                    <div className="w-full">
                                      <div className="placeholder-slate-300 border text-black bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                        <div
                                          className={
                                            "picker-error picker-touched"
                                          }
                                        >
                                          <ReactDatePicker
                                            selected={startDate}
                                            dateFormat="dd/MM/yyyy"
                                            value={listdataTaskId.start_date}
                                            onChange={(date) =>
                                              setStartDate(date)
                                            }
                                            disabled
                                          />
                                        </div>
                                      </div>
                                      <div className="absolute inset-y-0 right-0 flex items-center px-3 border rounded bg-tertiary-20">
                                        <span className="text-gray-500 sm:text-sm">
                                          <img
                                            alt="..."
                                            className="w-5"
                                            src={
                                              process.env
                                                .REACT_APP_API_URL_MAINAPP +
                                              "/assets/icons/calendar-grey.svg"
                                            }
                                          />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="grid-cols-2 pl-4">
                            <label
                              className="block text-black text-sm fw-bold mb-2"
                              htmlFor="grid-password"
                            >
                              Tanggal Berakhir
                            </label>
                            <div className="flex flex-row">
                              <div className="relative flex flex-row w-full mb-4">
                                <div className="flex flex-row w-full">
                                  <div className="mt-1 relative rounded-md shadow-sm w-full">
                                    <div className="w-full">
                                      <div className="placeholder-slate-300 border text-black bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
                                        <div
                                          className={
                                            "picker-error picker-touched"
                                          }
                                        >
                                          <ReactDatePicker
                                            selected={endDate}
                                            value={listdataTaskId.end_date}
                                            dateFormat="dd/MM/yyyy"
                                            onChange={(date) =>
                                              setEndDate(date)
                                            }
                                            disabled
                                          />
                                        </div>
                                      </div>
                                      <div className="absolute inset-y-0 right-0 flex items-center px-3 border rounded bg-tertiary-20">
                                        <span className="text-gray-500 sm:text-sm">
                                          <img
                                            alt="..."
                                            className="w-5"
                                            src={
                                              process.env
                                                .REACT_APP_API_URL_MAINAPP +
                                              "/assets/icons/calendar-grey.svg"
                                            }
                                          />
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="relative w-full mb-8">
                          <label
                            className="block text-black text-sm fw-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Deskripsi
                          </label>
                          <textarea
                            rows="6"
                            value={listdataTaskId.description_text}
                            placeholder=""
                            className="px-4 py-3 placeholder-tertiary-300 border text-black bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            name="message"
                            id="message"
                            disabled
                          ></textarea>
                        </div>

                        <div className="relative w-full mb-8">
                          <label
                            className="block text-black text-sm fw-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Label
                          </label>
                          <input
                            type="text"
                            name="acara"
                            className="px-4 py-3 placeholder-tertiary-300 border text-black bg-white rounded text-sm focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            value={listdataTaskId.label}
                            placeholder=""
                            disabled
                          />
                        </div>
                        <div className="relative w-full mb-8">
                          <label
                            className="block text-black text-sm fw-bold"
                            htmlFor="grid-password"
                          >
                            Lampiran
                          </label>
                          <div className="flex">
                            {listLampiran.map((item) => (
                              <span
                                key={item.attachment_id}
                                className=" items-center justify-center mb-2"
                              >
                                <img
                                  className="w-20"
                                  src={
                                    item.file_path || "https://ibb.co/4YxxfNY"
                                  }
                                />
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="relative w-full mb-8">
                          <label
                            className="block text-black text-sm fw-bold mb-2"
                            htmlFor="grid-password"
                          >
                            OKR
                          </label>
                          <label className="block text-tertiary-600 text-sm fw-bold mb-2">
                            {listdataTaskId.nama_okr}
                          </label>
                        </div>
                        <div className="relative w-full">
                          <label
                            className="block text-black text-sm fw-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Action
                          </label>
                          <div className="mb-4">
                            {listSubtask.map((item) => (
                              <div
                                key={item.id}
                                className="flex mb-3 cursor-pointer"
                                onClick={() => {
                                  setShowStatusProgress(!showStatusProgress);
                                }}
                              >
                                <div
                                  className={`w-8 h-8 rounded mr-2 ${
                                    item.status === "TO DO"
                                      ? "bg-tertiary-800"
                                      : item === "IN PROGRESS"
                                      ? "bg-accentInformation-600"
                                      : item.status === "DONE"
                                      ? "bg-green-600"
                                      : item.length < 1
                                      ? "hidden"
                                      : "hidden"
                                  }`}
                                ></div>
                                <span className="inline-flex items-center text-base text-tertiary-600 justify-center md:mr-9">
                                  {item.sub_task_name}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div
                            className={`${
                              showStatusProgress ? "" : "hidden"
                            } flex flex-col align-middle mb-4 border-2 rounded py-6 px-4 gap-y-7 w-32`}
                          >
                            <div className="flex flex-row align-middle">
                              <div className="w-5 h-5 rounded bg-tertiary-800"></div>
                              <label className="text-xs fw-bold  text-tertiary-600 ml-2">
                                Todo
                              </label>
                            </div>
                            <div className="flex flex-row align-middle">
                              <div className="w-5 h-5 rounded bg-accentInformation-500"></div>
                              <label className="text-xs fw-bold  text-tertiary-600 ml-2">
                                Progress
                              </label>
                            </div>
                            <div className="flex flex-row align-middle">
                              <div className="w-5 h-5 rounded bg-accentSuccess-500"></div>
                              <label className="text-xs fw-bold  text-tertiary-600 ml-2">
                                Done
                              </label>
                            </div>
                          </div>

                          <div className="flex w-full">
                            <div className="w-9 h-9 bg-white border-2 rounded mr-2"></div>
                            <div className=" relative rounded-md w-full shadow-sm">
                              <div
                                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                onClick={() => {
                                  postSubtask();
                                  setSubTask("");
                                  setIsLoading(true)
                                }}
                              >
                                <span className="text-green-600 text-xs sm:text-sm">
                                  {" "}
                                  Simpan{" "}
                                </span>
                              </div>
                              <input
                                type="text"
                                className="focus:ring-indigo-500 w-full border-2 h-9 focus:border-indigo-500 block pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="tambah action"
                                onChange={(e) => setSubTask(e.target.value)}
                                value={subtask}
                              />
                            </div>
                            {isLoading ? <Spinner /> : <></>}
                          </div>

                          <div className="flex w-full mt-5">
                            <span className="relative cursor-pointer text-tertiary-600 text-sm w-11/12">
                              Riwayat Time Track
                            </span>
                            <span
                              className="relative cursor-pointer text-green-600 text-xs"
                              onClick={() => {
                                setShowRiwayatTime(!showRiwayatTime);
                              }}
                            >
                              Lihat
                            </span>
                          </div>

                          <div className={`${showRiwayatTime ? "" : "hidden"}`}>
                            <div className="w-full mt-5">
                              <span className="block text-black text-sm fw-bold">
                                Nama Tugas
                              </span>
                              <span className="block text-tertiary-600 text-sm fw-bold mb-2">
                                {listdataTaskId.description}
                              </span>
                            </div>
                            {timeTask.map((item) => (
                              <div className="w-full mt-3 cursor-pointer">
                                <span className="block text-tertiary-600 text-xs cursor-pointer">
                                  {item.description}
                                </span>
                                <div className="flex mt-1">
                                  <span className=" cursor-pointer text-tertiary-600 text-sm w-11/12">
                                    {item.durasi} jam
                                  </span>
                                  <div
                                    className="mr-2 cursor-pointer"
                                    onClick={() => {
                                      dispatch({
                                        type: "set",
                                        isIdTimeTracking: item.id_tracking
                                      });
                                      setShowTrackingtime(!showTrackingTime);
                                    }}
                                  >
                                    <EditFilled color="#718096" size={20} />
                                  </div>
                                  <div
                                    className=""
                                    onClick={() => {
                                      dispatch({
                                        type: "set",
                                        isIdTimeTracking: item.id_tracking
                                      });
                                      setShowDeleteConfirmation(
                                        !showDeleteConfirmation
                                      );
                                    }}
                                  >
                                    <DeleteFilled color="#718096" size={20} />
                                  </div>
                                </div>
                              </div>
                            ))}

                            <div className="mt-3 border-b-2"></div>
                            <div
                              className={`bg-white h-24 w-72 rounded-md absolute bottom-3 shadow-md mt-3 ${
                                showDeleteConfirmation ? "" : "hidden"
                              }`}
                            >
                              <div className="mt-4">
                                <span className="px-5 text-black text-xs fw-bold">
                                  Apakah kamu yakin ingin menghapusnya?
                                </span>
                              </div>

                              <div className="flex flex-row-reverse mr-3 mt-1">
                                <button
                                  type="button"
                                  className=" bg-green-600 w-9  rounded-lg mr-3"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteTimeTracking();
                                  }}
                                >
                                  <span className="text-white fw-bold text-xs">
                                    Oke
                                  </span>
                                </button>
                                <button
                                  className=" bg-green-100 w-9 rounded-lg mr-3"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShowDeleteConfirmation(false);
                                  }}
                                >
                                  <span className="text-green-600 fw-bold text-xs">
                                    Batal
                                  </span>
                                </button>
                              </div>
                            </div>

                            <div
                              className={`bg-white h-52 w-80 rounded-md absolute bottom-3 shadow-md mt-3 ${
                                showTrackingTime ? "" : "hidden"
                              }`}
                            >
                              <span className="block cursor-pointer text-black text-base mt-5 ml-4">
                                Ubah Waktu Tracking Time
                              </span>
                              <div className="flex pl-7 mt-3">
                                <div className="flex-col mr-7 text-center">
                                  <input
                                    type="text"
                                    className="focus:ring-indigo-500 h-10 w-11 border-2 focus:border-indigo-500 block p-2 sm:text-sm border-gray-300 rounded-md"
                                    placeholder=""
                                    onChange={(e) => settimeDay(e.target.value)}
                                  />
                                  <span className="block cursor-pointer text-tertiary-500 text-sm">
                                    Hari
                                  </span>
                                </div>

                                <div className="flex-col mr-3 text-center">
                                  <input
                                    type="text"
                                    className="focus:ring-indigo-500 h-10 w-11 border-2 focus:border-indigo-500 block p-2 sm:text-sm border-gray-300 rounded-md"
                                    placeholder=""
                                    onChange={(e) =>
                                      setTimeHour(e.target.value)
                                    }
                                  />
                                  <span className="block cursor-pointer text-tertiary-500 text-sm">
                                    Jam
                                  </span>
                                </div>
                                <div className="mr-3 text-3xl text-tertiary-600 fw-bold">
                                  :
                                </div>
                                <div className="flex-col mr-3 text-center">
                                  <input
                                    type="text"
                                    className="focus:ring-indigo-500 h-10 w-11 border-2 focus:border-indigo-500 block p-2 sm:text-sm border-gray-300 rounded-md"
                                    placeholder=""
                                    onChange={(e) =>
                                      setTimeMinute(e.target.value)
                                    }
                                  />{" "}
                                  <span className="block cursor-pointer text-tertiary-500 text-sm">
                                    Menit
                                  </span>
                                </div>
                                <div className="mr-3 text-3xl text-tertiary-600 fw-bold">
                                  :
                                </div>
                                <div className="flex-col text-center">
                                  <input
                                    type="text"
                                    className="focus:ring-indigo-500 h-10 w-11 border-2 focus:border-indigo-500 block p-2 sm:text-sm border-gray-300 rounded-md"
                                    placeholder=""
                                    onChange={(e) =>
                                      setTimeSecond(e.target.value)
                                    }
                                  />{" "}
                                  <span className="block cursor-pointer text-tertiary-500 text-xs">
                                    Detik
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-wrap items-center justify-start ml-4 mt-3">
                                <div
                                  title="1 hari dihitung 24 jam"
                                  className="mr-2"
                                >
                                  <InfoRegular color="#718096" size={20} />
                                </div>
                                <span className="text-tertiary-600 text-xs fw-bold flex justify-center justify-items-center items-start">
                                  Masukkan Keterangan
                                </span>
                              </div>
                              <div className="flex flex-row-reverse mr-3 mt-1">
                                <button
                                  type="button"
                                  className=" bg-green-600 w-9 rounded-lg mr-3"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    editTimeTracking();
                                  }}
                                >
                                  <span className="text-white fw-bold text-xs">
                                    Oke
                                  </span>
                                </button>
                                <button
                                  className=" bg-green-100 w-9 rounded-lg mr-3"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setShowTrackingtime(false);
                                  }}
                                >
                                  <span className="text-green-600 fw-bold text-xs">
                                    Batal
                                  </span>
                                </button>
                              </div>
                            </div>

                            <div className="w-full mt-3">
                              <span className="block cursor-pointer text-tertiary-600 text-base">
                                Action
                              </span>
                              <span className=" cursor-pointer text-tertiary-600 text-sm">
                                Sub task
                              </span>
                            </div>
                            <div className="w-full mt-3">
                              <span className="block cursor-pointer text-tertiary-600 text-xs">
                                mulai 23/05/2022 09:00 WIB
                              </span>
                              <div className="flex mt-1">
                                <span className=" cursor-pointer text-tertiary-600 text-sm w-11/12">
                                  1 Hari | 20:00 12am
                                </span>
                                <div className="mr-2">
                                  <EditFilled color="#718096" size={20} />
                                </div>
                                <div className="">
                                  <DeleteFilled color="#718096" size={20} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </ScrollBar>
                  <div className="border-l-2 w-1/2">
                    <form className="w-full pl-4 pr-1 mt-3">
                      <ScrollBar>
                        <div className="h-96 mb-3">
                          {listComent.map((item) => (
                            <div className="relative flex mt-3">
                              <div className="text-sm fw-bold w-4/5  text-tertiary-600">
                                {item.comment_text}
                              </div>
                              <div className="text-sm fw-bold w-1/3  text-tertiary-600">
                                {item.comment_date_time}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollBar>
                      <div className="m-4 flex">
                        <input
                          className="rounded-l-lg p-2 border-t mr-0 border-b border-l text-black text-sm border-gray-200 bg-white w-full"
                          placeholder="Tambah Komen"
                          onChange={(e) => setComent(e.target.value)}
                        />
                        <button
                          className="px-3 rounded-r-lg bg-green-600  text-white text-sm fw-bold p-2 border-green-600 border-t border-b border-r"
                          onClick={() => {
                            updateComent();
                          }}
                        >
                          Kirim
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </>
      ) : null}
    </>
  );
}
