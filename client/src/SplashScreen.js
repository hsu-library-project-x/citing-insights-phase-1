import React, { Component } from 'react';
import {Button, Input, TextField} from "@material-ui/core";

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
            primaryColor:"",
            secondaryColor:"",
            institutionName:"",
            oneSearchUrl:"",
            loginScreen:"",
        }
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.renderSplash = this.renderSplash.bind(this);


    }

    handleSubmit = (event) => {
        event.preventDefault();

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    renderSplash() {
        return(
            <form className={'modal_form'} onSubmit={this.handleSubmit} >
                <fieldset className={'modal_fieldset'}>
                    <legend> User Interface Colors in HEX </legend>
                    <TextField
                        label={'Primary Color'}
                        helperText={"This color should be dark"}
                        placeholder={'#000000'}
                        onChange={this.handleInputChange}
                        name="primaryColor"
                        required
                        style={{marginBottom: "1em"}}/>
                    <br />
                    <TextField
                        label={'Secondary Color'}
                        helperText={"This color should be lighter"}
                        onChange={this.handleInputChange}
                        placeholder={'#ffffff'}
                        name="secondaryColor"
                        style={{marginBottom: "1em"}} />
                </fieldset>
                <fieldset className={'modal_fieldset'}>
                    <legend> Institution Name </legend>
                    <TextField
                        label={'Institution Name'}
                        placeholder={'Humboldt State University'}
                        onChange={this.handleInputChange}
                        name="institutionName"
                        required
                        style={{marginBottom: "1em"}}/>
                </fieldset>
                <fieldset className={'modal_fieldset'}>
                    <legend> Library Discovery Tool Information (OneSearch Information) </legend>
                    <Input
                        type={'url'}
                        label={'OneSearch Information'}
                        placeholder={'url'}
                        onChange={this.handleInputChange}
                        name="oneSearchUrl"
                        required
                        style={{marginBottom: "1em"}}/>
                </fieldset>
                <fieldset className={'modal_fieldset'}>
                    <legend> Image to Display (recommended dimensions about 800x530) </legend>
                    <Input
                        type={'image'}
                        label={'Login Screen Image'}
                        onChange={this.handleInputChange}
                        name="loginScreen"
                        required
                        style={{marginBottom: "1em"}}/>
                </fieldset>
                <Button  variant="contained" type="submit" color="primary"> Submit </Button>
            </form>
        )
    }

    render() {
        return this.renderSplash()
    }
}

export default SplashScreen;
