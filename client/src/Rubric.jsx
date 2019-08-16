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
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                benchmark 1
                        </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p> Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Labore, earum suscipit,
                                eveniet, ipsa soluta ex fugit molestiae
                                beatae eius pariatur eos nam. Repudiandae
                                reprehenderit dolor placeat praesentium
                            temporibus eius iusto?</p>
                        </AccordionItemPanel>
                    </AccordionItem>
                )
            });
        }

        return (
            <Accordion>
                {rubricList}
            </Accordion>
        );
    }
}

export default withRouter(Rubric);