import {
  LOGIN_BY_ADMIN_REQUEST,
  FETCH_USERS_REQUEST,
  USER_STATUS_REQUEST,
  FETCH_ONE_USER_REQUEST,
} from "./types";

export const loginByAdmin = (url, body, callback) => {
  return {
    type: LOGIN_BY_ADMIN_REQUEST,
    url,
    payload: body,
    callback,
  };
};

export const fetchUsers = (body, callback) => {
  return {
    type: FETCH_USERS_REQUEST,

    payload: body,
    callback,
  };
};

export const fetchOneUser = (url, body, callback) => {
  return {
    type: FETCH_USERS_REQUEST,
    url,
    payload: body,
    callback,
  };
};

export const userStatus = (url, body, callback) => {
  return {
    type: USER_STATUS_REQUEST,
    url,
    payload: body,
    callback,
  };
};
