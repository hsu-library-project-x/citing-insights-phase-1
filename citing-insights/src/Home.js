// Our Homepage for CitingInsights.net 

//Imprort Libraries
import React, {Component} from 'react';
import { Switch, Route, HashRouter, Link } from "react-router-dom";
import './App.css';

//import jumbotron for looks
//import container, row, anc col for formatting
import {Jumbotron, Container, Row, Col} from 'reactstrap';


// Class to render our homepage
class Home extends Component{
	render(){
		return(
			/* div to hold the hub */
			<div id="hub">

				<br />

				<Row>
					{/* Empty Col for formatting purposes */}
					<Col xs="2">
					</Col>

					<Col xs="4">
						<HashRouter>
							{/* Jumbotron to hold the Tasks button/ option for user */}
							<Jumbotron>
								<Link to="/tasks"><button class="hubButton">
									<img class="hubIcon" src="khadeeja-yasser-1236779-unsplash.jpg" />
								</button> </Link>
								<p>Tasks</p>
							</Jumbotron>
						</HashRouter>
					</Col>

					<Col xs="4"> 
						{/* Jumbotron to hold the account settings button/ option for user */}
						<Jumbotron>
							<button class="hubButton">
								<img class="hubIcon" src="khadeeja-yasser-1236779-unsplash.jpg" />
							</button>
							<p>Account Settings</p>
						</Jumbotron>
					</Col>

					{/* Empty Col for formatting purposes */} 
					<Col xs="2">
					</Col>
					
				</Row>


			</div>
			
		);
	}
}

export default Home;