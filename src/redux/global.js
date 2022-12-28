// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

import moment from "moment";
import momentID from "moment/locale/id";


export const mobileVersion = "5.0.6";

export const monthDate = (date = null) => {
  //date must in string and "YYYY-MM-DD" formated
  let result = {
    first: "",
    last: ""
  };
  const format = "YYYY-MM-DD";

  const today = date ? date : moment().format(format);
  result.first = moment(today, format).startOf("month").format(format);
  result.last = moment(today, format).endOf("month").format(format);

  return result;
};

export const todayDate = () => {
  let d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export const quartalNow = () => {
  let d = new Date(),
    month = "" + (d.getMonth() + 1),
    year = d.getFullYear(),
    result = "Q";

  if (month < 4) result += "1 - ";
  else if (month < 7) result += "2 - ";
  else if (month < 10) result += "3 - ";
  else result += "4 - ";

  result += year;

  return result;
};

export const truncate = (input) => {
  if (input.length > 45) {
    return input.substring(0, 45) + "...";
  }
  return input;
};

export const displayWindowSize = (types) => {
  var val = 0;
  if (types.toLowerCase() == "width") {
    val = document.documentElement.clientWidth;
  } else if (types.toLowerCase() == "height") {
    val = document.documentElement.clientHeight;
  }
  return val;
};

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    dateCardActivity: moment().format("YYYY-MM-DD"),
    mobileVersion : mobileVersion,
    GMT : moment().format("Z").replace(/[0:]/g, ""),
    keywordSearch : '',

  },
  reducers: {
    searchKeyword: (state, action) => {
      state.keywordSearch = action.payload;
    },
  }
})

export const { searchKeyword } = globalSlice.actions

export default globalSlice.reducer
