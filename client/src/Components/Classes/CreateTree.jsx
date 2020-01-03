import {TreeItem, TreeView} from '@material-ui/lab';
import { ListItem, List, ListItemAvatar, Divider , ListItemText,ListItemSecondaryAction,
    Container, Avatar, IconButton, Tooltip  } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentIcon from '@material-ui/icons/Assignment';


import React, {Component} from 'react';

class CreateTree extends Component {
    constructor(props) {
        super(props);
        this.state={
            classList:[],
            assignmentList:[],
        };

        this.getClasses();
        this.getAssignments();
        this.nestItems = this.nestItems.bind(this);
        this.getClasses = this.getClasses.bind(this);
        this.getAssignments = this.getAssignments.bind(this);
        this.createTreeItems = this.createTreeItems.bind(this);
        this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
        this.handleDeleteAssignment = this.handleDeleteAssignment.bind(this);
    }
    createTreeItems(json, state){
        let list=[];

        for (let i=0; i<json.length;i++ ){
            list.push(json[i]);
        }

        this.setState({[state]:list});
    }

    getClasses() {
        fetch('http://localhost:5000/courses/' + this.props.user_id)
            .then(function (response) {
                return response.json();
            })
            .then(d => this.createTreeItems(d, 'classList'));
    }

     getAssignments() {
         fetch('http://localhost:5000/assignments')
            .then(function (response) {
              return response.json();
            })
                .then(d => {
                    this.createTreeItems(d, 'assignmentList');
                });
    }

    handleDeleteCourse(event) {

        let self = this;
        if (window.confirm("Are you sure you wish to delete this course?")) {
            if (window.confirm("WARNING!! You are about to delete this course, please click OK to proceed")) {

                const target = event.target;
                fetch('http://localhost:5000/courses/' + target.id, {
                    method: 'Delete',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then(() => {
                    self.getClasses();
                });
            }
        }
    }

    handleDeleteAssignment(event) {
        let self = this;
        if (window.confirm("Are you sure you wish to delete this?")) {
            const target = event.target;

            fetch('http://localhost:5000/assignments/' + target.id, {
                method: 'Delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then( () => { //unsued param response
                    self.getAssignments(this.state.ClassId);
                });
        }
    }

    nestItems(classes, assignments){
        return classes.map(d => {
            let notes = d.course_note ? d.course_note : "";
            return (
                <List dense={true} style={{padding:0, margin:0}}>
                <ListItem id={d._id} >
                    <ListItemAvatar>
                        <Avatar>
                            <FolderIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        style={{padding:0, margin:0}}
                        primary={d.name}
                        secondary={notes}
                    />
                    <ListItemSecondaryAction>
                        <Tooltip title="Delete Course" aria-label="delete course">
                            <IconButton edge="end" aria-label="delete" onClick={this.handleDeleteCourse}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset"/>
                    <List
                    component={"div"}
                    disablePadding={true}
                    style={{paddingLeft: "4em", paddingRight:"4em"}}
                    dense={true}
                >
                    {assignments.map(a => {
                        if (a.class_id === d._id) {
                            let a_notes = a.note ? a.note : "";
                            return(
                                <div >
                                <ListItem id={a._id} style={{margin:0}}>
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
                                            <IconButton edge="end" aria-label="delete" onClick={this.handleDeleteAssignment}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                    <Divider variant="inset"/>
                                </div>);
                        }else return null;
                    })}
                </List>
                </List>
            );
        });
    }

    render() {
        return(
            <Container maxWidth={"sm"}>
                <List dense={true}
                style={{padding:0}}>
                    {this.nestItems(this.state.classList, this.state.assignmentList)}
                </List>
            </Container>
        );
    }
}

export default CreateTree;