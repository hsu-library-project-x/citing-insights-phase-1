import React, { Component } from 'react';
import {TextField, Typography, Paper, ListItemSecondaryAction, Tooltip} from "@material-ui/core";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
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
      AvailableAssignments: [],
      open:false,
    };
    this.handleSubmitClass = this.handleSubmitClass.bind(this);
    this.handleSubmitAssign = this.handleSubmitAssign.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGetAssignment = this.handleGetAssignment.bind(this);
    this.handleDeleteAssignment = this.handleDeleteAssignment.bind(this);
    this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
    this.getClasses = this.getClasses.bind(this);
    this.getAssignments = this.getAssignments.bind(this);
    this.createList = this.createList.bind(this);
    this.createClassForm = this.createClassForm.bind(this);
    this.createAssignmentForm = this.createAssignmentForm.bind(this);
  }

  componentDidMount() {
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
  }

  handleChange = panel => (event, isExpanded) => {
    this.setState({expanded:  panel});
  };

  createList(classList){

    let generateSecondList = this.state.AvailableAssignments.map(d=> {
      
    })


   let completeList = classList.map(d=>{
     return(
         <ListItem>
           <ListItemIcon>
             <FolderIcon />
           </ListItemIcon>
           <ListItemText
               primary={d.name}
               secondary={d.notes}
           />
           <ListItemSecondaryAction>
             <Tooltip title='Delete Course' aria-label="delete course">
               <IconButton onClick={this.handleDeleteCourse} edge="end" aria-label="delete">
                 <DeleteIcon />
               </IconButton>
             </Tooltip>
           </ListItemSecondaryAction>
           {/*{this.state.open ? <ExpandLess /> : <ExpandMore />}*/}
           {generateSecondList(d._id)}
         </ListItem>
     );
   });

    return (
        <Paper>
            <List
                subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Manage Courses
                  </ListSubheader>
                }
            >
              {completeList}
            </List>
        </Paper>
      );
  }

  createClassForm(){
    return (
        <form id="addClassForm" onSubmit={this.handleSubmitClass}>
          <label htmlFor="className">Name: </label>
          <TextField
              onChange={this.handleInputChange}
              id="className"
              name="ClassName"
              placeholder="Type class name here"
              required/>
          <label htmlFor="classNotes">Notes: </label>
          <TextField
              onChange={this.handleInputChange}
              multiline
              rowsMax="4"
              id="classNotes"
              name="ClassNote"
              placeholder="Optional Notes on the class"/>
          <button type="submit"> Submit</button>
        </form>
    );
  }

  createAssignmentForm(){
    return (
      <form id="addAssignmentForm" onSubmit={this.handleSubmitAssign}>
        <label htmlFor="classAssign">Class:</label>
        <select onChange={this.handleInputChange} id="classAssign" name="ClassId" required>
          <option value="" disabled selected hidden>Select a Class</option>
          {/*{optionItems}*/}
        </select>
        <label htmlFor="assignName">Name:</label>
        <TextField
            onChange={this.handleInputChange}
            id="assignName"
            name="AssignName"
            placeholder="Type assignment name here"
            required/>
        <label htmlFor="assignNotes">Notes:</label>
        <TextField
            onChange={this.handleInputChange}
            id="assignNotes"
            name="AssignNote"
            multiline
            rowsMax="4"
            placeholder="Optional Notes on the assignment"/>
        <button type="submit"> Submit</button>
      </form>
    );
  }

  render() {
    console.log(this.state.AvailableCourses);
    console.log(this.state.AvailableAssignments);
    return (
      <div className="classes-container">
        <h1>Manage Coursework</h1>
        {this.createList(this.state.AvailableCourses)}

      </div>

    );
  }
}

export default withRouter(Classes);
