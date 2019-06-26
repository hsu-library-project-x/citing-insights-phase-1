import React, {Component} from 'react';
import { Switch, Route, HashRouter, Link } from "react-router-dom";
import { Button, Row, Col, Form, Input, Label, FormGroup } from "reactstrap";
import Analyze from "./Analyze.jsx";

class AnalyzeSubMenu extends Component{

	constructor () {
	    super()
	    this.state = {
	    	selectedAssignment: false,
	    	selectedAssignContinue: false
	    }

	    this.newAssessment = this.newAssessment.bind(this);
	    this.onInput = this.onInput.bind(this);
	    this.onInput2 = this.onInput2.bind(this);
	}

	newAssessment(){
		let curAssign = document.getElementById("assignForAnalyze");

	}

	onInput(){
		this.setState({
			selectedAssignment: true
		});
	}

	onInput2(){
		this.setState({
			selectedAssignContinue: true
		});
	}

	


	render(){
		return(
			<div class="analyze-container" >
			<Row>
				<Col xs="1"></Col>
				<Col xs="5">
					<form className={`${!this.state.selectedAssignment ? "warnHighlight" : "safeHighlight"}`}>
						<FormGroup>
						<h4>Start Analyzing a new Assignment</h4>
						<Input onInput={this.onInput} id="assignForAnalyze" type="select" required >
							<option value="" disabled selected hidden >Select an Assignment</option>
							<option value="assignmentIdHere">Assigment One</option>
						</Input>
						<Button onClick={this.newAssessment} disabled={!this.state.selectedAssignment}>Submit</Button>
						</FormGroup>
					</form>
				</Col>
				<Col xs="5">
					<form className={`${!this.state.selectedAssignContinue ? "warnHighlight" : "safeHighlight"}`}>
						<FormGroup>
						<h4>Continue Analyzing an Assignment</h4>
						<Input onInput={this.onInput2} id="assignForAnalyze" type="select" required >
							<option value="" disabled selected hidden >Select an Assignment</option>
							<option value="assignmentIdHere">Assigment One</option>
						</Input>
						<Button onClick={this.newAssessment} disabled={!this.state.selectedAssignContinue}>Submit</Button>
						</FormGroup>
					</form>
				</Col>
				<Col xs="1">
					<HashRouter>
						<div class="button-container">
							<Link to="/tasks/analyze">
								<Button>Test Button</Button>
							</Link>
						</div>
					</HashRouter>
				</Col>
			</Row>
			</div>
		);
	}
}

export default AnalyzeSubMenu;