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
    }

   
    GenList(){
        return <List 
                    component={"div"}
                    disablePadding={true}
                    style={{ paddingLeft: "4em" }}
                    dense={false}
                >
                {this.props.SharedRubrics.length < 1 ? 
                    <p align='center'>Currently no rubrics are being shared with you</p> 
                :   
                    this.props.SharedRubrics.map((rubric) => {
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
                    })
                } 
        </List>;

    }

    render() {
        return(
            <div>
                {this.props.SharedRubrics ? this.GenList() : <p align='center'> Currently no rubrics are being shared with you</p>}
            </div>
        ); 
    }
}

export default CreateSharedRubricList;