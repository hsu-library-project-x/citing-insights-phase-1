import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {Tooltip, IconButton, Container, Stepper, Step, StepButton, Button, Typography, Fab, Grid, Toolbar} from "@material-ui/core";

import Classes from "../Classes/Classes.jsx";
import Assignments from "../Upload/Upload.jsx";
import Analyze from "../Analyze/Analyze.jsx";
import RubricEditor from "../Rubric/RubricEditor.jsx";
import AnalyzeSubMenu from "../Analyze/AnalyzeSubMenu.jsx";
import Results from '../Overview/Results.jsx';


import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DoneIcon from '@material-ui/icons/Done';

import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";


// Class to render our homepage
class Tasks extends Component {
	constructor(props) {
		super(props);
		this.state={
			ActiveStep: 0,
			completed:{},
			selectedAssignmentId: null,
		}

		this.steps= ['Manage Courses', 'Upload Papers','Edit Rubrics', 'Analyze', 'Overview'];
		this.stepContent=[	'Step 1: Add / Remove / Edit Classes and Assignments',
		                   	'Step 2: Upload Student Papers',
							'Step 3: Customize Rubrics or Use pre-loaded Rubrics. Either way add a rubric for Analyze Mode',
							"Step 4: Assess Student's citations using rubric and our Discovery tools",
							"Step 5: See how you rated a student's citations"];

		this.totalSteps=this.totalSteps.bind(this);
		this.completedSteps= this.completedSteps.bind(this);
		this.isLastStep=this.isLastStep.bind(this);
		this.allStepsCompleted = this.allStepsCompleted.bind(this);
		this.handleNext = this.handleNext.bind(this);
		this.handleBack = this.handleBack.bind(this);
		this.handleStep = this.handleStep.bind(this);
		this.handleComplete = this.handleComplete.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.renderPage = this.renderPage.bind(this);
		this.updateSelectedId = this.updateSelectedId.bind(this);

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
		this.setState({ActiveStep: newActiveStep});
	};

	handleBack = () => {
		this.setState({ActiveStep: this.state.ActiveStep - 1});
	};

	handleStep = step => () => {
		this.setState({ActiveStep: step});
	};

	handleComplete = () => {
		const newCompleted = this.state.completed;
		newCompleted[this.state.ActiveStep] = true;
		this.setState({completed: newCompleted});
		this.handleNext();
	};

	handleReset = () => {
		this.setState({ActiveStep:0});
		this.setState({completed:{}});
	};

	renderPage = (step) => {
		switch (step) {
			case 0:
				return <Classes user={this.props.user} />;
			case 1:
				return <Assignments user={this.props.user} />;
			case 2:
				return <RubricEditor user={this.props.user} />;
			case 3:
				if(this.state.selectedAssignmentId) {
					return <Analyze
						user={this.props.user}
						id={this.state.selectedAssignmentId}
					/>;
				}else
				{
					return <AnalyzeSubMenu
						user={this.props.user}
						updateSelectedId={this.updateSelectedId}
					/>;
				}
			case 4:
				return <Results user={this.props.user} />;
			case 5:
				return <p align={"center"}> Click on the Reset Button to reset your progress or click on any step to go back </p>;
			default:
				return 'Unknown step';
		}
	}

	updateSelectedId(newId){
		this.setState({selectedAssignmentId: newId});
	}

	render() {

		const theme = createMuiTheme({
			palette: {
				primary: { main: '#25551b' }, // dk green
				secondary: { main: '#5C8021' } // light green
			},
		});

		return (
			<MuiThemeProvider theme={theme}>
				<Container maxWidth={'md'}>
					<Stepper nonLinear activeStep={this.state.ActiveStep}>
						{this.steps.map((label, index) => (
							<Step  key={label}>
								<StepButton onClick={this.handleStep(index)} completed={this.state.completed[index]}>
									{label}
								</StepButton>
							</Step>
						))}
					</Stepper>

					<div>
						{this.allStepsCompleted() ? (
							<div align={"center"}>
								<Typography >
									All steps completed - you&apos;re finished
								</Typography>
								<Fab
									// style={{float:"right"}}
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
									<Grid item xs={6}>
										<Typography align={"center"} color="textSecondary">{this.stepContent[this.state.ActiveStep]}</Typography>
									</Grid>
									<Grid item xs={6}>
										<div align={"right"}>
											<Tooltip title="Back" aria-label="go back">
												<IconButton
													aria-label="back-button"
													size="small"
													disabled={this.state.ActiveStep === 0}
													onClick={this.handleBack}
												>
													<ArrowBackIosIcon />
												</IconButton>
											</Tooltip>
											<Tooltip title="Next" aria-label="go next">
												<IconButton
													aria-label="next-button"
													size="small"
													disabled={this.state.ActiveStep >= 4}
													onClick={this.handleNext}
												>
													<ArrowForwardIosIcon />
												</IconButton>
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
													<DoneIcon  />
												</Fab>
											))}
										</div>
									</Grid>
								</Grid>
							</div>
						)}
						<div>
							{this.renderPage(this.state.ActiveStep)}
						</div>
					</div>
				</Container>
			</MuiThemeProvider>
		);
	}
}

export default withRouter(Tasks);