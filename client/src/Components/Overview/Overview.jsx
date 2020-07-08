import React, { Component } from 'react';
import {Button, Select, MenuItem, Container, Typography, FormControl, InputLabel} from '@material-ui/core';

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: '',
            selectedId: '',
            classList: [],
            assignmentList: [],
            sharedAssignments:[],
            sharedCourses:[],
            selectedPaperId: '',
            AvailablePapers: [],
            rubrics: [], //TODO: CHECK THAT WE ACTUALLY USE THIS
            citations: [],
        };

        this.getClasses();
        this.getAssignments();
        this.getSharedAssignments();
        this.getSharedCourses();
        this.getRubrics();

        this.getClasses = this.getClasses.bind(this);
        this.getAssignments = this.getAssignments.bind(this);
        this.getSharedAssignments = this.getSharedAssignments.bind(this);
        this.getSharedCourses = this.getSharedCourses.bind(this);
        this.getRubrics = this.getRubrics.bind(this);

        // this.handleClassSelection = this.handleClassSelection.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.handlePaperSelection = this.handlePaperSelection.bind(this);
        this.handleResultsChange = this.handleResultsChange.bind(this);
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
    
    
      getSharedAssignments(){
        fetch(`/api/assignments/by_email/${this.props.user.email}`,).then(function (response) {
            if(response.status === 201){
                return response.json();
            }
        }).then(d => {
            this.createTreeItems(d, 'sharedAssignments');
        });
      }
    
      getSharedCourses(){
    
        fetch(`/api/courses/by_email/${this.props.user.email}`).then(function (response) {
    
            if(response.status === 201){
              
                return response.json();
            }
    
        }).then(d => {
            this.createTreeItems(d, 'sharedCourses');
        });
      }
    
    
    createTreeItems(json, state) {
      let list = [];
      if(json !== undefined){
          if(state === 'myGroups'){
              for (let i = 0; i < json.length; i++) {
                  list.push(json[i]["_id"]);
              }
          }else{
              for (let i = 0; i < json.length; i++) {
                  list.push(json[i]);
              }
          }
    
          this.setState({ [state]: list });
      }
    }

    getRubrics(){
        let that = this;
        return(
            fetch('/api/rubrics/' + this.props.user.id)
                .then(response => {
                    return response.json();
                })
                .then(myJson => {
                    that.setState({ rubrics: myJson })
                })
        );
    }

    // //Given a Class, this function makes a call to get all assignments in that class.
    // handleClassSelection(event) {
    //     let that = this;
    //     let target = event.target;
    //     fetch('/api/assignments/by_class_id/' + target.value)
    //         .then(response =>  {
    //             return response.json();
    //         })
    //         .then(myJson => {
    //             that.setState({ AvailableAssignments: myJson });
    //         });
    // }

    handleSelection(event) {
        let that = this;
        let target = event.target;
        fetch('/api/papers/by_ref_id/' + target.value)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                that.setState({ AvailablePapers: myJson });
            });
    }

    handlePaperSelection(event) {
        let that = this;
        let target = event.target;
        fetch('/api/citations/find_evaluations/' + target.value)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                that.setState({ paper_id: target.value, citations: myJson });
            });
    }

    handleResultsChange(event) {
        event.preventDefault();
        this.props.updateOverviewPage(this.state.citations);
    }

    render() {

        let courses = this.state.classList.concat(this.state.sharedCourses);
        let optionItems = courses.map((course) =>
          <MenuItem value={course._id} key={course._id}>{course.name}</MenuItem>
        );
    
        let assignments = this.state.assignmentList.concat(this.state.sharedAssignments);
        let optionAssignments = assignments.map((assignment) =>
          <MenuItem value={assignment._id} key={assignment._id}>{assignment.name}</MenuItem>
        );
    
        let papers = this.state.AvailablePapers;
        let optionPapers = papers.map((paper) =>
            <MenuItem value={paper._id} key={paper._id}>{paper.title}</MenuItem>
        );

        return (
            <Container maxWidth={'md'}>
                <Typography style={{ marginTop: "1em" }} align={"center"} variant={"h3"} component={"h1"} gutterBottom={true}>
                    Overview
                </Typography>

                <Typography align={"center"} variant={"subtitle1"} component={"p"} gutterBottom={true}>
                    Please select the paper you want an overview for.
                </Typography>

                <form style={{textAlign:"center", margin:"1em"}} onSubmit={this.handleResultsChange}>
                    <FormControl  style={{minWidth: 250}}>
                        <InputLabel id="selectClasslabelOverview">Select a Class</InputLabel>
                        <Select
                            style={{textAlign:"center"}}
                            labelId={"selectClasslabelOverview"}
                            defaultValue={""}
                            onChange={this.handleSelection}
                            inputProps={{
                                name: 'selectedId',
                            }}
                        >
                            <MenuItem value="" disabled >select class</MenuItem>
                            {optionItems}
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl style={{minWidth: 250}}>
                        <InputLabel id="selectAssignmentLabelOverview">Select an Assignment</InputLabel>
                        <Select
                            style={{textAlign:"center"}}
                            defaultValue={""}
                            onChange={this.handleSelection}
                            inputProps={{
                                name: 'selectedId',
                            }}
                        >
                            <MenuItem value="" disabled> select assignment</MenuItem>
                            {optionAssignments}
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl  required={true} style={{minWidth: 250, marginBottom:"1em"}}>
                        <InputLabel id="selectAssignmentLabelOverview">Select a Paper</InputLabel>
                        <Select
                            style={{textAlign:"center"}}
                            onChange={this.handlePaperSelection}
                            defaultValue={""}
                            inputProps={{
                                name: 'selectedPaperId',
                            }}
                        >
                            <MenuItem value="" disabled> select paper </MenuItem>
                            {optionPapers}
                        </Select>
                    </FormControl>
                    <br />
                    <Button variant={"contained"} color={'primary'} type={'submit'}>
                        Show Evaluations
                    </Button>
                </form>
            </Container>
        );
    }
}

export default Overview;