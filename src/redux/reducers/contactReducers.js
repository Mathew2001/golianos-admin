import { CONTACT_US_ACTIONS } from "../actions/contactUsActions";

const initialState = {
  contactUs: [],
  contactUsById: null,
  loading: false,
  error: null,
}

const contactUsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACT_US_ACTIONS.CONTACT_US_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
        }
    case CONTACT_US_ACTIONS.UPDATE_CONTACT_US_SUCCESS:
      return {
        ...state,
        contactUs: state.contactUs.map(contactUs => contactUs._id === action.payload? action.payload : contactUs),
        loading: false,
        error: null,
      }
    case CONTACT_US_ACTIONS.UPDATE_CONTACT_US_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case CONTACT_US_ACTIONS.GET_CONTACT_US_BY_ID_SUCCESS:
      return {
        ...state,
        contactUsById: action.payload,
        loading: false,
        error: null,
      }
    case CONTACT_US_ACTIONS.GET_CONTACT_US_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case CONTACT_US_ACTIONS.GET_ALL_CONTACT_US_SUCCESS:
      return {
        ...state,
        contactUs: action.payload,
        loading: false,
        error: null,
      }
    case CONTACT_US_ACTIONS.GET_ALL_CONTACT_US_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case CONTACT_US_ACTIONS.DELETE_CONTACT_US_SUCCESS:
      return {
        ...state,
        contactUs: state.contactUs.filter((contactUs) => contactUs.id !== action.payload),
        loading: false,
        error: null,
      }
    case CONTACT_US_ACTIONS.DELETE_CONTACT_US_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case CONTACT_US_ACTIONS.DELETE_ALL_CONTACT_US_SUCCESS:
      return {
        ...state,
        contactUs: [],
        loading: false,
        error: null,
      }
    case CONTACT_US_ACTIONS.DELETE_ALL_CONTACT_US_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export default contactUsReducer;