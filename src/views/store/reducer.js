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
  SET_TOKEN,
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

  FETCH_EXPERT_USER_REQUEST,
  FETCH_EXPERT_USER_SUCCESS,
  FETCH_EXPERT_USER_FAILED,
} = require("./types");

const initialState = {
  loginData: {},
  usersData: {},
  userStatus: {},
  oneUserData: {},
  oneExpertData: {},
  addResourceData: {},
  addExpertData: {},
  resourcesData: {},
  expertsData: {},
  oneResourceData: {},
  addImage: {},
  saveImage: "",
  saveToken: "",
  deleteResourceData: {},
  deleteExpertData: {},
  editResourceData: {},
  editExpertData: {},
  saveResourceData: {},
  serviceData: {},
  userExpert: [],
  userResource: [],
  expertUser: [],
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

    case FETCH_EXPERT_SERVICE_REQUEST: {
      return {
        ...state,
      };
    }
    case FETCH_EXPERT_SERVICE_SUCCESS: {
      return {
        ...state,
        serviceData: action.serviceData || {},
      };
    }
    case FETCH_EXPERT_SERVICE_FAILED: {
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

    case FETCH_EXPERTS_REQUEST: {
      return {
        ...state,
      };
    }
    case FETCH_EXPERTS_SUCCESS: {
      return {
        ...state,
        expertsData: action.expertsData || {},
      };
    }
    case FETCH_EXPERTS_FAILED: {
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

    case FETCH_ONE_EXPERT_REQUEST: {
      return {
        ...state,
      };
    }
    case FETCH_ONE_EXPERT_SUCCESS: {
      return {
        ...state,
        oneExpertData: action.oneExpertData || {},
      };
    }
    case FETCH_ONE_EXPERT_FAILED: {
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

    case DELETE_EXPERT_REQUEST: {
      return {
        ...state,
      };
    }
    case DELETE_EXPERT_SUCCESS: {
      return {
        ...state,
        deleteExpertData: action.deleteExpertData || {},
      };
    }
    case DELETE_EXPERT_FAILED: {
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

    case EDIT_EXPERT_REQUEST: {
      return {
        ...state,
      };
    }
    case EDIT_EXPERT_SUCCESS: {
      return {
        ...state,
        editExpertData: action.editExpertData || {},
      };
    }
    case EDIT_EXPERT_FAILED: {
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
    case SET_TOKEN: {
      return {
        ...state,
        saveToken: action.payload || "",
      };
    }

    case SET_RESOURCE_DATA: {
      return {
        ...state,
        saveResourceData: action.saveResourceData || {},
      };
    }

    case FETCH_USER_EXPERT_REQUEST: {
      return {
        ...state,
      };
    }
    case FETCH_USER_EXPERT_SUCCESS: {
      return {
        ...state,
        userExpert: action.userExpert || [],
      };
    }
    case FETCH_USER_EXPERT_FAILED: {
      return {
        ...state,
      };
    }

    case FETCH_USER_RESOURCE_REQUEST: {
      return {
        ...state,
      };
    }
    case FETCH_USER_RESOURCE_SUCCESS: {
      return {
        ...state,
        userResource: action.userResource || [],
      };
    }
    case FETCH_USER_RESOURCE_FAILED: {
      return {
        ...state,
      };
    }

    case FETCH_EXPERT_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case FETCH_EXPERT_USER_SUCCESS: {
      return {
        ...state,
        expertUser: action.expertUser || [],
      };
    }
    case FETCH_EXPERT_USER_FAILED: {
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
