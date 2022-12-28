import React, { Fragment, useEffect, useState } from 'react'
import { 
    Card, 
    CardHeader, 
    CardTitle, 
    CardBody, 
    Row, 
    Col, 
    Input, 
    Form, 
    Button, 
    Label, 
    FormFeedback, 
    UncontrolledButtonDropdown, 
    DropdownMenu, 
    DropdownItem, 
    DropdownToggle, 
    Badge, 
    Container, 
    InputGroup, 
    InputGroupText, 
    ListGroup, 
    ListGroupItem,
} from 'reactstrap'


import { useDropzone } from 'react-dropzone'
import axios from 'axios';
import { FileText, X, DownloadCloud } from 'react-feather'

import { getQuestion, postAnswer, uploadFeedback } from '../../../api';

import Select from "react-select"; //eslint-disable-line

import { isObjEmpty, selectThemeColors } from "@utils";

import { useDispatch, useSelector } from "react-redux";

import { getUserData } from "@src/utils/storage.js";

import toastAlert from "@src/utils/alert";

import { useNavigate } from 'react-router-dom';

import { useForm, Controller } from 'react-hook-form';


import {
    getTasks,
    updateTask,
    selectTask,
    addTask,
    deleteTask,
    reOrderTasks,
    categoryRequest,
    getData,
    selectPermohonanId,
    setIsPernyataanModal,
    setIsPernyataanModalYes,
    setIsImageModal,
    setIsLocationModal,
    setIdWfhLocation,
    setWfhLocationLat,
    setWfhLocationLong,
    setWfhLocationLat1,
    setWfhLocationLong1,
    setWfhLocationLat2,
    setWfhLocationLong2,
    setWfhLocationLat3,
    setWfhLocationLong3,
    setWfhLocationLat4,
    setWfhLocationLong4,
    selectJenisCuti,
    selectRoleCode,
    selectRoleCodeAdv,
    setDataQuota,
    setDataCalender,
    setJourneyStatus,
    setIsValidationModalYes
} from "../request/store";
import ValidationModal from '../request/modals/ValidationModal';
import SuccessModal from '../request/modals/SuccessModal';
// const dispatch = useDispatch();
import { toggleFeedbackModal } from '../../../redux/modalToggle';
import FeedbackModal from "../../components/Modals/FeedbackModal";

