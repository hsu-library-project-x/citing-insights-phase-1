// Our Homepage for CitingInsights.net 

//Imprort Libraries
import React, {Component} from 'react';
import './css/App.css';
import './css/Tasks.css';


import { Switch, Route, HashRouter, Link } from "react-router-dom";
import Classes from "./Classes";
import Assignments from "./Assignments";
import Download from "./Download";
import Analyze from "./Analyze";

function CollapseMain(props){
	let sidebar = document.getElementById("SideBar");
	let buttons = document.getElementsByClassName("menuButton");
	if(sidebar.classList.contains("collapse-main")){
		sidebar.classList.remove("collapse-main");
		sidebar.classList.add("expand-main");
		for (let i = 0; i < buttons.length; i++){
			buttons[i].classList.add("opacityAnimation");
		}
		
	}
	else{
		for (let i = 0; i < buttons.length; i++){
			buttons[i].classList.remove("opacityAnimation");
		}
		sidebar.classList.remove("expand-main");
		sidebar.classList.add('collapse-main');
	}	
}


// Class to render our homepage
class Tasks extends Component{

	changeName(evt){
		const id = evt.target.getAttribute("id");
		let head = document.getElementById("headTitle");
		head.innerHTML = id;
	}

	render(){
		return(
			<div id="MainContainer">
				
				<div class="mainCollapse">
					<div class="miniCircle" onClick={CollapseMain}></div>
				</div>
				<HashRouter>
					<div class="sidebar" id="SideBar">
						<h1 class="head-1 head-2" id="headTitle">Tasks</h1>
						<div class="button-container">
							<Link to="/tasks/classes">
								<button class="menuButton" id="Class" onClick={this.changeName}>
									Classes
								</button>
							</Link>
						</div>
						<div class="button-container">
							<Link to="/tasks/assignments">
								<button class="menuButton" id="Assignments" onClick={this.changeName}>
									Assignments
								</button>
							</Link>
						</div>
						<div class="button-container">
							<Link to="/tasks/continue">
								<button class="menuButton" id="Continue" onClick={this.changeName}>
									Continue
								</button>
							</Link>
						</div>
						<div class="button-container">
							<Link to="/tasks/download">
								<button class="menuButton" id="Download" onClick={this.changeName}>
									Download
								</button>
							</Link>
						</div>
					</div>
				</HashRouter> 
				<div id="mainContent">
					<Switch>
						<Route path="/tasks/classes" component={Classes}/>
						<Route path="/tasks/assignments" component={Assignments}/>
						<Route path="/tasks/continue" component={Analyze}/>
						<Route path="/tasks/download" component={Download}/>
					</Switch>
				</div>
			</div>
		);
	}
}

export default Tasks;