import React, { Component } from 'react';
import { Card } from '@material-ui/core';

class Citation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            citations: this.props.citations,
            current_citation_id: '',
            completeCitation: "",
        };

        this.getAuthors = this.getAuthors.bind(this);
        this.formatCitation = this.formatCitation.bind(this);
        this.handleCitationChange = this.handleCitationChange.bind(this);
        this.generateCitationCard = this.generateCitationCard.bind(this);
        this.generateDropDown = this.generateDropDown.bind(this);
    }

    getAuthors(authors) {
        return authors.map((d) =>
            d.family + ", " + d.given + "\n"
        );
    }

    formatCitation(citation) {
        return (
            <div>
                {this.getAuthors(citation.author)} ({citation.date}). {citation.title}
            </div>
        );
    }

    handleCitationChange(event) {
        this.props.updateCitationId(event.target.value);
    }

    generateCitationCard(citations, id) {
        let text = '';
        if (citations !== []) {
            text = citations.map(c => {
                if (c.author[0] !== undefined && c._id === id) {
                    return (this.formatCitation(c));
                } else {
                    return ("");
                }
            });
        } else {
            return "No Citation Selected";
        }

        return text;
    }

    generateDropDown(citations) {
        let drop = [];
        if (citations !== []) {
            // eslint-disable-next-line array-callback-return
            drop = citations.map(c => {
                if (c.author[0] !== undefined) {
                    return (<option value={c._id}> {c.author[0].family} </option>);
                }
            });
        } else {
            return [];
        }
        return drop;
    }



    render() {
        const cardText = this.generateCitationCard(this.state.citations, this.props.current_citation_id);
        const dropDownItems = this.generateDropDown(this.state.citations);

        return (
            <div>
                <h4 id="CitationLabel">Citation (with style): </h4>
                <select
                    value={this.state.current_citation_id}
                    onChange={this.handleCitationChange}
                >
                    <option value="" disabled selected hidden >Select a Citation</option>
                    {dropDownItems}
                </select>
                <Card>
                    <h6>Citation</h6>
                    <p> {cardText}</p>

                </Card>
            </div>
        );
    }
}

export default Citation; 