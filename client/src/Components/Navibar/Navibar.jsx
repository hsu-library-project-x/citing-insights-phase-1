import React, { Component } from 'react';
import {AppBar, Toolbar,Typography, Button, Grid ,Tooltip  } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import config from '../../config.json';
import Feedback from "../Feedback/Feedback.jsx";
import {createMuiTheme, MuiThemeProvider, makeStyles, styled } from "@material-ui/core/styles";

import logo from "./logoCiting.svg";


class Navibar extends Component {
    constructor(props) {
        super(props);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.giveInfo = this.giveInfo.bind(this);
        this.state={
            institution: "Institution Name Goes Here",
        }
    }

    giveInfo() {
        this.props.passInfoLogout();
    }

    responseGoogle = () => {
        this.giveInfo();
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
        const theme = createMuiTheme({
            palette: {
                primary: { main: '#25551b' }, // dk green
                secondary: { main: '#5C8021' } // light green
            },

        });

        return (
            <MuiThemeProvider theme={theme}>
                <AppBar color='primary' position="static">
                    <Toolbar>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Typography variant="h1" color="inherit" style={{ flex: 1, fontSize: "2vw" }}>
                                   {this.state.institution}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <img alt={'citing-insights-logo'} src={logo} />
                            </Grid>
                            <Grid item xs={4}></Grid>
                            <Grid item xs={1}>
                                {this.props.isAuthenticated ?
                                    <Tooltip title={this.props.isAuthenticated ? this.props.user.name : null} aria-label="username">
                                        <Button onClick={this.responseGoogle}  >
                                            <GoogleLogout
                                                clientId={config.GOOGLE_CLIENT_ID}
                                                render={renderProps => (
                                                    <Button
                                                        className={"NavLinkButton"}
                                                        variant={"contained"}
                                                        onClick={renderProps.onClick}
                                                        disabled={renderProps.disabled}
                                                    >
                                                            Logout
                                                    </Button>
                                                )}
                                                buttonText="Log Out"
                                                onLogoutSuccess={this.responseGoogle}
                                                onFailure={this.onFailure}
                                            />
                                        </Button>
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
