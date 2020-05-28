import React, { Component } from "react";
import {
    TextField, Modal, Paper, Fab, Button, Typography, Select, FormControl,
    MenuItem, InputLabel
} from "@material-ui/core";
import { withRouter } from "react-router-dom";


class RequestGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            AvailableGroups: [],
            GroupName: '',
            Message: '',
        };

        this.getGroups();

        this.getGroups = this.getGroups.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        //  this.handleAlert = this.handleAlert.bind(this);
    }

    // handleAlert(message, severity){
    //     this.props.handleQueueAlert(message, severity);
    // }

    getGroups() {
        let that = this;
        fetch('/api/groups/').then(function (response) {
            return response.json();
        })
            .then(function (myJson) {
                that.setState({ AvailableGroups: myJson })
            });
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
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

    render() {
        // let groups = this.props.groupList.map(d => {
        //     return (
        //         <MenuItem value={d._id} key={d._id + d.name}>
        //             {d.name}
        //         </MenuItem>
        //     );
        //
        // });
        console.log(this.state);
        let groupList = this.state.AvailableGroups;
        let optionGroups = groupList.map((group) =>
            <MenuItem value={group._id} key={group._id}> {group.name}</MenuItem>
        );
        return (
            <div>
                <Fab type="button"
                    variant="extended"
                    color={'primary'}
                    onClick={this.handleOpen}
                    size={"small"}
                    style={{ margin: "1em" }}
                >
                    Request Group
                </Fab>
                <Modal
                    aria-labelledby="request-group-modal"
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition={true}
                    style={{ marginTop: '5%', width: '50%', marginRight: 'auto', marginLeft: 'auto' }}
                >
                    <Paper>
                        <Typography style={{ paddingTop: "1em" }} align={"center"} variant={"h4"} component={"h2"}
                            gutterBottom={true}>
                            Request Group
                        </Typography>
                        <form className={'modal_form'} onSubmit={(event) => {
                            event.preventDefault();

                            let pending_member = {
                                id: this.state.GroupName,
                                email: this.props.user.email,
                                message: this.state.Message
                            };

                            let json = JSON.stringify(pending_member);

                            fetch("/api/groups/pending", {
                                method: "PUT",
                                body: json,
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            })
                                .then((response) => {
                                    this.handleClose();
                                    alert("Request to join sent to group's administrator");
                                })


                        }}>
                            <FormControl >
                                <InputLabel id="groupSelect-label">Select a Group</InputLabel>
                                <Select
                                    name="GroupName"
                                    required
                                    labelId={"groupSelect-label"}
                                    onChange={this.handleInputChange}
                                    value={this.state.GroupName}
                                    style={{ minWidth: 150 }}
                                >
                                    <MenuItem value={""} disabled> Select a Group</MenuItem>
                                    {optionGroups}
                                </Select>
                                <br />
                                <TextField
                                    name="Message"
                                    label={"Message (optional)"}
                                    onChange={this.handleInputChange}
                                    multiline
                                    rowsMax="4"
                                    style={{ marginBottom: "1em" }} />

                                <Button variant="contained" type="submit" color="primary"> Submit </Button>
                            </FormControl>
                        </form>
                    </Paper>
                </Modal >
            </div >
        );
    }
}

export default withRouter(RequestGroup);