const {
  LOGIN_BY_ADMIN_REQUEST,
  LOGIN_BY_ADMIN_FAILED,
  LOGIN_BY_ADMIN_SUCCESS,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
} = require("./types");

const initialState = {
  loginData: {},
  usersData: {},
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

    default: {
      return state;
    }
  }
};

export default LoginAndNavigationReducer;
