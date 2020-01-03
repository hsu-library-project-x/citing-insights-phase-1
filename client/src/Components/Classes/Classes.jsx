import React, { Component } from 'react';
import {Typography, Container, Grid} from "@material-ui/core";
import { withRouter } from 'react-router-dom';

import CreateTree from "./CreateTree";
import CreateClass from "./CreateClass";
import CreateAssignment from "./CreateAssignment";

class Classes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AvailableCourses: [],
      AvailableAssignments: [],
      open:false,
    };

    this.handleGetAssignment = this.handleGetAssignment.bind(this);
    this.handleDeleteAssignment = this.handleDeleteAssignment.bind(this);
    this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
  }

  // componentDidMount() {
  //   let that = this;
  //   that.getClasses();
  // }

  // async getClasses() {
  //
  //   let that = this;
  //
  //   fetch('http://localhost:5000/courses/' + this.props.user.id)
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (myJson) {
  //       that.setState({
  //         AvailableCourses: myJson
  //       });
  //     });
  // }

  // async getAssignments(class_id) {
  //   let self = this;
  //   console.log("class id:");
  //   console.log(class_id);
  //   fetch('http://localhost:5000/assignments/by_class_id/' + class_id)
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (myJson) {
  //         self.setState({
  //         AvailableAssignments: myJson
  //       });
  //     });
  // }

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



  // async handleSubmitAssign(event) {
  //
  //   event.preventDefault();
  //   let self = this;
  //
  //   const data = {
  //     "name": this.state.AssignName,
  //     "note": this.state.AssignNote,
  //     "class_id": this.state.ClassId
  //   };
  //
  //   let dataString = JSON.stringify(data);
  //
  //   fetch('http://localhost:5000/assignments', {
  //     method: 'POST',
  //     body: dataString,
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //   }).then(() => { // unused param response prev
  //
  //     self.getClasses();
  //     self.getAssignments(data.class_id);
  //   });
  //
  //   this.setState({
  //     AssignName: "",
  //     AssignNote: "",
  //     ClassId: ""
  //   }, event.target.reset());
  // }



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

  // //call when input changes to update the state
  // handleInputChange(event) {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;
  //   this.setState({
  //     [name]: value
  //   });
  // }




  render() {

    return (
        <Container maxWidth={'md'}>
          <Typography style={{marginTop: "1em"}} align={"center"} variant={"h3"} component={"h1"} gutterBottom={true}> Manage Coursework </Typography>
          {/*<Grid container spacing={2}>*/}
          {/*  <Grid item xs={6}>*/}
              <CreateTree
                  user_id={this.props.user.id}
              />
            {/*</Grid>*/}
            {/*<Grid item xs={6} justify={"right"}>*/}
              <CreateClass
                  user_id={this.props.user.id}
              />
            {/*</Grid>*/}
            {/*<Grid item xs={6} />*/}
            {/*<Grid item xs={6}>*/}
              <CreateAssignment />
            {/*</Grid>*/}
          {/*  <Grid item xs={12} />*/}
          {/*</Grid>*/}
        </Container>

    );
  }
}

export default withRouter(Classes);
