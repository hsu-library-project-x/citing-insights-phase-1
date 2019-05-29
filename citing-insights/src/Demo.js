// Importing Libraries
import React, {Component} from 'react';
import './App.css';
// This lets us use Jumbotron, Badge, and Progress in HTML from Reactstrap
//    This is all we are using for now. May import more styling stuff later
import { ListGroup, ListGroupItem, Button, Input, Jumbotron, Badge, Progress } from 'reactstrap';

// Lets us use column / row and layout for our webpage using Reactstrap
import { Container, Row, Col } from 'reactstrap';

//Function to dynamically call source material
function displaySource(props)
{
	//Dynamically get id
	var source = props.target.id;

	if(source === "sourceJumbo"){
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

//This function will dynamically change the value in our progress bar 
function testProgress(props){

	//get id
	
	var bar = document.getElementById("progress").getElementsByClassName("progress-bar");

	// Change the value in the progress bar --- 
		//Eventually will change to be dynamically generated
	bar[0].attributes[2].nodeValue = "75";
	bar[0].attributes["style"].nodeValue = "width: 75%";
}


// Demo is (for now) is our Analyze page
class Demo extends Component{
	render(){
		return(

		/* Analyze Mode HTML Start */
			<div class="DemoContents">
				<h1 class="head-1"> Analyze Mode </h1>
			{/* One Giant container that will let us use rows / columns */}
			 	<Container>
			 	{/* Row One: Contains -- Student Paper Drop Down; 
			 							 Works Cited Bibliogrpahy;
			 							 and Word Map Feature  */}
			      <Row>
			        <Col xs="4">
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
			        </Col>
			        <Col xs="5">
			            <p id="biblio-box">Bibliography Goes Here</p>
			        </Col>
			        <Col xs="3">
			          <div class="word-map">
			            <Badge color="success" pill>Words</Badge>
			            <Badge color="success" pill>More Words</Badge>
			            <Badge color="success" pill>Extra-Words</Badge>
			            <Badge color="danger" pill>Firetruck</Badge>
			            <Badge color="info" pill>Vegan</Badge>
			            <Badge color="info" pill>Meatball</Badge>
			            <Badge color="success" pill>Words</Badge>
			            <Badge color="success" pill>Ribeye</Badge>
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
			 	{/* Row Two: Contains Headers for Student Paper Text and Research Text; */}
			      <Row>
			        <Col xs="4"><h2>Found Sources</h2></Col>
			        <Col xs="5"><h2> Student Paper Block Text </h2></Col>
			        <Col xs="3"><h2> Annotation Box </h2></Col>
			      </Row>
			  	{/* Row Three: Contains -- Student Paper Text; Research Text; and Annotation textbox */}
			      <Row>
			        <Col xs="4">
			        	<ListGroup id="ResearchList">
			        		<ListGroupItem id="CiteItem1" tag="button" action onClick={displaySource}>Research One</ListGroupItem>
			        		<ListGroupItem  id="CiteItem2" tag="button" action onClick={displaySource}>Research Two</ListGroupItem>
			        		<ListGroupItem  id="CiteItem3" tag="button" action onClick={displaySource}>Research Three</ListGroupItem>
			        		<ListGroupItem  id="CiteItem4" tag="button" action onClick={displaySource}>Research Four</ListGroupItem>
			        		<ListGroupItem  id="CiteItem5" tag="button" action onClick={displaySource}>Research Five</ListGroupItem>
			        	</ListGroup>
			        </Col>
			        <Col xs="5">
			    {/* Student paper -- eventually to be replaced with JSON object */}
			        <Jumbotron>
			          <p id="student">
			    		Please select a student's paper 
			          </p></Jumbotron>
			        </Col>

			    	{/* Textbox for user annotations */}
			        <Col xs="3">
			        	<Input type="textarea" name="annotation" id="curAnno" />
			        	<Button color="success" id="finishButton">Finished</Button>
			        	<Button color="danger" id="cancelButton">Cancel</Button>

			       		{/* Progress Bar -- Still need to make dynamic */}

			          	<p>Total Assessed: 74%</p>
			          	<Progress id="progress" value="20" />
			          	<Button color="warning" id="ProgressTest" onClick={testProgress}> Test Button </Button>
			        </Col>

			      </Row>
		    	</Container>
		    </div>
		);
	}
}

export default Demo;