import ReactDOM from 'react-dom';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap';

function LoginForm(props){
    const form = (
      <form class="pop-content animate" id="login_form" action="https://www.warbyparker.com/">
          
      <div class="imgcontainer">
        <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Pop">&times;</span>
      </div>

      <div class="container">
        <label for="uname">Username</label>
        <input type="text" placeholder="Enter Username" name="uname" required/>

        <label for="psw">Password</label>
        <input type="password" placeholder="Enter Password" name="psw" required/>
          
        <button type="submit"  >Login</button>
        <label>
          Remember Me
          <input type="checkbox" checked="checked" name="remember"/>
        </label>
      </div>

      <div class="container">
        <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Cancel</button>
        <span class="psw"> <a href="#"> Forgot password?</a></span>
      </div>
      </form>
    );
    ReactDOM.render(form, document.getElementById('id01'));
}

function LogoutForm(props){
  alert("logout");
}

function App() {
  return (
    <div>
      <div class="head">
        <h2>Citing Insights Login Form</h2>
        <p>Welcome to Citing Insights Portal, Please Login:</p>
        <Button color="success" onClick={() => LoginForm()}>Login</Button>
        <Button color="warning" onClick={() => LogoutForm()}>Logout</Button>
      </div>
      <div id="id01" class="pop">
        
      </div>
    </div>
  );
}

export default App;
