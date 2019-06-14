import React, {Component} from 'react';
import {Label, Input, Card, CardText, CardBody, CardTitle, Button} from 'reactstrap';
import "./css/RubricEditor.css";
import uniqueId from 'react-html-id';

const IdNum = 0;


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
	      	rubricSize: 0,
	      	rubricArray: [],
	      	isEditing: false,
	      	isSelecting: true
	    }

	    uniqueId.enableUniqueIds(this)

	    this.buildEditor = this.buildEditor.bind(this);
	    this.buildRubric = this.buildRubric.bind(this);
	    this.renderActions = this.renderActions.bind(this);
	    this.reset = this.reset.bind(this);
	}



	renderActions(){
		if(this.state.isEditing){
			//loop the value of rubric Size building a card for each one
			let loop = this.state.rubricSize;
			for(let i = 0; i < loop; i++){
				this.state.rubricArray.push(
					<Card>
						<CardBody>
							<CardTitle for={this.nextUniqueId()}>Rubric Item Title</CardTitle>
							<Input type="text" id={"Title-"+this.lastUniqueId()} class="rubricTitles"/>
							<CardText for={this.nextUniqueId()}>Rubric Descriptions</CardText>
							<Input type="textarea" id={"Text-"+this.lastUniqueId()} class="rubricDescriptions"/>
						</CardBody>
					</Card>
				);		
			}
			var array = this.state.rubricArray;
			return(array);
			//Hide the selector to prevent overwrighting the number of cards

			//Build the connection to server, sending server the details of the rubric and cards
		}
	}

	buildEditor(){
		let numCards = document.getElementById("rubricChoice").value;
		this.setState({rubricSize: numCards});
		this.state.isEditing = !this.state.isEditing;
	}

	reset(){
		this.setState({
			isEditing: false,
			rubricSize: 0,
			rubricArray: []
		});
	}

	buildRubric(){

	}

	render(){
		return(
			<div class="rubricEdit-container classes-container">
				{(!this.state.isEditing) ? <Editor /> : <div id="cardStorage">{this.renderActions()}</div>}
				{(!this.state.isEditing) ? <Button id="rubEditButton" onClick={this.buildEditor}>Submit</Button> : 
					<div class="rubricButtonContainer">
						<Button id="rubBuildButton" onClick={this.buildRubric}>Build Rubric</Button>
						<Button id="backSelect" onClick={this.reset}>Back</Button>
					</div>
				}
			</div>
		);
	}
}

export default RubricEditor