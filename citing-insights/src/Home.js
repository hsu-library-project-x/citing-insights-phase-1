// Our Homepage for CitingInsights.net 

//Imprort Libraries
import React, {Component} from 'react';
import { Switch, Route, HashRouter, Link } from "react-router-dom";
import './css/App.css';
import './css/Home.css';

//import jumbotron for looks
//import container, row, anc col for formatting
import {Jumbotron, Container, Row, Col} from 'reactstrap';

//import pictures!
import settings from './images/settings.jpg';
import tasks from './images/tasks.jpg';
 

// Class to render our homepage
class Home extends Component{
	render(){
		return(
			/* div to hold the hub */
			<div id="hub">
				<br />
				<Row>
					{/* Empty Col for formatting purposes */}
					<Col xs="2"></Col>

					<Col xs="4">
						<HashRouter>
							{/* Jumbotron to hold the Tasks button/ option for user */}
							<div class="hubBackground">
								<Link to="/tasks"><button class="hubButton">
									<img class="hubIcon" src={tasks} />

								</button> </Link>
								<p>Tasks</p>
							</div>
						</HashRouter>
					</Col>


					<Col xs="4"> 
						<HashRouter>
							
							<div class="hubBackground">
								<Link to="/accountsettings"><button class="hubButton">
									<img class="hubIcon" src={settings} />
								</button> </Link>
								<p>Account Settings</p>
							</div>
						</HashRouter>
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