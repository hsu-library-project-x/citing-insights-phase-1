// Our Homepage for CitingInsights.net 

//Imprort Libraries
import React, {Component} from 'react';
import './App.css';
import { Switch, Route, HashRouter, Link } from "react-router-dom";
import Classes from "./Classes";

// Class to render our homepage
class Main extends Component{

	render(){
		return(
			<div id="MainContainer">
				
				<h1 class="head-1 head-2">Main Menu<div class="mainCollapse"><div class="miniCircle"><p>-</p></div></div></h1>
					<HashRouter>
						<div class="sidebar">
							<div class="button-container">
								<Link to="/main/account">
									<button class="menuButton">
										<p>One</p>
										<p>Button Text Goes Here: Testing Overflow blabalb alb lablablabl abla blabla blab lablabl</p>
									</button>
								</Link>
							</div>
							<div class="button-container">
								<Link to="/main/classes"><button class="menuButton">Two</button></Link>
							</div>
							<div class="button-container">
								<Link to=""><button class="menuButton">Three</button></Link>
							</div>
							<div class="button-container">
								<Link to=""><button class="menuButton">Four</button></Link>
							</div>
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