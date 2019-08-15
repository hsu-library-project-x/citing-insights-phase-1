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
            rubricList = rubrics.map(function (rubric, index) {

              console.log('printing rubrics');
              console.log(rubric[ "card" + index  ]);
              console.log(index);

                return (
                    <div>
                        <input type="radio" name="cardName" value={rubric["card" + index]["cardTitle"]} />
                        <AccordionItem>
                            <AccordionItemHeading>
                                <AccordionItemButton>
                                    {rubric["card" + index]["cardTitle"]}                        </AccordionItemButton>
                            </AccordionItemHeading>
                            <AccordionItemPanel>
                                <p> {rubric["card" + index]["cardText"]}</p>
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
