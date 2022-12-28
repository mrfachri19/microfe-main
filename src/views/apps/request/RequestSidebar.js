// ** React Imports
import { useState, Fragment } from "react";

// ** Third Party Components
import classnames from "classnames";
import Flatpickr from "react-flatpickr";
import { Editor } from "react-draft-wysiwyg";
import { X, Star, Trash } from "react-feather";
import Select, { components } from "react-select"; //eslint-disable-line
import { useForm, Controller } from "react-hook-form";
import { EditorState, ContentState } from "draft-js";
import InputBasic from "../../forms/form-elements/input/InputFile"

// ** Reactstrap Imports
import {
  Modal,
  ModalBody,
  Button,
  Form,
  Input,
  Label,
  FormFeedback
} from "reactstrap";

// ** Utils
import { isObjEmpty, selectThemeColors } from "@utils";

// ** Assignee Avatars
import img1 from "@src/assets/images/portrait/small/avatar-s-3.jpg";
import img2 from "@src/assets/images/portrait/small/avatar-s-1.jpg";
import img3 from "@src/assets/images/portrait/small/avatar-s-4.jpg";
import img4 from "@src/assets/images/portrait/small/avatar-s-6.jpg";
import img5 from "@src/assets/images/portrait/small/avatar-s-2.jpg";
import img6 from "@src/assets/images/portrait/small/avatar-s-11.jpg";

// ** Styles Imports
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import { Link } from "react-router-dom";

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
      <h5 className="modal-title">Buat Pengajuan</h5>
      <div className="todo-item-action d-flex align-items-center">
        {/* <Trash
          className="cursor-pointer mt-25"
          size={16}
          onClick={() => handleDeleteTask()}
        />

        <span className="todo-item-favorite cursor-pointer mx-75">
          <Star
            size={16}
            onClick={() => setImportant(!important)}
            className={classnames({
              "text-warning": important === true
            })}
          />
        </span> */}
        <X className="fw-normal mt-25 cursor-pointer" size={16} onClick={handleTaskSidebar} />
      </div>
    </div>
  );
};

const RequestSidebar = (props) => {
  // ** Props
  const {
    open,
    handleTaskSidebar,
    store,
    dispatch,
    updateTask,
    selectTask,
    addTask,
    deleteTask
  } = props;

  // ** States
  const [assignee, setAssignee] = useState({
    value: "pheobe",
    label: "Pheobe Buffay",
    img: img1
  });
  const [tags, setTags] = useState([]);
  const [desc, setDesc] = useState(EditorState.createEmpty());
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());

  const {
    control,
    setError,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { title: "" }
  });

  // ** Returns sidebar title
  const handleSidebarTitle = () => {
    if (store && !isObjEmpty(store.selectedTask)) {
      return (
        <Button
          outline
          size="sm"
          onClick={() => setCompleted(!completed)}
          color={completed === true ? "success" : "secondary"}
        >
          {completed === true ? "Completed" : "Mark Complete"}
        </Button>
      );
    } else {
      return "Add Task";
    }
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
    setTags([]);
    setDesc("");
    setValue("title", "");
    setAssignee({ value: "pheobe", label: "Pheobe Buffay", img: img1 });
    setCompleted(false);
    setImportant(false);
    setDueDate(new Date());
    dispatch(selectTask({}));
    clearErrors();
  };

  // ** Function to reset fileds
  const handleResetFields = () => {
    const descValue = EditorState.createWithContent(
      ContentState.createFromText(store.selectedTask.description)
    );

    setValue("title", store.selectedTask.title);
    setDesc(descValue);
    setCompleted(store.selectedTask.isCompleted);
    setImportant(store.selectedTask.isImportant);
    setDeleted(store.selectedTask.isDeleted);
    setDueDate(store.selectedTask.dueDate);
    if (store.selectedTask.assignee.fullName !== assignee.label) {
      setAssignee({
        value: store.selectedTask.assignee.fullName,
        label: store.selectedTask.assignee.fullName,
        img: store.selectedTask.assignee.avatar
      });
    }
    if (store.selectedTask.tags.length) {
      const tags = [];
      store.selectedTask.tags.map((tag) => {
        tags.push({ value: tag, label: capitalize(tag) });
      });
      setTags(tags);
    }
  };

  // ** Renders Footer Buttons
  const renderFooterButtons = () => {
    if (store && !isObjEmpty(store.selectedTask)) {
      return (
        <Fragment>
          <Button color="primary" className="update-btn update-todo-item me-1">
            Update
          </Button>
          <Button color="secondary" onClick={handleResetFields} outline>
            Reset
          </Button>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Button color="primary" className="add-todo-item me-1">
            Add
          </Button>
          <Button color="secondary" onClick={handleTaskSidebar} outline>
            Cancel
          </Button>
        </Fragment>
      );
    }
  };
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
      <Form
        id="form-modal-todo"
        className="todo-modal"
        // onSubmit={handleSubmit(onSubmit)}
      >
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
          {handleSidebarTitle()}
        </ModalHeader>
        <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
          <Link to={"/app/request/fwa/create"}>
            <div className='d-flex' style={{ marginLeft: "1rem", marginRight: "1rem", marginTop: "4.125rem", marginBottom: "2.063rem" }}>
              <img
                alt="..."
                src={require(`@src/assets/icons/fwp-icon-square.svg`).default}
                style={{ width: "3.5rem", height: "3.5rem" }}
              ></img>{" "}
              <div className='my-auto ms-5'>
                <div className="fs-5 text-black fw-bolder">
                  FWA
                </div>
                <small className="text-black fs-4">Permohonan Penyesuaian Tempat Kerja</small>
              </div>
            </div>
          </Link>
          <Link to={"/app/request/sppd/create"}>
          <div className='d-flex' style={{ marginLeft: "1rem", marginRight: "1rem", marginBottom: "2.063rem" }}>
            <img
              alt="..."
              src={require(`@src/assets/icons/sppd-icon-square.svg`).default}
              style={{ width: "3.5rem", height: "3.5rem" }}
            ></img>{" "}
            <div className='my-auto ms-5'>
              <div className="fs-5 text-black fw-bolder">
                SPPD
              </div>
              <small className="text-black fs-4">Permohonan Surat Perintah Perjalanan Dinas</small>
            </div>
          </div>
          </Link>
          <div className='d-flex' style={{ marginLeft: "1rem", marginRight: "1rem", marginBottom: "2.063rem" }}>
            <img
              alt="..."
              src={require(`@src/assets/icons/sertifikat-icon-square.svg`).default}
              style={{ width: "3.5rem", height: "3.5rem" }}
            ></img>{" "}
            <div className='my-auto ms-5'>
              <div className="fs-5 text-black fw-bolder">
                Sertifikasi
              </div>
              <small className="text-black fs-4">Permohonan Sertifikasi Karyawan</small>
            </div>
          </div>
          <Link to={"/app/request/cuti/create"}>
            <div className='d-flex' style={{ marginLeft: "1rem", marginRight: "1rem", marginBottom: "2.063rem" }}>
              <img
                alt="..."
                src={require(`@src/assets/icons/cuti-icon-square.svg`).default}
                style={{ width: "3.5rem", height: "3.5rem" }}
              ></img>{" "}
              <div className='my-auto ms-5'>
                <div className="fs-5 text-black fw-bolder">
                  Cuti
                </div>
                <small className="text-black fs-4">Permohonan Cuti Karyawan</small>
              </div>
            </div>
          </Link>
          {/* <div>{renderFooterButtons()}</div> */}
        </ModalBody>
      </Form>
    </Modal>
  );
};

export default RequestSidebar;
