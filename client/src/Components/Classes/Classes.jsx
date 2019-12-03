import React, { Component } from 'react';
import {TextField} from "@material-ui/core";
import { withRouter } from 'react-router-dom';


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
    this.getAssignments = this.getAssignments.bind(this);
  }

  componentDidMount() {
    console.log('mounted');
    console.log(this.props);

    let that = this;
    that.getClasses();
  }

  async getClasses() {

    let that = this;

    fetch('http://localhost:5000/courses/' + this.props.user.id)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        that.setState({
          AvailableCourses: myJson
        });
      });
  }

  async getAssignments(class_id) {
    let self = this;
    console.log("class id:");
    console.log(class_id);
    fetch('http://localhost:5000/assignments/by_class_id/' + class_id)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
          self.setState({
          AvailableAssignments: myJson
        });
      });
  }

  handleGetAssignment(event) {

    const target = event.target;
    const id = target.id;
    let self = this;
    let listElements = document.getElementsByClassName("classLi");

    for (let i = 0; i < listElements.length; i++) {
      listElements[i].classList.remove("selected-class");
    }

    self.getAssignments(id); //promise returned is ignored
    target.classList.add("selected-class");
  }

  async handleSubmitClass(event) {
    event.preventDefault();
    let self = this;
    const data = {
      "name": this.state.ClassName,
      "note": this.state.ClassNote,
      "user_id": this.props.user.id
    };

    let test = JSON.stringify(data);
    fetch('http://localhost:5000/courses/', {
      method: 'POST',
      body: test,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(() => { //unsed param response previously
      self.getClasses()
    });

    this.setState({
      ClassName: "",
      ClassNote: ""
    }, event.target.reset());

  }

  async handleSubmitAssign(event) {

    event.preventDefault();
    let self = this;

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
    }).then(() => { // unused param response prev

      self.getClasses();
      self.getAssignments(data.class_id);
    });

    this.setState({
      AssignName: "",
      AssignNote: "",
      ClassId: ""
    }, event.target.reset());
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

  //call when input changes to update the state
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    console.log("in handle input change");
    console.log(this.state);
  }

  render() {

    let courses = this.state.AvailableCourses;
    let assignments = this.state.AvailableAssignments;
    let optionItems = courses.map((course) =>
      <option value={course._id}>{course.name}</option>
    );
    let classList = courses.map((course) =>
      <div>
        <li onClick={this.handleGetAssignment} className="classLi" id={course._id}>{course.name + ": " + course.course_note}</li>
        <button className="deleteButton" onClick={this.handleDeleteCourse}>
          <svg id={course._id} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path id={course._id} d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /></svg>
        </button>
      </div>
    );
    let assignList = assignments.map((assignment) =>
      <div>
        <li>{assignment.name + ": " + assignment.note}</li>
        <button className="deleteButton" onClick={this.handleDeleteAssignment}>
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
      <div className="classes-container">

            <h2> New Class </h2>
            <form id="addClassForm" onSubmit={this.handleSubmitClass}>
              <label for="className">Name: </label>
              <TextField
                  onChange={this.handleInputChange}
                  id="className"
                  name="ClassName"
                  placeholder="Type class name here"
                  required />
              <label for="classNotes">Notes: </label>
              <TextField
                  onChange={this.handleInputChange}
                  multiline
                  rowsMax="4"
                  id="classNotes"
                  name="ClassNote"
                  placeholder="Optional Notes on the class" />
              <button type="submit"> Submit </button>
            </form>
            <h2> New Assignment </h2>
            <form id="addAssignmentForm" onSubmit={this.handleSubmitAssign}  >
              <label for="classAssign">Class:</label>
              <select onChange={this.handleInputChange} id="classAssign" name="ClassId" required>
                <option value="" disabled selected hidden >Select a Class</option>
                {optionItems}
              </select>
              <label for="assignName">Name:</label>
              <TextField
                  onChange={this.handleInputChange}
                  id="assignName"
                  name="AssignName"
                  placeholder="Type assignment name here"
                  required />
              <label for="assignNotes">Notes:</label>
              <TextField
                  onChange={this.handleInputChange}
                  id="assignNotes"
                  name="AssignNote"
                  multiline
                  rowsMax="4"
                  placeholder="Optional Notes on the assignment" />
              <button type="submit"> Submit </button>
            </form>
            <h3>Your Classes</h3>
            <ul className="currentClasses">
              {classList}
            </ul>
            <h3>Your Assignments</h3>
            <ul className="currentClasses">
              {assignList}
            </ul>
      </div>

    );
  }
}

export default withRouter(Classes);
