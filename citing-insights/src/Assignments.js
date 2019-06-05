import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import './css/App.css';
import './css/Assignment.css';


// Class to render our homepage
class Assignment extends Component{
	constructor(props){
	    super(props);
	    this.toggle = this.toggle.bind(this);
	    this.state = {
	      	dropdownOpen: false
	    };
	}

	toggle(){
	    this.setState(prevState => ({
	      	dropdownOpen: !prevState.dropdownOpen
	    }));
	}

	render(){
		return(
			/* So far our homepage is just a h1 tag with text */
			<div class="classes-container">
				<h1>Upload Assignment</h1>
				<Row>
					<Col xs="2">
						Empty Col
					</Col>
					<Col xs="8">
						<Form>
							<FormGroup>
								<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
							        <DropdownToggle caret>
							          Select a Class
							        </DropdownToggle>
							        <DropdownMenu class="ClassDropdown">
							          	<DropdownItem header>Select a Class
							          	</DropdownItem>
							          	<DropdownItem>Class One</DropdownItem>
							          	<DropdownItem>Class Two</DropdownItem>
							          	<DropdownItem>Class Three</DropdownItem>
							          	<DropdownItem>Class Four</DropdownItem>
							          	<DropdownItem>Class Five</DropdownItem>
							        </DropdownMenu>
							    </Dropdown>
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