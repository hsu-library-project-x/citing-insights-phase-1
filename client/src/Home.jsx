// Our Homepage for CitingInsights.net 

//Imprort Libraries
import React, {Component} from 'react';
import { HashRouter, Link } from "react-router-dom";
import './css/App.css';
import './css/Home.css';

//import jumbotron for looks
//import container, row, anc col for formatting
import {Row, Col} from 'reactstrap';

//import pictures!
import settings from './images/gears.svg';
import tasks from './images/pencil.svg';
import logo from "./images/CIHome.png";
 

// Class to render our homepage
class Home extends Component{
	render(){
		return(
			/* div to hold the hub */
			<div id="hub">
				<br />
				<Row>
					{/* Empty Col for formatting purposes */}
					<Col xs="3"></Col>

					<Col xs="6">
						<img id="HomeLogo" src={logo} alt="logo" ></img>
						<br />
						<HashRouter>
							{/* div to hold the Tasks button/ option for user */}
							<Link to="/tasks">
								<button class="hubButton">
									<p>Tasks</p>
								</button> 
							</Link>
							<Link to="">
								<button class="hubButton">
									<p>Downloads (TBC)</p>
								</button>
							</Link>
							<Link to="">
								<button class="hubButton">
									<p>To Be Continued</p>
								</button>
							</Link>
							<Link to="">
								<p> About Us</p>
							</Link>
							<Link to="">
								<p> Contact Us</p>
							</Link>
						</HashRouter>
					</Col>
					{/* Empty Col for formatting purposes */} 
					<Col xs="3"></Col>
				</Row>
			</div>
			
		/* Gear Credit: <div>Icons made by <a href="https://www.flaticon.com/authors/egor-rumyantsev" title="Egor Rumyantsev">Egor Rumyantsev</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
			pencil credit: <div>Icons made by <a href="https://www.flaticon.com/authors/situ-herrera" title="Situ Herrera">Situ Herrera</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>

		*/
		);
	}
}

export default Home;