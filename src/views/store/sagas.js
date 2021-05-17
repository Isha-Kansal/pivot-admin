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
  ADD_IMAGE_REQUEST,
  ADD_IMAGE_FAILED,
  ADD_IMAGE_SUCCESS,
  DELETE_RESOURCE_REQUEST,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_FAILED,
  EDIT_RESOURCE_REQUEST,
  EDIT_RESOURCE_FAILED,
  EDIT_RESOURCE_SUCCESS,
  ADD_EXPERT_FAILED,
  ADD_EXPERT_SUCCESS,
  ADD_EXPERT_REQUEST,
  FETCH_EXPERTS_FAILED,
  FETCH_EXPERTS_REQUEST,
  FETCH_EXPERTS_SUCCESS,
  FETCH_ONE_EXPERT_REQUEST,
  FETCH_ONE_EXPERT_FAILED,
  FETCH_ONE_EXPERT_SUCCESS,
  DELETE_EXPERT_REQUEST,
  DELETE_EXPERT_SUCCESS,
  DELETE_EXPERT_FAILED,
  EDIT_EXPERT_REQUEST,
  EDIT_EXPERT_SUCCESS,
  EDIT_EXPERT_FAILED,
  FETCH_EXPERT_SERVICE_FAILED,
  FETCH_EXPERT_SERVICE_REQUEST,
  FETCH_EXPERT_SERVICE_SUCCESS,
  FETCH_USER_EXPERT_REQUEST,
  FETCH_USER_EXPERT_SUCCESS,
  FETCH_USER_EXPERT_FAILED,
  FETCH_USER_RESOURCE_REQUEST,
  FETCH_USER_RESOURCE_SUCCESS,
  FETCH_USER_RESOURCE_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
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

async function callAddExpert(data) {
  const res = await apiCallPost(data.url, data.payload);
  return res;
}
async function callEditResource(data) {
  const res = await apiCallPost(data.url, data.payload);
  return res;
}
async function callEditExpert(data) {
  const res = await apiCallPost(data.url, data.payload);
  return res;
}

async function callAddImage(data) {
  const res = await apiCallPost(data.url, data.payload);
  return res;
}

async function callFetchUsers(data) {
  const res = await apiCallGet(data.payload);
  return res;
}

async function callFetchUserExpert(data) {
  const res = await apiCallGet(data.payload);
  return res;
}
async function callFetchUserResource(data) {
  const res = await apiCallGet(data.payload);
  return res;
}

async function callFetchService(data) {
  const res = await apiCallGet(data.payload);
  return res;
}

async function callDeleteResource(data) {
  const res = await apiCallGet(data.payload);
  return res;
}
async function callDeleteExpert(data) {
  const res = await apiCallGet(data.payload);
  return res;
}



async function callDeleteUser(data) {
  const res = await apiCallGet(data.payload);
  return res;
}

async function callFetchResources(data) {
  const res = await apiCallGet(data.payload);
  return res;
}
async function callFetchExperts(data) {
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

async function callFetchOneExpert(data) {
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

function* fetchUserExpert(action) {
  const response = yield call(callFetchUserExpert, action);

  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: FETCH_USER_EXPERT_SUCCESS,
        userExpert: response.data,
      });
    } else {
      yield put({ type: FETCH_USER_EXPERT_FAILED });
    }
  }
}

function* fetchUserResource(action) {
  const response = yield call(callFetchUserResource, action);

  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: FETCH_USER_RESOURCE_SUCCESS,
        userResource: response.data,
      });
    } else {
      yield put({ type: FETCH_USER_RESOURCE_FAILED });
    }
  }
}

