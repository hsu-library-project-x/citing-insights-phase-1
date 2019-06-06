import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './css/App.css';
import './css/Assignment.css';


// Class to render our homepage
class Assignment extends Component{
	

	render(){
		return(
			/* So far our homepage is just a h1 tag with text */
			<div class="classes-container assign-container" >
				<h1>Upload Assignment</h1>
				<Row>
					<Col xs="2">
						Empty Col
					</Col>
					<Col xs="8">
						<Form>
							<FormGroup>
								<Label for="selectClass">Select a Class</Label>
								<Input type="select" id="selectClass" name="class">
							        <option>Class: 1</option>
							        <option>Class: 2</option>
							        <option>Class: 3</option>
							        <option>Class: 4</option>
							        <option>Class: 5</option>
							    </Input>
							</FormGroup>
							<FormGroup>
								<Label for="UploadDoc">Upload Documents</Label>
          						<Input type="file" name="paper" id="UploadDoc" />
							</FormGroup>
							<FormGroup>
								<Button>Submit</Button>
							</FormGroup>
						</Form>
					</Col>
					<Col xs="2">
						Empty Col
					</Col>
				</Row>
			</div>
		);
	}
}

export default Assignment;