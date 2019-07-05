//Import our action types
import { SET_CURRENT_USER, USER_LOADING } from "../actions/types";

const isEmpty = require("is-empty");

//Define our initial state
const initialState = {
    isAuthenticated: false,
    user: {},
    loading: false
};

//This is a reducer, a function that defines how state will 
//change in response to an action
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}