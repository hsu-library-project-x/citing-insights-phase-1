import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import './App.css';
import { Jumbotron, Button, Badge } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Route, NavLink, HashRouter } from "react-router-dom";
import Demo from "./Demo";
import Login from "./Login";

class App extends Component {
  render(){
      return (
      <div>
        <div class="head">
          <h2 class="alt-text">Citing Insights Login Form</h2>
          <p class="alt-text">Welcome to Citing Insights Portal</p>
          <HashRouter>
            <Navbar color="light" light expand="md">
              
                <NavbarBrand>Citing Insights</NavbarBrand>
                <NavItem>
                  <NavLink to="/login">Login</NavLink>
                </NavItem>
                <NavItem><NavLink to="/">Main Menu</NavLink></NavItem>
                <NavItem>
                  <NavLink>Upload</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>More Tests</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/demo">Demo</NavLink>
                </NavItem>
              
            </Navbar>
            <div id="id01" class="pop content">
              <Route path="/login" component={Login}/>
              <Route path="/demo" component={Demo}/>
            </div>
          </HashRouter>
        </div>
      </div>
    );
  }
  
}

export default App;
