const {
  LOGIN_BY_ADMIN_REQUEST,
  LOGIN_BY_ADMIN_FAILED,
  LOGIN_BY_ADMIN_SUCCESS,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  USER_STATUS_FAILED,
  USER_STATUS_REQUEST,
  USER_STATUS_SUCCESS,
  FETCH_ONE_USER_FAILED,
  FETCH_ONE_USER_SUCCESS,
  FETCH_ONE_USER_REQUEST,
  ADD_RESOURCE_REQUEST,
  ADD_RESOURCE_SUCCESS,
  ADD_RESOURCE_FAILED,
  FETCH_RESOURCES_REQUEST,
  FETCH_RESOURCES_FAILED,
  FETCH_RESOURCES_SUCCESS,

  FETCH_ONE_RESOURCE_REQUEST,
  FETCH_ONE_RESOURCE_FAILED,
  FETCH_ONE_RESOURCE_SUCCESS,
  ADD_IMAGE_REQUEST,
  ADD_IMAGE_FAILED,
  ADD_IMAGE_SUCCESS,
  SET_IMAGE,
  DELETE_RESOURCE_REQUEST,
  DELETE_RESOURCE_SUCCESS,
  DELETE_RESOURCE_FAILED,
  EDIT_RESOURCE_REQUEST,
  EDIT_RESOURCE_FAILED,
  EDIT_RESOURCE_SUCCESS,
  SET_RESOURCE_DATA,
  ADD_EXPERT_REQUEST,
  ADD_EXPERT_FAILED,
  ADD_EXPERT_SUCCESS,
} = require("./types");

const initialState = {
  loginData: {},
  usersData: {},
  userStatus: {},
  oneUserData: {},
  addResourceData: {},
  addExpertData: {},
  resourcesData: {},
  oneResourceData: {},
  addImage: {},
  saveImage: "",
  deleteResourceData: {},
  editResourceData: {},
  saveResourceData: {},
};

const LoginAndNavigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_BY_ADMIN_REQUEST: {
      return {
        ...state,
      };
    }
    case LOGIN_BY_ADMIN_SUCCESS: {
      return {
        ...state,
        loginData: action.loginData || {},
      };
    }
    case LOGIN_BY_ADMIN_FAILED: {
      return {
        ...state,
      };
    }
    case FETCH_USERS_REQUEST: {
      return {
        ...state,
      };
    }
    case FETCH_USERS_SUCCESS: {
      return {
        ...state,
        usersData: action.usersData || {},
      };
    }
    case FETCH_USERS_FAILED: {
      return {
        ...state,
      };
    }

    case FETCH_RESOURCES_REQUEST: {
      return {
        ...state,
      };
    }
    case FETCH_RESOURCES_SUCCESS: {
      return {
        ...state,
        resourcesData: action.resourcesData || {},
      };
    }
    case FETCH_RESOURCES_FAILED: {
      return {
        ...state,
      };
    }

    case FETCH_ONE_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case FETCH_ONE_USER_SUCCESS: {
      return {
        ...state,
        oneUserData: action.oneUserData || {},
      };
    }
    case FETCH_ONE_USER_FAILED: {
      return {
        ...state,
      };
    }

    case FETCH_ONE_RESOURCE_REQUEST: {
      return {
        ...state,
      };
    }
    case FETCH_ONE_RESOURCE_SUCCESS: {
      return {
        ...state,
        oneResourceData: action.oneResourceData || {},
      };
    }
    case FETCH_ONE_RESOURCE_FAILED: {
      return {
        ...state,
      };
    }

    case USER_STATUS_REQUEST: {
      return {
        ...state,
      };
    }
    case USER_STATUS_SUCCESS: {
      return {
        ...state,
        userStatus: action.userStatus || {},
      };
    }
    case USER_STATUS_FAILED: {
      return {
        ...state,
      };
    }
    case ADD_RESOURCE_REQUEST: {
      return {
        ...state,
      };
    }
    case ADD_RESOURCE_SUCCESS: {
      return {
        ...state,
        addResourceData: action.addResourceData || {},
      };
    }
    case ADD_RESOURCE_FAILED: {
      return {
        ...state,
      };
    }

    case ADD_EXPERT_REQUEST: {
      return {
        ...state,
      };
    }
    case ADD_EXPERT_SUCCESS: {
      return {
        ...state,
        addExpertData: action.addExpertData || {},
      };
    }
    case ADD_EXPERT_FAILED: {
      return {
        ...state,
      };
    }

    case ADD_IMAGE_REQUEST: {
      return {
        ...state,
      };
    }
    case ADD_IMAGE_SUCCESS: {
      return {
        ...state,
        addImage: action.addResourceImage || {},
      };
    }
    case ADD_IMAGE_FAILED: {
      return {
        ...state,
      };
    }

    case DELETE_RESOURCE_REQUEST: {
      return {
        ...state,
      };
    }
    case DELETE_RESOURCE_SUCCESS: {
      return {
        ...state,
        deleteResourceData: action.deleteResourceData || {},
      };
    }
    case DELETE_RESOURCE_FAILED: {
      return {
        ...state,
      };
    }

    case EDIT_RESOURCE_REQUEST: {
      return {
        ...state,
      };
    }
    case EDIT_RESOURCE_SUCCESS: {
      return {
        ...state,
        editResourceData: action.editResourceData || {},
      };
    }
    case EDIT_RESOURCE_FAILED: {
      return {
        ...state,
      };
    }

    case SET_IMAGE: {
      return {
        ...state,
        saveImage: action.payload || "",
      };
    }

    case SET_RESOURCE_DATA: {
      return {
        ...state,
        saveResourceData: action.saveResourceData || {},
      };
    }

    default: {
      return state;
    }
  }
};

export default LoginAndNavigationReducer;
