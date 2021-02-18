import { put, takeLatest, call } from "redux-saga/effects";
import {
  LOGIN_BY_ADMIN_REQUEST,
  LOGIN_BY_ADMIN_FAILED,
  LOGIN_BY_ADMIN_SUCCESS,
  FETCH_USERS_FAILED,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_REQUEST,
  USER_STATUS_FAILED,
  USER_STATUS_SUCCESS,
  USER_STATUS_REQUEST,
  FETCH_ONE_USER_FAILED,
  FETCH_ONE_USER_SUCCESS,
  FETCH_ONE_USER_REQUEST,
  ADD_RESOURCE_FAILED,
  ADD_RESOURCE_SUCCESS,
  ADD_RESOURCE_REQUEST,
  FETCH_RESOURCES_REQUEST,
  FETCH_RESOURCES_FAILED,
  FETCH_RESOURCES_SUCCESS,
  FETCH_ONE_RESOURCE_REQUEST,
  FETCH_ONE_RESOURCE_FAILED,
  FETCH_ONE_RESOURCE_SUCCESS,
  ADD_RESOURCE_IMAGE_REQUEST,
  ADD_RESOURCE_IMAGE_FAILED,
  ADD_RESOURCE_IMAGE_SUCCESS,
} from "./types";

import { apiCallGet } from "../../common/axios";
import { apiCallPost } from "../../common/axios";

async function callLoginByAdmin(data) {
  const res = await apiCallPost(data.url, data.payload);
  return res;
}

async function callAddResource(data) {
  const res = await apiCallPost(data.url, data.payload);
  return res;
}

async function callAddResourceImage(data) {
  const res = await apiCallPost(data.url, data.payload);
  return res;
}

async function callFetchUsers(data) {
  const res = await apiCallGet(data.payload);
  return res;
}

async function callFetchResources(data) {
  const res = await apiCallGet(data.payload);
  return res;
}
async function callFetchOneUser(data) {
  const res = await apiCallGet(data.payload);
  return res;
}

async function callFetchOneResource(data) {
  const res = await apiCallGet(data.payload);
  return res;
}

async function callUserStatus(data) {
  const res = await apiCallPost(data.url, data.payload);
  return res;
}
function* loginByAdmin(action) {
  const response = yield call(callLoginByAdmin, action);

  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: LOGIN_BY_ADMIN_SUCCESS,
        loginData: response.data,
      });
    } else {
      yield put({ type: LOGIN_BY_ADMIN_FAILED });
    }
  }
}

function* fetchUsers(action) {
  const response = yield call(callFetchUsers, action);

  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: FETCH_USERS_SUCCESS,
        usersData: response.data,
      });
    } else {
      yield put({ type: FETCH_USERS_FAILED });
    }
  }
}

function* fetchResources(action) {
  const response = yield call(callFetchResources, action);
  console.log("84879498794897", response);
  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: FETCH_RESOURCES_SUCCESS,
        resourcesData: response.data,
      });
    } else {
      yield put({ type: FETCH_RESOURCES_FAILED });
    }
  }
}

function* fetchOneUser(action) {
  const response = yield call(callFetchOneUser, action);

  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: FETCH_ONE_USER_SUCCESS,
        oneUserData: response.data,
      });
    } else {
      yield put({ type: FETCH_ONE_USER_FAILED });
    }
  }
}

function* fetchOneResource(action) {
  const response = yield call(callFetchOneResource, action);
  console.log("84697849784780", response);
  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: FETCH_ONE_RESOURCE_SUCCESS,
        oneResourceData: response.data,
      });
    } else {
      yield put({ type: FETCH_ONE_RESOURCE_FAILED });
    }
  }
}

function* userStatus(action) {
  const response = yield call(callUserStatus, action);

  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: USER_STATUS_SUCCESS,
        userStatus: response.data,
      });
    } else {
      yield put({ type: USER_STATUS_FAILED });
    }
  }
}

function* addResource(action) {
  const response = yield call(callAddResource, action);
  console.log("u59794967894897u8", response);
  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: ADD_RESOURCE_SUCCESS,
        addResourceData: response.data,
      });
    } else {
      yield put({ type: ADD_RESOURCE_FAILED });
    }
  }
}

function* addResourceImage(action) {
  const response = yield call(callAddResourceImage, action);
  console.log("responseresponseresponseresponse", response);
  // if (response && response.data) {
  //   action.callback(response.data);
  //   if (response.status === 200) {
  //     yield put({
  //       type: ADD_RESOURCE_IMAGE_SUCCESS,
  //       addResourceImage: response.data,
  //     });
  //   } else {
  //     yield put({ type: ADD_RESOURCE_IMAGE_FAILED });
  //   }
  // }
}

export default function* LoginByAdminWatcher() {
  yield takeLatest(LOGIN_BY_ADMIN_REQUEST, loginByAdmin);
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsers);
  yield takeLatest(FETCH_ONE_USER_REQUEST, fetchOneUser);
  yield takeLatest(USER_STATUS_REQUEST, userStatus);
  yield takeLatest(ADD_RESOURCE_REQUEST, addResource);
  yield takeLatest(FETCH_RESOURCES_REQUEST, fetchResources);
  yield takeLatest(FETCH_ONE_RESOURCE_REQUEST, fetchOneResource);

  yield takeLatest(ADD_RESOURCE_IMAGE_REQUEST, addResourceImage);
}
