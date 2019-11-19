import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';
import Feedback from "./Feedback";
import config from './config';
import { GoogleLogout } from 'react-google-login';
import logo from './images/CIHome.png';

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

    //Removed this for time being; we really only get to analyze by going through tasks
    //     <NavItem>
    //     <NavLink to="/analyze">Analyze</NavLink>
    //     </NavItem>
    // <NavItem>
    //<NavLink to="/accountsettings">Settings</NavLink>
    //</NavItem> 

    render() {
        let content = !!this.props.isAuthenticated ? (
                <Navbar primary expand="md">
                    <NavbarBrand><img className="navBarLogo" src={logo} alt="Citing_Insights_Logo"  role="image" ></img></NavbarBrand>
                    {/* NavItem (Reactstrap) -- item in our navation bar*/}
                    <NavItem>
                        <Feedback email={this.props.user.email} user_id={this.props.user.id}/>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/home">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/tasks">Tasks</NavLink>
                    </NavItem>
                    <NavItem onClick={this.responseGoogle}>
                        <GoogleLogout
                            clientId={config.GOOGLE_CLIENT_ID}
                            render={renderProps => (
                                <button class={"NavLinkButton"} onClick={renderProps.onClick} disabled={renderProps.disabled}>Logout</button>
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
                <Navbar primary expand="md">
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
