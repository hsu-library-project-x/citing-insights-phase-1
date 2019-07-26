import React, {Component} from 'react';
import {Row, Col, Form, FormGroup, Input, Label, Button} from 'reactstrap'
import { withRouter} from 'react-router-dom';
import './css/App.css';
import './css/Classes.css'


// Class to render our homepage
class Classes extends Component{
	constructor(props){
		super(props);
	}
	render(){
		console.log("classes")
		console.log(this.props);
		return(
			<div class="classes-container">
			<Row>
				<Col xs="6">
					<h2>New Class</h2>
					<Form>
						<FormGroup>
							<Label for="className">Class Name</Label>
							<Input type="text" id="className" name="ClassName" placeholder="Type class name here"/>
							<Label for="classNotes">Notes: </Label>
							<Input type="textarea" id="classNotes" name="ClassNotes" placeholder="Optional Notes on the class" />
						</FormGroup> 
						<FormGroup>
							<Button>Ok</Button>
							<Button>Cancel</Button>
						</FormGroup>
					</Form>
				</Col>
				<Col xs="6">
					{/*Populate Element here with existing Classes through an API call*/}
				</Col>
			</Row>
			</div>

		);
	}
}

export default withRouter(Classes);