function* fetchResources(action) {
  const response = yield call(callFetchResources, action);

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

function* fetchExperts(action) {
  const response = yield call(callFetchExperts, action);

  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: FETCH_EXPERTS_SUCCESS,
        expertsData: response.data,
      });
    } else {
      yield put({ type: FETCH_EXPERTS_FAILED });
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

function* fetchOneExpert(action) {
  const response = yield call(callFetchOneExpert, action);

  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: FETCH_ONE_EXPERT_SUCCESS,
        oneExpertData: response.data,
      });
    } else {
      yield put({ type: FETCH_ONE_EXPERT_FAILED });
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

function* addExpert(action) {
  const response = yield call(callAddExpert, action);

  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: ADD_EXPERT_SUCCESS,
        addResourceData: response.data,
      });
    } else {
      yield put({ type: ADD_EXPERT_FAILED });
    }
  }
}

function* editResource(action) {
  const response = yield call(callEditResource, action);

  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: EDIT_RESOURCE_SUCCESS,
        editResourceData: response.data.data,
      });
    } else {
      yield put({ type: EDIT_RESOURCE_FAILED });
    }
  }
}

function* editExpert(action) {
  const response = yield call(callEditExpert, action);

  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: EDIT_EXPERT_SUCCESS,
        editExpertData: response.data.data,
      });
    } else {
      yield put({ type: EDIT_EXPERT_FAILED });
    }
  }
}

function* addImage(action) {
  const response = yield call(callAddImage, action);

  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: ADD_IMAGE_SUCCESS,
        addImage: response.data,
      });
    } else {
      yield put({ type: ADD_IMAGE_FAILED });
    }
  }
}

function* deleteResource(action) {
  const response = yield call(callDeleteResource, action);

  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: DELETE_RESOURCE_SUCCESS,
        deleteResourceData: response.data,
      });
    } else {
      yield put({ type: DELETE_RESOURCE_FAILED });
    }
  }
}

function* deleteExpert(action) {
  const response = yield call(callDeleteExpert, action);

  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: DELETE_EXPERT_SUCCESS,
        deleteExpertData: response.data,
      });
    } else {
      yield put({ type: DELETE_EXPERT_FAILED });
    }
  }
}


function* deleteUser(action) {
  const response = yield call(callDeleteUser, action);

  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: DELETE_USER_SUCCESS,
        deleteUserData: response.data,
      });
    } else {
      yield put({ type: DELETE_USER_FAILED });
    }
  }
}






function* fetchService(action) {
  const response = yield call(callFetchService, action);

  if (response && response.data) {
    action.callback(response.data);
    if (response.status === 200) {
      yield put({
        type: FETCH_EXPERT_SERVICE_SUCCESS,
        serviceData: response.data,
      });
    } else {
      yield put({ type: FETCH_EXPERT_SERVICE_FAILED });
    }
  }
}

export default function* LoginByAdminWatcher() {
  yield takeLatest(LOGIN_BY_ADMIN_REQUEST, loginByAdmin);
  yield takeLatest(FETCH_USERS_REQUEST, fetchUsers);
  yield takeLatest(FETCH_ONE_USER_REQUEST, fetchOneUser);
  yield takeLatest(USER_STATUS_REQUEST, userStatus);
  yield takeLatest(ADD_RESOURCE_REQUEST, addResource);
  yield takeLatest(FETCH_RESOURCES_REQUEST, fetchResources);
  yield takeLatest(FETCH_ONE_RESOURCE_REQUEST, fetchOneResource);
  yield takeLatest(ADD_EXPERT_REQUEST, addExpert);
  yield takeLatest(ADD_IMAGE_REQUEST, addImage);
  yield takeLatest(DELETE_RESOURCE_REQUEST, deleteResource);
  yield takeLatest(EDIT_RESOURCE_REQUEST, editResource);
  yield takeLatest(EDIT_EXPERT_REQUEST, editExpert);
  yield takeLatest(DELETE_EXPERT_REQUEST, deleteExpert);
  yield takeLatest(FETCH_EXPERTS_REQUEST, fetchExperts);
  yield takeLatest(FETCH_ONE_EXPERT_REQUEST, fetchOneExpert);
  yield takeLatest(FETCH_EXPERT_SERVICE_REQUEST, fetchService);

  yield takeLatest(FETCH_USER_EXPERT_REQUEST, fetchUserExpert);
  yield takeLatest(FETCH_USER_RESOURCE_REQUEST, fetchUserResource);
}
