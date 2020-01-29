import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import './accordion.css';
class RubricAccordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            value: "",
            allowZeroExpanded: true
        }
    }
    render() {

        let rubrics = this.props.currentRubric.cards;
        let rubricList = <p> Please select a rubric </p>;

        if (rubrics !== undefined && rubrics !== []) {
            rubricList = rubrics.map(function (rubric) {
                return (
                    <div>
                        <AccordionItem>
                            <input id="radio" type="radio" name="radio" value={rubric["cardTitle"]} />
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    {rubric["cardTitle"]}                        
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <p> {rubric["cardText"]}</p>
                            </AccordionItemPanel>
                        </AccordionItem>
                    </div>
                )
            });
        }

        return (
            <Accordion
                allowZeroExpanded='true'
                allowMultipleExpanded='true'>
                {rubricList}
            </Accordion>
        );
    }
}

export default withRouter(RubricAccordion);
