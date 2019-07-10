import React, {Component} from 'react';
import {Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap'
import './css/App.css';
import './css/Classes.css'



// Class to render our homepage
class Classes extends Component{

	constructor(props){
		super(props);
		this.state = {
			ClassName: '',
			ClassNote: '',
			classId: '',
			AssignName: '',
			AssignNote: ''
		};
		this.handleSubmitClass = this.handleSubmitClass.bind(this);
		this.handleSubmitAssign = this.handleSubmitAssign.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleSubmitClass(event){
		
		event.preventDefault();
		const data = {
			"name": this.state.ClassName,
			"user_id": "5d26304f97d65677327b7e56"
		};

		console.log(data);
		fetch('http://localhost:5000/courses', {
			method: 'POST',
			body: data,
		});
	}

	handleSubmitAssign(event){
		
		event.preventDefault();
		const data = new FormData();
		
		fetch('http://localhost:5000/assignment', {
			method: 'POST',
			body: data,
			headers:{
			    'Content-Type': 'application/json'
			} 
		});
	}

	//call when input changes to update the state
	handleInputChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;
		//alert(name + ", " + value);
		this.setState({
			[name]: value
		});
		
	}

	render(){
		return(
			/* So far our homepage is just a h1 tag with text */
			<div class="classes-container">
			<Row>
				<Col xs="6">
					<h2>Add a Class: </h2>
					<form id="addClassForm" onSubmit={this.handleSubmitClass}>
						<Label for="className">Class Name</Label>
						<Input onChange={this.handleInputChange} type="text" id="className" name="ClassName" placeholder="Type class name here" required/>
						<Input onChange={this.handleInputChange} type="textarea" id="classNotes" name="ClassNote" placeholder="Optional Notes on the class" />
						<Input type="submit" value="Submit"/>
					</form>
				</Col>
				<Col xs="6"> 
					<h2>Add an Assignment</h2>
					<form id="addAssignmentForm">
						<Label for="classAssign">Class:</Label>
						<Input onChange={this.handleInputChange} type="select" id="classAssign" name="ClassId" required>
							<option value="" disabled selected hidden >Select a Class</option>
							<option value="1">Class One</option>
						</Input>
						<Label for="assignName">Assignment:</Label>
						<Input onChange={this.handleInputChange} type="text" id="assignName" name="AssignmentName" placeholder="Type assignment name here" required/>
						<Input onChange={this.handleInputChange} type="textarea" id="assignNotes" name="AssignNote" placeholder="Optional Notes on the assignment" />
						<Input type="submit" value="Submit"/>
					</form>
				</Col>
			</Row>
			</div>

		);
	}
}

export default Classes;