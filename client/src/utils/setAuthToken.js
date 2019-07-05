import axios from "axios";

//This sets the header depending on whether or not a user is
//logged in.
const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common["Authorization"] = token;
    }else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;