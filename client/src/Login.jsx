// Our Login "Page" for Citing Insights

// Import Libraries
import React, { Component } from 'react';
import {Redirect } from 'react-router-dom';
// Button,Container, Row, Col are all Reactrap elements that we are 
//     going to use for our login
import { Row, Col } from 'reactstrap';
import './css/App.css';
import './css/login.css';

//import picture
import login from './images/UniversityCenterXLg.jpg';

import { GoogleLogin, GoogleLogout } from "react-google-login";

import config from "./config.json";

function forgotInfo(props) {
	window.location.href = "#/passrecov";
}

// const responseGoogle = (response) => {

// 	//console.log(response);
// 	var profile = response.getBasicProfile();

// 	this.name = profile.getName();
// 	this.email = profile.getEmail();
// 	this.token = response.getAuthResponse().id_token;

// 	//other attributes we could consider
// 	//console.log("ID: " + profile.getId()); // Don't send this directly to your server!
// 	//console.log('Given Name: ' + profile.getGivenName());
// 	//console.log('Family Name: ' + profile.getFamilyName());
// 	//console.log("Image URL: " + profile.getImageUrl());



// };

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false,
			user: null,
			token: ""
		};
	}

	onFailure = (err) => {
		alert(err);
	};

	logout = () => {
		this.setState({ isAuthenticated: false, token: '', user: null })
	};

	responseGoogle = (response) => {

			//All this is good for the data we want
		console.log(response);
		// var profile = response.getBasicProfile();
		// this.name = profile.getName();
		// this.email = profile.getEmail();
		// this.token = response.getAuthResponse().id_token;

		//other attributes we could consider
		//console.log("ID: " + profile.getId()); // Don't send this directly to your server!
		//console.log('Given Name: ' + profile.getGivenName());
		//console.log('Family Name: ' + profile.getFamilyName());
		//console.log("Image URL: " + profile.getImageUrl());




		const tokenBlob = new Blob(
			[JSON.stringify({ access_token: response.accessToken }, null, 2)],
			{ type: 'application/json' }
		);
		const options = {
			//origin: "*",
			method: 'POST',
			body: tokenBlob,
			mode: 'cors',
			cache: 'default',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Control-Allow': true
			}
		};

		fetch('http://localhost:5000/users/auth', options).then(r => {
			
		//This is the token we'll use to authenticate each of the user's 
		//actions (things that require auth: make class, remove assignment, etc.)
		const token = r.headers.get('x-auth-token');
			r.json().then(user => {
				if (token) {
					this.setState({ isAuthenticated: true, user: user, token: token })
					
				}
			});
		})
	};

	render() {
		let content = !!this.state.isAuthenticated ?
			(
				<Redirect to="/tasks"/>		
			) :
			(
				<div>
					<GoogleLogin
						clientId={config.GOOGLE_CLIENT_ID}
						buttonText="Login yo"
						onSuccess={this.responseGoogle}
						onFailure={this.onFailure}
					/>
				</div>
			);
		return (
			<div class="container">
				<div id="login_page">
					<Row>
						<Col xs="6">
							<div id="image_container">
								<img id="welcome_img" alt="" src={login} />
							</div>
						</Col>
						<Col xs="6">
							<div class="beside_picture">
								<div>
									{content}
								</div>
							</div>
						</Col>
					</Row>
				</div >
			</div >
		);
	}
}

export default Login;