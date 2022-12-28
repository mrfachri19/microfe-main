import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon.png"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import L from 'leaflet';
import { getTimeManagementV2 } from "../../api";
import moment from 'moment';
import Modal from ".";
import ScrollBar from "react-perfect-scrollbar";
import { truncate } from "../../store";
import { compareTime, isURI } from "../../utils/validateInput";
import ProfilePicture from "../Image/ProfilePicture";
// import Geocode from "react-geocode";

export default function TeamModal() {
  const dispatch = useDispatch();
  const isDetailTeam = useSelector((state) => state.isDetailTeam);
  const idTeam = useSelector((state) => state.idTeam);
  const ownershipTeam = useSelector((state) => state.ownershipTeam);
  const nameTeam = useSelector((state) => state.nameTeam);
  const fotoTeam = useSelector((state) => state.fotoTeam);
  const posisiTeam = useSelector((state) => state.posisiTeam);
  const checkinLatTeam = useSelector((state) => state.checkinLatTeam);
  const checkinLonTeam = useSelector((state) => state.checkinLonTeam);
  const checkinLocTeam = useSelector((state) => state.checkinLocTeam);
  const checkinTimeTeam = useSelector((state) => state.checkinTimeTeam);
  const checkoutLatTeam = useSelector((state) => state.checkoutLatTeam);
  const checkoutLonTeam = useSelector((state) => state.checkoutLonTeam);
  const checkoutLocTeam = useSelector((state) => state.checkoutLocTeam);
  const checkoutTimeTeam = useSelector((state) => state.checkoutTimeTeam);
  const feelingTeam = useSelector((state) => state.feelingTeam);
  const workLocTeam = useSelector((state) => state.workLocTeam);
  const [showAcara, setShowAcara] = React.useState(false)
  const [showTugas, setShowTugas] = React.useState(false)
  const [showLokasi, setShowLokasi] = React.useState(false)
  const [listDataTask, setListDataTask] = useState([])
  const [listActivity, setListActivity] = useState([])
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [startDate2, setStartDate2] = useState(new Date())
  const [endDate2, setEndDate2] = useState(new Date())

  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [55, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76]
    }
  });

  const iconCheckin =
    new LeafIcon({
      iconUrl: process.env.REACT_APP_API_URL_MAINAPP + "/assets/icons/marker-checkin.svg",
      // shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
      iconRetinaUrl: process.env.REACT_APP_API_URL_MAINAPP + "/assets/icons/marker-checkin.svg",
    }
    );

  const iconCheckout =
    new LeafIcon({
      iconUrl: process.env.REACT_APP_API_URL_MAINAPP + "/assets/icons/marker-checkout.svg",
      // shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',
      iconRetinaUrl: process.env.REACT_APP_API_URL_MAINAPP + "/assets/icons/marker-checkout.svg",
    }
    );

  // function convertToAddress() {
  //   Geocode.fromLatLng("-6.4127468742522655", "106.80975525870116").then(
  //     (response) => {
  //       const address = response.results[0].formatted_address;
  //        // console.log("Hasil convert ke alamat", address);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  function getTaskData() {
    getTimeManagementV2(`activity/new?nik=${idTeam}&action=my_activity&limit=10&offset=0&start_date=${moment(startDate).format('YYYY-MM-DD')}&end_date=${moment(endDate).format('YYYY-MM-DD')}`).then((res) => {
      var tempList = [];
      tempList = res.data.data;
       // console.log("List Data Task => ", tempList);
      setListDataTask(tempList);
    })
  }

  function getEventToday() {
    getTimeManagementV2(`activity/event?action=my_activity&start_date=${moment(startDate2).format('YYYY-MM-DD')}&end_date=${moment(endDate2).format('YYYY-MM-DD')}&nik=${idTeam}`).then((res) => {
      let tempData = listActivity;
      const datas = res.data.data.activities;
      for (let i = datas.length - 1; i > -1; i--) {
        let info = datas[i];
        const timelabel = info.periode.split(" | ");
        const timeformat = timelabel[1].split(" - ");
        let d = {
          time: timeformat[0],
          time_label: timelabel[1],
          label: info.type_label,
          detail: [info]
        };

        if (tempData.length > 0) {
          let isSubmityet = false;
          tempData.map((td, index) => {
            if (d.time == td.time && td.label == "Acara") {
              tempData[index].detail.push(info);
              isSubmityet = true;
              return;
            }
            if (compareTime(td.time, d.time) && !isSubmityet) {
              tempData.splice(index, 0, d);
              isSubmityet = true;
              return;
            }
          });

          if (!isSubmityet) {
            tempData.push(d);
          }
        } else {
          tempData.push(d);
        }
      }
       // console.log("List Data Event => ", tempData);
      setListActivity(tempData);
       // console.log("detail acara", listActivity)
    })
  }

  useEffect(() => {
    dispatch({ type: "set", isDetailTeam: false });
    setShowTugas(true)
  }, [1]);

  useEffect(() => {
    getTaskData()
    getEventToday()
    // convertToAddress()
  }, [idTeam])

  // useEffect(() => {
  // }, [1, showAcara])
  return (
    <>
      {isDetailTeam ? (
        <>
          <Modal>
            <div className="relative w-auto my-6 mx-auto max-w-[630px]">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-e3 relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex flex-wrap items-center bg-green-300 border-b-2 border-tertiary-400 pl-7 py-5 rounded-t">
                  <div className="relative w-full px-2 max-w-full flex-grow flex-1">
                    <span className="text-white fw-bold text-xl">
                      Aktifitas Tim
                    </span>
                  </div>
                  <div className="relative flex-row-reverse pr-7 cursor-pointer"
                    onClick={() => {
                      dispatch({ type: "set", isDetailTeam: false });
                    }}>
                    <img
                      alt="..."
                      src={process.env.REACT_APP_API_URL_MAINAPP + "/assets/icons/dismiss-white.svg"}
                      className={"w-5"}
                    ></img>{" "}
                  </div>
                </div>
                {/*body*/}
                <div className="flex flex-wrap pt-6">
                  <div className="relative w-auto pl-6 flex-initial">
                    <ProfilePicture className="w-20 h-20" src={fotoTeam} />
                  </div>
                  <div className="w-full pl-4 min-w-fit flex-grow flex-1">
                    <div className="border-r-2">
                      <div className="mr-3">
                        <div className="bg-primary-100 rounded-lg max-w-min">
                          <span className="text-primary-700 fw-bold text-xs px-2">
                            {ownershipTeam === "leader" ?
                              <>
                                Atasan
                              </> : <>
                                Rekan
                              </>}
                          </span>
                        </div>
                        <div className="text-black fw-bold text-xs pt-2">
                          {nameTeam}{" "}
                          <span className="text-tertiary-600 font-normal">
                            | {idTeam}
                          </span>
                        </div>
                        <div className="text-black fw-bold text-xs pt-2 pr-5">
                          <span className="font-normal text-xs text-tertiary-600">
                            {posisiTeam}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-nowrap pt-6 w-5/6">
                      <div className="w-1/3 grid justify-items-center">
                        <img
                          alt="..."
                          className="w-7 cursor-pointer"
                          src={process.env.REACT_APP_API_URL_MAINAPP + "/assets/icons/alert-kudos.svg"}
                        />
                      </div>
                      <div className="w-1/3 grid justify-items-center">
                        <img
                          alt="..."
                          className="w-7 cursor-pointer"
                          src={process.env.REACT_APP_API_URL_MAINAPP + "/assets/icons/semangat-kudos.png"}
                        />
                      </div>
                      <div className="w-1/3 grid justify-items-center">
                        <img
                          alt="..."
                          className="w-7 cursor-pointer"
                          src={process.env.REACT_APP_API_URL_MAINAPP + "/assets/icons/person-note-kudos.svg"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-5 pr-5">
                    <div className="w-full">
                      <div className={`text-green-600 fw-bold text-sm pb-1 ${checkinLocTeam ? "" : "hidden"}`}>
                        Work From {checkoutLocTeam ? checkoutLocTeam : checkinLocTeam}
                      </div>
                      <div className={`text-green-600 fw-bold text-sm ${checkinTimeTeam ? "" : "hidden"}`}>
                        {checkoutTimeTeam ?
                          <>
                            Check-Out pukul {checkoutTimeTeam}
                          </>
                          : <>
                            Check-In pukul {checkinTimeTeam}
                          </>}
                      </div>
                      <div className="flex flex-nowrap pt-2 w-full">
                        <div className="w-full grid justify-items-center">
                          <div className={`pt-4  ${feelingTeam ? "hidden" : ""}`}>
                            <div className={`bg-primary-100 rounded-lg max-w-max`}>
                              <span className="text-primary-700 fw-bold text-sm px-2">
                                Belum Checkin
                              </span>
                            </div>
                          </div>
                          <img
                            alt="..."
                            className={`w-7 ${feelingTeam ? "" : "hidden"}`}
                            src={feelingTeam}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-2 border-b-2 border-tertiary-200 pt-5">
                  <ul className="flex flex-wrap -mb-px text-sm font-medium text-center w-full" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                    <li role="presentation" className="w-1/3">
                      <button className={`inline-block px-4 py-2 rounded-t-lg border-b-2 border-transparent w-full text-sm hover:text-green-600 hover:border-green-600 ${showTugas ? "text-green-600 border-green-600" : ""}`} id="contacts-tab" type="button" role="tab" aria-controls="contacts" aria-selected="false"
                        onClick={() => {
                          setShowTugas(true),
                            setShowAcara(false),
                            setShowLokasi(false)
                        }}
                      >
                        <div className="flex flex-wrap items-center">
                          <div className="relative w-full max-w-full flex-grow flex-1">
                            <span>
                              Tugas
                            </span>
                          </div>
                        </div>
                      </button>
                    </li>
                    <li role="presentation" className="w-1/3">
                      <button className={`inline-block px-4 py-2 rounded-t-lg border-b-2 border-transparent w-full text-sm hover:text-green-600 hover:border-green-600 ${showAcara ? "text-green-600 border-green-600" : ""}`} id="contacts-tab" type="button" role="tab" aria-controls="contacts" aria-selected="false"
                        onClick={() => {
                          setShowAcara(true),
                            setShowTugas(false),
                            setShowLokasi(false)
                        }}
                      >
                        <div className="flex flex-wrap items-center">
                          <div className="relative w-full max-w-full flex-grow flex-1">
                            <span>
                              Acara
                            </span>
                          </div>
                        </div>
                      </button>
                    </li>
                    <li role="presentation" className="w-1/3">
                      <button className={`inline-block px-4 py-2 rounded-t-lg border-b-2 border-transparent w-full text-sm hover:text-green-600 hover:border-green-600 ${showLokasi ? "text-green-600 border-green-600" : ""}`} id="contacts-tab" type="button" role="tab" aria-controls="contacts" aria-selected="false"
                        onClick={() => {
                          setShowTugas(false),
                            setShowAcara(false),
                            setShowLokasi(true)
                        }}
                      >
                        <div className="flex flex-wrap items-center">
                          <div className="relative w-full max-w-full flex-grow flex-1">
                            <span>
                              Lokasi
                            </span>
                          </div>
                        </div>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="h-64">
                  {showAcara ?
                    <ScrollBar>
                      <div className={`grid-cols-1 gap-4 place-content-center h-64 ${listActivity.length > 0 ? "hidden" : "grid"}`}>
                        <div className="grid justify-items-center">
                          <span className="flex flex-row align-middle text-tertiary-300 text-2xl">
                            Tidak Ada Acara
                          </span>
                        </div>
                      </div>
                      <div className={`w-full pt-4 ${listActivity.length > 0 ? "" : "hidden"}`}>
                        <span className="text-base font-semibold px-10">
                          List Acara
                        </span>
                        {listActivity.map(item => (
                          <div key={"acara-" + item.id}>
                            <div className="flex flex-row align-middle pb-5 pt-6 px-10">
                              <div className="w-full flex flex-row align-middle">
                                <div className="box-content h-4 w-4 rounded-sm bg-accentWarning-300">
                                </div>
                                <span className="text-base font-normal pl-4">
                                  {item.time}
                                </span>
                                {item.detail.map(data => (
                                  <div key={"acara-" + item.id + "-" + data.id} className="pl-8">
                                    <div className="text-sm font-normal pb-4">
                                      {data.title}
                                    </div>
                                    <div className="leading-tight text-justify flex flex-row w-full">
                                      <div className="w-4 flex flex-row align-top lg:align-middle">
                                        <img
                                          alt="..."
                                          src={process.env.REACT_APP_API_URL_MAINAPP + `/assets/icons/${isURI(data.location) ? "zoom" : "location"}-black.svg`}
                                          className={"w-4"}
                                        ></img>{" "}
                                      </div>
                                      <div className="text-sm font-normal flex flex-row pl-4">
                                        {truncate(data.location) || "-"}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <hr className=" md:min-w-full" />
                          </div>
                        ))}
                      </div>
                    </ScrollBar> :
                    <>
                    </>
                  }
                  {showTugas ?
                    <ScrollBar>
                      <div className={`grid-cols-1 gap-4 place-content-center h-64 ${listDataTask.length > 0 ? "hidden" : "grid"}`}>
                        <div className="grid justify-items-center">
                          <span className="flex flex-row align-middle text-tertiary-300 text-2xl">
                            Tidak Ada Tugas
                          </span>
                        </div>
                      </div>
                      <div className={`w-full pt-4 ${listDataTask.length > 0 ? "" : "hidden"}`}>
                        <span className="text-base font-semibold px-10">
                          List Tugas
                        </span>
                        {listDataTask.map(item => (
                          <div key={"tugas-" + item.id}>
                            <div className="flex flex-row align-middle pb-5 pt-6 px-10">
                              <div className="w-full flex flex-row align-middle">
                                <div className="box-content h-4 w-4 min-w-4 rounded-sm bg-pink-500">
                                </div>
                                <label className="text-sm w-11/12 max-w-fit font-normal pl-4">
                                  {item.description}
                                </label>
                              </div>
                            </div>
                            <hr className=" md:min-w-full" />
                          </div>
                        ))}
                      </div>
                    </ScrollBar> :
                    <>
                    </>
                  }
                  {showLokasi ?
                    <div className="w-full h-64">
                      <div className={`grid-cols-1 gap-4 place-content-center h-64 ${checkinLatTeam ? "hidden" : "grid"}`}>
                        <div className="grid justify-items-center">
                          <span className="flex flex-row align-middle text-tertiary-300 text-2xl">
                            Belum Checkin
                          </span>
                        </div>
                      </div>
                      <MapContainer center={[checkinLatTeam ? checkinLatTeam : 0, checkinLonTeam ? checkinLonTeam : 0]} zoom={13} scrollWheelZoom={false} className={`w-full h-64 ${checkinLatTeam ? "" : "hidden"}`} >
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[checkinLatTeam ? checkinLatTeam : 0, checkinLonTeam ? checkinLonTeam : 0]} icon={iconCheckin}>
                          <Popup>
                            <div className="flex flex-row">
                              <div className="flex flex-row">
                                <div className="pr-2">
                                  <img
                                    alt="..."
                                    className="w-8"
                                    src={workLocTeam}
                                  />
                                </div>
                                <div className="pr-2">
                                  <img
                                    alt="..."
                                    className="w-8"
                                    src={feelingTeam}
                                  />
                                </div>
                                <div>
                                  <span className="text-green-600 fw-bold text-xs">Check-In {checkinTimeTeam}</span>
                                </div>
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                        {checkoutLatTeam ?
                          <Marker position={[checkoutLatTeam ? checkoutLatTeam : 0, checkoutLonTeam ? checkoutLonTeam : 0]} icon={iconCheckout}>
                            <Popup>
                              <div className="flex flex-row">
                                <div className="flex flex-row">
                                  <div className="pr-2">
                                    <img
                                      alt="..."
                                      className="w-8"
                                      src={workLocTeam}
                                    />
                                  </div>
                                  <div className="pr-2">
                                    <img
                                      alt="..."
                                      className="w-8"
                                      src={feelingTeam}
                                    />
                                  </div>
                                  <div>
                                    <span className="text-green-600 fw-bold text-xs">Check-Out {checkoutTimeTeam}</span>
                                  </div>
                                </div>
                              </div>
                            </Popup>
                          </Marker>
                          : <></>}
                      </MapContainer>
                    </div>
                    :
                    <>
                    </>
                  }
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-green-600 hidden text-white active:bg-emerald-600 fw-bold text-sm px-2 py-1 rounded shadow hover:shadow-e3 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      dispatch({ type: "set", isDetailTeam: false });
                    }}
                  >
                    <div className="flex flex-row">
                      <div className="flex flex-row pr-2">
                        <span className="fw-bold text-white">
                          Next
                        </span>
                      </div>
                      <div className="flex flex-row-reverse">
                        <img
                          alt="..."
                          src={process.env.REACT_APP_API_URL_MAINAPP + "/assets/icons/arrow-right-white.svg"}
                          className={"w-5"}
                        ></img>{" "}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </>
      ) : null}
    </>
  );
}