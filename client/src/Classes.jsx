import React, {Component} from 'react';
import {Row, Col, Input, Label } from 'reactstrap'
import './css/App.css';
import './css/Classes.css'



// Class to render our homepage
class Classes extends Component{

  constructor(props){
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
    //this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    console.log('mounted');

    var that = this;

    fetch('http://localhost:5000/courses')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        //console.log(JSON.stringify(myJson));
        console.log(myJson);
        that.setState({AvailableCourses: myJson});
      });
  }

  async handleSubmitClass(event){
    event.preventDefault();
    const data = {
      "name": this.state.ClassName,
      "note": this.state.ClassNote,
      "user_id": "5d26304f97d65677327b7e56"
    };

    let test = JSON.stringify(data);
    fetch('http://localhost:5000/courses', {
      method: 'POST',
      body: test,
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    window.location.reload();
  }

  async handleSubmitAssign(event){

    event.preventDefault();
    const data = {
      "name": this.state.AssignName,
      "class_id": this.state.ClassId
    };

    let test = JSON.stringify(data);
    fetch('http://localhost:5000/assignments', {
      method: 'POST',
      body: test,

      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    window.location.reload();
  }

  handleGetAssignment(event){
    const target = event.target;
    var that = this;
    console.log(target.id);
    fetch('http://localhost:5000/assignments/by_class_id/' + target.id)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        that.setState({AvailableAssignments: myJson});
      });

  }

  //call when input changes to update the state
  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    //alert(name + ", " + value);
    this.setState({
      [name]: value
    });

  }

  render(){
    
    let courses = this.state.AvailableCourses;
    let assignments = this.state.AvailableAssignments;
    let optionItems = courses.map((course) =>
      <option value={course._id}>{course.name}</option>
    );
    let classList = courses.map((course) => 
      <li onClick={this.handleGetAssignment} class="classLi" id={course._id}>{course.name + ": " + course.course_note}</li>
    );
    let assignList = assignments.map((assignment) =>
      <li id="assignment._id">{assignment.name}</li>
    );


    return(
      /* So far our homepage is just a h1 tag with text */
      <div class="classes-container">
        <Row>
          <Col xs="6">
            <h2>Add a Class: </h2>
            <form id="addClassForm" onSubmit={this.handleSubmitClass}>
              <Label for="className">Class Name</Label>
              <Input onChange={this.handleInputChange} type="text" id="className" name="ClassName" placeholder="Type class name here" required/>
              <Input onChange={this.handleInputChange} type="textarea" id="classNotes" name="ClassNote" placeholder="Optional Notes on the class" />
              <Input type="submit" value="Submit"/>
            </form>
            
          </Col>
          <Col xs="6"> 
            <h2>Add an Assignment</h2>
            <form id="addAssignmentForm" onSubmit={this.handleSubmitAssign}  >
              <Label for="classAssign">Class:</Label>
              <Input onChange={this.handleInputChange} type="select" id="classAssign" name="ClassId" required>
                <option value="" disabled selected hidden >Select a Class</option>
                {optionItems}
              </Input>
              <Label for="assignName">Assignment:</Label>
              <Input onChange={this.handleInputChange} type="text" id="assignName" name="AssignName" placeholder="Type assignment name here" required/>
              <Input onChange={this.handleInputChange} type="textarea" id="assignNotes" name="AssignNote" placeholder="Optional Notes on the assignment" />
              <Input type="submit" value="Submit"/>

            </form>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <h3>Your Classes:</h3>
            <ul class="currentClasses">
              {classList}
            </ul>
          </Col>
          <Col xs="6">
            <h3>Your Assignment:</h3>
            <ul class="currentClasses">
              {assignList}
            </ul>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Classes;
