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
    Avatar, ListItemText, ListItemSecondaryAction, Tooltip, IconButton, Grid
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

class ManageGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AvailableGroups: []
        };

        this.getGroups();

        this.getGroups = this.getGroups.bind(this);
        this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
        this.GenList = this.GenList.bind(this);
    }

    getGroups() {
        let that = this;
        fetch('/api/groups/').then(function (response) {
            return response.json();
        })
            .then(function (myJson) {
                that.setState({ AvailableGroups: myJson })
            });
    }

    handleDeleteGroup(e, id) {
        if (window.confirm("Are you sure you wish to delete this group?")) {
            if (window.confirm("WARNING!! If you delete this group, this group will stop existing for you and other members")) {
                // fetch('api/courses/' + id, {
                //     method: 'Delete',
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     },
                // }).then((response) => {
                //         if (response.status === 204) {
                //             this.handleAlert('Course Deleted', 'success');
                //         }
                //         else {
                //             this.handleAlert('Could not Delete Course', 'error');
                //         }
                //     }
                // );
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
                            <EditGroup />
                            <Tooltip title="Delete Group" aria-label="delete group">
                                <IconButton edge="end"
                                    aria-label="delete"
                                    onClick={e => that.handleDeleteGroup(e)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            <JoinRequests />


                        </ListItemSecondaryAction>
                    </ListItem>

                )
            })}
        </List>;
    }

    render() {
        return (
            <Container maxWidth={"md"}>
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
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-end"
                        >
                            <Grid item >
                                <CreateGroup
                                    user={this.props.user} />
                            </Grid>
                            <Grid item>
                                <RequestGroup
                                    user={this.props.user} />
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