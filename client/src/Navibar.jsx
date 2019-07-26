import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import config from './config';
import {GoogleLogout} from 'react-google-login';

class Navibar extends Component {
    constructor(props) {
        super(props);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.giveInfo = this.giveInfo.bind(this);
    }

    giveInfo(){
        this.props.passInfoLogout();
    }

    
    responseGoogle = (response) => {
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
    }

    render() {
        let content = !!this.props.isAuthenticated ? (
            <Navbar primary expand="md">
                <NavbarBrand>Citing Insights</NavbarBrand>
                {/* NavItem (Reactstrap) -- item in our navation bar*/}
                <NavItem>
                    <NavLink to="/home">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/tasks">Tasks</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/analyze">Analyze</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/accountsettings">Settings</NavLink>
                </NavItem>
                <NavItem onClick={this.responseGoogle}>
                    <GoogleLogout
                        clientId={config.GOOGLE_CLIENT_ID}
                        buttonText="Log Out"
                        onLogoutSuccess={this.responseGoogle}
                        onFailure={this.onFailure}
                    />
                </NavItem>
            </Navbar>
        ) : (
                <Navbar primary expand="md">
                    <NavbarBrand>Citing Insights</NavbarBrand>
                    {/* NavItem (Reactstrap) -- item in our navation bar*/}
                    <NavItem>
                        <NavLink to="/login">Login</NavLink>
                    </NavItem>
                </Navbar>
            )
        return (
            <div>
                {content}
            </div>
        )
    }
}

export default withRouter(Navibar);