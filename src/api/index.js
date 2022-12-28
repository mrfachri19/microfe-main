import axios from "axios";
import CONFIG from "@src/config";
import { getToken, getTokenAPIM, getUserId } from "@src/utils/storage";
import { mobileVersion } from '@store/global';

const fullURL = (path) => {
  return `${CONFIG.API_URL}/${path}`;
};
export const handleNetworkError = (error) => {
  // if (error.message === "Network request failed") {
  //   alert(
  //     "Kesalahan Jaringan",
  //     "Silakan periksa koneksi Anda dan coba kembali.",
  //     "iconNoInet"
  //   );
  // }
  // throw error;
};

const postLogin = (api) => (data) => {
  const TokenAPIM = getTokenAPIM();
  return axios.post(fullURL(api), data, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Authorization": `Basic ZGlhcml1bV83MzI4NzA1OTQ6WGN2Y3pFM1RkWFFQ`,
      Authorization: `bearer ${TokenAPIM}`
    }
  });
};

const postLoginCBN = (api) => (data) => {
  return axios.post(api, data, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    }
  });
};

const post = (api) => (data) => {
  const TokenAPIM = getTokenAPIM();
  const TokenAuth = getToken();
  return axios.post(fullURL(api), data, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": `${CONFIG.origin}`,
      "Content-type": "application/json",
      "X-Authorization": `bearer ${TokenAuth}`,
      Authorization: `bearer ${TokenAPIM}`
    }
  });
};

const postMultipart = (api) => (data) => {
  const TokenAPIM = getTokenAPIM();
  const TokenAuth = getToken();
  return axios.post(fullURL(api), data, {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": `${CONFIG.origin}`,
      "Content-type": "multipart/form-data",
      "X-Authorization": `bearer ${TokenAuth}`,
      Authorization: `bearer ${TokenAPIM}`
    }
  });
};

const get = (api) => (param = "") => {
  const TokenAPIM = getTokenAPIM();
  const TokenAuth = getToken();
  return axios(`${fullURL(api)}${param}`, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": `${CONFIG.origin}`,
      "Content-type": "application/json",
      "X-Authorization": `bearer ${TokenAuth}`,
      Authorization: `bearer ${TokenAPIM}`
    }
  });
};

const put = (api) => (data) => {
  const TokenAPIM = getTokenAPIM();
  const TokenAuth = getToken();
  return axios.put(fullURL(api), data, {
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": `${CONFIG.origin}`,
      "Content-type": "application/json",
      "X-Authorization": `bearer ${TokenAuth}`,
      Authorization: `bearer ${TokenAPIM}`
    }
  });
};

const deletePost = (api) => (data) => {
  const TokenAPIM = getTokenAPIM();
  const TokenAuth = getToken();
  return axios.delete(fullURL(api), {
    headers: {
      "Access-Control-Allow-Origin": `${CONFIG.origin}`,
      "Content-type": "application/json",
      "X-Authorization": `bearer ${TokenAuth}`,
      Authorization: `bearer ${TokenAPIM}`
    },
    data
  });
};

const deleteParam = (api) => (param = '') => {
  const TokenAPIM = getTokenAPIM();
  const TokenAuth = getToken();
  return axios.delete(`${fullURL(api)}${param}`, {
    method: "DELETE",
    headers: {
      "Access-Control-Allow-Origin": `${CONFIG.origin}`,
      "Content-type": "application/json",
      "X-Authorization": `bearer ${TokenAuth}`,
      Authorization: `bearer ${TokenAPIM}`
    }
  });
};

// Authentication
export const postLoginAuth = postLogin(
  "gateway/telkom-diarium-auth/1.0/authService/oauth/token"
);
export const postLoginAuthCBN = postLoginCBN(
  "https://apifactory.telkom.co.id:8243/hcm/auth/v1/token"
);

