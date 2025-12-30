import userServices from "../sevices/userServices";
import { COOKIE_KEYS } from "../../const";
import Cookies from "js-cookie";

export const USER_ACTIONS = {
  LOADING_USER: "LOADING_USER",
  USER_LOGOUT: "USER_LOGOUT",
  LOGIN_USER_SUCCESS: "LOGIN_USER_SUCCESS",
  LOGIN_USER_FAIL: "LOGIN_USER_FAIL",
  GET_USER_BY_ID_SUCCESS: "GET_USER_BY_ID_SUCCESS",
  GET_USER_BY_ID_FAIL: "GET_USER_BY_ID_FAIL", 
  UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAIL: "UPDATE_USER_FAIL",
}

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: USER_ACTIONS.LOADING_USER });
  try {
    const res = await userServices.loginUser({ email, password });
    if(res){
      Cookies.set(COOKIE_KEYS.USER_INFO, JSON.stringify(res, {
        expires: 0.5,
      }));
      dispatch({ type: USER_ACTIONS.LOGIN_USER_SUCCESS, payload: res });
    }
  } catch (error) {
    dispatch({ type: USER_ACTIONS.LOGIN_USER_FAIL, payload: error?.response?.data?.message || "login user failed" });
  }
}

export const getUserById = (id) => async (dispatch) => {
  dispatch({ type: USER_ACTIONS.LOADING_USER });
  try {
    const res = await userServices.getUserById(id);
    if(res){
      dispatch({ type: USER_ACTIONS.GET_USER_BY_ID_SUCCESS, payload: res });
    }
  } catch (error) {
    dispatch({ type: USER_ACTIONS.GET_USER_BY_ID_FAIL, payload: error?.response?.data?.message || "get user by id failed" });
  }
}
export const updateUser = (id, body) => async (dispatch) => {
  dispatch({ type: USER_ACTIONS.LOADING_USER });
  try {
    const res = await userServices.updateUser(id, body);
    if(res){
      dispatch({ type: USER_ACTIONS.UPDATE_USER_SUCCESS, payload: res });
    }
  } catch (error) {
    dispatch({ type: USER_ACTIONS.UPDATE_USER_FAIL, payload: error?.response?.data?.message || "update user failed" });
  }
}

export const logoutUser = () => (dispatch) => {
    Cookies.remove(COOKIE_KEYS.USER_INFO);
    dispatch({ type: USER_ACTIONS.USER_LOGOUT });
}
