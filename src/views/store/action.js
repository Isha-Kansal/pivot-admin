import {
  LOGIN_BY_ADMIN_REQUEST,
  FETCH_USERS_REQUEST,
  USER_STATUS_REQUEST,
  ADD_RESOURCE_REQUEST,
  FETCH_RESOURCES_REQUEST,
  FETCH_ONE_RESOURCE_REQUEST,
  ADD_RESOURCE_IMAGE_REQUEST,
  SET_IMAGE,
  DELETE_RESOURCE_REQUEST,
  EDIT_RESOURCE_REQUEST,
  SET_RESOURCE_DATA,
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
export const editResource = (url, body, callback) => {
  return {
    type: EDIT_RESOURCE_REQUEST,
    url,
    payload: body,
    callback,
  };
};
export const setImage = (data) => {
  return {
    type: SET_IMAGE,
    payload: data,
  };
};
export const setResourceData = (data) => {
  return {
    type: SET_RESOURCE_DATA,
    payload: data,
  };
};
export const addResourceImage = (url, body, callback) => {
  return {
    type: ADD_RESOURCE_IMAGE_REQUEST,
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

export const deleteResource = (body, callback) => {
  return {
    type: DELETE_RESOURCE_REQUEST,

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
