// ** React Imports
import { Fragment, useEffect, useState } from 'react';
import { getTimeManagementV2 } from "@src/api";

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Nav, NavItem, NavLink, TabContent, TabPane, Card, CardBody, Input,} from 'reactstrap';
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import Rating from 'react-rating'

import toastAlert from "@src/utils/alert";

import { toggelRatingModal } from '../../../redux/modalToggle.js';
// import{
//   FlagRegular, ChatHelpFilled

// } from "@fluentui/react-icons";
import { Info24Regular } from "@fluentui/react-icons";

/* Timeline */
import { getUserData }from '@src/utils/storage'

import { useNavigate } from 'react-router-dom';

import imgPenilaian from '@src/assets/img/penilaian.svg'

import { getQuestionRating, postAnswer} from '../../../api';


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

import { toggleRatingModal } from '../../../redux/modalToggle.js';


export default function RenderModal() {
  return (
    <RatingModal />
  );
}
var userdata = getUserData();

 // console.log("nik user",userdata);
const RatingModal = () => {
  const [timelinePresensi, setTimelinePresensi] = useState([]);
  const {isRatingModal}  = useSelector((state) => state.modal);
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
    dispatch(toggelRatingModal (false));
    navigate("/dashboard")
    // alert(JSON.stringify(isImageModal))
  }
   

  const [optionData, setOptionData] = useState([]);
  const [inputrating, setInputRating] = useState(0);
  const [berikanSaran, setBerikanSaran] = useState("");
  const [userEx, setUserEx] = useState("");
  const [userIn, setUserIn] = useState("");
  const [easyToU, setEasyToU] = useState("");
  const [simps, setSimps] = useState("");
  const [idQuestion, setIdQuestion] = useState([]);

  const RatingsModal = useSelector((state)=>state.modal.isRatingModal);

   // console.log("slector modal",RatingsModal);

  function getQuestionRatings() {
      var tempData = [];
      var tempData1 = []
      getQuestionRating().then(res => {
          const datas = res? res.data.data : [];
           // console.log("question ratimg",res);
          //  // console.log("Related",related);
          
          datas.map((i, index)=> {
              tempData1.push({
                  ids : i.questionId,
                  desc : i.question
              })
              if (index === 2) {
                  tempData.push ({
                      ids : i.questionId,
                      desc : i.question
                  })        
              }else if(index === 3 ){
                  tempData.push ({
                      ids : i.questionId,
                      desc : i.question
                  })
              }else if(index === 4 ){
                  tempData.push ({
                      ids : i.questionId,
                      desc : i.question
                  })
              }else if(index === 5 ){
                  tempData.push ({
                      ids : i.questionId,
                      desc : i.question
                  })
              }
              
          });
           // console.log("rating Question", tempData);
          setIdQuestion(tempData1); 
          setOptionData(tempData);
          // //  // console.log("related", tempRelated);
          // setOptionRelated(tempRelated); 
      });

  }


  useEffect(() => {
      getQuestionRatings();
      // getPresenceDetail();
  }, [])

  function handleButtonRate(desc,value) {
      if (desc === "User Experience" && userEx === "") {
          setUserEx(value)
      }else if(desc === "User Interface" && userIn === ""){
          setUserIn(value)
      }else if(desc === "Simplicity" && simps === ""){
          setSimps(value)
      }else if(desc === "Easy to Use" && easyToU === ""){
          setEasyToU(value)
      } else if (desc === "User Experience" && userEx !== "") {
          setUserEx("")
      }else if(desc === "User Interface" && userIn !== ""){
          setUserIn("")
      }else if(desc === "Simplicity" && simps !== ""){
          setSimps("")
      }else if(desc === "Easy to Use" && easyToU !== ""){
          setEasyToU("")
      }
  }

  function PostRatingData() {
      let dataAnswer = [];
      idQuestion.forEach(item => {
          if(item.desc === "Rating aplikasi Diarium"){
              dataAnswer.push({
                  answer: inputrating,
                  questionId: item.ids
              })
          }else if(item.desc === "Berikan saran dan masukan untuk Diarium (optional)"){
              dataAnswer.push({
                  answer: berikanSaran,
                  questionId: item.ids
              })
          }else if(item.desc === "User Experience"){
              dataAnswer.push({
                  answer: userEx,
                  questionId: item.ids
              })
          }else if(item.desc === "User Interface"){
              dataAnswer.push({
                  answer: userIn,
                  questionId: item.ids
              })
          }else if(item.desc === "Easy to Use"){
              dataAnswer.push({
                  answer: easyToU,
                  questionId: item.ids
              })
          }else if(item.desc === "Simplicity" ){
              dataAnswer.push({
                  answer: simps,
                  questionId: item.ids
              })
          }
      });
      
      let data = {
          answerQuestions : dataAnswer,
          eventId : 26
      };
       // console.log(data);
      postAnswer(data).then((res) => {
           // console.log("post rating", res);
          // setShowSnakebar(true);
          // dispatch({ type: "set", isValidationModalYes: true });
          if (res.data.status === 'failed') {
              toastAlert("warning", `${res.data.message}`);
          }
          if (res.data.status !== 'failed') {
              toastAlert("success", "Berhasil mengirim Feedback!");
              // dispatch(setIsValidationModalYes({ isValidationModalYes: true }))
              // dispatch(toggleFeedbackModal(true))
              setTimeout(() => {
                  // dispatch(toggleFeedbackModal(false))
                  navigate("/dashboard")
              }, 3000);
          }
      });
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      PostRatingData()
  };

  return (
      <Fragment>
        {isRatingModal ? 
          <Modal
            isOpen={isRatingModal}
            toggle={unshowModal}
            className={`modal-dialog-centered modal-lg`}
            style={{maxWidth:"500px"}}
          >
            <ModalHeader toggle={unshowModal}></ModalHeader>
            <ModalBody style={{padding: '0rem 0rem 2rem', height:"480px"}}>
            <Card style={{maxWidth:"500px"}}>
            <CardBody>
            <div className="d-flex flex-column bd-highlight mb-3" >
                <div className="p-2 bd-highlight text-center">
                <img
                    alt="checkedin"
                    // className="height_assetpresensi"
                    width="40%"
                    src={imgPenilaian}
                  />
                </div>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label for="inputAddress" className="form-label">Bagaimana pendapatmu tentang Diarium ?</label>
                    </div>
                    <div className="col-12">
                        <Rating
                            stop={10}
                            initialRating={inputrating}
                            onChange={rate => setInputRating(rate)}
                            emptySymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                <span className='fs-8 me-2 text-center text-tertiary-600 bg-tertiary-100 rounded px-2 py-1 ' style={{width: '70px'}}>{n}</span>
                            ))}
                            fullSymbol={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                <span className='fs-8 me-2 text-center text-white bg-primary rounded px-2 py-1 ' style={{width: '70px'}}>{n}</span>
                            ))}
                        />
                        <div className='counter-wrapper mt-1'>
                            {/* <span className='fw-bold'>Ratings: {inputrating}</span> */}
                        </div>
                    </div>
                    <div className="col-12">
                        <span>Bagian mana yang kamu suka dari Diarium</span>
                    </div>
                    <div className='d-inline-flex'>
                    {
                        optionData?.map((i)=>{
                            return( 
                            <span className="col-auto">
                                    {userEx === "" && userIn === "" && simps === "" && easyToU === "" ? (
                                        <span className='cursor-pointer px-3 py-1 bg-secondary-100 text-secondary rounded-pill me-4 mb-4' onClick={() => { handleButtonRate(i.desc,10) }}>{i.desc}</span>
                                    )  
                                    :   userEx !== "" && i.desc === "User Experience" ? (
                                        <span className='cursor-pointer px-3 py-1 bg-primary text-white rounded-pill me-4 mb-4' onClick={() => { handleButtonRate(i.desc,10) }}>{i.desc}</span>
                                    ) : userIn !== "" && i.desc === "User Interface" ? (
                                        <span className='cursor-pointer px-3 py-1 bg-primary text-white rounded-pill me-4 mb-4' onClick={() => { handleButtonRate(i.desc,10) }}>{i.desc}</span>
                                    ) : simps !== "" && i.desc === "Simplicity" ? (
                                        <span className='cursor-pointer px-3 py-1 bg-primary text-white rounded-pill me-4 mb-4' onClick={() => { handleButtonRate(i.desc,10) }}>{i.desc}</span>
                                    ) : easyToU !== "" && i.desc === "Easy to Use"? (
                                        <span className='cursor-pointer px-3 py-1 bg-primary text-white rounded-pill me-4 mb-4' onClick={() => { handleButtonRate(i.desc,10) }}>{i.desc}</span>
                                    ) : 
                                    <span className='cursor-pointer px-3 py-1 bg-secondary-100 text-secondary rounded-pill me-4 mb-4' onClick={() => { handleButtonRate(i.desc,10) }}>{i.desc}</span>
                                } 
                                
                            </span>
                            )
                        })
                    }
                    </div>

                    <div className="col-12">
                        <label for="inputAddress2" className="form-label">Masukan Dan Saran</label>
                        </div>
                        <div className="col-12 text-center">
                        <Input type="text" className="form-control text-center" id="masukanDanSaran" name="saranHarapan"   onChange={(e) => setBerikanSaran(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button className='btn btn-primary fs-3' onClick={() => { handleSubmit }}>Kirim</button>
                    </div>
                </form>
                </div>
              </CardBody>
            </Card>
            </ModalBody>
          </Modal>:<></>
        }

      </Fragment>
    )
}
