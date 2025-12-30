import { BUSINESS_ACTIONS } from "../actions/businessActions";

const initialState = {
  business: null,
  businessByUserId: null,
  loading: false,
  error: null,
}

const businessReducer = (state = initialState, action) => {
  switch (action.type) {
    case BUSINESS_ACTIONS.LOADING_BUSINESS:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case BUSINESS_ACTIONS.UPDATE_BUSINESS_SUCCESS:
      return {
        ...state,
        business: action.payload,
        loading: false,
        error: null,
      }
    case BUSINESS_ACTIONS.UPDATE_BUSINESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case BUSINESS_ACTIONS.GET_BUSINESS_BY_ID_SUCCESS:
      return {
        ...state,
        business: action.payload,
        loading: false,
        error: null,
      }
    case BUSINESS_ACTIONS.GET_BUSINESS_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case BUSINESS_ACTIONS.GET_BUSINESS_BY_USER_ID_SUCCESS:
      return {
        ...state,
        businessByUserId: action.payload,
        loading: false,
        error: null,
      }
    case BUSINESS_ACTIONS.GET_BUSINESS_BY_USER_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export default businessReducer;