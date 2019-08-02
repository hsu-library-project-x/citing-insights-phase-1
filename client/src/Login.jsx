// Our Login "Page" for Citing Insights

// Import Libraries
import React, { Component, PropTypes } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
// Button,Container, Row, Col are all Reactrap elements that we are 
//     going to use for our login
import { Row, Col } from 'reactstrap';
import './css/App.css';
import './css/login.css';

//import picture
import login from './images/UniversityCenterXLg.jpg';

import { GoogleLogin } from "react-google-login";

import config from "./config.json";
import { runInThisContext } from 'vm';

function forgotInfo(props) {
	window.location.href = "#/passrecov";
}


class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false,
			user: null,
			token: ""
		};
		this.getInfo = this.getInfo.bind(this);
	}

	componentDidMount(){
		if(this.props.isAuthenticated === true){
			this.props.history.push({
				pathname: "/",
				props: { ...this.state}
			});
		}
	}

	onFailure = (err) => {
		alert(err);
	};

	logout = () => {
		this.setState({ isAuthenticated: false, token: '', user: null })
	};
	getInfo() {
		this.props.passInfoLogin(this.state.isAuthenticated, this.state.token, this.state.user);
	}

	responseGoogle = (response) => {
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
					this.setState({
						isAuthenticated: true,
						user: user,
						token: token
					});
					this.getInfo();
					this.props.history.push({
						pathname: "/",
						props: {
							isAuthenticated: true,
							user: user,
							token: token
						}
					});
				}
			});
		})
	};


	render() {
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
								<h1> Welcome Back! </h1>
								<div id="google">
									<GoogleLogin
										clientId={config.GOOGLE_CLIENT_ID}
										buttonText="Sign in with Google"
										onSuccess={this.responseGoogle}
										onFailure={this.onFailure}
									/>
								</div>
							</div>
						</Col>
					</Row>
				</div >
			</div >
		);
	}
}

export default withRouter(Login);