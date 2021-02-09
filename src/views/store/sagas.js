import { put, takeLatest, call } from "redux-saga/effects";
import {
  LOGIN_BY_ADMIN_REQUEST,
  LOGIN_BY_ADMIN_FAILED,
  LOGIN_BY_ADMIN_SUCCESS,
  FETCH_USERS_FAILED,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_REQUEST,
} from "./types";

import { apiCallGet } from "../../common/axios";
import { apiCallPost } from "../../common/axios";

async function callLoginByAdmin(data) {
  const res = await apiCallPost(data.url, data.payload);
  return res;
}
async function callFetchUsers(data) {
  const res = await apiCallGet(data.payload);
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
  console.log("478567894897894857", response);
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

export default function* LoginByAdminWatcher() {
  yield takeLatest(LOGIN_BY_ADMIN_REQUEST, loginByAdmin);
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsers);
}
