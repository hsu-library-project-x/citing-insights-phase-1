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


import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ClearIcon from '@material-ui/icons/Clear';
import AddAlertIcon from "@material-ui/icons/AddAlert";
import CheckIcon from '@material-ui/icons/Check';


class JoinRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            pending: [],
            Members: [],
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };


    render(){
        return(
            <span>
                 <Tooltip title="Join Requests" aria-label="requests to join group">
                        <IconButton edge="end"
                                    aria-label="notification"
                                    onClick={this.handleOpen}
                        >
                            <AddAlertIcon />
                        </IconButton>
                 </Tooltip>
                <Modal
                    aria-labelledby="join-group-modal"
                    open={this.state.open}
                    onClose={this.handleClose}
                    closeAfterTransition = {true}
                    style={{marginTop:'5%', width:'50%', marginRight:'auto', marginLeft:'auto'}}
                >
                    <Paper>
                        <Typography style={{paddingTop: "1em"}} align={"center"} variant={"h4"}
                                    component={"h2"} gutterBottom={true}> Join Requests   </Typography>
                        <form className={'modal_form'} >

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
                                               <Tooltip title="Add Member" aria-label="add member">
                                                     <IconButton edge="end"
                                                                 aria-label="add"
                                                         // onClick={e => this.handleDeleteGroup(e)}
                                                     >
                                                         <CheckIcon />
                                                    </IconButton>
                                                 </Tooltip>
                                               <Tooltip title="Reject Member" aria-label="reject member">
                                                     <IconButton edge="end"
                                                                 aria-label="reject"
                                                         // onClick={e => this.handleDeleteGroup(e)}
                                                     >
                                                         <ClearIcon />
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
                                                  <Tooltip title="Add Member" aria-label="add member">
                                                     <IconButton edge="end"
                                                                 aria-label="add"
                                                         // onClick={e => this.handleDeleteGroup(e)}
                                                     >
                                                         <CheckIcon />
                                                    </IconButton>
                                                 </Tooltip>
                                                    <Tooltip title="Remove Member" aria-label="remove member">
                                                     <IconButton edge="end"
                                                                 aria-label="remove"
                                                         // onClick={e => this.handleDeleteGroup(e)}
                                                     >
                                                         <ClearIcon />
                                                    </IconButton>
                                                 </Tooltip>
                                          </ListItemSecondaryAction>
                                        </ListItem>
                                </List>
                            <FormControl>
                                <Button  variant="contained" type="submit" color="primary" onClick={this.handleClose}> Ok </Button>
                            </FormControl>
                        </form>
                    </Paper>
                </Modal>
            </span>
        );
    }
}
export default (JoinRequests);