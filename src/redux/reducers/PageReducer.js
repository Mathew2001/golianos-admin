import { 
  GET_ALL_PAGES_SUCCESS,
  GET_ALL_PAGES_FAIL,
  GET_PAGE_BY_SLUG_SUCCESS,
  GET_PAGE_BY_SLUG_FAIL,
  GET_PAGE_BY_ID_SUCCESS,
  GET_PAGE_BY_ID_FAIL,
  GET_ALL_PAGES_BY_BUSINESS_ID_SUCCESS,
  GET_ALL_PAGES_BY_BUSINESS_ID_FAIL,
  CREATE_PAGE_SUCCESS,
  CREATE_PAGE_FAIL,
  UPDATE_PAGE_SUCCESS,
  UPDATE_PAGE_FAIL,
  DELETE_PAGE_SUCCESS,
  DELETE_PAGE_FAIL,
} from "../actions/PageActions";

const initialState = {
  pages: [],
  pageBySlug: null,
  pageById: null,
  pagesByBusinessId: [],
  loading: false,
  error: null,
};

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PAGES_SUCCESS:
      return { ...state, pages: action.payload };
    case GET_ALL_PAGES_FAIL:
      return { ...state, error: action.payload };
    case GET_PAGE_BY_SLUG_SUCCESS:
      return { ...state, pageBySlug: action.payload };
    case GET_PAGE_BY_SLUG_FAIL:
      return { ...state, error: action.payload };
    case GET_PAGE_BY_ID_SUCCESS:
      return { ...state, pageById: action.payload };
    case GET_PAGE_BY_ID_FAIL:
      return { ...state, error: action.payload };
    case GET_ALL_PAGES_BY_BUSINESS_ID_SUCCESS:
      return { ...state, pagesByBusinessId: action.payload };
    case GET_ALL_PAGES_BY_BUSINESS_ID_FAIL:
      return { ...state, error: action.payload };
    case CREATE_PAGE_SUCCESS:
      return { ...state, pages: [...state.pages, action.payload] };
    case CREATE_PAGE_FAIL:
      return { ...state, error: action.payload };
    case UPDATE_PAGE_SUCCESS:
      return { ...state, pages: state.pages.map((page) => page._id === action.payload._id ? action.payload : page) };
    case UPDATE_PAGE_FAIL:
      return { ...state, error: action.payload };
    case DELETE_PAGE_SUCCESS:
      return { ...state, pages: state.pages.filter((page) => page._id !== action.payload) };
    case DELETE_PAGE_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export default pageReducer;