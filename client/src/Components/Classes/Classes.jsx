import React, { Component } from 'react';
import {
    Container, Typography, Snackbar, Grid
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';

import CreateClass from "./CreateClass";
import CreateAssignment from "./CreateAssignment";
import CreateList from "./CreateList";
import CreateGroup from "../Groups/CreateGroup";
import RequestGroup from "../Groups/RequestGroup";

class Classes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classList: [],
            assignmentList: [],
            loading:true, // currently not used
            messageInfo: undefined,
            snackbarOpen:false, //we get away with only one snackbar vairable because mat-ui only allows one snackbar to be open
        };


        this.getClasses();
        this.getAssignments();


        this.getClasses = this.getClasses.bind(this);
        this.getAssignments = this.getAssignments.bind(this);
        this.createTreeItems = this.createTreeItems.bind(this);
        this.processQueue = this.processQueue.bind(this);
        this.handleQueueAlert = this.handleQueueAlert.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleExited = this.handleExited.bind(this);

        this.queueRef = React.createRef();
        this.queueRef.current = [];
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

    processQueue(){
        if(this.queueRef.current.length >0){
            this.setState({
                messageInfo: this.queueRef.current.shift(),
                snackbarOpen:true}
            );
        }
    };

    handleQueueAlert(message, severity){
        this.queueRef.current.push({
            message: message,
            severity:severity,
            key: new Date().getTime(),
        });
        if(this.state.snackbarOpen){
            this.setState({snackbarOpen:false});
        }else{
            this.processQueue();
        }
        this.getClasses();
        this.getAssignments();
    };

    handleClose(event, reason){
        if(reason === 'clickaway'){
            return;
        }
        this.setState({snackbarOpen:false});
    };

    handleExited(){
        this.processQueue();
    };

    DisplayAlerts(){
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
                    <Typography style={{ marginTop: "1em" }} align={"center"} variant={"h3"} component={"h1"} gutterBottom={true}>
                        Manage Coursework
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="flex-end"
                    >
                        <Grid item >
                            <CreateClass
                                user_id={this.props.user.id}
                                handleQueueAlert={this.handleQueueAlert}
                            />
                        </Grid>
                        <Grid item>
                            <CreateAssignment
                                user_id={this.props.user.id}
                                classList={this.state.classList}
                                handleQueueAlert={this.handleQueueAlert}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <CreateList
                        classList={this.state.classList}
                        assignmentList={this.state.assignmentList}
                        handleQueueAlert={this.handleQueueAlert}
                    />
                </Grid>
            </Grid>
        </Container>
        );
    }
}

export default withRouter(Classes);
