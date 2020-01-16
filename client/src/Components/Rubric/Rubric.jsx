import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
	Container, Grid, TextField, InputLabel, Select, MenuItem, List, ListItem, Card, FormControl, Typography,
	Button, IconButton, Checkbox, Tooltip, Toolbar, Link, ListItemSecondaryAction, CardContent
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import defaultRubricsJson from '../../default_rubrics/defaultRubric.json';

class Rubric extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rubricData: [],
			rubricElements: null,
			rubricTitle: "",
			isEditing: false,
			AvailableRubrics: [],
			rubricExists: false,
			selectedRubric: "",
			currentlyEditing: false,
			checked: [],
		};

		this.getRubrics();

		this.handleEditState = this.handleEditState.bind(this);
		this.handleStandardInputChange = this.handleStandardInputChange.bind(this);
		this.buildCards = this.buildCards.bind(this);
		this.reset = this.reset.bind(this);
		this.sendRequest = this.sendRequest.bind(this);
		this.updateRequest = this.updateRequest.bind(this);
		this.handleRubricSubmit = this.handleRubricSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleEditRubric = this.handleEditRubric.bind(this);
		this.handleDeleteRubric = this.handleDeleteRubric.bind(this);
		this.handleDefaultRubric = this.handleDefaultRubric.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		let rubricData = this.state.rubricData;
		rubricData[name] = value;
		this.setState({
			rubricData:rubricData
		});
	}

	handleStandardInputChange(event){
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]:value
		});
	}

	handleDefaultRubric(event) {
		let that = this;

		let defaultRubric = defaultRubricsJson[event.target.value];
		defaultRubric.user_id = this.props.user.id;

		const defaultString = JSON.stringify(defaultRubric);
		fetch('/rubrics/', {
			method: 'POST',
			body: defaultString,
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(function (response)  {
			if (response.status === 201 ){
				alert("Rubric Added");
			}
			else {
				alert("could not add rubric");
			}
		}).then(()=> that.getRubrics())

	}

	//called when clicking on the rubric list
	handleEditRubric(event) {
		const target = event.target;
		const curId = target.id;
		let rubric = null;

		this.state.AvailableRubrics.forEach( function(r) {
			if (r._id === curId){
				rubric = r;
			}
		});

		let rubricData = {};

		rubric.cards.forEach(c=>{
			rubricData[`cardTitle-${rubric.cards.indexOf(c)}`] = c.cardTitle;
			rubricData[`cardText-${rubric.cards.indexOf(c)}`] = c.cardText;
		});


		this.setState({
			rubricExists: true,
			selectedRubric: curId,
			isEditing: true,
			rubricTitle: rubric.name,
			rubricData: rubricData
		});

	}

	//handles deleting a rubric
	handleDeleteRubric(event) {
		event.preventDefault();
		let toDelete = this.state.checked;
		let that = this;

		for (let i = 0; i < toDelete.length; i++) {    //TODO: OPTOMIZE FOR LOOP CALLS
				fetch('/rubrics/' + toDelete[i] , {
					method: 'Delete',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
				}).then(function (response)  {
					if (response.status === 201 || response.ok ){
						alert("Rubric Deleted");
						that.setState({
							checked:[],
						});
					}
					else {
						alert("could not delete rubric");
					}
				}).then(()=> that.getRubrics());
			}
	}


	//calls when the isEditing state is changed
	buildCards() {
		let cards = [];
		let that=this;
			if (this.state.rubricExists && !this.state.currentlyEditing) {
				let rubric = null;
				that.state.AvailableRubrics.forEach( function(r) {
					if (r._id === that.state.selectedRubric){
						rubric = r;
					}
				});

				cards = rubric ? rubric.cards.map(c => {
						return(
							<Card key={`card number ${rubric.cards.indexOf(c)}`}>
								<CardContent>
									<TextField
										variant={"outlined"}
										margin={'normal'}
										fullWidth={true}
										required
										name={`cardTitle-${rubric.cards.indexOf(c)}`}
										onChange={this.handleInputChange}
										type={'text'}
										label={'Rubric Item Title'}
										defaultValue={c.cardTitle}
									/>
									<TextField
										variant={"outlined"}
										margin={'normal'}
										required
										fullWidth={true}
										multiline={true}
										rowsMax={4}
										name={`cardText-${rubric.cards.indexOf(c)}`}
										onChange={this.handleInputChange}
										type={'text'}
										label={'Rubric Item Description'}
										defaultValue={c.cardText}

									/>
								</CardContent>
							</Card>
						);
				}):null;

				return cards;

			} else {
				//loop the value of rubric Size building a card for each one
				for (let i = 0; i < that.state.rubricElements ; i++) {

					cards.push(
						<Card key={`card number ${i}`}>
							<CardContent>
								<label id={'Rubric Item Title'}> Rubric Item Title </label>
								<TextField
									variant={"outlined"}
									fullWidth={true}
									required
									name={`cardTitle-${i}`}
									onChange={this.handleInputChange}
									type={'text'}
									label={'Rubric Item Title'}
									placeholder={"Rubric Item Title"}
									margin={'normal'}
								/>
								<TextField
									variant={"outlined"}
									required
									multiline={true}
									rowsMax={4}
									fullWidth={true}
									name={`cardText-${i}`}
									onChange={this.handleInputChange}
									type={'text'}
									label={'Rubric Item Description'}
									placeholder={"Rubric Item Description"}
									margin={'normal'}
								/>
							</CardContent>
						</Card>
					);
				}
				return cards;
			}

	}

	getRubrics() {
		let that = this;

		fetch('/rubrics/' + this.props.user._id)
			.then(function (response)  {
				if (response.ok || response.status === 201){
					return response.json();
				}
				else {
					alert("could get rubrics");
				}}
			).then(function (myJson) {
				that.setState({ AvailableRubrics: myJson });
			});
	}


	//toggles editor enabling editing or adding new rubrics
	handleEditState() {
		this.setState({
			isEditing: !this.state.isEditing });
	}

	//called when user wants to back out without saving
	reset() {
		this.setState({
			isEditing: false,
			rubricExists: false,
			currentlyEditing: false,
			selectedRubric: "",
			rubricTitle: "",
			checked: [],
			rubricData:[],
		})
	}

	handleRubricSubmit() {
		const keys = Object.keys(this.state.rubricData);
		let newData =[];

		keys.forEach(k => {
			let name = k.split('-');
			let title = name[0];
			let index = name[1];
			let words = this.state.rubricData[k];

			if (newData[index]){
				let oldKey = Object.keys(newData[index])[0];
				let oldValue= newData[index][oldKey];
				newData[index]= {
					[oldKey] : oldValue,
					[title]:words
				}
			} else{
				newData[index] = {
					[title]:words
				};
			}

		});

		if (this.state.rubricExists) {
			this.updateRequest(this.state.rubricTitle, newData);
		} else {
			this.sendRequest(this.state.rubricTitle, newData);
		}

	}

	//adding a new rubric
	sendRequest(rubricTitle, data) {
		let that = this;
		return new Promise(() => {
			const newdata = {
				"name": rubricTitle,
				"cards": data,
				"user_id": this.props.user.id
			};
			let dataString = JSON.stringify(newdata);
			fetch('/rubrics', {
				method: 'POST',
				body: dataString,
				mode: 'cors',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			}).then(function (response)  {
				if (response.status === 201 || response.ok ){
					alert("Rubric Added");
				}
				else {
					alert("could not add rubric");
				}
			}).then(()=> that.getRubrics());
		});
	}

	//updating an existing rubric
	updateRequest(rubricTitle, data) {
		let that = this;
		return new Promise(() => {
			const newdata = {
				"name": rubricTitle,
				"cards": data,
				"user_id": this.props.user._id
			};
			let dataString = JSON.stringify(newdata);
			fetch('/rubrics/' + this.state.selectedRubric, {
				method: 'PUT',
				body: dataString,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			}).then(function (response)  {
				if (response.status === 201 || response.ok ){
					alert("Rubric Updated");
				}
				else {
					alert("could not update rubric");
				}
			}).then(()=> that.getRubrics());
		});
	}


	handleToggle = value => () => {
		const currentIndex = this.state.checked.indexOf(value);
		const newChecked = [...this.state.checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		this.setState({checked: newChecked});
	};

	//renders the page
	render() {
		let rubrics = this.state.AvailableRubrics;
		let rubricList = <List 	dense={true}>
			{rubrics.map((rubric) =>{
				const labelId = `rubric-list-label-${rubric._id}`;
				return(
						<ListItem
							dense={true}
							button
							onClick={this.handleToggle(rubric._id)}
							key={labelId}
						>
							<Link style={{textAlign:"left", color: 'blue'}}
								  id={rubric._id}
								  component={'button'}
								  onClick={this.handleEditRubric}
							>
								{rubric.name}
							</Link>
							<ListItemSecondaryAction>
								<Checkbox
									edge={'end'}
									checked={this.state.checked.indexOf(rubric._id) !== -1}
									tabIndex={-1}
									inputProps={{'aria-labelledby': labelId}}
									onClick={this.handleToggle(rubric._id)}
									value={"delete"}
								/>
							</ListItemSecondaryAction>
						</ListItem>
				);

			}
			)}
		</List>;

		return (
			<Container maxWidth={'md'}>
				<Typography style={{marginTop: "1em"}} align={"center"} variant={"h3"} component={"h1"} gutterBottom={true}>
					Edit Rubrics
				</Typography>

				<Typography align={"center"} variant={"subtitle1"} component={"p"} gutterBottom={true}>
					You can add AAC&U Rubrics,Edit an Existing Rubric , or Create your own Rubric
				</Typography>

				{(!this.state.isEditing) ?
					<Grid container spacing={3}>
						<Grid item>
							<Typography align={"left"} variant={"h6"} component={"h3"} gutterBottom={true}>
								Use AAC&U Rubrics
							</Typography>

							<Typography align={"left"} variant={"subtitle2"} component={"p"} gutterBottom={true}>
								Select AAC&U Rubric to add to Existing
							</Typography>

							<FormControl style={{minWidth: 200, marginBottom:"1em"}}>
								<InputLabel id={'selectRubriclabel'}> Select a Rubric </InputLabel>
								<Select
									labelId={"selectRubriclabel"}
									onChange={this.handleDefaultRubric}
									inputProps={{
										name: 'rubDefaultbutton',
									}}
								>
									<MenuItem  value="" disabled >select rubric </MenuItem>
									<MenuItem  value={0}> Determine the Extent of Information Needed </MenuItem>
									<MenuItem  value={1}>Evaluate Information and its Sources Critically</MenuItem>
									<MenuItem  value={2}>Use Information Effectively to Accomplish a Specific Purpose</MenuItem>
									<MenuItem  value={3}>Access and Use Information Ethically and Legally</MenuItem>
									<MenuItem  value={4}>Sources and Evidence</MenuItem>
									<MenuItem  value={5}>Evidence</MenuItem>
								</Select>
							</FormControl>
							<Typography align={"left"} variant={"h6"} component={"h3"} gutterBottom={true}>
								Edit Existing
							</Typography>
							{this.state.checked.length > 0 ?
							<Toolbar>
									<Typography align={"right"} variant={"subtitle2"} component={"p"} >
										{this.state.checked.length} selected
									</Typography>

									<Tooltip title="Delete">
										<IconButton edge={'end'} aria-label="delete" onClick={this.handleDeleteRubric}>
											<DeleteIcon edge={'end'} />
										</IconButton>
									</Tooltip>
							</Toolbar> : null }
							{rubricList}
						</Grid>
						<Grid item style={{marginTop:'4em'}}> OR </Grid>
						<Grid item>
							<Typography align={"left"} variant={"h6"} component={"h3"}>
								Create New
							</Typography>
								<FormControl fullWidth style={{minWidth: 250, marginBottom:"1em"}}>
								<TextField
									onChange={this.handleStandardInputChange}
									type="number"
									label={"Number of Elements (1-5)"}
									// helperText={"Number of Elements (1-5)"}
									placeholder="Rubric Elements"
									name="rubricElements"
									inputProps={{
										min: "1", max: "5", step: "1"
									}} />
								</FormControl>
								<br />
								<Button style={{float:'right'}}
										color='primary'
										variant={'contained'}
										onClick={this.handleEditState}>
									Go
								</Button>
						</Grid>
					</Grid>
					 :<div>
						<Button color='primary' variant='contained' onClick={this.reset}>Back</Button>
						<Button style={{float:'right'}}
								color='primary'
								variant='contained'
								onClick={this.handleRubricSubmit}>
							Save
						</Button>
						<Container maxWidth={"sm"}>
						<FormControl fullWidth={true} required={true}>
								<TextField
									name="rubricTitle"
									onChange={this.handleStandardInputChange}
									label={"Rubric Title"}
									defaultValue={this.state.rubricTitle}
									variant={'filled'}
									margin={'dense'}
								/>
							</FormControl>
							{this.buildCards()}
						</Container>
					</div>
				}
			</Container>
		);
	}
}

export default withRouter(Rubric);