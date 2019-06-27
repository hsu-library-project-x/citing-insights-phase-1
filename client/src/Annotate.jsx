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
	}

	//set state to citeData from parent
	componentDidMount(){
		let v = this.props.citedata;
		this.setState({
			citeData: v,
			loaded: true
		});
	}

	renderActions(){
		if(this.state.loaded){
			let data = this.state.citeData;
			for(let i = 0; i < data.length; i++){
				let curInCiteArray =  data[i].intextCites;
				for(let j = 0; j < curInCiteArray.length; j++){
					let intvalue = "intext" + j;
					let citeSource = "Intext Citation " + j + " from: " + data[i].id;
					this.state.inTextOptions.push(
						<option value={intvalue}>{citeSource}</option>
					)
				}
			}

			return(
				<Input type="select" id="inCitesForAnno">
					{this.state.inTextOptions}
				</Input>
			);
		}
		
	}

	


 	render() {
    	return(
	    	<div class="anno-contain">
		    	<p> Annotation Box </p>
		    	<div id="sourceSelectContainer">{this.renderActions()}</div>
		    	<Input type="textarea" name="annotation" id="curAnno" />
		    	
		   		{/* Progress Bar -- Still need to make dynamic */}
		   		
		    </div>
    	);
    }
}

export default Annotate;