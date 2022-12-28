// ** React Imports
import React, { useState, Fragment, useEffect, useRef } from "react";
import {
  getSearchKaryawan,
  addTask,
  uploadlampiran,
  getOKR,
  uploadLampiranCuti
} from "@src/api";
import {
  getUsernik,
  getToken,
  getTokenAPIM,
  getUserData
} from "@src/utils/storage";
import { Flag24Filled } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { toggleFromCreate, succesUpdateTugas } from "./store";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import toastAlert from "@src/utils/alert";

// ** Third Party Components
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import { useDropzone } from "react-dropzone";
import { Editor } from "react-draft-wysiwyg";
import { FileText, X, DownloadCloud } from "react-feather";
import Select, { components } from "react-select"; //eslint-disable-line
import { useForm, Controller } from "react-hook-form";
import { EditorState, ContentState } from "draft-js";
import InputBasic from "../../forms/form-elements/input/InputFile";
import FieldPartisipan from "../calendar/components/FieldPartisipan";
// ** Reactstrap Imports
import {
  Modal,
  ModalBody,
  Form,
  Input,
  Label,
  Button,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  DropdownMenu,
  DropdownItem,
  InputGroupText,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  Row
} from "reactstrap";

// ** Utils
import { isObjEmpty, selectThemeColors } from "@utils";

import { useDispatch, useSelector } from "react-redux";

// ** Styles Imports
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
// ** Function to capitalize the first letter of string
const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

// ** Modal Header
const ModalHeader = (props) => {
  // ** Props
  const {
    children,
    store,
    handleTaskSidebar,
    setDeleted,
    deleted,
    important,
    setImportant,
    deleteTask,
    dispatch
  } = props;

  // ** Function to delete task
  const handleDeleteTask = () => {
    setDeleted(!deleted);
    dispatch(deleteTask(store.selectedTask.id));
    handleTaskSidebar();
  };

  return (
    <div className="modal-header d-flex align-items-center justify-content-between mb-1">
      <h5 className="modal-title">Buat Tugas</h5>
      <div className="todo-item-action d-flex align-items-center">
        <X className="fw-normal mt-25" size={16} onClick={handleTaskSidebar} />
      </div>
    </div>
  );
};

