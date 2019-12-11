import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from "react-router-dom";
import Classes from "../Classes/Classes.jsx";
import Assignments from "../Assignmnets/Assignments.jsx";
import Analyze from "../Analyze/Analyze.jsx";
import RubricEditor from "../Rubric/RubricEditor.jsx";
import AnalyzeSubMenu from "../Analyze/AnalyzeSubMenu.jsx";
import Results from '../Overview/Results.jsx';
import {Grid} from "@material-ui/core";
import Fab from '@material-ui/core/Fab';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';
import SpellcheckOutlinedIcon from '@material-ui/icons/SpellcheckOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloudDownloadOutlinedIcon from '@material-ui/icons/CloudDownloadOutlined';
import Container from '@material-ui/core/Container';
import useStyles from '../../styles';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";

// Class to render our homepage
class Tasks extends Component {
	constructor(props) {
		super(props);
		// this.classes = this.classes.bind(this);
	}


	render() {

		const theme = createMuiTheme({
			palette: {
				primary: { main: '#25551b' }, // dk green
				secondary: { main: '#5C8021' } // light green
			},
		});


		return (
			<div id="MainContainer">
			<Container maxWidth={'md'}>
				<MuiThemeProvider theme={theme}>
					<Grid
						justify="space-between"
						container
						// spacing={20}
						style={{marginTop: 20}}
					>
						<Grid item>
							<Link to='/tasks/courses' >
								<Fab
									variant="extended"
									color={'primary'}
									size={"large"}
									aria-label="manage-courses"
								>
									<AddCircleOutlineOutlinedIcon  style={{marginRight: theme.spacing(1)}} />
									Manage Courses
								</Fab>
							</Link>
						</Grid>
						<Grid item>
							<Link to="/tasks/assignments">
								<Fab
									variant="extended"
									color={'primary'}
									size={"large"}
									aria-label="upload"
								>
									<BackupOutlinedIcon style={{marginRight: theme.spacing(1)}} />
									{/*<img  alt="assignmentIcon" id="Upload" src={addAssignment} />*/}
									Upload Papers
								</Fab>
							</Link>
						</Grid>
						<Grid item>
							<Link  to="/tasks/analyzemenu">
								<Fab
									variant="extended"
									color={'primary'}
									size={"large"}
									aria-label="analyze"
								>
									<SpellcheckOutlinedIcon style={{marginRight: theme.spacing(1)}} />
									{/*<img  alt="analyzeIcon" id="Analyze" src={Continue} />*/}
									Analyze
								</Fab>
							</Link>
						</Grid>
						<Grid item>
							<Link  to="/tasks/rubriceditor">
								<Fab
									variant="extended"
									color={'primary'}
									size={"large"}
									aria-label="edit rubrics"
								>
									<EditOutlinedIcon style={{marginRight: theme.spacing(1)}} />
									{/*<img  alt="rubricIcon" id="Rubric" src={rubric} />*/}
									Edit Rubrics
								</Fab>
							</Link>

						</Grid>
						<Grid item>
							<Link  to="/tasks/overview">
								<Fab
									variant="extended"
									color={'primary'}
									size={"large"}
									aria-label="download"
								>
									<CloudDownloadOutlinedIcon style={{marginRight: theme.spacing(1)}} />
									{/*<img  alt="downloadIcon" id="Overview" src={download} />*/}
									Overview
								</Fab>
							</Link>
						</Grid>
					</Grid>
				</MuiThemeProvider>
			</Container>
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