// ** Third Party Components
import Chart from "react-apexcharts";
import { MoreVertical } from "react-feather";
import parse from "html-react-parser";
import { modalTugas, idTask } from "@src/views/apps/todo/store";
import toastAlert from "@src/utils/alert";
import EmptyCard from '@src/views/components/cards/empty';

// ** Reactstrap Imports
import {
  Card,
  CardTitle,
  CardText,
  CardBody,
  Row,
  Col,
  Label,
  Input,
  Badge,
  CardHeader,
  Button,
  CardFooter,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import ScrollBar from "react-perfect-scrollbar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// ** Icons Imports
import {
  CircleFilled,
  InfoRegular,
  ListFilled,
  PersonClockFilled,
  ChevronRightRegular
} from "@fluentui/react-icons";

// import Skeleton from "@components/Content/Skeleton";
import { Provider } from "react-redux";
// import store from "@src/store";
import moment from "moment";
import { getTimeManagementV2, updateTask } from "@src/api";
import { todayDate } from "@src/store";
import { noValue } from "@src/utils/validateInput";
import { getUsernik } from "@src/utils/storage";
import { Link } from "react-router-dom";
import ModalTask from "@src/views/apps/todo/ModalTask";

const CardTugasSaya = ({ success }) => {
  const dispatch = useDispatch();
  const date = todayDate();
  const { chartColors } = useSelector((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  const [listDataTask, setListDataTask] = useState([]);
  const [chartSeries, setChartSeries] = useState([]);
  const datauser = getUsernik();
  // detail task
  const { isDetailTaskId, dateCardActivity, isBuatTugas } = useSelector(
    (state) => state
  );
  const [successTodo, setSuccesTodo] = useState(false);
  const [successInprogress, setSuccesInprogress] = useState(false);
  const [successDone, setSuccesDone] = useState(false);

  // ini mana ya
  const [listDataTaskToday, setListDataTaskToday] = useState([]);
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [statusTask, setStatusTask] = useState(false);
  const [offset, setOffset] = React.useState(0);
  const [showSnakebar, setShowSnakebar] = React.useState(false);
  const nik = datauser;
  const limit = 10;
  const [chartOption, setChartOption] = useState({
    chart: {
      width: "100%",
      height: "100%"
    },
    legend: {
      show: false
    },
    labels: ["To Do", "In Progress", "Done"],
    colors: [
      "var(--bs-tertiary-600)",
      "var(--bs-info-600)",
      "var(--bs-primary-600)",
    ],
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      pie: {
        size: 200,
        expandOnClick: false,
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: "15px",
              offsetY: 2,
              fontFamily: "Nunito, sans-serif"
            },
            value: {
              fontSize: "1rem",
              offsetY: 11,
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              color: "#319795"
            },
            total: {
              show: true,
              fontSize: "14px",
              fontFamily: "Nunito, sans-serif",
              color: "#319795",
              label: "Total Tugas"
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 1680,
        options: {
          chart: {
            width: "100%",
            height: "160px"
          }
        }
      },
      {
        breakpoint: 1440,
        options: {
          chart: {
            width: "100%",
            height: "100%"
          }
        }
      }
    ]
  });

  const series = [
    listDataTask.todo || 0,
    listDataTask.inporgress || 0,
    listDataTask.done || 0
  ];

  function getTugas() {
    getTimeManagementV2(
      "activity/statistics?homepage=test&start_date=" + date
    ).then((res) => {
      setListDataTask(res.data.data || {});
      setChartSeries([
        res.data.data.todo || 0,
        res.data.data.inporgress || 0,
        res.data.data.done || 0
      ]);
      setIsLoading(false);
    });
  }

  function getTugasHariIni() {
    getTimeManagementV2(
      `activity/new?action=my_activity&limit=${limit}&offset=${offset}&nik=${nik}&start_date=${moment(
        startDate
      ).format("YYYY-MM-DD")}&end_date=${moment(endDate).format("YYYY-MM-DD")}`
    ).then((res) => {
      setIsLoading(false);
       // console.log("list tugas hari ini", res);
      let datas = res ? res.data.data : [];
      if (offset > 0) {
        const dataConcat = listDataTask.concat(datas);
        setListDataTaskToday(dataConcat);
      } else {
        setListDataTaskToday(datas);
      }
    });
  }

  function updateTaskDataTodo(id) {
    let data = {
      task_id: id,
      status: 1
    };
    updateTask(data).then((res) => {
      //  // console.log("update modal =>", res);
      toastAlert("success", "Berhasil update data");
      setSuccesTodo(true);
    });
  }
  function updateTaskDataInProgress(id) {
    let data = {
      task_id: id,
      status: 2
    };
    updateTask(data).then((res) => {
       // console.log("update modal =>", res);
      toastAlert("success", "Berhasil update data");
      setSuccesInprogress(true);
    });
  }
  function updateTaskDataDone(id) {
    let data = {
      task_id: id,
      status: 3
    };
    updateTask(data).then((res) => {
       // console.log("update modal =>", res);
      toastAlert("success", "Berhasil update data");
      setSuccesDone(true);
    });
  }

  function loadMore() {
    if (listDataTask.length == limit * (offset + 1)) {
      setOffset(offset + 1);
    }
  }

  function createNewTugas() {
    window.open("/app/todo");
  }

  useEffect(() => {
    setIsLoading(true);
    dispatch({ type: "set", isBuatTugas: false });
    // getTugasHariIni();
  }, []);

  useEffect(() => {
    setOffset(0);
    getTugas();
    getTugasHariIni();
  }, [dateCardActivity, statusTask]);

  useEffect(() => {
    if (successTodo || successInprogress || successDone) {
      getTugas();
      getTugasHariIni();
    }
  }, [successTodo, successInprogress, successDone]);

  useEffect(() => {
    getTugas();
    getTugasHariIni();
  }, [offset]);

  useEffect(() => {
    if (!isBuatTugas) {
      setOffset(0);
    }
  }, [isBuatTugas]);

  useEffect(() => {
    setIsLoading(true);
    getTugas();
  }, []);
  const id_Task = useSelector((state) => state.todo.idTask.idTask);
  function showModalTugas() {
    dispatch(modalTugas({ modalTugas: true }));
  }
  //  // console.log(listDataTaskToday, "test");
  const renderOptions = () => {
    return listDataTaskToday.map((item, index) => {
      return (
        <div key={item.id} className="business-item p-0">
          <div
            className="d-flex"
            onClick={() => dispatch(idTask({ idTask: item.id }))}
          >
            <div className="d-flex px-5 my-auto">
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
                    onClick={() => updateTaskDataTodo(item.id)}
                    className={item.status === "TO DO" ? 'd-none': "d-flex"}
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
                    onClick={() => updateTaskDataInProgress(item.id)}
                    className={item.status === "IN PROGRESS" ? 'd-none': "d-flex"}
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
                    onClick={() => updateTaskDataDone(item.id)}
                    className={item.status === "DONE" ? 'd-none': "d-flex"}
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
            </div>
            <div className="d-flex flex-fill pointer-cursor" onClick={() => showModalTugas()}>
              <Label
                className="form-check-label flex-fill my-auto"
                for={`task-${item.id}`}
              >
                {parse(item.description)}
              </Label>
              <div
                className="d-flex flex-row-reverse me-2 ms-auto my-auto me-4"
                style={{ width: "40%" }}
              >
                <div
                  className={`d-flex flex-row align-items-middle ${
                    item.end_date ? "" : "d-none"
                  }`}
                  title={`Harus selesai pada ${moment(
                    item.end_date,
                    "YYYY-MM-DD"
                  ).format("D MMMM YYYY")}`}
                >
                  <PersonClockFilled
                    className="fs-6 text-tertiary-500"
                    height="100%"
                  />
                </div>
                <div
                  className={`d-flex flex-row align-items-middle me-2 ${
                    item.is_description_exists ? "" : "d-none"
                  }`}
                  title={item.description_text}
                >
                  <ListFilled className="fs-6 text-tertiary-500" height="100%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      { !noValue(listDataTaskToday) ? 
        <Card className="business-card mb-7">
        <CardHeader className="pb-1">
          <CardTitle tag="h4">Tugas Hari Ini</CardTitle>
        </CardHeader>
        <CardBody>
          <Row className="earnings-card mb-7">
            <Col xs="6">
              {/* <Chart options={options} series={[53, 16, 31]} type='donut' height={120} /> */}
              <Chart
                options={chartOption}
                series={!noValue(series) ? series : chartSeries}
                type="donut"
              />
            </Col>
            <Col xs="6" className="d-flex flex-column justify-content-center">
              <div className="text-black text-sm d-flex flex-wrap align-items-center mb-1 mt-1 ml-2">
                <CircleFilled className="w-3 h-3 me-1 text-tertiary-600" />
                To Do 
                <Badge tag="div" color="tertiary-100" pill className="text-tertiary-600 ms-4">
                  {listDataTask.todo || 0}
                </Badge>
              </div>
              <div className="text-black text-sm d-flex flex-wrap align-items-center mb-1 mt-1 ml-2">
                <CircleFilled className="w-3 h-3 me-1 text-info-600" />
                In Progress
                <Badge tag="div" color="info-100" pill className="text-info-600 ms-4">
                  {listDataTask.inporgress || 0}
                </Badge>
              </div>
              <div className="text-black text-sm d-flex flex-wrap align-items-center mb-1 mt-1 ml-2">
                <CircleFilled className="w-3 h-3 me-1 text-primary-600" />
                Done
                <Badge tag="div" color="primary-100" pill className="text-primary-600 ms-4">
                  {listDataTask.done || 0}
                </Badge>
              </div>
            </Col>
          </Row>
          <div style={{ height: "225px" }}>
            <ScrollBar className={!noValue(listDataTaskToday) ? '':'d-flex'}>
              <div className="business-items">{renderOptions()}</div>
            </ScrollBar>
          </div>
        </CardBody>
        <CardFooter>
          <div className="d-flex flex-row-reverse">
            <Link to={"/app/todo"} className="fw-bold">
              <Badge tag="div" color="light-primary" pill>
                <span className="">
                  Lihat Selengkapnya{" "}
                  <ChevronRightRegular className="fs-6" height="100%" />
                </span>
              </Badge>
            </Link>
          </div>
        </CardFooter>
        <ModalTask />
      </Card>:
      <EmptyCard 
          className="mb-7" 
          text="Tidak ada tugas hari ini" 
          cardTitle="Tugas Hari Ini"
          action={true}
          actionLabel= "Buat Tugas"
          actionOnclik={createNewTugas}
      />
      }
    </>
  );
};

export default CardTugasSaya;
