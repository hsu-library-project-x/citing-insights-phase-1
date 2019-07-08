import React, {Component} from 'react';
import {Input, Card, CardText, CardBody, CardTitle, Button} from 'reactstrap';

class Cards extends Component{

	constructor(props){
		super(props);
		this.state = {
			cardContents: [],
			cardId: "",
			idExists: false
		}
	}

	renderCard(){
		if(this.state.idExists){
			this.getCardTags();
		}
	}

	componentDidMount(){
		let id = this.props.id;
		this.setState({
			cardId: id,
			idExists: true
		});
	}
	
	render(){
		let curId = this.state.cardId;
		return(
			<div className={'cardContainer'}>
				<Card>
					<CardBody>
						<CardTitle for={"Title-"+curId}>Rubric Item Title</CardTitle>
						<Input onInput={this.onInput} type="text" id={"Title-"+curId} class="rubricTitles"/>
						<CardText for={"Text-"+curId}>Rubric Descriptions</CardText>
						<Input onInput={this.onInput} type="textarea" id={"Text-"+curId} class="rubricDescriptions"/>
					</CardBody>
				</Card>
			</div>
		);
	}
}

export default Cards