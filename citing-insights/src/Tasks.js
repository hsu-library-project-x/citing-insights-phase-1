// Our Tasks Menu for CitingInsights.net 

//Imprort Libraries
import React, {Component} from 'react';
import './css/App.css';
import './css/Tasks.css';

//Import Routing
import { Switch, Route, HashRouter, Link } from "react-router-dom";
import Classes from "./Classes";
import Assignments from "./Assignments";
import Download from "./Download";
import Analyze from "./Analyze";

//Import Icons
import addClass from './images/class.svg';
import addAssignment from './images/assignment.svg';
import Continue from './images/continue.svg';
import download from './images/download.svg';
import rubric from './images/rubric.svg';

//---------------------WHAT DOES THIS DO?
function CollapseMain(props){
	let sidebar = document.getElementById("SideBar");
	let buttons = document.getElementsByClassName("menuButton");
	if(sidebar.classList.contains("collapse-main")){
		sidebar.classList.remove("collapse-main");
		sidebar.classList.add("expand-main");
		for (let i = 0; i < buttons.length; i++){
			buttons[i].classList.remove("opacityHideAnimation");
			buttons[i].classList.add("opacityAnimation");
		}
		
	}
	else{
		for (let i = 0; i < buttons.length; i++){
			buttons[i].classList.remove("opacityAnimation");
			buttons[i].classList.add("opacityHideAnimation");
		}
		sidebar.classList.remove("expand-main");
		sidebar.classList.add('collapse-main');
	}	
}
//----------------------------------------------


// Class to render our homepage
class Tasks extends Component{

	// ---------WHAT DOES THIS DO
	changeName(evt){
		const id = evt.target.getAttribute("id");
		let head = document.getElementById("headTitle");
		head.innerHTML = id;
	}
	//----------------------------------------------

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
								<img alt="classesIcon" src={addClass} />
									Manage Courses
								</button>
							</Link>
						</div>
						<div class="button-container">
							<Link to="/tasks/assignments">
								<button class="menuButton" id="Assignments" onClick={this.changeName}>
								<img alt="assignmentIcon" src={addAssignment} />
									Manage Assignments
								</button>
							</Link>
						</div>
						<div class="button-container">
							<Link to="/tasks/continue">
								<button class="menuButton" id="Analyze" onClick={this.changeName}>
								<img alt="continueIcon" src={Continue} />
									Continue
								</button>
							</Link>
						</div>
						<div class="button-container">
							<Link to="/tasks/download">
								<button class="menuButton" id="Download" onClick={this.changeName}>
								<img alt="downloadIcon" src={download} />
									Download
								</button>
							</Link>
						</div>
						<div class="button-container">
							<Link to="/tasks/rubric">
								<button class="menuButton" id="Rubric" onClick={this.changeName}>
								<img alt="rubricIcon" src={rubric} />
									Manage Rubrics
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