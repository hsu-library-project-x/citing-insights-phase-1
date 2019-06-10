//Imprort Libraries that we need
import React, {Component} from 'react';
import {Form, FormGroup, Input,Button, Row, Col} from 'reactstrap';

//Import CSS
import './css/App.css';
import './css/AccountSettings.css';

//Import Icon
import tasks from './images/tasks.jpg'

//Create functions
function getUsername(props){
	var string = "Enter Username";
	/*var element = document.getElementById("user");
	if ( element != null){
		alert(element.value);
		string = element.value;

	}	
	alert(string);	*/
	return string;
}

function getEmail(props){
	return "Enter email";			
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
			<Row>
				<Col xs="1"></Col>
				<Col xs="10">
					<Form id="user_settings">
						<h1> <img class="icon" alt="pencil icon" src={tasks} /> Account Settings </h1>
						<FormGroup>
							<label for="uname"> Username </label>
							<input class="uname_change" type="text" placeholder={getUsername()}  /><br />
							
							<label for="email"> Email </label>
							<input id="cur_email" type="email" placeholder={getEmail()} class="email_change" /><br />

							<label for="new_psw"> Change Password </label>
							<input class="psw_change" type="Password" placeholder="New Password"  /><br />

							<label for="confirm_psw"> Confirm Password </label>
							<input class="psw_change" type="Password" placeholder="Confirm New Password"  /><br />

							<label for="check"> Enter old password </label>
							<input type="Password" placeholder="Enter old Password" class="change"/><br />

							<button class="back" color="secondary" onClick={goBack}>Cancel</button>
							<button class="continue" color="success">Ok</button>
							<button class="delete" color="danger" onClick={deleteAccount}>Delete Account </button>
						</FormGroup>
					</Form>
				</Col>
				<Col xs="1"></Col>
			</Row>
		</div>
		);
	}
}

export default AccountSettings;