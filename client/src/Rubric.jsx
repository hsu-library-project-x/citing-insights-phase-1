import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import './css/accordion.css';

class Rubric extends Component {
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

        let rubricList = <p> Please select a rubric </p>

        if (rubrics !== undefined && rubrics !== []) {
            rubricList = rubrics.map(function (rubric, index) {


                console.log('printing rubrics');
                console.log(rubric["card" + index]);
                console.log(index);

                return (
                    <div>
                        <input id="radio" type="radio" name="radio" value={rubric["card" + index]["cardTitle"]} />
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    {rubric["card" + index]["cardTitle"]}                        
                                </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <p> {rubric["card" + index]["cardText"]}</p>
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

export default withRouter(Rubric);
