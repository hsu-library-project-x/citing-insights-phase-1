import React, { Component } from 'react';
import {
    Button,
    Select,
    MenuItem,
    Container,
    Typography,
    Fab,
    ListItem,
    List,
    ListItemAvatar,
    Avatar, ListItemText, ListItemSecondaryAction, Tooltip, IconButton, Grid, Snackbar
} from '@material-ui/core';
import { withRouter } from "react-router-dom";
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";
import AddAlertIcon from '@material-ui/icons/AddAlert';


import CreateGroup from "./CreateGroup";
import RequestGroup from "./RequestGroup";
import EditGroup from "./EditGroup";
import JoinRequests from "./JoinRequests";
import AddAssignment from "./AddAssignment";
import RemoveAssignment from "./RemoveAssignment";

import Alert from "@material-ui/lab/Alert";

class ManageGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AvailableGroups: [],
            snackbarOpen: false, //we get away with only one snackbar vairable because mat-ui only allows one snackbar to be open
            messageInfo: undefined,
        };

        this.getGroups();

        this.getGroups = this.getGroups.bind(this);
        this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
        this.GenList = this.GenList.bind(this);
        this.processQueue = this.processQueue.bind(this);
        this.handleQueueAlert = this.handleQueueAlert.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleExited = this.handleExited.bind(this);

        this.queueRef = React.createRef();
        this.queueRef.current = [];
    }

    


    processQueue() {
        if (this.queueRef.current.length > 0) {
            this.setState({
                messageInfo: this.queueRef.current.shift(),
                snackbarOpen: true
            }
            );
        }
    };

    handleQueueAlert(message, severity) {
        this.queueRef.current.push({
            message: message,
            severity: severity,
            key: new Date().getTime(),
        });
        if (this.state.snackbarOpen) {
            this.setState({ snackbarOpen: false });
        } else {
            this.processQueue();
        }
        this.getGroups();
    };

    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ snackbarOpen: false });
    };

    handleExited() {
        this.processQueue();
    };

    DisplayAlerts() {
        return <Snackbar
            key={this.state.messageInfo ? this.state.messageInfo.key : undefined}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={this.state.snackbarOpen}
            autoHideDuration={3000}
            onClose={this.handleClose}
            onExited={this.handleExited}
        >
            <Alert variant={'filled'}
                severity={this.state.messageInfo ? this.state.messageInfo.severity : undefined}
                onClose={this.handleClose}
            >
                {this.state.messageInfo ? this.state.messageInfo.message : undefined}
            </Alert>
        </Snackbar>
    }

    getGroups() {
        let that = this;
        let id = this.props.user.email;
        fetch('/api/groups/findOwner/' + id).then(function (response) {
            return response.json();
        })
            .then(function (myJson) {
                that.setState({ AvailableGroups: myJson })
            });
    }

    handleDeleteGroup(e, id) {
        if (window.confirm("Are you sure you wish to delete this group?")) {
            if (window.confirm("WARNING!! If you delete this group, this group will stop existing for you and other members")) {
                fetch('api/groups/' + id, {
                    method: 'Delete',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    if (response.status === 204) {
                        alert('Group Deleted');
                        //this.handleAlert('Group Deleted', 'success');
                    }
                    else {
                        alert('Cannot delete group');
                        //this.handleAlert('Could not Delete Group', 'error');
                    }
                    this.getGroups();
                }
                );
            }
        }

    }

    GenList() {
        let that = this;
        return <List
            component={"div"}
            disablePadding={true}
            style={{ paddingLeft: "4em" }}
            dense={true}
        >
            {that.state.AvailableGroups.map((group) => {
                return (
                    <ListItem
                        key={group._id}>
                        <ListItemAvatar>
                            <Avatar>
                                <GroupWorkIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={group.name}
                            secondary={group.note}
                        />
                        <ListItemSecondaryAction>
                            <EditGroup
                                id={group._id}
                                handleQueueAlert={this.handleQueueAlert}
                            />
                            <Tooltip title="Delete Group" aria-label="delete group">
                                <IconButton edge="end"
                                    aria-label="delete"
                                    onClick={e => that.handleDeleteGroup(e, group._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            <JoinRequests
                                id={group._id}
                                pendingMembers={group.pendingMembers}
                                handleQueueAlert={this.handleQueueAlert}
                                getGroups={this.getGroups}
                            />


                        </ListItemSecondaryAction>
                    </ListItem>

                )
            })}
        </List>;
    }


    render() {
        return (
            <Container maxWidth={"md"}>
                {this.DisplayAlerts()}
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <Container maxWidth={'md'}>
                            <Typography style={{ marginTop: "1em" }} align={"center"} variant={"h3"} component={"h1"} gutterBottom={true}>
                                Manage Groups
                        </Typography>
                        </Container>
                    </Grid>

                    <Grid item xs={12}>
                        <Container maxWidth={'md'}>
                            <Typography style={{ marginTop: "1em" }} align={"center"} variant={"h4"} component={"h1"} gutterBottom={true}>
                                My Groups
                            </Typography>
                            </Container>

                            <Grid
                                container
                                direction="row"
                                justify="flex-end"
                                alignItems="flex-end"
                            >
                                <Grid item >
                                    <CreateGroup
                                        user={this.props.user}
                                        handleQueueAlert={this.handleQueueAlert}
                                    />
                                </Grid>
                                <Grid item>
                                    <RequestGroup
                                        user={this.props.user}
                                        handleQueueAlert={this.handleQueueAlert}
                                    />
                                </Grid>
                            </Grid>
                    </Grid>

                        <Grid item xs={12}>
                            {this.GenList()}
                        </Grid>
                    </Grid>
            </Container>
                );
            }
        
        }
        
export default withRouter(ManageGroups);