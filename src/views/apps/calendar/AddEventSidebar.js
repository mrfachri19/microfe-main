// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import { X } from 'react-feather'
import toastAlert from "@src/utils/alert"
import Flatpickr from 'react-flatpickr'
import { Indonesian } from 'flatpickr/dist/l10n/id'
import Select, { components } from 'react-select' // eslint-disable-line
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useForm } from 'react-hook-form'
import { CalendarLtr20Regular, ChatHelpFilled, ChevronUp16Filled, ChevronDown16Filled } from "@fluentui/react-icons";
import moment from 'moment'
import { isEmptyObject } from 'jquery'

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, Label, Input, Form, InputGroup, InputGroupText, Badge, Card, CardBody } from 'reactstrap'

// ** Utils
import { selectThemeColors, isObjEmpty } from '@utils'

// ** Styles Imports
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Self Components
import FieldPembicara from './components/FieldPembicara'
import FieldPenyelenggara from './components/FieldPenyelenggara'
import FieldPartisipan from './components/FieldPartisipan'
import FieldLampiran from './components/FieldLampiran'
import FieldPhoto from './components/FieldPhoto'

// ** API
import { uploadLampiranEvent, uploadPhotoEvent } from '../../../api'

const AddEventSidebar = props => {
  // ** Props
  const {
    open,
    store,
    dispatch,
    addEvent,
    calendarApi,
    selectEvent,
    addPartisipan,
    removePartisipan,
    clearPartisipan,
    addPembicara,
    removePembicara,
    clearPembicara,
    addPenyelenggara,
    removePenyelenggara,
    clearPenyelenggara,
    updateEvent,
    removeEvent,
    refetchEvents,
    handleAddEventSidebar,
    fetchLabels,
    fetchPartisipans,
    fetchPembicaras,
    fetchPenyelenggaras,
    userData,
    addAttachment,
    removeAttachment,
    clearAttachment,
    changePhoto,
    removePhoto,
    isLoadingAPIEvent,
    setisLoadingAPIEvent,
    startPicker,
    setStartPicker,
    endPicker,
    setEndPicker
  } = props

  // ** Vars & Hooks
  const selectedEvent = store.selectedEvent,
    {
      control,
      setError,
      formState: { errors }
    } = useForm({
      defaultValues: { 
        appVersion: 'web',
        title: '',
        photo: null,
        categoryId: 2,
        typeId: 1,
        startDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        endDateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        location: '',
        locationDetail: '',
        label: '',
        note: '',
        files: [],
        notifications: [],
        organizers: [{
          description: '',
          name: userData.nama,
          nik: userData.username,
          photoName: 'https://diarium.telkom.co.id/getfoto/'+userData.username,
          status: null,
          position: userData.jabatan
        }],
        speakers: [],
        users: [{
          nama: userData.nama,
          nik: userData.username,
          type: 'employee'
        }]
      }
    })

  // ** States
  const [appVersion, setAppVersion] = useState('web')
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState(2)
  const [typeId, setTypeId] = useState(1)
  const [startDateTime, setStartDateTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'))
  const [endDateTime, setEndDateTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'))
  const [location, setLocation] = useState('')
  const [locationDetail, setLocationDetail] = useState('')
  const [label, setLabel] = useState('')
  const [note, setNote] = useState('')
  const [users, setUsers] = useState([{
    nama: userData.nama,
    nik: userData.username,
    type: 'employee'
  }])
  const [isLoading, setIsLoading] = useState(false)
  const [paramTempatAcara, setParamTempatAcara] = useState('offline')
  const [paramIsUmeetme, setParamIsUmeetme] = useState(false)
  const [paramIsSearchLabel, setParamIsSearchLabel] = useState(false)
  const [kategoriAcara, setKategoriAcara] = useState([{value:2,label:'Meeting'}])
  const [tipeAcara, setTipeAcara] = useState([{value:1,label:'Terbuka'}])
  const [paramIsShowDetail, setParamIsShowDetail] = useState(false)
  const [paramUploadedLampiran, setParamUploadedLampiran] = useState([])
  const [paramUploadedPhoto, setParamUploadedPhoto] = useState([])
  const [paramIsUpdate, setParamIsUpdate] = useState(false)

  // ** Select Options
  const options = [
    { value: 'Task', label: 'Task', color: 'warning' },
    { value: 'Event', label: 'Event', color: 'info' },
    { value: 'Holiday', label: 'Holiday', color: 'danger' }
  ]

  const optionsKategori = store.categories

  const optionsTipe = store.types

  // ** Custom select components
  const OptionComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        {data.label}
      </components.Option>
    )
  }

  useEffect(() => {
    if (isLoadingAPIEvent) {
      handleSelectedEvent()
      setisLoadingAPIEvent(false)
    }
  }, [selectedEvent])

  // ** Add New Event
  const handleBuatEvent = (e) => {
    setParamIsUpdate(false)
    const isOk = formValidation()
    if (isOk) {
      setIsLoading(true)
      if (store.attachments.length) {    
        setParamUploadedLampiran([])  
        uploadLampiran(0, store.attachments.length)
      } else {
        setParamUploadedPhoto([])
        uploadPhoto()
      }
    }
  }
  function uploadLampiran(index, length) {
    if (store.attachments[index].fromApi === undefined) {
      const formData = new FormData()
      formData.append("file", store.attachments[index])
      uploadLampiranEvent(formData).then((res) => {
        const data = res.data.data
        let current = paramUploadedLampiran
        current.push({
          name: data.fileName,
          status: null
        })
        setParamUploadedLampiran(current)
        if ((index+1) < length) {
          uploadLampiran((index+1), length)
        } else {
          setParamUploadedPhoto([])
          uploadPhoto()
        }
      })
    } else {
      let current = paramUploadedLampiran
      current.push({
        name: store.attachments[index].name,
        status: null
      })
      setParamUploadedLampiran(current)
      if ((index+1) < length) {
        uploadLampiran((index+1), length)
      } else {
        setParamUploadedPhoto([])
        uploadPhoto()
      }
    }
  }
  function uploadPhoto() {
    if (!isEmptyObject(store.photo)) {
      if (store.photo.fromApi === undefined) {
        const formData = new FormData()
        formData.append("file", store.photo)
        uploadPhotoEvent(formData).then((res) => {
          const data = res.data.data
          let current = paramUploadedPhoto
          current.push({
            name: data.fileName,
            status: null
          })
          setParamUploadedPhoto(current)
          
          if (paramIsUpdate) {
            handleUpdateEvent()
          } else {
            handleAddEvent()
          }
        })
      } else {
        let current = paramUploadedPhoto
        current.push({
          name: store.photo.name,
          status: null
        })
        setParamUploadedPhoto(current)
        
        if (paramIsUpdate) {
          handleUpdateEvent()
        } else {
          handleAddEvent()
        }
      }
    } else {
      if (paramIsUpdate) {
        handleUpdateEvent()
      } else {
        handleAddEvent()
      }
    }
  }
  const handleAddEvent = () => {
    let usersList = users
    store.addedPartisipan.forEach(record => {
      usersList.push({
        nama: record.name,
        nik: record.nik,
        type: 'employee'
      })
    })

    let organizersList = []
    store.addedPenyelenggara.forEach(record => {
      organizersList.push({
        description: "",
        name: record.name,
        nik: record.nik,
        photoName: record.foto,
        status: null,
        position: record.v_short_posisi
      })
    })

    let speakersList = []
    store.addedPembicara.forEach(record => {
      speakersList.push({
        description: "",
        name: record.name,
        nik: record.nik,
        photoName: record.foto,
        status: null,
        position: record.v_short_posisi
      })
    })

    const obj = {
      appVersion: appVersion,
      title: title,
      photo: paramUploadedPhoto.length ? paramUploadedPhoto[0] : null,
      categoryId: categoryId,
      typeId: typeId,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      location: location,
      locationDetail: locationDetail,
      label: label,
      note: note,
      files: paramUploadedLampiran,
      notifications: [],
      organizers: organizersList,
      speakers: speakersList,
      users: usersList
    }

    dispatch(addEvent(obj))
    setTimeout(() => {
      refetchEvents()
    }, 500);
    handleAddEventSidebar()
    toastAlert('success', 'Kamu Berhasil Membuat Acara')
    setIsLoading(false)
  }
  const handleUpdateEvent = () => {
    let usersList = users
    store.addedPartisipan.forEach(record => {
      usersList.push({
        nama: record.name,
        nik: record.nik,
        type: 'employee'
      })
    })

    let organizersList = []
    store.addedPenyelenggara.forEach(record => {
      organizersList.push({
        description: "",
        name: record.name,
        nik: record.nik,
        photoName: record.foto,
        status: null,
        position: record.v_short_posisi
      })
    })

    let speakersList = []
    store.addedPembicara.forEach(record => {
      speakersList.push({
        description: "",
        name: record.name,
        nik: record.nik,
        photoName: record.foto,
        status: null,
        position: record.v_short_posisi
      })
    })

    const obj = {
      id: selectedEvent.data.id,
      appVersion: appVersion,
      title: title,
      photo: paramUploadedPhoto.length ? paramUploadedPhoto[0] : null,
      categoryId: categoryId,
      typeId: typeId,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      location: location,
      locationDetail: locationDetail,
      label: label,
      note: note,
      files: paramUploadedLampiran,
      notifications: [],
      organizers: organizersList,
      speakers: speakersList,
      users: usersList
    }


    dispatch(updateEvent(obj))
    setTimeout(() => {
      refetchEvents()
    }, 500);
    handleAddEventSidebar()
    toastAlert('success', 'Kamu Berhasil Memperbaharui Acara')
    setIsLoading(false)
  }

  // ** Reset Input Values on Close
  const handleResetInputValues = () => {
    setParamIsUpdate(false)
    dispatch(selectEvent({}))
    setAppVersion('')
    setTitle('')
    setCategoryId(2)
    setKategoriAcara([{value:2,label:'Meeting'}])
    setTypeId(1)
    setTipeAcara([{value:1,label:'Terbuka'}])
    setStartDateTime(moment().format('YYYY-MM-DD HH:mm:ss'))
    setStartPicker(new Date())
    setEndDateTime(moment().format('YYYY-MM-DD HH:mm:ss'))
    setEndPicker(new Date())
    setParamTempatAcara('offline')
    setLocation('')
    setLocationDetail('')
    setParamIsUmeetme(false)
    dispatch(clearPartisipan())
    setLabel('')
    setNote('')
    setParamIsSearchLabel(false)
    dispatch(clearPembicara())
    dispatch(clearPenyelenggara())
    dispatch(addPenyelenggara({
      company_code: userData.code,
      email: userData.username+"@TELKOM.CO.ID",
      foto: "https://diarium.telkom.co.id/getfoto/"+userData.username,
      name: userData.nama,
      nik: userData.username,
      team_type: null,
      user_id: userData.id_user,
      v_band_posisi: userData.band,
      v_short_company: "",
      v_short_divisi: userData.divisi,
      v_short_posisi: userData.jabatan,
      v_short_unit: userData.unit
    }))
    dispatch(clearAttachment())
    dispatch(removePhoto())
    setParamIsShowDetail(false)
    setIsLoading(false)
  }

  // ** Set sidebar fields
  const handleSelectedEvent = () => {
    if (!isObjEmpty(selectedEvent)) {
      setParamIsUpdate(true)
      const data = selectedEvent.data
      const partisipan = selectedEvent.partisipan

      setTitle(data.title)
      setKategoriAcara(data.category ? [{value:data.category.id,label:data.category.name}]: [{value: 5, label:"Lainnya"}])
      setCategoryId(data.category ? data.category.id : 5)
      setTipeAcara(data.type ? [{value:data.type.id,label:data.type.name}] : [{id: 2, name: "Tertutup", description: "Acara Anda hanya dapat dilihat oleh partisipan yang diundang"}])
      setTypeId(data.type ? data.type.id : 2)
      setStartDateTime(data.startDateTime)
      setStartPicker(new Date(data.startDateTime))
      setEndDateTime(data.endDateTime)
      setEndPicker(new Date(data.endDateTime))
      setParamTempatAcara(data.locationType.toLowerCase())
      setLocation(data.location)
      setLocationDetail(data.locationDetail)
      dispatch(clearPartisipan())
      partisipan.forEach(record => {
        if (record.nik !== userData.username) {
          dispatch(addPartisipan({
            nik:record.nik,
            name:record.name,
            foto:record.photoPath,
            v_short_posisi:record.position
          }))
        }
      })
      setLabel(data.label)
      setNote(data.note)
      dispatch(clearPembicara())
      data.speakers.forEach(record => {
        dispatch(addPembicara({
          nik:record.nik,
          name:record.name,
          foto:record.photoPath,
          v_short_posisi:record.position
        }))
      })
      dispatch(clearPenyelenggara())
      data.organizers.forEach(record => {
        dispatch(addPenyelenggara({
          nik:record.nik,
          name:record.name,
          foto:record.photoPath,
          v_short_posisi:record.position
        }))
      })
      dispatch(clearAttachment())
      data.attachments.forEach(record => {
        dispatch(addAttachment({
          name:record.fileName,
          fromApi:true
        }))
      })
      if (data.eventPhoto !== null) {
        dispatch(changePhoto({
          fileName:data.eventPhoto.name,
          photoPath:data.photoPath,
          fromApi:true
        }))
      }
    }
  }

  // ** Updates Event in Store
  const handlePerbaharuiEvent = () => {
    const isOk = formValidation()
    if (isOk) {
      setIsLoading(true)
      if (store.attachments.length) {    
        setParamUploadedLampiran([])  
        uploadLampiran(0, store.attachments.length)
      } else {
        setParamUploadedPhoto([])
        uploadPhoto()
      }
    }
  }

  // ** (UI) removeEventInCalendar
  const removeEventInCalendar = eventId => {
    calendarApi.getEventById(eventId).remove()
    setTimeout(() => {
      refetchEvents()
    }, 500);
  }

  const handleDeleteEvent = () => {
    dispatch(removeEvent(selectedEvent.data.id))
    removeEventInCalendar(selectedEvent.param.id)
    handleAddEventSidebar()
    toastAlert('success', 'Acara Berhasil Dihapus')
  }

  // ** Event Action buttons
  const EventActions = () => {
    if (isObjEmpty(selectedEvent)) {
      return (
        <Fragment>
          <Button 
            className='btn-sm mb-3' 
            color='primary' 
            type='button' 
            onClick={!isLoading ? handleBuatEvent : null}
            disabled={isLoading}
          >
            {isLoading ? 
            <>
              <span className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>
            </> : <></>}
            Buat Acara
          </Button>
          <Button 
            className='btn-sm mb-3' 
            color='cancel' 
            type='reset' 
            onClick={!isLoading ?  handleAddEventSidebar : null} 
            disabled={isLoading}
          >
            Batal
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button 
            className='btn-sm mb-3' 
            color='primary' 
            onClick={!isLoading ? handlePerbaharuiEvent : null}
            disabled={isLoading}
          >
            {isLoading ? 
            <>
              <span className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>
            </> : <></>}
            Perbaharui
          </Button>
          <Button className='btn-sm mb-3' color='danger' onClick={handleDeleteEvent}>
            Hapus
          </Button>
        </Fragment>
      )
    }
  } 

  // ** Kategori Acara
  const handleKategoriAcara = (e) => {
    setKategoriAcara(e)
    setCategoryId(e.value)
  }

  // ** Tipe Acara
  const handleTipeAcara = (e) => {
    setTipeAcara(e)
    setTypeId(e.value)
  }

  // ** Area Search Label
  const handleChangeLabel = (e) => {
    setLabel(e.target.value)
    
    dispatch(fetchLabels({
      keyword:label
    }))
  }
  const handleFocusLabel = (e) => {
    dispatch(fetchLabels({
      keyword:label
    }))
    
    setTimeout(() => {
      setParamIsSearchLabel(true)
    }, 300);
  }
  const handleBlurLabel = (e) => {
    setTimeout(() => {
      setParamIsSearchLabel(false)
    }, 300);
  }
  const handleClickAddLabel = (e) => {
    const value = e.target.attributes.getNamedItem('value').value
    setLabel(value)
    setParamIsSearchLabel(false)
  }
  const AreaSearchLabelSuggestion = () => {
    const isExist = store.labels.some(param => param.value === label)
    if (label.length > 0 && !isExist) {
      return (
        <>
          <p 
            className='cursor-pointer text-primary' 
            onClick={() => setParamIsSearchLabel(false)}
          >Tambahkan <b>{label}</b> sebagai label baru</p>
        </>
      )
    }

    return null
  }
  const AreaSearchLabel = () => {
    if (paramIsSearchLabel) {
      return (
        <>
          <div className='mb-4'>
            <Card style={{
              position:'absolute',
              left:'1.25rem',
              right:'1.25rem'
            }}>
              <CardBody style={{
                padding:'0 1rem'
              }}>
                <PerfectScrollbar className='my-5 list-search-label' style={{
                  maxHeight:'18.75rem'
                }}>
                  <AreaSearchLabelSuggestion />
                  {
                    (store.labels.length > 0) &&
                    store.labels.map(record => {
                      return (
                        <p 
                          className='cursor-pointer my-1' 
                          key={record.value}
                          value={record.value}
                          onClick={handleClickAddLabel}>{record.label}</p>
                      )
                    })
                  }
                </PerfectScrollbar>
              </CardBody>
            </Card>
          </div>
        </>
      )
    }

    return null
  }

  // ** Area Acara fields
  const handleParamTempatAcara = (e) => {
    setParamTempatAcara(e.target.value)
  }
  const handleParamIsUmeetme = (e) => {
    setParamIsUmeetme(e.target.checked)
    if (e.target.checked) {
      setLocation('UMEETME')
    }
  }

  // ** Waktu Acara
  const handleWaktuAcara = (date) => {
    if (date.length > 1) {
      setStartPicker(date[0])
      setEndPicker(date[1])

      setStartDateTime(moment(date[0]).format('YYYY-MM-DD HH:mm:ss'))
      setEndDateTime(moment(date[1]).format('YYYY-MM-DD HH:mm:ss'))
    }
  }

  // ** Close BTN
  const CloseBtn = <X className='cursor-pointer' size={15} onClick={handleAddEventSidebar} />

  // ** Area Detail Toggle
  const handleShowMore = () => {
    setParamIsShowDetail(!paramIsShowDetail)
  }
  const AreaDetailToggle = () => {
    if (paramIsShowDetail) {
      return (
        <>
          <div className='d-flex justify-content-center text-primary my-10 cursor-pointer' onClick={handleShowMore}>
            Sembunyikan Detail
            <ChevronUp16Filled 
              size={16} 
              style={{
                marginLeft: "0.5rem"
              }}
            />
          </div>
        </>
      )
    } else {
      return (
        <>
          <div className='d-flex justify-content-center text-primary my-10 cursor-pointer' onClick={handleShowMore}>
            Tampilkan Detail
            <ChevronDown16Filled 
              size={16} 
              style={{
                marginLeft: "0.5rem"
              }}
            />
          </div>
        </>
      )
    }
  }

  const handleBantuan = () => {
    toastAlert('info', 'hiber')
  }

  function formValidation() {
    let isOk = true

    if (!title.length) {
      isOk = false
      toastAlert('error', 'Nama Acara Tidak Boleh Kosong')
      setError('title', {
        type: 'manual'
      })
    }
    if (!location.length) {
      isOk = false
      if (paramTempatAcara === 'online' && !paramIsUmeetme) {
        toastAlert('error', 'URL Tidak Boleh Kosong')
        setError('location', {
          type: 'manual'
        })
      } else {
        toastAlert('error', 'Nama Tempat Tidak Boleh Kosong')
        setError('location', {
          type: 'manual'
        })
        toastAlert('error', 'Alamat Tempat Tidak Boleh Kosong')
        setError('locationDetail', {
          type: 'manual'
        })
      }
    }
    
    return isOk
  }

  return (
    <Modal
      isOpen={open}
      className='sidebar-lg'
      toggle={handleAddEventSidebar}
      onClosed={handleResetInputValues}
      contentClassName='p-0 overflow-hidden'
      modalClassName='modal-slide-in event-sidebar'
    >
      {
        isLoadingAPIEvent ? 
        <>
          <div 
            className='d-flex justify-content-center align-items-center'
            style={{
              position: 'absolute',
              backgroundColor: 'var(--bs-tertiary-100)',
              zIndex: '27',
              opacity: '0.5',
              height: '100%',
              width: '100%'
            }}
          >
            <span className="spinner-border spinner-border text-primary" role="status" aria-hidden="true"></span>
          </div>
        </> : <></>
      }
      <ModalHeader className='mb-1' toggle={handleAddEventSidebar} close={CloseBtn} tag='div'>
        <h5 className='modal-title'>
          {!isEmptyObject(selectedEvent) ? 'Perbaharui' : 'Buat'} Acara
        </h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className='flex-grow-1 pb-sm-0 pb-3'>
          <Form>
            <div className='mb-4'>
              <Label className='form-label fs-4'>
                Nama Acara <span className='text-danger'>*</span>
              </Label>
              <Input 
                id='title' 
                name='title' 
                type='text'
                className='form-control'
                placeholder='Masukan Nama Acara'
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
                invalid={errors.title && true}
              />
            </div>

            <div className='mb-4'>
              <Label className='form-label fs-4'>
                Kategori Acara
              </Label>
              <Select
                id='kategoriAcara'
                value={kategoriAcara}
                options={optionsKategori}
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                isClearable={false}
                placeholder='Pilih Kategori'
                onChange={handleKategoriAcara}
                components={{
                  Option: OptionComponent
                }}
                menuPortalTarget={document.body} 
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              />
            </div>

            <div className='mb-4'>
              <Label className='form-label fs-4'>
                Tipe Acara
              </Label>
              <Select
                id='tipeAcara'
                value={tipeAcara}
                options={optionsTipe}
                theme={selectThemeColors}
                className='react-select'
                classNamePrefix='select'
                isClearable={false}
                placeholder='Pilih Tipe'
                onChange={handleTipeAcara}
                components={{
                  Option: OptionComponent
                }}
                menuPortalTarget={document.body} 
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
              />
            </div>

            <div className='mb-4'>
              <Label className='form-label fs-4'>
                Waktu Acara
              </Label>
              <InputGroup className='mb-2'>
                <Flatpickr
                  required
                  id='waktuAcara'
                  name='waktuAcara'
                  className='form-control'
                  onChange={handleWaktuAcara}
                  options={{
                    enableTime: true,
                    dateFormat: 'd/m/Y H:i',
                    mode: 'range',
                    defaultDate: [startPicker, endPicker],
                    // disable: [
                    //   function(date) {
                    //     return (date.getDay() === 0 || date.getDay() === 6);
                    //   }
                    // ],
                    time_24hr: true,
                    locale: {
                      ...Indonesian,
                      firstDayOfWeek: 0
                    }
                  }}
                />
                <InputGroupText>
                  <CalendarLtr20Regular />
                </InputGroupText>
              </InputGroup>
            </div>

            <div className='mb-4'>
              <Label className='form-label fs-4'>
                Tempat Acara
              </Label>
              <div className='radio-tempat-acara'>
                <div className='form-check form-check-primary'>
                  <Input 
                    name='tempatAcara' 
                    value='offline' 
                    type='radio' 
                    id='radio-offline' 
                    checked={paramTempatAcara === 'offline'}
                    onChange={handleParamTempatAcara}
                  />
                  <Label className='form-check-label'>
                    Offline
                  </Label>
                </div>
                <div className='form-check form-check-primary'>
                  <Input 
                    name='tempatAcara' 
                    value='online' 
                    type='radio' 
                    id='radio-online' 
                    checked={paramTempatAcara === 'online'}
                    onChange={handleParamTempatAcara}
                  />
                  <Label className='form-check-label'>
                    Online
                  </Label>
                </div>
              </div>
            </div>

            {
              paramTempatAcara === 'online' ?
              <>
                {
                  !paramIsUmeetme ? 
                  <>
                    <div className='mb-4'>
                      <Label className='form-label fs-4'>
                        URL <span className='text-danger'>*</span>
                      </Label>
                      <Input 
                        id='location' 
                        name='location' 
                        type='text'
                        className='form-control'
                        placeholder='Masukan URL'
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value)
                        }}
                        invalid={errors.location && true}
                      />
                    </div>
                  </> : <></>
                }

                <div className='mb-4'>
                  <div className='radio-tempat-acara'>
                    <div className='form-check form-check-primary'>
                      <Input 
                        name='umeetme' 
                        type='checkbox' 
                        id='radio-umeetme' 
                        onChange={handleParamIsUmeetme}
                        checked={paramIsUmeetme}
                      />
                      <Label className='form-check-label'>
                        <img
                          alt="..."
                          src={require(`@src/assets/icons/umeetme.svg`).default}
                          style={{ verticalAlign: "sub" }}
                        ></img>{" "}
                        Buat Online
                      </Label>
                    </div>
                  </div>
                </div>
              </> : <></>
            }
            {
              paramTempatAcara === 'offline' ? 
              <>
                <div className='mb-4'>
                  <Label className='form-label fs-4'>
                    Nama Tempat <span className='text-danger'>*</span>
                  </Label>
                  <Input 
                      id='location' 
                      name='location' 
                      type='text'
                      className='form-control'
                      placeholder='Masukan Nama Tempat'
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value)
                      }}
                      invalid={errors.location && true}
                    />
                </div>

                <div className='mb-4'>
                  <Label className='form-label fs-4'>
                    Alamat Tempat <span className='text-danger'>*</span>
                  </Label>
                  <Input 
                      id='locationDetail' 
                      name='locationDetail' 
                      type='text'
                      className='form-control'
                      placeholder='Masukan Alamat Tempat'
                      value={locationDetail}
                      onChange={(e) => {
                        setLocationDetail(e.target.value)
                      }}
                      invalid={errors.locationDetail && true}
                    />
                </div>
              </> : <></>
            }

            <FieldPartisipan 
              store={store}
              dispatch={dispatch}
              fetchPartisipans={fetchPartisipans}
              addPartisipan={addPartisipan}
              removePartisipan={removePartisipan}
              clearPartisipan={clearPartisipan}
            />

            <div className='mb-4'>
              <Label className='form-label fs-4'>
                Label
              </Label>
              <Input 
                id='label' 
                name='label'
                placeholder='Label' 
                onChange={handleChangeLabel}
                onFocus={handleFocusLabel}
                onBlur={handleBlurLabel}
                value={label}
              />
            </div>
            <AreaSearchLabel />

            <div className='mb-4'>
              <Label className='form-label fs-4'>
                Deskripsi
              </Label>
              <Input 
                id='note' 
                name='note' 
                type='textarea'
                className='form-control'
                placeholder='Deskripsi'
                value={note}
                onChange={(e) => {
                  setNote(e.target.value)
                }}
              />
            </div>

            <FieldPembicara 
              store={store}
              dispatch={dispatch}
              fetchPembicaras={fetchPembicaras}
              addPembicara={addPembicara}
              removePembicara={removePembicara}
              clearPembicara={clearPembicara}
              paramIsShowDetail={paramIsShowDetail}
            />

            <FieldPenyelenggara 
              store={store}
              dispatch={dispatch}
              fetchPenyelenggaras={fetchPenyelenggaras}
              addPenyelenggara={addPenyelenggara}
              removePenyelenggara={removePenyelenggara}
              clearPenyelenggara={clearPenyelenggara}
              paramIsShowDetail={paramIsShowDetail}
            />

            <FieldLampiran
              store={store}
              dispatch={dispatch}
              addAttachment={addAttachment}
              removeAttachment={removeAttachment}
              paramIsShowDetail={paramIsShowDetail}
            />

            <FieldPhoto
              store={store}
              dispatch={dispatch}
              changePhoto={changePhoto}
              removePhoto={removePhoto}
              paramIsShowDetail={paramIsShowDetail}
            />

            <AreaDetailToggle />

            <div className='d-flex flex-column my-5'>
              <EventActions />
            </div>

            <div className='d-flex my-5 float-end cursor-pointer' onClick={handleBantuan}>
              <span 
                className='text-danger'
                style={{
                  opacity: "0.5"
                }}
              >
                Bantuan
              </span>
              <ChatHelpFilled 
                size={16} 
                style={{
                  opacity: "0.5",
                  marginLeft: "0.5rem"
                }}
              />
            </div>
          </Form>
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  )
}

export default AddEventSidebar
