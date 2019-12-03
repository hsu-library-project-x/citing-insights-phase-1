import React, { Component } from 'react';
import {AppBar, Toolbar,Typography, Button } from "@material-ui/core";
import { withRouter } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import config from '../../config.json';
import Feedback from "../Feedback/Feedback.jsx";

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
        return (
                <AppBar position="static">
                    <Toolbar>
                    <Typography variant="h6" >
                        Citing Insights  {/*TODO: Add back in svg when ready */}
                    </Typography>
                        {this.props.isAuthenticated ?
                            <div>
                                <Feedback email={this.props.user.email} user_id={this.props.user.id}/>
                                <Button onClick={this.responseGoogle}>
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
                                {this.props.user.name}
                            </div> :
                            <div></div>
                        }
                    </Toolbar>
                </AppBar>
                );
        }
    }

    export default withRouter(Navibar);
