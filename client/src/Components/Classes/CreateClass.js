import React, {Component} from "react";
import {TextField, Modal, Paper, Button, Fab,  Typography} from "@material-ui/core";
import ClassIcon from '@material-ui/icons/Class';

class CreateClass extends Component {
    constructor(props) {
        super(props);
        this.state={
            open: false,
            ClassName: '',
            ClassNote: '',
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose= this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitClass = this.handleSubmitClass.bind(this);
        this.handleAlert = this.handleAlert.bind(this);
    }

    handleAlert(bool){
        this.props.classAlert('create', bool);
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open:false});
    };

    //call when input changes to update the state
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    async handleSubmitClass(event) {
        event.preventDefault();
        const data = {
            "name": this.state.ClassName,
            "note": this.state.ClassNote,
            "user_id": this.props.user_id
        };

        let newClass = JSON.stringify(data);
        fetch('/courses/', {
            method: 'POST',
            body: newClass,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (response.status === 201){
                    this.setState({
                        ClassName: "",
                        ClassNote: "",
                        open:false,
                    },()=>this.handleAlert(true));
                }
                else{
                    this.setState({open:false},()=>this.handleAlert(false));
                }
        });
    }

    render(){
        return(
                <div>
                    <Fab type="button"
                         variant="extended"
                         color={'primary'}
                         onClick={this.handleOpen}
                         size={"small"}
                         style={{float:"right", margin:"1em"}}
                    >
                        <ClassIcon />
                        Create Class
                    </Fab>
                    <Modal
                        aria-labelledby="create-class-modal"
                        aria-describedby="form-to-add-class-to-database"
                        open={this.state.open}
                        onClose={this.handleClose}
                        closeAfterTransition={true}
                        style={{marginTop:'5%', width:'50%', marginRight:'auto', marginLeft:'auto'}}
                    >
                        <Paper>
                            <Typography style={{paddingTop: "1em"}} align={"center"} variant={"h4"} component={"h2"} gutterBottom={true}> Create Class </Typography>
                            <form className={'modal_form'} onSubmit={this.handleSubmitClass}>
                                <fieldset className={'modal_fieldset'}>
                                    <legend> Class Information </legend>
                                    <TextField
                                        label={'Class Name'}
                                        onChange={this.handleInputChange}
                                        name="ClassName"
                                        // variant="filled"
                                        required
                                        style={{marginBottom: "1em"}}/>
                                        <br />
                                    <TextField
                                        label={'Notes (optional)'}
                                        onChange={this.handleInputChange}
                                        multiline
                                        rowsMax="4"
                                        name="ClassNote"
                                        style={{marginBottom: "1em"}} />
                                </fieldset>
                                <Button  variant="contained" type="submit" color="primary"> Submit </Button>
                            </form>
                        </Paper>
                    </Modal>
                </div>
        )
    }
}

export default CreateClass;