// Importing Libraries
import React, {Component} from 'react';
import './css/App.css';
import './css/Analyze.css';
import Annotate from './Annotate';
import Markup from './Markup';
// This lets us use Jumbotron, Badge, and Progress in HTML from Reactstrap
//    This is all we are using for now. May import more styling stuff later
import { Label, ListGroup, ListGroupItem, Button, Input, Jumbotron, Badge, Progress } from 'reactstrap';
import {Card, CardText, CardBody, CardTitle} from 'reactstrap';
// Lets us use column / row and layout for our webpage using Reactstrap
import {Row, Col } from 'reactstrap';

//Function to dynamically call source material
function displaySource(props){
	//Dynamically get id
	var source = props.target.id;

	if(source === "sourceJumbo"){
		//code to make research text collapseable here 

		// Get Id of element above Jumbotron
		//run code in lower if stmt
		return;
	}
	// Put text in ListItem
	var ListItemTextbox = document.getElementById(source);
	
	var bibBox = document.getElementById("biblio-box");
	
	if(ListItemTextbox.classList.contains("selectedResearch")){
		//reset here --- Replace with Original Text of Citation
		ListItemTextbox.innerHTML = "Reset Text";
		ListItemTextbox.classList.remove("selectedResearch");
		bibBox.innerHTML = "Please Select A Source";
	}
	else{

		ListItemTextbox.classList.add("selectedResearch");
		var SourceText = "This is where the Research Text will populate and show up!";

		var currentText = ListItemTextbox.innerHTML;
		//from here populate the bibliography box with more information
		bibBox.innerHTML = currentText + " Additional Information of the Citation";
		//append inner HTML of List Item Text Box
		//eventually this veggie ipsum will be replaced by a variable
		ListItemTextbox.innerHTML = currentText + "<br/> <hr><Jumbotron id='sourceJumbo'>" + SourceText + "</Jumbotron>" ;
	}	
}

//This function will change the students paper
function displayPaper(props){
	var paper = document.getElementById("student");
	//var selectedStudent = document.getElementById("selectedStudent");
	//put dynamic call here
		//eventually this meat ipsum will be replaced by a variable
	paper.innerHTML = "Spicy jalapeno bacon ipsum dolor amet meatloaf nulla pork belly elit boudin capicola exercitation nostrud consequat cupim alcatra bresaola in. \n Ad fugiat occaecat fatback. Short ribs ball tip excepteur esse in. Exercitation fugiat cupim beef, picanha leberkas nisi porchetta. Landjaeger ground round short loin dolor aliquip kevin quis tail. \n Sed turducken kevin nostrud andouille, ball tip officia mollit in short ribs. Ribeye pastrami pig nulla brisket jerky tenderloin fatback tongue consecteturut commodo short ribs minim. ongue aliquip do lorem dolor. \n Brisket minim pork venison burgdoggen shankle, chuck nulla. Officia fatback commodo pancetta pork loin irure.";
}


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

// Demo is (for now) is our Analyze page
class Analyze extends Component{
	constructor () {
	    super()
	    this.state = {
	      	isHidden: true,
	      	isMarkup: true
	    }
	}

	toggleHidden(){
		this.setState({
			isHidden: !this.state.isHidden
		})
	}

	toggleMarkup(){
		this.setState({
			isMarkup: !this.state.isMarkup
		})
	}

	render() {
		return(
		/* Analyze Mode HTML Start */
			<div class="DemoContents analyze-container">
			{/* One Giant container that will let us use rows / columns */}
			 	{/* Row One: Contains -- Student Paper Drop Down; Works Cited Bibliogrpahy; and Word Map Feature  */}
			      <Row>
			        <Col xs="3">
			          <p>Current Student</p>
				         <select id="selectedStudent" name="student" onChange={displayPaper}>
				     		{/* These should be automatically generated with AJAX and API */}
				      		<option value="0">Please Select Student</option>
				            <option value="1">Kyle</option>
				            <option value="2">Liz</option>
				            <option value="3">Mitchel</option>
				            <option value="4">Cindy</option>
				            <option value="5">Ben</option>
				         </select> 
				         <Button id="rubricButton" onClick={this.toggleHidden.bind(this)}>Rubric</Button>
			        </Col>
			        <Col xs="6">
			            <p id="biblio-box">Bibliography Goes Here</p>
			        </Col>
			        <Col xs="3">
			        	
			          	<div class="word-map">
				         	{/*To be populated by an actual function that grabs the most common words TBD*/}
				           
				            <Badge color="success" pill>Cupim</Badge>
				            <Badge color="success" pill>Beef</Badge>
				            <Badge color="danger" pill>Broccoli</Badge>
				            <Badge color="success" pill>Liver</Badge>
				            <Badge color="info" pill>Kidney</Badge>
				            <Badge color="success" pill>Form</Badge>
				            <Badge color="success" pill>Test</Badge>
			          	</div>
			        </Col>
			      </Row>
			 	{/* Row Two: Contains Rubric on display; */}
			      <Row>
			        <Col xs="12">
			        	{!this.state.isHidden && <Rubric />}
			        </Col>
			      </Row>
			  	{/* Row Three: Contains -- Student Paper Text; Research Text; and Annotation textbox */}
			      <Row>
			        <Col xs="3">
			        	<h2>Found Sources</h2>
			        	<ListGroup id="ResearchList">
			        		<ListGroupItem id="CiteItem1" tag="button" action onClick={displaySource}>Research One</ListGroupItem>
			        		<ListGroupItem id="CiteItem2" tag="button" action onClick={displaySource}>Research Two</ListGroupItem>
			        		<ListGroupItem id="CiteItem3" tag="button" action onClick={displaySource}>Research Three</ListGroupItem>
			        		<ListGroupItem id="CiteItem4" tag="button" action onClick={displaySource}>Research Four</ListGroupItem>
			        		<ListGroupItem id="CiteItem5" tag="button" action onClick={displaySource}>Research Five</ListGroupItem>
			        	</ListGroup>
			        </Col>
			        <Col xs="6">
			    		<h2> Student Paper Block Text </h2>
			        	<Jumbotron>
			        		{/* Student paper -- eventually to be replaced with JSON object */}
			          		<p id="student">Please select a student's paper</p>
			          	</Jumbotron>
			        </Col>
			    	{/* Textbox for user annotations */}
			        <Col xs="3">
			        	<Button onClick={this.toggleMarkup.bind(this)}>Markup Inline Citations</Button>
			        	{(!this.state.isMarkup) ? <Annotate /> : <Markup />}
			        </Col>
			      </Row>
		    </div>
		);
	}
}

export default Analyze;