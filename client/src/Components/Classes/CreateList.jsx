import React, {Component} from "react";
import {
    Avatar, CircularProgress, Divider, IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Tooltip
} from "@material-ui/core";
import ClassIcon from "@material-ui/icons/Class";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from "@material-ui/icons/Assignment";

class CreateList extends Component {
    constructor(props) {
        super(props);

        this.nestItems = this.nestItems.bind(this);
        this.handleDeleteAssignment = this.handleDeleteAssignment.bind(this);
        this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
        this.handleAlert = this.handleAlert.bind(this);

    }

    handleAlert(subject, bool){
        if (subject === 'class') {
            this.props.classAlert('delete', bool);
        }
        if(subject === 'assignment'){
            this.props.assignmentAlert('delete', bool);
        }
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
                            this.handleAlert('class', true);
                        }
                        else {
                            this.handleAlert('class', false);
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
                    this.handleAlert('assignment', true);
                }
                else {
                    this.handleAlert('assignment', false);
                }
            });
        }
    }

    nestItems(classes, assignments) {
        return classes.map(d => {
            let notes = d.course_note ? d.course_note : "";
            return (
                <List key={d._id} dense={true} style={{ padding: 0, margin: 0 }}>
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

    }

    render() {
        return(
            <List dense={true} style={{ padding: 0 }} >
                {
                    this.nestItems(this.props.classList, this.props.assignmentList)
                }
            </List>
        )
    }
}

export default CreateList;