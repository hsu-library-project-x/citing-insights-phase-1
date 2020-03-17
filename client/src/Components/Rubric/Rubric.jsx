import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Grid, TextField, InputLabel, Select, MenuItem,
	FormControl, Typography, Button, Snackbar } from "@material-ui/core";
import defaultRubricsJson from '../../default_rubrics/defaultRubric.json';
import Alert from "@material-ui/lab/Alert";
import CreateRubricList from "./CreateRubricList";

class Rubric extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rubricData: [], // I think redundant
			rubricElements: null,
			rubricTitle: "",
			AvailableRubrics: [],
			rubricExists: false,
			selectedRubric: "",
			currentlyEditing: false,
			rubricGetSuccess:null,
			rubricDefaultAddSuccess:null,
			rubricDeleteSuccess:null,
			rubricRedundancy:false,
			rubricCreateSuccess:null,
			snackbarOpen:true,
		};

		this.getRubrics();

		this.handleEditState = this.handleEditState.bind(this);
		this.handleStandardInputChange = this.handleStandardInputChange.bind(this);
		this.handleDefaultRubric = this.handleDefaultRubric.bind(this);
		this.handleAlert = this.handleAlert.bind(this);
		this.Alerts = this.Alerts.bind(this);
	}


	handleStandardInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

	handleDefaultRubric(event) {
		event.preventDefault();

		let rubricToAdd = defaultRubricsJson[event.target.value];
		rubricToAdd.user_id = this.props.user.id;
		const defaultString = JSON.stringify(rubricToAdd);

		fetch('/api/rubrics/', {
			method: 'POST',
			body: defaultString,
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		}).then(response => {
			if (response.status === 304) {
				this.handleAlert('redundancy', true);
			} else if (response.status === 201) {
				this.handleAlert('add', true);
			} else {
				this.handleAlert('add', false);
			}
		});
	}

	handleAlert(action, bool){
		if(action ==='add'){
			this.setState({rubricDefaultAddSuccess: bool}, ()=>this.getRubrics());
		}
		if(action ==='redundancy'){
			this.setState({rubricRedundancy:bool}, ()=>this.getRubrics());
		}
		if (action === 'delete'){
			this.setState({rubricDeleteSuccess:bool}, ()=>this.getRubrics());
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
					that.handleAlert('get', false);
					return {};
				}
			}
			).then(function (myJson) {
				that.setState({ AvailableRubrics: myJson });
			});
	}

	handleEditExistingRubric(rubricExists,selectedRubric,rubricTitle,rubricElements,rubricData){
		this.props.updateisEditing(rubricExists,rubricTitle,rubricElements, selectedRubric,
			this.state.AvailableRubrics, rubricData);
	}

	//toggles editor enabling editing or adding new rubrics
	handleEditState() {
		let count = this.state.rubricElements;
		let reg = new RegExp('^\\d+$');
		if (count > 0 && count < 6 && count.match(reg)) {
			this.props.updateisEditing(this.state.rubricExists, this.state.rubricTitle, this.state.rubricElements,
				this.state.selectedRubric, this.state.AvailableRubrics, this.state.rubricData);
		}
	}


	Alerts(){
		if(this.state.rubricGetSuccess !== null){
			if(this.state.rubricGetSuccess === false){
				return <Snackbar
					open={this.state.snackbarOpen}
					role={"alert"}
					autoHideDuration={2000}
					anchorOrigin={{horizontal:'right', vertical:'top'}}>
					<Alert variant={'filled'}
						   severity={'error'}
						   onClose={()=>this.setState({snackbarOpen:false})}>
						Could not Get Rubrics</Alert>
				</Snackbar>;
			}
		}
		if(this.state.rubricDeleteSuccess !== null){
			if(this.state.rubricDeleteSuccess === false){
				return <Snackbar
					open={this.state.snackbarOpen}
					role={"alert"}
					autoHideDuration={2000}
					anchorOrigin={{horizontal:'right', vertical:'top'}}>
					<Alert variant={'filled'}
						   severity={'error'}
						   onClose={()=>this.setState({snackbarOpen:false})}>
						Could not Delete Rubric</Alert>
				</Snackbar>;
			} else{
				return <Snackbar
					open={this.state.snackbarOpen}
					role={"alert"}
					autoHideDuration={2000}
					anchorOrigin={{horizontal:'right', vertical:'top'}} >
					<Alert variant={'filled'}
						   severity={'success'}
						   onClose={()=>this.setState({snackbarOpen:false})}>
						Rubric Deleted </Alert>
				</Snackbar>
			}
		}
		if(this.props.rubricAddSuccess !== null){
			if(this.props.rubricAddSuccess === false){
				return <Snackbar
					open={this.state.snackbarOpen}
					role={"alert"}
					autoHideDuration={2000}
					anchorOrigin={{horizontal:'right', vertical:'top'}}>
					<Alert variant={'filled'}
						   severity={'error'}
						   onClose={()=>this.setState({snackbarOpen:false})}>
						Could not Add Rubric</Alert>
				</Snackbar>;
			} else{
				return <Snackbar
					open={this.state.snackbarOpen}
					role={"alert"}
					autoHideDuration={2000}
					anchorOrigin={{horizontal:'right', vertical:'top'}} >
					<Alert variant={'filled'}
						   severity={'success'}
						   onClose={()=>this.setState({snackbarOpen:false})}>
						Rubric Added </Alert>
				</Snackbar>
			}
		}
		if(this.state.rubricDefaultAddSuccess !==null){
			if(this.state.rubricDefaultAddSuccess === false){
				return <Snackbar
					open={this.state.snackbarOpen}
					role={"alert"}
					autoHideDuration={2000}
					anchorOrigin={{horizontal:'right', vertical:'top'}}>
					<Alert variant={'filled'}
						   severity={'error'}
						   onClose={()=>this.setState({snackbarOpen:false})}>
						Could not Add Rubric</Alert>
				</Snackbar>;
			} else{
				return <Snackbar
					open={this.state.snackbarOpen}
					role={"alert"}
					autoHideDuration={2000}
					anchorOrigin={{horizontal:'right', vertical:'top'}} >
					<Alert variant={'filled'}
						   severity={'success'}
						   onClose={()=>this.setState({snackbarOpen:false})}>
						Rubric Added </Alert>
				</Snackbar>
			}
		}
		if(this.props.rubricUpdateSuccess !== null){
			if(this.props.rubricUpdateSuccess === false){
				return <Snackbar
					open={this.state.snackbarOpen}
					role={"alert"}
					autoHideDuration={2000}
					anchorOrigin={{horizontal:'right', vertical:'top'}}>
					<Alert variant={'filled'}
						   severity={'error'}
						   onClose={()=>this.setState({snackbarOpen:false})}>
						Could not Update Rubric</Alert>
				</Snackbar>;
			} else{
				return <Snackbar
					open={this.state.snackbarOpen}
					role={"alert"}
					autoHideDuration={2000}
					anchorOrigin={{horizontal:'right', vertical:'top'}} >
					<Alert variant={'filled'}
						   severity={'success'}
						   onClose={()=>this.setState({snackbarOpen:false})}>
						Rubric Updated </Alert>
				</Snackbar>
			}
		}
		if(this.state.rubricRedundancy !== null){
			if(this.state.rubricRedundancy === true){
				return <Snackbar
					open={this.state.snackbarOpen}
					role={"alert"}
					autoHideDuration={2000}
					anchorOrigin={{horizontal:'right', vertical:'top'}}>
					<Alert variant={'filled'}
						   severity={'error'}
						   onClose={()=>this.setState({snackbarOpen:false})}>
						This has already been added </Alert>
				</Snackbar>
			}
		}

		if(this.state.rubricCreateSuccess !== null){
			if(this.state.rubricCreateSuccess === false){
				return <Snackbar
					open={this.state.snackbarOpen}
					role={"alert"}
					autoHideDuration={2000}
					anchorOrigin={{horizontal:'right', vertical:'top'}}>
					<Alert variant={'filled'}
						   severity={'error'}
						   onClose={()=>this.setState({snackbarOpen:false})}>
						Could not Create Rubric </Alert>
				</Snackbar>
			} else{
				return <Snackbar
					open={this.state.snackbarOpen}
					role={"alert"}
					autoHideDuration={2000}
					anchorOrigin={{horizontal:'right', vertical:'top'}}>
					<Alert variant={'filled'}
						   severity={'success'}
						   onClose={()=>this.setState({snackbarOpen:false})}>
						Custom Rubric Created </Alert>
				</Snackbar>
			}
		}
	};


	//renders the page
	render() {



		return (
			<Container maxWidth={'md'}>

				{this.Alerts()}

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

						<CreateRubricList
							rubrics={this.state.AvailableRubrics}
							handleEditExistingRubric={this.handleEditExistingRubric}
							handleAlert={this.handleAlert}
						/>
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