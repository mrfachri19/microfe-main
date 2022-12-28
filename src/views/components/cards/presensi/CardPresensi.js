import React, { useState, useEffect } from "react";
import { presensiPost, getTimeManagement } from "@src/api";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import SummaryGrid from "@src/views/components/grid/SummaryGrid";
// import Skeleton from "@src/views/components/Content/Skeleton";

// ** Reactstrap Imports
import { Badge, Card, CardFooter } from 'reactstrap'
import ScrollBar from "react-perfect-scrollbar";

import {
  DoorArrowRightRegular,
  DoorArrowLeftRegular,
  ChevronRightRegular,
  InfoRegular,
  ChevronRightFilled,
  Info24Regular
} from "@fluentui/react-icons";
import { getUserData } from "@src/utils/storage"
import "./presensi.css";

import { togglePresenceModal } from '@store/modalToggle';
import PresenceModal from "@src/views/components/Modals/PresenceModal";

// ** Images
import cutiIlu from '@src/assets/icons/cuti-ilu.svg';
import checkoutIlu from '@src/assets/icons/checkout-success.svg';
// import checkinIlu from '@src/assets/icons/checkin-success.svg';
import checkinIlu from '@src/assets/img/diarium-semangat.svg';
import { Link } from 'react-router-dom';

