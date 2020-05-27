import React, {Component} from "react";
import {TextField, Modal, Paper, Fab, Button, Typography, FormControl} from "@material-ui/core";
import {withRouter} from "react-router-dom";

class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            GroupName: '',
            GroupNode: '',
            Members: [],
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
      //  this.handleAlert = this.handleAlert.bind(this);
    }

    // handleAlert(message, severity){
    //     this.props.handleQueueAlert(message, severity);
    // }

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
    render() {
        return(
            <div>
                <Fab type="button"
                     variant="extended"
                     color={'primary'}
                     onClick={this.handleOpen}
                     size={"small"}
                     style={{ margin:"1em"}}
                >
                    Create Group
                </Fab>
                <Modal
                    aria-labelledby="create-group-modal"
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition = {true}
                    style={{marginTop:'5%', width:'50%', marginRight:'auto', marginLeft:'auto'}}
                >
                    <Paper>
                        <Typography style={{paddingTop: "1em"}} align={"center"} variant={"h4"}
                                    component={"h2"} gutterBottom={true}> Create Group   </Typography>
                        <form className={'modal_form'} >
                            <FormControl>
                                <TextField
                                    label={'Group Name'}
                                    onChange={this.handleInputChange}
                                    name="GroupName"
                                    required
                                    style={{marginBottom: "1em"}} />
                                <br />
                                <TextField
                                    onChange={this.handleInputChange}
                                    name="GroupNote"
                                    label={"Notes (optional)"}
                                    multiline
                                    rowsMax="4"
                                    style={{marginBottom: "1em"}} />
                                    <br />
                                <TextField
                                    label="Member Emails"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />
                                <br />
                            <Button  variant="contained" type="submit" color="primary"> Submit </Button>
                        </FormControl>
                        </form>
                    </Paper>
                </Modal>
            </div>
        );
    }
}

export default withRouter(CreateGroup);