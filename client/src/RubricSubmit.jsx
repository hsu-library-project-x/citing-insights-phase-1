import React, {Component} from 'react';
import {Label, Input, Card, CardText, CardBody, CardTitle} from 'reactstrap';
import './css/RubricSubmit.css';


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
		}

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
			      <CardBody>
			        <CardTitle>{curCard.cardTitle}</CardTitle>
			        <CardText>{curCard.cardText}</CardText>
			        <Label for="rubricValue">Score</Label>
			        <Input type="number" placeholder="0-10" min="0" max="10" name={"score" + i} id={"rubricValue" + i} />
			      </CardBody>
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
    var form = event.currentTarget;
    //compile an array of rubric information and scores for cards
    let data = [];
    for(let i =0; i < form.length - 1; i++){
    	let dataSet = {
    		"name": this.state.cardData[i].cardTitle,
    		"info": this.state.cardData[i].cardText,
    		"score": form[i].value
    	}
    	data.push(dataSet);
    }

    //do a fetch statement using the citation ID to add scores
    //citation ID at the end of this url
    //add this route in the routes and models

    let rubricScore = JSON.stringify(data);
    fetch('/citation/add_rubric_score/id', {
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
			<div class="rubricSubmit">
				<button onClick={this.handleExitClick}>x</button>
				<h2 class="rubricTitle">{this.state.currentRubric.name}</h2>
				<p class="citationInfo">{this.props.sourceText}</p>
				<form onSubmit={this.handleSubmitRubric}>
					<div class="cardContainer">{this.renderActions()}</div>
					<input type="submit" value="Submit Scores" />
				</form>
			</div>
		);
	}
}

export default RubricSubmit;