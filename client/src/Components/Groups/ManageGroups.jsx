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
import {withRouter} from "react-router-dom";
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from "@material-ui/icons/Delete";
import AddAlertIcon from '@material-ui/icons/AddAlert';

import CreateGroup from "./CreateGroup";
import RequestGroup from "./RequestGroup";

class ManageGroups extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
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

    render() {
        return(
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
                            <CreateGroup />
                        </Grid>
                        <Grid item>
                            <RequestGroup />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <List
                        component={"div"}
                        disablePadding={true}
                        style={{ paddingLeft: "4em" }}
                        dense={true}
                    >
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <GroupWorkIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={'Group1'}
                                secondary={'group 1 notes'}
                            />
                            <ListItemSecondaryAction>
                                {/*<Tooltip title="Add to Group" aria-label="add to group">*/}
                                {/*    <IconButton edge="end"*/}
                                {/*                aria-label="delete"*/}
                                {/*        // onClick={e => this.handleDeleteAssignment(e, a._id)}*/}
                                {/*    >*/}
                                {/*        <PersonAddIcon />*/}
                                {/*    </IconButton>*/}
                                {/*</Tooltip>*/}
                                <Tooltip title="Edit Group" aria-label="edit group">
                                    <IconButton edge="end"
                                                aria-label="edit"
                                        // onClick={e => this.handleDeleteAssignment(e, a._id)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Group" aria-label="delete group">
                                    <IconButton edge="end"
                                                aria-label="delete"
                                                onClick={e => this.handleDeleteGroup(e)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Join Requests" aria-label="requests to join group">
                                    <IconButton edge="end"
                                                aria-label="notification"
                                        // onClick={e => this.handleDeleteAssignment(e, a._id)}
                                    >
                                        <AddAlertIcon />
                                    </IconButton>
                                </Tooltip>


                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <GroupWorkIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={'Group2'}
                                secondary={'group 2 notes'}
                            />
                            <ListItemSecondaryAction>
                                <Tooltip title="Edit Group" aria-label="edit group">
                                    <IconButton edge="end"
                                                aria-label="edit"
                                        // onClick={e => this.handleDeleteAssignment(e, a._id)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Group" aria-label="delete group">
                                    <IconButton edge="end"
                                                aria-label="delete"
                                            onClick={e => this.handleDeleteGroup(e)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Join Requests" aria-label="requests to join group">
                                    <IconButton edge="end"
                                                aria-label="notification"
                                        // onClick={e => this.handleDeleteAssignment(e, a._id)}
                                    >
                                        <AddAlertIcon />
                                    </IconButton>
                                </Tooltip>


                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <GroupWorkIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={'Group3'}
                                secondary={'group 3 notes'}
                            />
                            <ListItemSecondaryAction>
                                <Tooltip title="Edit Group" aria-label="edit group">
                                    <IconButton edge="end"
                                                aria-label="edit"
                                        // onClick={e => this.handleDeleteAssignment(e, a._id)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete Group" aria-label="delete group">
                                    <IconButton edge="end"
                                                aria-label="delete"
                                         onClick={e => this.handleDeleteGroup(e)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Join Requests" aria-label="requests to join group">
                                    <IconButton edge="end"
                                                aria-label="notification"
                                        // onClick={e => this.handleDeleteAssignment(e, a._id)}
                                    >
                                        <AddAlertIcon />
                                    </IconButton>
                                </Tooltip>


                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>
                </Grid>
        </Grid>
            </Container>
        );
    }

}

export default withRouter(ManageGroups);