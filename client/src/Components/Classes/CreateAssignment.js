import React, {Component} from "react";
import {TextField, Modal, Paper, Fab, Button, Typography, Select,
    MenuItem, InputLabel, FormControl} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import AssignmentIcon from '@material-ui/icons/Assignment';

class CreateAssignment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            AssignName: '',
            AssignNote: '',
            ClassId: '',
            createClassAlert:null,
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitAssign = this.handleSubmitAssign.bind(this);
        this.handleAlert = this.handleAlert.bind(this);
    }

    handleAlert(subject, bool){
        if (subject === 'class') {
            this.props.classAlert('create', bool);
        }
        if(subject === 'assignment'){
            this.props.assignmentAlert('create', bool);
        }
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

      event.preventDefault();

      const data = {
        "name": this.state.AssignName,
        "note": this.state.AssignNote,
        "class_id": this.state.ClassId
      };

      let dataString = JSON.stringify(data);

      fetch(`/assignments/${this.props.user_id}`, {
        method: 'POST',
        body: dataString,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }).then((response) => {
          if (response.status === 201 || response.ok) {
              this.setState({
                  open: false,
              });
              this.handleAlert('class', true);
          } else {
              this.setState({
                  open: false,
              });
              this.handleAlert('class', false);
          }
      });
    }

    render() {
        let classes = this.props.classList.map(d => {
            return (
                <MenuItem value={d._id} key={d._id + d.name}>
                    {d.name}
                </MenuItem>
            );

        });

        return(
           <div>
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
           </div>
        );
    }
}

export default withRouter(CreateAssignment);