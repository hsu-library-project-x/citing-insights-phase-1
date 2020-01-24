import React, { Component } from 'react';
import { Route, HashRouter} from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute.jsx";

import Login from "./Components/Login/Login.jsx";
import Tasks from "./Components/Tasks/Tasks.jsx";
import Navibar from './Components/Navibar/Navibar.jsx';
import BottomNavBar from "./Components/BottomNavBar/BottomNavBar";

import './App.css';
import SplashScreen from "./SplashScreen";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      user: null,
      token: "",
      configurations:null,
    };
    this.getConfigurations();

    this.getConfigurations = this.getConfigurations.bind(this);
    this.passInfoLogin = this.passInfoLogin.bind(this);
    this.passInfoLogout = this.passInfoLogout.bind(this);
  }

  getConfigurations = () => {
    fetch('/configurations/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response=>{
      if(response.status === 200 || response.ok){
        return response.json();
      }
      else{
        alert("Could not access database");
      }
    }).then(json => {
      console.log(json);
      this.setState({configurations: json[0]});
    });
  };

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
        if(this.state.configurations){
            return( <div className="head">
                <HashRouter>
                  <Navibar
                      isAuthenticated={this.state.isAuthenticated}
                      passInfoLogout={this.passInfoLogout}
                      user={this.state.user}
                      configurations={this.state.configurations}
                  />
                  <div id="id01" className="pop content">
                    <Route
                        exact path="/login"
                        render={
                          () =>
                              <Login
                                  passInfoLogin={this.passInfoLogin}
                                  isAuthenticated={this.state.isAuthenticated}
                                  configurations={this.state.configurations}
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
                  </div>
                  <BottomNavBar
                      isAuthenticated={this.state.isAuthenticated}
                      passInfoLogout={this.passInfoLogout}
                      user={this.state.user}
                      configurations={this.state.configurations}
                  />
                </HashRouter>
             </div> );
          }
            else return <SplashScreen />;

        }

}
export default App;
