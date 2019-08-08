import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Input, Card, CardBody, Button } from 'reactstrap';
import "./css/RubricEditor.css";
import uniqueId from 'react-html-id';

class RubricEditor extends Component {

	constructor(props) {
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
		};

		uniqueId.enableUniqueIds(this);
		this.buildEditor = this.buildEditor.bind(this);
		this.buildRubric = this.buildRubric.bind(this);
		this.renderActions = this.renderActions.bind(this);
		this.sendRequest = this.sendRequest.bind(this);
		this.updateRequest = this.updateRequest.bind(this);
		this.saveCard = this.saveCard.bind(this);
		this.onInput = this.onInput.bind(this);
		this.fillButtonText = this.fillButtonText.bind(this);
		this.handleEditRubric = this.handleEditRubric.bind(this);
		this.handleDeleteRubric = this.handleDeleteRubric.bind(this);
		this.getRubrics = this.getRubrics.bind(this);
		this.changeEditingStatus = this.changeEditingStatus.bind(this);
		this.changeEditingStatusRevert = this.changeEditingStatusRevert.bind(this);
	}

	//checks before the component mounts
	componentDidMount() {
		this.getRubrics();
	}

	componentDidUpdate(prevProps, prevState) {
		if(prevState !== this.state){
			
		}
	}

	//handles change of button text
	fillButtonText() {
		if (this.state.needsSaving) {
			return ("Please Save Data before Building");
		}
		else {
			return ("Build Rubric");
		}
	}

	//ensures that the rubric is saved before submitting
	onInput() {
		this.setState({
			needsSaving: true
		});
	}

	//ensures that the rubric is saved before submitting
	onChangeInput(info) {
		this.setState({
			needsSaving: true
		});
	}

	changeEditingStatus() {
		this.setState({
			isEditing: !this.state.isEditing,
		}, 	this.getRubrics())
	}

	changeEditingStatusRevert(){
		this.setState({
			isEditing: false,
			rubricSize: 0,
			rubricArray: [],
			currentlyEditing: false
		}, this.getRubrics())
	}

	getRubrics() {
		var that = this;
		//replace hardcoded number with userID from login
		fetch('http://localhost:5000/rubrics/' + this.props.user.id)
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				that.setState({
					AvailableRubrics: myJson
				});
			});
	}

	//called when clicking on the rubric list
	handleEditRubric(event) {
		const curRubrics = this.state.AvailableRubrics;
		const target = event.target;
		const curId = target.id;
		for (let i = 0; i < curRubrics.length; i++) {
			if (curRubrics[i]._id === curId) {
				this.setState({
					rubricExists: true,
					currentRubric: curId,
					isEditing: true,
					editingTitle: curRubrics[i].name
				});
			}
		}
	}

	//handles deleting a rubric
	handleDeleteRubric(event) {
		const curRubrics = this.state.AvailableRubrics;
		const target = event.target;
		const curId = target.id;
		let self = this;

		if (window.confirm("Are you sure you wish to delete this rubric?")) {
			for (let i = 0; i < curRubrics.length; i++) {
				if (curRubrics[i]._id === curId) {
					fetch('http://localhost:5000/rubrics/' + curId, {
						method: 'Delete',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
					}).then((response) => {
						self.getRubrics();
					});
				}
			}
		}
	}

	//after cards are built, if editing, will populate the values with the selected rubric's values
	populateEdit() {
		if (this.state.currentlyEditing && !this.state.editPopulated) {
			document.getElementById("rubricTitle").value = this.state.editingTitle;
			for (let i = 0; i < this.state.idArray.length; i++) {
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

	//toggles editor enabling editing or adding new rubrics
	buildEditor() {
		let numCards = document.getElementById("rubricChoice").value;
		this.setState({ rubricSize: numCards });
		this.changeEditingStatus();
		this.renderActions();
	}

	//Saves the Current Information in the Card
	saveCard() {
		//grabs information in the card and stores it in the Rubric Array state
		let rubricTitle = document.getElementById("rubricTitle");
		if (rubricTitle.value === "") {
			alert("Please enter a title for your rubric");
			return;
		}

		for (let i = 0; i < this.state.idArray.length; i++) {
			let id = this.state.idArray[i];
			let cardNum = i;
			let titleid = "Title-" + id;
			let textid = "Text-" + id;
			let title = document.getElementById(titleid).value;
			let text = document.getElementById(textid).value;

			//If any of them are empty, run an error
			if (title === "" || text === "") {
				//error Handling
				alert("Please Enter a Value for either the title or text");
				return;
			}
			else {
				let dummyArray = this.state.rubricData;
				if (dummyArray.length === 0 || dummyArray[cardNum] === null) {

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
				else {
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
		this.getRubrics();
		this.setState({
			needsSaving: false
		});
	}

	//sends data to the server
	buildRubric() {
		let rubricTitle = document.getElementById("rubricTitle");
		//Grab all the information from the Rubric Data Array
		//Compile this information into a JSON File

		this.setState({
			uploading: true
		});

		const promise = [];
		//Start the HTTP Requests with promises
		if (this.state.rubricExists) {
			promise.push(this.updateRequest(rubricTitle.value, this.state.rubricData));
		} else {
			promise.push(this.sendRequest(rubricTitle.value, this.state.rubricData));
		}



		try {
			this.changeEditingStatusRevert();
		}
		catch (e) {
			//errorcatching here
			this.setState({
				uploading: false
			});
		}
	}

	//adding a new rubric
	sendRequest(rubricTitle, data) {
		return new Promise((resolve, reject) => {
			const newdata = {
				"name": rubricTitle,
				"cards": data,
				"user_id": this.props.user.id
			}
			let dataString = JSON.stringify(newdata);
			fetch('http://localhost:5000/rubrics', {
				method: 'POST',
				body: dataString,
				mode: 'cors',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			});
		});
	}

	//updating an existing rubric
	updateRequest(rubricTitle, data) {
		return new Promise((resolve, reject) => {
			const newdata = {
				"name": rubricTitle,
				"cards": data,
				"user_id": this.props.user.id
			}
			let dataString = JSON.stringify(newdata);
			fetch('http://localhost:5000/rubrics/' + this.state.curId, {
				method: 'PUT',
				body: dataString,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			});
		});
	}

	//calls when the isEditing state is changed
	renderActions() {

		var array = [];
		//if user is editing the rubrics
		if (this.state.isEditing) {
			//signifies user is editing an existing rubric
			if (this.state.rubricExists && !this.state.currentlyEditing) {
				//grab the users rubrics
				const getRubric = this.state.AvailableRubrics;
				//define an array to hold the cards belonging to an individual rubric
				let curCards = [];
				//Loop through all the user's rubrics 
				for (let j = 0; j < getRubric.length; j++) {
					//and find the one corresponding to the current(desired) rubric
					if (getRubric[j]._id === this.state.currentRubric) {

						//then grab the cards from our found rubric
						curCards = getRubric[j].cards;

						//and loop through those cards
						for (let i = 0; i < curCards.length; i++) {

							//why
							let newId = this.nextUniqueId();
							
							//why / WRONG
							this.state.idArray[i] = newId;

							//grab a single card
							let curCard = curCards[i];

							//WRONG
							//Push the current card into our deck of cards in state
							this.state.cards.push(curCard["card" + i]);


							//WRONG
							this.state.rubricArray.push(
								<div className={`cardContainer`}>
									<Card>
										<CardBody>
											{/* <CardTitle for={"Title-"+newId}>Rubric Item Title</CardTitle> */}
											<Input name={i} onInput={this.onInput} type="text" id={"Title-" + newId} class="rubricTitles" />
											{/* <CardText for={"Text-"+newId}>Rubric Descriptions</CardText> */}
											<Input name={i} onInput={this.onInput} type="textarea" id={"Text-" + newId} class="rubricDescriptions" />
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
			} else {
				//loop the value of rubric Size building a card for each one
				let loop = this.state.rubricSize;
				for (let i = 0; i < loop; i++) {
					let newId = this.nextUniqueId();							
					//why / WRONG
					this.state.idArray[i] = newId;
					//WRONG
					this.state.rubricArray.push(
						<div className={`cardContainer `}>
							<Card>
								<CardBody>
									{/* <CardTitle for={"Title-"+newId}>Rubric Item Title</CardTitle> */}
									<Input placeholder="Enter Rubric Item Name ...." onInput={this.onInput} type="text" id={"Title-" + newId} class="rubricTitles" />
									{/* <CardText for={"Text-"+newId}>Rubric Descriptions</CardText> */}
									<Input placeholder="Enter Rubric Item Description ...." onInput={this.onInput} type="textarea" id={"Text-" + newId} class="rubricDescriptions" />
								</CardBody>
							</Card>
						</div>
					);
				}
			}
			//Create Add new Card clickable here... 
			//think how we are implementing cards here
			var array = this.state.rubricArray;
			return (array);
		}
	}



	//renders the page
	render() {
		let rubrics = this.state.AvailableRubrics;
		let rubricList = rubrics.map((rubric) =>
			<div>
				<li onClick={this.handleEditRubric} class="classLi" id={rubric._id}>{rubric.name}</li>
				<button class="deleteButton" onClick={this.handleDeleteRubric}>
					<svg id={rubric._id} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path id={rubric._id} d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /></svg>
				</button>
			</div>
		);

		return (
			<div className={`rubricEdit-container`}>
				<h1>Rubric Editor</h1>
				{(!this.state.isEditing) ?
					<div class="numCardsSelector">
						<h3 class="rubricEditHeader">Create New:</h3>
						{/* <p> Number of Rubric Elements</p> */}
						<Input type="number" placeholder="Number of Rubric Elements from 1-10" name="rubricElements" id="rubricChoice" min="1" max="10">
						</Input>
						<Button id="rubEditButton" onClick={() => this.buildEditor()}>Submit</Button>
						<h3> -OR- </h3>
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
						<button id="backSelect" onClick={() => this.changeEditingStatusRevert()}>Back</button>
						<button id="rubBuildButton" disabled={this.state.needsSaving} onClick={() => this.buildRubric()}>{this.fillButtonText()}</button>
						<button id="saveCards" onClick={() => this.saveCard()}>Save Cards</button>
					</div>
				}
			</div>
		);
	}
}

export default withRouter(RubricEditor);