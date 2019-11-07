// Our Tasks Menu for CitingInsights.net 

//Imprort Libraries
import React, { Component } from 'react';


//Import Routing
import { Switch, Route, Link, withRouter } from "react-router-dom";
import Classes from "./Classes.jsx";
import Assignments from "./Assignments.jsx";
import AnalyzeSubMenu from "./AnalyzeSubMenu.jsx";
import Download from "./Download.jsx";
import Analyze from "./Analyze.jsx";
import RubricEditor from "./RubricEditor.jsx";

//Import Icons
import addClass from './images/class.svg';
import addAssignment from './images/assignment.svg';
import Continue from './images/continue.svg';
import download from './images/download.svg';
import Results from './Results.jsx';
import rubric from './images/rubric.svg';

// Collapses the big drop down of all sub components
function CollapseMain(props) {
	let sidebar = document.getElementById("SideBar");
	let buttons = document.getElementsByClassName("menuButton");
	if (sidebar.classList.contains("collapse-main")) {
		sidebar.classList.remove("collapse-main");
		sidebar.classList.add("expand-main");
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].classList.remove("opacityHideAnimation");
			buttons[i].classList.add("opacityAnimation");
		}

	}
	else {
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].classList.remove("opacityAnimation");
			buttons[i].classList.add("opacityHideAnimation");
		}
		sidebar.classList.remove("expand-main");
		sidebar.classList.add('collapse-main');
	}
}
//----------------------------------------------


// Class to render our homepage
class Tasks extends Component {

	// This changes the page title to correspond to what was clicked
	changeName(evt) {
		const id = evt.target.id;
		let head = document.getElementById("headTitle");
		head.innerHTML = id;
	}

	render() {
		console.log(this.props);
		return (
			<div id="MainContainer">
				<div class="mainCollapse" onClick={CollapseMain}>
					<div class="miniCircle" ></div>
				</div>

				<div class="sidebar" id="SideBar">
					<h1 class="head-1 head-2" id="headTitle">Tasks</h1>
					<div class="button-container">
						<Link to='/tasks/courses' >
							<button class="menuButton" onClick={this.changeName}>
								<img alt="classesIcon" id="Class" src={addClass} />
								Manage Courses
								</button>
						</Link>
					</div>
					<div class="button-container">
						<Link to="/tasks/assignments">
							<button class="menuButton" onClick={this.changeName}>
								<img alt="assignmentIcon" id="Upload" src={addAssignment} />
								Upload Papers
								</button>
						</Link>
					</div>
					<div class="button-container">
						<Link to="/tasks/analyzemenu">
							<button class="menuButton" onClick={this.changeName}>
								<img alt="analyzeIcon" id="Analyze" src={Continue} />
								Analyze
								</button>
						</Link>
					</div>
					<div class="button-container">
						<Link to="/tasks/overview">
							<button class="menuButton" onClick={this.changeName}>
								<img alt="downloadIcon" id="Overview" src={download} />
								Overview
								</button>
						</Link>
					</div>
					<div class="button-container">
						<Link to="/tasks/rubriceditor">
							<button class="menuButton" onClick={this.changeName}>
								<img alt="rubricIcon" id="Rubric" src={rubric} />
								Edit Rubrics
								</button>
						</Link>
					</div>
				</div>
				<div id="mainContent">
					<Switch>
						<Route path="/tasks/courses"
							render={(props) =>
								<Classes user={this.props.user} {...props} />} />
						<Route path="/tasks/assignments" render={(props) => <Assignments user={this.props.user} {...props} />} />
						<Route path="/tasks/analyzemenu" render={(props) => <AnalyzeSubMenu user={this.props.user} {...props} />} />
						<Route path="/tasks/overview" render={(props) => <Results user={this.props.user} {...props} />} />
						<Route path="/tasks/rubriceditor" render={(props) => <RubricEditor user={this.props.user} {...props} />} />
						<Route path="/tasks/analyze" render={(props) => <Analyze user={this.props.user} {...props} />} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default withRouter(Tasks);