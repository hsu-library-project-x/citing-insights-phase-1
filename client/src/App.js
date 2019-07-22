// App.js is going to interact with our server

// Libraries that we imported
//import ReactDOM from 'react-dom';
import React, { Component, PropTypes } from 'react';
import './css/App.css';
import { Navbar, NavbarBrand, NavItem } from 'reactstrap';

// Hashrouter allows us to do routing for website
import { Switch, Route, NavLink, HashRouter, Redirect} from "react-router-dom";

// Analyze, Login, and Home are all pages for our website
import Analyze from "./Analyze.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Tasks from "./Tasks.jsx";
import AccountSettings from "./AccountSettings.jsx";


class ProtectedRoute extends Component {
  constructor(props){
    super(props);
    this.state= {
      isAuthenticated: this.props.auth
    }
  }



  render() {
    const { component: Component, ...props } = this.props

    return (
      <Route 
        {...props} 
        render={props => (
          this.state.isAuthenticated ?
            <Component {...props} /> :
            <Redirect to='/login' />
        )} 
      />
    )
  }
}

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
    this.passInfo = this.passInfo.bind(this);
  }

  passInfo(isAuthenticated, token, user) {
    this.setState({
      isAuthenticated: isAuthenticated,
      user: user,
      token: token
    });
    console.log(this.state.isAuthenticated);
  };

  render() {
    return (
      <div>
        <div class="head">
          <h2 class="alt-text">Citing Insights</h2>
          <p class="alt-text">Welcome to Citing Insights Portal</p>
          {/*Hashrouter! Defining our Router (React-Dom)*/}
          <HashRouter>
            {/* Navbar (Reactstrap) -- Defining a Navagation bar for our website*/}
            <Navbar primary expand="md">
              <NavbarBrand>Citing Insights</NavbarBrand>
              {/* NavItem (Reactstrap) -- item in our navation bar*/}
              <NavItem>
                {/* This links our Login navagation item to our Login page*/}
                <NavLink to="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/home">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/tasks">Tasks</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/accountsettings">Settings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/analyze">Analyze</NavLink>
              </NavItem>
            </Navbar>
            {/*This tells us what compenent to load after going to login, home, demo etc.*/}
            <div id="id01" class="pop content">
              <Switch>
                <ProtectedRoute exact path="/" component={Tasks} auth={this.state.isAuthenticated}/>
                <Route
                  exact path="/login"
                  render={(props) => <Login passInfo={this.passInfo}/>}
                />
                <ProtectedRoute exact path="/home" component={Home} auth={this.state.isAuthenticated} />
                <ProtectedRoute path="/analyze" component={Analyze} auth={this.state.isAuthenticated}/>
                <ProtectedRoute path="/tasks" component={Tasks} auth={this.state.isAuthenticated}/>
                <ProtectedRoute path="/accountSettings" component={AccountSettings} auth={this.state.isAuthenticated}/>
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
