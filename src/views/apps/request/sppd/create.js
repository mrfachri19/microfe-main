// ** React Imports
import React, { Fragment, useEffect, useState } from "react";
import classnames from 'classnames'

// ** Reactstrap Imports
import {
  Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label, ListGroup, ListGroupItem
} from "reactstrap";

import toastAlert from "@src/utils/alert";
// ** Third Party Components
import { useDropzone } from "react-dropzone";
import Flatpickr from "react-flatpickr";
import { FileText, X, DownloadCloud, Trash2 } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import Select, { components } from "react-select"; //eslint-disable-line

import moment from "moment";

// ** Styles Imports
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";

// ** Utils
import Avatar from "@components/avatar";
import { isObjEmpty, selectThemeColors } from "@utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { createSppd, getSearchKaryawan, listPetugasSppd, uploadSppd, pemeriksaSppd, getConnector } from "../../../../api";

import { EditOff16Filled, Edit16Filled, Delete16Regular } from "@fluentui/react-icons";

const MultipleColumnForm = () => {
  // diberitahukan kepada
  const [listNotifySelected, setListNotifySelected] = React.useState([]);
  const [listSearchNotify, setListSearchNotify] = React.useState([]);
  const [listNotifyFiltered, setListNotifyFiltered] = React.useState([]);

  // petugas
  const [listPetugas, setListpetugas] = React.useState([]);

  // pemeriksa
  const [listSearchPemeriksa, setListSearchPemeriksa] = React.useState([]);
  const [listPemeriksaSelected, setListPemeriksaSelected] = React.useState([]);
  const [listPemeriksaFiltered, setListPemeriksaFiltered] = React.useState([]);

  //pemohon
  const [listSearch, setListSearch] = React.useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();
  const handleSubmitSppd = (event) => {
    event.preventDefault();
    tambahSppd();
  };
  const [offset, setOffset] = React.useState(0);
  const [keyword, setKeyword] = useState("");
  const [nikPemohon, setNikPemohon] = useState("");
  const [triggerJn, setTriggerJn] = useState("");
  const [destination, setDestination] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [photoPemohon, setPhotoPemohon] = useState("");
  const [namaPemohon, setNamaPemohon] = useState("");
  const [jabatanPemohon, setJabatanPemohon] = useState("");
  const [searchField, setSearchField] = useState("");
  const [searchFieldPemeriksa, setSearchFieldPemeriksa] = useState("");
  const [searchFieldNotify, setSearchFieldNotify] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [DasarError, setDasarError] = useState(null);
  const [MaksudError, setMaksudError] = useState(null);
  const [KETError, setKETError] = useState(null);
  const [destinationError, setDestinationError] = useState(null);
  const [tempatTujuanError, setTempatTujuanError] = useState(null);
  const [dasarPerjalanan, setDasarPerjalanan] = useState("");
  const [note, setNote] = useState("");
  const [komentarSppd, setKomentarSppd] = useState("");
  const { userData } = useSelector((state) => state.auth);
  const [tempatTujuan, setTempatTujuan] = useState("");
  const [glAkun, setGlAkun] = useState("");
  const [costCenter, setCostCenter] = useState("");
  const [activityCode, setActivityCode] = useState("");
  const [tempatAsal, setTempatAsal] = useState({
    value: "",
    label: "Kota Asal"
  });
  const [tempatTujuanObj, setTempatTujuanObj] = useState({
    value: "",
    label: "Kota Tujuan"
  });
  const [cityOption, setCityOption] = useState([]);

  function tambahSppd() {
    let data = {
      request_id: 0,
      nik_pemohon: nikPemohon ? nikPemohon : userData.username,
      destination: destination + " - " + tempatTujuan,
      date_depart: moment(startDate).format("YYYY-MM-DD"),
      date_return: moment(endDate).format("YYYY-MM-DD"),
      description: keterangan,
      dasar: dasarPerjalanan,
      maksud: tujuan,
      gl_account: glAkun,
      cost_center: costCenter,
      activity_code: activityCode,
      note: note,
      comment: komentarSppd,
      profile: {
        profile_name: "",
        profile_pemeriksas: listPemeriksaFiltered,
        is_profile_default: true
      },
      notification: listNotifyFiltered,
      action: "SUBMIT"
    };
    let error = 0
    if (!destination) {
      error += 1
      setDestinationError('error')
    }
    if (!tempatTujuan) {
      error += 1
      setTempatTujuanError('error')
    } 
    if (!keterangan){
      error += 1
      setKETError('error')
    }
    if (!dasarPerjalanan){
      error += 1
      setDasarError('error')
    } 
    if (!tujuan){
      error += 1
      setMaksudError('error')
    }
    if (error > 0) {
      toastAlert("warning", "Ada field yg wajib di isi..");
    }
    if (listPemeriksaFiltered.length < 2) {
      toastAlert("warning", "Jumlah pemeriksa minimal 2 orang");
    } else {
      createSppd(data).then((res) => {
        //  // console.log(res.data.data)
        if (res.data.data.request_id) {
          uploadAfterPost(res.data.data.request_id)
          toastAlert("success", "Berhasil tambah SPPD");
          navigate("/app/request");
        } else {
          toastAlert("warning", res.data.message);
        }
      });
       // console.log(data)
    }
  }

  const store = useSelector((state) => state.calendar);
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles.map((file) => Object.assign(file))]);
    }
  });

  const CityComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex align-items-center">
          <p className="mb-0">{data.label}</p>
        </div>
      </components.Option>
    );
  };

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

  function getPartisipanData() {
    getSearchKaryawan(`?limit=5&offset=${offset}&keyword=${keyword}`).then(
      (res) => {
        var tempList = [];
        tempList = res.data.data;
        setListSearch(tempList)
        setListSearchPemeriksa(tempList)
        setListSearchNotify(tempList)
      }
    );
  }
  function getPetugasSppd() {
    listPetugasSppd("?appVersion=5.0.5").then((res) => {
      var tempList = [];
      tempList = res.data.data;
      //  // console.log("List Data petugasSppd => ", tempList);
      setListpetugas(tempList);
    });
  }

  function getListTempat(kota) {
    getConnector(`?vendor=centra&id=listkota&limit=10&offset=0&kota=${kota}&appVersion=5.0.6`).then((res) => {
      var tempList = [];
      tempList = res.data.data;
      //  // console.log("List Data Kota => ", tempList);

      let tempData = [];
      if (kota != '') {
        tempData.push({
          label: kota,
          value: kota
        })
      }
      for (let i = 0; i < tempList.length; i++) {
        tempData.push({
          label: tempList[i].kota,
          value: tempList[i].kota
        });
      }
      setCityOption(tempData);
    })
  }
  useEffect(() => {
    getPartisipanData();
  }, [keyword]);

  useEffect(() => {
    getPetugasSppd();
  }, []);


  function removeList(index, target) {
    if (target == 'pemeriksa') {
      let mydata = [...listPemeriksaSelected]
      mydata.splice(index, 1)
      setListPemeriksaSelected(mydata)
    }
    if (target == 'notify') {
      let mydata = [...listNotifySelected]
      mydata.splice(index, 1)
      setListNotifySelected(mydata)
    }
  }

  function searchPemohonSppd(keyword, target) {
    getSearchKaryawan(`?limit=5&offset=0&keyword=${keyword}`).then(
      (res) => {
        let datas = [];
        datas = res.data.data;
         // console.log("List Data Search => ", datas);

        if (target == 'pemohon') {
          setListSearch(datas);
        }
        if (target == 'pemeriksa') {
          setListSearchPemeriksa(datas);
        }
        if (target == 'notify') {
          setListSearchNotify(datas)
        }
      }
    );
  }

  function setPemohon(nik, name, position, foto) {
    setSearchField("")
    setPhotoPemohon(foto)
    setNamaPemohon(name)
    setJabatanPemohon(position)
    setNikPemohon(nik)
  }

  function setPemeriksaSppd(nik, name, position, foto) {
    setSearchFieldPemeriksa("")
    let current = listPemeriksaSelected;
    let newData = {
      'name': name,
      'nik': nik,
      'jabatan': position
    }
    current.push(newData)
    let newFiltered = [...new Map(current.map(obj => [JSON.stringify(obj), obj])).values()];
    //  // console.log(newFiltered)
    setListPemeriksaSelected(newFiltered)
  }

  function setNotify(nik, name, position, foto) {
    setSearchFieldNotify("")
    let current = listNotifySelected;
    let newData = {
      'name': name,
      'nik': nik,
      'jabatan': position
    }
    current.push(newData)
    let newFiltered = [...new Map(current.map(obj => [JSON.stringify(obj), obj])).values()];
    //  // console.log(newFiltered)
    setListNotifySelected(newFiltered)
  }

  function uploadAfterPost(request_id) {
    files.map((item, index) => {
      const formData = new FormData();
      formData.append("file", files[index]);
      formData.append("request_id", request_id);
      uploadSppd(formData).then((res) => {
        //  // console.log(res)
      });
    })
  }

  useEffect(() => {
    let newList2 = []
    listNotifySelected.map(item => {
      newList2.push({
        'nik': item.nik,
        'nama': item.name
      })
    })
    setListNotifyFiltered(newList2)
  }, [listNotifySelected]);

  useEffect(() => {
    let newList = []
    listPemeriksaSelected.map(item => {
      newList.push({
        'nik_or_objid': item.nik.toString(),
        'pemeriksa': item.name
      })
    })
    setListPemeriksaFiltered(newList)
  }, [listPemeriksaSelected]);

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4" className="text-primary">
          Buat Pengajuan SPPD
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmitSppd}>
          <Row style={{ marginBottom: "25px", marginRight: "10px" }}>
            <Col sm={6}>
              <Row>
                <Col>
                  <Label className="form-label text-black" htmlFor="guests">
                    Pemohon
                  </Label>
                </Col>
                <Col>
                  <div className="d-flex justify-content-end">
                    <small className={searchField ? 'ms-2 border-2 border rounded-2 border-tertiary d-none' : 'ms-2 border-2 border rounded-2 border-tertiary'} style={{ padding: '6px' }} onClick={e => (setSearchField('true'))} >Pilih <Edit16Filled /></small>
                    <small className={searchField ? 'ms-2 border-2 border rounded-2 border-tertiary' : 'ms-2 border-2 border rounded-2 border-tertiary d-none'} style={{ padding: '6px' }} onClick={e => (setSearchField(''))} >Tutup <EditOff16Filled /></small>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col sm="6">
              &nbsp;
            </Col>
            <Col sm="6">
              <div style={{ padding: '6px' }} id="search" className={searchField ? '' : 'd-none'}>
                <Card>
                  <CardBody className="card-snippet">
                    <Input
                      placeholder="Search karyawan"
                      onKeyUp={(e) => searchPemohonSppd(e.target.value, 'pemohon')}
                    />
                    <div>
                      {listSearch.map((item) => (
                        <>
                          <div onClick={e => (setPemohon(item.nik, item.name, item.v_short_posisi, item.foto))}
                            className="d-flex justify-content-start align-items-center mb-1"
                            style={{ paddingTop: "8px", paddingBottom: "8px" }}
                          >
                            <Avatar
                              className="me-1 mb-auto photo-karyawan "
                              img={item.foto}
                              imgHeight="40"
                              imgWidth="40"
                            />
                            <div>&nbsp;&nbsp;</div>
                            <div className="profile-user-info">
                              <div>
                                <small className="mb-0">{item.name}</small>
                              </div>
                              <div>
                                <small className="text-muted">{item.v_short_posisi}</small>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col sm="6">
              &nbsp;
            </Col>
            <Col sm="6">
              <div style={{ padding: '10px' }} className="d-flex flex-wrap align-items-center ms-2 border-2 border rounded-2 border-tertiary">
                <Avatar
                  className="my-0 me-1"
                  id="photo-pemohon"
                  size="lg"
                  img={photoPemohon ? photoPemohon : `https://diarium.telkom.co.id/getfoto/${userData.username}`}
                />
                <div style={{ display: "block", marginLeft: "4px" }}>
                  <div id="nama-pemohon">{namaPemohon ? namaPemohon : userData.nama}</div>
                  <div id="jabatan-pemohon">{jabatanPemohon ? jabatanPemohon : userData.jabatan}</div>
                </div>
              </div>
            </Col>
            <Col sm="6">
              &nbsp;
            </Col>
          </Row>
          <Row>
            <Row style={{ marginBottom: "25px" }}>
              <Col md="6" sm="6">
                <Label className='form-label' htmlFor='lastNameMulti'>
                  Kota Asal <small className="text-secondary">*</small>
                </Label>
                <Select
                  className={classnames('react-select', { 'is-invalid': destinationError !== null })}
                  classNamePrefix="select"
                  placeholder="Kota Asal"
                  isClearable={false}
                  options={cityOption}
                  theme={selectThemeColors}
                  value={tempatAsal}
                  onInputChange={(e) => {
                    if (e != '') {
                      setDestination(e);
                    } getListTempat(e); setTempatAsal({ value: destination, label: destination });setDestinationError(null);
                  }}
                  onChange={(data) => { setTempatAsal({ value: data.value, label: data.label }); setDestination(data.value); }}
                  components={{ Option: CityComponent }}
                />
              </Col>
              <Col md="6" sm="6">
                <Label className='form-label' htmlFor='lastNameMulti'>
                  Kota Tujuan <small className="text-secondary">*</small>
                </Label>
                <Select
                  className={classnames('react-select', { 'is-invalid': tempatTujuanError !== null })}
                  classNamePrefix="select"
                  placeholder="Kota Tujuan"
                  isClearable={false}
                  options={cityOption}
                  theme={selectThemeColors}
                  value={tempatTujuanObj}
                  onInputChange={(e) => {
                    if (e != '') {
                      setTempatTujuan(e);
                    } getListTempat(e); setTempatTujuanObj({ value: tempatTujuan, label: tempatTujuan }); setTempatTujuanError(null)
                  }}
                  onChange={(data) => { setTempatTujuanObj({ value: data.value, label: data.label }); setTempatTujuan(data.value); }}
                  components={{ Option: CityComponent }}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "25px" }}>
              <Col md="6" sm="6">
                <Label className="form-label text-black">Tanggal Mulai <small className="text-secondary">*</small></Label>
                <Flatpickr
                  className="form-control"
                  value={startDate}
                  onChange={(date) => setStartDate(date[0])}
                  id="default-picker"
                />
              </Col>
              <Col md="6" sm="6">
                <Label className="form-label text-black">Tanggal Akhir <small className="text-secondary">*</small></Label>
                <Flatpickr
                  className="form-control"
                  value={endDate >= startDate ? endDate : setEndDate(startDate)}
                  options={{
                    minDate: startDate,
                  }}
                  onChange={(date2) => setEndDate(date2[0])}
                  id="default-picker"
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "25px" }}>
              <Label className="form-label text-black">Keterangan <small className="text-secondary">*</small></Label>
              <Col md="12" sm="12">
                <Input
                  invalid={KETError == null ? false : true}
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Keterangan"
                  onChange={(e) => {
                    setKeterangan(e.target.value)
                    setKETError(null)
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "25px" }}>
              <Col md="6" sm="12">
                <Label className="form-label text-black">
                  Dasar Perjalanan Dinas <small className="text-secondary">*</small>
                </Label>
                <Input
                  invalid={DasarError == null ? false : true}
                  type="text"
                  name="dasar"
                  id="dasar"
                  placeholder="Dasar Perjalanan Dinas"
                  onChange={(e) => {
                    setDasarPerjalanan(e.target.value)
                    setDasarError(null)
                  }}
                />
              </Col>
              <Col md="6" sm="12">
                <Label className="form-label text-black">
                  Maksud dan Tujuan <small className="text-secondary">*</small>
                </Label>
                <Input
                  invalid={MaksudError == null ? false : true}
                  type="text"
                  name="maksud"
                  id="maksud"
                  onChange={(e) => {
                    setTujuan(e.target.value)
                    setMaksudError(null)
                  }}
                  placeholder="Maksud dan Tujuan"
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "25px" }}>
              <Col md="6" sm="12">
                <Label className="form-label text-black">GL Account</Label>
                <Input
                  type="text"
                  name="gl_account"
                  id="gl_account"
                  onChange={(e) => setGlAkun(e.target.value)}
                  placeholder="GL Account"
                />
              </Col>
              <Col md="6" sm="12">
                <Label className="form-label">Cost Center ID</Label>
                <Input
                  type="text"
                  name="cost_center"
                  id="cost_center"
                  onChange={(e) => setCostCenter(e.target.value)}
                  placeholder="Cost Center ID"
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "25px" }}>
              <Col md="6" sm="12">
                <Label className="form-label">Kode Aktifitas</Label>
                <Input
                  type="text"
                  name="activity_code"
                  id="activity_code"
                  onChange={(e) => setActivityCode(e.target.value)}
                  placeholder="Kode Aktifitas"
                />
              </Col>
              <Col md="6" sm="12">
                <Label className="form-label">Catatan</Label>
                <Input
                  type="text"
                  name="note"
                  id="note"
                  placeholder="Catatan"
                  onChange={(e) => setNote(e.target.value)}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "25px" }}>
              <Col md="6" sm="12">
                <Label className="form-label">Lampiran</Label>
                <div {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <div className="d-flex align-items-center justify-content-center flex-column">
                    <DownloadCloud size={64} />
                    <h5>Drop Files here or click to upload</h5>
                    <p className="text-secondary">
                      Drop files here or click{" "}
                      <a href="/" onClick={(e) => e.preventDefault()}>
                        browse
                      </a>{" "}
                      thorough your machine
                    </p>
                  </div>
                </div>
                {files.length ? (
                  <Fragment>
                    <ListGroup className="my-2">{fileList}</ListGroup>
                  </Fragment>
                ) : null}
              </Col>
            </Row>
            <Row style={{ marginBottom: "25px" }}>

              <Col md="4" sm="12">
                <Row>
                  <Col sm={12}>
                    <Row>
                      <Col>
                        <Label className="form-label text-black" htmlFor="guests">
                          Pemeriksa
                        </Label>
                      </Col>
                      <Col>
                        <div className="d-flex justify-content-end">
                          <small className={searchFieldPemeriksa ? 'ms-2 border-2 border rounded-2 border-tertiary d-none' : 'ms-2 border-2 border rounded-2 border-tertiary'} style={{ padding: '6px' }} onClick={e => (setSearchFieldPemeriksa('true'))} >Pilih <Edit16Filled /></small>
                          <small className={searchFieldPemeriksa ? 'ms-2 border-2 border rounded-2 border-tertiary' : 'ms-2 border-2 border rounded-2 border-tertiary d-none'} style={{ padding: '6px' }} onClick={e => (setSearchFieldPemeriksa(''))} >Tutup <EditOff16Filled /></small>

                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm="12">
                    <div style={{ padding: '6px' }} id="search" className={searchFieldPemeriksa ? '' : 'd-none'}>
                      <Input
                        placeholder="Search karyawan"
                        onKeyUp={(e) => searchPemohonSppd(e.target.value, 'pemeriksa')}
                      />
                      <div>
                        {listSearchPemeriksa.map((item) => (
                          <>
                            <div onClick={e => (setPemeriksaSppd(item.nik, item.name, item.v_short_posisi, item.foto))}
                              className="d-flex justify-content-start align-items-center mb-1"
                              style={{ paddingTop: "8px", paddingBottom: "8px" }}
                            >
                              <Avatar
                                className="me-1 mb-auto photo-karyawan "
                                img={item.foto}
                                imgHeight="40"
                                imgWidth="40"
                              />
                              <div>&nbsp;&nbsp;</div>
                              <div className="profile-user-info">
                                <div>
                                  <small className="mb-0">{item.name}</small>
                                </div>
                                <div>
                                  <small className="text-muted">{item.v_short_posisi}</small>
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  </Col>
                  <Col sm="12">
                    &nbsp;
                  </Col>
                  <Col sm="12">
                    <div style={{ padding: '10px' }} className={listPemeriksaSelected.length > 0 ? 'd-flex flex-wrap align-items-center ms-2 border-2 border rounded-2 border-tertiary' : 'd-flex flex-wrap align-items-center'}>
                      {listPemeriksaSelected.map((item, index) => (
                        <>
                          <div className="d-flex justify-content-start align-items-center mb-1" style={{ paddingTop: "8px", paddingBottom: "8px" }}>
                            <Delete16Regular fill={`var(--bs-secondary)`} className={'text-secondary'} onClick={e => removeList(index, 'pemeriksa')} />
                            <div>&nbsp;&nbsp;</div>
                            <Avatar
                              className="me-1 mb-auto photo-karyawan "
                              img={`https://diarium.telkom.co.id/getfoto/` + item.nik}
                              imgHeight="40"
                              imgWidth="40"
                            />
                            <div>&nbsp;&nbsp;</div>
                            <div className="profile-user-info">
                              <div>
                                <small className="mb-0">{item.name}</small>
                              </div>
                              <div>
                                <small className="text-muted">{item.jabatan}</small>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </Col>
                  <Col sm="12">
                    &nbsp;
                  </Col>
                </Row>
              </Col>
              <Col md="4" sm="12">
                <Row>
                  <Col sm={12}>
                    <Row>
                      <Col>
                        <Label className="form-label text-black" htmlFor="guests">
                          Diberitahukan Kepada
                        </Label>
                      </Col>
                      <Col>
                        <div className="d-flex justify-content-end">
                          <small className={searchFieldNotify ? 'ms-2 border-2 border rounded-2 border-tertiary d-none' : 'ms-2 border-2 border rounded-2 border-tertiary'} style={{ padding: '6px' }} onClick={e => (setSearchFieldNotify('true'))} >Pilih <Edit16Filled /></small>
                          <small className={searchFieldNotify ? 'ms-2 border-2 border rounded-2 border-tertiary' : 'ms-2 border-2 border rounded-2 border-tertiary d-none'} style={{ padding: '6px' }} onClick={e => (setSearchFieldNotify(''))} >Tutup <EditOff16Filled /></small>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col sm="12">
                    <div style={{ padding: '6px' }} id="search" className={searchFieldNotify ? '' : 'd-none'}>
                      <Input
                        placeholder="Search karyawan"
                        onKeyUp={(e) => searchPemohonSppd(e.target.value, 'notify')}
                      />
                      <div>
                        {listSearchNotify.map((item) => (
                          <>
                            <div>
                              <div onClick={e => (setNotify(item.nik, item.name, item.v_short_posisi, item.foto))}
                                className="d-flex justify-content-start align-items-center mb-1"
                                style={{ paddingTop: "8px", paddingBottom: "8px" }}
                              >
                                <Avatar
                                  className="me-1 mb-auto photo-karyawan "
                                  img={item.foto}
                                  imgHeight="40"
                                  imgWidth="40"
                                />
                                <div>&nbsp;&nbsp;</div>
                                <div className="profile-user-info">
                                  <div>
                                    <small className="mb-0">{item.name}</small>
                                  </div>
                                  <div>
                                    <small className="text-muted">{item.v_short_posisi}</small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  </Col>
                  <Col sm="12">
                    &nbsp;
                  </Col>
                  <Col sm="12">
                    <div style={{ padding: '10px' }} className={listNotifySelected.length > 0 ? 'd-flex flex-wrap align-items-center ms-2 border-2 border rounded-2 border-tertiary' : 'd-flex flex-wrap align-items-center'}>
                      {listNotifySelected.map((item, index) => (
                        <>
                          <div
                            className="d-flex justify-content-start align-items-center mb-1"
                            style={{ paddingTop: "8px", paddingBottom: "8px" }}
                          >
                            <Delete16Regular fill={`var(--bs-secondary)`} className={'text-secondary'} onClick={e => removeList(index, 'notify')} />
                            <div>&nbsp;&nbsp;</div>
                            <Avatar
                              className="me-1 mb-auto photo-karyawan "
                              img={`https://diarium.telkom.co.id/getfoto/` + item.nik}
                              imgHeight="40"
                              imgWidth="40"
                            />
                            <div>&nbsp;&nbsp;</div>
                            <div className="profile-user-info">
                              <div>
                                <small className="mb-0">{item.name}</small>
                              </div>
                              <div>
                                <small className="text-muted">{item.jabatan}</small>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  </Col>
                  <Col sm="12">
                    &nbsp;
                  </Col>
                </Row>
              </Col>
              <Col md="4" sm="12">
                <Col sm={12}>
                  <Row>
                    <Col>
                      <Label className="form-label text-black" htmlFor="guests">
                        Petugas
                      </Label>
                    </Col>
                    <Col>
                      <div className="d-flex justify-content-end">
                        <small style={{ padding: '6px' }}>&nbsp;</small>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm="12">
                  &nbsp;
                </Col>
                <div style={{ padding: '10px' }} className="d-flex flex-wrap align-items-center ms-2 border-2 border rounded-2 border-tertiary">
                  {listPetugas.map((item) => (
                    <>
                      <div
                        className="d-flex justify-content-start align-items-center mb-1"
                        style={{ paddingTop: "8px", paddingBottom: "8px" }}
                      >
                        <Avatar
                          className="me-1 mb-auto photo-karyawan "
                          img={`https://diarium.telkom.co.id/getfoto/` + item.nik}
                          imgHeight="40"
                          imgWidth="40"
                        />
                        <div>&nbsp;&nbsp;</div>
                        <div className="profile-user-info">
                          <div>
                            <small className="mb-0">{item.name}</small>
                          </div>
                          <div>
                            <small className="text-muted">{item.jabatan}</small>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
                <Col sm="12">
                  &nbsp;
                </Col>
              </Col>
            </Row>
            <Row style={{ marginBottom: "25px" }}>
              <Col>
                <Label className="form-label">Komentar</Label>
                <Input
                  type="textarea"
                  name="note"
                  id="note"
                  placeholder="Komentar"
                  onChange={(e) => setKomentarSppd(e.target.value)}
                />
              </Col>
            </Row>
            <Col sm="12">
              <Row style={{ marginBottom: "25px" }}>
                <Col className="d-grid justify-content-start" sm="6">
                  <Button
                    className="me-1"
                    color="primary"
                    type="submit"
                  >
                    <span className="text-white fw-bolder">Buat</span>
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card >
  );
};

const CreateSppd = () => {
  return (
    <Fragment>
      <Row>
        <PerfectScrollbar
          className="media-list scrollable-container"
          options={{
            wheelPropagation: false
          }}
        >
          <Col sm="12">{MultipleColumnForm()}</Col>
        </PerfectScrollbar>
      </Row>
    </Fragment>
  );
};
export default CreateSppd;
