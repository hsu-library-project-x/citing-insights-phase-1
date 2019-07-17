import React, {Component} from 'react';
import {Input, Card, CardText, CardBody, CardTitle, Button} from 'reactstrap';
import "./css/RubricEditor.css";
import uniqueId from 'react-html-id';
//import Cards from './Cards.jsx';

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
	      	idArray: [],
	      	AvailableRubrics: [],
	      	rubricExists: false,
					currentRubric: "",
					editingTitle: "",
					cards: [],
					currentlyEditing: false,
					editPopulated: false
	    }

	    uniqueId.enableUniqueIds(this);
	    this.buildEditor = this.buildEditor.bind(this);
	    this.buildRubric = this.buildRubric.bind(this);
	    this.renderActions = this.renderActions.bind(this);
	    this.reset = this.reset.bind(this);
	    this.sendRequest = this.sendRequest.bind(this);
	    this.updateRequest = this.updateRequest.bind(this);
	    this.saveCard = this.saveCard.bind(this);
	    this.onInput = this.onInput.bind(this);
	    this.fillButtonText = this.fillButtonText.bind(this);
			this.handleEditRubric = this.handleEditRubric.bind(this);
			this.handleDeleteRubric = this.handleDeleteRubric.bind(this);
			this.handleFieldChange = this.handleFieldChange.bind(this);
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

	handleEditRubric(event){
		const curRubrics = this.state.AvailableRubrics;
		const target = event.target;
		const curId = target.id;
		for(let i = 0; i < curRubrics.length; i++){
			if(curRubrics[i]._id === curId){
				this.setState({
					rubricExists: true,
					currentRubric: curId,
					isEditing: true,
					editingTitle: curRubrics[i].name
				});
			}
		}
	}

	handleDeleteRubric(event){
		const curRubrics = this.state.AvailableRubrics;
		const target = event.target;
		const curId = target.id;
		for(let i = 0; i < curRubrics.length; i++){
			if(curRubrics[i]._id === curId){
				fetch('http://localhost:5000/rubrics/' + curId, {
		      method: 'Delete',
		      headers:{
		        'Accept': 'application/json',
		        'Content-Type': 'application/json'
		      },
		  	});
		  }
		}
		window.location.reload();
	}

	handleFieldChange(event){
		const target = event.target;
		this.state.cards[target.name].cardText = target.value;

		console.log(this.state.cards[target.name].cardText);
	}

	renderActions(){
		if(this.state.isEditing){
			if(this.state.rubricExists && !this.state.currentlyEditing){
				const getRubric = this.state.AvailableRubrics;
				let curCards = [];
				let curTitle = [];
				for(let j = 0; j < getRubric.length; j++){
					if(getRubric[j]._id === this.state.currentRubric){
						this.setState({
							curId: getRubric[j]._id
						});
						curCards = getRubric[j].cards;
						for(let i = 0; i < curCards.length; i++){
							let newId = this.nextUniqueId();
							this.state.idArray[i] = newId;
							let curCard = curCards[i];
							this.state.cards.push(curCard["card" + i]);
							console.log(this.state.cards[i]);
							//console.log(curCard["card" + i]);
							this.state.rubricArray.push(
								<div className={`cardContainer`}>
									<Card>
										<CardBody>
											<CardTitle for={"Title-"+newId}>Rubric Item Title</CardTitle>
											<Input name={i} onInput={this.onInput} type="text" id={"Title-"+newId} class="rubricTitles"/>
											<CardText for={"Text-"+newId}>Rubric Descriptions</CardText>
											<Input name={i} onInput={this.onInput} type="textarea" id={"Text-"+newId} class="rubricDescriptions"/>
										</CardBody>
									</Card>
								</div>
							);
						}
					}
				}
				
				this.setState({
					currentlyEditing: true
				});
			}else{
				//loop the value of rubric Size building a card for each one
				let loop = this.state.rubricSize;
				for(let i = 0; i < loop; i++){
					let newId = this.nextUniqueId();
					this.state.idArray[i] = newId;
					this.state.rubricArray.push(
						<div className={`cardContainer `}>
							<Card>
								<CardBody>
									<CardTitle for={"Title-"+newId}>Rubric Item Title</CardTitle>
									<Input onInput={this.onInput} type="text" id={"Title-"+newId} class="rubricTitles"/>
									<CardText for={"Text-"+newId}>Rubric Descriptions</CardText>
									<Input onInput={this.onInput} type="textarea" id={"Text-"+newId} class="rubricDescriptions"/>
								</CardBody>
							</Card>
						</div>
					);		
				}
			}
			//Create Add new Card clickable here... 
			//think how we are implementing cards here
			var array = this.state.rubricArray;
			return(array);
		}
	}

	populateEdit(){
		if(this.state.currentlyEditing && !this.state.editPopulated){
			document.getElementById("rubricTitle").value = this.state.editingTitle;
			for(let i = 0; i < this.state.idArray.length; i++){
				let title = "Title-" + this.state.idArray[i];
				let text = "Text-" + this.state.idArray[i];

				document.getElementById(title).value = this.state.cards[i].cardTitle;
				document.getElementById(text).value = this.state.cards[i].cardText;
			}
			this.setState({
				editPopulated: true
			});
		}	
	}

	componentWillMount() {
    var that = this;
    fetch('http://localhost:5000/rubrics')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        that.setState({AvailableRubrics: myJson});
    });
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
			needsSaving: true,
			rubricExists: false,
			currentlyEditing: false,
			currentRubric: "",
			editingTitle: "",
			cards: []
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

					const cardInfo = {
						"cardTitle": title,
						"cardText": text
					};

					let cardIdentifier = "card" + cardNum;

					const cardData = {};
					cardData[cardIdentifier] = cardInfo;
					console.log(cardData);

					this.state.rubricData.push(cardData);
				}
				else{
					const cardInfo = {
						"cardTitle": title,
						"cardText": text
					};

					let cardIdentifier = "card" + cardNum;

					const cardData = {};
					cardData[cardIdentifier] = cardInfo;
					console.log(cardData);

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
		this.setState.uploading = true;

		const promise = [];
		//Start the HTTP Requests with promises
		if(this.state.rubricExists){
			promise.push(this.updateRequest(rubricTitle.value, this.state.rubricData));
		}else{
			promise.push(this.sendRequest(rubricTitle.value, this.state.rubricData));
		}
		try{
			window.location.reload();
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
			const newdata = {
				"name": rubricTitle,
				"cards": data,
				"user_id": "5d26304f97d65677327b7e56"
			}
			let dataString = JSON.stringify(newdata);
			fetch('http://localhost:5000/rubrics', {
	      method: 'POST',
	      body: dataString,
	      mode: 'cors',
	      headers:{
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
		  });
		});
	}

	updateRequest(rubricTitle, data){
		return new Promise((resolve, reject) => {
			const newdata = {
				"name": rubricTitle,
				"cards": data,
				"user_id": "5d26304f97d65677327b7e56"
			}
			let dataString = JSON.stringify(newdata);
			fetch('http://localhost:5000/rubrics/' + this.state.curId, {
	      method: 'PUT',
	      body: dataString,
	      headers:{
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
		  });
		});
	}

	render(){
		let rubrics = this.state.AvailableRubrics;
		let rubricList = rubrics.map((rubric) => 
			<div>
      	<li onClick={this.handleEditRubric} class="classLi" id={rubric._id}>{rubric.name}</li>
	      <button class="deleteButton"  onClick={this.handleDeleteRubric}>
	        <svg  id={rubric._id} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path id={rubric._id} d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
	      </button>
      </div>
		);

		return(
			<div className={`rubricEdit-container`}>
				<h2>Rubric Editor</h2>
				{(!this.state.isEditing) ? 
					<div class="numCardsSelector">
						<h3 class="rubricEditHeader">Create New:</h3>
						<p>Choose the number of Rubric Elements</p>
						<Input type="number" placeholder="1-10" name="rubricElements" id="rubricChoice" min="1" max="10">
						</Input>
						<Button id="rubEditButton" onClick={this.buildEditor}>Submit</Button>
						<h3 class="rubricEditHeader">Edit Existing:</h3>
						<ul class="currentRubrics">
							{rubricList}
						</ul>
					</div> : 
					<div className={`${this.state.needsSaving ? "warnHighlight" : "safeHighlight"}`} id="cardStorage">
						<Input type="text" id="rubricTitle" placeholder="Type Rubric Title Here" />
						<hr />
						{this.renderActions()}
						{this.populateEdit()}
					</div>
				}
				{(!this.state.isEditing) ? <h4>Please select a rubric from the list or create a new one to get started.</h4> : 
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