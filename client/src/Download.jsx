import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {Input} from 'reactstrap';
import MultiselectTwoSides from 'react-multiselect-two-sides';
import './css/Download.css';

//import searchIcon from './images/magnifying-glass.svg';


// Class to render our homepage
class Download extends Component{
	constructor(props) {
		super(props);

		this.state = {
			options: [
				{label: 'Foo', value: 0},
				{label: 'Bar', value: 1},
				{label: 'Baz', value: 2},
				{label: 'Qux', value: 3},
				{label: 'Quux', value: 4},
				{label: 'Corge', value: 5},
				{label: 'Grault', value: 6},
				{label: 'Garply', value: 7},
				{label: 'Waldo', value: 8},
				{label: 'Fred', value: 9},
				{label: 'Plugh', value: 10},
				{label: 'Xyzzy', value: 11},
				{label: 'Thud', value: 12}
			],
			value: [],
			highlight: [],
			search: false,
			settings: [
				{
					label: 'Show controls',
					name: 'showControls',
					value: true
				},
				{
					label: 'Searchable',
					name: 'searchable',
					value: true
				},
				{
					label: 'Clearable',
					name: 'clearable',
					value: true
				},
				{
					label: 'Disabled',
					name: 'disabled',
					value: false
				}
			],
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleChangeSetting = this.handleChangeSetting.bind(this);
		this.showSearch=this.showSearch.bind(this);
	}

	showSearch(state){

		this.setState({
		search: !this.state.search
		});
		
		document.getElementsByClassName('.msts__side_filter').style.display= {  display: this.state.search ? 'none': 'inline'};
	}

	handleChange(value) {
		this.setState({value});
	}

	handleChangeSetting(e) {
		const {
			name,
			value
		} = e.target;

		this.setState(state => {
			const setting = this.getSettingByName(state, name);
			const newValue = typeof setting.value === 'boolean' ? !setting.value : parseInt(value, 10);
			setting.value = newValue;

			if (name === 'searchable') {
				this.getSettingByName(state, 'clearable').disabled = !newValue;
			}

			return state;
		});
	}

	getSettingByName(state, name) {
		let result;

		for (const setting of state.settings) {
			if (setting.name === name) {
				result = setting;
				continue;
			}
		}

		return result;
	}

	render() {
		const {
			highlight,
			options,
			settings,
			value
		} = this.state;
		const selectedCount = value.length;
		const availableCount = options.length - selectedCount;
		const s = settings.reduce((a, b) => {
			a[b.name] = b.value;
			return a;
		}, {});

		return (
			<div class="download-container">
				<h1>Download</h1>
				<form id="downloadForm">
					{/* <label for='class'>Class:</label> */}
					<Input name="class" type="select" required>
						<option value="" disabled selected hidden >Select a Class</option>
						<option value="1">Class One</option>	
					</Input>
					<br />
					{/* <label for='assignment'>Assignment:</label> */}
					<Input name="assignment" type="select" required>
						<option value="" disabled selected hidden >Select an Assignment</option>
						<option value="1">Assignment One</option>	
					</Input>
					{/* <button onClick={this.showSearch(this.state.search)} ><img src="./images/magnifying-glass.svg" alt="magnifying-glass" /></button> */}
					
					<MultiselectTwoSides
						className="multiselect"
						availableHeader="Available"
						availableFooter={`Available: ${availableCount}`}
						selectedHeader="Selected"
						selectedFooter={`Selected: ${selectedCount}`}
						placeholder="search"
						options={options}
						highlight={highlight}
						value={value}
						onChange={this.handleChange}
						{...s}
					/>					
					<Input type="submit" value="Download"/>
				</form>
			</div>
		);
	}
}

// <div>Icons made by <a href="https://www.flaticon.com/authors/gregor-cresnar" 
// title="Gregor Cresnar">Gregor Cresnar</a> from <a href="https://www.flaticon.com/"                
// title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 
// title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div> */}


export default withRouter(Download);