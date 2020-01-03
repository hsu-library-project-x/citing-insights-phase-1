import {TreeItem, TreeView} from '@material-ui/lab';
import { ListItem, List, ListItemAvatar, ListItemIcon, Typography, ListItemText  } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';


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

    nestItems(classes, assignments){
        return classes.map(d => {
            let notes = d.course_note ? d.course_note : "";
            return (<ListItem nodeId={d._id}>
                <ListItemIcon>
                    <FolderIcon />
                </ListItemIcon>
                <ListItemText
                    primary={d.name}
                    secondary={notes}
                />
                {assignments.map(a => {
                    if (a.class_id === d._id) {
                        console.log(a);
                        let a_notes = a.note ? a.note : "";
                        return <ListItem nodeId={a._id}>
                            <ListItemText
                                primary={a.name}
                                secondary={a_notes}
                            />
                        </ListItem>;
                    }else return null;
                })}
            </ListItem>);
        });
    }

    render() {
        return(
            <List
                // defaultCollapseIcon={<ExpandMoreIcon />}
                // defaultExpandIcon={<ChevronRightIcon />}
            >
                {this.nestItems(this.state.classList, this.state.assignmentList)}
            </List>
        );
    }
}

export default CreateTree;