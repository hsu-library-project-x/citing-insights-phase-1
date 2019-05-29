// Our Login "Page" for Citing Insights

// Import Libraries
import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import './App.css';

// Jumbotron, Button, Badge, Container, Row, Col are all Reactrap elements that we are 
//     going to use for our login
//import { Jumbotron, Button, Badge } from 'reactstrap';
//import { Container, Row, Col } from 'reactstrap';


class Login extends Component{
	render(){
		return(

		<div id= "login_page" class="animate">

		<Row>
			<Col xs="6">
				<div id="image_container">
				{/* <img id="login_image" src="login_img.jpg" alt="library_picture" /> */}
				</div>
			</Col>
			<Col xs="6">
				<form id="login_form" > 
					<h1 class="title"> Login </h1>
					<div class="container" >
				      {/* div of class container holds the username, password, and 
				          Login button. Also has a remember me checkbox. Currently remember me is not
				      	  functional and Login will just take you to our Demo page*/}
				     
				        {/* <label for="uname">Username</label> */}
				        <input type="text" placeholder="Enter Username" name="uname" required/>

				        {/* <label for="psw">Password</label> */}
				        <input type="password" placeholder="Enter Password" name="psw" required/>

				        <br/>
				    </div>
				        
				    <div id="bottom_of_login">
				        <button type="submit">Login</button>
				        <label>
				          Remember Me
				          <input type="checkbox" checked="checked" name="remember"/>
				        </label>
				    </div>
			     
			     </form>
		     </Col>
	    </Row>
	    </div>

/* DO WE NEED THIS? 


 
	div of class container holds the cancel button to and forgot password hyperlink.
			So far cancel button works. Forgot password does not
	      <div class="container">
	        <button type="button" class="cancelbtn">Cancel</button>
	        <span class="psw"> <a href="#"> Forgot password?</a></span>
	      </div>
	      */

		);
	}
}

export default Login;