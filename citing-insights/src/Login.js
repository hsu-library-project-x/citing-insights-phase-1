// Our Login "Page" for Citing Insights

// Import Libraries
import React, {Component} from 'react';

// Button,Container, Row, Col are all Reactrap elements that we are 
//     going to use for our login
import {Row, Col, Form, FormGroup} from 'reactstrap';
import './css/App.css';
import './css/login.css';

//import picture
import login from './images/UniversityCenterLG.jpg';


function createAccount(props){
	document.getElementById("login_page").style.display="none";
	document.getElementById("signup").style.display="block";				
}

function goBackLogin(props){
	document.getElementById("login_page").style.display="block";
	document.getElementById("signup").style.display="none";
}

function forgotInfo(props){
	window.location.href="#/passrecov";
}

class Login extends Component{
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
						<Form  > 
							<h1> Welcome Back! </h1>
							<FormGroup class="container">
						      {/* div of class container holds the username, password, and 
						          Login button. Also has a remember me checkbox. Currently remember me is not
						      	  functional and Login will just take you to our Demo page*/}
						        {/* <label for="uname">Username</label> */}
						        <input type="text" placeholder="Enter Username" class="uname" required/> <br />
						        {/* <label for="psw">Password</label> */}
						        <input type="password" placeholder="Enter Password" class="psw" required/>
						        <br/>
						        <button class="back" onClick={forgotInfo}>Forgot</button>
						        <button class="continue">Login</button>
						        <br /> <br />
						        {/*href placeholder for now */}
						        <button class="acnt_stuff" color="primary" onClick={createAccount}>Sign Up</button>
						    </FormGroup>
					     
					     </Form>
					</Col>
				</Row>
			</div>
			<div id="signup">
				<Row>
					<Col xs="5">
						<div id="image_container2">
							<img id="createImage" alt="" src={login} />
						</div>
					</Col>
					<Col xs="7">
						<Form >
						<h1> Create an Account </h1>
							<FormGroup class="container">
								<input type="email" class="email" placeholder="Enter Email" /> <br />
								<input type="text" class="uname" placeholder="Enter Username" /><br />
								<input type="password" class="psw" placeholder="Enter Password" /><br />
								<input type="password" class="psw" placeholder="Confirm Password" />
								<br />
								<button class="back" color="danger" onClick={goBackLogin}> Cancel </button>
								<button class="continue" color="success"> Submit </button>
							</FormGroup>
						</Form>
					</Col>
				</Row>
			</div>
		</div>
		);
	}
}

export default Login;