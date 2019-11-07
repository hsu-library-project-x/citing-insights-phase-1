//importing react and reactstrap
import React, { Component } from 'react';
import {Input, Button} from 'reactstrap';


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
			curHighlight: "Put Highlighted Text Here!",
			citeSourceOptions: []
		};

		this.setHighlightedText = this.setHighlightedText.bind(this);
		this.clearCitation = this.clearCitation.bind(this);
		this.renderActions = this.renderActions.bind(this);
	}

	componentDidMount(){
		let v = this.props.citesource;
		this.setState({
			citeData: v,
			loaded: true
		});
		
		for(let i = 0; i < v.length; i++){
			this.state.citeSourceOptions.push(
				<option value={v[i].id}>{v[i].title}</option>
			)	
		}
	}

	renderActions(){
		if(this.state.loaded){
			return(
				<Input type="select" id="sourceSelect">
					{this.state.citeSourceOptions}
				</Input>
			);
		}
		
	}

	//function that changes the state of this to be what was highlighted
	setHighlightedText(){
		let highlight = getSelectionText();
		document.getElementById("highlightText").classList.remove("savedAnimation");
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
	    		<div>{this.renderActions()}</div>
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