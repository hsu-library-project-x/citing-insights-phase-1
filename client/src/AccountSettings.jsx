//Imprort Libraries that we need
import React, {Component} from 'react';
import { withRouter} from 'react-router-dom';

import {Form, FormGroup} from 'reactstrap';

//Import CSS
import './css/App.css';
import './css/AccountSettings.css';

//Import Icon
import tasks from './images/pencil.svg'

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


//start our webpage
class AccountSettings extends Component{

	constructor(props)
	{
		super(props);
		this.state={ 
			isDeleting: false
		}

		this.changeisDeleting=this.changeisDeleting.bind(this);
		this.renderActions=this.renderActions.bind(this);
	}

	renderActions()
	{
		if(this.state.isDeleting){
			//run render for component
			return (
				<div>
				<div class="popUp">
						<h2> DELETING AN ACCOUNT </h2><hr />
						<strong><p> You have selected to delete this account.</p> </strong>
						<p> Please note that doing so will erase all data and progress associated with the account.
							It is not reversable. If you still wish to continue please confirm below. </p>
						<hr />
						<button onClick={this.changeisDeleting}> No! Go Back! </button>
						<button id="popUpDelete"> Yes, I am sure. </button>
					</div>
				<div class="blackOut">
				</div>
				</div>
	 		);
		}
	}

	changeisDeleting()
	{
		this.setState({
			//Use toggles! =)
			isDeleting: !this.state.isDeleting
		});
	}

	render(){
		return(
		<div className="container">
					<div class="settings_form">
						<Form>
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
								<input type="Password" placeholder="Enter old Password" class="change"/><br /><br />

								<button class="back_from_settings" onClick={goBack}>Cancel</button>

								<button class="confirm_settings">Ok</button>
								<button class="delete" onClick={this.changeisDeleting}>Delete Account </button>
							</FormGroup>
						</Form>
					</div>
		

			<div id="deleteCheck">
			{this.renderActions()}
			</div> 

		</div>

		
		/* 
		<div>Icons made by <a href="https://www.flaticon.com/authors/situ-herrera" title="Situ Herrera">Situ Herrera</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
		*/
		);
	}
}

export default withRouter(AccountSettings);