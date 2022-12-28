// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** React Import
import moment from 'moment'

// ** API Import
import { 
  getTimeManagementV2, 
  getSearchKaryawan, 
  getEvent, 
  getEventV1, 
  postEvent, 
  uploadLampiranEvent, 
  uploadPhotoEvent,
  deleteEvent
} from '../../../../api'

// ** Storage Import
import { getUsernik, getUserData, getToken, getTokenAPIM } from '../../../../utils/storage'

// ** CONFIG Import
import CONFIG from "@src/config";

// ** const
const fullURL = (path) => {
  return `${CONFIG.API_URL}/${path}`;
}
const TokenAPIM = getTokenAPIM()
const TokenAuth = getToken()

export const fetchEvents = createAsyncThunk('appCalendar/fetchEvents', async (params, { getState }) => {
  const results = []
  
  if (getState().calendar.loadedMonths.includes(params.startDate)) {
    params.isFetchData = false;
  }

  if (params.isFetchData) {
    const response = await getTimeManagementV2(
      `activity/calendar?start_date=${params.startDate}&type=web&nik=${params.nik}`
    )
    const data = response.data.data
    
    Object.keys(data).map(function(key){
      const event = data[key]['event'];
      event.forEach(record => {
        results.push({
          id: record.id,
          url: '',
          title: record.title,
          start: `${record.startDate} ${record.startTime}:00`,
          end: `${record.endDate} ${record.endTime}:00`,
          allDay: false,
          extendedProps: {
            isHide: !params.filter.includes('Event'),
            calendar: 'Event',
            record: record
          }
        })
      });
  
      const holiday = data[key]['holiday'];
      holiday.forEach(record => {
        results.push({
          id: record.task_id,
          url: '',
          title: record.description,
          start: record.start_date,
          end: record.end_date,
          allDay: true,
          extendedProps: {
            isHide: !params.filter.includes('Holiday'),
            calendar: 'Holiday',
            record: record
          }
        })
      });
  
      const task = data[key]['task'];
      task.forEach(record => {
        results.push({
          id: record.task_id,
          url: '',
          title: record.description,
          start: record.start_date,
          end: record.end_date,
          allDay: true,
          extendedProps: {
            isHide: !params.filter.includes('Task'),
            calendar: 'Task',
            record: record
          }
        })
      });
  
      const task_assign = data[key]['task_assign'];
      task_assign.forEach(record => {
        results.push({
          id: record.task_id,
          url: '',
          title: record.description,
          start: record.start_date,
          end: record.end_date,
          allDay: true,
          extendedProps: {
            isHide: !params.filter.includes('Task'),
            calendar: 'Task',
            record: record
          }
        })
      });
    })

    params.events.forEach(record => {
      results.push({
        id: record.id,
        url: record.url,
        title: record.title,
        start: record.start,
        end: record.end,
        allDay: record.allDay,
        extendedProps: {
          isHide: !params.filter.includes(record.extendedProps.calendar),
          calendar: record.extendedProps.calendar,
          record: record.extendedProps.record
        }
      })
    })
  } else {
    params.events.forEach(record => {
      results.push({
        id: record.id,
        url: record.url,
        title: record.title,
        start: record.start,
        end: record.end,
        allDay: record.allDay,
        extendedProps: {
          isHide: !params.filter.includes(record.extendedProps.calendar),
          calendar: record.extendedProps.calendar,
          record: record.extendedProps.record
        }
      })
    })
  }

  return results
})

export const fetchEventDetail = createAsyncThunk('appCalendar/fetchEventDetail', async (params) => {
  const response = await getEvent(`session/${params._def.extendedProps.record.id}?eventObject=${params._def.extendedProps.record.eventObject}&appVersion=web&language=id&userTimezone=GMT+7`)
  const data = response.data.data

  const responsePartisipan = await getEvent(`session/participant/${params._def.extendedProps.record.id}/all/12/0?eventObject=${params._def.extendedProps.record.eventObject}&appVersion=web&language=id&userTimezone=GMT+7`)
  const dataPartisipan = responsePartisipan.data.data

  return {
    param: params,
    data: data,
    partisipan: dataPartisipan
  }
})

