import React, {Component} from "react";
import {
    TextField,
    Modal,
    Paper,
    List,
    ListItem,
    Button,
    Typography,
    FormControl,
    Tooltip,
    IconButton,
    ListItemSecondaryAction, ListItemAvatar, Avatar, ListItemText
} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from "@material-ui/icons/Delete";

;


class EditGroup extends Component {
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

    render(){
        return(
            <span>
                <Tooltip title="Edit Group" aria-label="edit group">
                    <IconButton edge="end"
                                aria-label="edit"
                                onClick={this.handleOpen}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Modal
                    aria-labelledby="edit-group-modal"
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition = {true}
                    style={{marginTop:'5%', width:'50%', marginRight:'auto', marginLeft:'auto'}}
                >
                    <Paper>
                        <Typography style={{paddingTop: "1em"}} align={"center"} variant={"h4"}
                                    component={"h2"} gutterBottom={true}> Edit Group   </Typography>
                        <form className={'modal_form'} >
                            <FormControl>
                                <TextField
                                    label={'Group Name'}
                                    onChange={this.handleInputChange}
                                    name="GroupName"
                                    value={"Current Groupname"} //change eventually
                                    required
                                    style={{marginBottom: "1em"}} />
                                <br />
                                <TextField
                                    onChange={this.handleInputChange}
                                    name="GroupNotes"
                                    label={"Current Notes"}
                                    multiline
                                    rowsMax="4"
                                    style={{marginBottom: "1em"}} />
                                <br />
                                <List>
                                    <ListItem>
                                          <ListItemAvatar>
                                            <Avatar>
                                                <AccountCircleIcon />
                                            </Avatar>
                                          </ListItemAvatar>
                                        <ListItemText
                                            primary={'Group Member 1'}
                                            // secondary={'group 1 notes'}
                                        />
                                          <ListItemSecondaryAction>
                                               <Tooltip title="Remove Member" aria-label="remove member">
                                                     <IconButton edge="end"
                                                        aria-label="remove"
                                                        // onClick={e => this.handleDeleteGroup(e)}
                                                    >
                                                         <DeleteIcon />
                                                    </IconButton>
                                                 </Tooltip>
                                          </ListItemSecondaryAction>
                                    </ListItem>
                                    <ListItem>
                                         <ListItemAvatar>
                                            <Avatar>
                                                <AccountCircleIcon />
                                            </Avatar>
                                          </ListItemAvatar>
                                           <ListItemText
                                               primary={'Group Member 2'}
                                               // secondary={'group 1 notes'}
                                           />
                                          <ListItemSecondaryAction>
                                                    <Tooltip title="Remove Member" aria-label="remove member">
                                                     <IconButton edge="end"
                                                                 aria-label="remove"
                                                         // onClick={e => this.handleDeleteGroup(e)}
                                                     >
                                                         <DeleteIcon />
                                                    </IconButton>
                                                 </Tooltip>
                                          </ListItemSecondaryAction>
                                        </ListItem>
                                </List>
                                <TextField
                                    label="Add Member (by Emails)"
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
            </span>
        );
    }
}
export default (EditGroup);
