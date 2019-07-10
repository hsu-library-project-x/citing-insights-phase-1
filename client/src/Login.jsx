// Our Login "Page" for Citing Insights

// Import Libraries
import React, { Component } from 'react';

// Button,Container, Row, Col are all Reactrap elements that we are 
//     going to use for our login
import { Row, Col, Form, FormGroup } from 'reactstrap';
import './css/App.css';
import './css/login.css';

//import picture
import login from './images/UniversityCenterXLg.jpg';

import { GoogleLogin, GoogleLogout } from "react-google-login";

function forgotInfo(props) {
	window.location.href = "#/passrecov";
}

const responseGoogle = (response) => {

	console.log(response);

};

const GOOGLE_CLIENT_ID = "203897182687-719pq9jrvlgksp6ej5hvoiugf5ofjd6n.apps.googleusercontent.com";

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			googleID: "",
			name: ""
		}
	}

	onChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

		const newUser = {
			googleID: this.state.googleID,
			name: this.state.name
		};

		//Make post request to Google oauth here

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
								<div>
									<GoogleLogin
										clientId={GOOGLE_CLIENT_ID}
										scope="https://www.googleapis.com/auth/analytics"
										onSuccess={responseGoogle}
										//onFailure={error} onLogoutS	
										//onRequest={loading}
										offline={false}
										approvalPrompt="force"
										responseType="id_token"
										isSignedIn
										theme="dark"
									// disabled
									// prompt="consent"
									// className='button'
									// style={{ color: 'red' }}                     
									></GoogleLogin>								
									<GoogleLogout buttonText="Logout" />
								</div>
							</div>

							<a href="/login/google">Sign In with Google</a>

						</Col>
					</Row>
				</div >
			</div >
		);
	}
}

export default Login;