export const fetchEventDrop = createAsyncThunk('appCalendar/fetchEventDrop', async (params) => {
  const response = await getEvent(`session/${params._def.extendedProps.record.id}?eventObject=${params._def.extendedProps.record.eventObject}&appVersion=web&language=id&userTimezone=GMT+7`)
  const dataMain = response.data.data

  const responsePartisipan = await getEvent(`session/participant/${params._def.extendedProps.record.id}/all/12/0?eventObject=${params._def.extendedProps.record.eventObject}&appVersion=web&language=id&userTimezone=GMT+7`)
  const dataPartisipan = responsePartisipan.data.data

  let photo = null
  if (dataMain.eventPhoto !== null) {
    photo = {
      fileName:dataMain.eventPhoto.name,
      photoPath:dataMain.photoPath,
    }
  }

  const dataStart = dataMain.startDateTime.length ? dataMain.startDateTime.split(' ') : moment().format('YYYY-MM-DD HH:mm:ss').split(' ')
  const dataEnd = dataMain.endDateTime.length ? dataMain.endDateTime.split(' ') : moment().format('YYYY-MM-DD HH:mm:ss').split(' ')
  const startTime = (dataStart[1] !== undefined) ? dataStart[1] : moment().format('HH:mm:ss')
  const endTime = (dataEnd[1] !== undefined) ? dataEnd[1] : moment().format('HH:mm:ss')
  const startDateTime = moment(params._instance.range.start).format('YYYY-MM-DD') + ' ' + startTime;
  const endDateTime = moment(params._instance.range.end).format('YYYY-MM-DD') + ' ' + endTime;

  let files = []
  for (let i = 0; i < dataMain.attachments.length; i++) {
    files.push({
      name: dataMain.attachments[i].name,
      status: null
    })
  }

  let organizers = []
  for (let i = 0; i < dataMain.organizers.length; i++) {
    organizers.push({
      description: "",
      name: dataMain.organizers[i].name,
      nik: dataMain.organizers[i].nik,
      photoName: dataMain.organizers[i].photoPath,
      status: null,
      position: dataMain.organizers[i].position
    })
  }

  let speakers = []
  for (let i = 0; i < dataMain.speakers.length; i++) {
    speakers.push({
      description: "",
      name: dataMain.speakers[i].name,
      nik: dataMain.speakers[i].nik,
      photoName: dataMain.speakers[i].photoPath,
      status: null,
      position: dataMain.speakers[i].position
    })
  }

  let users = []
  for (let i = 0; i < dataPartisipan.length; i++) {
    users.push({
      nama: dataPartisipan[i].name,
      nik: dataPartisipan[i].nik,
      type: 'employee'
    })
  }

  const data = {
    id: dataMain.id,
    appVersion: 'web',
    title: dataMain.title,
    photo: photo,
    categoryId: dataMain.category ? dataMain.category.id : 5,
    typeId: dataMain.type ? dataMain.type.id : 2,
    startDateTime: startDateTime,
    endDateTime: endDateTime,
    location: dataMain.location,
    locationDetail: dataMain.locationDetail,
    label: dataMain.label,
    note: dataMain.note,
    files: files,
    notifications: [],
    organizers: organizers,
    speakers: speakers,
    users: users
  }

  return axios.put(fullURL(`gateway/telkom-diarium-event/2.0/event/session/${data.id}?appVersion=web&language=id&userTimezone=GMT+7`), data, {
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": `${CONFIG.origin}`,
      "Content-type": "application/json",
      "X-Authorization": `bearer ${TokenAuth}`,
      Authorization: `bearer ${TokenAPIM}`
    }
  })
})

export const fetchLabels = createAsyncThunk('appCalendar/fetchLabels', async (params) => {
  const results = []

  const response = await getEventV1(
    `session/label?keyword=${params.keyword}&limit=10&offset=0&appVersion=web&language=id&userTimezone=GMT+7`
  )

  const datas = response.data.data
  datas.forEach(record => {
    results.push({
      value:record.labelName,
      label:record.labelName
    })
  })

  return results
})

export const fetchPartisipans = createAsyncThunk('appCalendar/fetchPartisipans', async (params) => {
  const response = await getSearchKaryawan(
    `?keyword=${params.keyword}&limit=10&offset=0&appVersion=web&language=id&userTimezone=GMT+7&isDev=true&with_division=true&is_exclude_login=null`
  )

  const datas = response.data.data
  return datas
})

export const fetchPembicaras = createAsyncThunk('appCalendar/fetchPembicaras', async (params) => {
  const response = await getSearchKaryawan(
    `?keyword=${params.keyword}&limit=10&offset=0&appVersion=web&language=id&userTimezone=GMT+7&isDev=true&with_division=true&is_exclude_login=null`
  )

  const datas = response.data.data
  return datas
})

export const fetchPenyelenggaras = createAsyncThunk('appCalendar/fetchPenyelenggaras', async (params) => {
  const response = await getSearchKaryawan(
    `?keyword=${params.keyword}&limit=10&offset=0&appVersion=web&language=id&userTimezone=GMT+7&isDev=true&with_division=true&is_exclude_login=null`
  )

  const datas = response.data.data
  return datas
})

export const addEvent = createAsyncThunk('appCalendar/addEvent', async (event) => {
  await postEvent(event)
  console.log("ih kanjut")
  return event
})

