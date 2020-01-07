import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Container,Typography, Button, FormControl, MenuItem, Select, InputLabel} from "@material-ui/core";

import { Redirect } from "react-router-dom";
import Analyze from "./Analyze";

class AnalyzeSubMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      className: '',
      selectedAssignmentId: '',
      assignmentName: '',
      AvailableCourses: [],
      AvailableAssignments: [],
      redirect: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClassSelection = this.handleClassSelection.bind(this);
  }

  //On mount, makes a call to retrieve all Classes for the user
  componentWillMount() {

    let that = this;

    fetch('http://localhost:5000/courses/' + this.props.user.id)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        that.setState({ AvailableCourses: myJson });
      });
  }

  //Given a Class, this function makes a call to get all assignments in that class.
  handleClassSelection(event) {
    let that = this;
    let target = event.target;
    fetch('http://localhost:5000/assignments/by_class_id/' + target.value)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {

        that.setState({ AvailableAssignments: myJson });
      });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    //alert(name + ", " + value);
    this.setState({
      [name]: value
    },
    );

  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ redirect: true });
  }

  //In each render, map out Courses and Assignments into letiables so we can place them in a drop down
  render() {

    let courses = this.state.AvailableCourses;
    let optionItems = courses.map((course) =>
      <option value={course._id}>{course.name}</option>
    );

    let assignments = this.state.AvailableAssignments;
    let optionAssignments = assignments.map((assignment) =>
      <option value={assignment._id}>{assignment.name}</option>
    );

    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/analyze',
        state: {id: this.state.selectedAssignmentId},
        props: { ...this.props }
      }} />

    }
    
    return (
      <Container maxWidth={'md'}>

        <Typography style={{marginTop: "1em"}} align={"center"} variant={"h3"} component={"h1"} gutterBottom={true}>
          Analyze an Assignment
        </Typography>

        <form style={{textAlign:"center", margin:"1em"}} onSubmit={this.handleSubmit}>
          <FormControl required={true} style={{minWidth: 250, marginBottom:"1em"}}>
              <InputLabel>Select a Class</InputLabel>
              <Select
                  style={{textAlign:"center"}}
                  labelId={"selectClasslabel"}
                  onChange={this.handleClassSelection}
                  inputProps={{
                    name: 'className',
                    id: 'assignForAnalyze',
                  }}
              >
                <MenuItem value="" disabled >select class</MenuItem>
                {optionItems}
              </Select>
          </FormControl>
            <br />
          <FormControl required={true} style={{minWidth: 250, marginBottom:"1em"}}>
              <InputLabel>Select an Assignment </InputLabel>
              <Select
                  style={{textAlign:"center"}}
                  labelId={"selectClasslabel"}
                  onChange={this.handleInputChange}
                  inputProps={{
                    name: 'selectedAssignmentId',
                    id: 'assignForAnalyze',
                  }}
              >
                <MenuItem value="" disabled >select an assignment </MenuItem>
                {optionAssignments}
            </Select>
          </FormControl>
            <br />
          <Button type="submit" color={"primary"} variant={"contained"}> Submit </Button>
        </form>
      </Container>
    );
  }
}

export default withRouter(AnalyzeSubMenu);
