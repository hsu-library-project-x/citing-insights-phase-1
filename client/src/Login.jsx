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
import validator from "validator";


function forgotInfo(props) {
	window.location.href = "#/passrecov";
}

const LoginForm = () => (
	<Form id="loginorm">
		<h1> Welcome Back! </h1>
		<FormGroup class="container">
			{/* div of class container holds the username, password, and 
	          Login button. Also has a remember me checkbox. Currently remember me is not
	      	  functional and Login will just take you to our Demo page*/}
			{/* <label for="uname">Username</label> */}
			<input id="myUname" type="text" placeholder="Enter Username" class="uname" required /><br />
			{/* <label for="psw">Password</label> */}
			<input id="myPswd" type="password" placeholder="Enter Password" class="psw" required />
			<br />
			<button class="back" onClick={forgotInfo}>Forgot</button>
			<br /> <br />
			{/*href placeholder for now */}

		</FormGroup>
	</Form>
)

const SignupForm = () => (
	<form id="register-form">
		<h1> Create an Account </h1>
			<input id="uname" name="username" type="email" class="email" placeholder="Enter Email" /> <br />
			<input id="emailReg" name="email" type="text" class="uname" placeholder="Enter Username" /><br />
			<input id="pwd1" name="password" type="password" class="psw" placeholder="Enter Password" /><br />
			<input id="pwd2" name="password2" type="password" class="psw" placeholder="Confirm Password" />
			<br />
	</form>
)

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			haveAccount: true,
			loggingIn: false,
			successfulLogin: false,
			registering: false,
			successfulRegister: false
		}

		this.renderActions = this.renderActions.bind(this);
		this.toggleLogin = this.toggleLogin.bind(this);
		this.tryLogin = this.tryLogin.bind(this);
		this.tryRegister = this.tryRegister.bind(this);
		this.sendRequest = this.sendRequest.bind(this);
		this.sendRequestRegister = this.sendRequestRegister.bind(this);

	}

	renderActions() {
		if (!this.state.haveAccount) {
			return (<SignupForm />);
		}
		else {
			return (<LoginForm />);
		}
	}

	toggleLogin() {
		this.setState({
			haveAccount: !this.state.haveAccount
		})
	}

	//Register
	//Implement error catching for failed connection
	sendRequestRegister(username, email, password, password2) {

		return new Promise((resolve, reject) => {
			
			const req = new XMLHttpRequest();
			let data = {
				"username": username, 
				"email": email,
				"password": password,
				"password2": password2
			};
			req.open("POST", "http://localhost:5000/users/register", true);
			

			req.setRequestHeader("Content-type", "application/json");
			
			//req.withCredentials = "true";
			
			//req.setRequestHeader("Access-Control-Allow-Credentials", "true");
			

			req.send(JSON.stringify(data));
		});
	}

	async tryRegister() {
		let my_username = document.getElementById("uname").value;
		let my_email = document.getElementById("emailReg").value;
		let my_password = document.getElementById("pwd1").value;
		let my_password2 = document.getElementById("pwd2").value;
		
		
		//make handling more robust
		//validation
		if(validator.isEmpty(my_username)){
			alert("Please enter a username");
		}

		//Email validation is not going well

		//if(!validator.isEmail(my_email)){
		//	alert("Please enter a valid email");
		//}

		
		if(!validator.isLength(my_password, { min: 1, max: 30 })){
			alert("Please enter a valid password.");
		}
		if(!validator.equals(my_password, my_password2)){
			alert("Please enter a username");
		}




		//set state of attempting login to ture
		this.setState({ registering: true });

		//make request to server
		const promise = [];
		console.log("in a promise");

		promise.push(this.sendRequestRegister(my_username, my_email, my_password, my_password2));

		try {
			console.log("Reached Try");
			//if request suceeeds
			//	create two states

			await Promise.all(promise);
			
			//if here we succeeded
			
			this.setState({ registering: false, successfulRegister: true });
			//Now naviagate to the homepage.....to be implemented later
		}
		catch (e) {
			// we failed...alert for now
			alert("could not register" + e);
			this.setState({ registering: false });
		}
	}

	//Login
	//Implement error catching for failed connection
	sendRequest(email, password) {
		return new Promise((resolve, reject) => {
			const req = new XMLHttpRequest();
			const userData = new FormData();
			userData.append(email, password);
			req.open("POST", "http://localhost:5000/users/login");
			req.send(userData);
		});
	}

	async tryLogin() {
		let my_username = document.getElementById("myUname").value;
		let my_password = document.getElementById("myPswd").value;

		if (my_username === "" || my_password === "") {
			alert("Please Enter Username and Password");
			return;
		}
		//set state of attempting login to ture
		this.setState({ loggingIn: true });

		//make request to server
		const promise = [];
		promise.push(this.sendRequest(my_username, my_password));

		try {
			console.log("Reached Try");
			//if request suceeeds
			//	create two states
			await Promise.all(promise);
			//if here we succeeded
			this.setState({ loggingIn: false, successfulLogin: true });
			//Now naviagate to the homepage.....to be implemented later
		}
		catch (e) {
			// we failed...alert for now
			alert("could not login");
			this.setState({ loggingIn: false });
		}
	}
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
								{this.renderActions()}
								{(this.state.haveAccount)
									?
									<div>
										<button
											class="continue"
											onClick={this.tryLogin}
										>Login</button>
										<button
											class="acnt_stuff"
											onClick={this.toggleLogin}
										>Sign Up</button>
									</div>
									:
									<div >
										<button
											class="back"
											onClick={this.toggleLogin}
										>Go Back</button>
										<button
											class="continue"
											onClick={this.tryRegister}
										>Confirm</button>
									</div>}
							</div>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

export default Login;