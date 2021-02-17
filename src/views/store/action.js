import {
  LOGIN_BY_ADMIN_REQUEST,
  FETCH_USERS_REQUEST,
  USER_STATUS_REQUEST,
  ADD_RESOURCE_REQUEST,
  FETCH_RESOURCES_REQUEST,
  FETCH_ONE_RESOURCE_REQUEST,
} from "./types";

export const loginByAdmin = (url, body, callback) => {
  return {
    type: LOGIN_BY_ADMIN_REQUEST,
    url,
    payload: body,
    callback,
  };
};

export const addResource = (url, body, callback) => {
  return {
    type: ADD_RESOURCE_REQUEST,
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

export const fetchResources = (body, callback) => {
  return {
    type: FETCH_RESOURCES_REQUEST,

    payload: body,
    callback,
  };
};

export const fetchOneUser = (body, callback) => {
  return {
    type: FETCH_USERS_REQUEST,

    payload: body,
    callback,
  };
};
export const fetchOneResource = (body, callback) => {
  return {
    type: FETCH_ONE_RESOURCE_REQUEST,

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