const FeedbackBanner = () => {
    return (
        <Card style={{backgroundColor: '#EBF8FF', border: '1px solid #3182CE', color: '#3182CE'}}>
            <CardBody>
                <p style={{color:'#3182CE'}}>
                Hi Telkomers,
                </p>
                <p style={{color:'#3182CE'}}>
                Saat ini Tim Diarium sedang membangun The New Web Diarium dengan peningkatan User Experience. Kami berharap bisa memberikan Digital WorkLife Experience terbaik bagi Telkomers, sehingga kami membutuhkan saran/kritik/ide terbaik dari Telkomers.
                </p>
            </CardBody>
        </Card>
    )
}
const FeedbackForm = () => {

    //file uploader
    const [files, setFiles] = useState([]);
    const [listLampiran, setListLampiran] = React.useState([]);
    const [hasilUpload, setHasilUpload] = React.useState([]);
    const [hasilUpload1, setHasilUpload1] = React.useState([]);
    const [hasilUpload2, setHasilUpload2] = React.useState([]);
    const [hasilUpload3, setHasilUpload3] = React.useState([]);
    const [hasilUpload4, setHasilUpload4] = React.useState([]);
    const [showInput, setShowInput] = useState(false);
    const [showRelated, setShowRelated] = useState(true);
    const [optionData, setOptionData] = useState([]);
    const [optionRelated, setOptionRelated] = useState([]);
    const [idQuestion, setIdQuestion] = useState([]);
    const [telepon, setTelepon] = React.useState("");
    const [jenisFeedback, setJenisFeedback] = React.useState("");
    const [detailFeedback, setDetailFeedback] = React.useState("");
    const [saranHarapan, setSaranHarapan] = React.useState("");
    const [dihubungi, setDihubungi] = React.useState("");
    const [relatedMenu, setRelatedMenu] = React.useState("");
    const [dataUser, setDatauser] = React.useState("");
    const [isDisable, setIsDisable] = React.useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isValidationModalYes = useSelector((state) => state.request.isValidationModalYes.isValidationModalYes);

    

    function getQuestionData() {
        let tempData = [];
        let tempIdQuestion = [];
        let tempRelated = [];
        getQuestion().then(res => {
            const datas = res ? res.data.data[1].choices: [];
            const related = res ? res.data.data[2].choices:[];
            const dataId = res? res.data.data : [];
            //  // console.log("question",datas);
            //  // console.log("dataId",dataId);
            datas.forEach((q) => {
                tempData.push({
                    label: q.description,
                    value: q.questionChoiceId,
                });
            //  // console.log("list question", tempData);
            setOptionData(tempData);
            });
            dataId.map((i)=> {
                tempIdQuestion.push ({
                    ids : i.questionId,
                    desc : i.question
                })
            });
            //  // console.log("idQuestion", tempIdQuestion);
            setIdQuestion(tempIdQuestion); 

            related.map((x)=> {
                tempRelated.push ({
                    label: x.description,
                    value: x.questionChoiceId,
                })
            });
            //  // console.log("related", tempRelated);
            setOptionRelated(tempRelated); 
        });

    }


    useEffect(() => {
        // dispatch({
        //     type: "set",
        //     // // isImageModal: false,
        //     // // isPernyataanFwaModal: false,
        //     // isValidationModal: false,
        //     // isValidationModalYes: false,
        //     // toggleFeedbackModal: false,
        //     // isPostApproved: false,
        //   });
          dispatch({
            type: "set",
            // toggleFeedbackModal: false,
          })
        getQuestionData();
        // getPresenceDetail();
    }, [])

    function PostFeedbackData() {
        let dataLampiran = [
            {
                path: hasilUpload.path ? hasilUpload.path : "",
                filename: hasilUpload.filename ? hasilUpload.filename : ""
            },
            {
                path: hasilUpload1.path ? hasilUpload1.path : "",
                filename: hasilUpload1.filename ? hasilUpload1.filename : ""
            },
            {
                path: hasilUpload2.path ? hasilUpload2.path : "",
                filename: hasilUpload2.filename ? hasilUpload2.filename : ""
            },
            {
                path: hasilUpload3.path ? hasilUpload3.path : "",
                filename: hasilUpload3.filename ? hasilUpload3.filename : ""
            },
            {
                path: hasilUpload4.path ? hasilUpload4.path : "",
                filename: hasilUpload4.filename ? hasilUpload4.filename : ""
            },
        ];

        let dataAnswer = [];
        idQuestion.forEach(item => {
            if(item.desc === "Jenis Feedback"){
                dataAnswer.push({
                    answer: jenisFeedback,
                    questionId: item.ids
                })
            }else if(item.desc === "Related Menu" ){
                dataAnswer.push({
                    answer: relatedMenu,
                    questionId: item.ids
                })
            }else if(item.desc === "Detail Feedback"){
                dataAnswer.push({
                    answer: detailFeedback,
                    questionId: item.ids
                })
            }else if(item.desc === "Saran / Harapan"){
                dataAnswer.push({
                    answer: saranHarapan,
                    questionId: item.ids
                })
            }else if(item.desc === "Lampirkan File Pendukung"){
                dataAnswer.push({
                    answer: dataLampiran,
                    questionId: item.ids
                })
            }else if(item.desc === "Apakah bersedia dihubungi terkait feedback yang diberikan?"){
                dataAnswer.push({
                    answer: dihubungi,
                    questionId: item.ids
                })
            }else if(item.desc === "Nomor telepon" ){
                dataAnswer.push({
                    answer: telepon,
                    questionId: item.ids
                })
            }
        });
        
        let data = {
            answerQuestions : dataAnswer,
            eventId : 65
        };

        //  // console.log(data);
        // let data = {
        //     nik_pemohon: dataUserNik,
        //     role_id: selectedRoleCode,
        //     advance_role_id: "0",
        //     start_leave: moment(startDate).format("YYYY-MM-DD"),
        //     end_leave: moment(endDate).format("YYYY-MM-DD"),
        //     leaving_number: 2,
        //     start_depart: cutiPerjalanan ? moment(dateKeberangkatan[0]).format("YYYY-MM-DD") : "",
        //     end_depart: cutiPerjalanan ? moment(dateKeberangkatan[1]).format("YYYY-MM-DD") : "",
        //     start_return: cutiPerjalanan ? moment(dateKepulangan[0]).format("YYYY-MM-DD") : "",
        //     end_return: cutiPerjalanan ? moment(dateKepulangan[1]).format("YYYY-MM-DD") : "",
        //     depart_trip_number: "",
        //     return_trip_number: "",
        //     leaving_reason: alasanCuti,
        //     leaving_address: alamatCuti,
        //     phone_number: telepon,
        //     comment: comment,
        //     nik_atasan: listLeader.nik,
        //     notification: listNotifications,
        //     dokumen_id: "",
        //     attachment: dataLampiran,
        //     // attachment: [],
        //     tanggal_terpakai: (moment(startDate).format("YYYY-MM-DD"), moment(endDate).format("YYYY-MM-DD")),
        // };

        postAnswer(data).then((res) => {
            //  // console.log("post feedback", res);
            // setShowSnakebar(true);
            // dispatch({ type: "set", isValidationModalYes: true });
            if (res.data.status === 'failed') {
                toastAlert("warning", `${res.data.message}`);
            }
            if (res.data.status !== 'failed') {
                toastAlert("success", "Berhasil mengirim Feedback!");
                // dispatch(setIsValidationModalYes({ isValidationModalYes: true }))
                dispatch(toggleFeedbackModal(true))
                setTimeout(() => {
                    dispatch(toggleFeedbackModal(false))
                    navigate("/dashboard")
                }, 3000);
            }
        });
    }

    const [check, setCheck] = React.useState(false)

    // const [files, setFiles] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop: acceptedFiles => {
            setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
        }
    })

    const renderFilePreview = file => {
        if (file.type.startsWith('image')) {
            return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
        } else {
            return <FileText size='28' />
        }
    }

    const handleRemoveFile = file => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter(i => i.name !== file.name)
        setFiles([...filtered])
    }

    const renderFileSize = size => {
        if (Math.round(size / 100) / 10 > 1000) {
            return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
        } else {
            return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
        }
    }

    const fileList = files.map((file, index) => (
        <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
            <div className='file-details d-flex align-items-center'>
                <div className='file-preview me-1'>{renderFilePreview(file)}</div>
                <div>
                    <p className='file-name mb-0'>{file.name}</p>
                    <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
                </div>
            </div>
            <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
                <X size={14} />
            </Button>
        </ListGroupItem>
    ))

    // const handleRemoveAllFiles = () => {
    //     setFiles([])
    // }

    // function postLampiran() {
    //     axios.post(`${CONFIG.API_URL}/gateway/telkom-diarium-mobilecollaborate/1.0/mobile/file/upload/single/dok-cuti/46982`, formData)
    //         .then(res => {
    //              // console.log(res);
    //              // console.log("data lampiran terpisah", res.data);
    //         })
    // }

    useEffect(() => {
            //  // console.log("ini file yang diupload", files[0])
            let dataUser = getUserData().id_user
            // var data = files
            // for (let i = 0; i < data.length; i++) {
            //     const formData = new FormData();
            //     formData.append("file", files[i]);
            //     uploadLampiranCuti(formData).then((res) => {
            //         var tempList = [];
            //         tempList = res.data;
            //          // console.log("balikan data abis upload =>", tempList);
            //          // console.log(tempList.data.filename);
            //         let tempData = [];
            //         for (let i = 0; i < tempList.length; i++) {
            //             tempData.push({
            //                 path: tempList[i].data.path,
            //                 filename: tempList[i].data.filename
            //             });
            //              // console.log("ini tempData lampiran", tempData)
            //         }
            //         setListLampiran(tempData);
            //          // console.log("list lampiran data cuti", tempData)
            //     });
            // }
            if (files.length === 1) {
                //  // console.log("file", files[0].name);
                const formData = new FormData();
                formData.append('file', files[0]);
                
                //  // console.log(formData);
                uploadFeedback(formData).then((res) => {
                    var tempList = [];
                    tempList = res.data;
                    //  // console.log("balikan data abis upload =>", tempList);
                    //  // console.log(tempList.data.filename);
                    setHasilUpload(tempList.data);
                });
            }
            if (files.length === 2) {
                const formData = new FormData();
                formData.append("file", files[1]);
                uploadFeedback(formData).then((res) => {
                    var tempList = [];
                    tempList = res.data;
                    //  // console.log("balikan data abis upload =>", tempList);
                    //  // console.log(tempList.data.filename);
                    setHasilUpload1(tempList.data);
                });
            }
            if (files.length === 3) {
                const formData = new FormData();
                formData.append("file", files[2]);
                uploadFeedback(formData).then((res) => {
                    var tempList = [];
                    tempList = res.data;
                    //  // console.log("balikan data abis upload =>", tempList);
                    //  // console.log(tempList.data.filename);
                    setHasilUpload2(tempList.data);
                });
            }
            if (files.length === 4) {
                const formData = new FormData();
                formData.append("file", files[3]);
                uploadFeedback(formData).then((res) => {
                    var tempList = [];
                    tempList = res.data;
                    //  // console.log("balikan data abis upload =>", tempList);
                    //  // console.log(tempList.data.filename);
                    setHasilUpload3(tempList.data);
                });
            }
            if (files.length === 5) {
                const formData = new FormData();
                formData.append("file", files[4]);
                uploadFeedback(formData).then((res) => {
                    var tempList = [];
                    tempList = res.data;
                    //  // console.log("balikan data abis upload =>", tempList);
                    //  // console.log(tempList.data.filename);
                    setHasilUpload4(tempList.data);
                });
            }
        }, [files])

    
   function handleCheck(e) {
        const value = e.target.value;
        if (value === 'ya') {
            setDihubungi('ya')
            setShowInput(true)
        } else {
            setDihubungi('tidak')
            setShowInput(false)
        }
    }

    const disableButton = () =>{
        if (!jenisFeedback && !detailFeedback && !saranHarapan ) {
            setIsDisable(true);
        }else{
            setIsDisable(false);
        }
    } 

    const handleSelect = (e) => {
        setJenisFeedback(e.value)
        var label = e.label;
        if(label === "Usulan Fitur"){
            setShowRelated(false)
        }else{
            setShowRelated(true)
        }
        //  // console.log('selection opt', jenisFeedback)
        // Here you trigger whatever you want
      }

      const handleSelectRelated = (e) => {
        setRelatedMenu(e.value)
        // var label = e.label;
        // if(label === "Usulan Fitur" || label === "Others"){
        //     setShowRelated(true)
        // }else{
        //     setShowRelated(false)
        // }
        //  // console.log('selection related', relatedMenu)
        // Here you trigger whatever you want
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        PostFeedbackData()
    };

    return (

        <Card>
            <CardBody style={{paddingRight:"50px",paddingLeft:"50px"}}>
                <Form onSubmit={handleSubmit} className='row g-3'>
                <div className="col-md-6" style={{paddingBottom:"10px"}}>
                    <label className="form-label fs-5">Jenis Feedback <span className="text-danger">*</span></label>
                    <Select id="jenisFeedBack" options={optionData} placeholder="Pilih Jenis Feedback" onChange={(e) => handleSelect(e)}></Select>
                </div>
                {showRelated !== false ?
                <div className="col-md-6" style={{paddingBottom:"10px"}}>
                    <label className="form-label fs-5">Related Menu <span className="text-danger">*</span></label>
                    <Select id="jenisFeedBack" options={optionRelated} placeholder="Pilih Related Menu" onChange={(e) => handleSelectRelated(e)}></Select>
                </div> : null }
                <div className="col-md-6 " style={{paddingBottom:"10px"}}>
                    <label for="inputPassword4 " className="form-label fs-5">Detail Feedback <span className="text-danger">*</span></label>
                    <Input type="text" className="form-control" id="detailFeedback" name="detailFeedback" placeholder="Masukkan Detail" value= {detailFeedback} onChange={(e) => setDetailFeedback(e.target.value)}/>
                </div>
                <div className="col-md-12" style={{paddingBottom:"10px"}}>
                    <label for="inputPassword4" className="form-label fs-5">Saran / Harapan <span className="text-danger">*</span></label>
                    <Input type="text" className="form-control" id="saranHarapan" name='saranHarapan' placeholder="Masukkan Saran / harapan" value= {saranHarapan} onChange={(e) => setSaranHarapan(e.target.value)}style={{height:'111px'}} />
                </div>
                <div className="col-md-12" style={{paddingBottom:"10px"}}>
                    <label for="inputPassword4" className="form-label fs-5">Lampiran File Pendukung (Gambar / Video)</label>
                    <div {...getRootProps({ className: 'dropzone' })} style={{ border: '1px dashed #3182CE', minHeight: "fit-content", paddingTop:"5px", paddingBottom:"5px" }}>
                        <input {...getInputProps()} />
                        <div className='d-flex align-items-center justify-content-center flex-column'>
                            <h6>Taruh berkas disini atau klik untuk upload</h6>
                            <p className='text-tertiary text-center' style={{fontSize: '10px'}}>
                                Drop files here or click{' '}
                                <a href='/' onClick={e => e.preventDefault()}>
                                    browse
                                </a>{' '}
                                thorough your machine
                            </p>
                        </div>
                    </div>
                </div>
                {files.length ? (
                    <Fragment>
                        <ListGroup className='my-2'>{fileList}</ListGroup>
                        {/* <div className='d-flex justify-content-end'>
                            <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                            Remove All
                            </Button>
                            <Button color='primary'>Upload Files</Button>
                        </div> */}
                    </Fragment>
                ) : null}
                <div className="col-md-6 mt-5 fs-5" style={{paddingBottom:"10px"}}>
                    <span>
                    Apakah kamu bersedia dihubungi terkait feedback yang diberikan?
                    </span>
                </div>
                <div className="col-md-6 mt-5" >
                    <Input className="form-check-input fs-5" type="radio" name="flexRadioDefault" value="ya" style={{marginRight:"5px"}} onChange={(e) => handleCheck(e)} />
                    <label className="form-check-label" for="flexRadioDefault1">
                        Ya
                    </label>
                    <Input className="form-check-input fs-5" type="radio" name="flexRadioDefault" value="tidak" style={{marginRight:"5px", marginLeft:'10px'}} onChange={(e) => handleCheck(e)} />
                    <label className="form-check-label" for="flexRadioDefault2">
                        Tidak
                    </label>
                </div>
                    {showInput !== false ? 
                        <div className="col-md-4">
                            <label className="form-label fs-5">Nomor Telepon</label>
                            <Input type="number" id="telepon" name='telepon' value= {telepon} onChange={(e) => setTelepon(e.target.value)} className="form-control" />
                        </div>
                    : null}
                    {/* <div className="col-md-12">
                        <div className="text-left">
                            <button className='btn btn-primary' disabled={isDisable} onClick={() => { handleSubmit,  // console.log("klik buat feedback") }}>Kirim</button>
                        </div>
                    </div> */}

                    <div className="col-md-12">
                        <div className="text-left">
                            {jenisFeedback !== "" && detailFeedback !== "" && saranHarapan != "" ? (
                                <button className='btn btn-primary' onClick={() => { handleSubmit }}>Kirim</button>
                            ) : (
                                <button className='btn btn-tertiary-600' disabled><span className='text-tertiary/500'>Kirim</span></button>

                            )}
                        </div>
                    </div>
               
                </Form>
<FeedbackModal />
            </CardBody>
        </Card>
    )
};
const Feedback = () => {
return (
    <Fragment>
            <div>
            {FeedbackBanner()}
            </div>
            <div>
            {FeedbackForm()}
            </div>
    </Fragment>
)};

export default Feedback;