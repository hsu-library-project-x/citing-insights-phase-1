import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Container,Typography, Button, FormControl, MenuItem, Select, InputLabel} from "@material-ui/core";

class AnalyzeSubMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      className: '',
      selectedAssignmentId: null,
      assignmentName: '',
      AvailableCourses: [],
      AvailableAssignments: [],
      redirect: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClassSelection = this.handleClassSelection.bind(this);
  }

  //On mount, makes a call to retrieve all Classes for the user
  componentWillMount() {

    let that = this;

    fetch('/api/courses/' + this.props.user.id)
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
    fetch('/api/assignments/by_class_id/' + target.value)
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
    this.setState({
      [name]: value
    },
    );

  }


  async handleSubmit(event) {
    event.preventDefault();
    this.props.updateSelectedId(this.state.selectedAssignmentId);
  }

  //In each render, map out Courses and Assignments into variables so we can place them in a drop down
  render() {

    let courses = this.state.AvailableCourses;
    let optionItems = courses.map((course) =>
      <MenuItem value={course._id} key={course._id}>{course.name}</MenuItem>
    );

    let assignments = this.state.AvailableAssignments;
    let optionAssignments = assignments.map((assignment) =>
      <MenuItem value={assignment._id} key={assignment._id}>{assignment.name}</MenuItem>
    );

    return (
      <Container maxWidth={'md'}>

        <Typography style={{marginTop: "1em"}} align={"center"} variant={"h3"} component={"h1"} gutterBottom={true}>
          Analyze an Assignment
        </Typography>

        <form style={{textAlign:"center", margin:"1em"}} onSubmit={this.handleSubmit}>
          <FormControl required={true} style={{minWidth: 250, marginBottom:"1em"}}>
              <InputLabel id={"selectClasslabel"}>Select a Class</InputLabel>
              <Select
                  style={{textAlign:"center"}}
                  labelId={"selectClasslabel"}
                  onChange={this.handleClassSelection}
                  defaultValue={""}
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
              <InputLabel id={'selectAssignmentlabel'}>Select an Assignment </InputLabel>
              <Select
                  style={{textAlign:"center"}}
                  labelId={"selectAssignmentlabel"}
                  onChange={this.handleInputChange}
                  defaultValue={""}
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
          <Button type="submit" color={"primary"} variant={"contained"} disabled={this.state.selectedAssignmentId === null}> Submit </Button>
        </form>
      </Container>
    );
  }
}

export default withRouter(AnalyzeSubMenu);