export const updateEvent = createAsyncThunk('appCalendar/updateEvent', async (data) => {
  return axios.put(fullURL(`gateway/telkom-diarium-event/2.0/event/session/${data.id}?appVersion=web&language=id&userTimezone=GMT+7`), data, {
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": `${CONFIG.origin}`,
      "Content-type": "application/json",
      "X-Authorization": `bearer ${TokenAuth}`,
      Authorization: `bearer ${TokenAPIM}`
    }
  })
})

export const updateFilter = createAsyncThunk('appCalendar/updateFilter', async (filter, { dispatch, getState }) => {
  let tempFilter = [...getState().calendar.selectedCalendars, filter]
  if (getState().calendar.selectedCalendars.includes(filter)) {
    tempFilter = getState().calendar.selectedCalendars.filter(i => i !== filter)
  }

  await dispatch(fetchEvents({
    filter: tempFilter,
    isFetchData: false,
    events: getState().calendar.events,
    startDate: getState().calendar.startDate,
    nik: getState().calendar.nik
  }))

  return filter
})

export const updateAllFilters = createAsyncThunk('appCalendar/updateAllFilters', async (value, { dispatch, getState }) => {
  let tempFilter = []
  if (value === true) {
    tempFilter = ['Task', 'Event', 'Holiday']
  }

  await dispatch(fetchEvents({
    filter: tempFilter,
    isFetchData: false,
    events: getState().calendar.events,
    startDate: getState().calendar.startDate,
    nik: getState().calendar.nik
  }))

  return value
})

export const removeEvent = createAsyncThunk('appCalendar/removeEvent', async (id) => {
  await deleteEvent(
    `${id}?appVersion=web&language=id&userTimezone=GMT+7`
  )

  return id
})

export const fetchTypes = createAsyncThunk('appCalendar/fetchTypes', async (params) => {
  const results = []

  const response = await getEvent(
    `types?appVersion=web&language=id&userTimezone=GMT+7`
  )

  const datas = response.data.data
  datas.forEach(record => {
    results.push({
      value:record.id,
      label:record.name,
      description:record.description
    })
  })

  return results
})

export const fetchCategories = createAsyncThunk('appCalendar/fetchCategories', async (params) => {
  const results = []

  const response = await getEvent(
    `categories?appVersion=web&language=id&userTimezone=GMT+7`
  )

  const datas = response.data.data
  datas.forEach(record => {
    results.push({
      value:record.id,
      label:record.name
    })
  })

  return results
})

export const fetchUploadLampiran = createAsyncThunk('appCalendar/fetchUploadLampiran', async (params) => {
  const formData = new FormData()
  formData.append("file", params)
  const response = await uploadLampiranEvent(formData)

  return response.data.data
})

export const fetchUploadPhoto = createAsyncThunk('appCalendar/fetchUploadPhoto', async (params) => {
  const formData = new FormData()
  formData.append("file", params)
  const response = await uploadPhotoEvent(formData)

  return response.data.data
})

