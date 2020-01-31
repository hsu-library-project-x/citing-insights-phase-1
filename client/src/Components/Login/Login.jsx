import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { GoogleLogin } from "react-google-login";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {Box, Grid, Button} from "@material-ui/core";
import Base64Image from './Base64Image.jsx';
import config from "../../config.json";

import picture from './lib1.jpg';   // eventually replace with props

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isAuthenticated: false,
			user: null,
			token: "",
		};
		this.getInfo = this.getInfo.bind(this);
		this.height = window.innerHeight/1.29;
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
				'Access-Control-Allow': true,
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

		const theme = createMuiTheme({
			palette: {
				primary: { main: this.props.configurations.primaryColor },
				secondary: { main: this.props.configurations.secondaryColor }
			},
		});

		const imageBase64String = this.props.configurations.images.img.data;
		
		console.log('herrr' + JSON.stringify(imageBase64String));

		return (
			<MuiThemeProvider theme={theme}>
				<Grid container spacing={0}>
					<Grid item xs={7}>
						<Base64Image imageBase64String={imageBase64String} />
						{/* <Box style={{backgroundImage: `url(${`data:image/jpeg;base64,${img}`} )`, height: this.height}} /> */}
					</Grid>
					<Grid item xs={5}>
						<h1 style={{textAlign: "center", margin:"1em"}}> Your Opportunity To Change the Assessment World </h1>
						<div style={{textAlign:"center", marginTop:"2em"}} id="google">
							<GoogleLogin
								clientId={config.GOOGLE_CLIENT_ID}
								render={renderProps => (
									<Button
										color="primary"
										variant="contained"
										onClick={renderProps.onClick}
										disabled={renderProps.disabled}>
										Login with Google
									</Button>
								)}
								buttonText="Sign in with Google"
								onSuccess={this.responseGoogle}
								onFailure={this.onFailure}
							/>
						</div>
					</Grid>
				</Grid>
			</MuiThemeProvider>
		);
	}
}

export default withRouter(Login);