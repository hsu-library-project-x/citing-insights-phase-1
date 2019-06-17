import React, {Component} from 'react';
import {Label, Input, Card, CardText, CardBody, CardTitle, Button} from 'reactstrap';
import "./css/RubricEditor.css";
import uniqueId from 'react-html-id';

const IdNum = 0;


const Editor = () => (
	<div class="numCardsSelector">
		<p>Choose the number of Rubric Elements</p>
		<Input type="select" name="rubricElements" id="rubricChoice">
			<option value="1">1 card</option>
			<option value="2">2 cards</option>
			<option value="3">3 cards</option>
			<option value="4">4 cards</option>
			<option value="5">5 cards</option>
			<option value="6">6 cards</option>
			<option value="7">7 cards</option>
			<option value="8">8 cards</option>
			<option value="9">9 cards</option>
		</Input>
	</div>
)



class RubricEditor extends Component{

	constructor(props){
		super(props);
		this.state = {
	      	rubricSize: 0,
	      	rubricArray: [],
	      	rubricData: [],
	      	isEditing: false,
	      	isSelecting: true,
	      	needsSaving: true
	    }
	    uniqueId.enableUniqueIds(this);
	    this.buildEditor = this.buildEditor.bind(this);
	    this.buildRubric = this.buildRubric.bind(this);
	    this.renderActions = this.renderActions.bind(this);
	    this.reset = this.reset.bind(this);
	    this.sendRequest = this.sendRequest.bind(this);
	    this.saveCard = this.saveCard.bind(this);
	}

	renderActions(){
		if(this.state.isEditing){
			//loop the value of rubric Size building a card for each one
			const idArray = [];
			let loop = this.state.rubricSize;
			for(let i = 0; i < loop; i++){
				idArray[i] = this.nextUniqueId();
				this.state.rubricArray.push(
					<div className={`cardContainer ${this.state.needsSaving ? "warnHighlight" : "safeHighlight"}`}>
						<Card>
							<CardBody>
								<CardTitle for={"Title-"+idArray[i]}>Rubric Item Title</CardTitle>
								<Input type="text" id={"Title-"+idArray[i]} class="rubricTitles"/>
								<CardText for={"Text-"+idArray[i]}>Rubric Descriptions</CardText>
								<Input type="textarea" id={"Text-"+idArray[i]} class="rubricDescriptions"/>
							</CardBody>
						</Card>
					</div>
				);		
			}
			this.state.rubricArray.push(<Button color="success" onClick={ () => this.saveCard(idArray)}>Save Cards</Button>)
			var array = this.state.rubricArray;
			return(array);
		}
	}

	buildEditor(){
		let numCards = document.getElementById("rubricChoice").value;
		this.setState({rubricSize: numCards});
		//this.state.
		this.state.isEditing = !this.state.isEditing;
	}

	reset(){
		this.setState({
			isEditing: false,
			rubricSize: 0,
			rubricArray: [],
			rubricData: [],
		});
	}

	//Saves the Current Information in the Card
	saveCard(idArray){	
		//grabs information in the card and stores it in the Rubric Array state
		for(let i = 0; i < idArray.length; i++){
			let id = idArray[i];
			let cardNum = i;
			let titleid = "Title-"+id;
			let textid="Text-"+id;
			let title = document.getElementById(titleid).value;
			let text = document.getElementById(textid).value;

			//If any of them are empty, run an error
			if(title === "" || text === ""){
				//error Handling
				alert("Please Enter a Value for either the title or text");
				return;
			}
			else{
				let dummyArray = this.state.rubricData;
				if(dummyArray.length === 0 || dummyArray[cardNum] === null){
					const cardData = '{ "card'+ cardNum +'" : [' +
						'{ "rubricTitle": '+ title +' },' +
						'{ "rubricText": '+ text +' }' + 
					']}';
					this.state.rubricData.push(cardData);
				}
				else{
					const cardData = '{ "card'+ cardNum +'" : [' +
						'{ "rubricTitle": '+ title +' },' +
						'{ "rubricText": '+ text +' }' + 
					']}';
					this.state.rubricData[cardNum] = cardData;
				}
			}
		}
		this.setState({
			needsSaving: false
		});

	}

	//sends data to the server
	buildRubric(){
		//Grab all the information from the Rubric Data Array

		//Compile this information into a JSON File
		//Start the HTTP Requests with promises
	}

	sendRequest(){

	}

	render(){
		return(
			<div className={`rubricEdit-container`}>
				{(!this.state.isEditing) ? <Editor /> : 
					<div id="cardStorage">
						<Label for="rubricTitle">Rubric Title</Label>
						<Input type="text" id="rubricTitle" placeholder="Type Rubric Title Here"/>
						{this.renderActions()}
					</div>
				}
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