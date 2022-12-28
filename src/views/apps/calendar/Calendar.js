// ** React Import
import { useEffect, useRef, memo, Fragment } from 'react'

// ** Full Calendar & it's Plugins
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import idLocale from '@fullcalendar/core/locales/id'

// ** Third Party Components
import toastAlert from "@src/utils/alert"
import { Menu } from 'react-feather'
import { Card, CardBody } from 'reactstrap'

// ** Custom Components
import { CalendarEvent } from '../../components/calendar'
import moment from 'moment'

const Calendar = props => {
  // ** Refs
  const calendarRef = useRef(null)

  // ** Props
  const {
    store,
    isRtl,
    dispatch,
    fetchEvents,
    calendarsColor,
    calendarsIcon,
    calendarApi,
    setCalendarApi,
    handleAddEventSidebar,
    toggleSidebar,
    fetchEventDetail,
    setisLoadingAPIEvent,
    isLoadingAPICalendar,
    setIsLoadingAPICalendar,
    changeIsWorking,
    idTask,
    modalTugas,
    setStartPicker,
    setEndPicker,
    fetchEventDrop,
    refetchEvents
  } = props

  // ** UseEffect checks for CalendarAPI Update
  useEffect(() => {
    if (calendarApi === null) {
      setCalendarApi(calendarRef.current.getApi())
    }
  }, [calendarApi])

  useEffect(() => {
    setIsLoadingAPICalendar(store.isWorking)
  }, [store.isWorking])

  // ** calendarOptions(Props)
  const calendarOptions = {
    events: store.events.length ? store.events : [],
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    eventContent: function(record){
      return <CalendarEvent icon={calendarsIcon[record.event.extendedProps.calendar]} text={record.event.title} time={record.timeText} />
    },
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    buttonText: {
      today: 'hari ini',
      month: 'bulan',
      week: 'minggu',
      day: 'hari',
      list: 'list'
    },
    locales: [idLocale],
    locale: "id",
    firstDay: 0,
    /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
    editable: true,

    /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
    eventResizableFromStart: true,

    /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
    dragScroll: true,

    /*
      Max number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
    dayMaxEvents: 2,

    /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
    navLinks: true,

    eventClassNames: function(arg){
      const colorName = calendarsColor[arg.event._def.extendedProps.calendar]

      if (arg.event._def.extendedProps.isHide) {
        arg.event.remove()
      }

      return [
        `bg-light-${colorName}`
      ]
    },

    eventClick({ event: clickedEvent }) {
      if (clickedEvent.extendedProps.calendar === 'Event') {
        const record = clickedEvent.extendedProps.record
        setStartPicker(new Date(record.startDate+" "+record.startTime))
        setEndPicker(new Date(record.endDate+" "+record.endTime))
        setisLoadingAPIEvent(true)
        dispatch(fetchEventDetail(clickedEvent))
        handleAddEventSidebar()
      } else if (clickedEvent.extendedProps.calendar === 'Task') {
        dispatch(idTask({ idTask: clickedEvent.extendedProps.record.task_id }))
        dispatch(modalTugas({ modalTugas: true }))
      }

      // * Only grab required field otherwise it goes in infinity loop
      // ! Always grab all fields rendered by form (even if it get `undefined`) otherwise due to Vue3/Composition API you might get: "object is not extensible"
      // event.value = grabEventDataFromEventApi(clickedEvent)

      // eslint-disable-next-line no-use-before-define
      // isAddNewEventSidebarActive.value = true
    },

    customButtons: {
      sidebarToggle: {
        text: <Menu className='d-xl-none d-block' />,
        click() {
          toggleSidebar(true)
        }
      },
      prev: {
        click() {
          dispatch(changeIsWorking(true))
          const data = calendarApi.view.getCurrentData()
          const startDate = moment(data.currentDate).subtract(1,'month').startOf('month').format('YYYY-MM-DD')
          const endDate = moment(data.currentDate).subtract(1,'month').endOf('month').format('YYYY-MM-DD')
          dispatch(fetchEvents({
            filter: store.selectedCalendars,
            isFetchData: true,
            events: store.events,
            startDate: startDate,
            nik: store.nik
          }))

          calendarApi.prev()
        }
      },
      next: {
        click() {
          dispatch(changeIsWorking(true))
          const data = calendarApi.view.getCurrentData()
          const startDate = moment(data.currentDate).add(1,'month').startOf('month').format('YYYY-MM-DD')
          const endDate = moment(data.currentDate).add(1,'month').endOf('month').format('YYYY-MM-DD')
          dispatch(fetchEvents({
            filter: store.selectedCalendars,
            isFetchData: true,
            events: store.events,
            startDate: startDate,
            nik: store.nik
          }))

          calendarApi.next()
        }
      }
    },

    dateClick(info) {
      setStartPicker(info.date)
      setEndPicker(info.date)
      handleAddEventSidebar()
    },

    /*
      Handle event drop (Also include dragged event)
      ? Docs: https://fullcalendar.io/docs/eventDrop
      ? We can use `eventDragStop` but it doesn't return updated event so we have to use `eventDrop` which returns updated event
    */
    eventDrop(info) {
      const event = info.event
      if (event.extendedProps.calendar === 'Event') {
        dispatch(changeIsWorking(true))
        dispatch(fetchEventDrop(event))
        setTimeout(() => {
          refetchEvents()
          toastAlert('success', 'Kamu Berhasil Memperbaharui Acara')
        }, 500);
      } else {
        toastAlert('error', `${event.extendedProps.calendar} tidak dapat dipindahkan`)
        info.revert()
      }
    },

    /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
    eventResize(info) {
      const event = info.event
      if (event.extendedProps.calendar === 'Event') {
        dispatch(changeIsWorking(true))
        dispatch(fetchEventDrop(event))
        setTimeout(() => {
          refetchEvents()
          toastAlert('success', 'Kamu Berhasil Memperbaharui Acara')
        }, 500);
      } else {
        toastAlert('error', `${event.extendedProps.calendar} tidak dapat dipindahkan`)
        info.revert()
      }
    },

    ref: calendarRef,

    // Get direction from app state (store)
    direction: isRtl ? 'rtl' : 'ltr'
  }

  return (
    <Card className='shadow-none border-0 mb-0 rounded-0'>
      <CardBody className='pb-0'>
        {
          isLoadingAPICalendar ?
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
        <FullCalendar {...calendarOptions} />{' '}
      </CardBody>
    </Card>
  )
}

export default memo(Calendar)
