import React, {Component} from "react";
import {TextField, Modal, Paper, Fab, Button, Typography, Select, MenuItem, InputLabel, FormControl} from "@material-ui/core";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import AssignmentIcon from '@material-ui/icons/Assignment';


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
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange(){
        this.props.getAssignments();
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

    handleSubmitAssign(event) {

      const data = {
        "name": this.state.AssignName,
        "note": this.state.AssignNote,
        "class_id": this.state.ClassId
      };

      let dataString = JSON.stringify(data);

      fetch(`http://localhost:5000/assignments/${this.props.user_id}`, {
        method: 'POST',
        body: dataString,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => {
          if (response.status === 201) {
              alert("New Assignment Created!");
              this.setState({
                  AssignName: "",
                  AssignNote: "",
                  ClassId: "",
                  open: false,
              });
          } else {
              alert("Error: could not create assignment");
              this.setState({open: false});
          }
      }).then(() => this.handleChange());
    }

    render() {

        const theme = createMuiTheme({
        palette: {
            primary: { main: '#25551b' }, // dk green
            secondary: { main: '#5C8021' } // light green
        },
        });

        let classes = this.props.classList.map(d => {
            return (
                <MenuItem value={d._id} key={d._id + d.name}>
                    {d.name}
                </MenuItem>
            );

        });

        return(
            <MuiThemeProvider theme={theme}>
                <Fab type="button"
                     variant="extended"
                     color={'primary'}
                     onClick={this.handleOpen}
                     size={"small"}
                     style={{float:"right", margin:"1em"}}

                >
                    <AssignmentIcon />
                    Create Assignment
                </Fab>
                <Modal
                    aria-labelledby="create-assignment-modal"
                    aria-describedby="add-assignment-to-class"
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition = {true}
                    style={{marginTop:'5%', width:'50%', marginRight:'auto', marginLeft:'auto'}}
                >
                    <Paper>
                        <Typography style={{paddingTop: "1em"}} align={"center"} variant={"h4"} component={"h2"} gutterBottom={true}> Create Assignment   </Typography>
                        <form className={'modal_form'} onSubmit={this.handleSubmitAssign}>
                            <FormControl style={{minWidth:180}}>
                                <InputLabel id="classAssign-label">Select a Class</InputLabel>
                                    <Select
                                        required
                                        labelId={"classAssign-label"}
                                        id="ClassId"
                                        name="ClassId"
                                        onChange={this.handleInputChange}
                                        value={this.state.ClassId}
                                    >
                                        <MenuItem value={""} disabled> Select a Class</MenuItem>
                                        {classes}
                                    </Select>
                            </FormControl>
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