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
	//This is where we pull research and display 
	var research = document.getElementById("source");
	alert("test");
	//put dynamic call here
		//eventually this veggie ipsum will be replaced by a variable
	research.innerHTML = "Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.";
}

function displayPaper(props)
{
	var paper = document.getElementById("student");
	var selectedStudent = document.getElementById("selectedStudent");
	//put dynamic call here
		//eventually this meat ipsum will be replaced by a variable
	paper.innerHTML = "Spicy jalapeno bacon ipsum dolor amet meatloaf nulla pork belly elit boudin capicola exercitation nostrud consequat cupim alcatra bresaola in." + "\n" + "Ad fugiat occaecat fatback. Short ribs ball tip excepteur esse in. Exercitation fugiat cupim beef, picanha leberkas nisi porchetta. Landjaeger ground round short loin dolor aliquip kevin quis tail." +"\n" 
		+ "Sed turducken kevin nostrud andouille, ball tip officia mollit in short ribs. Ribeye pastrami pig nulla brisket jerky tenderloin fatback tongue consecteturut commodo short ribs minim. ongue aliquip do lorem dolor." + "\n" + "Brisket minim pork venison burgdoggen shankle, chuck nulla. Officia fatback commodo pancetta pork loin irure.";
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
			          <div class="biblio-box">
			            <p>Bibliography Goes Here</p>
			          </div>
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
			        		<ListGroupItem id="CiteItem1" active tag="button" action onClick={displaySource}>Research One</ListGroupItem>
			        		<ListGroupItem tag="button" action>Research Two</ListGroupItem>
			        		<ListGroupItem tag="button" action>Research Three</ListGroupItem>
			        		<ListGroupItem tag="button" action>Research Four</ListGroupItem>
			        		<ListGroupItem tag="button" action>Research Five</ListGroupItem>
			        	</ListGroup>
			        	<Jumbotron id="source">
			            </Jumbotron>
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

			       		{/* Progress Bar */}
			          	<p>Total Assessed: 74%</p>
			          	<Progress value={75} />
			        </Col>

			      </Row>
		    	</Container>
		    </div>
		);
	}
}

export default Demo;