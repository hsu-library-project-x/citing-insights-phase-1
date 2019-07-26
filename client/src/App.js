// App.js is going to interact with our server

// Libraries that we imported
//import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import './css/App.css';
import { Navbar, NavbarBrand, NavItem, NavbarToggler } from 'reactstrap';

// Hashrouter allows us to do routing for website
import { Switch, Route, NavLink, HashRouter } from "react-router-dom"; 

// Analyze, Login, and Home are all pages for our website
import Analyze from "./Analyze.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Tasks from "./Tasks.jsx";
import AccountSettings from "./AccountSettings.jsx";
import Error from "./Error.jsx";

//import logo
import logo from './images/logoProtoSm.png';

// App acts as the main page for intial rendering -- all pages and stages are called 
// from App function
class App extends Component {
  constructor(props){
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state={collapsed:true};
  }
  toggleNavbar(){
    this.setState({
      collapsed:!this.state.collapsed
    });
  }
  render(){
      return (
      <div>
        <div class="head">
          {/* <h2 class="alt-text">Citing Insights</h2>
          <p class="alt-text">Welcome to Citing Insights Portal</p> */}
          {/*Hashrouter! Defining our Router (React-Dom)*/}
          <HashRouter>
          {/* Navbar (Reactstrap) -- Defining a Navagation bar for our website*/}
            <Navbar primary expand="md">
              <NavbarBrand><img id="navIcon" src={logo} /></NavbarBrand>
              {/* NavItem (Reactstrap) -- item in our navation bar*/}
              <NavbarToggler onClick={this.toggleNavbar} className='toggleBar' />
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
              <NavItem>
                <NavLink to="/error">Error</NavLink>
              </NavItem>
            </Navbar>
            {/*This tells us what compenent to load after going to login, home, demo etc.*/}
            <div id="id01" class="pop content">
              <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/home" component={Home}/>
                <Route path="/analyze" component={Analyze}/>
                <Route path="/tasks" component={Tasks}/>
                <Route path="/accountSettings" component={AccountSettings} />
                <Route path="/error" component={Error} />
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
