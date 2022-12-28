// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Third Party Components
import classnames from 'classnames'
import { Row, Col } from 'reactstrap'
import moment from 'moment'

// ** Calendar App Component Imports
import Calendar from './Calendar'
import SidebarLeft from './SidebarLeft'
import AddEventSidebar from './AddEventSidebar'

// ** Custom Hooks
import { useRTL } from '@hooks/useRTL'

// ** Store & Actions
import { useSelector, useDispatch } from 'react-redux'
import { 
  fetchEvents, 
  fetchEventDetail,
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
  updateFilter, 
  updateAllFilters, 
  addEvent, 
  removeEvent, 
  fetchLabels, 
  fetchTypes, 
  fetchCategories, 
  fetchPartisipans, 
  fetchPembicaras, 
  fetchPenyelenggaras, 
  addAttachment, 
  removeAttachment, 
  clearAttachment, 
  fetchUploadLampiran,
  changePhoto, 
  removePhoto,
  fetchUploadPhoto,
  clearUploadedFiles,
  changeIsWorking,
  changeStartDate,
  changeEndDate,
  clearLoadedMonths,
  clearEvents,
  hapusEvent,
  fetchEventDrop
} from './store'

import {
  idTask,
  modalTugas
} from '../todo/store'

// ** Styles
import '@styles/react/apps/app-calendar.scss'

// ** Icons
import { AlertFilled, AlertOnFilled, AlertUrgentFilled, AlertSnoozeFilled } from "@fluentui/react-icons";

// ** Storage Import
import { getUserData } from '../../../utils/storage'

// ** CalendarColors
const calendarsColor = {
  Task: 'warning',
  Event: 'info',
  Holiday: 'danger'
}

// ** CalendarIcons
const calendarsIcon = {
  Task: <AlertOnFilled fontSize={14} />,
  Event: <AlertUrgentFilled fontSize={14} />,
  Holiday: <AlertSnoozeFilled fontSize={14} />
}

// ** Tasks
import ModalTask from "../todo/ModalTask";

