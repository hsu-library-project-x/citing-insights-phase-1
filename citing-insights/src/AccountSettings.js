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
							<Input id="cur_uname" type="text" placeholder={getUsername()} name="uname" /><br />
							
							<label for="email"> Email </label>
							<Input id="cur_email" type="email" placeholder={getEmail()} name="email" /><br />

							<label for="new_psw"> Change Password </label>
							<Input id="cur_psw" type="Password" placeholder="New Password" name="new_psw" /><br />

							<label for="confirm_psw"> Confirm Password </label>
							<Input type="Password" placeholder="Confirm New Password" name="confirm_psw" /><br />

							<label for="check"> Enter current password </label>
							<Input type="Password" placeholder="Enter old Password" name="check"/><br />

							<Button id="make_changes" color="success">Ok</Button>
							<Button id="cancel_changes" color="secondary" onClick={goBack}>Cancel</Button>
							<Button id="delete_account" color="danger" onClick={deleteAccount}>Delete Account </Button>
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