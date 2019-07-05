import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { Row, Col, Form, FormGroup } from 'reactstrap';
import loginPic from '../images/UniversityCenterXLg.jpg';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/tasks"); // push user to dashboard when they login
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }


    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
    };

    forgotInfo = props => {
        window.location.href = "#/passrecov";
    }



    render() {
        const { errors } = this.state;
        return (

            <div class="container">
                <div id="login_page">
                    <Row>
                        <Col xs="6">
                            <div id="image_container">
                                <img id="welcome_img" alt="" src={loginPic} />
                            </div>
                        </Col>
                        <Col xs="6">
                            <div class="beside_picture">
                                <div class="container">
                                    <form noValidate onSubmit={this.onSubmit} id="login-form">
                                        <h1> Welcome Back! </h1>
                                        {/* div of class container holds the username, password, and 
                  Login button. Also has a remember me checkbox. Currently remember me is not
                    functional and Login will just take you to our Demo page*/}
                                        {/* <label for="uname">Username</label> */}
                                        <input id="email" name="email" type="email" placeholder="Enter Email" class="email" required /><br />
                                        {/* <label for="psw">Password</label> */}
                                        <input id="myPswd" name="password" type="password" placeholder="Enter Password" class="psw" required />
                                        <br />
                                        <button class="back" onClick={this.forgotInfo}>Forgot</button>
                                        <br /> <br />

                                        <button class="continue" onClick={this.tryLogin}>Login</button>
                                        <button class="acnt_stuff" onClick={this.toggleLogin}>Sign Up</button>
                                        {/*href placeholder for now */}
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}


Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);