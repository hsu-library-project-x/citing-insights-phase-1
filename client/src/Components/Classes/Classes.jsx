import React, { Component } from 'react';
import { ListItem, List, ListItemAvatar, Divider , ListItemText,ListItemSecondaryAction,
    Container, Avatar, IconButton, Tooltip, Typography  } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import CreateClass from "./CreateClass";
import CreateAssignment from "./CreateAssignment";
import ClassIcon from '@material-ui/icons/Class';
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentIcon from "@material-ui/icons/Assignment";

class Classes extends Component {
  constructor(props) {
    super(props);
    this.state = {
        classList:[],
        assignmentList:[],
        open:false,
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

    getClasses() {
        fetch('http://localhost:5000/courses/' + this.props.user.id)
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

    createTreeItems(json, state){
        let list=[];

        for (let i=0; i<json.length;i++ ){
            list.push(json[i]);
        }

        this.setState({[state]:list});
    }

    handleDeleteCourse(e,id) {
        if (window.confirm("Are you sure you wish to delete this course?")) {
            if (window.confirm("WARNING!! You are about to delete this course, please click OK to proceed")) {
                fetch('http://localhost:5000/courses/' + id, {
                    method: 'Delete',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                        if (response.status === 204){
                            alert("Class Deleted");
                            this.getClasses();
                        }
                        else{
                            alert("Something went wrong. Could not delete course");
                        }
                    }
                );
            }
        }
    }

    handleDeleteAssignment(e, id) {
        if (window.confirm("Are you sure you wish to delete this?")) {
            fetch('http://localhost:5000/assignments/' + id, {
                method: 'Delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                if (response.status === 204){
                    alert("Assignment Deleted");
                    this.getAssignments();
                }
                else{
                    alert("Something went wrong. Could not delete assignment");
                }
            });
        }
    }

    nestItems(classes, assignments){
        return classes.map(d => {
            let notes = d.course_note ? d.course_note : "";
            return (
                <List key={d._id} dense={true} style={{padding:0, margin:0}}>
                    <ListItem key={d._id} id={d._id} >
                        <ListItemAvatar>
                            <Avatar>
                                <ClassIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            style={{padding:0, margin:0}}
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
                                        <ListItem id={a._id} style={{margin:0}} key={a._id}>
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
                                                    <IconButton edge="end" aria-label="delete" onClick={ e => this.handleDeleteAssignment(e, a._id)}>
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

    return (
        <Container maxWidth={'md'}>
          <Typography style={{marginTop: "1em"}} align={"center"} variant={"h3"} component={"h1"} gutterBottom={true}>
              Manage Coursework
          </Typography>

           <Container maxWidth={"sm"}>
                <List dense={true} style={{padding:0}}>
                    {this.nestItems(this.state.classList, this.state.assignmentList)}
                </List>
           </Container>

          <CreateAssignment
              classList={this.state.classList}
              getAssignments={this.getAssignments}
          />

          <CreateClass
            user_id={this.props.user.id}
            getClasses={this.getClasses}
          />
        </Container>

    );
  }
}

export default withRouter(Classes);
