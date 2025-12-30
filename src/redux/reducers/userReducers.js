import { USER_ACTIONS } from "../actions/userActions";
import Cookies from "js-cookie";
import { COOKIE_KEYS } from "../../const";

const userInfo = Cookies.get(COOKIE_KEYS.USER_INFO) ? JSON.parse(Cookies.get(COOKIE_KEYS.USER_INFO)) : null;
const initialState = {
  userInfo: userInfo,
  loading: false,
  error: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ACTIONS.LOADING_USER:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case USER_ACTIONS.USER_LOGOUT:
      return {
        ...state,
        userInfo: null,
        loading: false,
        error: null,
      }
    case USER_ACTIONS.LOGIN_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: null,
      }
    case USER_ACTIONS.LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case USER_ACTIONS.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: null,
      }
    case USER_ACTIONS.GET_USER_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case USER_ACTIONS.UPDATE_USER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        loading: false,
        error: null,
      }
    case USER_ACTIONS.UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export default userReducer;