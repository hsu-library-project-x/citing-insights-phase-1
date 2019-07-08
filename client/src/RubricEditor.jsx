import React, {Component} from 'react';
import {Input, Card, CardText, CardBody, CardTitle, Button} from 'reactstrap';
import "./css/RubricEditor.css";
import uniqueId from 'react-html-id';
import Cards from './Cards.jsx';

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
	      	needsSaving: true,
	      	uploading: false,
	      	idArray: []
	    }

	    uniqueId.enableUniqueIds(this);
	    this.buildEditor = this.buildEditor.bind(this);
	    this.buildRubric = this.buildRubric.bind(this);
	    this.renderActions = this.renderActions.bind(this);
	    this.reset = this.reset.bind(this);
	    this.sendRequest = this.sendRequest.bind(this);
	    this.saveCard = this.saveCard.bind(this);
	    this.onInput = this.onInput.bind(this);
	    this.fillButtonText = this.fillButtonText.bind(this);
	    this.addCard = this.addCard.bind(this);
	}

	fillButtonText(){
		if(this.state.needsSaving){
			return("Please Save Data before Building");
		}
		else{
			return("Build Rubric");
		}
	}

	onInput(){
		this.setState({
			needsSaving: true
		});
	}

	onChangeInput(info){
		alert(info);
		this.setState({
			needsSaving: true
		});
	}

	renderActions(){
		if(this.state.isEditing){
			//loop the value of rubric Size building a card for each one
			let loop = this.state.rubricSize;
			for(let i = 0; i < loop; i++){
				let newId = this.nextUniqueId();
				this.state.idArray[i] = newId;
				this.state.rubricArray.push(
					<Cards id={newId} onChange={this.onChangeInput.bind(this)}/>
				);		
			}
			//Create Add new Card clickable here... 
			//think how we are implementing cards here
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

	addCard(){
		let newId = this.nextUniqueId();
		this.state.idArray.push(newId);
		let cardStorage = document.getElementById("cardStorage");

	}

	reset(){
		this.setState({
			isEditing: false,
			rubricSize: 0,
			rubricArray: [],
			rubricData: [],
			needsSaving: true
		});
	}

	//Saves the Current Information in the Card
	saveCard(){	
		//grabs information in the card and stores it in the Rubric Array state
		let rubricTitle = document.getElementById("rubricTitle");
		if(rubricTitle.value === ""){
			alert("Please enter a title for your rubric");
			return;
		}

		for(let i = 0; i < this.state.idArray.length; i++){
			let id = this.state.idArray[i];
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
						'{ "cardTitle": '+ title +' },' +
						'{ "cardText": '+ text +' }' + 
					']}';
					this.state.rubricData.push(cardData);
				}
				else{
					const cardData = '{ "card'+ cardNum +'" : [' +
						'{ "cardTitle": '+ title +' },' +
						'{ "cardText": '+ text +' }' + 
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
		let rubricTitle = document.getElementById("rubricTitle");
		//Grab all the information from the Rubric Data Array
		//Compile this information into a JSON File
		let jsonData = JSON.stringify(this.state.rubricData);
		this.setState.uploading = true;
		const promise = [];
		//Start the HTTP Requests with promises
		promise.push(this.sendRequest(rubricTitle.value, jsonData));
		try{
			this.setState({
				uploading: false
			});
		}
		catch (e){
			//errorcatching here
			this.setState({
				uploading: false			
			});
		}
	}

	sendRequest(rubricTitle, data){
		return new Promise((resolve, reject) => {
			const req = new XMLHttpRequest();
			const formData = new FormData();
			formData.append(rubricTitle, data);
			req.open("POST", "http://localhost:5000/addRubric");
			req.send(formData);
		 });
	}


	render(){
		return(
			<div className={`rubricEdit-container`}>
				{(!this.state.isEditing) ? <Editor /> : 
					<div className={`${this.state.needsSaving ? "warnHighlight" : "safeHighlight"}`} id="cardStorage">
						<Input type="text" id="rubricTitle" placeholder="Type Rubric Title Here"/>
						<button className={'cardAddButton'} onClick={this.addCard}>+</button>
						{this.renderActions()}
					</div>

				}
				{(!this.state.isEditing) ? <Button id="rubEditButton" onClick={this.buildEditor}>Submit</Button> : 
					<div class="rubricButtonContainer">
						<Button color="success" onClick={ () => this.saveCard()}>Save Cards</Button>
						<button disabled={this.state.needsSaving} id="rubBuildButton" onClick={this.buildRubric}>{this.fillButtonText()}</button>
						<button id="backSelect" onClick={this.reset}>Back</button>
					</div>
				}
			</div>
		);
	}
}

export default RubricEditor