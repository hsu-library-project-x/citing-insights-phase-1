import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography, Radio,FormControlLabel
}  from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

class RubricAccordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            value: "",
        };

        this.createExpansion = this.createExpansion.bind(this);
    }

    createExpansion(){
        let that = this;
        const handleChange = panel => (event, isExpanded) => {
            let test = isExpanded ? panel : false;
            this.setState({expanded: test});
        };

        let rubrics = this.props.currentRubric.cards;
        let rubricList = <p> Please select a rubric </p>;

        if (rubrics !== undefined && rubrics !== []) {
            rubricList = rubrics.map(function (rubric) {
                let rId = rubric['cardTitle'];
                return (
                    <ExpansionPanel expanded={that.state.expanded === rId} onChange={handleChange(rId)} key={rId}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={rubric["cardText"]}
                            id={rId}
                        >
                            <FormControlLabel
                                aria-label={'Select'}
                                value={rubric["cardTitle"]}
                                onClick={event => event.stopPropagation()}
                                onFocus={event => event.stopPropagation()}
                                control={<Radio />}
                                label={rId}
                            />
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography >{rubric["cardText"]}</Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            });
        }

        return rubricList;
    }


    render() {
        return (
            <div> {this.createExpansion()}</div>

        );
    }
}

export default withRouter(RubricAccordion);
