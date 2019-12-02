import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Redirect } from "react-router-dom";
import { Row, Col, Input } from "reactstrap";

import './AnalyseSubMenu.css';

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
        pathname: '/tasks/analyze',
        state: {id: this.state.selectedAssignmentId},
        props: { ...this.props }
      }} />

    }
    
    return (
      <div className="analyze-container ana-subcontainer" >
        <Row>
          <Col xs="12">
            <form className={`${!this.state.selectedAssignment ? "warnHighlight" : "safeHighlight"}`} onSubmit={this.handleSubmit}>
              <h1> Analyze an Assignment</h1>
              <label >Class:</label> {/*Investigate for attribute */}
              <Input onChange={this.handleClassSelection} id="assignForAnalyze" type="select" name="className" required >
                <option value="" disabled selected hidden >Select a Class</option>
                {optionItems}
              </Input>
              <label >Assignment:</label> {/*Investigate for attribute */}
              <Input onChange={this.handleInputChange} id="assignForAnalyze2" type="select" name="selectedAssignmentId" required >
                <option value="" disabled selected hidden >Select an Assignment</option>
                {optionAssignments}
              </Input>
              <Input type="submit" value="Submit" disabled={this.state.redirect} />
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(AnalyzeSubMenu);
