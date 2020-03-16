import React, { Component } from 'react';
import {
    Container, Typography, CircularProgress, Snackbar
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';

import CreateClass from "./CreateClass";
import CreateAssignment from "./CreateAssignment";
import CreateList from "./CreateList";

class Classes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classList: [],
            assignmentList: [],
            classDeleteSuccess:null,
            classCreateSuccess:null,
            assignmentDeleteSuccess:null,
            assignmentCreateSuccess: null,
            nestedList: null,
            snackbarOpen:true, //we get away with only one snackbar vairable because mat-ui only allows one snackbar to be open
        };

        this.getClasses();
        this.getAssignments();

        this.getClasses = this.getClasses.bind(this);
        this.getAssignments = this.getAssignments.bind(this);
        this.createTreeItems = this.createTreeItems.bind(this);
        this.assignmentAlert = this.assignmentAlert.bind(this);
        this.classAlert = this.classAlert.bind(this);
    }

    getClasses() {
        fetch('/api/courses/' + this.props.user.id)
            .then(function (response) {
                return response.json();
            })
            .then(d => this.createTreeItems(d, 'classList'));
    }

    getAssignments() {
        fetch('/api/assignments/by_user_id/' + this.props.user.id)
            .then(function (response) {
                return response.json();
            })
            .then(d => {
                this.createTreeItems(d, 'assignmentList');
            });
    }

    createTreeItems(json, state) {
        let list = [];
        for (let i = 0; i < json.length; i++) {
            list.push(json[i]);
        }
        this.setState({ [state]: list });
    }

    assignmentAlert(action, bool){
        if(action === 'delete'){
            this.setState({assignmentDeleteSuccess: bool}, ()=> this.getAssignments());
        }

        if(action === 'create'){
            this.setState({assignmentCreateSuccess: bool}, ()=>this.getAssignments());
        }
    }

    classAlert(action, bool){
        if(action === 'delete') {
            this.setState({classDeleteSuccess: bool},()=>this.getClasses());

        }
        if(action === 'create'){
            this.setState({classCreateSuccess: bool}, ()=>  this.getClasses());

        }
    }

    Alerts(){
        if(this.state.classDeleteSuccess !== null){
            if(this.state.classDeleteSuccess === false){
                return <Snackbar
                    open={this.state.snackbarOpen}
                    role={"alert"}
                    autoHideDuration={2000}
                    anchorOrigin={{horizontal:'right', vertical:'top'}}>
                    <Alert variant={'filled'}
                           severity={'error'}
                           onClose={()=>this.setState({snackbarOpen:false})}>
                        Could not Delete Class</Alert>
                </Snackbar>;
            } else{
                return <Snackbar
                    open={this.state.snackbarOpen}
                    role={"alert"}
                    autoHideDuration={2000}
                    anchorOrigin={{horizontal:'right', vertical:'top'}} >
                    <Alert variant={'filled'}
                           severity={'success'}
                           onClose={()=>this.setState({snackbarOpen:false})}>
                        Class Deleted </Alert>
                </Snackbar>
            }
        }
        if(this.state.classCreateSuccess !== null){
            if(this.state.classCreateSuccess === false){
                return <Snackbar
                    open={this.state.snackbarOpen}
                    role={"alert"}
                    autoHideDuration={2000}
                    anchorOrigin={{horizontal:'right', vertical:'top'}}>
                    <Alert variant={'filled'}
                           severity={'error'}
                           onClose={()=>this.setState({snackbarOpen:false})}>
                        Could not Create Class</Alert>
                </Snackbar>;
            } else{
                return <Snackbar
                    open={this.state.snackbarOpen}
                    role={"alert"}
                    autoHideDuration={2000}
                    anchorOrigin={{horizontal:'right', vertical:'top'}} >
                    <Alert variant={'filled'}
                           severity={'success'}
                           onClose={()=>this.setState({snackbarOpen:false})}>
                        Class Created </Alert>
                </Snackbar>
            }
        }
        if(this.state.assignmentDeleteSuccess !== null){
            if(this.state.assignmentDeleteSuccess === false){
                return <Snackbar
                    open={this.state.snackbarOpen}
                    role={"alert"}
                    autoHideDuration={2000}
                    anchorOrigin={{horizontal:'right', vertical:'top'}}>
                    <Alert variant={'filled'}
                           severity={'error'}
                           onClose={()=>this.setState({snackbarOpen:false})}>
                        Could not Delete Assignment </Alert>
                </Snackbar>
            } else{
                return <Snackbar
                    open={this.state.snackbarOpen}
                    role={"alert"}
                    autoHideDuration={2000}
                    anchorOrigin={{horizontal:'right', vertical:'top'}}>
                    <Alert variant={'filled'}
                           severity={'success'}
                           onClose={()=>this.setState({snackbarOpen:false})}>
                        Assignment Deleted </Alert>
                </Snackbar>
            }
        }
        if(this.state.assignmentCreateSuccess !== null){
            if(this.state.assignmentCreateSuccess === false){
                return <Snackbar
                    open={this.state.snackbarOpen}
                    role={"alert"}
                    autoHideDuration={2000}
                    anchorOrigin={{horizontal:'right', vertical:'top'}}>
                    <Alert variant={'filled'}
                           severity={'error'}
                           onClose={()=>this.setState({snackbarOpen:false})}>
                        Could not Create Assignment </Alert>
                </Snackbar>
            } else{
                return <Snackbar
                    open={this.state.snackbarOpen}
                    role={"alert"}
                    autoHideDuration={2000}
                    anchorOrigin={{horizontal:'right', vertical:'top'}}>
                    <Alert variant={'filled'}
                           severity={'success'}
                           onClose={()=>this.setState({snackbarOpen:false})}>
                        Assignment Created </Alert>
                </Snackbar>
            }
        }
    };

    render() {
        return (
            <Container maxWidth={'md'}>
                <Typography style={{ marginTop: "1em" }} align={"center"} variant={"h3"} component={"h1"} gutterBottom={true}>
                    Manage Coursework
                </Typography>

                {this.Alerts()}

                <Container maxWidth={"sm"}>
                    {/*{this.state.loading ?  <CircularProgress /> : null}*/}
                    <CreateList
                        classList={this.state.classList}
                        assignmentList={this.state.assignmentList}
                        assignmentAlert={this.assignmentAlert}
                        classAlert={this.classAlert}
                    />
                </Container>

                <CreateAssignment
                    user_id={this.props.user.id}
                    classList={this.state.classList}
                    assignmentAlert={this.assignmentAlert}
                />

                <CreateClass
                    user_id={this.props.user.id}
                    classAlert={this.classAlert}
                />
            </Container>

        );
    }
}

export default withRouter(Classes);