const PrecenseWarp = (props) => {
  const dispatch = useDispatch();
  const [isSppd, setIsSppd] = useState(false);
  const [isCuti, setCuti] = useState(false);
  const [hasCheckin, setHasCheckin] = useState(false);
  const [hasCheckout, setHasCheckout] = useState(false);
  const [jamCheckin, setJamCheckin] = React.useState("00:00");
  const [jamCheckout, setJamCheckout] = React.useState("00:00");
  const [isLoading, setIsLoading] = useState(false);
  const { GMT, mobileVersion } = useSelector((state) => state.global);
  const today = moment().format("HH:mm");
  const datauser = getUserData();
  var waktu = (GMT == "+9" ? ("WIT") : GMT == "+8" ? ("WITA") : ("WIB"));

  function dataStatusPresensi() {
    getTimeManagement(
      "absensi?action=checkinout&user_timezone=GMT" + GMT + "&app_version=" + mobileVersion
      ).then((res) => {
         // console.log("status presensi", res);
      setHasCheckin(res.data.data.has_checked_in || false);
      setHasCheckout(res.data.data.has_checked_out || false);
      setCuti(res.data.data.is_cuti || false);
      setIsSppd(res.data.data.is_sppd || false);
      setJamCheckin(res.data.data.date_time_checkin|| "00:00");
      setJamCheckout(res.data.data.date_time_checkin|| "00:00");
      setIsLoading(false);
    });
  }
   // console.log("jam Cekin",jamCheckin);

  useEffect(() => {
    dataStatusPresensi();
  }, []);

  function openModal() {
    dispatch(togglePresenceModal(true));
  }


  return (
    <>
      <Card
        className={`mb-7 bg_presensi ${
          hasCheckin || isCuti ? "bg_chekin" : "bg_cuti"
        }`}
      >
        <ScrollBar className="presence-info">
          <div className="col_presensi">
            <div className="bg_presensicheckin">
              <div className="background_img"> 
              <div className="display_presensi">
                <div className="welcome-text-presence">
                  {isCuti === true ? (
                    //jika cuti
                    <span className="text-primary-600">Tetap jaga kesehatan</span>
                  ) : hasCheckout === true ? (
                    //udah checkout
                    <span className="text-primary-600">Terima Kasih, Kamu hebat!</span>
                  ) : hasCheckin === true && new Date().getHours() < 15 ? (
                    //udah checkin dan belum jam 3 sore
                    <span className="text-primary-600">Selamat bekerja!</span>
                  ) : hasCheckin === true && new Date().getHours() > 14 ? (
                    // udah checkin dan udah jam 3 sore lewat
                    <span className="text-secondary-600">Check-Out Sekarang</span>
                  ) : (
                    //belum checkin
                    <span className="text-secondary-600">Ayo kamu belum check-in hari ini! </span>
                  )}
                </div>
                <div className="text-tertiary-600">
                  {isCuti === true ? (
                    <span className="fw-bold fs-5">Selamat Cuti</span>
                  ) : hasCheckout === true ? (
                    <span id="textCheckout" className="fs-4">Kamu sudah Check Out pada {moment(jamCheckout, "dd-mm-yyyy HH:mm").format("HH:mm")}</span>
                  ) : hasCheckin === true && new Date().getHours() < 15 ? (
                    <span id="textCheckout" className="fs-4">Kamu sudah Check In pada {moment(jamCheckin, "dd-mm-yyyy HH:mm").format("HH:mm")}</span>
                  ) : (
                    <span id="textCheckout" className="fw-bold fs-">
                      {today + " " + waktu}
                    </span>
                  )}
                </div>

                <div className="quote-text-presence text-tertiary-900">
                  {isCuti === true ? (
                    <>"Masa depan tergantung apa yang kamu lakukan hari ini"</>
                  ) : hasCheckout === true ? (
                    <>"Orang yang memindahkan gunung dimulai dengan membawa batu kecil"</>
                  ) : hasCheckin === true && new Date().getHours() < 15 ? (
                    <>"Orang yang memindahkan gunung dimulai dengan membawa batu kecil"</>
                  ) : hasCheckin === true && new Date().getHours() > 14 ? (
                    <>"Tindakan adalah kunci dasar semua kesuksesan"</>
                  ) : (
                    <>"Hanya satu pikiran positif kecil di pagi hari yang bisa mengubah harimu"</>
                  )}
                </div>
              </div>
              <div className="bg_img">
              {isCuti === true ? (
                  <img
                    alt="checkedout"
                    className="height_assetpresensi"
                    // height="7rem"
                    src={cutiIlu}
                  />
                ) : hasCheckout === true ? (
                  <img
                    alt="checkedout"
                    className="height_assetpresensi"
                    // height="7rem"
                    src={checkoutIlu}
                  />
                ) : hasCheckin === true && new Date().getHours() < 15 ? (
                  <img
                    alt="checkedin"
                    className="height_assetpresensi"
                    // height="7rem"
                    src={checkinIlu}
                  />
                ) : hasCheckin === true && new Date().getHours() > 14 ? (
                  <div className="d-flex flex-column">
                      <div>
                      <DoorArrowLeftRegular
                        className="text-red-600 fs-16"
                      />
                      </div>
                      {/* <div style={{marginTop:"5px"}}>
                      <span className="text-secondary-600">Check Out</span>
                      </div> */}
                  </div>
                ) : (
                    <div className="d-flex flex-column text-center">
                      <div>
                        <DoorArrowRightRegular
                          className="text-primary-600 fs-16"
                        />
                      </div>
                      {/* <div style={{marginTop:"5px"}}>
                      <span className="text-primary-600">Check In</span>
                      </div> */}
                  </div>
                )}
              </div>
              </div>
                    
              {hasCheckin === true && new Date().getHours() > 14 ? (
                <div className="text_banner">
                  <div className="flex_infopresensi text_checkin">
                      <Badge tag='span' className='d-flex bg-secondary-600 rounded-0 m-0 p-0 w-100 h-100'></Badge>
                      <div className='position-relative w-100 d-flex flex-row p-0 bg-secondary-100 '  style={{ height: "34px"}}>            
                        <div className={`rounded bg-tertiary-300 h-100 d-flex`}>
                          <Info24Regular className="fs-6 text-secondary-600 m-auto" style={{ width: "2rem"}} />
                        </div>
                        <div>
                          <h6 className='position-absolute top-50 start-15 translate-middle-y fs-4 d-block fw-normal p-2'>Lakukan Check Out melalui Mobile Apps</h6>
                        </div>
                      </div>
                  </div>
                </div>
                ): hasCheckin === false && isCuti === false ? (
                  <div className="text_banner">
                  <div className="flex_infopresensi">
                      <Badge tag='span' className='d-flex bg-secondary-600 rounded-0 m-0 p-0 w-100 h-100'></Badge>
                      <div className='position-relative w-100 d-flex flex-row p-0 bg-secondary-100 '  style={{ height: "34px"}}>            
                        <div className={`rounded bg-tertiary-300 h-100 d-flex`}>
                          <Info24Regular className="fs-6 text-secondary-600 m-auto" style={{ width: "2rem"}} />
                        </div>
                        <div>
                          <h6 className='position-absolute top-50 start-15 translate-middle-y fs-4 d-block fw-normal p-2'>Lakukan Check In melalui Mobile Apps</h6>
                        </div>
                      </div>  
                  </div>
                </div>
                ):(
                  <></>
                )}
            </div>
          </div>
        </ScrollBar>
        
        { isCuti === true || hasCheckout === true || hasCheckin === true && new Date().getHours() < 15 || hasCheckin === true && new Date().getHours() > 14  ? (
          <CardFooter>
            <div className="d-flex flex-row-reverse">
              <Badge tag='div' color='light-primary fw-bold' pill onClick={() => openModal()}>
                <span className="">Lihat Info Presensi <ChevronRightRegular className="fs-6" height="100%"/></span>
              </Badge>
            </div>
          </CardFooter>
        ) : (
          <></>
        )}
      </Card>
      <PresenceModal/>
    </>
    
  );
}

export default PrecenseWarp
