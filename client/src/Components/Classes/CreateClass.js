import React, {Component} from "react";
import {TextField, Modal, Paper, Button, Fab} from "@material-ui/core";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
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
        fetch('http://localhost:5000/courses/', {     // HAD TO CHANGE TO Localhost:5000 to make functional
            method: 'POST',
            body: newClass,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
            // self.getClasses()
                this.setState({
                    ClassName: "",
                    ClassNote: ""
                });
        });

        // this.setState({
        //     ClassName: "",
        //     ClassNote: ""
        // }, event.target.reset());

    }


    render(){
        const theme = createMuiTheme({
            palette: {
                primary: { main: '#25551b' }, // dk green
                secondary: { main: '#5C8021' } // light green
            },
        });

        return(
                <MuiThemeProvider theme={theme}>
                    <Fab type="button"
                         variant="extended"
                         color={'primary'}
                         onClick={this.handleOpen}
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
                        <Paper >
                            <h2 id={'create_class'}> Create Class </h2>
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
                                        // variant="filled"
                                        style={{marginBottom: "1em"}} />
                                </fieldset>
                                <Button  variant="contained" type="submit" color="primary"> Submit </Button>
                            </form>
                        </Paper>
                    </Modal>
                </MuiThemeProvider>
        )
    }
}

export default CreateClass;