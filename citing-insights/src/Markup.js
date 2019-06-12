//importing react and reactstrap
import React, { Component } from 'react';
import {Input, Button, Form} from 'reactstrap';

//import our css
import './css/Markup.css';

//this function returns user highlighted text
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } 
    else if (document.selection && document.selection.type != "Control"){
        text = document.selection.createRange().text;
    }
    else{
            alert('no')
    }
    return text;
}

//function to test functionality ....to be removed later
function testGetTextArea(props) {
	let test = document.getElementById("highlightText").value;
	alert(test);
}

// Markup is a class that creates a component 
//		This class defines the html that makes up the markup component used in analyze page
class Markup extends Component {
	//initalized values
	constructor(props){
		super(props);
		this.state = {
			curHighlight: "Highlighted Text shows up here"
		};
		this.setHighlightedText = this.setHighlightedText.bind(this);
	}

	//function that changes the state of this to be what was highlighted
	setHighlightedText(){
		let highlight = getSelectionText();
		this.setState({
			curHighlight: highlight
		})
	}

	//rendering html 
  	render() {	
	    return(
	    	<div class="markup-container">
	    		{/* p tag important for now  */}
	    		<p>Highlight text to begin marking in-text citations</p>
	    		<p>This component allows faculty and staff to select and mark intext citations</p>
		    	{/*user clicks this button to change the state of what was highlighted */}
		    	<Button onMouseDown={this.setHighlightedText}>Get Highlighted Text</Button>
		    	<Form>
		    		{/* where highlighed text goes*/}
		    		<textarea id="highlightText" value={this.state.curHighlight} ref="highlightArea"></textarea>
		    		{/* Sources so we can pair intext citation with source.....will be dynamically populated with API*/}
		    		<Input type="select" name="citation" id="citationSelect">
						<option>Source 1</option>
						<option>Source 2</option>
						<option>Source 3</option>
						<option>Source 4</option>
						<option>Source 5</option>
					</Input>
					{/* Button to submit In-Text Citation */}
		    		<Button onClick={testGetTextArea}>Submit In-Text Citation</Button>
		    	</Form>
			</div>
    	);
  	}
}

export default Markup;