import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

class Rubric extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            value: ""
        }
    }

    render() {

        let rubrics = this.props.currentRubric.cards;

        let rubricList = <p> naw dude </p>

        if (rubrics !== undefined && rubrics !== []) {
            rubricList = rubrics.map(function (rubric) {

                return (
                    <div>
                        <input type="radio" name="cardName" value={"0"} />
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    {rubric.cardTitle}                        </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <p> {rubric.cardText}</p>
                            </AccordionItemPanel>
                        </AccordionItem>
                    </div>
             ) });
        }

        return (
            <Accordion>
                {rubricList}
            </Accordion>
        );
    }
}

export default withRouter(Rubric);