import { put, takeLatest, call } from "redux-saga/effects";
import {
  LOGIN_BY_ADMIN_REQUEST,
  LOGIN_BY_ADMIN_FAILED,
  LOGIN_BY_ADMIN_SUCCESS,
} from "./types";

import { apiCallGet } from "../../common/axios";
import { apiCallPost } from "../../common/axios";

async function callLoginByAdmin(data) {
  debugger;
  const res = await apiCallPost(data.url, data.payload);
  return res;
}

function* loginByAdmin(action) {
  const response = yield call(callLoginByAdmin, action);
  console.log("4586749689485678", response);
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

export default function* LoginByAdminWatcher() {
  yield takeLatest(LOGIN_BY_ADMIN_REQUEST, loginByAdmin);
}
