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
  ADD_RESOURCE_IMAGE_REQUEST,
  ADD_RESOURCE_IMAGE_FAILED,
  ADD_RESOURCE_IMAGE_SUCCESS,
} = require("./types");

const initialState = {
  loginData: {},
  usersData: {},
  userStatus: {},
  oneUserData: {},
  addResourceData: {},
  resourcesData: {},
  oneResourceData: {},
  addResourceImage: {},
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

    case ADD_RESOURCE_IMAGE_REQUEST: {
      return {
        ...state,
      };
    }
    case ADD_RESOURCE_IMAGE_SUCCESS: {
      return {
        ...state,
        addResourceImage: action.addResourceImage || {},
      };
    }
    case ADD_RESOURCE_IMAGE_FAILED: {
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};

export default LoginAndNavigationReducer;
