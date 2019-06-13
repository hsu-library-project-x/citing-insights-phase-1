import React, {Component} from 'react';
import {Label, Input, Card, CardText, CardBody, CardTitle, Button} from 'reactstrap';


const Rubric = () => (
	<div class="rubricContainer">
		<Card>
			<CardBody>
				<CardTitle>Rubric Component</CardTitle>
				<CardText>Text about what this Rubric Component is goes here</CardText>
					<Label for="rubricValue">Score</Label>
					<Input type="select" name="select" id="rubricValue">
						<option>1</option>
						<option>2</option>
						<option>3</option>
						<option>4</option>
						<option>5</option>
					</Input>
			</CardBody>
		</Card>
	</div>
)

const Editor = () => (
	<div>
		<p>Choose the number of Rubric Elements (No more than 9)</p>
		<Input type="select" name="rubricElements" id="rubricChoice">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
		</Input>
	</div>
)

class RubricEditor extends Component{

	constructor(props){
		super(props);
		this.state = {
	      	rubricArray: "",
	      	isEditing: false
	    }

	    this.buildEditor = this.buildEditor.bind(this);
	    this.buildRubric = this.buildRubric.bind(this);
	    this.renderActions = this.renderActions.bind(this);
	}

	renderActions(){
		if(this.state.isEditing){
			//loop the value of rubric Array building a card for each one

			//Hide the selector to prevent overwrighting the number of cards

			//Build the connection to server, sending server the details of the rubric and cards
		}
	}

	buildEditor(){
		let numCards = document.getElementById("rubricChoice").value;
		this.state.rubricArray = numCards;
		this.state.isEditing = !this.state.isEditing;
	}

	buildRubric(){

	}

	render(){
		return(
			<div class="rubricEdit-container classes-container">
				{(!this.state.isEditing) ? <Editor /> : <div id="cardStorage">{this.renderActions()}</div>}
				{(!this.state.isEditing) ? <Button id="rubEditButton" onClick={this.buildEditor}>Submit</Button> : <Button id="rubBuildButton" onClick={this.buildRubric}>Build Rubric</Button>}
			</div>
		);
	}
}

export default RubricEditor