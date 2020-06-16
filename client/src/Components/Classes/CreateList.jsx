import React, { Component } from "react";
import {
    Avatar, Divider, IconButton,
    List, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, ListItemIcon,
    Tooltip, Popover, Typography, MenuItem, Select, InputLabel, FormControl, Collapse, Button

} from "@material-ui/core";
import ClassIcon from "@material-ui/icons/Class";
import DeleteIcon from "@material-ui/icons/Delete";
import ClearIcon from '@material-ui/icons/Clear';
import AssignmentIcon from "@material-ui/icons/Assignment";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import GroupWorkIcon from '@material-ui/icons/GroupWork'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

class CreateList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            anchorEl: null,
            AvailableGroups: [],
            GroupName: "",
            hoverAnchorEl: null,
            open: {
                popover: false,
                current_groups: false,
                add_group: false,
                see_members: false,
            }
        };

        // this.getGroups();

        this.nestItems = this.nestItems.bind(this);
        this.handleDeleteAssignment = this.handleDeleteAssignment.bind(this);
        this.handleDeleteCourse = this.handleDeleteCourse.bind(this);
        this.handleAlert = this.handleAlert.bind(this);
        this.tick = this.tick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
        this.handlePopoverClose = this.handlePopoverClose.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.expandClick = this.expandClick.bind(this);
    }

    expandClick(item) {
        this.setState({
            open: { [item]: !this.state.open[item] }
        });
    }

    handleClick(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    handleClose() {
        this.setState({ anchorEl: null });
    }

    tick(oldProgress) {
        this.setState({ progress: oldProgress + 1 });
    }

    handleAlert(message, severity) {
        this.props.handleQueueAlert(message, severity);
    }

    handlePopoverClose() {
        this.setState({
            hoverAnchorEl: null
        });
    }

    handlePopoverOpen(event) {
        console.log("mouse enter");
        this.setState({
            hoverAnchorEl: event.currentTarget
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleDeleteCourse(e, id) {
        if (window.confirm("Are you sure you wish to delete this course?")) {
            if (window.confirm("WARNING!! If you delete this course all assignments associated will also be deleted")) {
                fetch('api/courses/' + id, {
                    method: 'Delete',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                }).then((response) => {
                    if (response.status === 204) {
                        this.handleAlert('Course Deleted', 'success');
                    }
                    else {
                        this.handleAlert('Could not Delete Course', 'error');
                    }
                }
                );
            }
        }
    }

    handleDeleteAssignment(e, id) {
        if (window.confirm("Are you sure you wish to delete this?")) {
            fetch('api/assignments/' + id, {
                method: 'Delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                if (response.status === 204) {
                    this.handleAlert('Assignment Deleted', 'success');
                }
                else {
                    this.handleAlert('Could not Delete Assignment', 'error');
                }
            });
        }
    }

    // getGroups() {
    //     let that = this;
    //     fetch('/api/groups/').then(function (response) {
    //         return response.json();
    //     })
    //         .then(function (myJson) {
    //             that.setState({ AvailableGroups: myJson })
    //         });
    // }

    // getAssociatedMembers(memberList) {
    //     let listed = [];
    //     let listItems = [];
    //     for (let i = 0; i < memberList.length; i++) {
    //         let member = memberList[i];
    //
    //         if (listed.includes(member) === false) {
    //             listed.push(member);
    //             listItems.push(
    //                 <ListItem
    //                     key={member} /* member email */
    //                 >
    //                     <ListItemIcon>
    //                         <PersonOutlineIcon />
    //                     </ListItemIcon>
    //
    //                     <ListItemText
    //                         style={{ padding: 0, margin: 0 }}
    //                         primary={member}
    //                     />
    //                 </ListItem>
    //             );
    //         }
    //     }
    //
    //     return listItems;
    // }


    // groupMenu() {
    //     let groupList = this.state.AvailableGroups;
    //     let open = Boolean(this.state.anchorEl);
    //     let groupsOpen = this.state.open['current_groups'];
    //     let addOpen = this.state.open['add_group'];
    //     let membersOpen = this.state.open['see_members'];
    //
    //
    //     let optionGroups = groupList.map((group) => {
    //         // if this is not an added group
    //         return (
    //             <ListItem
    //                 key={group._id}
    //             >
    //                 <ListItemText
    //                     style={{ padding: 0, margin: 0 }}
    //                     primary={group.name}
    //                 />
    //                 <ListItemSecondaryAction>
    //                     <Tooltip title="Add Group" aria-label="add group">
    //                         <IconButton edge="end" aria-label="add group">
    //                             <AddIcon />
    //                         </IconButton>
    //                     </Tooltip>
    //                 </ListItemSecondaryAction>
    //             </ListItem>
    //         );
    //     });
    //
    //     let currentGroups = groupList.map((group) => {
    //         // if this IS an added group
    //         return (<ListItem key={group._id}>
    //             <ListItemText
    //                 style={{ padding: 0, margin: 0 }}
    //                 primary={group.name}
    //             />
    //             <ListItemSecondaryAction>
    //                 <Tooltip title="Remove Group" aria-label="remove group">
    //                     <IconButton edge="end" aria-label="remove group">
    //                         <ClearIcon />
    //                     </IconButton>
    //                 </Tooltip>
    //             </ListItemSecondaryAction>
    //         </ListItem>);
    //     });
    //
    //
    //     // wrong but the best I could do for now
    //     let groupMemberArrays = this.state.AvailableGroups.map(group => group.members);
    //     let toReturn = [];
    //     for (let j = 0; j < groupMemberArrays.length; j++) {
    //         let groupList = groupMemberArrays[j];
    //         for (let i = 0; i < groupList.length; i++) {
    //             toReturn.push(groupList[i]);
    //         }
    //     }
    //
    //     let members = this.getAssociatedMembers(toReturn);



    //     return (
    //         <Popover
    //             open={open}
    //             anchorEl={this.state.anchorEl}
    //             onClose={this.handleClose}
    //             anchorOrigin={{
    //                 vertical: 'top',
    //                 horizontal: 'right',
    //             }}
    //             transformOrigin={{
    //                 vertical: 'top',
    //                 horizontal: 'left',
    //             }}
    //         >
    //             <List
    //                 aria-labeledby={"group management menu"}
    //                 dense={true}
    //                 style={{ paddingLeft: "1em" }}
    //             >
    //                 <ListItem button onClick={() => this.expandClick('current_groups')}>
    //                     <ListItemIcon>
    //                         <GroupWorkIcon />
    //                     </ListItemIcon>
    //                     <ListItemText primary={"current groups"} />
    //                     {groupsOpen ? <ExpandLess /> : <ExpandMore />}
    //                 </ListItem>
    //                 <Collapse
    //                     in={groupsOpen}
    //                     timeout={'auto'}
    //                     unmountOnExit
    //                 >
    //                     <List
    //                         desnse={true}
    //                     >
    //                         {currentGroups}
    //                     </List>
    //                 </Collapse>
    //                 <ListItem button onClick={() => this.expandClick('add_group')}>
    //                     <ListItemIcon>
    //                         <AddCircleIcon />
    //                     </ListItemIcon>
    //                     <ListItemText primary={"Add group"} />
    //                     {addOpen ? <ExpandLess /> : <ExpandMore />}
    //                 </ListItem>
    //                 <Collapse
    //                     in={addOpen}
    //                     timeout={'auto'}
    //                     unmountOnExit
    //                 >
    //                     <List dense={true}>
    //                         {optionGroups}
    //                     </List>
    //                 </Collapse>
    //                 <ListItem button onClick={() => this.expandClick('see_members')}>
    //                     <ListItemIcon>
    //                         <SupervisedUserCircleIcon />
    //                     </ListItemIcon>
    //                     <ListItemText primary={"See Associated Members"} />
    //                     {membersOpen ? <ExpandLess /> : <ExpandMore />}
    //                 </ListItem>
    //                 <Collapse
    //                     in={membersOpen}
    //                     timeout={'auto'}
    //                     unmountOnExit
    //                 >
    //                     <List dense={true}>
    //                         {members}
    //                     </List>
    //                 </Collapse>
    //
    //             </List>
    //         </Popover>
    //     );
    // }

    nestItems(classes, assignments) {
        let list = classes.map(d => {
            let notes = d.course_note ? d.course_note : "";
            return (
                <List key={d._id} component={"div"}
                    disablePadding={true}
                    style={{ paddingLeft: "4em" }}
                    dense={true}
                >
                    <ListItem key={d._id} id={d._id} >
                        <ListItemAvatar>
                            <Avatar>
                                <ClassIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            style={{ padding: 0, margin: 0 }}
                            primary={d.name}
                            secondary={notes}
                        />
                        <ListItemSecondaryAction>
                            <Tooltip title="Delete Course" aria-label="delete course">
                                <IconButton edge="end" aria-label="delete" onClick={(e) => this.handleDeleteCourse(e, d._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            {/*<Tooltip title="Groups" aria-label="groups">*/}
                            {/*    <IconButton edge="end" aria-label="groups"*/}
                            {/*        onClick={this.handleClick}*/}
                            {/*    >*/}
                            {/*        <MoreVertIcon />*/}
                            {/*    </IconButton>*/}
                            {/*</Tooltip>*/}
                            {/*{this.groupMenu()}*/}
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" />
                    <List
                        component={"div"}
                        disablePadding={true}
                        style={{ paddingLeft: "4em" }}
                        dense={true}
                    >
                        {assignments.map(a => {
                            if (a.class_id === d._id) {
                                let a_notes = a.note ? a.note : "";
                                return (
                                    <div key={`divider-${a._id}`}>
                                        <ListItem id={a._id} style={{ margin: 0 }} key={a._id}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <AssignmentIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={a.name}
                                                secondary={a_notes}
                                            />
                                            <ListItemSecondaryAction>
                                                <Tooltip title="Delete Assignment" aria-label="delete assignment">
                                                    <IconButton edge="end"
                                                        aria-label="delete"
                                                        onClick={e => this.handleDeleteAssignment(e, a._id)}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                {/*<Tooltip title="Groups" aria-label="groups">*/}
                                                {/*    <IconButton edge="end" aria-label="groups"*/}
                                                {/*        onClick={this.handleClick}*/}
                                                {/*    >*/}
                                                {/*        <MoreVertIcon />*/}
                                                {/*    </IconButton>*/}
                                                {/*</Tooltip>*/}
                                                {/*{this.groupMenu()}*/}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider variant="inset" />
                                    </div>
                                );
                            } else return null;
                        })}
                    </List>
                </List>
            );
        });
        return list;

    }

    render() {
        return (
            <List dense={true} style={{ padding: 0 }} >
                {
                    this.nestItems(this.props.classList, this.props.assignmentList)
                }
            </List>
        );
    }
}

export default CreateList;