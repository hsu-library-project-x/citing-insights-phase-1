import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import './App.css';
import { Jumbotron, Button, Badge } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';

class Login extends Component{
	render(){
		return(
		<form class="pop-content animate" id="login_form" > 
	      <div class="imgcontainer">
	        <span class="close" title="Close Pop">&times;</span>
	      </div>

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

	      <div class="container">
	        <button type="button" class="cancelbtn">Cancel</button>
	        <span class="psw"> <a href=""> Forgot password?</a></span>
	      </div>
	     </form>
		);
	}
}

export default Login;