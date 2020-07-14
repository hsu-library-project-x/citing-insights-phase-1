import React, { Component } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    ListItemAvatar,
    Avatar,
} from "@material-ui/core";
import BallotRoundedIcon from '@material-ui/icons/BallotRounded';

class CreateSharedRubricList extends Component{
    constructor(props) {
        super(props);

        // this.handleDeleteRubric = this.handleDeleteRubric.bind(this);
        // this.handleEditRubric = this.handleEditRubric.bind(this);
        // this.handleAlert = this.handleAlert.bind(this);

    }

    // handleAlert(message, severity){
    //     this.props.handleQueueAlert(message, severity);
    // }

    //called when clicking on the rubric list

    //IF PROPOSAL WORKS NOT NEEDED
    // handleEditRubric(event, curId) {
    //     event.preventDefault(); 
 
    //     let rubric = null;
    //     this.props.rubrics.forEach(function (r) {
    //         if (r._id === curId) {
    //             rubric = r;
    //         }
    //     });

    //     let rubricData = {};

    //     rubric.cards.forEach(c => {
    //         rubricData[`cardTitle-${rubric.cards.indexOf(c)}`] = c.cardTitle;
    //         rubricData[`cardText-${rubric.cards.indexOf(c)}`] = c.cardText;
    //     });

    //     this.props.handleEditExistingRubric(true, curId, rubric.name, rubricData.length, rubricData);
    // }

    //handles deleting a rubric

    //IF PROPOSAL WORKS NOT NEEDED 
    // handleDeleteRubric(toDelete) {
    //     let that = this;

    //     fetch('/api/rubrics/' + toDelete, {
    //         method: 'Delete',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //     }).then(response => {
    //         if (response.status === 201 || response.ok) {
    //             that.setState({
    //                 checked: [],
    //             }, ()=>that.handleAlert('Rubric Deleted', 'success'));
    //         }else{
    //             that.handleAlert('Could not Delete Rubric', 'error');
    //         }
    //     });
    
    // }



    GenList(){
        return  <List 
                    component={"div"}
                    disablePadding={true}
                    style={{ paddingLeft: "4em" }}
                    dense={false}
                >
                 {this.props.SharedRubrics.map((rubric) => {
                     if(rubric.user_id !== this.props.user_id){
                        const labelId = `rubric-list-label-${rubric._id}`;
                        return (
                            <ListItem
                                key={labelId}
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <BallotRoundedIcon />
                                    </Avatar>
                                </ListItemAvatar>
                           
                                <ListItemText
                                     primary={rubric.name}
                                />
                            </ListItem>
                         ); 
                     }
                 } 
         )} 
        </List>
    }

    render() {

        console.log(this.props.SharedRubrics);
        return(
       <div>
           {this.GenList()}
       </div>
        );
    }

}

export default CreateSharedRubricList;