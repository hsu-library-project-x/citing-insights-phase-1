import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
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
	        successfullUploaded: false
	    };

	    this.onFilesAdded = this.onFilesAdded.bind(this);
	    this.uploadFiles = this.uploadFiles.bind(this);
	    this.sendRequest = this.sendRequest.bind(this);
	    this.renderActions = this.renderActions.bind(this);
    }

    onFilesAdded(files){
		this.setState(prevState => ({
			files: prevState.files.concat(files)
		}));
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
		if(unit.value == ""){
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

		let unit = document.getElementById("selectClass");
		//check if document is a pdf.. if not go to catch statement
		

		const formData = new FormData();
		formData.append("ClassID", file, file.name);
		req.open("POST", "http://localhost:5000/upload");
		req.send(formData);
	 });
	}

	render(){	
		return(
			/* So far our homepage is just a h1 tag with text */
			<div class="classes-container assign-container" >
				<h1>Upload Assignments</h1>
				<Row>
					<Col xs="2">
					</Col>
					<Col xs="8">
						<div class="assignment_form">
							<Form>
								<Label for="selectClass">Select Class</Label>
								<Input type="select" id="selectClass" name="class" required>
									<option></option>
								    <option value="1">Class: 1</option>
								    <option value="2">Class: 2</option>
								    <option value="3">Class: 3</option>
								    <option value="4">Class: 4</option>
								    <option value="5">Class: 5</option>
								</Input>

								<div className="Upload">
	        						<span className="Title">Upload Files</span>
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
							</Form>
						</div>
					</Col>
					<Col xs="2">
					</Col>
				</Row>
			</div>
		);
	}
}

export default Assignment;