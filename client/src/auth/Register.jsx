import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../actions/authActions";
import classnames from "classnames";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
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
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <form id="register-form">
                    <h1> Create an Account </h1>
                    <input id="emailReg" name="email" type="email" class="email" placeholder="Enter Email" /> <br />
                    <input id="uname" name="username" type="text" class="uname" placeholder="Enter Username" /><br />
                    <input id="pwd1" name="password" type="password" class="psw" placeholder="Enter Password" /><br />
                    <input id="pwd2" name="password2" type="password" class="psw" placeholder="Confirm Password" />
                    <br />
                </form>
                <button class="back" onClick={this.toggleLogin}>Go Back</button>
                <button class="continue" onClick={this.tryRegister}>Confirm</button>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));