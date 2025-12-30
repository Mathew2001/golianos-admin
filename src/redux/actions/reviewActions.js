import reviewServices from "../sevices/reviewServices";

export const REVIEW_ACTIONS = {
  LOADING_REVIEW: "LOADING_REVIEW",
  GET_ALL_REVIEWS_SUCCESS: "GET_ALL_REVIEWS_SUCCESS",
  GET_ALL_REVIEWS_FAIL: "GET_ALL_REVIEWS_FAIL",
  DELETE_REVIEW_SUCCESS: "DELETE_REVIEW_SUCCESS",
  DELETE_REVIEW_FAIL: "DELETE_REVIEW_FAIL",
  UPDATE_REVIEW_SUCCESS: "UPDATE_REVIEW_SUCCESS",
  UPDATE_REVIEW_FAIL: "UPDATE_REVIEW_FAIL",
  GET_REVIEW_BY_ID_SUCCESS: "GET_REVIEW_BY_ID_SUCCESS",
  GET_REVIEW_BY_ID_FAIL: "GET_REVIEW_BY_ID_FAIL",
  GET_REVIEWS_BY_IS_APPROVED_SUCCESS: "GET_REVIEWS_BY_IS_APPROVED_SUCCESS",
  GET_REVIEWS_BY_IS_APPROVED_FAIL: "GET_REVIEWS_BY_IS_APPROVED_FAIL",
  DELETE_ALL_REVIEWS_SUCCESS: "DELETE_ALL_REVIEWS_SUCCESS",
  DELETE_ALL_REVIEWS_FAIL: "DELETE_ALL_REVIEWS_FAIL",
}

export const getAllReviews = () => async (dispatch) => {
  dispatch({ type: REVIEW_ACTIONS.LOADING_REVIEW });
  try {
    const res = await reviewServices.getAllReviews();
    if(res){
      dispatch({ type: REVIEW_ACTIONS.GET_ALL_REVIEWS_SUCCESS, payload: res });
    }
  } catch (error) {
    dispatch({ type: REVIEW_ACTIONS.GET_ALL_REVIEWS_FAIL, payload: error?.response?.data?.message || "get all reviews failed" });
  }
}

export const deleteReview = (id) => async (dispatch) => {
  dispatch({ type: REVIEW_ACTIONS.LOADING_REVIEW });
  try {
    const res = await reviewServices.deleteReview(id);
    if(res){
      dispatch({ type: REVIEW_ACTIONS.DELETE_REVIEW_SUCCESS, payload: res });
      window.location.reload();
    }
  } catch (error) {
    dispatch({ type: REVIEW_ACTIONS.DELETE_REVIEW_FAIL, payload: error?.response?.data?.message || "delete review failed" });
  }
}

export const updateReview = (id, body) => async (dispatch) => {
  dispatch({ type: REVIEW_ACTIONS.LOADING_REVIEW });
  try {
    const res = await reviewServices.updateReview(id, body);
    if(res){
      dispatch({ type: REVIEW_ACTIONS.UPDATE_REVIEW_SUCCESS, payload: res });
    }
  } catch (error) {
    dispatch({ type: REVIEW_ACTIONS.UPDATE_REVIEW_FAIL, payload: error?.response?.data?.message || "update review failed" });
  }
}

export const getReviewById = (id) => async (dispatch) => {
  dispatch({ type: REVIEW_ACTIONS.LOADING_REVIEW });
  try {
    const res = await reviewServices.getReviewById(id);
    if(res){
      dispatch({ type: REVIEW_ACTIONS.GET_REVIEW_BY_ID_SUCCESS, payload: res });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: REVIEW_ACTIONS.GET_REVIEW_BY_ID_FAIL, payload: error?.response?.data?.message || "get review by id failed" });
  }
}

export const getReviewsByIsApproved = () => async (dispatch) => {
  dispatch({ type: REVIEW_ACTIONS.LOADING_REVIEW });
  try {
    const res = await reviewServices.getReviewsByIsApproved();
    if(res){
    dispatch({ type: REVIEW_ACTIONS.GET_REVIEWS_BY_IS_APPROVED_SUCCESS, payload: res });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: REVIEW_ACTIONS.GET_REVIEWS_BY_IS_APPROVED_FAIL, payload: error?.response?.data?.message || "get reviews by is approved failed" });
  }
}

export const deleteAllReviews = () => async (dispatch) => {
  dispatch({ type: REVIEW_ACTIONS.LOADING_REVIEW });
  try {
    const res = await reviewServices.deleteAllReviews();
    if(res){
      dispatch({ type: REVIEW_ACTIONS.DELETE_ALL_REVIEWS_SUCCESS, payload: res });
      window.location.reload();
    }
  } catch (error) {
    dispatch({ type: REVIEW_ACTIONS.DELETE_ALL_REVIEWS_FAIL, payload: error?.response?.data?.message || "delete all reviews failed" });
  }
}