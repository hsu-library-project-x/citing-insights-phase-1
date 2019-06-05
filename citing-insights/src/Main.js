// Our Homepage for CitingInsights.net 

//Imprort Libraries
import React, {Component} from 'react';
import './App.css';
import { Switch, Route, HashRouter, Link } from "react-router-dom";
import Classes from "./Classes";
import Assignments from "./Assignments";
import Download from "./Download";
import Analyze from "./Analyze";

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
				
				<h1 class="head-1 head-2">Tasks<div class="mainCollapse"><div class="miniCircle" onClick={CollapseMain}></div></div></h1>
					<HashRouter>
						<div class="sidebar" id="SideBar">
							<div class="button-container">
								<Link to="/main/classes">
									<button class="menuButton">
										<p>Classes</p>
									</button>
								</Link>
							</div>
							<div class="button-container">
								<Link to="/main/assignment">
									<button class="menuButton">
										<p>Assignments</p>
									</button>
								</Link>
							</div>
							<div class="button-container">
								<Link to="/main/continue">
									<button class="menuButton">
										<p>Continue</p>
									</button>
								</Link>
							</div>
							<div class="button-container">
								<Link to="/main/download">
									<button class="menuButton">
										<p>Four</p>
									</button>
								</Link>
							</div>
						</div>
					</HashRouter> 
					<div id="mainContent">
						<Switch>
							<Route path="/main/classes" component={Classes}/>
							<Route path="/main/assignments" component={Assignments}/>
							<Route path="/main/continue" component={Analyze}/>
							<Route path="/main/download" component={Download}/>
						</Switch>
					</div>
			</div>
		);
	}
}

export default Main;