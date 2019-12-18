import React, {Component} from "react";
import {TextField, Modal, Paper, Button} from "@material-ui/core";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import "./Classes.css"

class CreateAssignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            AssignName: '',
            AssignNote: '',
            ClassId: '',
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitAssign = this.handleSubmitAssign.bind(this);

    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
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

    async handleSubmitAssign(event) {
      event.preventDefault();


      const data = {
        "name": this.state.AssignName,
        "note": this.state.AssignNote,
        "class_id": this.state.ClassId
      };

      let dataString = JSON.stringify(data);

      fetch('http://localhost:5000/assignments', {
        method: 'POST',
        body: dataString,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then(() => { // unused param response prev

          //   this.getClasses();                       TODO: replace with more relevant function
          //   this.getAssignments(data.class_id);
          // });

          this.setState({
              AssignName: "",
              AssignNote: "",
              ClassId: ""
          });
    });
    }

    render() {

        const theme = createMuiTheme({
        palette: {
            primary: { main: '#25551b' }, // dk green
            secondary: { main: '#5C8021' } // light green
        },
        });

        return(
            <MuiThemeProvider theme={theme}>
                <Button type="button" variant="contained" color={'secondary'} onClick={this.handleOpen}>
                    Create New Assignment
                </Button>
                <Modal
                    aria-labelledby="create-assignment-modal"
                    aria-describedby="add-assignment-to-class"
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition = {true}
                    style={{marginTop:'5%', width:'50%', marginRight:'auto', marginLeft:'auto'}}
                >
                    <Paper>
                        <h2 id={'create_assigment'}> Create Assignmnet  </h2>
                        <form className={'modal_form'} onSubmit={this.handleSubmitClass}>
                            <fieldset className={'modal_fieldset'}>
                                <legend> Class </legend>
                                    <label htmlFor="classAssign"> Class </label>
                                    <select style={{marginLeft:'1em'}} onChange={this.handleInputChange} id="classAssign" name="ClassId" required>
                                        <option value="" disabled selected hidden>Select a Class</option>
                                        {/*{optionItems}*/}
                                    </select>
                            </fieldset>
                            <fieldset className={'modal_fieldset'}>
                                <legend> Assignment Information </legend>
                                    <TextField
                                        label={'Assignment Name'}
                                        onChange={this.handleInputChange}
                                        name="AssignName"
                                        required
                                        style={{marginBottom: "1em"}} />
                                        <br />
                                    <TextField
                                        onChange={this.handleInputChange}
                                        name="AssignNote"
                                        label={"Notes (optional)"}
                                        multiline
                                        rowsMax="4"
                                        style={{marginBottom: "1em"}} />
                            </fieldset>
                            <Button  variant="contained" type="submit" color="primary"> Submit </Button>
                        </form>
                    </Paper>
                </Modal>
            </MuiThemeProvider>

        );
    }
}

export default CreateAssignment;