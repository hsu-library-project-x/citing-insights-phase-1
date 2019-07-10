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
				{label: 'Baz', value: 2, disabled: true},
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
			value: [0, 3, 9],
			highlight: [5, 8, 9],
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
				},
				{
					label: 'Limit',
					name: 'limit',
					value: 5
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
			<div>
				<p>
					{settings.map(setting => {

						if (typeof setting.value === 'number') {
							return (
								<label
									key={setting.name}
								>
									{` ${setting.label}: `}

									<input
										type="number"
										min="0"
										onChange={this.handleChangeSetting}
										{...setting}
									/>
								</label>
							);
						}

						return null;
					})}
				</p>
				<Input name="class" type="select">
					<option value="" disabled selected hidden >Select a Class</option>
					<option value="1">Class One</option>	
				</Input>
				<Input name="assignment" type="select">
					<option value="" disabled selected hidden >Select an Assignment</option>
					<option value="1">Assignment One</option>	
				</Input>
				<MultiselectTwoSides
					className="msts_theme_example"
					availableHeader="Available"
					availableFooter={`Available: ${availableCount}`}
					selectedHeader="Selected"
					selectedFooter={`Selected: ${selectedCount}`}
					placeholder="Filter…"
					options={options}
					highlight={highlight}
					value={value}
					onChange={this.handleChange}
					{...s}
				/>
			</div>
		);
	}
}


export default Download;