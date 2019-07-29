import React, { Component } from 'react';
import { Row, Col, Form, FormGroup, Input, Label, Button } from 'reactstrap'
import { withRouter } from 'react-router-dom';
import './css/App.css';
import './css/Classes.css'


// Class to render our homepage
class Classes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ClassName: '',
      ClassNote: '',
      ClassId: '',
      AssignName: '',
      AssignNote: '',
      AvailableCourses: [],
      AvailableAssignments: []
    };
    this.handleSubmitClass = this.handleSubmitClass.bind(this);
    this.handleSubmitAssign = this.handleSubmitAssign.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGetAssignment = this.handleGetAssignment.bind(this);
    this.handleDeleteAssignment = this.handleDeleteAssignment.bind(this);
    this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
    this.getClasses = this.getClasses.bind(this);
  }

  componentWillMount() {
    console.log('mounted');
    console.log(this.props);

    var that = this;
    that.getClasses();
  }

  async getClasses() {

    var that = this;

    fetch('http://localhost:5000/courses')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        that.setState({
          AvailableCourses: myJson
        });
      });
  }

  async handleSubmitClass(event) {
    event.preventDefault();
    var self = this;
    const data = {
      "name": this.state.ClassName,
      "note": this.state.ClassNote,
      "user_id": this.props.user.id
    };

    let test = JSON.stringify(data);
    fetch('http://localhost:5000/courses', {
      method: 'POST',
      body: test,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      self.getClasses()
    });

    this.setState({
      ClassName: "",
      ClassNote: ""
    }, event.target.reset());

  }

  async handleSubmitAssign(event) {

    event.preventDefault();
    var self = this;

    const data = {
      "name": this.state.AssignName,
      "note": this.state.AssignNote,
      "class_id": this.state.ClassId
    };

    let dataString = JSON.stringify(data);

    fetch('http://localhost:5000/assignments', {
      method: 'POST',
      body: dataString,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      console.log("posted");
      console.log(response.json());
      self.getClasses()
    });

    this.setState({
      AssignName: "",
      AssignNote: "",
      ClassId: ""
    }, event.target.reset());
  }

  handleGetAssignment(event) {
    const target = event.target;
    var that = this;
    let listElements = document.getElementsByClassName("classLi");

    for (let i = 0; i < listElements.length; i++) {
      listElements[i].classList.remove("selected-class");
    }

    fetch('http://localhost:5000/assignments/by_class_id/' + target.id)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        that.setState({ AvailableAssignments: myJson });
      });
    target.classList.add("selected-class");
  }

  handleDeleteAssignment(event) {

    event.preventDefault();

    var self = this;
    if (window.confirm("Are you sure you wish to delete this?")) {
      const target = event.target;
      fetch('http://localhost:5000/assignments/' + target.id, {
        method: 'Delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

    }
  }

  handleDeleteCourse(event) {

    var self = this;
    if (window.confirm("Are you sure you wish to delete this course?")) {
      if (window.confirm("WARNING!! You are about to delete this course, please click OK to proceed")) {

        const target = event.target;
        fetch('http://localhost:5000/courses/' + target.id, {
          method: 'Delete',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }).then((response) => {
          self.getClasses();
        });
      }
    }
  }

  //call when input changes to update the state
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    //alert(name + ", " + value);
    this.setState({
      [name]: event.target.value
    });
  }

  render() {

    let courses = this.state.AvailableCourses;
    let assignments = this.state.AvailableAssignments;
    let optionItems = courses.map((course) =>
      <option value={course._id}>{course.name}</option>
    );
    let classList = courses.map((course) =>
      <div>
        <li onClick={this.handleGetAssignment} class="classLi" id={course._id}>{course.name + ": " + course.course_note}</li>
        <button class="deleteButton" onClick={this.handleDeleteCourse}>
          <svg id={course._id} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path id={course._id} d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /></svg>
        </button>
      </div>
    );
    let assignList = assignments.map((assignment) =>
      <div>
        <li>{assignment.name + ": " + assignment.note}</li>
        <button class="deleteButton" onClick={this.handleDeleteAssignment}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path id={assignment._id} d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /></svg>
        </button>
      </div>
    );

    if (assignList.length === 0) {
      assignList = <li>Please Select a Class that has Assignments</li>;
    }

    if (classList.length === 0) {
      classList = <li>Please Create a Class to get Started</li>;
    }

    return (
      <div class="classes-container">
        <Row>
          <Col xs="6">
            <h2> New Class </h2>
            <form id="addClassForm" onSubmit={this.handleSubmitClass}>
              <Label for="className">Name: </Label>
              <Input onChange={this.handleInputChange} type="text" id="className" name="ClassName" placeholder="Type class name here" required />
              <Label for="classNotes">Notes: </Label>
              <Input onChange={this.handleInputChange} type="textarea" id="classNotes" name="ClassNote" placeholder="Optional Notes on the class" />
              <Input type="submit" value="Submit" />
            </form>

          </Col>
          <Col xs="6">
            <h2> New Assignment </h2>
            <form id="addAssignmentForm" onSubmit={this.handleSubmitAssign}  >
              <Label for="classAssign">Class:</Label>
              <Input onChange={this.handleInputChange} type="select" id="classAssign" name="ClassId" required>
                <option value="" disabled selected hidden >Select a Class</option>
                {optionItems}
              </Input><br /> <br />
              <Label for="assignName">Name:</Label>
              <Input onChange={this.handleInputChange} type="text" id="assignName" name="AssignName" placeholder="Type assignment name here" required /> <br />
              <Label for="assignNotes">Notes:</Label>
              <Input onChange={this.handleInputChange}type="textarea" id="assignNotes" name="AssignNote" placeholder="Optional Notes on the assignment" />
              <Input type="submit" value="Submit" />

            </form>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <h3>Your Classes</h3>
            <ul class="currentClasses">
              {classList}
            </ul>
          </Col>
          <Col xs="6">
            <h3>Your Assignments</h3>
            <ul class="currentClasses">
              {assignList}
            </ul>
          </Col>
        </Row>
      </div>

    );
  }
}

export default withRouter(Classes);