//GET
export const getBanner = get(
  "gateway/telkom-diarium-banner/1.0/bannerV3/announcement/mobile/ongoing?appVersion=" +
  mobileVersion
);
export const getTimeManagement = get(
  "gateway/telkom-diarium-timemanagement/1.0/timeManagement/"
);
export const getSearchKaryawan = get(
  "gateway/telkom-diarium-timemanagement/1.0/timeManagement/employees/searching"
);
export const getOKR = get("gateway/telkom-diarium-okr/1.0/activity-okr");
export const getPWB = get("gateway/telkom-pwb/1.0/");
export const getFWA = get("gateway/telkom-diarium-fwa/1.0/");
export const getTimeManagementV2 = get(
  "gateway/telkom-diarium-timemanagement/1.0/timeManagementV2/"
);
export const getJWTPass = get(
  "gateway/telkom-diarium-timemanagement/1.0/timeManagementV2/employees/tokenencoder?external_app=laporposisi"
);
export const getMobile = get(
  "gateway/telkom-diarium-mobilecollaborate/1.0/mobile/"
);
export const getMobileV2 = get(
  "gateway/telkom-diarium-mobilecollaborate/2.0/mobile/"
);
export const getProfileUser = get(
  "gateway/telkom-diarium-mobilecollaborate/2.0/mobile/user/byNik"
);
export const getMobileNew = get(
  "gateway/telkom-diarium-mobilecollaboratenew/1.0/mobile/"
);
export const getConnector = get(
  "gateway/telkom-diarium-connector/1.0/connector"
);
export const getTimeLog = get(
  "gateway/telkom-diarium-timemanagement/1.0/timeManagementV2/activity"
);
export const getOkrId = get(
  "gateway/telkom-diarium-timemanagement/1.0/timeManagementV2/activity-okr/"
);
export const getConectionStatus = get(
  "gateway/telkom-diarium-mobilecollaborate/1.0/mobile/connection/"
);
export const getMenuConfig = get(
  "gateway/telkom-diarium-mobilecollaborate/1.0/menu/config"
);
export const getCuti = get(
  "gateway/telkom-cuti/1.0/"
);
export const getTaskCuti = get(
  "gateway/telkom-diarium-timemanagement/1.0/timeManagementV2/activity/new"
);
export const getNotifyCuti = get(
  "gateway/telkom-diarium-timemanagement/1.1/request-notify/reference"
);
export const getEvent = get(
  "gateway/telkom-diarium-event/2.0/event/"
);
export const getEventV1 = get(
  "gateway/telkom-diarium-event/1.0/eventManagement/event/"
);

export const getQuestion = get(
  "gateway/telkom-diarium-banner/1.0/bannerV3/question/mobile/65?view=all"
);

export const getQuestionRating = get(
  "gateway/telkom-diarium-banner/1.0/bannerV3/question/mobile/26?view=rating&language=id"
);

//POST
export const presensiPost = post(
  "gateway/telkom-diarium-timemanagement/1.0/timeManagement/absensi/reporting/personal"
);
export const addTask = post(
  "gateway/telkom-diarium-timemanagement/1.0/timeManagementV2/activity"
);
export const updateTask = post(
  "gateway/telkom-diarium-timemanagement/1.0/timeManagementV2/activity/status"
);
export const postComent = post(
  "gateway/telkom-diarium-timemanagement/1.0/timeManagementV2/comments"
);
export const postPermohonan = post(
  "gateway/telkom-diarium-fwa/1.0/flexi/place"
);
export const cancelPermohonan = post(
  "gateway/telkom-diarium-fwa/1.0/flexi/place/cancel"
);
export const approvalPermohonan = post(
  "gateway/telkom-diarium-fwa/1.0/flexi/place/approval"
);
export const addFriend = post(
  "gateway/telkom-diarium-mobilecollaborate/1.0/mobile/connection/addfriend"
);
export const addKomunitas = post(
  "gateway/telkom-diarium-mobilecollaborate/1.0/mobile/connection/follow"
);
export const postNotif = post(
  "gateway/telkom-diarium-mobilecollaborate/1.0/mobile/notificaion"
);
export const postSearch = post(
  "gateway/telkom-diarium-mobilecollaborate/1.0/mobile/user/search"
);
export const postTrackingTime = post(
  "gateway/telkom-diarium-timemanagement/1.0/timeManagementV2/activity/tracking_time"
);
export const postCuti = post(
  "gateway/telkom-cuti/1.0/pengajuan-cuti/"
);
export const cancelCuti = post(
  "gateway/telkom-cuti/1.0/pembatalan-cuti/"
);
export const approvalCuti = post(
  "gateway/telkom-cuti/1.0/approval-cuti/"
);
export const postEvent = post(
  "gateway/telkom-diarium-event/2.0/event/session/wrap?appVersion=web&language=id&userTimezone=GMT+7"
);
export const postCountDate = post(
  "gateway/telkom-cuti/1.0/hitung-tgl/"
);

export const postAnswer = post(
  "gateway/telkom-diarium-survey/1.0/question/mobile/answer/create/all"
);

export const postConnector = post(
  "gateway/telkom-diarium-connector/1.0/connector"
);

//POST WITH FILE
export const uploadlampiran = postMultipart(
  "gateway/telkom-diarium-timemanagement/1.0/timeManagementV2/activity/attachment"
);
export const uploadLampiranCuti = postMultipart(
  `gateway/telkom-diarium-mobilecollaborate/1.0/mobile/file/upload/single/dok-cuti/${getUserId()}`
);
export const uploadLampiranEvent = postMultipart(
  "gateway/telkom-diarium-event/2.0/event/session/attachment?appVersion=web&language=id&userTimezone=GMT+7"
);
export const uploadPhotoEvent = postMultipart(
  "gateway/telkom-diarium-event/2.0/event/session/photo?appVersion=web&language=id&userTimezone=GMT+7"
);
export const uploadFeedback = postMultipart(
  `gateway/telkom-diarium-mobilecollaborate/1.0/mobile/file/upload/single/banner/${getUserId()}`
);

