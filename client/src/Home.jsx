//Our Homepage for CitingInsights.net 

//Imprort Libraries
import React, {Component} from 'react';
import { HashRouter, Link, withRouter } from "react-router-dom";
import './css/App.css';
import './css/Home.css';

//import jumbotron for looks
//import container, row, anc col for formatting
import {Row, Col} from 'reactstrap';

//import pictures!
import settings from './images/gears.svg';
import tasks from './images/pencil.svg';


// Class to render our homepage
class Home extends Component{

constructor(props){
	super(props);
}

render(){
	console.log("Home:");
	console.log(this.props);
	console.log(this.props.token);
	return(
			/* div to hold the hub */
			<div id="hub">
				<br />
				<Row>
					{/* Empty Col for formatting purposes */}
					<Col xs="1"></Col>

					<Col xs="5">
						<HashRouter>
							{/* div to hold the Tasks button/ option for user */}
							<Link to="/tasks">
								<button class="hubButton">
									<img alt="taskIcon" class="hubIcon" src={tasks} />
									<p>Tasks</p>
								</button> 
							</Link>
						</HashRouter>
					</Col>
					
					<Col xs="5"> 
						<HashRouter>
							<Link to="/accountsettings">
								<button class="hubButton">
										<img alt="settingsIcon" class="hubIcon" src={settings} /> 
										<p>Account Settings</p>
								</button>
							</Link>
						</HashRouter>
					</Col>
					{/* Empty Col for formatting purposes */} 
					<Col xs="1">
					</Col>
				</Row>
			</div>
			
		/* Gear Credit: <div>Icons made by <a href="https://www.flaticon.com/authors/egor-rumyantsev" title="Egor Rumyantsev">Egor Rumyantsev</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
			pencil credit: <div>Icons made by <a href="https://www.flaticon.com/authors/situ-herrera" title="Situ Herrera">Situ Herrera</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

		*/
		);
	}
}

export default withRouter(Home);