const CalendarComponent = () => {
  // ** Variables
  const dispatch = useDispatch()
  const store = useSelector(state => state.calendar)
  const storeTask = useSelector(state => state.todo)

  // ** states
  const [calendarApi, setCalendarApi] = useState(null)
  const [addSidebarOpen, setAddSidebarOpen] = useState(false)
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [isLoadingAPIEvent, setisLoadingAPIEvent] = useState(false)
  const [isLoadingAPICalendar, setIsLoadingAPICalendar] = useState(false)
  const [startPicker, setStartPicker] = useState(new Date())
  const [endPicker, setEndPicker] = useState(new Date())

  const userData = getUserData()

  // ** Hooks
  const [isRtl] = useRTL()

  // ** AddEventSidebar Toggle Function
  const handleAddEventSidebar = () => setAddSidebarOpen(!addSidebarOpen)

  // ** LeftSidebar Toggle Function
  const toggleSidebar = val => setLeftSidebarOpen(val)

  // ** Blank Event Object
  const blankEvent = {
    title: '',
    start: '',
    end: '',
    allDay: false,
    url: '',
    extendedProps: {
      calendar: '',
      guests: [],
      location: '',
      description: ''
    }
  }

  // ** refetchEvents
  const refetchEvents = () => {
    if (calendarApi !== null) {
      dispatch(clearEvents())
      dispatch(clearLoadedMonths())
      dispatch(changeIsWorking(true))
      const data = calendarApi.view.getCurrentData()
      const startDate = moment(data.currentDate).startOf('month').format('YYYY-MM-DD')
      const endDate = moment(data.currentDate).endOf('month').format('YYYY-MM-DD')
      dispatch(fetchEvents({
        filter: store.selectedCalendars,
        isFetchData: true,
        events: [],
        startDate: startDate,
        nik: userData.username
      }))
    }
  }

  // ** Fetch Events On Mount
  useEffect(() => {
    dispatch(changeIsWorking(true))
    dispatch(fetchEvents({
      filter: store.selectedCalendars,
      isFetchData: true,
      events: store.events,
      startDate: store.startDate,
      nik: userData.username
    }))

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

    dispatch(fetchTypes())
    dispatch(fetchCategories())
  }, [])

  return (
    <Fragment>
      <div className='app-calendar overflow-hidden border'>
        <Row className='g-0'>
          <Col
            id='app-calendar-sidebar'
            className={classnames('col app-calendar-sidebar flex-grow-0 overflow-hidden d-flex flex-column', {
              show: leftSidebarOpen
            })}
          >
            <SidebarLeft
              store={store}
              dispatch={dispatch}
              updateFilter={updateFilter}
              toggleSidebar={toggleSidebar}
              updateAllFilters={updateAllFilters}
              handleAddEventSidebar={handleAddEventSidebar}
            />
          </Col>
          <Col className='position-relative'>
            <Calendar
              isRtl={isRtl}
              store={store}
              dispatch={dispatch}
              fetchEvents={fetchEvents}
              fetchEventDetail={fetchEventDetail}
              blankEvent={blankEvent}
              calendarApi={calendarApi}
              selectEvent={selectEvent}
              updateEvent={updateEvent}
              toggleSidebar={toggleSidebar}
              calendarsColor={calendarsColor}
              calendarsIcon={calendarsIcon}
              setCalendarApi={setCalendarApi}
              handleAddEventSidebar={handleAddEventSidebar}
              isLoadingAPIEvent={isLoadingAPIEvent}
              setisLoadingAPIEvent={setisLoadingAPIEvent}
              isLoadingAPICalendar={isLoadingAPICalendar}
              setIsLoadingAPICalendar={setIsLoadingAPICalendar}
              changeIsWorking={changeIsWorking}
              changeStartDate={changeStartDate}
              changeEndDate={changeEndDate}
              storeTask={storeTask}
              idTask={idTask}
              modalTugas={modalTugas}
              startPicker={startPicker}
              setStartPicker={setStartPicker}
              endPicker={endPicker}
              setEndPicker={setEndPicker}
              fetchEventDrop={fetchEventDrop}
              refetchEvents={refetchEvents}
            />
          </Col>
          <div
            className={classnames('body-content-overlay', {
              show: leftSidebarOpen === true
            })}
            onClick={() => toggleSidebar(false)}
          ></div>
        </Row>
      </div>
      <AddEventSidebar
        store={store}
        dispatch={dispatch}
        addEvent={addEvent}
        open={addSidebarOpen}
        selectEvent={selectEvent}
        addPartisipan={addPartisipan}
        removePartisipan={removePartisipan}
        clearPartisipan={clearPartisipan}
        addPembicara={addPembicara}
        removePembicara={removePembicara}
        clearPembicara={clearPembicara}
        addPenyelenggara={addPenyelenggara}
        removePenyelenggara={removePenyelenggara}
        clearPenyelenggara={clearPenyelenggara}
        updateEvent={updateEvent}
        removeEvent={removeEvent}
        calendarApi={calendarApi}
        setCalendarApi={setCalendarApi}
        refetchEvents={refetchEvents}
        calendarsColor={calendarsColor}
        calendarsIcon={calendarsIcon}
        handleAddEventSidebar={handleAddEventSidebar}
        fetchLabels={fetchLabels}
        fetchPartisipans={fetchPartisipans}
        fetchPembicaras={fetchPembicaras}
        fetchPenyelenggaras={fetchPenyelenggaras}
        userData={userData}
        addAttachment={addAttachment}
        removeAttachment={removeAttachment}
        fetchUploadLampiran={fetchUploadLampiran}
        clearAttachment={clearAttachment}
        changePhoto={changePhoto}
        removePhoto={removePhoto}
        fetchUploadPhoto={fetchUploadPhoto}
        clearUploadedFiles={clearUploadedFiles}
        isLoadingAPIEvent={isLoadingAPIEvent}
        setisLoadingAPIEvent={setisLoadingAPIEvent}
        changeStartDate={changeStartDate}
        changeEndDate={changeEndDate}
        startPicker={startPicker}
        setStartPicker={setStartPicker}
        endPicker={endPicker}
        setEndPicker={setEndPicker}
        hapusEvent={hapusEvent}
      />
      <ModalTask />
    </Fragment>
  )
}

export default CalendarComponent
