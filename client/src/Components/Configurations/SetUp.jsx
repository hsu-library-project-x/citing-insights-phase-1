import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

class SetUp extends Component {
    constructor(props) {
        super(props);
        this.state={
            primaryColor: "#25551b",
            secondaryColor: "#5C8021",
            institutionName: "Humboldt State University"
        }
        this.handleInputChange= this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(e){
        this.props.history.push('/');
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>
                        Color Selection
                    </legend>
                    <p> Please Select the primary and secondary colors we should use for this application.
                        The primary color will be used for navigation bars, button backgrounds, etc..
                        The secondary color will be used for things like accents or highlights of elements
                    </p>
                    <p> Instructions: Type the color you want using hex the 6 digit hex code. Do not include the '#'. </p>
                <TextField
                    id="primaryColor"
                    label="Primary Color"
                    onChange={this.handleInputChange}
                    name="primaryColor"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">#</InputAdornment>,
                    }}
                />
                <TextField
                    id="secondaryColor"
                    label="Secondary Color"
                    onChange={this.handleInputChange}
                    name="secondaryColor"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">#</InputAdornment>,
                    }}
                />
                </fieldset>
                <fieldset>
                    <legend> Institution Name </legend>
                    <p> Instructions: Type you institution name as you would like it to appear. </p>
                    <TextField
                        id="institutionName"
                        label="Institution Name"
                        onChange={this.handleInputChange}
                        name='institutionName'
                    />
                </fieldset>
                <Button  variant="contained" type="submit"> Submit </Button>
            </form>
        );
    }
}

export default SetUp;