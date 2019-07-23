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
			curCard: []
		}

		this.handleClick = this.handleClick.bind(this);
		this.renderActions = this.renderActions.bind(this);
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
			        <Input type="number" placeholder="0-10" min="0" max="10" name="select" id="rubricValue" />
			      </CardBody>
			    </Card>
		    );
			}
			return(this.state.rubricCards);
		}
	}

	handleClick(){
		this.props.unmountMe();
	}
	render(){
		return(
			<div class="rubricSubmit">
				<button onClick={this.handleClick}>x</button>
				<h2 class="rubricTitle">{this.state.currentRubric.name}</h2>
				<form>
					<div class="cardContainer">{this.renderActions()}</div>
				</form>
			</div>
		);
	}
}

export default RubricSubmit;