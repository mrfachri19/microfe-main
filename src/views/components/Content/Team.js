import React, { useEffect, useState, Fragment } from "react";
import ScrollBar from "react-perfect-scrollbar";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

import { Modal, ModalHeader, ModalBody, Badge } from 'reactstrap';
import Avatar from '@components/avatar'

import { getUserData } from '@src/utils/storage';
import { noValue } from '@src/utils/validateInput';

const ContentTeam = ( props ) => {
  //  // console.log("useHistory", useLocation)
  let { triggerModal, className, height, nik, dataTeam, dataTeamTotal, okrPosition, loadMore } = props;
  const [listTeam, setListTeam] = useState([]);
  const [modal, setModal] = useState(false);
  const [teamData, setTeamData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalTeam, setTotalTeam] = useState(0);
  const routerHistory = useNavigate();
  // const [isLoading, setIsLoading] = useState(false);
  const datauser = getUserData();
  nik = nik || datauser.user;

  function getTeamData() {
    setListTeam(dataTeam);
    setTotalTeam(dataTeamTotal)
  }

  function getlabel(val) {
    if (val == "leader") {
      return "Atasan"
    } else if (val == "peer") {
      return "Rekan"
    } else {
      return "Bawahan"
    }
  }

  function renderStatusKerja(team) {
    let isRelasi = (nik == datauser.user);
    const StringData = JSON.stringify(listTeam);

    if (!isRelasi) {
      isRelasi = (StringData.indexOf(datauser.user) > -1);
    }

    if (team.is_sppd) {
      return (
        <Badge className="text-wrap" tag='div' color='blue' pill>SPPD</Badge>
      )
    } else if (team.is_cuti) {
      return (
       <Badge className="text-wrap" tag='div' color='yellow' pill>Cuti</Badge>
      )
    } else if (!noValue(team.checkout_work_location_image_url) || !noValue(team.checkin_work_location_image_url)) {
      if (isRelasi) {
                return (
                    <>
                        <div className="me-1" title={team.checkout_work_location_text ? team.checkout_work_location_text : team.checkin_work_location_text}>
                            <img
                                alt={team.checkout_work_location_text ? team.checkout_work_location_text : team.checkin_work_location_text}
                                className="w-6"
                                style={{ width: "1.5rem" }}
                                src={team.checkout_work_location_image_url ? team.checkout_work_location_image_url : team.checkin_work_location_image_url}
                            />
                        </div>
                        <div title={team.checkout_feeling_text ? team.checkout_feeling_text : team.checkin_feeling_text}>
                            <img
                                alt={team.checkout_feeling_text ? team.checkout_feeling_text : team.checkin_feeling_text}
                                className="w-6"
                                style={{ width: "1.5rem" }}
                                src={team.checkout_feeling_image_url ? team.checkout_feeling_image_url : team.checkin_feeling_image_url}
                            />
                        </div>
                    </>
                )
      } else {
        const color = `${noValue(team.checkin_work_location_image_url) ? "danger" : "primary"}`;
        return (
          <Badge className="text-wrap" tag='div' color={`light-${color}`} pill>
            {noValue(team.checkin_work_location_image_url) ? "Belum Checkin" : "Checkin"}
          </Badge>
        )
      }
    } else {
      const color = `${noValue(team.checkin_work_location_image_url) ? "danger" : "primary"}`;
      return (
        <Badge className="text-wrap" tag='div' color={`light-${color}`} pill>
          {noValue(team.checkin_work_location_image_url) ? "Belum Checkin" : "Checkin"}
        </Badge>
      )
    }
  }

  function openModal(team) {
    if (triggerModal) {
      setModal(!modal)
      setTeamData({
          nik: team.nik,
          ownership: team.ownership,
          name: team.name,
          foto: team.foto,
          posisi: team.v_short_posisi,
          lokasiCheckIn: team.presence_detail.presence_checkin_location,
          waktuCheckIn: team.presence_detail.presence_checkin,
          lokasiCheckOut: team.presence_detail.presence_checkout_location,
          waktuCheckOut: team.presence_detail.presence_checkout,
          feelingCheckIn: team.checkin_feeling_image_url,
          feelingCheckOut: team.checkout_feeling_image_url,
      })
    } else {
      // window.location = '/profile/'+team.nik;
      // history.push('/profile/'+team.nik);
      routerHistory('/profile/'+team.nik);
      // routerHistory('/profile/'+team.nik, { replace: true });
    }
  }

  const renderPerson = () => {
    let arr = [];
    return listTeam.map((team, index) => {
      const labelOwnership = getlabel(team.ownership);
      if (index > 0) {
          arr.push(getlabel(listTeam[index - 1].ownership));
      }
      let isRelasi = (nik == datauser.user);
      const StringData = JSON.stringify(listTeam);
      if (!isRelasi) {
        isRelasi = (StringData.indexOf(datauser.user) > -1);
      }
      return (
        <div key={index} className='border-bottom border-2'>
          <span className={`text-sm fw-bolder text-grey-900 py-1 d-block ${arr.indexOf(labelOwnership) > -1 ? "d-none" : ""}`}>
            {labelOwnership}
          </span>
          <div className={`employee-task d-flex justify-content-between align-items-center cursor-pointer mb-2 ${arr.indexOf(labelOwnership) > -1 ? "mt-1" : ""}`}
            onClick={() => {openModal(team)}}
          >
            <div className='mb-auto'>
              <Avatar
                className="photo-karyawan me-4"
                img={ team.foto || defaultAvatar }
                imgHeight="50"
                imgWidth="50"
              />
            </div>
            <div className='me-auto'>
              <label className='mb-0 fs-4 d-block fw-bolder text-tertiary-600'>
                  {team.name} | {team.nik}
              </label>
              <small className='m-0 text-tertiary-500'>{team.v_short_posisi}</small>
              {/* <Progress className='avg-session-progress progress-bar-success mt-25' value='80' /> */}
            </div>
            <div className='d-flex align-items-center'>
              <div className='position-relative d-flex flex-row employee-task-status'>
                {renderStatusKerja(team)}
              </div>
              {/* <MoreVertical size={18} className='cursor-pointer' /> */}
            </div>
          </div>
        </div>
      )
    })
  }

  function loadMoreData() {
    if (dataTeamTotal > dataTeam.length) {
      setOffset(offset+1)
    }
  }
  
  useEffect(() => {
    // setIsLoading(true);
    if (dataTeam) {
      getTeamData();
    }
  }, [dataTeam]);
  
  useEffect(() => {
    loadMore(offset)
  }, [offset]);
  
  return (
    <>
    <div className={`${className}`} style={{ height: height+"px" }}>
      <ScrollBar onYReachEnd={loadMoreData}>
        <div>{renderPerson()}</div>
      </ScrollBar>
    </div>
    
    <Fragment>
      {modal ?
        <Modal
          key={teamData.nik}
          isOpen={modal}
          toggle={() => setModal(!modal)}
          className={`modal-dialog-centered`}
        >
          <ModalHeader toggle={() => setModal(!modal)}>
            Aktivitas Tim
          </ModalHeader>
            <ModalBody>
              <div className={`employee-task d-flex justify-content-between align-items-center mb-2 w-100`}>
                <div className='d-flex border-2 border-end'
                  style={{ width: "62%" }}
                >
                  <div className={`my-auto position-relative overflow-hidden bg-white round`}
                    style={{ width: "50px", height: "50px", borderRadius: "9999px" }}
                  >
                    <img
                        alt="..."
                        className="w-100 align-middle border-0"
                        style={{ borderRadius: "9999px" }}
                        src={teamData.foto}
                    />
                    <div className='mb-auto'>
                      <Avatar
                        className="photo-karyawan me-4"
                        img={ teamData.foto || defaultAvatar }
                        imgHeight="40"
                        imgWidth="40"
                      />
                    </div>
                  </div>
                  <div className='my-auto mx-4'>
                      <Badge tag='div' color={`${teamData.ownership === 'leader' ? "light-danger" : "light-primary"}`} pill>
                          {getlabel(teamData.ownership)}
                      </Badge>
                      <h6 className='mb-0'>
                          {teamData.name} | {teamData.nik}
                      </h6>
                      <small>{teamData.posisi}</small>
                  </div>
                </div>

                <div className='d-flex justify-content-center'
                    style={{ width: "38%" }}>
                    <div className='position-relative my-auto mx-1 text-primary'>
                        <div className={`w-100 ${teamData.waktuCheckOut ? "" : teamData.waktuCheckIn ? "" : "d-none"}`}>
                            {teamData.lokasiCheckOut === 'Rumah' ? "Work From Home" : teamData.lokasiCheckIn === 'Rumah' ? "Work From Home" : "Work From Office"}
                        </div>
                        <small className='w-100'>
                            {teamData.waktuCheckOut ? `Check-Out pukul ${teamData.waktuCheckOut}` : teamData.waktuCheckIn ? `Check-In pukul ${teamData.waktuCheckIn}` :
                                <Badge tag='div' color={`light-danger`} pill>
                                    Belum Checkin
                                </Badge>
                            }
                        </small>
                        <div className={`d-flex justify-content-center ${teamData.feelingCheckOut ? "" : teamData.feelingCheckIn ? "" : "d-none"}`}>
                            <img
                                alt="feeling"
                                className="w-6"
                                style={{ width: "1.5rem" }}
                                src={teamData.feelingCheckOut ? teamData.feelingCheckOut : teamData.feelingCheckIn}
                            />
                        </div>
                    </div>
                </div>
              </div>
            </ModalBody>
        </Modal>
        :
        <></>
      }
    </Fragment>
    </>
  )
}

ContentTeam.defaultProps = {
  className: '',
  dataTeam: [],
  dataTeamTotal: 0,
  height: 435,
  loadMore: () => {},
  okrPosition: '',
  triggerModal: false
};

ContentTeam.propTypes = {
  dataTeam: PropTypes.array,
  dataTeamTotal: PropTypes.number,
  height: PropTypes.number,
  loadMore: PropTypes.func,
  okrPosition: PropTypes.string,
  triggerModal: PropTypes.bool,
};

export default ContentTeam
