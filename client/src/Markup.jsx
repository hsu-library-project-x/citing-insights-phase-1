//importing react and reactstrap
import React, { Component } from 'react';
import {Input, Button} from 'reactstrap';

//import our css
import './css/Markup.css';

//this function returns user highlighted text
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } 
    else if (document.selection && document.selection.type !== "Control"){
        text = document.selection.createRange().text;
    }
    else{
        alert('no')
    }
    return text;
}

// Markup is a class that creates a component 
//		This class defines the html that makes up the markup component used in analyze page
class Markup extends Component {
	//initalized values
	constructor(props){
		super();
		this.state = {
			curHighlight: "Put Highlighted Text Here!"
		};

		this.setHighlightedText = this.setHighlightedText.bind(this);
		this.clearCitation = this.clearCitation.bind(this);
	}

	//function that changes the state of this to be what was highlighted
	setHighlightedText(){
		
		let highlight = getSelectionText();
		this.setState({
			curHighlight: highlight
		})
	}

	clearCitation(){
		this.setState({curHighlight: ""});
	}

	//rendering html 
  	render() {	
	    return(
	    	<div class="markup-container">
		    	{/*user clicks this button to change the state of what was highlighted */}
	    		{/* Sources so we can pair intext citation with source.....will be dynamically populated with API*/}
	    		<Input type="select" name="source" id="sourceSelect">
					<option>Source 1</option>
					<option>Source 2</option>
					<option>Source 3</option>
					<option>Source 4</option>
					<option>Source 5</option>
				</Input>
	    		{/* where highlighed text goes*/}
	    		<textarea id="highlightText" value={this.state.curHighlight} ref="highlightArea"></textarea>
				{/* Button to submit In-Text Citation */}
	    		<Button onMouseDown={this.setHighlightedText}>Get Highlighted Text</Button>
	    		<Button onClick={this.clearCitation}>Clear Text</Button>
			</div>
    	);
  	}
}

export default Markup;