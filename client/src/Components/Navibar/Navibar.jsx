import React, { Component } from 'react';
import {AppBar, Toolbar,Typography, Button, Grid ,Tooltip  } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import config from '../../config.json';
import Feedback from "../Feedback/Feedback.jsx";
import {createMuiTheme, MuiThemeProvider, makeStyles, styled } from "@material-ui/core/styles";



class Navibar extends Component {
    constructor(props) {
        super(props);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.giveInfo = this.giveInfo.bind(this);
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
                token: ""
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
                        <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
                            Citing Insights  {/*TODO: Add back in svg when ready */}
                        </Typography>


                        {this.props.isAuthenticated ?
                            <Feedback email={this.props.user.email} user_id={this.props.user.id}/> : null
                        }

                        {this.props.isAuthenticated ?
                            <Tooltip title={this.props.isAuthenticated ? this.props.user.name : null} aria-label="username">
                                <Button onClick={this.responseGoogle}  >
                                    <GoogleLogout
                                        clientId={config.GOOGLE_CLIENT_ID}
                                        render={renderProps => (
                                            <button className={"NavLinkButton"} onClick={renderProps.onClick}
                                                    disabled={renderProps.disabled}>Logout</button>
                                        )}
                                        buttonText="Log Out"
                                        onLogoutSuccess={this.responseGoogle}
                                        onFailure={this.onFailure}
                                    />
                                </Button>
                            </Tooltip>
                            : null
                        }
                    </Toolbar>
                </AppBar>
            </MuiThemeProvider>

                );
        }
    }

    export default withRouter(Navibar);
