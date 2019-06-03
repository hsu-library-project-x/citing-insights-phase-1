// Our Homepage for CitingInsights.net 

//Imprort Libraries
import React, {Component} from 'react';
import './App.css';
import { Jumbotron, Container, Row, Col, Button } from 'reactstrap';
import { Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { Switch, Route, NavLink, HashRouter, Router, Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'; 
import { ListGroup, ListGroupItem } from 'reactstrap';
import Classes from "./Classes";


function goToClass(props)
{
	window.location.href="/main/classes";
}

function goToAccount(props)
{
	window.location.href="/main/account";
}

// Class to render our homepage
class Main extends Component{

	render(){
		return(
			<div id="MainContainer">
				<h1 class="head-1 head-2"> Main Menu </h1>
				{/* 
					<HashRouter>
						<div class="sidebar">
							<ListGroup >
								<ListGroupItem ><Link to="/main/account" class="sidemenu">Account</Link></ListGroupItem>
								<ListGroupItem><Link to="/main/classes" class="sidemenu">Classes</Link></ListGroupItem>
							</ListGroup>
						</div>
					</HashRouter>
				*/} 

				<Button size="lg" onClick={goToAccount}> Account</Button>
				<Button size="lg" onClick={goToClass}> Classes </Button> 
				<Button size="lg"> third </Button>
				<Button size="lg"> forth </Button>


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