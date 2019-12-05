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

// Class to render our homepage
class Tasks extends Component {
	render() {
		return (
			<div id="MainContainer">
				<div className="sidebar" id="SideBar">
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<h1 className="head-1 head-2" id="headTitle">Tasks</h1>
						</Grid>
						<Grid item xs={1} ></Grid>
						<Grid item xs={2}>

								<Link to='/tasks/courses' >
										<img  alt="classesIcon" id="Class" src={addClass} />
										Manage Courses

								</Link>

						</Grid>
						<Grid item xs={2}>

								<Link to="/tasks/assignments">

										<img  alt="assignmentIcon" id="Upload" src={addAssignment} />
										Upload Papers

								</Link>

						</Grid>

						<Grid item xs={2}>
								<Link  to="/tasks/analyzemenu">

										<img  alt="analyzeIcon" id="Analyze" src={Continue} />
										Analyze

								</Link>
						</Grid>

						<Grid item xs={2}>
								<Link  to="/tasks/overview">

										<img  alt="downloadIcon" id="Overview" src={download} />
										Overview

								</Link>
						</Grid>

						<Grid item xs={2}>
								<Link  to="/tasks/rubriceditor">

										<img  alt="rubricIcon" id="Rubric" src={rubric} />
										Edit Rubrics

								</Link>
						</Grid>
					</Grid>

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