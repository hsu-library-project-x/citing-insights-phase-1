// Importing Libraries
import React, {Component} from 'react';
import './App.css';
// This lets us use Jumbotron, Badge, and Progress in HTML from Reactstrap
//    This is all we are using for now. May import more styling stuff later
import { ListGroup, ListGroupItem, Button, Input, Jumbotron, Badge, Progress } from 'reactstrap';

// Lets us use column / row and layout for our webpage using Reactstrap
import { Container, Row, Col } from 'reactstrap';

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

			          <select name="student">
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
			        <Col xs="3"></Col>
			      </Row>

			  	{/* Row Three: Contains -- Student Paper Text; Research Text; */}
			      <Row>
			        <Col xs="4">
			        	<ListGroup id="ResearchList">
			        		<ListGroupItem active tag="button" action>Research One</ListGroupItem>
			        		<ListGroupItem tag="button" action>Research Two</ListGroupItem>
			        		<ListGroupItem tag="button" action>Research Three</ListGroupItem>
			        		<ListGroupItem tag="button" action>Research Four</ListGroupItem>
			        		<ListGroupItem tag="button" action>Research Five</ListGroupItem>
			        	</ListGroup>
			            <p class="research"> 
			                Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.
			                Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.
			                Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale.
			            </p>
			        </Col>
			        <Col xs="5">
			        <Jumbotron>
			          <p class="student">
			            Spicy jalapeno bacon ipsum dolor amet meatloaf nulla pork belly elit boudin capicola exercitation nostrud consequat cupim alcatra bresaola in. 

			            Ad fugiat occaecat fatback. Short ribs ball tip excepteur esse in. Exercitation fugiat cupim beef, picanha leberkas nisi porchetta. Landjaeger ground round short loin dolor aliquip kevin quis tail. 

			            Sed turducken kevin nostrud andouille, ball tip officia mollit in short ribs. Ribeye pastrami pig nulla brisket jerky tenderloin fatback tongue consectetur ut commodo short ribs minim. ongue aliquip do lorem dolor. 
			            Brisket minim pork venison burgdoggen shankle, chuck nulla. Officia fatback commodo pancetta pork loin irure. 

			            Pork pork loin cupim, buffalo spare ribs nisi boudin sint ut cillum. Sirloin eu tenderloin frankfurter, nisi laboris commodo dolore lorem et deserunt. Enim spare ribs elit tongue tail veniam pork chop non jowl cupidatat. 
			            Esse kevin aliqua, adipisicing aute nostrud hamburger in commodo meatball jowl sed. 

			            Picanha bacon burgdoggen, adipisicing fatback ut proident pig ipsum aliqua. Culpa laboris ex pancetta aliqua meatball magna sint.

			            Meatball flank laborum incididunt sausage ad shoulder, leberkas labore. Tail andouille ut, brisket beef turducken nisi ut incididunt. 

			            Burgdoggen enim irure, biltong bacon et fatback reprehenderit mollit anim eu ball tip. 

			            Qui biltong ribeye est t-bone enim mollit andouille swine minim ut ut adipisicing. Landjaeger bacon ut, venison picanha est occaecat adipisicing flank. Ut frankfurter ground round incididunt ad picanha nostrud sausage culpa ipsum. Shank leberkas tenderloin, anim velit sed burgdoggen adipisicing mollit ribeye ex. 

			            Ipsum chicken cupim, dolor adipisicing sunt cupidatat culpa dolore. Picanha sed adipisicing reprehenderit commodo exercitation kielbasa cupidatat anim flank filet mignon ham hock. 

			            Proident ex deserunt pariatur reprehenderit ham voluptate alcatra ad eiusmod. Venison aliqua ground round, quis nisi boudin jerky. Beef ribs capicola mollit quis boudin meatball cupim tenderloin.
			          </p></Jumbotron>
			        </Col>
<<<<<<< HEAD
			        <Col xs="3">
			        	<Input type="textarea" name="annotation" id="curAnno" />
			        	<Button color="success" id="finishButton">Finished</Button>
			        	<Button color="danger" id="cancelButton">Cancel</Button>
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