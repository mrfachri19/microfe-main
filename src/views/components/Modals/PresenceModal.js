// ** React Imports
import { Fragment, useEffect, useState } from 'react';
import { getTimeManagementV2 } from "@src/api";

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { togglePresenceModal } from '../../../redux/modalToggle.js';
import{
  FlagRegular, ChatHelpFilled

} from "@fluentui/react-icons";

/* Timeline */
import { getUserData }from '@src/utils/storage'
import Timeline from '@components/timeline'


import parse from "html-react-parser";



// ** Images
import wfo from '@src/assets/icons/WFOnew.svg';
import wfh from '@src/assets/icons/wfh.svg';
import sehat from '@src/assets/icons/Smile.svg';
import sad from '@src/assets/icons/sad.svg';
import flag from '@src/assets/icons/flag.svg';

import { MapPin, } from 'react-feather';
import { BiBarChartSquare } from "react-icons/bi";

export default function RenderModal() {
  return (
    <PresenceModal />
  );
}
var userdata = getUserData();

 // console.log("nik user",userdata);
const PresenceModal = () => {
  const [timelinePresensi, setTimelinePresensi] = useState([]);
  const {isPresenceModal}  = useSelector((state) => state.modal);
  const { dateCardActivity } = useSelector((state) => state.global);
  const [dataModal, setDataModal] = useState([]);
  const [dataInformasi, setDataInformasi] = useState([]);
  //  // console.log(isPresenceModal, "modalpresensi")
  const dispatch = useDispatch();

  useEffect(() => {
    getInfoPersonal();
    getPresenceDetail();
  }, []);

  function unshowModal() {
    dispatch(togglePresenceModal(false));
    // alert(JSON.stringify(isImageModal))
  }
  const [active, setActive] = useState('1')
  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  function getInfoPersonal() {
    let tempData = [];
    let version = "5.0.6";
    let zone = "GMT+7";
    getTimeManagementV2(
      `absensi/recap?date=${dateCardActivity}&type=detail&isTeam=true&nik=${userdata.username}&action=checkinout&language=id&appVersion=${version}&userTimezone=${zone}&isDev=true`
    ).then((res) => {
      const datas = res ? res.data.data.details : [];
       // console.log("info",datas);
      datas.map((info) => {
        if (info.is_presence || info.type_presence == "Lapor") {
          const timeformat = info.time_presence
            ? info.time_presence.split(" ")
            : ["00:00"];
          const d = {
            time: timeformat[0],
            time_label: timeformat[0],
            label: info.information_presence,
            desc: info.time_presence ? null : info.description_presence,
            warning: !info.time_presence,
            detail: info
          };
          tempData.push(d);
        }
      });
       // console.log("data modal",tempData);
      setTimelinePresensi(tempData);
      getIsiModal(tempData);
    });
  }

function getPresenceDetail() {
  let tempData = [];
  let version = "5.0.6";
  let zone = "GMT+7";

    getTimeManagementV2(
      `absensi/recap?date=${dateCardActivity}&type=detail&isTeam=true&nik=${userdata.username}&action=checkinout&language=id&appVersion=${version}&userTimezone=${zone}`
    ).then((res) => {
      const datas = res ? res.data.data.information : [];
       // console.log("info detail",datas);
      setDataInformasi(datas);    
    });
}
  
  //  // console.log("data modal", TimelineLane);
  function getIsiModal(data = []) {
     // console.log('desc', data);
    const dataReal = [];
    if (data?.length > 0) {
      data?.forEach(item => {
         // console.log('data item', item?.detail?.type_presence);
        if (item?.detail?.type_presence === 'In') {
          dataReal.push({
            title: <span className='fs-4 text-primary'>{item?.detail?.information_presence}</span>,
            meta: moment(item?.detail?.tanggal_presence).locale('id').format("DD MMMM YYYY")+", "+item?.detail?.time_presence,
            icon: <div style={{backgroundColor: 'white', border: '1px solid #319795', padding: '8px 10px', borderRadius: '50%', color: '#319795', fontSize: '11px'}}>IN</div>,
            color: 'success',
            customContent: (
              <>
                <div className='d-flex align-items-center'>
                  <div className='d-flex mb-1 '>
                    <div className="d-flex flex-row"  style={{border: '1px solid #CBD5E0'/*, padding:"3px 1px", borderRadius: '6%'*/,marginRight:'5px'}}>
                          {item?.detail?.location_presence === 'WFO' ? 
                            <>
                              <div className= "align-items-center" style={{padding: '5px'}}>
                                <img
                                  alt="checkedin"
                                  // className="heightAssetPresensiModal"
                                  // height="7rem"
                                  className="mb-1"
                                  style={{width: '20px'}}
                                  src={wfo}
                                />
                              </div>
                              <div className="align-item-center" style={{padding: '5px'}}>
                              <span className='fs-3'> WFO</span>
                              </div>
                            </>
                          : 
                            <>
                              <div className= "align-items-center text-start" style={{padding: '5px'}}>
                                <img
                                  alt="checkedin"
                                  // className="heightAssetPresensiModal"
                                  // height="7rem"
                                  className="mb-1"
                                  style={{width: '20px'}}
                                  src={wfh}
                                />
                              </div>
                              <div className="align-item-center" style={{padding: '5px'}}>
                              <span className='fs-3'>WFH</span>
                              </div>
                            </>
                          }
                        </div>
                        <div className="d-flex flex-row" style={{border: '1px solid #CBD5E0'/*, padding:"6px", borderRadius: '5%'*/,marginRight:'5px'}}>
                          {item?.detail?.feeling_presence === 'Sehat' ? 
                            <>
                              <div className="align-items-center" style={{padding: '5px'}}>
                              <img
                                alt="checkedin"
                                // className="heightAssetPresensiModal text-center"
                                // height="7rem"
                                className="mb-1"
                                style={{width: '20px'}}
                                src={sehat}
                              />
                              </div>
                              <div className="align-item-center" style={{padding: '5px'}}>
                              <span className='fs-3'> Sehat </span>
                              </div>
                            </>
                          : 
                            <>
                              <div className= "p-1 align-items-center text-center">
                              <img
                                alt="checkedin"
                                // className="heightAssetPresensiModal text-center"
                                // height="7rem"
                                className="mb-1"
                                style={{width: '20px'}}
                                src={sad}
                              />
                              </div>
                              <div className="align-item-center" style={{padding: '5px'}}>
                              <span className='fs-3'>Kurang Sehat</span>
                              </div>
                            </>
                          }
                        </div>
                   </div>
                </div>
                {item.detail.alamat_presence !== null &&  item?.detail?.location_presence !== 'WFO' ? 
                    <>
                      <div className='flex mb-1' style={{paddingTop:"5px" ,color:'black !important'}}>
                          <MapPin size={15}></MapPin>
                          <span className="fs-3" style={{padding:'5px', paddingLeft:'15px' ,color:'black !important'}}>
                              <a href={parse(item.detail.alamat_presence).props.href} target="_blank" className="text-dark">
                                {parse(item?.detail?.alamat_presence).props.children}
                              </a>
                          </span>
                      </div>
                    </>
                         : item.detail.alamat_presence === null && item?.detail?.location_presence === 'WFO' ? 
                         <>
                            <div className='flex mb-1' style={{padding:'5px', paddingRight:'15px'}}>
                              <MapPin size={15}></MapPin>
                              <span className="fs-3" >
                                  <a href="https://maps.google.com/?q=-6.8979506,107.6195568&ll=-6.8979506,107.6195568&z=18" style={{color:"black"}} target="_blank"></a>Jl. Japati No.1, Sadang Serang, Kecamatan Coblong, Kota Bandung, Jawa Barat 40133
                              </span>
                            </div>
                         </>
                        : item.detail.alamat_presence !== null && item?.detail?.location_presence === 'WFO' ?
                          <>
                          <div className='flex mb-1' style={{padding:'5px', paddingRight:'15px'}}>
                              <MapPin size={15}></MapPin>
                              <span className="fs-3" >
                                  <a href="https://maps.google.com/?q=-6.8979506,107.6195568&ll=-6.8979506,107.6195568&z=18" style={{color:"black"}} target="_blank"></a>Jl. Japati No.1, Sadang Serang, Kecamatan Coblong, Kota Bandung, Jawa Barat 40133
                              </span>
                            </div>
                          </>  : <></>
                        }
                {item.warning !== true ? 
                  <div className="mt-2" style={{background: '#EDF2F7', padding: '5px', borderRadius: '10px'}}>
                    <span className='fs-3' style={{fontWeight: 'bold'}}>
                      {item.desc !== null ? item.desc : item.detail.description_presence}
                    </span>
                  </div>
                : 
                  <div className='bg-warning' style={{padding: '5px', borderRadius: '10px'}}>
                    <span className='fs-3' style={{fontWeight: 'bold'}}>
                    {item.desc !== null ? item.desc : item.detail.description_presence}
                    </span>
                  </div>
                }
              </>
            )
          }) 
        } else if (item?.detail?.type_presence === 'Out') {
          dataReal.push({
            title: <span className='fs-4 text-danger'>{item?.detail?.information_presence}</span>,
            meta: moment(item?.detail?.tanggal_presence).locale('id').format("DD MMMM YYYY")+", "+item?.detail?.time_presence,
            icon: <div style={{backgroundColor: 'white', border: '1px solid #E53E3E',borderRadius: '100%', padding: '5px', color: '#E53E3E'}}><span style={{fontSize: '9px'}}>OUT</span></div>,
            color: 'danger',
            customContent: (
              <>
                <div className='d-flex align-items-center'>
                  <div className='d-flex mb-1 '>
                        <div className="d-flex flex-row"  style={{border: '1px solid #CBD5E0'/*, padding:"3px 1px", borderRadius: '6%'*/,marginRight:'5px'}}>
                          {item?.detail?.location_presence === 'WFO' ? 
                            <>
                              <div className= "align-items-center" style={{padding: '5px'}}>
                                <img
                                  alt="checkedin"
                                  // className="heightAssetPresensiModal"
                                  // height="7rem"
                                  className="mb-1"
                                  style={{width: '20px'}}
                                  src={wfo}
                                />
                              </div>
                              <div className="align-item-center" style={{padding: '5px'}}>
                              <span className='fs-3'> WFO</span>
                              </div>
                            </>
                          : 
                            <>
                              <div className= "align-items-center" style={{padding: '5px'}}>
                                <img
                                  alt="checkedin"
                                  // className="heightAssetPresensiModal"
                                  // height="7rem"
                                  className="mb-1"
                                  style={{width: '20px'}}
                                  src={wfh}
                                />
                              </div>
                              <div className="align-item-center" style={{padding: '5px'}}>
                              <span className='fs-3'>WFH</span>
                              </div>
                            </>
                          }
                        </div>
                        <div className="d-flex flex-row" style={{border: '1px solid #CBD5E0'/*, padding:"6px", borderRadius: '5%',marginRight:'50px'*/}}>
                          {item?.detail?.feeling_presence === 'Sehat' ? 
                            <>
                              <div className="align-items-center" style={{padding: '5px'}}>
                              <img
                                alt="checkedin"
                                // className="heightAssetPresensiModal text-center"
                                // height="7rem"
                                className="mb-1"
                                style={{width: '20px'}}
                                src={sehat}
                              />
                              </div>
                              <div className="align-item-center" style={{padding: '5px'}}>
                              <span className='fs-3'> Sehat </span>
                              </div>
                            </>
                          : 
                            <>
                              <div className= "align-items-center text-center">
                              <img
                                alt="checkedin"
                                // className="heightAssetPresensiModal text-center"
                                // height="7rem"
                                className="mb-1"
                                style={{width: '20px'}}
                                src={sad}
                              />
                              </div>
                              <div className="align-item-center" style={{padding: '5px'}}>
                              <span className='fs-3'>Kurang Sehat</span>
                              </div>
                            </>
                          }
                        </div>
                   </div>
                </div>
                {item.detail.alamat_presence !== null ? 
                    <>
                      <div className='flex mb-1' style={{paddingTop:"5px" ,color:'black !important'}}>
                          <MapPin size={15}></MapPin>
                          <span className="fs-3" style={{padding:'10px', paddingLeft:'15px' ,color:'black !important'}}>
                            <a href={parse(item.detail.alamat_presence).props.href} target="_blank" className="text-dark">
                              {parse(item?.detail?.alamat_presence).props.children}
                            </a>
                          </span>
                      </div>
                    </>
                         : item.detail.alamat_presence === null && item?.detail?.location_presence === 'WFO' ? 
                         <>
                            <div className='flex mb-1' style={{padding:'5px', paddingRight:'15px'}}>
                              <MapPin size={15}></MapPin>
                              <span className="fs-3" >
                                  <a href="https://maps.google.com/?q=-6.8979506,107.6195568&ll=-6.8979506,107.6195568&z=18" style={{color:"black"}} target="_blank"></a>Jl. Japati No.1, Sadang Serang, Kecamatan Coblong, Kota Bandung, Jawa Barat 40133
                              </span>
                            </div>
                         </>
                        :
                          <></>
                        }
                {item.warning !== true ? 
                  <div className='mt-2' style={{background: '#EDF2F7', padding: '5px', borderRadius: '10px'}}>
                    <span className='fs-3' style={{fontWeight: 'bold'}}>
                      {item.desc !== null ? item.desc : item.detail.description_presence}
                    </span>
                  </div>
                : 
                  <div className='bg-warning' style={{padding: '5px', borderRadius: '10px'}}>
                    <span className='fs-3' style={{fontWeight: 'bold'}}>
                    {item.desc !== null ? item.desc : item.detail.description_presence}
                    </span>
                  </div>
                }
              </>
            )
          })
        } else if (item?.detail?.type_presence === "Cuti") {
          dataReal.push({
            title: <span className='fs-4'>{item?.detail?.information_presence}</span>,
            // meta: item?.detail?.tanggal_presence,
            icon: <div style={{backgroundColor: 'white', border: '1px solid #CBD5E0',borderRadius: '100%', padding: '5px', color: '#718096'}}><span style={{fontSize: '9px'}}>CUTI</span></div>,
            color: '#718096',
            customContent: (
              <>
                <div className='flex mb-3'>
                  <span className='fs-4' style={{paddingLeft: '10px', fontWeight: 'bold' }}>
                  {item?.detail?.cuti_description}
                  </span>
                </div>
                <div className='flex mb-3'>
                  <span className='fs-3' style={{paddingLeft: '10px', fontWeight: 'bold' }}>
                  {item?.detail?.cuti_caption}
                  </span>
                </div>
              </>
            )
          }) 
        }else {
          dataReal.push({
            title: <span className='fs-4'>{item?.detail?.information_presence}</span>,
            // meta: item?.detail?.tanggal_presence,
            icon: <div style={{backgroundColor: 'white', border: '1px solid #CBD5E0', padding: '6px', borderRadius: '100%', fontSize: '5px'}}>
              <FlagRegular
              className="text-tertiary-600 fs-5"
              ></FlagRegular>
              </div>,
            color: '#718096',
            customContent: (
              <>
                <div className='flex mb-3'>
                  <BiBarChartSquare size={18}></BiBarChartSquare>
                  <span className='fs-3' style={{paddingLeft: '10px', fontWeight: 'bold' }}>
                  {item?.detail?.feeling_presence}
                  </span>
                </div>
                <div className='fs-3' style={{fontWeight: 'bold'}}>
                {item.desc !== null ? item.desc : item.detail.description_presence}
                </div>
              </>
            )
          }) 
        }
      })
    }
    setDataModal(dataReal)
  }  



  /* timeline*/
  return (
      <Fragment>
        {isPresenceModal ? 
          <Modal
            isOpen={isPresenceModal}
            toggle={unshowModal}
            className={`modal-dialog-centered modal-lg`}
           
          >
            <ModalHeader className='bg-primary-600' toggle={unshowModal}>
            <div className='d-flex align-items-center text-white'>
                Kehadiran
            </div>
            </ModalHeader>
            <ModalBody style={{padding: '0rem 0rem 2rem', height:'650px'}}>
            <div className='d-flex flex-column bd-highlight mb-3' style={{marginBottom: "2rem" }}>
              <Nav tabs fill className='mb-0'>
                <NavItem>
                  <NavLink
                    className='py-3'
                    active={active === '1'}
                    onClick={() => {
                      toggle('1')
                    }}
                    >
                    Rekap
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className='py-3'
                    active={active === '2'}
                    onClick={() => {
                      toggle('2')
                    }}
                    >
                    Informasi
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <TabContent className='py-50' activeTab={active}>
            <TabPane tabId='1'>
            <div className='d-flex flex-column bd-highlight mb-1' style={{padding: '0rem 3rem 2rem'}}>
              <Timeline className='ms-50 mb-0' data={dataModal} />
            </div>
            </TabPane>
            <TabPane tabId='2'>
            <div className='d-flex flex-column bd-highlight mb-3' style={{margin:"1rem 1.5rem"}}>
              
               { dataInformasi.map(x => 
                  <div className='mb-3'>
                  <p style={{fontWeight: 'bold', color: 'rgb(49, 151, 149)'}}>{x.label}</p>
                  {parse(x.information)}
                  </div>
                ) }
              
              <div className="mt-5">
                <p style={{fontWeight: 'bold', color: 'rgb(49, 151, 149)'}}>Pengelola HR</p>
                <p className="text-danger" style={{fontWeight: 'bold'}}><a href='https://t.me/hchelpdesk_bot' target="_blank" className="text-red">HC Helpdesk Center</a> <span style={{marginLeft:"10px"}}><ChatHelpFilled className='text-tertiary-600 fs-6'></ChatHelpFilled></span></p>
              </div>
            </div>
            </TabPane>
            </TabContent>
            
            
            </ModalBody>
          </Modal>:<></>
        }

      </Fragment>
    )
}
