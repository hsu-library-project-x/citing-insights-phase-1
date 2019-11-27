import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from "react-router-dom";
import Classes from "../Classes/Classes.jsx";
import Assignments from "../Assignmnets/Assignments.jsx";
import Analyze from "../Analyze/Analyze.jsx";
import RubricEditor from "../Rubric/RubricEditor.jsx";
import AnalyzeSubMenu from "../Analyze/AnalyzeSubMenu.jsx";
import Results from '../Overview/Results.jsx';

import addClass from './class.svg';
import addAssignment from './assignment.svg';
import Continue from './continue.svg';
import download from './download.svg';
import rubric from './rubric.svg';

import './Tasks.css';
import { Button } from '@material-ui/core';

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
		return (
			<div id="MainContainer">
				<div className="mainCollapse"> 
					<button className="miniCircle" onClick={CollapseMain}></button>
				</div>
				<div className="sidebar" id="SideBar">
					<h1 className="head-1 head-2" id="headTitle">Tasks</h1>
					<div className="button-container">
						<Link to='/tasks/courses' >
							<button className="menuButton" onClick={this.changeName}>
								<img role='image' alt="classesIcon" id="Class" src={addClass} />
								Manage Courses
								</button>
						</Link>
					</div>
					<div className="button-container">
						<Link to="/tasks/assignments">
							<button className="menuButton" onClick={this.changeName}>
								<img role='image' alt="assignmentIcon" id="Upload" src={addAssignment} />
								Upload Papers
								</button>
						</Link>
					</div>
					<div className="button-container">
						<Link to="/tasks/analyzemenu">
							<button className="menuButton" onClick={this.changeName}>
								<img role='image' alt="analyzeIcon" id="Analyze" src={Continue} />
								Analyze
								</button>
						</Link>
					</div>
					<div className="button-container">
						<Link to="/tasks/overview">
							<button className="menuButton" onClick={this.changeName}>
								<img role='image' alt="downloadIcon" id="Overview" src={download} />
								Overview
								</button>
						</Link>
					</div>
					<div className="button-container">
						<Link to="/tasks/rubriceditor">
							<button className="menuButton" onClick={this.changeName}>
								<img role='image' alt="rubricIcon" id="Rubric" src={rubric} />
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