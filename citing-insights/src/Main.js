// Our Homepage for CitingInsights.net 

//Imprort Libraries
import React, {Component} from 'react';
import './App.css';
import { Jumbotron, Container, Row, Col, Button } from 'reactstrap';
import { Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { Switch, Route, NavLink, HashRouter, Router, Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Badge } from 'reactstrap'; 
import { ListGroup, ListGroupItem } from 'reactstrap';
import Classes from "./Classes";

// Class to render our homepage
class Main extends Component{

	render(){
		return(
			<div id="MainContainer">
				<h1 class="head-1 head-2"> Main Menu </h1>
				 
					<HashRouter>
						<div class="sidebar">
							<Link to="/main/account"> <button class="menuButton"> One</button></Link>
							<Link to="/main/classes"> <button class="menuButton">Two</button> </Link>
							<Link to=""> <button class="menuButton"> Three</button></Link>
							<Link to=""><button class="menuButton"> Four </button> </Link>
						</div>
					</HashRouter>

					<div id="mainContent">
						<Switch>
							<Route path="/main/classes" component={Classes}/>
						</Switch>
					</div>
			</div>
		);
	}
}

export default Main;