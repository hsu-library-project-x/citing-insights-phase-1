// Our Login "Page" for Citing Insights

// Import Libraries
import React, {Component} from 'react';
import './App.css';

// Jumbotron, Button, Badge, Container, Row, Col are all Reactrap elements that we are 
//     going to use for our login
//import { Jumbotron, Button, Badge } from 'reactstrap';
//import { Container, Row, Col } from 'reactstrap';


class Login extends Component{
	render(){
		return(

		// Start our login form with HTML
		<form class="pop-content animate" id="login_form" > 

		  {/* div holds the 'X' check box to leave pop up. 
		      Its class is called imgcontainer because this could hold
		      an avatar image*/}
	      <div class="imgcontainer">
	        <span class="close" title="Close Pop">&times;</span>
	      </div>

	      {/* div of class container holds the username, password, and 
	          Login button. Also has a remember me checkbox. Currently remember me is not
	      	  functional and Login will just take you to our Demo page*/}
	      <div class="container">
	        <label for="uname">Username</label>
	        <input type="text" placeholder="Enter Username" name="uname" required/>

	        <label for="psw">Password</label>
	        <input type="password" placeholder="Enter Password" name="psw" required/>
	          
	        <button type="submit">Login</button>
	        <label>
	          Remember Me
	          <input type="checkbox" checked="checked" name="remember"/>
	        </label>
	      </div>

		{/* div of class container holds the cancel button to and forgot password hyperlink.
			So far cancel button works. Forgot password does not*/}
	      <div class="container">
	        <button type="button" class="cancelbtn">Cancel</button>
	        <span class="psw"> <a href="/"> Forgot password?</a></span>
	      </div>


	     </form>
		);
	}
}

export default Login;