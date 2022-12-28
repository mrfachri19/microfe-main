// ** Third Party Components
import React, { useEffect } from "react";
import Chart from 'react-apexcharts'
import { MoreVertical } from 'react-feather'
import ScrollBar from "react-perfect-scrollbar";

// ** Icons Imports
import {
  ChevronRightRegular
} from "@fluentui/react-icons";


// ** Reactstrap Imports
import {
    Card,
    CardBody,
    CardText,
    CardTitle,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
    CardFooter,
    Badge
} from 'reactstrap'
import { getOKR } from '../../../../api';
import { useDispatch, useSelector } from "react-redux";
import { mobileVersion, quartalNow } from "../../../../store";
import { getOKRStatus } from "../../../../utils/validateInput";
import { Link } from "react-router-dom";
import EmptyCard from '@src/views/components/cards/empty';

const CardOKR = () => {
    const dispatch = useDispatch();
    const isListOKR = useSelector((state) => state.isListOKR);
    const [listOKR, setlistOKR] = React.useState([]);
    const [progressOKR, setProgressOKR] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(false);

    function getOKRListData() {
        const quartal = quartalNow();
        getOKR(`?action=todo&limit=10&offset=0&quarter=${quartal.replace(/ /g, "%20")}&app_version=${mobileVersion}`).then((res) => {
            let tempList = [];
            const response = res ? res.data.data : [];
            response.map((objective) => {
                const okrChilds = objective.childs;
                okrChilds.map((okr) => {
                    if (okr.assign_responses.assigner_nik == okr.assign_responses.assigned_to_nik) {
                        tempList.push(okr);
                    };
                });
            });
            //  // console.log("Return OKR => ", res.data);
            setlistOKR(tempList);
            setProgressOKR(res ? res.data.progress : 0);
            setIsLoading(false);
        })
    }

    const renderStates = () => {
        //  // console.log(okrObjectives)
        return listOKR.map((state) => {
            let progressAccumulated = state.presentase + (state.progress_pending || 0);
            let statusColor = getOKRStatus(progressAccumulated, state.approved_closing_status, state.progress_status);
            let defChartOption = {
                type: "radialBar",
                series: [progressAccumulated],
                height: 50,
                width: 50,
                options: {
                    grid: {
                        show: false,
                        padding: {
                            left: -15,
                            right: -15,
                            top: -12,
                            bottom: -15
                        }
                    },
                    colors: [statusColor.colorChart],
                    plotOptions: {
                        radialBar: {
                            hollow: {
                                size: "22%"
                            },
                            track: {
                                background: "#EDF2F7"
                            },
                            dataLabels: {
                                showOn: "always",
                                name: {
                                    show: false
                                },
                                value: {
                                    show: false
                                }
                            }
                        }
                    },
                    stroke: {
                        lineCap: "round"
                    }
                }
            };
            return (
                <div
                    key={state.id}
                    className="position-relative w-100 d-flex flex-row p-2 rounded-lg mb-2 border">
                    <div className="position-relative pl-4"
                        style={{ width: "58.333%", flexGrow: "1", flex: "1 1 0%" }}>
                        <div className="text-gray-900 fw-bolder"
                            style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {state.description}
                        </div>
                        <span className={`text-${statusColor.color}  font-normal text-xs`}>
                            {statusColor.text}
                        </span>
                    </div>
                    <div className="d-flex flex-row-reverse"
                        style={{ width: "41.666%" }}>
                        <div className="position-relative d-flex flex-row pr-2">
                            <Chart
                                options={defChartOption.options}
                                series={defChartOption.series}
                                type={defChartOption.type}
                                height={defChartOption.height}
                                width={defChartOption.width}
                            />
                        </div>
                        <div className="d-flex flex-column align-items-center pr-4">
                            <span className="text-gray-600 font-normal">Progress</span>
                            <div className={`text-${statusColor.color} fw-bold`}>
                                {progressAccumulated} %
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

    function createNewOKR() {
      window.open("/app/okr");
    }

    useEffect(() => {
        setIsLoading(true);
        dispatch({ type: "set", isListOKR: false });
        getOKRListData()
    }, [1]);

    return (
        <> 
        {
            listOKR.length > 0 ?
            <Card className='card-browser-states mb-7'>
                <CardHeader>
                    <CardTitle tag='h4'>OKR</CardTitle>
                </CardHeader>
                <CardBody className="d-block" style={{ height: "384px" }}>
                    <ScrollBar>
                        <div className="mr-2">{renderStates()}</div>
                    </ScrollBar>
                </CardBody>
                <CardFooter>
                    <div className="d-flex flex-row-reverse">
                        <Link to={"/app/okr"} className="fw-bold">
                            <Badge tag='div' color='light-primary' pill>
                                <span className="">Lihat Selengkapnya <ChevronRightRegular className="fs-6" height="100%"/></span>
                            </Badge>
                        </Link>
                    </div>
                </CardFooter>
            </Card>
            :
            <EmptyCard 
                className="mb-7" 
                text="Belum memiliki OKR" 
                cardTitle="OKR"
                action={true}
                actionLabel= "Buat Key Result"
                actionOnclik={createNewOKR}
            />
        }
        </>
    )
}

export default CardOKR
