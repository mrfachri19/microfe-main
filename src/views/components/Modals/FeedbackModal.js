// ** React Imports
import { Fragment, useEffect, useState } from 'react';
import { getTimeManagementV2 } from "@src/api";

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { toggleFeedbackModal } from '../../../redux/modalToggle.js';
// import{
//   FlagRegular, ChatHelpFilled

// } from "@fluentui/react-icons";
import { Info24Regular } from "@fluentui/react-icons";

/* Timeline */
import { getUserData }from '@src/utils/storage'

import { useNavigate } from 'react-router-dom';


import Timeline from '@components/timeline'


import parse from "html-react-parser";



// ** Images
import success from '@src/assets/icons/success-fwa.svg';
import wfh from '@src/assets/icons/wfh.svg';
import sehat from '@src/assets/icons/Smile.svg';
import sad from '@src/assets/icons/sad.svg';
import flag from '@src/assets/icons/flag.svg';

import { MapPin, } from 'react-feather';
import { BiBarChartSquare } from "react-icons/bi";

export default function RenderModal() {
  return (
    <FeedbackModal />
  );
}
var userdata = getUserData();

 // console.log("nik user",userdata);
const FeedbackModal = () => {
  const [timelinePresensi, setTimelinePresensi] = useState([]);
  const {isFeedbackModal}  = useSelector((state) => state.modal);
  const { dateCardActivity } = useSelector((state) => state.global);
  const [dataModal, setDataModal] = useState([]);
  const [dataInformasi, setDataInformasi] = useState([]);
  //  // console.log(isPresenceModal, "modalpresensi")
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // useEffect(() => {
  //   getInfoPersonal();
  //   getPresenceDetail();
  // }, []);

  function unshowModal() {
    dispatch(toggleFeedbackModal(false));
    navigate("/dashboard")
    // alert(JSON.stringify(isImageModal))
  }
   



  /* timeline*/
  return (
      <Fragment>
        {isFeedbackModal ? 
          <Modal
            isOpen={isFeedbackModal}
            toggle={unshowModal}
            className={`modal-dialog-centered modal-lg`}
           
          >
            <ModalBody style={{padding: '0rem 0rem 2rem', height:'400px'}}>

            <div className="relative my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-e3 relative px-12 flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="text-center mt-8 fw-bold text-green-500 text-2xl">
                                Terimakasih atas masukannya !
                            </div>
                            <div className="text-center mt-5 mb-14 grid justify-items-center">
                                <img
                                    alt="..."
                                    src={success}
                                    style={{width: '200px'}}
                                ></img>{" "}
                            </div>
                            <div className="text-center mt-8 fw-bold">
                              <span>Masukan yang kamu berikan sangat berharga untuk kami agar bisa menghadirkan Diarium yang lebih baik</span>
                            </div>
                        </div>
                    </div>
            </ModalBody>
          </Modal>:<></>
        }

      </Fragment>
    )
}
