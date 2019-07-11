import React, {Component} from 'react';
import { Switch, Route, HashRouter, Link } from "react-router-dom";
import { Button, Row, Col, Form, Input, Label, FormGroup } from "reactstrap";
import Analyze from "./Analyze.jsx";

class AnalyzeSubMenu extends Component{

	constructor () {
	    super()
	    this.state = {
	    	selectedAssignment: false,
	    	selectedAssignContinue: false,
	    	AssignNew: '',
	    	AssignContinue: '',
	    	ClassNew: '',
	    	ClassContinue: ''
	    }

	    this.newAssessment = this.newAssessment.bind(this);
	    this.onInput = this.onInput.bind(this);
	    this.onInput2 = this.onInput2.bind(this);
	    this.handleInputChange = this.handleInputChange.bind(this);
	    this.populateAssignment = this.populateAssignment.bind(this);
	    this.handleSubmitNew = this.handleSubmitNew.bind(this);
	    this.handleSubmitContinue = this.handleSubmitContinue.bind(this);
	}

	newAssessment(){
		let curAssign = document.getElementById("assignForAnalyze");

	}

	populateAssignment(){
		//This called, create Assignment Menu with the selected ClassId
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

	handleInputChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;
		//alert(name + ", " + value);
		this.setState({
			[name]: value
		});
		
	}

	async handleSubmitNew(event){
		alert("handling New Submit");
		event.preventDefault();
		const data = {
			"name": this.state.AssignNew,
			"class_id": this.state.ClassNew 
		};

		let sendData = JSON.stringify(data);

		console.log(data);

		/*fetch('http://localhost:5000/courses', {
			method: 'GET',
			body: sendData,
			headers:{
				'Accept': 'application/json',
			    'Content-Type': 'application/json'
			},
		});*/

		//navigate to analyze page with the GET information passed props
	}

	async handleSubmitContinue(event){
		alert("handling Continue Submit");
		event.preventDefault();
		const data = {
			//Assignment Name
			"name" : this.state.AssignContinue,
			//Class Id
			"class_id": this.state.ClassContinue
		};

		let sendData = JSON.stringify(data);

		/*fetch('http://localhost:5000/courses', {
			method: 'GET',
			body: sendData,
			headers:{
				'Accept': 'application/json',
			    'Content-Type': 'application/json'
			},
		});*/

		//navigate to analyze page with the GET information passed props with the "continue" identifier
	}

	render(){
		return(
			<div class="analyze-container ana-subcontainer" >
			<Row>
				<Col xs="1"></Col>
				<Col xs="5">
					<form className={`${!this.state.selectedAssignment ? "warnHighlight" : "safeHighlight"}`} onSubmit={this.handleSubmitNew}>
						<h4>Start Analyzing a new Assignment</h4>
						<Input onChange={this.handleInputChange} onInput={this.populateAssignment} id="assignForAnalyze" type="select" name="ClassNew" required >
							<option value="" disabled selected hidden >Select a Class</option>
							<option value="1">Class One</option>
						</Input>
						<Input onChange={this.handleInputChange} onInput={this.onInput} id="assignForAnalyze" type="select" name="AssignNew" required >
							<option value="" disabled selected hidden >Select an Assignment</option>
							<option value="1">Assigment One</option>
						</Input>
						<Input type="submit" value="Submit" disabled={!this.state.selectedAssignment} />
					</form>
				</Col>
				<Col xs="5">
					<form className={`${!this.state.selectedAssignContinue ? "warnHighlight" : "safeHighlight"}`} onSubmit={this.handleSubmitContinue}>
						<h4>Continue Analyzing an Assignment</h4>
						<Input onChange={this.handleInputChange} onInput={this.populateAssignment} id="assignForAnalyze" type="select" name="ClassContinue" required >
							<option value="" disabled selected hidden >Select a Class</option>
							<option value="1">Class One</option>
						</Input>
						<Input  onChange={this.handleInputChange} onInput={this.onInput2} id="assignForAnalyze" type="select" name="AssignContinue" required >
							<option value="" disabled selected hidden >Select an Assignment</option>
							<option value="assignmentIdHere">Assigment One</option>
						</Input>
						<Input type="submit" value="Submit" onClick={this.newAssessment} disabled={!this.state.selectedAssignContinue} />
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