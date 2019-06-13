import React, { Component } from 'react'
import { Button, Input, Progress } from 'reactstrap';

//This function will dynamically change the value in our progress bar 


class Annotate extends Component {


  render() {
    return(
    	<div class="anno-contain">
	    	<p> Annotation Box </p>
	    	<Input type="textarea" name="annotation" id="curAnno" />
	    	
	    	<Button color="success" id="addAnnotation">Add Annotation</Button>
	    	<Button color="danger" id="clearSavedAnnotation">Erase Annotation</Button>
	   		{/* Progress Bar -- Still need to make dynamic */}
	    </div>
    );
  }
}

export default Annotate;