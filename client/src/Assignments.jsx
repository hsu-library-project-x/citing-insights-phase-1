import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import { Label, Input } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import './css/App.css';
import './css/Assignment.css';

import Dropzone from './Dropzone.jsx';
import Progress from './Progress.jsx';

// Class to render our homepage
class Assignment extends Component{
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      classId: '',
      assignmentId: '',
      AvailableCourses: [],
      AvailableAssignments: []

    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClassSelection = this.handleClassSelection.bind(this);
  }

  onFilesAdded(files){
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
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
    //incorrect
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

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{ opacity: uploadProgress && uploadProgress.state === "done" ? 0.5 : 0}}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button onClick={() => this.setState({ files: [], successfullUploaded: false })}>Clear</button>
      );
    } else {
      return (
        <button disabled={this.state.files.length < 0 || this.state.uploading} onClick={this.uploadFiles}>Upload</button>
      );
    }
  }

  async uploadFiles() {
    let unit = document.getElementById("selectClass");
    if(unit.value === ""){
      alert('Select a Class Please');
      return;
    }

    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);
      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      //let unit = document.getElementById("selectClass");
      //check if document is a pdf.. if not go to catch statement
      //continuing to get server error
      const formData = new FormData();
      formData.append(this.state.assignmentId, file, file.name);
      req.open("POST", "http://localhost:5000/upload");
      req.send(formData)
    
    });

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

    return(
      /* So far our homepage is just a h1 tag with text */
      <div class="classes-container assign-container" >
        <h1>Upload Files</h1>
        <p>Please upload papers as PDF in MLA format</p>
        <Row>
          <Col xs="2">
          </Col>
          <Col xs="8">
            <div class="assignment_form">
              <form>
                <Label for="selectClass">Class:</Label>
                <Input onChange={this.handleClassSelection} type="select" id="selectClass" name="classId" required>
                  <option value="" disabled selected hidden >select a class</option>
                  {optionItems}
                </Input>
                <Label for="selectAssignment">Assignment:</Label>
                <Input onChange={this.handleInputChange} type="select" id="selectAssignment" name="assignmentId" required>
                  <option value="" disabled selected hidden >select an assignment</option>
                  {optionAssignments}
                </Input>

                <div className="Upload">
                  <span className="Title">Upload:</span> 
                  <div className="Content">
                    <div>
                      <Dropzone onFilesAdded={this.onFilesAdded} disabled={this.state.uploading || this.state.successfullUploaded}/>
                    </div>
                    <div className="Files">
                      {this.state.files.map(file => {
                        return (
                          <div key={file.name} className="Row">
                            <span className="Filename">{file.name}</span>
                            {this.renderProgress(file)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="Actions">{this.renderActions()}</div>
                </div>
              </form>
            </div>
          </Col>
          <Col xs="2">
          </Col>
        </Row>
      </div>
    );
  }
}

export default withRouter(Assignment);
