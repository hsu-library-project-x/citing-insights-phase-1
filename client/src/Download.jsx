import React, {Component} from 'react';
import {Input} from 'reactstrap';
import MultiselectTwoSides from 'react-multiselect-two-sides';
import './css/Download.css';


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
			]
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleChangeSetting = this.handleChangeSetting.bind(this);
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
				<h2>Download:</h2>
				<form id="downloadForm">
					<label for='class'>Class:</label>
					<Input name="class" type="select" required>
						<option value="" disabled selected hidden >Select a Class</option>
						<option value="1">Class One</option>	
					</Input>
					<br />
					<label for='assignment'>Assignment:</label>
					<Input name="assignment" type="select" required>
						<option value="" disabled selected hidden >Select an Assignment</option>
						<option value="1">Assignment One</option>	
					</Input>
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


export default Download;