// Delete
export const deleteTask = deletePost(
  "gateway/telkom-diarium-timemanagement/2.0/timeManagementV2/activity"
);
export const deleteEvent = deleteParam(
  "gateway/telkom-diarium-event/2.0/event/session/"
);

// Put / update
export const updateTaskModal = put(
  "gateway/telkom-diarium-timemanagement/2.0/timeManagementV2/activity"
);

// Get Newsfeed Home
export const getNewsfeedHome = get(
  "gateway/telkom-diarium-mobilecollaborate/1.0/mobile/newsfeed/dashboard/new/"
);
//Like post
export const likePost = post(
  "gateway/telkom-diarium-mobilecollaborate/1.0/mobile/like/express"
);
//Unlike post
export const unLikePost = get(
  "gateway/telkom-diarium-mobilecollaborate/1.0/mobile/like/unlike"
);
//comment post
export const commentPost = post(
  "gateway/telkom-diarium-mobilecollaborate/1.0/mobile/comment/addcomment"
);

//load comment post
export const loadCommentById = get(
  "gateway/telkom-diarium-mobilecollaborate/1.0/mobile/comment/getbytype"
);

//delete comment
export const deleteCommentById = get(
  "gateway/telkom-diarium-mobilecollaborate/2.0/mobile/comment/delete"
);

//get data employees
export const getEmployee = get(
  "gateway/telkom-diarium-employee/1.0/getEmployee/v2/"
);

//get data djm
export const getDJM = get(
  "gateway/telkom-jarvis/1.0/job-profile-djm"
);

//get data employees
export const getFriend = get(
  "gateway/telkom-diarium-mobilecollaborate/2.0/mobile/connection/friends"
);

//get data employees
export const getCommunity = get(
  "gateway/telkom-diarium-mobilecollaborate/2.0/mobile/community"
);

//post sppd
export const createSppd = post(
  "gateway/telkom-diarium-sppd/2.0/request"
);

export const listPetugasSppd = get(
  "gateway/telkom-diarium-sppd/2.0/petugas"
);

export const uploadSppd = post(
  "gateway/telkom-diarium-sppd/2.0/request/upload"
);

export const postApprovalSppd = post(
  "gateway/telkom-diarium-sppd/2.0/request/approval"
);

export const getApprovalSppd = get(
  "gateway/telkom-diarium-sppd/2.0/request/approval"
);

export const transportCostSppd = get(
  "gateway/telkom-diarium-sppd/2.0/request/angkutan"
);

export const dailyCostSppd = get(
  "gateway/telkom-diarium-sppd/2.0/request/harian"
);

export const pemeriksaSppd = get(
  "gateway/telkom-diarium-sppd/2.0/pemeriksa"
);

export const getHistoriesSppd = get(
  "gateway/telkom-diarium-sppd/2.0/request/histories"
);

const API = {
  postLoginAuth,
  postLoginAuthCBN,

  getBanner,
  getTimeManagement,
  getSearchKaryawan,
  getOKR,
  getPWB,
  getFWA,
  getTimeManagementV2,
  getJWTPass,
  getMobile,
  getMobileV2,
  getProfileUser,
  getMobileNew,
  getConnector,
  getTimeLog,
  getOkrId,
  getConectionStatus,
  getMenuConfig,
  getCuti,
  getTaskCuti,
  getNotifyCuti,
  getEvent,
  getEventV1,
  getQuestion,
  getQuestionRating,

  presensiPost,
  addTask,
  updateTask,
  postComent,
  postPermohonan,
  cancelPermohonan,
  approvalPermohonan,
  addFriend,
  addKomunitas,
  postNotif,
  postSearch,
  postTrackingTime,
  postCuti,
  cancelCuti,
  approvalCuti,
  postEvent,
  postAnswer,
  postCountDate,


  uploadlampiran,
  uploadLampiranCuti,
  uploadLampiranEvent,
  uploadPhotoEvent,
  uploadFeedback,

  deleteTask,
  deleteEvent,

  getNewsfeedHome,
  likePost,
  loadCommentById,
  deleteCommentById,
  getEmployee,
  getDJM,
  createSppd,
  listPetugasSppd,
  uploadSppd,
  postApprovalSppd,
  getApprovalSppd,
  transportCostSppd,
  dailyCostSppd,
  getHistoriesSppd,
  pemeriksaSppd,

  updateTaskModal
};

export default API;
