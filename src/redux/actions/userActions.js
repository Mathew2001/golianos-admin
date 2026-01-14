import userServices from "../services/userServices";
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
  REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS",
  REFRESH_TOKEN_FAIL: "REFRESH_TOKEN_FAIL",
}

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: USER_ACTIONS.LOADING_USER });
  try {
    const res = await userServices.loginUser({ email, password });
    if(res){
      localStorage.setItem("accessToken", res.accessToken);
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

export const logoutUser = () => async (dispatch) => {
  try {
    const res = await userServices.logoutUser();
    if(res){
      localStorage.removeItem("accessToken");
      dispatch({ type: USER_ACTIONS.USER_LOGOUT });
    }
  } catch (error) {
    dispatch({ type: USER_ACTIONS.USER_LOGOUT_FAIL, payload: error?.response?.data?.message || "logout user failed" });
  }
}

export const refreshToken = () => async (dispatch) => {
  dispatch({ type: USER_ACTIONS.LOADING_USER });
  try {
    const res = await userServices.refreshToken();

    const accessToken = res?.accessToken || res?.token;
    const user = res?.user;
    if (!accessToken) throw new Error("No access token returned");

    localStorage.setItem("accessToken", accessToken);

    dispatch({
      type: USER_ACTIONS.REFRESH_TOKEN_SUCCESS,
      payload: { accessToken, user: user }, // user optional
    });
  } catch (error) {
    localStorage.removeItem("accessToken");
    dispatch({
      type: USER_ACTIONS.REFRESH_TOKEN_FAIL,
      payload: error?.response?.data?.message || "refresh token failed",
    });
  }
};


