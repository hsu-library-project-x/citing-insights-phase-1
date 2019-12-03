import React, {Component} from 'react';
import {Card} from '@material-ui/core';
import TextField from "@material-ui/core/TextField";

class RubricSubmit extends Component{
	constructor () {
		super();
		this.state = {
			currentRubric: [],
			paperId: "",
			rubricCards: [],
			rubricLoaded: false,
			curCard: [],
			cardData: []
		};

		this.handleExitClick = this.handleExitClick.bind(this);
		this.renderActions = this.renderActions.bind(this);
		this.handleSubmitRubric = this.handleSubmitRubric.bind(this);
	}

	componentDidMount(){
		if (this.props.curRubric !== undefined) {
      this.setState({
      	currentRubric: this.props.curRubric,
      	paperId: this.props.curPaper
      });
    } else {
      this.setState({currentRubric: "No Rubric Selected"});
    }

	}

	renderActions(){
		if(this.state.currentRubric.length !== 0 && this.state.rubricCards.length === 0){
			let rubrics = this.state.currentRubric.cards;
			for(let i = 0; i < rubrics.length; i++){
				let item = rubrics[i];
				let curCard = item["card" + i];
				this.state.cardData.push(curCard);
				this.state.rubricCards.push(
				<Card>
			        <h6>{curCard.cardTitle}</h6>
			        <p>{curCard.cardText}</p>
			        <label for="rubricValue">Score</label>
			        <TextField
						type="number"
						placeholder="0-10"
						min="0"
						max="10"
						name={"score" + i}
						id={"rubricValue" + i} />
			    </Card>
		    );
			}
			return(this.state.rubricCards);
		}
	}

	handleExitClick(){
		this.props.unmountMe();
	}

	async handleSubmitRubric(event){
    event.preventDefault();
    let form = event.currentTarget;
    //compile an array of rubric information and scores for cards
    let data = [];
    for(let i =0; i < form.length - 1; i++){
    	let dataSet = {
    		"name": this.state.cardData[i].cardTitle,
    		"info": this.state.cardData[i].cardText,
    		"score": form[i].value
    	};
    	data.push(dataSet);
    }

    //do a fetch statement using the citation ID to add scores
    //citation ID at the end of this url
    //add this route in the routes and models

    let rubricScore = JSON.stringify(data);
    fetch('http://localhost:5000/citation/add_rubric_score/id', { //missing async function call
      method: 'POST',
      body: rubricScore,
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
  }

	render(){
		return(
			<div className="rubricSubmit">
				<button onClick={this.handleExitClick}>x</button>
				<h2 className="rubricTitle">{this.state.currentRubric.name}</h2>
				<p className="citationInfo">{this.props.sourceText}</p>
				<form onSubmit={this.handleSubmitRubric}>
					<div className="cardContainer">{this.renderActions()}</div>
					<input type="submit" value="Submit Scores" />
				</form>
			</div>
		);
	}
}

export default RubricSubmit;