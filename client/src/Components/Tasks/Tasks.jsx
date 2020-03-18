import React, { PureComponent } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { Tooltip, IconButton, Container, Stepper, Step, StepButton, Typography, Fab, Grid } from "@material-ui/core";
import Classes from "../Classes/Classes.jsx";
import Upload from "../Upload/Upload.jsx";
import Analyze from "../Analyze/Analyze.jsx";
import Rubric from "../Rubric/Rubric.jsx";
import RubricEditor from "../Rubric/RubricEditor";
import AnalyzeSubMenu from "../Analyze/AnalyzeSubMenu.jsx";
import Overview from '../Overview/Overview.jsx';
import OverviewTable from "../Overview/OverviewTable";

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DoneIcon from '@material-ui/icons/Done';

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

class Tasks extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			ActiveStep: 0,
			completed: {},
			selectedAssignmentId: null,
			isEditing: null,
			rubricExists: null,
			rubricTitle: "",
			rubricElements: "",
			selectedRubric: "",
			AvailableRubrics: [],
			rubricData: {},
			citations: [],
			overviewPage: null,
			severity:null,
			message:null,
		};

		this.steps = ['Manage Courses', 'Upload Papers', 'Edit Rubrics', 'Analyze', 'Overview'];
		this.stepContent = ['Step 1: Add / Remove / Edit Classes and Assignments',
			'Step 2: Upload Student Papers',
			'Step 3: Customize Rubrics or Use pre-loaded Rubrics. Either way add a rubric for Analyze Mode',
			"Step 4: Assess Student's citations using rubric and our Discovery tools",
			"Step 5: See how you rated a student's citations"];

		this.pathnames = {
			'/tasks/api/courses': 0, '/tasks/api/upload': 1, '/tasks/rubric': 2, '/tasks/rubriceditor': 2,
			'/tasks/analyzemenu': 3, '/tasks/analyze': 3, '/tasks/overview': 4
		};

		this.renderPage();

		this.totalSteps = this.totalSteps.bind(this);
		this.completedSteps = this.completedSteps.bind(this);
		this.isLastStep = this.isLastStep.bind(this);
		this.allStepsCompleted = this.allStepsCompleted.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.handleBack = this.handleBack.bind(this);
		this.handleStep = this.handleStep.bind(this);
		this.handleComplete = this.handleComplete.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.renderPage = this.renderPage.bind(this);
		this.updateSelectedId = this.updateSelectedId.bind(this);
		this.updateisEditing = this.updateisEditing.bind(this);
		this.updateOverviewPage = this.updateOverviewPage.bind(this);
		this.RubricAlert = this.RubricAlert.bind(this);
		this.ChangeOverview = this.ChangeOverview.bind(this);

	}

	totalSteps = () => {
		return this.steps.length;
	};

	completedSteps = () => {
		return Object.keys(this.state.completed).length;
	};

	isLastStep = () => {
		return this.state.activeStep === this.totalSteps() - 1;
	};

	allStepsCompleted = () => {
		return this.completedSteps() === this.totalSteps();
	};


	handleNext = () => {
		const newActiveStep =
			this.isLastStep() && !this.allStepsCompleted()
				? // It's the last step, but not all steps have been completed,
				// find the first step that has been completed
				this.steps.findIndex((step, i) => !(i in this.state.completed))
				: this.state.ActiveStep + 1;
		this.setState({ ActiveStep: newActiveStep }, this.renderPage);
	};

	handleBack = () => {
		this.setState(prevState => ({ ActiveStep: prevState.ActiveStep - 1 }), this.renderPage);

	};

	handleStep = step => () => {
		this.setState({ ActiveStep: step }, this.renderPage);
	};

	handleComplete = () => {
		const newCompleted = this.state.completed;
		newCompleted[this.state.ActiveStep] = true;
		this.setState({ completed: newCompleted });
		this.handleNext();
	};

	handleReset = () => {
		this.setState({ ActiveStep: 0 }, this.renderPage);
		this.setState({ completed: {} });
	};

	updateSelectedId(newId) {
		this.setState({ selectedAssignmentId: newId }, this.renderPage);
	}

	updateOverviewPage(citations) {
		this.setState({ citations: citations, overviewPage: true }, this.renderPage);
	}

	updateisEditing = (rubricExists, rubricTitle, rubricElements, selectedRubric, availableRubrics, rubricData) => {
		this.setState({
			isEditing: true,
			rubricExists: rubricExists,
			rubricTitle: rubricTitle,
			rubricElements: rubricElements,
			selectedRubric: selectedRubric,
			AvailableRubrics: availableRubrics,
			rubricData: rubricData,
		}, this.renderPage);
	};

	renderPage = () => {
		switch (this.state.ActiveStep) {
			case 0:
				this.props.history.push('/tasks/api/courses');
				return;
			case 1:
				this.props.history.push('/tasks/api/upload');
				return;
			case 2:
				if (this.state.isEditing !== null) {
					this.props.history.push('/tasks/rubriceditor');
					return;
				} else {
					this.props.history.push('/tasks/rubric');
					return;
				}
			case 3:
				if (this.state.selectedAssignmentId !== null) {
					this.props.history.push('/tasks/analyze');
					return;
				} else {
					this.props.history.push('/tasks/analyzemenu');
					return;
				}
			case 4:
				if (this.state.overviewPage !== null) {
					this.props.history.push('/tasks/overviewtable');
					return;
				} else {
					this.props.history.push('/tasks/overview');
					return;
				}
			case 5:
				return <p align={"center"}> Click on the Reset Button to reset your progress or click on any step to go back </p>;
			default:
				return 'Unknown step';
		}
	};

	RubricAlert(message, severity){
		this.setState({
			message:message,
			severity:severity
		});
	}

	ChangeOverview(){
		this.setState({overviewPage:null});
	}

	render() {
		const theme = createMuiTheme({
			palette: {
				primary: { main: this.props.configurations.primaryColor }, // dk green
				secondary: { main: this.props.configurations.secondaryColor } // light green
			},
		});

		return (
			<MuiThemeProvider theme={theme}>
				<Container maxWidth='xl'>
					<Container maxWidth={'md'}>
						<Stepper nonLinear activeStep={this.pathnames[this.props.location.pathname]}>
							{this.steps.map((label, index) => (
								<Step key={label}>
									<StepButton
										onClick={this.handleStep(index)}
										completed={this.state.completed[index]}
									>
										{label}
									</StepButton>
								</Step>
							))}
						</Stepper>
					</Container>

					<div>
						{this.allStepsCompleted() ? (
							<div align={"center"}>
								<Typography >
									All steps completed - you&apos;re finished
								</Typography>
								<Fab
									variant="extended"
									size="small"
									color="primary"
									aria-label="reset"
									onClick={this.handleReset}
								>
									Reset
								</Fab>
							</div>
						) : (
								<div>
									<Grid container spacing={0}>
										<Grid item xs={8}>
											<Typography
												align={"right"}
												color="textSecondary">{this.stepContent[this.state.ActiveStep]}</Typography>
										</Grid>
										<Grid item xs={4}>
											<div align={"right"}>
												<Tooltip title="Back" aria-label="go back">
													<span>
														<IconButton
															aria-label="back-button"
															size="small"
															disabled={this.state.ActiveStep === 0}
															onClick={this.handleBack}
														>
															<ArrowBackIosIcon />
														</IconButton>
													</span>
												</Tooltip>
												<Tooltip title="Next" aria-label="go next">
													<span>
														<IconButton
															aria-label="next-button"
															size="small"
															disabled={this.state.ActiveStep >= 4}
															onClick={this.handleNext}
														>
															<ArrowForwardIosIcon />
														</IconButton>
													</span>
												</Tooltip>
												{this.state.ActiveStep !== this.steps.length &&
													(this.state.completed[this.state.ActiveStep] ? (
														<Typography variant="caption" >
															Step {this.state.ActiveStep + 1} already completed
												</Typography>
													) : (
															<Fab
																variant="extended"
																size="small"
																color="primary"
																aria-label="complete step"
																onClick={this.handleComplete}
															>
																{this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
																<DoneIcon />
															</Fab>
														))}
											</div>
										</Grid>
									</Grid>
								</div>
							)}
						<Switch>

							<Route path="/tasks/api/courses" render={(props) =>
								<Classes
									user={this.props.user}
									{...props} />}
							/>
							<Route path="/tasks/api/upload" render={(props) =>
								<Upload
									user={this.props.user}
									{...props} />}
							/>
							<Route path="/tasks/rubric" render={(props) =>
								<Rubric
									user={this.props.user}
									updateisEditing={this.updateisEditing}
									message={this.state.message}
									severity={this.state.severity}
									{...props} />}
							/>
							<Route path="/tasks/rubriceditor" render={(props) =>
								<RubricEditor
									user={this.props.user}
									rubricExists={this.state.rubricExists}
									rubricElements={this.state.rubricElements}
									rubricTitle={this.state.rubricTitle}
									selectedRubric={this.state.selectedRubric}
									AvailableRubrics={this.state.AvailableRubrics}
									RubricAlert={this.RubricAlert}
									rubricData={this.state.rubricData}
									{...props} />}
							/>
							<Route path="/tasks/analyzemenu" render={(props) =>
								<AnalyzeSubMenu
									user={this.props.user}
									updateSelectedId={this.updateSelectedId}
									{...props} />}
							/>
							<Route path="/tasks/analyze" render={(props) =>
								<Analyze
									user={this.props.user}
									oneSearchUrl={this.props.configurations.oneSearchUrl}
									oneSearchViewId={this.props.configurations.oneSearchViewId}
									selectedAssignmentId={this.state.selectedAssignmentId}
									{...props} />}
							/>
							<Route path="/tasks/overview" render={(props) =>
								<Overview
									user={this.props.user}
									updateOverviewPage={this.updateOverviewPage}
									{...props} />}
							/>
							<Route path="/tasks/overviewtable" render={(props) =>
								<OverviewTable
									user={this.props.user}
									citations={this.state.citations}
									ChangeOverview={this.ChangeOverview}
									{...props} />}
							/>
						</Switch>
					</div>
				</Container>
			</MuiThemeProvider>
		);
	}
}

export default withRouter(Tasks);