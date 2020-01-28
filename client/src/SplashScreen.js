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
            image: null,
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.renderSplash = this.renderSplash.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.handleConfigurations=this.handleConfigurations.bind(this);
    }

    uploadImage = (event) =>{
        event.preventDefault();
        let imageObj = {};
        let imageFormObj = new FormData();
        imageFormObj.append('imageName', 'multer-image-'+Date.now());
        imageFormObj.append('imageData', event.target.files[0] )
        this.setState({ image: URL.createObjectURL(event.target.files[0])});
    };

    handleConfigurations(){
        const data={
            'primaryColor': this.state.primaryColor,
            'secondaryColor':  this.state.secondaryColor,
            'institutionName':  this.state.institutionName,
            'oneSearchUrl':  this.state.oneSearchUrl,
            'image':this.state.image,
        };

        let dataString = JSON.stringify(data);
         fetch('/configurations/', {
            method: 'POST',
            body: dataString,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },}).then(response=> {
            if (response.status === 201 || response.ok) {
                alert("Configuration Submitted!");
            } else {
                alert("Error: could not submit configuration");
            }
        }).then(() => this.props.handleConfigurationChange());
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.handleConfigurations();
    };

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
                    <TextField
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
                        type={'file'}
                        label={'Login Screen Image'}
                        onChange={this.uploadImage}
                        name="loginScreen"
                        style={{marginBottom: "1em"}} />
                        <img src={this.state.image} alt={'upload image'} />
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
