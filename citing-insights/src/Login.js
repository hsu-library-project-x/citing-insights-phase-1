// Our Login "Page" for Citing Insights

// Import Libraries
import React, {Component} from 'react';
import {Row, Col, Button, Form, FormGroup, Input} from 'reactstrap';
import './App.css';

// Jumbotron, Button, Badge, Container, Row, Col are all Reactrap elements that we are 
//     going to use for our login
//import { Jumbotron, Button, Badge } from 'reactstrap';
//import { Container, Row, Col } from 'reactstrap';

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
		<div className="container">
			<div id= "login_page">
				<Row>
					<Col xs="5">
						<div id="image_container">
						{/* <img id="login_image" src="login_img.jpg" alt="library_picture" /> */}
						</div>
					</Col>
					<Col xs="7">
						<Form id="login_form" > 
							<h1 class="title"> Welcome </h1>
							<FormGroup class="container">
						      {/* div of class container holds the username, password, and 
						          Login button. Also has a remember me checkbox. Currently remember me is not
						      	  functional and Login will just take you to our Demo page*/}
						        {/* <label for="uname">Username</label> */}
						        <Input type="text" placeholder="Enter Username" name="uname" required/>
						        {/* <label for="psw">Password</label> */}
						        <Input type="password" placeholder="Enter Password" name="psw" required/>
						        <br/>
						        <Button color="success">Login</Button>
						        
						         <Button color="secondary" onClick={forgotInfo}  > Forgot username or password </Button>

						        <br /> <br />
						        {/* 
						        <label>
						          Remember Me
						          <input type="checkbox"  name="remember"/>
						        </label> */} 
						        {/*href placeholder for now */}

						        <Button color="primary" onClick={createAccount}>Create Account </Button>
						    </FormGroup>
					     
					     </Form>
				     </Col>
			    </Row>
			</div>
			<div id="signup">
				<Row>
					<Col xs="5">
						<div id="image_container2">
						{/* <img id="login_image" src="login_img.jpg" alt="library_picture" /> */}
						</div>
					</Col>
					<Col xs="7">
						<Form>
						<h1> Create an Account </h1>
							<FormGroup>
								<Input type="email" name="email" placeholder="Enter Email" /> 
								<Input type="text" name="username" placeholder="Enter Username" />
								<Input type="password" name="password" placeholder="Enter Password" />
								<Input type="password" name="confirm_password" placeholder="Confirm Password" />
								<br />
								<Button color="success"> Submit </Button>
								<Button color="danger" onClick={goBackLogin}> Cancel </Button>
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