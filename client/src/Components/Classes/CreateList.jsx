import React, {Component} from "react";
import {
    Avatar, Divider, IconButton,
    List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText,
    Tooltip, Popover, Typography, MenuItem, Select, InputLabel, FormControl,

} from "@material-ui/core";
import ClassIcon from "@material-ui/icons/Class";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from "@material-ui/icons/Assignment";
import MoreVertIcon from '@material-ui/icons/MoreVert';

class CreateList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list:[],
            anchorEl: null,
            AvailableGroups: [],
            GroupName: ""
        };

        this.getGroups();

        this.nestItems = this.nestItems.bind(this);
        this.handleDeleteAssignment = this.handleDeleteAssignment.bind(this);
        this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
        this.handleAlert = this.handleAlert.bind(this);
        this.tick= this.tick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleClick(event){
        this.setState({anchorEl: event.currentTarget});
    }

    handleClose(){
        this.setState({anchorEl: null});
    }

    tick(oldProgress){
        this.setState({progress: oldProgress + 1});
    }

    handleAlert(message, severity){
        this.props.handleQueueAlert(message, severity);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleDeleteCourse(e, id) {
        if (window.confirm("Are you sure you wish to delete this course?")) {
            if (window.confirm("WARNING!! If you delete this course all assignments associated will also be deleted")) {
                fetch('api/courses/' + id, {
                    method: 'Delete',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                        if (response.status === 204) {
                            this.handleAlert('Course Deleted', 'success');
                        }
                        else {
                            this.handleAlert('Could not Delete Course', 'error');
                        }
                    }
                );
            }
        }
    }

    handleDeleteAssignment(e, id) {
        if (window.confirm("Are you sure you wish to delete this?")) {
            fetch('api/assignments/' + id, {
                method: 'Delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                if (response.status === 204) {
                    this.handleAlert('Assignment Deleted', 'success');
                }
                else {
                    this.handleAlert('Could not Delete Assignment', 'error');
                }
            });
        }
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

    nestItems(classes, assignments) {
        let groupList = this.state.AvailableGroups;
        let optionGroups = groupList.map((group) =>
            <MenuItem value={group._id} key={group._id}> {group.name}</MenuItem>
        );
        let list = classes.map(d => {
            let notes = d.course_note ? d.course_note : "";
            return (
                <List key={d._id}  component={"div"}
                      disablePadding={true}
                      style={{ paddingLeft: "4em" }}
                      dense={true}
                >
                    <ListItem key={d._id} id={d._id} >
                        <ListItemAvatar>
                            <Avatar>
                                <ClassIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            style={{ padding: 0, margin: 0 }}
                            primary={d.name}
                            secondary={notes}
                        />
                        <ListItemSecondaryAction>
                            <Tooltip title="Delete Course" aria-label="delete course">
                                <IconButton edge="end" aria-label="delete" onClick={(e) => this.handleDeleteCourse(e, d._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Groups" aria-label="groups">
                                <IconButton edge="end" aria-label="groups"
                                             onClick={ this.handleClick}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            </Tooltip>
                            <Popover
                                open={Boolean(this.state.anchorEl)}
                                anchorEl={this.state.anchorEl}
                                onClose={this.handleClose}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <Typography style={{ padding: "0.5em" }}> Current Groups: </Typography>
                                <List
                                      style={{ paddingLeft: "1em" }}
                                >
                                    <ListItem>
                                        <ListItemText
                                        style={{ padding: 0, margin: 0 }}
                                        primary={'Group 1'}
                                        />
                                        <ListItemSecondaryAction>
                                            <Tooltip title="Delete Group" aria-label="delete course">
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            style={{ padding: 0, margin: 0 }}
                                            primary={'Group 2'}
                                        />
                                        <ListItemSecondaryAction>
                                            <Tooltip title="Delete Group" aria-label="delete course">
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            style={{ padding: 0, margin: 0 }}
                                            primary={'Group 3'}
                                        />
                                        <ListItemSecondaryAction>
                                            <Tooltip title="Delete Group" aria-label="delete course">
                                                <IconButton edge="end" aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </List>
                                <FormControl
                                    style={{ padding: "0.5em" }}>
                                    <InputLabel id="groupSelect-label-addgroup" style={{ padding: "0.5em" }}>Add  a Group</InputLabel>
                                <Select
                                    name="GroupName"
                                    required
                                    labelId={"groupSelect-label-addgroup"}
                                    onChange={this.handleInputChange}
                                    value={this.state.GroupName}
                                    style={{ minWidth: 150}}
                                >
                                    <MenuItem value={""} disabled> Select a Group</MenuItem>
                                    {optionGroups}
                                </Select>
                                </FormControl>
                                <Typography style={{ padding: "0.5em" }}> Associated Members </Typography>
                            </Popover>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" />
                    <List
                        component={"div"}
                        disablePadding={true}
                        style={{ paddingLeft: "4em" }}
                        dense={true}
                    >
                        {assignments.map(a => {
                            if (a.class_id === d._id) {
                                let a_notes = a.note ? a.note : "";
                                return (
                                    <div key={`divider-${a._id}`}>
                                        <ListItem id={a._id} style={{ margin: 0 }} key={a._id}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <AssignmentIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={a.name}
                                                secondary={a_notes}
                                            />
                                            <ListItemSecondaryAction>
                                                <Tooltip title="Delete Assignment" aria-label="delete assignment">
                                                    <IconButton edge="end"
                                                                aria-label="delete"
                                                                onClick={e => this.handleDeleteAssignment(e, a._id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                {/*<Tooltip title="Groups" aria-label="groups">*/}
                                                {/*    <IconButton edge="end" aria-label="groups"*/}
                                                {/*                onClick={ this.handleClick}*/}
                                                {/*    >*/}
                                                {/*        <MoreVertIcon />*/}
                                                {/*    </IconButton>*/}
                                                {/*</Tooltip>*/}
                                                {/*<Popover*/}
                                                {/*    open={Boolean(this.state.anchorEl)}*/}
                                                {/*    anchorEl={this.state.anchorEl}*/}
                                                {/*    onClose={this.handleClose}*/}
                                                {/*    anchorOrigin={{*/}
                                                {/*        vertical: 'top',*/}
                                                {/*        horizontal: 'right',*/}
                                                {/*    }}*/}
                                                {/*    transformOrigin={{*/}
                                                {/*        vertical: 'top',*/}
                                                {/*        horizontal: 'left',*/}
                                                {/*    }}*/}
                                                {/*    style={{padding: '2em'}}*/}
                                                {/*>*/}
                                                {/*    <Typography> Group Info </Typography>*/}
                                                {/*    <Typography> Group Info </Typography>*/}
                                                {/*    <Typography> Group Info </Typography>*/}
                                                {/*    <Typography> Group Info </Typography>*/}
                                                {/*</Popover>*/}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider variant="inset" />
                                    </div>
                                );
                            } else return null;
                        })}
                    </List>
                </List>
            );
        });
        return list;

    }

    render() {
        return(
            <List dense={true} style={{ padding: 0 }} >
                {
                    this.nestItems(this.props.classList, this.props.assignmentList)
                }
            </List>
        );
    }
}

export default CreateList;