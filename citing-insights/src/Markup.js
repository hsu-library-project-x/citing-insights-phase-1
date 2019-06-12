import React, { Component } from 'react';
import {Input, Button, Form} from 'reactstrap';
import './css/Markup.css';

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control"){
        text = document.selection.createRange().text;
    }else{
            alert('no')
    }
    return text;
}

function testGetTextArea(props) {
	let test = document.getElementById("highlightText").value;
	alert(test);
}

class Markup extends Component {
	constructor(props){
		super(props);
		this.state = {
			curHighlight: "Highlighted Text shows up here"
		};
		this.setHighlightedText = this.setHighlightedText.bind(this);
	}

	setHighlightedText(){
		let highlight = getSelectionText();
		this.setState({
			curHighlight: highlight
		})
	}

  	render() {	
	    return(
	    	
	    	<div class="markup-container">
	    		<p>Highlight text to begin marking in-text citations</p>
	    		<p>This component allows faculty and staff to select and mark intext citations</p>
		    	<Button onMouseDown={this.setHighlightedText}>Get Highlighted Text</Button>
		    	<Form>
		    		<textarea id="highlightText" value={this.state.curHighlight} ref="highlightArea"></textarea>
		    		<Input type="select" name="citation" id="citationSelect">
						<option>Source 1</option>
						<option>Source 2</option>
						<option>Source 3</option>
						<option>Source 4</option>
						<option>Source 5</option>
					</Input>
		    		<Button onClick={testGetTextArea}>Submit In-Text Citation</Button>
		    	</Form>
			</div>
    	);
  	}
}

export default Markup;