// Our Login "Page" for Citing Insights

// Import Libraries
import React, {Component} from 'react';

// Button,Container, Row, Col are all Reactrap elements that we are 
//     going to use for our login
import {Row, Col, Form, FormGroup} from 'reactstrap';
import './css/App.css';
import './css/login.css';

//import picture
import login from './images/UniversityCenterXLg.jpg';

function forgotInfo(props){
	window.location.href="#/passrecov";
}

const LoginForm = () => (
	<Form> 
		<h1> Welcome Back! </h1>
		<FormGroup class="container">
	      {/* div of class container holds the username, password, and 
	          Login button. Also has a remember me checkbox. Currently remember me is not
	      	  functional and Login will just take you to our Demo page*/}
	        {/* <label for="uname">Username</label> */}
	        <input id="myUname" type="text" placeholder="Enter Username" class="uname" required/><br />
	        {/* <label for="psw">Password</label> */}
	        <input id="myPswd" type="password" placeholder="Enter Password" class="psw" required/>
	        <br/>
	        <button class="back" onClick={forgotInfo}>Forgot</button>
	        <br /> <br />
	        {/*href placeholder for now */}
	        
	    </FormGroup>
     </Form>
	)

const SignupForm = () => (
	<Form>
		<h1> Create an Account </h1>
		<FormGroup class="container">
			<input type="email" class="email" placeholder="Enter Email" /> <br />
			<input type="text" class="uname" placeholder="Enter Username" /><br />
			<input type="password" class="psw" placeholder="Enter Password" /><br />
			<input type="password" class="psw" placeholder="Confirm Password" />
			<br />
		</FormGroup>
	</Form>
)

class Login extends Component{

	constructor(props)
	{
		super(props);
		this.state= {
			haveAccount: true,
			loggingIn: false,
			successfulLogin: false
		}
		this.renderActions=this.renderActions.bind(this);
		this.toggleLogin= this.toggleLogin.bind(this);
		this.tryLogin=this.tryLogin.bind(this);
		this.sendRequest=this.sendRequest.bind(this);
	}

	renderActions(){
		if(!this.state.haveAccount){
			return (<SignupForm />);
		}
		else{
			return (<LoginForm />);
		}
	}

	toggleLogin()
	{
		this.setState({
		haveAccount : !this.state.haveAccount
		})
	}

	//Implement error catching for failed connection
	sendRequest(username, password) {
	 return new Promise((resolve, reject) => {
		const req = new XMLHttpRequest();
		const userData = new FormData();
		userData.append(username, password);
		req.open("POST", "http://localhost:5000/login");
		req.send(userData);
	 });
	}

	async tryLogin(){
		let my_username = document.getElementById("myUname").value;
		let my_password = document.getElementById("myPswd").value;

		if(my_username === "" || my_password === "" )
		{
			alert("Please Enter Username and Password");
			return;
		}
		//set state of attempting login to ture
		this.setState({loggingIn:true});

		//make request to server
		const promise = [];
		promise.push(this.sendRequest(my_username,my_password));

		try{
			console.log("Reached Try");
			//if request suceeeds
				//	create two states
			await Promise.all(promise);
			//if here we succeeded
			this.setState({loggingIn:false, successfulLogin:true});
			//Now naviagate to the homepage.....to be implemented later
		}
		catch(e){
			// we failed...alert for now
			alert("could not login");
			this.setState({loggingIn:false});

		}

	}
	render(){
		return(
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
							{(this.state.haveAccount) ? <div> <button class="continue" onClick={this.tryLogin}>Login</button><button class="acnt_stuff" onClick={this.toggleLogin}> 
								Sign Up </button> </div>: <div ><button class="back" onClick={this.toggleLogin}> Go Back</button><button class="continue">Confirm</button>  </div>}
						</div>
					</Col>
				</Row>
			</div>
		</div>
		);
	}
}

export default Login;