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
					</Col>
					<Col xs="8">
						<Form>
							<FormGroup>
								<Label for="selectClass">Select Class</Label>
								<Input type="select" id="selectClass" name="class" required>
									<option></option>
							        <option value="1">Class: 1</option>
							        <option value="2">Class: 2</option>
							        <option value="3">Class: 3</option>
							        <option value="4">Class: 4</option>
							        <option value="5">Class: 5</option>
							    </Input>
							</FormGroup>
							<FormGroup class="uploadWrapper">
								<Label for="UploadDoc">Upload File</Label>
          						<Input type="file" name="paper" id="UploadDoc" required/>
							</FormGroup>
							<FormGroup>
								<Button>Submit</Button>
							</FormGroup>
						</Form>
					</Col>
					<Col xs="2">
					</Col>
				</Row>
			</div>
		);
	}
}

export default Assignment;