import React, { Component } from 'react';
import {AppBar, Toolbar,Typography, Button, Grid ,Tooltip  } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import config from '../../config.json';
import {createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import logo from "./logoCiting.svg";


class Navibar extends Component {
    constructor(props) {
        super(props);
        this.responseGoogle = this.responseGoogle.bind(this);
    }


    responseGoogle = () => {
        this.props.passInfoLogout();
        //Need to link to function in App.js, to reset our state to nothing
        this.props.history.push({
            pathname: "/login",
            props: {
                isAuthenticated: false,
                user: null,
                token: "",
            }
        });
    };

    render() {

        // console.log(this.props.configurations);
        const theme = createMuiTheme({
            palette: {
                primary: { main: this.props.configurations.primaryColor }, // dk green
                secondary: { main: this.props.configurations.secondaryColor } // light green
            },
        });

        return (
            <MuiThemeProvider theme={theme}>
                <AppBar color='primary' position="static">
                    <Toolbar >
                        <Grid  container spacing={1}>
                            <Grid item xs={5}>
                                <Typography variant="h4" component="h1" color="inherit" align='left' style={{marginTop:'0.3em'}}  >
                                   {this.props.configurations.institutionName}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <img alt={'citing insights logo'} src={logo} />
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={1}>
                                {this.props.isAuthenticated ?
                                    <Tooltip title={this.props.isAuthenticated ? this.props.user.name : null} aria-label="username">
                                        <span>
                                            <GoogleLogout
                                                clientId={config.GOOGLE_CLIENT_ID}
                                                render={renderProps => (
                                                    <Button
                                                        className={"NavLinkButton"}
                                                        variant={"contained"}
                                                        disabled={renderProps.disabled}
                                                        onClick={this.responseGoogle}
                                                    >
                                                            Logout
                                                    </Button>
                                                )}
                                                buttonText="Log Out"
                                                onLogoutSuccess={this.responseGoogle}
                                                onFailure={this.onFailure}
                                            />
                                        </span>
                                    </Tooltip>
                                    : null
                                }
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>

                );
        }
    }

    export default withRouter(Navibar);
