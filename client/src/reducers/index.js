import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";

//This is standard for Redux. define your reducers
//then combine them using this function
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});