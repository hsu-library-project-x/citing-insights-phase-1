import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
import {Button, TextField, Paper} from "@material-ui/core";

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
            primaryColor:"",
            secondaryColor:"",
            institutionName:"",
            oneSearchUrl:"",
            images: [],
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.renderSplash = this.renderSplash.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.handleConfigurations=this.handleConfigurations.bind(this);
    }

    uploadImage = (picture) => {
        console.log(picture);
        this.setState({
            images: this.state.images.concat(picture)
        });
    };

    handleConfigurations(){
        let data = new FormData();
        data.append('primaryColor', this.state.primaryColor);
        data.append('secondaryColor',  this.state.secondaryColor);
        data.append( 'institutionName',  this.state.institutionName);
        data.append('oneSearchUrl', this.state.oneSearchUrl);
        data.append('images', this.state.images[0],this.state.images[0]['name']);

        for (var value of data.values()) {
            console.log(value);
        }

        fetch('/configurations/', {
            method: 'POST',
            body: data,
            }).then(response=> {
            if (response.status === 201 || response.ok) {
                alert("Configuration Submitted!");
            } else {
                alert("Error: could not submit configuration");
            }
        }).then(() => this.props.handleConfigurationChange());
    };

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
    };

    renderSplash() {
        return(
            <Paper  elevation={3}>
                <form className={'splash_screen'} onSubmit={this.handleSubmit} >
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
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={this.uploadImage}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                            singleImage={true}
                            withPreview={true}
                        />
                    </fieldset>
                    <Button  variant="contained" type="submit" color="primary"> Submit </Button>
                </form>
            </Paper>
        )
    }


    render() {
        return this.renderSplash()
    }
}

export default SplashScreen;
