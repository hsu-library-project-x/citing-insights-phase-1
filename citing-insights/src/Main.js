// Our Homepage for CitingInsights.net 

//Imprort Libraries
import React, {Component} from 'react';
import './App.css';
import { Switch, Route, HashRouter, Link } from "react-router-dom";
import Classes from "./Classes";

function CollapseMain(props){
	let sidebar = document.getElementById("SideBar");
	if(sidebar.classList.contains("collapse-main")){
		sidebar.classList.add("expand-main");
		sidebar.classList.remove("collapse-main");
	}
	else{
		sidebar.classList.remove("expand-main");
		sidebar.classList.add('collapse-main');
	}
	
}

// Class to render our homepage
class Main extends Component{
	render(){
		return(
			<div id="MainContainer">
				
				<h1 class="head-1 head-2">Main Menu<div class="mainCollapse"><div class="miniCircle" onClick={CollapseMain}></div></div></h1>
					<HashRouter>
						<div class="sidebar" id="SideBar">
							<div class="button-container">
								<Link to="/main/classes">
									<button class="menuButton">
										<p>One</p>
										<p>Button Text Goes Here: Testing Overflow blabalb alb lablablabl abla blabla blab lablabl</p>
									</button>
								</Link>
							</div>
							<div class="button-container">
								<Link to="/main/assignment"><button class="menuButton">Two</button></Link>
							</div>
							<div class="button-container">
								<Link to="/main/continue"><button class="menuButton">Three</button></Link>
							</div>
							<div class="button-container">
								<Link to="/main/download"><button class="menuButton">Four</button></Link>
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