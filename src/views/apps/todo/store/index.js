// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
import axios from "axios";

// ** API Import
import { getTimeManagementV2, getSearchKaryawan } from "../../../../api";

export const getTasks = createAsyncThunk("appTodo/getTasks", async (params) => {
  const response = await axios.get("/app/todo/tasks", { params });

  return {
    params,
    data: response.data
  };
});
export const fetchPartisipans = createAsyncThunk(
  "appTodo/fetchPartisipans",
  async (params) => {
    const response = await getSearchKaryawan(
      `?keyword=${params.keyword}&limit=10&offset=0&appVersion=web&language=id&userTimezone=GMT+7&isDev=true&with_division=true&is_exclude_login=null`
    );

    const datas = response.data.data;
    return datas;
  }
);
export const fetchLabels = createAsyncThunk(
  "appTodo/fetchLabels",
  async (params) => {
    const results = [];

    const response = await getTimeManagementV2(
      `activity/label?keyword=${params.keyword}&limit=10&offset=0&appVersion=web&language=id&userTimezone=GMT+7&isDev=true`
    );

    const datas = response.data.data;
    datas.forEach((record) => {
      results.push({
        value: record.label_name,
        label: record.label_name
      });
    });

    return results;
  }
);

export const addTask = createAsyncThunk(
  "appTodo/addTask",
  async (task, { dispatch, getState }) => {
    const response = await axios.post("/app/todo/add-tasks", { task });
    await dispatch(getTasks(getState().todo.params));
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  "appTodo/updateTask",
  async (task, { dispatch, getState }) => {
    const response = await axios.post("/app/todo/update-task", { task });
    await dispatch(getTasks(getState().todo.params));
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  "appTodo/deleteTask",
  async (taskId, { dispatch, getState }) => {
    const response = await axios.delete("/app/todo/delete-task", { taskId });
    await dispatch(getTasks(getState().todo.params));
    return response.data;
  }
);

export const appTodoSlice = createSlice({
  name: "appTodo",
  initialState: {
    tasks: [],
    selectedTask: {},
    params: {
      filter: "",
      q: "",
      sort: "",
      tag: ""
    },
    category: "today",
    idTask: "",
    modaltask: false,
    labels: [],
    succesUpdate: false,
    searchPartisipans: [],
    addedPartisipan: [],
    isSidebarTask: false,
    successCreateTugas : false,
  },
  reducers: {
    reOrderTasks: (state, action) => {
      state.tasks = action.payload;
    },
    selectTask: (state, action) => {
      state.selectedTask = action.payload;
    },
    categoryTask: (state, action) => {
      state.category = action.payload;
    },
    idTask: (state, action) => {
      state.idTask = action.payload;
    },
    modalTugas: (state, action) => {
      state.modaltask = action.payload;
    },
    succesUpdateTugas: (state, action) => {
      state.succesUpdate = action.payload;
    },
    addPartisipan: (state, action) => {
      let record = action.payload;
      let isExist = state.addedPartisipan.some(
        (param) => param.nik === record.nik
      );

      let temp = [];
      if (isExist) {
        state.addedPartisipan.forEach((ap) => {
          if (ap.nik !== record.nik) {
            temp.push(ap);
          }
        });
      } else {
        temp = state.addedPartisipan;
        temp.unshift(record);
      }

      state.addedPartisipan = temp;
    },
    removePartisipan: (state, action) => {
      let results = [];
      const index = action.payload;
      for (let i = 0; i < state.addedPartisipan.length; i++) {
        const record = state.addedPartisipan[i];
        if (i !== index) {
          results.push(record);
        }
      }

      state.addedPartisipan = results;
    },
    clearPartisipan: (state) => {
      state.addedPartisipan = [];
    },
    setIsSidebarTask: (state, action) => {
      state.isSidebarTask = action.payload;
    },
    toggleFromCreate: (state, action) => {
      state.successCreateTugas = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.tasks = action.payload.data;
        state.params = action.payload.params;
      })
      .addCase(fetchLabels.fulfilled, (state, action) => {
        state.labels = action.payload;
      })
      .addCase(fetchPartisipans.fulfilled, (state, action) => {
        state.searchPartisipans = action.payload;
      });
  }
});

export const {
  reOrderTasks,
  selectTask,
  categoryTask,
  idTask,
  modalTugas,
  succesUpdateTugas,
  addPartisipan,
  removePartisipan,
  clearPartisipan,
  setIsSidebarTask,
  toggleFromCreate
} = appTodoSlice.actions;

export default appTodoSlice.reducer;
