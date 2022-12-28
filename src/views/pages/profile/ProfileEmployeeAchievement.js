// ** Reactstrap Imports
import { Card, CardBody, CardText, Input, Col, Button, UncontrolledTooltip, UncontrolledButtonDropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap'

import React, { useEffect, useState, Fragment } from "react";

import { Earth16Filled, LockClosed16Filled, PeopleTeam16Filled, Person16Filled } from "@fluentui/react-icons";

import { getConnector } from "@src/api";

import {getUsernik} from "../../../utils/storage"
import { useDispatch, useSelector } from "react-redux";
import {toggleModalPrivacyCentra, storeModalPrivacyCentra } from '../../../redux/modalToggle';
import ModalPrivacyCentra from "@src/views/components/Modals/ModalPrivacyCentra";

const ProfileEmployeeArchievement = ({ nik, data }) => {
  const dispatch = useDispatch();
  const [dataEmployeeArchievementConnector, setDataEmployeeArchievementConnector] = useState([]);
  const [listEmployeeArchievementConnector, setListEmployeeArchievementConnector] = useState([]);
  const [iconPrivacy, setIconPrivacy] = useState({
    'public' : <Earth16Filled/>,
    'private' : <LockClosed16Filled/>,
    'team' : <PeopleTeam16Filled/>,
    'friend' : <Person16Filled/>
  });
  const { isModalPrivacyCentra } = useSelector((state) => state.modal);
  const userNik = getUsernik()
  function getEmployeeArchievementsConnector() {
    getConnector(
      `?vendor=centra&id=penghargaan&nik=${nik}`
    ).then((res) => {
      var tempList = [];
      tempList = res.data.data;
      setDataEmployeeArchievementConnector(tempList);
      setListEmployeeArchievementConnector(tempList.value);
       // console.log('data employee Archievement connector =>',res.data.data);
    });
  }
  

  function openModal(modal, nik, kode_data, privacy) {
    dispatch(modal(true));
    dispatch(storeModalPrivacyCentra({
      nik : nik, 
      kode_data : kode_data, 
      privacy : privacy
    }));
  }

  useEffect(() => {
    if (!isModalPrivacyCentra){
      getEmployeeArchievementsConnector()
    }
  }, [isModalPrivacyCentra]);

  function render_tgl(tgl) {
    let bulan = ['',"Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
    let start_date = `${tgl.substring(6,8)} ${bulan[parseInt(tgl.substring(4,6))]} ${tgl.substring(0,4)}`
    return `${start_date}`
  }

  const renderArchievement = () => {
    return listEmployeeArchievementConnector.map(item => {
      return (
          <>
          <div className='row'>
            <Col md='10'>
              <div className='row'>
                <div className='fs-4 fw-bold mt-4 mb-2'>{item.nama}</div>
                  {item.nama_ttd == "" || item.nama_ttd == null ? "" : (<div className='fs-3 text-tertiary mb-2'>Diberikan oleh {item.nama_ttd}</div>)}
                <div className='fs-4 fw-bold text-tertiary mb-2'>{item.tanggal != null ? (`Pada tanggal ${render_tgl(item.tanggal)}`) : ''}</div>
            </div>
            </Col>
            <Col md='2'>
            </Col>
          </div>
            <hr/>
          </>
      )
    })
  }

  return (
    <>
    <Card>
      <CardBody>
        {/* <h4 className='mb-4 fw-bold text-primary'>Biografi</h4>
        <CardText className='mb-12'>{data.bio}</CardText> */}

        <div className='row'>
        <Col md="8" className='mb-8'></Col> 
        <Col md="4" className='mb-4'>
        <div className="mb-2">
        <div className="mb-2">
          {dataEmployeeArchievementConnector && ( ((userNik!=nik) && (dataEmployeeArchievementConnector.privacy == "private")) || ((userNik!=nik) && (dataEmployeeArchievementConnector.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeArchievementConnector.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          ('')
          : (
          <div className="mb-2 input-group">
            <Input type="text" className="form-control" value={dataEmployeeArchievementConnector ? (`Privasi Data (${dataEmployeeArchievementConnector.privacy})`) : null}/>
            { dataEmployeeArchievementConnector && (dataEmployeeArchievementConnector.shareable == "options") && (userNik==nik) ? 
              (<span className={`input-group-text bg-tertiary-50 text-primary cursor-pointer`} onClick={() => openModal(toggleModalPrivacyCentra,nik,dataEmployeeArchievementConnector.kode_data,dataEmployeeArchievementConnector.privacy)}>{dataEmployeeArchievementConnector ? 
                iconPrivacy[dataEmployeeArchievementConnector.privacy] : iconPrivacy['public']}</span>) : 
              (
                // <span className={`input-group-text bg-tertiary-50 text-tertiary`}>{dataEmployeeArchievementConnector.t_pendidikan ? 
                // iconPrivacy[dataEmployeeArchievementConnector.t_pendidikan.privacy] : iconPrivacy['public']}</span>
                ''
              )
            }
          </div>
          )}
        </div>
      </div>
        </Col> 
            <div className='row'>
            {dataEmployeeArchievementConnector && ( ((userNik!=nik) && (dataEmployeeArchievementConnector.privacy == "private")) || ((userNik!=nik) && (dataEmployeeArchievementConnector.privacy == "team") && (data.isTeam != true))  || ((userNik!=nik) &&(dataEmployeeArchievementConnector.privacy == "friend") && (data.friendshipStatus == 2))) ? 
          (<>
           <div className='mb-2 mt-2 fs-5 fw-bold text-primary'>
            <a id={dataEmployeeArchievementConnector.kode_data}>
              Disembunyikan
            </a>
            <UncontrolledTooltip placement='bottom' target={dataEmployeeArchievementConnector.kode_data}>
            Data ini disembunyikan oleh pengguna ({dataEmployeeArchievementConnector.v_company_home.privacy == "private" ? dataEmployeeArchievementConnector.v_company_home.privacy:dataEmployeeArchievementConnector.v_company_home.privacy+" Only"})
            </UncontrolledTooltip>
            </div>
            </>)
          : (renderArchievement())
          }
              
            </div>
        </div>
      </CardBody>
    </Card>
    <ModalPrivacyCentra/>
    </>
  )
}

export default ProfileEmployeeArchievement
