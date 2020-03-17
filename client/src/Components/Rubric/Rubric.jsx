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
			snackbarOpen:true,
		};

		this.queueRef = React.createRef();
		this.queueRef.current = [];

		this.getRubrics();


		this.handleEditState = this.handleEditState.bind(this);
		this.handleStandardInputChange = this.handleStandardInputChange.bind(this);
		this.handleDefaultRubric = this.handleDefaultRubric.bind(this);
		this.DisplayAlerts = this.DisplayAlerts.bind(this);
		this.processQueue = this.processQueue.bind(this);
		this.handleQueueAlert = this.handleQueueAlert.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleExited = this.handleExited.bind(this);


	}

	componentDidMount() {
		if(this.props.message !== null){
			this.handleQueueAlert(this.props.message, this.props.severity);
		}
	}

	processQueue(){
		if(this.queueRef.current.length >0){
			this.setState({
				messageInfo: this.queueRef.current.shift(),
				snackbarOpen:true
			});
		}
	};

	handleQueueAlert(message, severity){
		
		this.queueRef.current.push({
			message: message,
			severity:severity,
			key: new Date().getTime(),
		});

		if(this.state.snackbarOpen){
			this.setState({snackbarOpen:false});
		}else{
			this.processQueue();
		}
		this.getRubrics();
	};

	handleClose(event, reason){
		if(reason === 'clickaway'){
			return;
		}
		this.setState({snackbarOpen:false});
	};

	handleExited(){
		this.processQueue();
	};


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
				this.handleQueueAlert('Rubric Already Added', 'warning');
			} else if (response.status === 201) {
				this.handleQueueAlert('Rubric Added', 'success');
			} else {
				this.handleQueueAlert('Could not Add Rubric', 'error');
			}
		});
	}

	getRubrics() {
		let that = this;

		fetch('/api/rubrics/' + this.props.user.id)
			.then(function (response) {
				if (response.ok || response.status === 201) {
					return response.json();
				}
				else {
					that.handleQueueAlert('Could not Get Rubrics', 'error');
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

	DisplayAlerts(){
		return <Snackbar
			key={this.state.messageInfo ? this.state.messageInfo.key : undefined}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={this.state.snackbarOpen}
			autoHideDuration={3000}
			onClose={this.handleClose}
			onExited={this.handleExited}
		>
			<Alert variant={'filled'}
				   severity={this.state.messageInfo ? this.state.messageInfo.severity : undefined}
				   onClose={this.handleClose}
			>
				{this.state.messageInfo ? this.state.messageInfo.message : undefined}
			</Alert>
		</Snackbar>
	}


	//renders the page
	render() {
		return (
			<Container maxWidth={'md'}>

				{this.DisplayAlerts()}
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
							handleQueueAlert={this.handleQueueAlert}
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