import React, {Component} from 'react';
import {Label, Input, Card, CardText, CardBody, CardTitle} from 'reactstrap';
import './css/RubricSubmit.css';

const Rubric = () => (
  <div class="rubricContainer">
    <Card>
      <CardBody>
        <CardTitle>Rubric Component</CardTitle>
        <CardText>Text about what this Rubric Component is goes here</CardText>
        <Label for="rubricValue">Score</Label>
        <Input type="select" name="select" id="rubricValue">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <CardTitle>Rubric Component</CardTitle>
        <CardText>Text about what this Rubric Component is goes here</CardText>
        <Label for="rubricValue">Score</Label>
        <Input type="select" name="select" id="rubricValue">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <CardTitle>Rubric Component</CardTitle>
        <CardText>Text about what this Rubric Component is goes here</CardText>
        <Label for="rubricValue">Score</Label>
        <Input type="select" name="select" id="rubricValue">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </CardBody>
    </Card>
  </div>
)

class RubricSubmit extends Component{
	constructor () {
		super();
		this.state = {
			rubricId: "",
			paperId: ""
		}

		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount(){
		if (this.props.curRubric !== undefined) {
      this.setState({
      	rubricId: this.props.curRubric,
      	paperId: this.props.curPaper
      });
    } else {
      this.setState({rubricId: "No Rubric Selected"});
    }
	}

	handleClick(){
		this.props.unmountMe();
	}

	render(){
		return(
			<div class="rubricSubmit">
				<button onClick={this.handleClick}>x</button>
				<Rubric/>
			</div>
		);
	}
}

export default RubricSubmit;