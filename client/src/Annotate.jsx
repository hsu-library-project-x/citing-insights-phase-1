import React, { Component } from 'react'
import { Input } from 'reactstrap';

//This function will dynamically change the value in our progress bar 


class Annotate extends Component {
	constructor(props) {
	    super(props)
	    this.state = {
	      	citeData: [],
	      	loaded: false,
	      	inTextOptions: []
		}

		this.renderActions = this.renderActions.bind(this);
		this.getText = this.getText.bind(this);
	}

	//set state to citeData from parent
	componentDidMount(){
		let v = this.props.citedata;
		this.setState({
			citeData: v,
			loaded: true
		});

		for(let i = 0; i < v.length; i++){
			this.state.inTextOptions.push(
				<option value={"source_" + v[i].id}>{"Source Citation: " + v[i].title}</option>
			)	
		}
	}

	renderActions(){
		if(this.state.loaded){
			let data = this.state.citeData;
			for(let i = 0; i < data.length; i++){
				let curInCiteArray =  data[i].intextCites;
				for(let j = 0; j < curInCiteArray.length; j++){
					if(j === 0){
						document.getElementById("selectedText").innerHTML = "Select A Citation";
					}
					let curIntextId = curInCiteArray[j].id
					//let inTextValue = "intext" + j;
					let citeSource = "Intext Citation " + j + " from: " + data[i].id;
					this.state.inTextOptions.push(
						<option value={curIntextId + "_" + data[i].id}>{citeSource}</option>
					)
				}
			}

			return(
				<Input type="select" id="inCitesForAnno" onChange={this.getText}>
					<option disabled selected hidden>Select a Citation to Annotate</option>
					{this.state.inTextOptions}
				</Input>
			);
		}
	}

	getText(){
		let data = this.state.citeData;
		let text = "";
		let curids = document.getElementById("inCitesForAnno").value.split("_");

		for(let i = 0; i < data.length; i++){
			if(curids[0] === "source"){
				if(data[i].id === curids[1]){
					let annotation = data[i].annotation;
					document.getElementById("selectedText").innerHTML = "This is a Source Citation";
					document.getElementById("curAnno").value = annotation;
					return;
				}
			}
			if(data[i].id === curids[1]){
				let curArray = data[i].intextCites;
				for(let j = 0; j < curArray.length; j++){
					if(curArray[j].id === curids[0]){
						text = curArray[j].text;
						let annotation = curArray[j].annotation;
						document.getElementById("selectedText").innerHTML = text;
						document.getElementById("curAnno").value = annotation;
						return;
					}
				}
			}
		}
	}

 	render() {
    	return(
	    	<div class="anno-contain">
		    	<p> Annotation Box </p>
		    	<div id="sourceSelectContainer">{this.renderActions()}</div>
		    	<p id="selectedText">Select A Citation!</p>
		    	<Input type="textarea" name="annotation" id="curAnno" />
		    </div>
    	);
    }
}

export default Annotate;