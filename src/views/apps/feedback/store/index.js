// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getTasks = createAsyncThunk('appRequest/getTasks', async params => {
  const response = await axios.get('/apps/todo/tasks', { params })

  return {
    params,
    data: response.data
  }
})

export const addTask = createAsyncThunk('appRequest/addTask', async (task, { dispatch, getState }) => {
  const response = await axios.post('/apps/todo/add-tasks', { task })
  await dispatch(getTasks(getState().todo.params))
  return response.data
})

export const updateTask = createAsyncThunk('appRequest/updateTask', async (task, { dispatch, getState }) => {
  const response = await axios.post('/apps/todo/update-task', { task })
  await dispatch(getTasks(getState().todo.params))
  return response.data
})

export const deleteTask = createAsyncThunk('appRequest/deleteTask', async (taskId, { dispatch, getState }) => {
  const response = await axios.delete('/apps/todo/delete-task', { taskId })
  await dispatch(getTasks(getState().todo.params))
  return response.data
})

export const getData = createAsyncThunk('appRequest/getData', async params => {
  const response = await axios.get('/api/todo/data', params)
  return { allData: response.data.allData, data: response.data.invoices, totalPages: response.data.total, params }
})

export const appRequestSlice = createSlice({
  name: 'appRequest',
  initialState: {
    tasks: [],
    selectedTask: {},
    params: {
      filter: '',
      q: '',
      sort: '',
      tag: ''
    },
    category: "",
    requestState: "",
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedPermohonanId: "",
    isPostApproved: false,
    //modals
    isPernyataanModal: false,
    isPernyataanModalYes: false,
    isImageModal: false,
    isLocationModal: false,
    isValidationModal: false,
    isValidationModalYes: false,
    //location
    idWfhLocation: "",
    wfhLocationLat: "",
    wfhLocationLong: "",
    wfhLocationLat1: "",
    wfhLocationLong1: "",
    wfhLocationLat2: "",
    wfhLocationLong2: "",
    wfhLocationLat3: "",
    wfhLocationLong3: "",
    wfhLocationLat4: "",
    wfhLocationLong4: "",
    //cuti
    selectedJenisCuti: "",
    selectedRoleCode: "",
    selectedRoleCodeAdv: "",
    dataQuota: "",
    dataCalender: "",
    cuper: "",
    journeyStatus: "",

  },
  reducers: {
    reOrderTasks: (state, action) => {
      state.tasks = action.payload
    },
    selectTask: (state, action) => {
      state.selectedTask = action.payload
    },
    selectPermohonanId: (state, action) => {
      state.selectedPermohonanId = action.payload
    },
    setIsPostApproved: (state, action) => {
      state.isPostApproved = action.payload
    },
    //modals
    setIsPernyataanModal: (state, action) => {
      state.isPernyataanModal = action.payload
    },
    setIsPernyataanModalYes: (state, action) => {
      state.isPernyataanModalYes = action.payload
    },
    setIsImageModal: (state, action) => {
      state.isImageModal = action.payload
    },
    setIsLocationModal: (state, action) => {
      state.isLocationModal = action.payload
    },
    setIsValidationModal: (state, action) => {
      state.isValidationModal = action.payload
    },
    setIsValidationModalYes: (state, action) => {
      state.isValidationModalYes = action.payload
    },
    //location state
    setIdWfhLocation: (state, action) => {
      state.idWfhLocation = action.payload
    },
    setWfhLocationLat: (state, action) => {
      state.wfhLocationLat = action.payload
    },
    setWfhLocationLong: (state, action) => {
      state.wfhLocationLong = action.payload
    },
    setWfhLocationLat1: (state, action) => {
      state.wfhLocationLat1 = action.payload
    },
    setWfhLocationLong1: (state, action) => {
      state.wfhLocationLong1 = action.payload
    },
    setWfhLocationLat2: (state, action) => {
      state.wfhLocationLat2 = action.payload
    },
    setWfhLocationLong2: (state, action) => {
      state.wfhLocationLong2 = action.payload
    },
    setWfhLocationLat3: (state, action) => {
      state.wfhLocationLat3 = action.payload
    },
    setWfhLocationLong3: (state, action) => {
      state.wfhLocationLong3 = action.payload
    },
    setWfhLocationLat4: (state, action) => {
      state.wfhLocationLat4 = action.payload
    },
    setWfhLocationLong4: (state, action) => {
      state.wfhLocationLong4 = action.payload
    },
    //cuti
    selectJenisCuti: (state, action) => {
      state.selectedJenisCuti = action.payload
    },
    selectRoleCode: (state, action) => {
      state.selectedRoleCode = action.payload
    },
    selectRoleCodeAdv: (state, action) => {
      state.selectedRoleCodeAdv = action.payload
    },
    setDataQuota: (state, action) => {
      state.dataQuota = action.payload
    },
    setDataCalender: (state, action) => {
      state.dataCalender = action.payload
    },
    setCuper: (state, action) => {
      state.cuper = action.payload
    },
    setJourneyStatus: (state, action) => {
      state.journeyStatus = action.payload
    },

    categoryRequest: (state, action) => {
      state.category = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload.data
      state.params = action.payload.params
      state.allData = action.payload.allData
      state.total = action.payload.totalPages
    })
  }
})

export const {
  //teuing
  reOrderTasks, 
  selectTask,
  //general
  selectPermohonanId,
  setIsPostApproved,
  categoryRequest,
  //modal
  setIsPernyataanModal,
  setIsPernyataanModalYes,
  setIsImageModal,
  setIsLocationModal,
  setIsValidationModal,
  setIsValidationModalYes,
  //location
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
  //cuti
  selectJenisCuti,
  selectRoleCode,
  selectRoleCodeAdv,
  setDataQuota,
  setDataCalender,
  setJourneyStatus,
  setCuper
} = appRequestSlice.actions

export default appRequestSlice.reducer
