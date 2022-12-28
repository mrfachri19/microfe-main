import { createStore } from "redux";
import moment from "moment";
import momentID from "moment/locale/id";
import { toast } from "react-toastify";

const initialState = {
  category: "today",
  // Modals
  isValidCaptcha: false,
  isBuatAcara: false,
  isBuatTugas: false,
  isInactive: false,
  isPostPostingan: false,
  isFilter: false,
  isDetailTeam: false,
  isListOKR: false,
  isDetailTask: false,
  isPresensiModal: false,
  isProfileAbout: false,
  isProfileJobdesk: false,
  isJobdeskModal: false,
  isImageModal: false,
  isValidationModal: false,
  isValidationModalTask: false,
  isValidationModalYes: false,
  isPostApproved: false,
  isPernyataanFwaModal: false,
  isPernyataanFwaModalYes: false,
  isLocationModal: false,
  isLainnyaModal: false,
  //
  isPunagasan: false,
  isTugasHariIni: false,
  isTaskLate: false,
  isTaskUpcoming: false,
  isTaskDone: false,
  isTaskBesok: false,
  // detail task
  isDetailTaskId: "",
  isPhoto: "",
  isStatus: "",
  isDescription: "",
  isDescriptionText: "",
  isLabel: "",
  isStartDate: "",
  isEndDate: "",
  isCreatedDate: "",
  isTrackingTime: "",
  isSubtask: [],
  ispriority: 0,
  isLampiran: [],
  isIdOkr: "",
  isTrackingTime: "",
  isIdTimeTracking: "",
  // Team Details Parse
  idTeam: "",
  ownershipTeam: "",
  nameTeam: "",
  fotoTeam: "",
  feelingTeam: "",
  workLocTeam: "",
  checkinLatTeam: "",
  checkinLonTeam: "",
  checkinTimeTeam: "",
  checkinLocTeam: "",
  posisiTeam: "",
  listDataTeamDetails: [],
  listAcara: [],
  listPresensi: [],
  dateCardActivity: moment().format("YYYY-MM-DD"),
  checkoutLatTeam: "",
  checkoutLonTeam: "",
  checkoutTimeTeam: "",
  checkoutLocTeam: "",
  presensiSummary: {
    total: 0,
    total_cuti: 0,
    total_presence: 0,
    total_not_presence: 0
  },
  presensiStatus: {
    has_checked_in: false,
    has_checked_out: false,
    is_cuti: false,
    is_sppd: false
  },

  indexTeamDeatils: "",
  // search
  keywordSearch: "",
  //profile need
  profileTab: "info",
  profileSideList: {
    default: [
      { text: "Data Diri", path: "about" },
      { text: "Jobdesk", path: "jobdesk" },
      { text: "Team", path: "team" },
      { text: "Keluarga", path: "family" }
    ],
    dinas: [
      { text: "Riwayat", path: "dinas" },
      // {text: "Status", path:"status"},
      { text: "Pelatihan", path: "training" },
      { text: "Sertifikasi", path: "certificate" },
      { text: "Penghargaan", path: "achievment" }
    ]
  },
  profileSideTab: "about",
  profileUser: {},
  djmModalKey: "",
  djmModalTitle: "",
  djmModalSubtitle: "",
  djmModalSuggestion: null,
  djmModalDesc: [],
  djmModalDetails: [],
  profileStorage: {},

  //calendar
  calendarBullet: {},

  //image modal
  isImageModal: false,
  imageModalPic: "",
  imageModalDesc: "",

  //chart
  drawChart: {},
  chartColors: {
    green: "#22c55e",
    blue: "#3182CE",
    red: "#F56565",
    grey: "#2D3748"
  },

  //Permohonan
  isBuatPermohonan: false,
  permohonanDiproses: false,
  permohonanNotifikasi: false,
  permohonanPersetujuan: false,
  statusPermohonan: "",
  idPermohonan: "",
  locationLatLong: "",
  wfhLocationLat: "0",
  wfhLocationLong1: "0",
  wfhLocationLat1: "0",
  wfhLocationLong2: "0",
  wfhLocationLat2: "0",
  wfhLocationLong3: "0",
  wfhLocationLat3: "0",
  wfhLocationLong4: "0",
  wfhLocationLat4: "0",
  idWfhLocation: "",

  djmModalDetails: [],

  //Notification badge
  notifiactionCount: "",
};

export const mobileVersion = "5.0.6";
export const mobileVersion2 = "5.0.7";

export const GMT = moment().format("Z").replace(/[0:]/g, "");
export const momentLocale = moment().locale("id", momentID);

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
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

const store = createStore(
  changeState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
