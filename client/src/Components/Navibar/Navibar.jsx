import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import config from '../../config.json';
import Feedback from "../Feedback/Feedback.jsx";
import logo from './CIHome.png';
import "./Navibar.css";

class Navibar extends Component {
    constructor(props) {
        super(props);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.giveInfo = this.giveInfo.bind(this);
    }

    giveInfo() {
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
                <Navbar primary='true' expand="md">
                    <NavbarBrand><img role='image' className="navBarLogo" src={logo} alt="Citing Insights logo" ></img></NavbarBrand>
                    {/* NavItem (Reactstrap) -- item in our navation bar*/}
                    <NavItem>
                        <Feedback email={this.props.user.email} user_id={this.props.user.id}/>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/tasks">Tasks</NavLink>
                    </NavItem>
                    <NavItem onClick={this.responseGoogle}>
                        <GoogleLogout
                            clientId={config.GOOGLE_CLIENT_ID}
                            render={renderProps => (
                                <button className={"NavLinkButton"} onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</button>
                            )}
                            buttonText="Log Out"
                            onLogoutSuccess={this.responseGoogle}
                            onFailure={this.onFailure}
                        />
                    </NavItem>
                    <NavItem color="light">
                        {this.props.user.name}
                    </NavItem>
                </Navbar>
                ) : (
                <Navbar primary='true' expand="md">
                    <NavbarBrand><img className="navBarLogo" src={logo} alt="logo" ></img></NavbarBrand>
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