export default function TaskSidebar(props) {
  // ** Props
  const {
    open,
    handleTaskSidebar,
    store,
    dispatch,
    // updateTask,
    selectTask,
    // addTask,
    deleteTask,
    fetchLabels,
    addPartisipan,
    removePartisipan,
    clearPartisipan,
    fetchPartisipans
  } = props;

  const navigate = useNavigate();
  // search label
  const handleClickAddLabel = (e) => {
    const value = e.target.attributes.getNamedItem("value").value;
    setLabel(value);
    setParamIsSearchLabel(false);
  };
  const AreaSearchLabelSuggestion = () => {
    const isExist = store.labels.some((param) => param.value === label);
    if (label.length > 0 && !isExist) {
      return (
        <>
          <p
            className="cursor-pointer text-primary"
            onClick={() => setParamIsSearchLabel(false)}
          >
            Tambahkan <b>{label}</b> sebagai label baru
          </p>
        </>
      );
    }

    return null;
  };
  const [label, setLabel] = useState("");
  const [paramIsSearchLabel, setParamIsSearchLabel] = useState(false);
  const AreaSearchLabel = () => {
    if (paramIsSearchLabel) {
      return (
        <>
          <div className="mb-4">
            <Card
              style={{
                position: "absolute",
                left: "1.25rem",
                right: "1.25rem",
                zIndex: "99"
              }}
            >
              <CardBody
                style={{
                  padding: "0 1rem"
                }}
              >
                <PerfectScrollbar
                  className="my-5 list-search-label"
                  style={{
                    maxHeight: "18.75rem"
                  }}
                >
                  <AreaSearchLabelSuggestion />
                  {store.labels.length &&
                    store.labels.map((record) => {
                      return (
                        <p
                          className="cursor-pointer my-1"
                          key={`label-suggestion-${record.value}`}
                          value={record.value}
                          onClick={handleClickAddLabel}
                        >
                          {record.label}
                        </p>
                      );
                    })}
                </PerfectScrollbar>
              </CardBody>
            </Card>
          </div>
        </>
      );
    }

    return null;
  };

  // ** States
  const [assignee, setAssignee] = useState({
    value: null,
    label: "tidak ada"
  });
  const [tags, setTags] = useState([]);
  const [desc, setDesc] = useState(EditorState.createEmpty());
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());
  const [openOffcanvas, setOpenclosecanvas] = useState(false);
  const [listNotificationPerson, setListNotificationPerson] = React.useState([]);
  const [listNotifications, setListNotifications] = React.useState([]);
  const [file, setFile] = React.useState("");
  const [preview, setPreview] = React.useState("");

  const {
    control,
    setError,
    setValue,
    clearErrors,
    // handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { title: "" }
  });

  // ** Assignee Select Options
  const assigneeOptions = [
    { value: 1, label: "Darurat" },
    { value: 2, label: "Tinggi" },
    { value: 3, label: "Normal" },
    { value: 4, label: "Rendah" },
    { value: null, label: "tidak ada" }
  ];

  // ** Tag Select Options
  const tagOptions = [
    { value: 4, label: "Rendah" },
    { value: 3, label: "Tinggi" },
    { value: 2, label: "Normal" },
    { value: 1, label: "Darurat" },
    { value: null, label: "Tidak ada" }
  ];


  const AssigneeComponents = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          {data.value === 4 ? (
            <Flag24Filled
              style={{ width: "24px", color: "#718096" }}
              height="100%"
            />
          ) : data.value === 2 ? (
            <Flag24Filled
              style={{ width: "24px", color: "#B7791F" }}
              height="100%"
            />
          ) : data.value === 3 ? (
            <Flag24Filled
              style={{ width: "24px", color: "#3182CE" }}
              height="100%"
            />
          ) : data.value === 1 ? (
            <Flag24Filled
              style={{ width: "24px", color: "#C05621" }}
              height="100%"
            />
          ) : (
            <></>
          )}
          <p className="mb-0 ms-3">{data.label}</p>
        </div>
      </components.Option>
    );
  };

  // ** Function to run when sidebar opens
  const handleSidebarOpened = () => {
    const { selectedTask } = store;
    if (!isObjEmpty(selectedTask)) {
      setValue("title", selectedTask.title);
      setCompleted(selectedTask.isCompleted);
      setImportant(selectedTask.isImportant);
      setAssignee([
        {
          value: selectedTask.assignee.fullName,
          label: selectedTask.assignee.fullName,
          img: selectedTask.assignee.avatar
        }
      ]);
      setDueDate(selectedTask.dueDate);
      if (typeof selectedTask.description === "string") {
        setDesc(
          EditorState.createWithContent(
            ContentState.createFromText(selectedTask.description)
          )
        );
      } else {
        const obj = selectedTask.description._immutable.currentContent.blockMap;
        const property = Object.keys(obj).map((val) => val);

        setDesc(
          EditorState.createWithContent(
            ContentState.createFromText(obj[property].text)
          )
        );
      }

      if (selectedTask.tags.length) {
        const tags = [];
        selectedTask.tags.map((tag) => {
          tags.push({ value: tag, label: capitalize(tag) });
        });
        setTags(tags);
      }
    }
  };

  // ** Function to run when sidebar closes
  const handleSidebarClosed = () => {
    // setTags([]);
    // setDesc("");
    // setValue("title", "");
    // setAssignee();
    setCompleted(false);
    setImportant(false);
    // setDueDate(new Date());
    dispatch(selectTask({}));
    dispatchs(succesUpdateTugas({ succesUpdate: false }));
    clearErrors();
  };

  const dispatchs = useDispatch();
  // add tugas
  const handleSubmit = (event) => {
    event.preventDefault();
    addTaskData();
  };
  // Lampiran
  // ** State
  const [files, setFiles] = useState([]);
   // console.log(files);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles.map((file) => Object.assign(file))]);
    }
  });

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <img
          className="rounded"
          alt={file.name}
          src={URL.createObjectURL(file)}
          height="28"
          width="28"
        />
      );
    } else {
      return <FileText size="28" />;
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
    }
  };

  const fileList = files.map((file, index) => (
    <ListGroupItem
      key={`${file.name}-${index}`}
      className="d-flex align-items-center justify-content-between"
    >
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">{renderFilePreview(file)}</div>
        <div>
          <p className="file-name mb-0 cursor-pointer">{file.name}</p>
          <p className="file-size mb-0 cursor-pointer">
            {renderFileSize(file.size)}
          </p>
        </div>
      </div>
      <Button
        color="danger"
        outline
        size="sm"
        className="btn-icon"
        onClick={() => handleRemoveFile(file)}
      >
        <X size={14} />
      </Button>
      {/* <Button
        color="danger"
        outline
        size="sm"
        className="btn-icon"
        onClick={() => onClickInput()}
      >
        onclick{" "}
      </Button> */}
    </ListGroupItem>
  ));

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  const [judulTugas, setJudulTugas] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [nikPartisipan, setNikPartisipan] = useState("940311");
  const [listPartisipan, setListPartisipan] = React.useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [deskripsiTugas, setDeskripsiTugas] = useState("");
  const [labelTugas, setLabelTugas] = useState("");
  const [prioritasNull, setPrioritasNull] = React.useState(5);
  const [idOkr, setIdOkr] = useState("");
  const [offset, setOffset] = React.useState(0);
  const [hasilUpload, setHasilUpload] = React.useState([]);
  const [hasilUpload1, setHasilUpload1] = React.useState([]);
  const [searchOkr, setSearchokr] = useState("");
  const [listOkr, setListOkr] = React.useState([]);
  const datauser = getUserData();

  const selectedPermohonanId = useSelector(
    (state) => state.request.selectedPermohonanId.selectedPermohonanId
  );
  const isSidebarTask = useSelector(
    (state) => state.todo.isSidebarTask.isSidebarTask
  );

  function getSearchKaryawanData() {
    getSearchKaryawan(`?limit=5&offset=0&keyword=${searchKeyword}`).then(
      (res) => {
        var tempList = [];
        tempList = res.data.data;
         // console.log("List Data Delegasi => ", tempList);
        setListPartisipan(tempList);
      }
    );
  }

  useEffect(() => {
    getSearchKaryawanData();
    getPartisipanData();
    getSearchingOkr();
  }, [searchKeyword, searchOkr]);

  function addTaskData() {
     // console.log(hasilUpload, "tes lampiran");
    let delegasi = [];
    store.addedPartisipan.forEach((record) => {
      delegasi.push({
        nik: record.nik,
        // nama:record.name,
        type: ""
      });
    });
    let data = {
      task_name: judulTugas,
      description: deskripsiTugas,
      start_date: moment(startDate).format("YYYY-MM-DD"),
      end_date: moment(endDate).format("YYYY-MM-DD"),
      label: labelTugas,
      prioritas: assignee.value,
      create_by: datauser.user,
      id_okr: idOkr,
      nik_assignees: listNotifications,
      attachment_file_names: hasilUpload,
      action: "string",
      reminders: [],
      cuti_id: selectedPermohonanId ? selectedPermohonanId : ""
    };
    addTask(data).then((res) => {
       // console.log(res);
      dispatchs(succesUpdateTugas({ succesUpdate: true }));
      setOpenclosecanvas(false);
      handleTaskSidebar();
      toastAlert("success", "Berhasil tambah tugas");
    });
  }

  const inputFile = useRef(null);
  function onClickInput() {
    inputFile.current.click();
  }

  const handleChangeLabel = (e) => {
    setLabel(e.target.value);

    dispatch(
      fetchLabels({
        keyword: label
      })
    );
  };

  const handleFocusLabel = (e) => {
    dispatch(
      fetchLabels({
        keyword: label
      })
    );

    setTimeout(() => {
      setParamIsSearchLabel(true);
    }, 300);
  };
  const handleBlurLabel = (e) => {
    setTimeout(() => {
      setParamIsSearchLabel(false);
    }, 300);
  };
  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
     // console.log(selectedFile);
    setFile(selectedFile);
    const filePreview = URL.createObjectURL(selectedFile);
    setPreview(filePreview);
  };

  function getPartisipanData() {
    getSearchKaryawan(
      `?limit=5&offset=${offset}&keyword=${searchKeyword}`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
       // console.log("List Data Partisipan => ", tempList);
      let tempData = [];
      for (let i = 0; i < tempList.length; i++) {
        tempData.push({
          label: tempList[i].name,
          value: tempList[i].nik,
          avatar: tempList[i].foto,
          key: i + 1
        });
      }
      setListPartisipan(tempData);
       // console.log("list temData partisipan", tempData);
    });
  }

  function getSearchingOkr() {
    getOKR(`/parent?limit=5&offset=0&keyword=${searchOkr}`).then((res) => {
      var tempList = [];
      tempList = res.data.data;
       // console.log("List Data OKR => ", tempList);
      setListOkr(tempList);
    });
  }

  useEffect(() => {
     // console.log("ini file yang diupload", files);
    let kn = [];
    files.map((item) => {
      const formData = new FormData();
      formData.append("file", item);
      uploadlampiran(formData).then((res) => {
        var tempList = [];
        tempList = res.data;
         // console.log("balikan data abis upload =>", tempList.data);
         // console.log(tempList.data.original_filename);
        kn.push(tempList.data);
      });
    });
    setHasilUpload(kn);
  }, [files]);

  useEffect(() => {
    //  // console.log("list notification person", listNotificationPerson)
    var data = listNotificationPerson;
    let tempData = [];
    // tempData = listNotificationPerson
    for (let i = 0; i < data.length; i++) {
      tempData.push({
        // name: data[i].label,
        nik: data[i].value,
        // photo: data[i].avatar,
        type: ""
        // key: i + 1
      });
    }
    setListNotifications(tempData);
     // console.log("list notification person", tempData);
  }, [listNotificationPerson]);

  return (
    <Modal
      isOpen={open}
      toggle={handleTaskSidebar}
      className="sidebar-lg"
      contentClassName="p-0"
      onOpened={handleSidebarOpened}
      onClosed={handleSidebarClosed}
      modalClassName="modal-slide-in sidebar-todo-modal"
    >
      <Form id="form-modal-todo" className="todo-modal">
        <ModalHeader
          store={store}
          deleted={deleted}
          dispatch={dispatch}
          important={important}
          deleteTask={deleteTask}
          setDeleted={setDeleted}
          setImportant={setImportant}
          handleTaskSidebar={handleTaskSidebar}
        >
          Tambah Tugas
        </ModalHeader>
        <ModalBody className="flex-grow-1 py-4">
          <div className="mb-4">
            <Label className="form-label fs-4" for="task-title">
              Nama Tugas <span className="text-danger">*</span>
            </Label>
            <Input
              id="task-title"
              placeholder="Nama Tugas"
              className="new-todo-item-title"
              value={judulTugas}
              onChange={(e) => setJudulTugas(e.target.value)}
            />
          </div>
          <div className="mb-4">
            {/* <Label className="form-label fs-4" for="task-assignee">
              Delegasi
            </Label> */}
            {/* <Select
              isMulti
              id="task-assignee"
              className="react-select"
              classNamePrefix="select"
              isClearable={false}
              options={listPartisipan}
              theme={selectThemeColors}
              value={
                listNotificationPerson.length
                  ? [...listNotificationPerson]
                  : null
              }
              onChange={(data) => setListNotificationPerson([...data])}
              components={{ Option: AssigneeComponent }}
            /> */}
            <FieldPartisipan
              label="Delegasi"
              store={store}
              dispatch={dispatch}
              addPartisipan={addPartisipan}
              clearPartisipan={clearPartisipan}
              removePartisipan={removePartisipan}
              fetchPartisipans={fetchPartisipans}
            />
          </div>
          <div className="mb-4">
            <Label className="form-label fs-4" for="due-date">
              Tanggal Mulai{" "}
            </Label>
            <Flatpickr
              id="due-date"
              // name="due-date"
              className="form-control"
              onChange={(date) => setStartDate(date)}
              value={startDate}
              options={{ dateFormat: "Y-m-d" }}
            />
          </div>
          <div className="mb-4">
            <Label className="form-label fs-4" for="due-date">
              Tanggal Berakhir{" "}
            </Label>
            <Flatpickr
              id="due-date"
              // name="due-date"
              className="form-control"
              onChange={(date) => setEndDate(date)}
              value={endDate}
              options={{ dateFormat: "Y-m-d" }}
            />
          </div>
          <div className="mb-4">
            <Label className="form-label fs-4" for="task-tags">
              Prioritas
            </Label>
            <Select
              id="task-assignee"
              className="react-select"
              classNamePrefix="select"
              isClearable={false}
              options={assigneeOptions}
              theme={selectThemeColors}
              value={assignee.label}
              onChange={(data) => setAssignee(data.value)}
              components={{ Option: AssigneeComponents }}
            />
          </div>
          <div className="mb-4">
            <Label className="form-label fs-4 fs-4" for="location">
              Label
            </Label>
            <Input
              // id="label"
              placeholder="Label"
              onChange={handleChangeLabel}
              onFocus={handleFocusLabel}
              onBlur={handleBlurLabel}
              value={label}
            />
          </div>
          <AreaSearchLabel />
          <div className="mb-4">
            <Label className="form-label fs-4" for="task-title">
              Deskripsi
            </Label>
            <Input
              // id="task-title"
              type="textarea"
              placeholder="Deskripsi Tugas"
              className="new-todo-item-title"
              onChange={(e) => setDeskripsiTugas(e.target.value)}
            />
          </div>

          <div className="">
            <Row>
              <Label className="form-label fs-4" for="location">
                OKR
              </Label>
            </Row>
            <Row>
              <UncontrolledButtonDropdown className="side-button">
                <DropdownToggle className="pe-0" color="">
                  <Input
                    // id="task-title"
                    placeholder="OKR"
                    className="new-todo-item-title"
                    value={searchOkr}
                    onChange={(e) => setSearchokr(e.target.value)}
                  />
                </DropdownToggle>
                <DropdownMenu>
                  {listOkr.map((item, index) => (
                    <DropdownItem
                      key={`okr-task-content-${index}`}
                      onClick={() => {setIdOkr(item.id), setSearchokr(item.description)}}
                      className="d-flex"
                    >
                      <span >
                        {item.description}
                      </span>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </Row>
          </div>
          <div className="mb-3">
            <Label
              htmlFor="file"
              className="form-label fs-4"
              onClick={() => onClickInput}
            >
              Lampiran
            </Label>

            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <div className="d-flex align-items-center justify-content-center flex-column">
                <DownloadCloud size={64} />
                <h5>Drop Files here or click to upload</h5>
                <p className="text-secondary">
                  Drop files here or click{" "}
                  <a href="/" onClick={(e) => e.preventDefault()}>
                    browse
                  </a>{" "}
                  thorough your machine
                </p>
              </div>
            </div>
            {files.length ? (
              <Fragment>
                <ListGroup className="my-2">{fileList}</ListGroup>
              </Fragment>
            ) : null}
          </div>

          <div className="mb-2">
            <Button
              color="primary"
              onClick={handleSubmit}
              className="add-todo-item me-1"
            >
              Add
            </Button>
            <Button
              onClick={handleTaskSidebar}
              color="secondary"
              outline
            >
              Cancel
            </Button>
          </div>
        </ModalBody>
      </Form>
    </Modal>
  );
}
