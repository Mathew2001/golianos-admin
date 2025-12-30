import businessServices from "../sevices/businessServices";

export const BUSINESS_ACTIONS = {
  LOADING_BUSINESS: "LOADING_BUSINESS",
  UPDATE_BUSINESS_SUCCESS: "UPDATE_BUSINESS_SUCCESS",
  UPDATE_BUSINESS_FAIL: "UPDATE_BUSINESS_FAIL",
  GET_BUSINESS_BY_USER_ID_SUCCESS: "GET_BUSINESS_BY_USER_ID_SUCCESS",
  GET_BUSINESS_BY_USER_ID_FAIL: "GET_BUSINESS_BY_USER_ID_FAIL",
  GET_BUSINESS_BY_ID_SUCCESS: "GET_BUSINESS_BY_ID_SUCCESS",
  GET_BUSINESS_BY_ID_FAIL: "GET_BUSINESS_BY_ID_FAIL",
}

export const updateBusiness = (id, body) => async (dispatch) => {
  dispatch({ type: BUSINESS_ACTIONS.LOADING_BUSINESS });
  try {
    const res = await businessServices.updateBusiness(id, body);
    if(res){
      dispatch({ type: BUSINESS_ACTIONS.UPDATE_BUSINESS_SUCCESS, payload: res });
    }
  } catch (error) {
    dispatch({ type: BUSINESS_ACTIONS.UPDATE_BUSINESS_FAIL, payload: error?.response?.data?.message || "update business failed" });
  }
}

export const getBusinessById = (id) => async (dispatch) => {
  dispatch({ type: BUSINESS_ACTIONS.LOADING_BUSINESS });
  try {
    const res = await businessServices.getBusinessById(id);
    if(res){
      dispatch({ type: BUSINESS_ACTIONS.GET_BUSINESS_BY_ID_SUCCESS, payload: res });
    }
  } catch (error) {
    dispatch({ type: BUSINESS_ACTIONS.GET_BUSINESS_BY_ID_FAIL, payload: error?.response?.data?.message || "get business by id failed" });
  }
}

export const getBusinessByUserId = (userId) => async (dispatch) => {
  dispatch({ type: BUSINESS_ACTIONS.LOADING_BUSINESS });
  try {
    const res = await businessServices.getBusinessByUserId(userId);
    
    if(res){
      dispatch({ type: BUSINESS_ACTIONS.GET_BUSINESS_BY_USER_ID_SUCCESS, payload: res });
    }
  } catch (error) {
    dispatch({ type: BUSINESS_ACTIONS.GET_BUSINESS_BY_USER_ID_FAIL, payload: error?.response?.data?.message || "get business by user id failed" });
  }
}