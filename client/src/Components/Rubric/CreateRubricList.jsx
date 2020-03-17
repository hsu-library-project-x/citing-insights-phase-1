import React, { Component } from 'react';
import {
    Checkbox,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemSecondaryAction,
    Toolbar,
    Tooltip,
    Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

class CreateRubricList extends Component{
    constructor(props) {
        super(props);
        this.state={
            checked: [],
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleDeleteRubric = this.handleDeleteRubric.bind(this);
        this.handleEditRubric = this.handleEditRubric.bind(this);
        this.handleAlert = this.handleAlert.bind(this);
    }

    handleAlert(message, severity){
        this.props.handleQueueAlert(message, severity);
    }

    //called when clicking on the rubric list
    handleEditRubric(event) {
        const target = event.target;
        const curId = target.id;
        let rubric = null;

        this.props.rubrics.forEach(function (r) {
            if (r._id === curId) {
                rubric = r;
            }
        });

        let rubricData = {};

        rubric.cards.forEach(c => {
            rubricData[`cardTitle-${rubric.cards.indexOf(c)}`] = c.cardTitle;
            rubricData[`cardText-${rubric.cards.indexOf(c)}`] = c.cardText;
        });

        this.props.handleEditExistingRubric(true, curId, rubric.name, rubricData.length, rubricData);
    }

    //handles deleting a rubric
    handleDeleteRubric(event) {
        let that = this;
        event.preventDefault();
        let toDelete = this.state.checked;

        for (let i = 0; i < toDelete.length; i++) {    //TODO: OPTOMIZE FOR LOOP CALLS
            fetch('/api/rubrics/' + toDelete[i], {
                method: 'Delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                if (response.status === 201 || response.ok) {
                    that.setState({
                        checked: [],
                    }, ()=>that.handleAlert('Rubric(s) Deleted', 'success'));
                }else{
                    that.handleAlert('Could not Delete Rubric(s)', 'error');
                }
            });
        }
    }

    handleToggle = value => () => {
        const currentIndex = this.state.checked.indexOf(value);
        const newChecked = [...this.state.checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        this.setState({ checked: newChecked });
    };

    GenList(){
        return <List dense={true}>
            {this.props.rubrics.map((rubric) => {
                    const labelId = `rubric-list-label-${rubric._id}`;
                    return (
                        <ListItem
                            dense={true}
                            button
                            onClick={this.handleToggle(rubric._id)}
                            key={labelId}
                        >
                            <Link style={{ textAlign: "left", color: 'blue' }}
                                  id={rubric._id}
                                  component={'button'}
                                  onClick={this.handleEditRubric}
                            >
                                {rubric.name}
                            </Link>
                            <ListItemSecondaryAction>
                                <Checkbox
                                    edge={'end'}
                                    checked={this.state.checked.indexOf(rubric._id) !== -1}
                                    tabIndex={-1}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    onClick={this.handleToggle(rubric._id)}
                                    value={"delete"}
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    );

                }
            )}
        </List>;
    }
    render() {
        return(
       <div>
           {this.state.checked.length > 0 ?
            <Toolbar>
                <Typography align={"right"} variant={"subtitle2"} component={"p"} >
                    {this.state.checked.length} selected
                </Typography>

                <Tooltip title="Delete">
                    <IconButton edge={'end'} aria-label="delete" onClick={this.handleDeleteRubric}>
                        <DeleteIcon edge={'end'} />
                    </IconButton>
                </Tooltip>
            </Toolbar> : null}
           {this.GenList()}
       </div>
        );
    }

}

export default CreateRubricList;