export const appCalendarSlice = createSlice({
  name: 'appCalendar',
  initialState: {
    events: [],
    selectedEvent: {},
    selectedCalendars: ['Task', 'Event', 'Holiday'],
    nik: getUsernik(),
    userData: getUserData(),
    startDate: moment().startOf('month').format('YYYY-MM-DD'),
    endDate: moment().endOf('month').format('YYYY-MM-DD'),
    loadedMonths: [],
    labels: [],
    searchPartisipans: [],
    addedPartisipan: [],
    searchPembicaras: [],
    addedPembicara: [],
    searchPenyelenggaras: [],
    addedPenyelenggara: [],
    types: [],
    categories: [],
    attachments: [],
    photo: null,
    uploadedLampiran: [],
    uploadedPhoto: null,
    isWorking: false
  },
  reducers: {
    changeStartDate: (state, action) => {
      state.startDate = action.payload
    },
    changeEndDate: (state, action) => {
      state.endDate = action.payload
    },
    selectEvent: (state, action) => {
      state.selectedEvent = action.payload
    },
    addPartisipan: (state, action) => {
      let record = action.payload
      let isExist = state.addedPartisipan.some(param => param.nik === record.nik)

      let temp = []
      if (isExist) {
        state.addedPartisipan.forEach(ap => {
          if (ap.nik !== record.nik) {
            temp.push(ap)
          }
        })
      } else {
        temp = state.addedPartisipan
        temp.unshift(record)
      }

      state.addedPartisipan = temp
    },
    removePartisipan: (state, action) => {
      let results = []
      const index = action.payload
      for (let i = 0; i < state.addedPartisipan.length; i++) {
        const record = state.addedPartisipan[i];
        if (i !== index) {
          results.push(record)
        }
      }

      state.addedPartisipan = results
    },
    clearPartisipan: (state) => {
      state.addedPartisipan = []
    },
    addPembicara: (state, action) => {
      let record = action.payload
      let isExist = state.addedPembicara.some(param => param.nik === record.nik)

      let temp = []
      if (isExist) {
        state.addedPembicara.forEach(ap => {
          if (ap.nik !== record.nik) {
            temp.push(ap)
          }
        })
      } else {
        temp = state.addedPembicara
        temp.unshift(record)
      }

      state.addedPembicara = temp
    },
    removePembicara: (state, action) => {
      let results = []
      const index = action.payload
      for (let i = 0; i < state.addedPembicara.length; i++) {
        const record = state.addedPembicara[i];
        if (i !== index) {
          results.push(record)
        }
      }

      state.addedPembicara = results
    },
    clearPembicara: (state) => {
      state.addedPembicara = []
    },
    addPenyelenggara: (state, action) => {
      let record = action.payload
      let isExist = state.addedPenyelenggara.some(param => param.nik === record.nik)

      let temp = []
      if (isExist) {
        state.addedPenyelenggara.forEach(ap => {
          if (ap.nik !== record.nik) {
            temp.push(ap)
          }
        })
      } else {
        temp = state.addedPenyelenggara
        temp.unshift(record)
      }

      state.addedPenyelenggara = temp
    },
    removePenyelenggara: (state, action) => {
      let results = []
      const index = action.payload
      for (let i = 0; i < state.addedPenyelenggara.length; i++) {
        const record = state.addedPenyelenggara[i];
        if (i !== index) {
          results.push(record)
        }
      }

      state.addedPenyelenggara = results
    },
    clearPenyelenggara: (state) => {
      state.addedPenyelenggara = []
    },
    addAttachment: (state, action) => {
      state.attachments.unshift(action.payload)
    },
    removeAttachment: (state, action) => {
      let results = []
      const index = action.payload
      for (let i = 0; i < state.attachments.length; i++) {
        const record = state.attachments[i];
        if (i !== index) {
          results.push(record)
        }
      }

      state.attachments = results
    },
    clearAttachment: (state) => {
      state.attachments = []
    },
    changePhoto: (state, action) => {
      state.photo = action.payload
    },
    removePhoto: (state) => {
      state.photo = null
    },
    clearUploadedFiles: (state) => {
      state.uploadedLampiran = []
      state.uploadedPhoto = null
    },
    changeIsWorking: (state, action) => {
      state.isWorking = action.payload
    },
    clearLoadedMonths: (state) => {
      state.loadedMonths = []
    },
    clearEvents: (state) => {
      state.events = []
    },
    hapusEvent: (state, action) => {
      state.events = state.events.filter(record => record.id !== action.payload)
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        if (!state.loadedMonths.includes(action.meta.arg.startDate)) {
          state.loadedMonths.push(action.meta.arg.startDate)
        }

        state.events = action.payload
        state.isWorking = false
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.isWorking = false
      })
      .addCase(fetchEventDetail.fulfilled, (state, action) => {
        state.selectedEvent = action.payload
        state.isWorking = false
      })
      .addCase(updateFilter.fulfilled, (state, action) => {
        if (state.selectedCalendars.includes(action.payload)) {
          state.selectedCalendars.splice(state.selectedCalendars.indexOf(action.payload), 1)
        } else {
          state.selectedCalendars.push(action.payload)
        }
      })
      .addCase(updateAllFilters.fulfilled, (state, action) => {
        const value = action.payload
        let selected = []
        if (value === true) {
          selected = ['Task', 'Event', 'Holiday']
        } else {
          selected = []
        }
        state.selectedCalendars = selected
      })
      .addCase(fetchLabels.fulfilled, (state, action) => {
        state.labels = action.payload
      })
      .addCase(fetchPartisipans.fulfilled, (state, action) => {
        state.searchPartisipans = action.payload
      })
      .addCase(fetchPembicaras.fulfilled, (state, action) => {
        state.searchPembicaras = action.payload
      })
      .addCase(fetchPenyelenggaras.fulfilled, (state, action) => {
        state.searchPenyelenggaras = action.payload
      })
      .addCase(fetchTypes.fulfilled, (state, action) => {
        state.types = action.payload
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(fetchUploadLampiran.fulfilled, (state, action) => {
        state.uploadedLampiran.push({
          name: action.payload.fileName,
          status: null
        })
      })
      .addCase(fetchUploadPhoto.fulfilled, (state, action) => {
        state.uploadedPhoto = {
          name: action.payload.fileName,
          status: null
        }
      })
  }
})

export const { 
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
  addAttachment,
  removeAttachment,
  clearAttachment,
  changePhoto,
  removePhoto,
  clearUploadedFiles,
  changeIsWorking,
  changeStartDate,
  changeEndDate,
  clearLoadedMonths,
  clearEvents,
  hapusEvent
} = appCalendarSlice.actions

export default appCalendarSlice.reducer
