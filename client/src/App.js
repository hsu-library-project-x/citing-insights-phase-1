// App.js is going to interact with our server

// Libraries that we imported
//import ReactDOM from 'react-dom';
import React, { Component } from 'react';

// Hashrouter allows us to do routing for website
import { Switch, Route, HashRouter} from "react-router-dom";

// Analyze, Login, and Home are all pages for our website
import Analyze from "./Analyze.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Tasks from "./Tasks.jsx";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import Navibar from './Navibar.jsx';
//import Error from "./Error.jsx";

import "./App.css";



// App acts as the main page for intial rendering -- all pages and stages are called 
// from App function

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      token: ""
    };
    this.passInfoLogin = this.passInfoLogin.bind(this);
    this.passInfoLogout = this.passInfoLogout.bind(this);
  }

  passInfoLogin(isAuthenticated, token, user) {
    this.setState({
      isAuthenticated: isAuthenticated,
      user: user,
      token: token
    });
    //Persist our user into localStorage(right now its the whole object, for production just need token)
    localStorage.setItem("user", JSON.stringify(this.state))
  };

  passInfoLogout() {
    this.setState({
      isAuthenticated: false,
      user: null,
      token: ""
    });
    localStorage.clear();
  };

  componentDidMount() {
    const persistedState = localStorage.getItem("user");
    //Test to see if user object is valid
    if (persistedState) {
      this.setState(JSON.parse(persistedState));    
    }
  }



  render() {
    return (
      <div>
        <div class="head">
          {/* <h2 class="alt-text">Citing Insights</h2>
          <p class="alt-text">Welcome to Citing Insights Portal</p> */}
          {/*Hashrouter! Defining our Router (React-Dom)*/}
          <HashRouter>
            <Navibar
              isAuthenticated={this.state.isAuthenticated}
              passInfoLogout={this.passInfoLogout}
              user={this.state.user}
            />

            {/*This tells us what compenent to loaauthd after going to login, home, demo etc.*/}
            <div id="id01" class="pop content">
              <Switch>
                <Route
                  exact path="/login"
                  render={
                    (props) =>
                      <Login
                        passInfoLogin={this.passInfoLogin}
                        isAuthenticated={this.state.isAuthenticated}
                      />
                  }
                />
                <ProtectedRoute
                  exact path="/"
                  component={Tasks}
                  {...this.state}
                />
                <ProtectedRoute
                  path="/tasks"
                  component={Tasks}
                  {...this.state}
                />
                <ProtectedRoute
                  exact path="/home"
                  component={Home}
                  {...this.state}
                />
                <ProtectedRoute
                  path="/analyze"
                  component={Analyze}
                  {...this.state}
                />
              </Switch>
            </div>
            {/*End our router*/}
          </HashRouter>
        </div>
      </div>
    );
  }
}


export default App;
