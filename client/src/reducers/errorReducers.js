//Get our action
import { GET_ERRORS } from "../actions/types";

//Define the initial state
const initialState = {};

//Reducer (decide what to do with state based off an action)
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}