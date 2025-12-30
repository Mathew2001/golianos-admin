import contactUsServices from "../sevices/contactUsServices";

export const CONTACT_US_ACTIONS = {
  CONTACT_US_LOADING: "CONTACT_US_LOADING",
  GET_CONTACT_US_BY_ID_SUCCESS: "GET_CONTACT_US_BY_ID_SUCCESS",
  GET_CONTACT_US_BY_ID_FAIL: "GET_CONTACT_US_BY_ID_FAIL",
  GET_ALL_CONTACT_US_SUCCESS: "GET_ALL_CONTACT_US_SUCCESS",
  GET_ALL_CONTACT_US_FAIL: "GET_ALL_CONTACT_US_FAIL",
  DELETE_CONTACT_US_SUCCESS: "DELETE_CONTACT_US_SUCCESS",
  DELETE_CONTACT_US_FAIL: "DELETE_CONTACT_US_FAIL",
  UPDATE_CONTACT_US_SUCCESS: "UPDATE_CONTACT_US_SUCCESS",
  UPDATE_CONTACT_US_FAIL: "UPDATE_CONTACT_US_FAIL",
  DELETE_ALL_CONTACT_US_SUCCESS: "DELETE_ALL_CONTACT_US_SUCCESS",
  DELETE_ALL_CONTACT_US_FAIL: "DELETE_ALL_CONTACT_US_FAIL",
}

export const getContactUsById = (id) => async (dispatch) => {
  dispatch({ type: CONTACT_US_ACTIONS.CONTACT_US_LOADING})
  try {
    const res = await contactUsServices.getContactUsById(id);
    if(res){
      dispatch({ type: CONTACT_US_ACTIONS.GET_CONTACT_US_BY_ID_SUCCESS, payload: res });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: CONTACT_US_ACTIONS.GET_CONTACT_US_BY_ID_FAIL, payload: error?.response?.data?.message || "get contact us by id failed" });
  }
}

export const updateContactUs = (id, body) => async (dispatch) => {
  dispatch({ type: CONTACT_US_ACTIONS.CONTACT_US_LOADING})
  try {
    const res = await contactUsServices.updateContactUs(id, body);
    if(res){
      dispatch({ type: CONTACT_US_ACTIONS.UPDATE_CONTACT_US_SUCCESS, payload: res });
      window.location.reload();
    }
  } catch (error) {
    dispatch({ type: CONTACT_US_ACTIONS.UPDATE_CONTACT_US_FAIL, payload: error?.response?.data?.message || "update contact us failed" });
  }
}
export const getAllContactUs = () => async (dispatch) => {
  dispatch({ type: CONTACT_US_ACTIONS.CONTACT_US_LOADING})
  try {
    const res = await contactUsServices.getAllContactUs();
    if(res){
      dispatch({ type: CONTACT_US_ACTIONS.GET_ALL_CONTACT_US_SUCCESS, payload: res });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: CONTACT_US_ACTIONS.GET_ALL_CONTACT_US_FAIL, payload: error?.response?.data?.message || "get all contact us failed" });
  }
}

export const deleteContactUs = (id) => async (dispatch) => {
  dispatch({ type: CONTACT_US_ACTIONS.CONTACT_US_LOADING})
  try {
    const res = await contactUsServices.deleteContactUs(id);
    if(res){
      dispatch({ type: CONTACT_US_ACTIONS.DELETE_CONTACT_US_SUCCESS, payload: res });
    }
    window.location.reload();
  } catch (error) {
    console.log(error);
    dispatch({ type: CONTACT_US_ACTIONS.DELETE_CONTACT_US_FAIL, payload: error?.response?.data?.message || "delete contact us failed" });
  }
}

export const deleteAllContactUs = () => async (dispatch) => {
  dispatch({ type: CONTACT_US_ACTIONS.CONTACT_US_LOADING})
  try {
    const res = await contactUsServices.deleteAllContactUs();
    if(res){
      dispatch({ type: CONTACT_US_ACTIONS.DELETE_ALL_CONTACT_US_SUCCESS, payload: res });
      window.location.reload();
    }
  } catch (error) {
    dispatch({ type: CONTACT_US_ACTIONS.DELETE_ALL_CONTACT_US_FAIL, payload: error?.response?.data?.message || "delete all contact us failed" });
  }
}