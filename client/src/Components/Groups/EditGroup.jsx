import React, {Component} from "react";
import {TextField, Modal, Paper, Fab, Button, Typography, FormControl} from "@material-ui/core";
import {withRouter} from "react-router-dom";

class EditGroup extends Component {
    constructor(props) {
        super(props);

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    //call when input changes to update the state
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render(){
        return();
    }
}
export default (EditGroup);
