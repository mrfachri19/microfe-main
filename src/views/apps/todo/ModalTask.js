// ** React Imports
import React, { Fragment, useState, useEffect } from "react";
import { modalTugas, idTask } from "./store";
import {
  getTimeManagementV2,
  updateTask,
  postComent,
  addTask,
  getTimeLog,
  postTrackingTime,
  getOkrId,
  dataUser,
  updateTaskModal
} from "@src/api";
import { getUsernik } from "@src/utils/storage";
import moment from "moment";
import Avatar from "@components/avatar";
import ScrollBar from "react-perfect-scrollbar";
import Flatpickr from "react-flatpickr";
import toastAlert from "@src/utils/alert";
import { storeDataModal, toggleImageModal } from '@store/modalToggle';

// ** Reactstrap Imports
import {
  Badge,
  Button,
  Col,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Input,
  InputGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
  UncontrolledButtonDropdown
} from "reactstrap";

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
  RecordStop24Regular,
  DeleteFilled,
  EditFilled,
  InfoRegular,
  Send24Filled,
  SaveRegular
} from "@fluentui/react-icons";

// ** Third Party Components
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";

// ** Utils
import { useDispatch, useSelector } from "react-redux";
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
const defaultValues = {
  firstName: "Bob",
  lastName: "Barton",
  username: "bob.dev"
};

