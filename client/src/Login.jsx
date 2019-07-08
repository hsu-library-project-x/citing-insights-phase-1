// Our Login "Page" for Citing Insights

// Import Libraries
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

// Button,Container, Row, Col are all Reactrap elements that we are 
//     going to use for our login
import { Row, Col, Form, FormGroup } from 'reactstrap';
import './css/App.css';
import './css/login.css';

//import picture
import login from './images/UniversityCenterXLg.jpg';
import validator from "validator";
import { O_TRUNC } from 'constants';


function forgotInfo(props) {
	window.location.href = "#/passrecov";
}


class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			haveAccount: true,
			loggingIn: false,
			successfulLogin: false,
			registering: false,
			successfulRegister: false,

			email: "",
			username: "",
			password: "",
			password2: "",
			errors: []
		}

		this.renderActions = this.renderActions.bind(this);
		this.toggleLogin = this.toggleLogin.bind(this);
		this.tryLogin = this.tryLogin.bind(this);
		this.tryRegister = this.tryRegister.bind(this);
		this.sendRequestLogin = this.sendRequestLogin.bind(this);
		this.sendRequestRegister = this.sendRequestRegister.bind(this);
	}


	onChange = e => {
		this.setState = ({ [e.target.id]: e.target.value });
		console.log(this.state);
	}


	onSubmit = e => {
		e.preventDefault();

		const userData = {
		  email: this.state.email,
		  password: this.state.password
		};
		
		this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
	  };


	renderActions() {
		if (!this.state.haveAccount) {
			return (
				<form noValidate onSubmit
					id="login-form">
					<h1> Welcome Back! </h1>
					{/* div of class container holds the username, password, and 
			Login button. Also has a remember me checkbox. Currently remember me is not
			functional and Login will just take you to our Demo page*/}
					{/* <label for="uname">Username</label> */}
					<input id="email"
						type="email"
						onChange={this.onChange}
						value={this.state.email}
						placeholder="Enter Email"
						class="email"
						required /><br />
					{/* <label for="psw">Password</label> */}
					<input
						id="myPswd"
						type="password"
						onChange={this.onChange}
						value={this.state.password}
						placeholder="Enter Password"
						class="psw"
						required />
					<br />
					<button
						class="back"
						onClick={forgotInfo}> Forgot</button>
					<br /> <br />
					<button
						style={{
							width: "150px",
							borderRadius: "3px",
							letterSpacing: "1.5px",
							marginTop: "1rem"
						}}
						type="submit"
					>Login
                </button>
					{/*href placeholder for now */}
				</form>);
		}
		else {
			return (
				<form id="register-form">
					<h1> Create an Account </h1>
					<input
						id="emailReg"
						name="email"
						onChange={this.onChange}
						value={this.state.email}
						type="email"
						class="email"
						placeholder="Enter Email"
					/> <br />
					<input
						id="uname"
						name="username"
						onChange={this.onChange}
						value={this.state.username}
						type="text"
						class="uname"
						placeholder="Enter Username"
					/><br />
					<input
						id="pwd1"
						name="password"
						onChange={this.onChange}
						value={this.state.password}
						type="password"
						class="psw"
						placeholder="Enter Password"
					/><br />
					<input
						id="pwd2"
						name="password2"
						onChange={this.onChange}
						value={this.state.password2}
						type="password"
						class="psw"
						placeholder="Confirm Password" />
					<br />
				</form>);
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

			req.send(JSON.stringify(data));
		});
	}

	async tryRegister() {
		let my_username = document.getElementById("uname").value;
		let my_email = document.getElementById("emailReg").value;
		let my_password = document.getElementById("pwd1").value;
		let my_password2 = document.getElementById("pwd2").value;


		//TODO: -make handling more robust
		//		-get rid of alerts, add some jsx

		//      validation
		if (validator.isEmpty(my_username)) {
			alert("Please enter a username");
		}

		if (validator.isEmpty(my_email)) {
			alert("Please enter an email")
		}

		if (!validator.isEmail(my_email)) {
			alert("Please enter a valid email");
		}
		if (!validator.isLength(my_password, { min: 1, max: 30 })) {
			alert("Please enter a valid password.");
		}
		if (!validator.equals(my_password, my_password2)) {
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

			//Redirect here


		}
		catch (e) {
			// we failed...alert for now
			alert("could not register" + e);
			this.setState({ registering: false });
		}
	}

	//Login
	//Implement error catching for failed connection
	sendRequestLogin(email, password) {
		return new Promise((resolve, reject) => {
			const req = new XMLHttpRequest();
			const data = {
				"email": email,
				"password": password
			}
			req.open("POST", "http://localhost:5000/users/login", true);
			req.setRequestHeader("Content-type", "application/json");
			req.send(data);
		});
	}

	async tryLogin() {
		let my_username = document.getElementById("email").value;
		let my_password = document.getElementById("myPswd").value;

		if (my_username === "" || my_password === "") {
			alert("Please Enter Username and Password");
			return;
		}
		//set state of attempting login to ture
		this.setState({ loggingIn: true });

		//make request to server
		const promise = [];
		promise.push(this.sendRequestLogin(my_username, my_password));

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
		if (this.state.successfulRegister === true) {
			return <Redirect to="/#/tasks" />
		}
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

										<button class="continue" onClick={this.tryLogin}
										>Login</button>
										<button class="acnt_stuff" onClick={this.toggleLogin}
										>Sign Up</button>
									</div>
									:
									<div >


										<button class="back" onClick={this.toggleLogin}
										>Go Back</button>
										<button class="continue" onClick={this.tryRegister}
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