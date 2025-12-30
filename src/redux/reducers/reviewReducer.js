import { REVIEW_ACTIONS } from "../actions/reviewActions";

const initialState = {
  reviews: [],
  review: null,
  reviewsByIsApproved: [],
  loading: false,
  error: null,
}

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case REVIEW_ACTIONS.LOADING_REVIEW:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case REVIEW_ACTIONS.GET_ALL_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
        loading: false,
        error: null,
      }
    case REVIEW_ACTIONS.GET_ALL_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case REVIEW_ACTIONS.DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: state.reviews.filter(review => review._id !== action.payload),
        loading: false,
        error: null,
      }
    case REVIEW_ACTIONS.DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case REVIEW_ACTIONS.UPDATE_REVIEW_SUCCESS:
      return {
        ...state,
        reviews: state.reviews.map(review => review._id === action.payload? action.payload : review),
        loading: false,
        error: null,
      }
    case REVIEW_ACTIONS.UPDATE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case REVIEW_ACTIONS.GET_REVIEW_BY_ID_SUCCESS:
      return {
        ...state,
        review: action.payload,
        loading: false,
        error: null,
      }
    case REVIEW_ACTIONS.GET_REVIEW_BY_ID_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case REVIEW_ACTIONS.GET_REVIEWS_BY_IS_APPROVED_SUCCESS:
      return {
        ...state,
        reviewsByIsApproved: action.payload,
        loading: false,
        error: null,
      }
    case REVIEW_ACTIONS.GET_REVIEWS_BY_IS_APPROVED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case REVIEW_ACTIONS.DELETE_ALL_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: [],
        loading: false,
        error: null,
      }
    case REVIEW_ACTIONS.DELETE_ALL_REVIEWS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
}

export default reviewReducer;