function EditUserExample() {
  const [show, setShow] = useState(true);
  const id_Task = useSelector((state) => state.todo.idTask.idTask);
  const datauser = getUsernik();
  const [listDetailtask, setListDetailtask] = useState({});
  const [trackingTimeTask, setTrackingTimeTask] = useState([]);
  const modalShow = useSelector((state) => state.todo.modaltask.modalTugas);
  const { mobileVersion } = useSelector((state) => state.global);

  const [listComent, setListComent] = useState([]);
  const [coment, setComent] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [listLampiran, setListLampiran] = React.useState([]);
  const [namaTask, setNamaTask] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [label, setLabel] = useState("");
  const [listSubtask, setListSubtask] = useState([]);
  const [subtask, setSubTask] = useState("");
  const [timeLog, setTimeLog] = useState([]);
  const [timeTask, setTimeTask] = useState([]);
  const [timeSubtask, setTimeSubtask] = useState([]);
  const [timeday, settimeDay] = useState(0);
  const [timeHour, setTimeHour] = useState(0);
  const [timeMinute, setTimeMinute] = useState(0);
  const [timeSecond, setTimeSecond] = useState(0);
  const [idTimetrack, setIdTimetrack] = useState(0);
  const [showTrackingTime, setShowTrackingTime] = useState(false);
  const [reloadDetail , setReloadDetail] = useState(false);
  const [successGetDetail , setSuccessGetDetail] = useState(false);
  const [hadChangges , setHadChangges] = useState(false);
  const dispatch = useDispatch();

  function unshowModal() {
    dispatch(modalTugas({ modalTugas: false }));
  }

  function getTaskDataDetail() {
    setSuccessGetDetail(false);
    getTimeManagementV2(`activity?tipe=0&id=${id_Task}&nik=${datauser}`).then(
      (res) => {
        var tempList = [];
        tempList = res.data.data;
         // console.log("List Data Task id => ", tempList);
        tempList.start_date = moment(tempList.start_date, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD");
        tempList.end_date = moment(tempList.end_date, "YYYY-MM-DD HH:mm").format("YYYY-MM-DD");
        setListDetailtask(tempList);
        setNamaTask(tempList.description);
        setDeskripsi(tempList.description_text);
        setStartDate(tempList.start_date);
        setEndDate(tempList.end_date);
        setLabel(tempList.label);

        // setAssigndEmployee(tempList.assigned_employees);
        setTrackingTimeTask(tempList.tracking_time);
        setListLampiran(tempList.attachments);
        setListSubtask(tempList.sub_task);
        setSuccessGetDetail(true);
      }
    )
    .catch((err) => {
      toastAlert("error", err.message);
      console.error(err);
    });
  }

  function showImage(data) {
    dispatch(toggleImageModal(true));
    dispatch(storeDataModal({
      image : data.file_path
    }));
  }

  function getTimeTracking() {
    getTimeLog(`/tracking_time?id_task=${id_Task}`).then((res) => {
      var tempList = [];
      tempList = res.data.data;
       // console.log("List time tracking => ", tempList);
      setTimeLog(tempList);
      setTimeTask(tempList.task_tracking);
      setTimeSubtask(tempList.sub_tasks);
    });
  }

  function postSubtask() {
    let data = {
      task_id: id_Task,
      action: "sub_task",
      app_version: "5.0.5",
      user_timezone: "GMT+7",
      sub_tasks: [
        {
          sub_task_name: subtask,
          nik: datauser
        }
      ]
    };
    addTask(data).then((res) => {
      //  // console.log("post Subtask =>", res);
      setSubTask("");
      toastAlert("success", "Sub task berhasil ditambahkan");
    });
  }

  function editTimeTracking() {
    let timeduration =
      timeday * 86400 + timeHour * 3600 + timeMinute * 60 + timeSecond;
    let update = timeduration.toString();
    let data = {
      tracking_id: idTimetrack,
      action: "update",
      duration: update,
      userTimezone: "GMT+7"
    };
    postTrackingTime(data).then((res) => {
      //  // console.log("edit time tracking =>", res);
      toastAlert("success", "Tugas berhasil diperbarui");
      setModal(true);
    });
  }

  function deleteTimeTracking() {
    let data = {
      tracking_id: idTimetrack,
      action: "delete",
      duration: "10",
      userTimezone: "GMT+7"
    };
    postTrackingTime(data).then((res) => {
      //  // console.log("delete time tracking =>", res);
      toastAlert("success", "Data telah dihapus");
      setModalHapus(true);
    });
  }

  function updateTaskDetail() {
    let datas = {
      task_id: id_Task,
      task_name: namaTask,
      description: deskripsi,
      start_date: startDate,
      end_date: endDate,
      label: label,
    };
    setReloadDetail(false);
    updateTaskModal(datas).then((res) => {
       // console.log("update detail  =>", res);
      // setShowSnakebar(true);
      toastAlert("success", "Data berhasil diperbarui");
      // dispatch(modalTugas({ modalTugas: false }));
      setReloadDetail(true);
      // setSuccesUpdateTodo(true);
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
    setReloadDetail(false);
    updateTask(data).then((res) => {
      toastAlert("success", "Berhasil Update Data!");
      setReloadDetail(true);
    })
    .catch((err) => {
      toastAlert("error", err.message);
      console.error(err);
    });
  }

  useEffect(() => {
    if (modalShow) {
      getTaskDataDetail();
      getComment();
      getTimeTracking();
    }
  }, [modalShow]);

  useEffect(() => {
    if (reloadDetail && modalShow) {
      getTaskDataDetail();
      getComment();
      getTimeTracking();
    }
  }, [reloadDetail]);

  useEffect(() => {
    if (listDetailtask && successGetDetail) {
      if (
        namaTask !== listDetailtask.description
        || deskripsi !== listDetailtask.description_text
        || label !== listDetailtask.label
        || startDate != listDetailtask.start_date
        || endDate != listDetailtask.end_date
      ){
        setHadChangges(true);
        // toastAlert("info", "berubah nih");
      } else {
        setHadChangges(false)
      }
    } else {
      setHadChangges(false)
    }
  },[successGetDetail, namaTask, deskripsi, label, startDate, endDate])
  //  // console.log(trackingTimeTask.duration);

  function updateTaskStatus(statusTugas) {
    let data = {
      task_id: id_Task,
      status: statusTugas
    };
    setReloadDetail(false);
    updateTask(data).then((res) => {
      //  // console.log("update modal =>", res);
      // setShowSnakebar(true);
      toastAlert("success", "Status tugas berhasil diperbarui");
      setReloadDetail(true);
    })
    .catch((err) => {
      toastAlert("error", err.message);
      console.error(err);
    });
  }
  function updateComent() {
    if (coment) {
      let data = {
        id: id_Task,
        tipe: 2,
        comment_flag: "",
        comment: coment,
        attachment_file_names: []
      };
      setReloadDetail(false);
      postComent(data).then((res) => {
        //  // console.log("update coment data =>", res);
        toastAlert("success", "Komentar telah ditambahakan");
        setComent("");
        setReloadDetail(true);
      })
      .catch((err) => {
        toastAlert("error", err.message);
        console.error(err);
      });
    }
  }
  function getComment() {
    getTimeManagementV2(
      `comments?tipe=2&id=${id_Task}&limit=10&offset=0&userTimezone=GMT%2B7&nik=${datauser}&appVersion=${mobileVersion}`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
       // console.log("List Data comment => ", tempList);
      setListComent(tempList);
    });
  }
  // ** Hooks
  const {
    control,
    formState: { errors }
  } = useForm({ defaultValues });

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
  const [modalHapus, setModalHapus] = useState(false);

  const renderModal = ModalConfig.map((item) => {
    return (
      <Fragment key={item.id}>
        <Modal
          key={item.id}
          isOpen={modal}
          toggle={() => setModal(false)}
          className={`modal-dialog-centered ${item.modalClass}`}
        >
          <ModalHeader toggle={() => setModal(false)}>
            Ubah Waktu Track time{" "}
          </ModalHeader>
          <ModalBody>
            <Row className="">
              <div className="d-inline-flex">
                <Input
                  className="ms-1"
                  value={timeday}
                  style={{ width: "15%" }}
                  onChange={(e) => settimeDay(e.target.value)}
                />
                <Input
                  className="ms-5"
                  value={timeHour}
                  style={{ width: "15%" }}
                  onChange={(e) => setTimeHour(e.target.value)}
                />
                <span className="ms-4 fs-10">:</span>
                <Input
                  className="ms-4"
                  value={timeMinute}
                  style={{ width: "15%" }}
                  onChange={(e) => setTimeMinute(e.target.value)}
                />
                <span className="ms-4 fs-10">:</span>
                <Input
                  className="ms-4"
                  value={timeSecond}
                  style={{ width: "15%" }}
                  onChange={(e) => setTimeSecond(e.target.value)}
                />
              </div>
            </Row>
            <Row className="mt-3">
              <div className="d-inline-flex">
                <span className="ms-5 fs-4">Hari</span>
                <span className="ms-10 fs-4">Jam</span>
                <span className=" fs-4" style={{ marginLeft: "65px" }}>
                  Menit
                </span>
                <span className=" fs-4" style={{ marginLeft: "65px" }}>
                  Detik
                </span>
              </div>
            </Row>
            <Row className="mt-3">
              <div className="d-inline-flex">
                <InfoRegular color="#718096" size={20} />
                <span className="ms-2 fs-4">Masukkan Keterangan</span>
              </div>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" outline onClick={() => editTimeTracking()}>
              OK
            </Button>
            <Button color="danger" outline>
              Batal
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  });

  const renderModalHapus = ModalConfig.map((item) => {
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
          isOpen={modalHapus}
          toggle={() => setModalHapus(false)}
          className={`modal-dialog-centered ${item.modalClass}`}
        >
          <ModalHeader toggle={() => setModalHapus(false)}>
            Hapus Waktu Track time{" "}
          </ModalHeader>
          <ModalBody>
            <span className="fs-4">Anda yakin hapus Time Tracking</span>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              outline
              onClick={() => deleteTimeTracking()}
            >
              OK
            </Button>
            <Button color="danger" outline>
              Batal{" "}
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  });

  return (
    <>
      {modalShow ? (
        <>
          <Fragment>
            <Modal
              isOpen={show}
              toggle={unshowModal}
              className={`modal-dialog-centered modal-lg`}
            >
              <ModalHeader
                className="bg-primary-100 border-bottom pt-5 pb-5"
                toggle={unshowModal}
              >
                <span className="text-primary-600"> Detail Tugas</span>
              </ModalHeader>
              <ModalBody className="pb-5 px-4">
                <Row className="border-bottom py-3 d-none" onSubmit={""}>
                  <Col md={6} xs={12}>
                    <div className="d-flex align-items-center  ">
                      <Badge
                        className={`text-capitalize me-5 py-2 px-3 text-${
                          listDetailtask.priority == 1 ? "red-700" : 
                          listDetailtask.priority == 2 ? "warning-700" :
                          listDetailtask.priority == 3 ? "info-600" :
                          listDetailtask.priority == 4 ? "tertiary-700" :
                          "tertiary-600"
                        }`}
                        color="light"
                        pill
                      >
                        <Flag28Filled
                          className={`me-2 ${listDetailtask.priority < 5? '':'d-none'}`}
                        />
                        <span>{
                          listDetailtask.priority == 1 ? "Darurat" : 
                          listDetailtask.priority == 2 ? "Tinggi" :
                          listDetailtask.priority == 3 ? "Normal" :
                          listDetailtask.priority == 4 ? "Rendah" :
                          "Tidak Ada"
                        }</span>
                      </Badge>

                      {listDetailtask.assigned_employees ? (
                        <>
                          {listDetailtask.assigned_employees.map((item, index) => (
                            <div key={`assingee-task-${index}`}>
                              <Avatar
                                className="photo-karyawan"
                                img={item.photo}
                                imgHeight="25"
                                imgWidth="25"
                              />
                            </div>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                      <span className="fs-4 ms-5">
                        {trackingTimeTask.duration}{" "}
                      </span>
                    </div>
                  </Col>
                  <Col md={6} xs={12}>
                    <Label className="form-label" for="lastName">
                      <b>Dibuat</b> {listDetailtask.start_date ? moment(listDetailtask.start_date, "YYYY-MM-DD HH:mm").format("D MMMM YYYY HH:mm") :''}
                    </Label>
                  </Col>
                </Row>
                <Row className="p-0 m-0" onSubmit={""}>
                  <Col md={6} xs={12} className="p-0 pt-4 pe-md-4 pb-4 pb-md-0 border-end">
                    <div className="d-flex flex-column h-100 flex-fill">
                      <ScrollBar style={{ maxHeight: '55vh', height:'auto' }}>
                        <div className="d-flex align-items-center mb-4">
                        <UncontrolledButtonDropdown className="side-button">
                          <DropdownToggle className="border-0" color="">
                            <Badge
                              className={`text-capitalize me-5 py-2 px-3 text-${
                                listDetailtask.priority == 1 ? "red-700" : 
                                listDetailtask.priority == 2 ? "warning-700" :
                                listDetailtask.priority == 3 ? "info-600" :
                                listDetailtask.priority == 4 ? "tertiary-700" :
                                "tertiary-600"
                              }`}
                              color="light"
                              pill
                            >
                              <Flag28Filled
                                className={`me-2 ${listDetailtask.priority < 5 && listDetailtask.priority > 0 ? '':'d-none'}`}
                              />
                              <span>{
                                listDetailtask.priority == 1 ? "Darurat" : 
                                listDetailtask.priority == 2 ? "Tinggi" :
                                listDetailtask.priority == 3 ? "Normal" :
                                listDetailtask.priority == 4 ? "Rendah" :
                                "Tidak Ada"
                              }</span>
                            </Badge>
                          </DropdownToggle>
                          <DropdownMenu>
                            {[5,4,3,2,1].map((n) => (
                              (n != listDetailtask.priority) ? 
                              <DropdownItem
                                key={`priority-task-${listDetailtask.id}${n}`}
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

                          {listDetailtask.assigned_employees ? (
                            <>
                              {listDetailtask.assigned_employees.map((item, index) => (
                                <div key={`assingee-task-${index}`}>
                                  <Avatar
                                    className="photo-karyawan"
                                    img={item.photo}
                                    imgHeight="25"
                                    imgWidth="25"
                                  />
                                </div>
                              ))}
                            </>
                          ) : (
                            <></>
                          )}
                          <span className="fs-4 ms-5">
                            {trackingTimeTask.duration}{" "}
                          </span>
                        </div>
                        <div className="mb-4">
                          <Label className="fs-4 p-0 text-primary">
                            Status Task
                          </Label>
                          <div className="d-flex">
                            <div
                              className="todo-status-detail cursor-pointer"
                              onClick={() => updateTaskStatus(1)}
                            >
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "4px"
                                }}
                                className={`${
                                  listDetailtask.status === "TO DO"
                                    ? "graytask"
                                    : "border"
                                }`}
                              ></div>
                              <Label className="fs-4 mx-3">To do</Label>
                            </div>
                            <div
                              className="todo-status-detail cursor-pointer"
                              onClick={() => updateTaskStatus(2)}
                            >
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "4px"
                                }}
                                className={`${
                                  listDetailtask.status === "IN PROGRESS"
                                    ? "bluetask"
                                    : "border"
                                }`}
                              ></div>
                              <Label className="fs-4 mx-3">In Progress</Label>
                            </div>
                            <div
                              className="todo-status-detail cursor-pointer"
                              onClick={() => updateTaskStatus(3)}
                            >
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "4px"
                                }}
                                className={`${
                                  listDetailtask.status === "DONE"
                                    ? "greentask"
                                    : "border"
                                }`}
                              ></div>
                              <Label className="fs-4 mx-3">Done</Label>
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <Label className="fs-4 p-0 text-primary">
                            Nama Tugas
                          </Label>
                          <Input
                            placeholder={listDetailtask.description}
                            value={namaTask}
                            onChange={(e) => setNamaTask(e.target.value)}
                          />
                        </div>
                        <Row className="m-0 mb-4 p-0">
                          <Col className="p-0 pe-md-2" md={6} sm={12}>
                            <Label className="fs-4 p-0 text-primary">
                              Tanggal Mulai
                            </Label>
                            <Flatpickr
                              id="due-date"
                              name="due-date"
                              className="form-control"
                              onChange={(date) => setStartDate(date)}
                              value={startDate}
                              options={{ dateFormat: "Y-m-d" }}
                            />
                          </Col>
                          <Col className="p-0 ps-md-2" md={6} sm={12}>
                            <Label className="fs-4 p-0 text-primary">
                              Tanggal Berakhir
                            </Label>
                            <Flatpickr
                              id="due-date"
                              name="due-date"
                              className="form-control"
                              onChange={(date) => setEndDate(date)}
                              value={endDate}
                              options={{ dateFormat: "Y-m-d" }}
                            />
                          </Col>
                        </Row>
                        <div className="mb-4">
                          <Label className="fs-4 p-0 text-primary">
                            Deskripsi
                          </Label>
                          <Input
                            type="textarea"
                            placeholder={listDetailtask.description_text}
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                          />
                        </div>
                        <div className="mb-4">
                          <Label className="fs-4 p-0 text-primary">
                            Label
                          </Label>
                          <Input
                            placeholder={listDetailtask.label || "Tambah label tugas"}
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                          />
                        </div>
                        <div
                          className={`mb-4 ${
                            listLampiran.length > 0 ? "" : "d-none"
                          }`}
                        >
                          <Label className="fs-4 p-0 text-primary">
                            Lampiran
                          </Label>
                          <div className="mini-box-img">
                            {listLampiran.map((item, index) => (
                                <img
                                  key={`lampiran-img-${index}`}
                                  alt={item.file_path}
                                  onClick={() =>showImage(item)}
                                  src={item.file_path}
                                />
                            ))}
                          </div>
                        </div>
                        <div
                          className={`mb-4 ${
                            listDetailtask.nama_okr ? "" : "d-none"
                          }`}
                        >
                          <Label className="fs-4 p-0 text-primary d-block">
                            OKR
                          </Label>
                          <Label className="fs-4">
                            {listDetailtask.nama_okr}
                          </Label>
                        </div>
                        <div className="mb-4 d-none">
                          <Label className="fs-4 p-0 text-primary">
                            Action
                          </Label>
                          {listSubtask.map((item) => (
                            <div
                              key={item.id}
                              className="d-flex cursor-pointer mb-3"
                            >
                              <div
                                className={`cursor-pointer border me-3 ${
                                  item.status === "TO DO"
                                    ? "graytask"
                                    : item === "IN PROGRESS"
                                    ? "bluetask"
                                    : item.status === "DONE"
                                    ? "greentask"
                                    : item.length < 1
                                    ? "hidden"
                                    : "hidden"
                                }`}
                                style={{
                                  height: "25px",
                                  width: "25px",
                                  borderRadius: "3px"
                                }}
                              ></div>{" "}
                              <Label className="fs-4">{item.sub_task_name}</Label>
                            </div>
                          ))}
                        </div>
                        <div className="mb-4 d-none">
                          <div className="d-flex cursor-pointer">
                            <div
                              className="cursor-pointer border"
                              style={{ height: "28px", width: "28px" }}
                            ></div>

                            <InputGroup>
                              <Input
                                className="ms-4 py-1"
                                placeholder={""}
                                value={subtask}
                                style={{ height: "28px" }}
                                onChange={(e) => setSubTask(e.target.value)}
                              />
                              <Button
                                onClick={() => {
                                  postSubtask();
                                }}
                                style={{ height: "28px" }}
                                color="primary px-4 py-1"
                              >
                                <SaveRegular/>
                              </Button>
                            </InputGroup>
                          </div>
                        </div>
                        <Row className="m-0 mb-4 p-0 d-none">
                          <Col className="p-0" sm={9}>
                            <Label className="fs-4">
                              Riwayat Time Tracking
                            </Label>
                          </Col>
                          <Col className="p-0" sm={3}>
                            {showTrackingTime ? (
                              <Label
                                className="fs-4 cursor-pointer text-primary"
                                style={{ color: "black" }}
                                onClick={() =>
                                  setShowTrackingTime(!showTrackingTime)
                                }
                              >
                                Tutup
                              </Label>
                            ) : (
                              <Label
                                className="fs-4 cursor-pointer text-primary"
                                onClick={() =>
                                  setShowTrackingTime(!showTrackingTime)
                                }
                              >
                                Buka
                              </Label>
                            )}
                          </Col>
                        </Row>
                        {showTrackingTime ? (
                          <>
                            {/* <Row className="">
                              <Label
                                className="fs-4"
                                style={{ color: "#ED64A6" }}
                              >
                                Nama Tugas{" "}
                              </Label>
                              <Label className="fs-4">
                                {listDetailtask.description}
                              </Label>
                            </Row> */}
                            {/* <Row className="mt-3">
                              {timeTask.map((item) => (
                                <>
                                  <Label
                                    className="fs-4"
                                    style={{ color: "#A0AEC0" }}
                                  >
                                    {item.description}
                                  </Label>
                                  <Col sm={9}>
                                    <Label className="fs-4">
                                      {" "}
                                      {item.durasi} jam
                                    </Label>
                                  </Col>
                                  <Col
                                    sm={1}
                                    onClick={() =>
                                      setIdTimetrack(item.id_tracking)
                                    }
                                  >
                                    <EditFilled
                                      color="#718096"
                                      size={20}
                                      onClick={() => setModal(true)}
                                    />
                                  </Col>
                                  <Col
                                    sm={1}
                                    onClick={() =>
                                      setIdTimetrack(item.id_tracking)
                                    }
                                  >
                                    <DeleteFilled
                                      color="#718096"
                                      size={20}
                                      onClick={() => setModalHapus(true)}
                                    />
                                  </Col>
                                  <div
                                    className="border-bottom mt-1 mb-3"
                                    style={{
                                      borderWidth: "3px"
                                    }}
                                  ></div>
                                </>
                              ))}
                            </Row> */}
                            {/* <Row className=" pt-75">
                              <Label
                                className="fs-4"
                                style={{ color: "#ED64A6" }}
                              >
                                Action{" "}
                              </Label>
                            </Row> */}

                            {/* <Row className="m-0">
                              {timeSubtask.map((item) => ( */}
                                <>
                                  {/* <Label className="fs-4">{item.name}</Label> */}

                                  {/* <Col sm={9}>
                                <Label className="fs-4"> {item.durasi} jam</Label>
                              </Col>
                              <Col sm={1}>
                                <EditFilled color="#718096" size={20} />
                              </Col>
                              <Col sm={1}>
                                <DeleteFilled color="#718096" size={20} />
                              </Col> */}
                                  {/* <div
                                    className="border-bottom mt-1 mb-3"
                                    style={{
                                      borderWidth: "3px"
                                    }}
                                  ></div> */}
                                </>
                              {/* ))}
                            </Row> */}
                          </>
                        ) : (
                          <></>
                        )}
                      </ScrollBar>
                      {hadChangges ? 
                      <div className="ms-auto mt-auto d-flex">
                        <Button
                          onClick={() => {
                            updateTaskDetail();
                          }}
                          color="primary"
                        >
                          Simpan
                        </Button>
                      </div>:<></>
                      }
                    </div>
                  </Col>
                  <Col md={6} xs={12} className="p-0 pt-4 ps-md-4 pb-4 pb-md-0">
                    <div className="d-flex flex-column h-100">
                      <div className="comment-log-section flex-fill" >
                        <ScrollBar style={{ maxHeight: '55vh', height:'auto' }}>
                          {listComent.map((item, index) => (
                            <div className="comment-log-items" key={`tugas-comment-${index}`}>
                              <span className="content-comment">{item.comment_text}</span>
                              <span className="time-comment">{item.comment_date_time}</span>
                            </div>
                          ))}
                        </ScrollBar>
                      </div>
                      
                      <div className="d-block">
                        <InputGroup>
                          <Input
                            placeholder="tambah komen"
                            value={coment}
                            onChange={(e) => setComent(e.target.value)}
                          />
                          <Button
                            onClick={() => {
                              updateComent();
                            }}
                            className="px-4 py-2"
                            color="primary"
                          >
                            <Send24Filled />
                          </Button>
                        </InputGroup>
                      </div>
                    </div>
                  </Col>
                </Row>
              </ModalBody>
            </Modal>
          </Fragment>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export default EditUserExample;
