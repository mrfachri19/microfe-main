const TOKEN_STORAGE = "diarium_access_token";
const TOKEN_STORAGE_APIM = "diarium_access_token_apim";
const USER_DATA_STORAGE = "diarium_user_data";
const USER_NIK = "diarium_user_nik";

import { noValue } from './validateInput';

export function setCookie(KEY, VAL, HOUR) {
  var expires = "";
  if (HOUR) {
    var date = new Date();
    date.setTime(date.getTime() + HOUR * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = KEY + "=" + (VAL || "") + expires + "; path=/";
}

export function getCookie(KEY) {
  var nameEQ = KEY + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function eraseCookie(KEY) {
  document.cookie = KEY + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function setToken(value) {
  setCookie(TOKEN_STORAGE, value, 8);
}

export function setTokenAPIM(value) {
  setCookie(TOKEN_STORAGE_APIM, value, 8);
}

export function setUsernik(value) {
  setCookie(USER_NIK, value, 8);
}

export function setUserData(value) {
  // localStorage.setItem(USER_DATA_STORAGE, JSON.stringify(value));
  setCookie(USER_DATA_STORAGE, JSON.stringify(value), 8);
}

export function getToken() {
  return getCookie(TOKEN_STORAGE);
}

export function getTokenAPIM() {
  return getCookie(TOKEN_STORAGE_APIM);
}

export function getUsernik() {
  return getCookie(USER_NIK);
}

export function getUserData() {
  // return JSON.parse(localStorage.getItem(USER_DATA_STORAGE));
  return JSON.parse(getCookie(USER_DATA_STORAGE) || '{}')
}

export function getUserId() {
  var userData = getUserData();
  return userData.id_user
}

export function isSessionActive() {
  var userData = getUserData();
  return !noValue(userData)
}

export function clearStorages() {
  eraseCookie(TOKEN_STORAGE);
  eraseCookie(TOKEN_STORAGE_APIM);
  eraseCookie(USER_DATA_STORAGE);
  eraseCookie(USER_NIK);
  // localStorage.removeItem(USER_DATA_STORAGE);
}
