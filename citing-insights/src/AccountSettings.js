//Imprort Libraries that we need
import React, {Component} from 'react';
import {Form, FormGroup, Input,Button} from 'reactstrap';

//Import CSS
import './css/App.css';
import './css/AccountSettings.css';

//Create functions
function getUsername(props){
	return document.getElementById("user");			
}

function getEmail(props){
	return "This is an email";			
}

function goBack(props){
	return "";		
}

function deleteAccount(props){
	return "";
}

//start our webpage
class AccountSettings extends Component{
	render(){
		return(
		<div className="container">
			<Form>
				<h1> Account Settings </h1>
				<FormGroup>
					<Input id="cur_uname" type="text" placeholder={getUsername()} name="uname"/>
					<Input id="cur_email" type="email" placeholder={getEmail()} name="email" />
					<Input id="cur_psw" type="Password" placeholder="New Password" name="psw" />
					<Input type="Password" placeholder="Confirm New Password" name="psw" />
					<Button color="success">Confirm Changes</Button>
					<Button color="secondary" onClick={goBack}>Cancel</Button>
					<Button color="danger" onClick={deleteAccount}>Delete Account </Button>
				</FormGroup>
			</Form>
		</div>
		);
	}
}

export default AccountSettings;