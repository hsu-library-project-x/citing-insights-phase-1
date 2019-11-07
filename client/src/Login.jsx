// Citing Insights Login and Home 
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { HashRouter, Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import Button from '@material-ui/core/Button';
import config from "./config.json";

// // import Logo
// import logo from "./images/CIHome.png";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false,
			user: null,
			token: ""
		};
		this.getInfo = this.getInfo.bind(this);
	}

	componentDidMount() {
		if (this.props.isAuthenticated === true) {
			this.props.history.push({
				pathname: "/",
				props: { ...this.state }
			});
		}
	}

	onFailure = (err) => {
		alert(err);
	};

	logout = () => {
		this.setState({ isAuthenticated: false, token: '', user: null })
	};
	getInfo() {
		this.props.passInfoLogin(this.state.isAuthenticated, this.state.token, this.state.user);
	}

	responseGoogle = (response) => {
		const tokenBlob = new Blob(
			[JSON.stringify({ access_token: response.accessToken }, null, 2)],
			{ type: 'application/json' }
		);
		const options = {
			//origin: "*",
			method: 'POST',
			body: tokenBlob,
			mode: 'cors',
			cache: 'default',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Access-Control-Allow': true
			}
		};

		fetch('http://localhost:5000/users/auth', options).then(r => {

			//This is the token we'll use to authenticate each of the user's 
			//actions (things that require auth: make class, remove assignment, etc.)
			const token = r.headers.get('x-auth-token');
			r.json().then(user => {
				if (token) {
					this.setState({
						isAuthenticated: true,
						user: user,
						token: token
					});
					this.getInfo();
					this.props.history.push({
						pathname: "/",
						props: {
							isAuthenticated: true,
							user: user,
							token: token
						}
					});
				}
			});
		})
	};

	render() {
		return (
			<div class="container">
				<div id="login_page">
					<h1>The Opportunity to Change the Assessment World</h1>
					<div class="googleLoginContainer" id="google">
						<GoogleLogin
							clientId={config.GOOGLE_CLIENT_ID}
							render={renderProps => (
								<Button onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</Button>
								)}
							buttonText="Sign in with Google"
							onSuccess={this.responseGoogle}
							onFailure={this.onFailure}
						/>
					</div>
				</div >
				<HashRouter>
				<Link to=""> About Us</ Link>
				<Link to=""> Contact Us </Link>
				</HashRouter>
			</div >
		);
	}
}

export default withRouter(Login);