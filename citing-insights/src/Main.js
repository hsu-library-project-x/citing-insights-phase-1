// Our Homepage for CitingInsights.net 

//Imprort Libraries
import React, {Component} from 'react';
import './App.css';
import { Jumbotron, Container, Row, Col } from 'reactstrap';



// Class to render our homepage
class Main extends Component{
	render(){
		return(
			<div id="MainContainer">
				<h1 class="head-1"> Main Menu </h1>
				
				<Row class="titlerow">
					<Col xs="4"><h2>Classes and Assignments</h2></Col>
					<Col xs="4"><h2>Account Information</h2></Col>
					<Col xs="4"><h2>Third Thing Here</h2></Col>
				</Row>
				<Row class="mainrow">
					<Col xs="4">
						<Jumbotron class="MainJumbo">

						</Jumbotron>
					</Col>
					<Col xs="4">
						<Jumbotron class="MainJumbo">
						</Jumbotron>
					</Col>
					<Col xs="4">
						<Jumbotron class="MainJumbo">
						</Jumbotron>
					</Col>
				</Row>
				
			</div>
		);
	}
}

export default Main;