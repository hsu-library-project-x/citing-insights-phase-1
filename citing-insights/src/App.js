// Libraries that we imported

import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import './App.css';
import { Jumbotron, Button, Badge } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// Hashrouter allows us to do routing for website
import { Route, NavLink, HashRouter } from "react-router-dom"; 

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
          <h2 class="alt-text">Citing Insights Login Form</h2>
          <p class="alt-text">Welcome to Citing Insights Portal</p>

          //Hashrouter! Defining our Router (Reactstrap)
          <HashRouter>

          // Navbar (Reactstrap) -- Defining a Navagation bar for our website
            <Navbar color="light" light expand="md">
                <NavbarBrand>Citing Insights</NavbarBrand>

                // NavItem (Reactstrap) -- item in our navation bar
                <NavItem>
                  // This links our Login navagation item to our Login page
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
                  <NavLink to="/demo">Demo</NavLink>
                </NavItem>
            </Navbar>

            //This tells us what compenent to load after going to login, home, demo etc.
            <div id="id01" class="pop content">
              <Route path="/main" component={Home}/>
              <Route path="/login" component={Login}/>
              <Route path="/demo" component={Demo}/>
            </div>

          //End our router
          </HashRouter>
        </div>
      </div>
    );
  }
  
}


export default App;
