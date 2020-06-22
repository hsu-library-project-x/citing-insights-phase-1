import React, {Component} from "react";
import {
    Avatar,
    Collapse,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Popover,
    Tooltip
} from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import GroupWorkIcon from '@material-ui/icons/GroupWork'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddIcon from '@material-ui/icons/Add';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
// import list from "less/lib/less/functions/list";
// import list from "less/lib/less/functions/list";

class GroupMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            anchorEl: null,
            hoverAnchorEl: null,
            open: {
                popover: false,
                current_groups: true,
                add_group: false,
                see_members: false,
            }};

        this.handleClick = this.handleClick.bind(this);
        this.handleAlert = this.handleAlert.bind(this);
        this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
        this.handlePopoverClose = this.handlePopoverClose.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getAssociatedMembers = this.getAssociatedMembers.bind(this);
        this.expandClick = this.expandClick.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
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
        this.setState({ anchorEl: null,
            open: {
                popover: false,
                current_groups: true,
                add_group: false,
                see_members: false,
            }});
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

        this.setState({
            hoverAnchorEl: event.currentTarget
        });
    }

    getAssociatedMembers(memberList) {
        let listed = [];
        let listItems = [];
        for (let i = 0; i < memberList.length; i++) {
            let member = memberList[i];

            if (listed.includes(member) === false) {
                listed.push(member);
                listItems.push(
                    <ListItem
                        key={member} /* member email */
                    >
                        <ListItemIcon>
                            <PersonOutlineIcon />
                        </ListItemIcon>

                        <ListItemText
                            style={{ padding: 0, margin: 0 }}
                            primary={member}
                        />
                    </ListItem>
                );
            }
        }

        return listItems;
    }

    addGroup(id, type, group){
        let body = JSON.stringify(group);

        fetch(`/api/${type}/update/${id}`, {
            method: "PUT",
            body: body,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.status === 201) {
                    this.handleAlert("Group Added", "success");
                }
                else {
                    this.handleAlert("Unable to add group.", "error");
                }
                this.handleClose();

            });

    }

    removeGroup( id, type, group){
        let body = JSON.stringify(group);

        fetch(`/api/${type}/remove/${id}`, {
            method: "PUT",
            body: body,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.status === 202) {
                    this.handleAlert("Group Removed", "success");
                }
                else {
                    this.handleAlert("Unable to remove group.", "error");
                }
                this.handleClose();

            });

    }

    groupMenu(id, type) {
        let currentGroupList =[];
        let couldAddList =[];
        let listItem =[];

        if (type === 'assignments' && this.props.assignmentList){
            this.props.assignmentList.forEach(a => {
                if (a._id === id){
                    if(a.group_ids !== undefined){
                        listItem = a.group_ids;
                    }

                }
            })
        }

        else if(type === 'courses' && this.props.classList){
            this.props.classList.forEach(c => {
                console.log(c);
                if( c._id === id){
                    if(c.group_ids !== undefined){
                        listItem = c.group_ids;
                    }
                }
            });
        }
        else{
            listItem = [];
        }

        if(this.props.availableGroups !== undefined){
            this.props.availableGroups.forEach(g => {
                if(listItem.includes(g._id) === true){
                    currentGroupList.push(g);
                }
                else{
                    couldAddList.push(g);
                }
            });
        }

        let open = Boolean(this.state.anchorEl);
        let groupsOpen = this.state.open['current_groups'];
        let addOpen = this.state.open['add_group'];
        let membersOpen = this.state.open['see_members'];


        let optionGroups = couldAddList.map((group) => {
            // if this is not an added group
            return (
                <ListItem
                    key={group._id}
                >
                    <ListItemText
                        style={{ padding: 0, margin: 0 }}
                        primary={group.name}
                    />
                    <ListItemSecondaryAction>
                        <Tooltip title="Add Group" aria-label="add group">
                            <IconButton edge="end" aria-label="add group" onClick={() => this.addGroup(id, type, group)}>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        });

        let currentGroups = currentGroupList.map((group) => {
            // if this IS an added group
            return (<ListItem key={group._id}>
                <ListItemText
                    style={{ padding: 0, margin: 0 }}
                    primary={group.name}
                />
                <ListItemSecondaryAction>
                    <Tooltip title="Remove Group" aria-label="remove group">
                        <IconButton edge="end" aria-label="remove group" onClick={()=> this.removeGroup(id,type,group)}>
                            <ClearIcon />
                        </IconButton>
                    </Tooltip>
                </ListItemSecondaryAction>
            </ListItem>);
        });


        // wrong but the best I could do for now
        let groupMemberArrays = currentGroupList.map(group => group.members);
        let toReturn = [];
        for (let j = 0; j < groupMemberArrays.length; j++) {
            let groupList = groupMemberArrays[j];
            for (let i = 0; i < groupList.length; i++) {
                toReturn.push(groupList[i]);
            }
        }

        let members = this.getAssociatedMembers(toReturn);

        return (
            <Popover
                open={open}
                anchorEl={this.state.anchorEl}
                onClose={this.handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                style={{overflow: 'auto'}}
            >
                <List
                    aria-labelledby={"group management menu"}
                    dense={true}
                    style={{ paddingLeft: "1em" }}
                >
                    <ListItem button onClick={() => this.expandClick('current_groups')}>
                        <ListItemIcon>
                            <GroupWorkIcon />
                        </ListItemIcon>
                        <ListItemText primary={"current groups"} />
                        {groupsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                        in={groupsOpen}
                        timeout={'auto'}
                        unmountOnExit
                    >
                        <List
                            desnse={true}
                        >
                            {currentGroups}
                        </List>
                    </Collapse>
                    <ListItem button onClick={() => this.expandClick('add_group')}>
                        <ListItemIcon>
                            <AddCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Add group"} />
                        {addOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                        in={addOpen}
                        timeout={'auto'}
                        unmountOnExit
                    >
                        <List dense={true}>
                            {optionGroups}
                        </List>
                    </Collapse>
                    <ListItem button onClick={() => this.expandClick('see_members')}>
                        <ListItemIcon>
                            <SupervisedUserCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={"See Associated Members"} />
                        {membersOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                        in={membersOpen}
                        timeout={'auto'}
                        unmountOnExit
                    >
                        <List dense={true}>
                            {members}
                        </List>
                    </Collapse>
                </List>
            </Popover>
        );
    }

    render(){
        return(
            <span>
            <Tooltip title="Groups" aria-label="groups">
                <IconButton edge="end" aria-label="groups"
                            onClick={this.handleClick}
                >
                    <MoreVertIcon/>
                </IconButton>
             </Tooltip>
                {this.groupMenu(this.props.id, this.props.type)}
            </span>
        );
    }
}

export default GroupMenu;