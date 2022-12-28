import { thousand } from './format';
import { toTitleCase } from './text';
import moment from "moment";

const regexAlphabet = /[^a-zA-Z ]+/g;
const regexAlphanumeric = /[^a-zA-Z0-9 ]+/g;
const regexNumber = /[^0-9,]+/g;

export const alphabet = (value) => (
  value && value.replace(regexAlphabet, '')
);

export const alphanumeric = (value) => (
  value && value.replace(regexAlphanumeric, '')
);

export const number = (value) => (
  value && value.replace(regexNumber, '')
);

export const titleCase = (type) => (value) => {
  if (type === 'alphabet') return value && toTitleCase(value.replace(regexAlphabet, ''));
  if (type === 'alphanumeric') return value && toTitleCase(value.replace(regexAlphanumeric, ''));
  return value && toTitleCase(value);
};

export const thousandSeparator = (value) => (
  value && thousand(value.replace(/[^0-9]+/g, ''))
);

export const formatStartEndDate = (startDate, endDate) => {
  var dateVal = `${startDate} - ${endDate}`;
  var startVal = moment(startDate, "D MMMM YYYY").format("YYYYMMDD");
  var endVal = moment(endDate, "D MMMM YYYY").format("YYYYMMDD");

  if (endVal == "99991231") {
    dateVal = `${startDate} - Sekarang`;
  } else {
    endDate = moment(endDate, "D MMMM YYYY").locale("id").format("D MMMM YYYY");
    if (parseInt(startVal) == parseInt(endVal)) {
      dateVal = startDate;
    } else if (parseInt(startVal.slice(0, 6)) == parseInt(endVal.slice(0, 6))) {
      //same month
      dateVal = `${moment(startDate, "D MMMM YYYY").format("D")} - ${endDate}`;
    } else if (parseInt(startVal.slice(0, 4)) == parseInt(endVal.slice(0, 4))) {
      //same year
      dateVal = `${moment(startDate, "D MMMM YYYY")
        .locale("id")
        .format("D MMMM")} - ${endDate}`;
    }
  }
  return dateVal;
};

export const quartalToDate = (val, year) => {
  var result = {};

  if (val && year) {
    var ms = "01",
      me = "12",
      de = "31";
    if (parseInt(val) == 1) {
      me = "03";
    } else if (parseInt(val) == 2) {
      ms = "04";
      me = "06";
      de = "30";
    } else if (parseInt(val) == 3) {
      ms = "07";
      me = "09";
      de = "30";
    } else if (parseInt(val) == 4) {
      ms = "10";
    }
    result.startDate = `${year}-${ms}-01`;
    result.endDate = `${year}-${me}-${de}`;
  }

  return result;
};

export function unEntity(str = ''){
  return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}
