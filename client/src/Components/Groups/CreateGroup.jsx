import React, { Component } from "react";
import { TextField, Modal, Paper, Fab, Button, Typography, FormControl } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Papa from "papaparse";

class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            GroupName: '',
            GroupNote: '',
            Members: '',
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    handleValidation = (members) => {
        console.log(members);
        //Need to delimit CSV, and validate emails
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;


        let member_parsed = Papa.parse(members);

        return member_parsed.data;

        //expression.test(String(email).toLowerCase())

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


    handleSubmit(event) {
        event.preventDefault();
        this.handleClose();

        console.log(event);

        let memberArray = this.handleValidation(this.state.members);

        let data = {
            creator: this.props.user.email,
            name: this.state.GroupName,
            note: this.state.GroupNote,
            members: memberArray
        };

        let json = JSON.stringify(data);

        console.log('about to post');
        fetch("/api/groups/", {
            method: "POST",
            body: json,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(() => {
                this.handleClose();
                alert("Group created");
            })
    }

    render() {
        return (
            <div>
                <Fab type="button"
                    variant="extended"
                    color={'primary'}
                    onClick={this.handleOpen}
                    size={"small"}
                    style={{ margin: "1em" }}
                >
                    Create Group
                </Fab>
                <Modal
                    aria-labelledby="create-group-modal"
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition={true}
                    style={{ marginTop: '5%', width: '50%', marginRight: 'auto', marginLeft: 'auto' }}
                >
                    <Paper>
                        <Typography style={{ paddingTop: "1em" }} align={"center"} variant={"h4"}
                            component={"h2"} gutterBottom={true}> Create Group   </Typography>
                        <form className={'modal_form'} onSubmit={(event) => {
                            event.preventDefault();

                            let member_array = Papa.parse(this.state.Members).data;

                            console.log(member_array);
                            let data = {
                                creator: this.props.user.email,
                                name: this.state.GroupName,
                                note: this.state.GroupNote,
                                members: member_array
                            };

                            let json = JSON.stringify(data);

                            console.log('about to post');
                            fetch("/api/groups/", {
                                method: "POST",
                                body: json,
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                }
                            })
                                .then(() => {
                                    this.handleClose();
                                    alert("Group created");
                                })
                        }}
                        >
                            <FormControl>
                                <TextField
                                    label={'Group Name'}
                                    name="GroupName"
                                    value={this.state.GroupName}
                                    onChange={this.handleInputChange}
                                    required
                                    style={{ marginBottom: "1em" }} />
                                <br />
                                <TextField
                                    label={"Notes (optional)"}
                                    name="GroupNote"
                                    value={this.state.GroupNote}
                                    onChange={this.handleInputChange}
                                    multiline
                                    rowsMax="4"
                                    style={{ marginBottom: "1em" }} />
                                <br />
                                <TextField
                                    label="Member Emails"
                                    name="Members"
                                    value={this.state.Members}
                                    onChange={this.handleInputChange}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                                <br />
                                <Button variant="contained" type="submit" color="primary" > Submit </Button>
                            </FormControl>
                        </form>
                    </Paper>
                </Modal>
            </div >
        );
    }
}

export default withRouter(CreateGroup);