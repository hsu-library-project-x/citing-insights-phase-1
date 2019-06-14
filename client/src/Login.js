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
	        <input type="text" placeholder="Enter Username" class="uname" required/><br />
	        {/* <label for="psw">Password</label> */}
	        <input type="password" placeholder="Enter Password" class="psw" required/>
	        <br/>
	        <button class="back" onClick={forgotInfo}>Forgot</button>
	        <button class="continue">Login</button>
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
			haveAccount: true
		}
		this.renderActions=this.renderActions.bind(this);
		this.ToggleLogin= this.ToggleLogin.bind(this);
	}

	renderActions(){
		if(!this.state.haveAccount){
			return (<SignupForm />);
		}
		else{
			return (<LoginForm />);
		}
	}

	ToggleLogin()
	{
		this.setState({
		haveAccount : !this.state.haveAccount
		})
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
							{(this.state.haveAccount) ? <button onClick={this.ToggleLogin}> Sign Up </button>: <div ><button > Make me an Account</button> <button onClick={this.ToggleLogin}> Go Back</button> </div>}
						</div>
					</Col>
				</Row>
			</div>
		</div>
		);
	}
}

export default Login;