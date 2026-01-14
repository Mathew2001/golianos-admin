import { USER_ACTIONS } from "../actions/userActions";

const initialState = {
  userInfo: null,
  accessToken: null,
  loading: false,
  error: null,
  initialized: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.LOADING_USER:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case USER_ACTIONS.USER_LOGOUT:
      return {
        ...state,
        userInfo: null,
        accessToken: null,
        loading: false,
        error: null,
        initialized: true, // ✅ app is initialized even after logout
      };

    case USER_ACTIONS.LOGIN_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload.user,
        accessToken: action.payload.accessToken,
        loading: false,
        error: null,
        initialized: true, // ✅
      };

    case USER_ACTIONS.LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        initialized: true, // ✅
      };

    // ✅ NEW: refresh success
    case USER_ACTIONS.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        // keep userInfo if you already have it
        // OR if refresh returns user, set it here
        userInfo: action.payload.user || state.userInfo,
        loading: false,
        error: null,
        initialized: true, // ✅ critical
      };

    // ✅ NEW: refresh fail
    case USER_ACTIONS.REFRESH_TOKEN_FAIL:
      return {
        ...state,
        userInfo: null,
        accessToken: null,
        loading: false,
        error: action.payload,
        initialized: true, // ✅ critical
      };

    case USER_ACTIONS.UPDATE_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload.user,
        accessToken: action.payload.accessToken,
        loading: false,
        error: null,
      };

    case USER_ACTIONS.UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
