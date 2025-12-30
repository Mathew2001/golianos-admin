import { combineReducers } from "redux";
import reviewReducer from "./reviewReducer";
import contactUsReducer from "./contactReducers";
import userReducer from "./userReducers";
import businessReducer from "./businessReducers";
import pageReducer from "./PageReducer";

const rootReducer = combineReducers({
  reviewReducer: reviewReducer,
  contactUsReducer: contactUsReducer,
  userReducer: userReducer,
  businessReducer: businessReducer,
  pageReducer: pageReducer,
});

export default rootReducer;

