import React, {Component} from 'react';
import { HashRouter, Link, Redirect } from "react-router-dom";
import { Button, Row, Col, Input } from "reactstrap";

import './css/AnalyseSubMenu.css'

class AnalyzeSubMenu extends Component{

  constructor () {
    super()
    this.state = {
      selectedAssignment: false,
      selectedAssignContinue: false,
      AssignNew: '',
      AssignContinue: '',
      ClassNew: '',
      ClassContinue: '',
      AvailableCourses: [],
      AvailableAssignments: [],
      redirect: false
    }

    this.newAssessment = this.newAssessment.bind(this);
    this.onInput = this.onInput.bind(this);
    this.onInput2 = this.onInput2.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.populateAssignment = this.populateAssignment.bind(this);
    this.handleSubmitNew = this.handleSubmitNew.bind(this);
    this.handleSubmitContinue = this.handleSubmitContinue.bind(this);
    this.handleClassSelection = this.handleClassSelection.bind(this);
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

  handleClassSelection(event) {
    var that = this;
    var target = event.target;
    console.log('we just clicked');
    fetch('http://localhost:5000/assignments/by_class_id/' + target.value)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        //console.log(JSON.stringify(myJson));
        console.log(myJson);
        that.setState({AvailableAssignments: myJson});
      });

  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    //alert(name + ", " + value);
    this.setState({
      [name]: value
    });

  }

  newAssessment(){
    //let curAssign = document.getElementById("assignForAnalyze");

  }

  populateAssignment(){
    //This called, create Assignment Menu with the selected ClassId
  }

  onInput(){
    this.setState({
      selectedAssignment: true
    });
  }

  onInput2(){
    this.setState({
      selectedAssignContinue: true
    });
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    //alert(name + ", " + value);
    this.setState({
      [name]: value
    });

  }

  async handleSubmitNew(event){
    //alert("handling New Submit");
    event.preventDefault();
    console.log('handling submit');
    this.setState({redirect: true});
    const data = {
      "name": this.state.AssignNew,
      "class_id": this.state.ClassNew 
    };

    let sendData = JSON.stringify(data);

    console.log(sendData);

    /*fetch('http://localhost:5000/courses', {
      method: 'GET',
      body: sendData,
      headers:{
        'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
    });*/

    //navigate to analyze page with the GET information passed props
  }

  async handleSubmitContinue(event){
    alert("handling Continue Submit");
    event.preventDefault();
    const data = {
      //Assignment Name
      "name" : this.state.AssignContinue,
      //Class Id
      "class_id": this.state.ClassContinue
    };

    let sendData = JSON.stringify(data);
    console.log(sendData);

    /*fetch('http://localhost:5000/courses', {
      method: 'GET',
      body: sendData,
      headers:{
        'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
    });*/

    //navigate to analyze page with the GET information passed props with the "continue" identifier
  }

  render(){
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
        state: { id: this.state.AssignNew }
      }}
    />
    }
    return(
      <div class="analyze-container ana-subcontainer" >
        <Row>
          <Col xs="12">
            <form className={`${!this.state.selectedAssignment ? "warnHighlight" : "safeHighlight"}`} onSubmit={this.handleSubmitNew}>
              <h1> New Assignment</h1>
              <label for="assignForAnalyze">Class:</label>
              <Input onChange={this.handleClassSelection} onInput={this.populateAssignment} id="assignForAnalyze" type="select" name="ClassNew" required >
                <option value="" disabled selected hidden >Select a Class</option>
                {optionItems}
              </Input>
              <label for="assignForAnalyze">Assignment:</label>
              <Input onChange={this.handleInputChange} onInput={this.onInput} id="assignForAnalyze" type="select" name="AssignNew" required >
                <option value="" disabled selected hidden >Select an Assignment</option>
                {optionAssignments}
              </Input>
              <Input type="submit" value="Submit" disabled={!this.state.selectedAssignment} />
            </form>

          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <HashRouter>
              <div class="button-container">
                <Link to="/tasks/analyze">
                  <Button>Test Button</Button>
                </Link>
              </div>
            </HashRouter>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AnalyzeSubMenu;
