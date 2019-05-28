// App.js is going to interact with our server

// Libraries that we imported
import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import './App.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// Hashrouter allows us to do routing for website
import { Switch, Route, NavLink, HashRouter } from "react-router-dom"; 

// Demo, Login, and Home are all pages for our website
import Demo from "./Demo";
import Login from "./Login";
import Home from "./Home";


// App acts as the main page for intial rendering -- all pages and stages are called 
// from App function
class App extends Component {
  render(){
      return (
      <div>
        <div class="head">
          <h2 class="alt-text">Citing Insights</h2>
          <p class="alt-text">Welcome to Citing Insights Portal</p>

          {/*Hashrouter! Defining our Router (React-Dom)*/}
          <HashRouter>
          {/* Navbar (Reactstrap) -- Defining a Navagation bar for our website*/}
            <Navbar color="primary" primary expand="md">
                <NavbarBrand>Citing Insights</NavbarBrand>

                {/* NavItem (Reactstrap) -- item in our navation bar*/}
                <NavItem>
                  {/* This links our Login navagation item to our Login page*/}
                  <NavLink to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/main">Main Menu</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/upload">Upload</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/test">More Tests</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/analyze">Analyze</NavLink>
                </NavItem>
            </Navbar>

            {/*This tells us what compenent to load after going to login, home, demo etc.*/}
            <div id="id01" class="pop content">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/analyze" component={Demo}/>   
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