import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import { Input, Card, CardBody, Button } from 'reactstrap';
import "./css/RubricEditor.css";
import uniqueId from 'react-html-id';
import update from 'immutability-helper';

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
			editPopulated: false,
			curId: ""
		};

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
		var that = this;

		for (let i = 0; i < curRubrics.length; i++) {
			if (curRubrics[i]._id === curId) {
				fetch('http://localhost:5000/rubrics/' + curId, {
					method: 'Delete',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
				})
					.then(function (response) {
						that.getRubrics()
					});
			}
		}
	}

	//calls when the isEditing state is changed
	renderActions() {
		if (this.state.isEditing) {
			if (this.state.rubricExists && !this.state.currentlyEditing) {
				const getRubric = this.state.AvailableRubrics;
				let curCards = [];
				for (let j = 0; j < getRubric.length; j++) {
					if (getRubric[j]._id === this.state.currentRubric) {
						this.setState({
							curId: getRubric[j]._id
						});
						curCards = getRubric[j].cards;
						for (let i = 0; i < curCards.length; i++) {
							let newId = this.nextUniqueId();

							//CHANGE THIS ************************************************************************************
							this.state.idArray[i] = newId;

							// this.setState({
							// 	idArray: update(this.state.idArray, {
							// 		[i]: { $set: newId }
							// 	})
							// });

							let curCard = curCards[i];
							
							this.state.cards.push(curCard["card" + i]);

							
							console.log(this.state.cards[i]);
							//console.log(curCard["card" + i]);
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

					//CHANGE THIS ************************************************************************************
					this.state.idArray[i] = newId;

					// this.setState({
					// 	idArray: update(this.state.idArray, {
					// 		[i]: { $set: newId }
					// 	})
					// });

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

	async getRubrics() {
		var that = this;
		//replace hardcoded number with userID from login
		fetch('http://localhost:5000/rubrics/' + this.props.user._id)
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				that.setState({ AvailableRubrics: myJson });
			});
	}

	//checks before the component mounts
	componentDidMount() {
		this.getRubrics()
		.then(() => {
			if(this.state.AvailableRubrics === []){

			}
		});
		
	}

	getDefaultRubric(){
		const defaultRubric = {
			"cards": [
				{
					"cardTitle": "Capstone 4",
					"cardText": "Effectively defines the scope of the research question or thesis. Effectively determines key conceptsTypes of information (sources) selected directly relate to concepts or answer research question"
				},				
				{
					"cardTitle": "Milestone 3",
					"cardText": "Defines the scope of the research question or thesis completely. Can determine key concepts. Types of information (sources) selected relate to concepts or answer research question."
				},				
				{
					"cardTitle": "Milestone 2",
					"cardText": "Defines the scope of the research question or thesis incompletely (parts are missing, remains too broad or too narrow, etc.). Can determine key concepts. Types of information (sources) selected partially relate to concepts or answer research question."
				},				
				{
					"cardTitle": "Benchmark 1",
					"cardText": "Has difficulty defining the scope of the research question or thesis. Has difficulty determining key concepts. Types of information (sources) selected do not relate to concepts or answer research question."
				}
			]

		}
	}
	//toggles editor enabling editing or adding new rubrics
	buildEditor() {
		let numCards = document.getElementById("rubricChoice").value;
		this.setState({ rubricSize: numCards });
		//CHANGE THIS ************************************************************************************
		this.state.isEditing = !this.state.isEditing;
	}

	//called when user wants to back out without saving
	reset() {
		this.setState({
			isEditing: false,
			rubricExists: false,
			currentlyEditing: false,
			editPopulated: false,
			currentRubric: "",
			editingTitle: "",
			curId: "",
			cards: [],
			rubricArray: []
		})
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

					// let cardIdentifier = "card" + cardNum;

					// const cardData = {};
					// cardData[cardIdentifier] = cardInfo;
					// console.log(cardData);

					this.state.rubricData.push(cardInfo);
				}
				else {
					const cardInfo = {
						"cardTitle": title,
						"cardText": text
					};

					// let cardIdentifier = "card" + cardNum;

					// const cardData = {};
					// cardData[cardIdentifier] = cardInfo;
					// console.log(cardData);

					//CHANGE THIS ************************************************************************************
					this.state.rubricData.push(cardInfo);
					// this.setState({
					// 	rubricData: update(this.state.rubricData, {
					// 		[cardNum]: { $set: cardData }
					// 	})
					// });
				}
			}
		}
		this.setState({
			needsSaving: false
		});
	}

	//sends data to the server
	buildRubric() {
		let rubricTitle = document.getElementById("rubricTitle");
		//Grab all the information from the Rubric Data Array
		//Compile this information into a JSON File
		this.setState.uploading = true;

		const promise = [];
		//Start the HTTP Requests with promises
		if (this.state.rubricExists) {
			promise.push(this.updateRequest(rubricTitle.value, this.state.rubricData));
		} else {
			promise.push(this.sendRequest(rubricTitle.value, this.state.rubricData));
		}
		try {
			this.props.history.push({
				pathname: "/tasks/",
				props: { ...this.state }
			});
			alert("Rubric Successfuly Built");
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
		var that = this;
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
			}, that.getRubrics());
		});
	}

	//updating an existing rubric
	updateRequest(rubricTitle, data) {
		return new Promise((resolve, reject) => {
			const newdata = {
				"name": rubricTitle,
				"cards": data,
				"user_id": this.props.user._id
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
						<Button id="rubEditButton" onClick={this.buildEditor}>Submit</Button>
						rubrics						<h3> -OR- </h3>
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
						<button id="backSelect" onClick={this.reset}>Back</button>
						<button id="rubBuildButton" disabled={this.state.needsSaving} onClick={this.buildRubric}>{this.fillButtonText()}</button>
						<button id="saveCards" onClick={() => this.saveCard()}>Save Cards</button>
					</div>
				}
			</div>
		);
	}
}

export default withRouter(RubricEditor);