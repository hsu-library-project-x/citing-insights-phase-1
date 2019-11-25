import React, { Component } from 'react';
import { Switch, Route, HashRouter} from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

import Analyze from "./Components/Analyze/Analyze.jsx";
import Login from "./Components/Login/Login.jsx";
import Tasks from "./Components/Tasks/Tasks.jsx";

import Navibar from './Components/Navibar/Navibar.jsx';
import './App.css';

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
          <HashRouter>
            <Navibar
              isAuthenticated={this.state.isAuthenticated}
              passInfoLogout={this.passInfoLogout}
              user={this.state.user}
            />
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
                  path="/analyze"
                  component={Analyze}
                  {...this.state}
                />
              </Switch>
            </div>
          </HashRouter>
        </div>
      </div>
    );
  }
}


export default App;
