import React, { Component } from 'react'
import { Label, ListGroup, ListGroupItem, Button, Input, Jumbotron, Badge, Progress } from 'reactstrap';

//This function will dynamically change the value in our progress bar 
function testProgress(props){
	//get id
	var bar = document.getElementById("progress").getElementsByClassName("progress-bar");
	// Change the value in the progress bar --- 
		//Eventually will change to be dynamically generated
	bar[0].attributes[2].nodeValue = "75";
	bar[0].attributes["style"].nodeValue = "width: 75%";
}

class Annotate extends Component {


  render() {
    return(
    	<div class="anno-contain">
	    	<h2> Annotation Box </h2>
	    	<Input type="textarea" name="annotation" id="curAnno" />
	    	
	    	<Button color="success" id="finishButton">Finished</Button>
	    	<Button color="danger" id="cancelButton">Cancel</Button>
	   		{/* Progress Bar -- Still need to make dynamic */}
	      	<p>Total Assessed: 74%</p>
	      	<Progress id="progress" value="20" />
	      	<Button color="warning" id="ProgressTest" onClick={testProgress}> Test Button </Button>
		</div>
    );
  }
}

export default Annotate;