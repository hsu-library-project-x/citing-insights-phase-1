import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
	Container, Grid, TextField, InputLabel, Select, MenuItem, List, ListItem, FormControl, Typography,
	Button, IconButton, Checkbox, Tooltip, Toolbar, Link, ListItemSecondaryAction
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
			AvailableRubrics: [],
			rubricExists: false,
			selectedRubric: "",
			currentlyEditing: false,
			checked: [],
		};

		this.getRubrics();

		this.handleEditState = this.handleEditState.bind(this);
		this.handleStandardInputChange = this.handleStandardInputChange.bind(this);
		this.handleEditRubric = this.handleEditRubric.bind(this);
		this.handleDeleteRubric = this.handleDeleteRubric.bind(this);
		this.handleDefaultRubric = this.handleDefaultRubric.bind(this);
		this.handleToggle = this.handleToggle.bind(this);
	}

	handleStandardInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		if (value < 1 || value > 5) {
			//Toast here

		}

		this.setState({
			[name]: value
		});
	}

	handleDefaultRubric(event) {
		let that = this;

		let rubricToAdd = defaultRubricsJson[event.target.value];
		rubricToAdd.user_id = this.props.user.id;

		console.log(rubricToAdd);
		const defaultString = JSON.stringify(rubricToAdd);

		fetch('/api/rubrics/', {
			method: 'POST',
			body: defaultString,
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(function (response) {
			if (response.status === 304) {
				alert("Rubric has already been added");
			}
			else if (response.status === 201) {
				alert("Rubric Added");
			}
			else {
				alert("could not add rubric");
			}
		}).then(() => that.getRubrics())

	}

	//called when clicking on the rubric list
	handleEditRubric(event) {
		const target = event.target;
		const curId = target.id;
		let rubric = null;

		this.state.AvailableRubrics.forEach(function (r) {
			if (r._id === curId) {
				rubric = r;
			}
		});

		let rubricData = {};

		rubric.cards.forEach(c => {
			rubricData[`cardTitle-${rubric.cards.indexOf(c)}`] = c.cardTitle;
			rubricData[`cardText-${rubric.cards.indexOf(c)}`] = c.cardText;
		});


		this.setState({
			rubricExists: true,
			selectedRubric: curId,
			isEditing: true,
			rubricTitle: rubric.name,
			rubricData: rubricData
		}, this.handleEditState);

	}

	//handles deleting a rubric
	handleDeleteRubric(event) {
		event.preventDefault();
		let toDelete = this.state.checked;
		let that = this;

		for (let i = 0; i < toDelete.length; i++) {    //TODO: OPTOMIZE FOR LOOP CALLS
			fetch('/api/rubrics/' + toDelete[i], {
				method: 'Delete',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			}).then(function (response) {
				if (response.status === 201 || response.ok) {
					alert("Rubric Deleted");
					that.setState({
						checked: [],
					});
				}
				else {
					alert("could not delete rubric");
				}
			}).then(() => that.getRubrics());
		}
	}


	getRubrics() {
		let that = this;

		fetch('/api/rubrics/' + this.props.user.id)
			.then(function (response) {
				if (response.ok || response.status === 201) {
					return response.json();
				}
				else {
					alert("could get rubrics");
				}
			}
			).then(function (myJson) {
				that.setState({ AvailableRubrics: myJson });
			});
	}

	//toggles editor enabling editing or adding new rubrics
	handleEditState() {
		let count = this.state.rubricElements;
		var reg = new RegExp('^\\d+$');
		if (count > 0 && count < 6 && count.match(reg)) {
			this.props.updateisEditing(this.state.rubricExists, this.state.rubricTitle, this.state.rubricElements,
				this.state.selectedRubric, this.state.AvailableRubrics, this.state.rubricData);
		}
		else{
			alert('Please enter a value 1-5');
		}
	}

	handleToggle = value => () => {
		const currentIndex = this.state.checked.indexOf(value);
		const newChecked = [...this.state.checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		this.setState({ checked: newChecked });
	};

	//renders the page
	render() {
		let rubrics = this.state.AvailableRubrics;
		let rubricList = <List dense={true}>
			{rubrics.map((rubric) => {
				const labelId = `rubric-list-label-${rubric._id}`;
				return (
					<ListItem
						dense={true}
						button
						onClick={this.handleToggle(rubric._id)}
						key={labelId}
					>
						<Link style={{ textAlign: "left", color: 'blue' }}
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
								inputProps={{ 'aria-labelledby': labelId }}
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
				<Typography style={{ marginTop: "1em" }} align={"center"} variant={"h3"} component={"h1"} gutterBottom={true}>
					Edit Rubrics
				</Typography>

				<Typography align={"center"} variant={"subtitle1"} component={"p"} gutterBottom={true}>
					You can add AAC&U Rubrics,Edit an Existing Rubric , or Create your own Rubric
				</Typography>

				<Grid container spacing={3}>
					<Grid item>
						<Typography align={"left"} variant={"h6"} component={"h3"} gutterBottom={true}>
							Use AAC&U Rubrics
						</Typography>

						<Typography align={"left"} variant={"subtitle2"} component={"p"} gutterBottom={true}>
							Select AAC&U Rubric to add to Existing
						</Typography>

						<FormControl style={{ minWidth: 200, marginBottom: "1em" }}>
							<InputLabel id={'selectRubriclabel'}> Select a Rubric </InputLabel>
							<Select
								labelId={"selectRubriclabel"}
								onChange={this.handleDefaultRubric}
								defaultValue={""}
								inputProps={{
									name: 'rubDefaultbutton',
								}}
							>
								<MenuItem value="" disabled >select rubric </MenuItem>
								<MenuItem value={0}> Determine the Extent of Information Needed </MenuItem>
								<MenuItem value={1}>Evaluate Information and its Sources Critically</MenuItem>
								<MenuItem value={2}>Use Information Effectively to Accomplish a Specific Purpose</MenuItem>
								<MenuItem value={3}>Access and Use Information Ethically and Legally</MenuItem>
								<MenuItem value={4}>Sources and Evidence</MenuItem>
								<MenuItem value={5}>Evidence</MenuItem>
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
							</Toolbar> : null}
						{rubricList}
					</Grid>
					<Grid item style={{ marginTop: '4em' }}> OR </Grid>
					<Grid item>
						<Typography align={"left"} variant={"h6"} component={"h3"}>
							Create New
						</Typography>
						<FormControl fullWidth style={{ minWidth: 250, marginBottom: "1em" }}>
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
						<Button style={{ float: 'right' }}
							color='primary'
							variant={'contained'}
							onClick={this.handleEditState}>
							Go
							</Button>
					</Grid>
				</Grid>
			</Container>
		);
	}
}

export default withRouter(Rubric);