import React, { Component } from 'react';
import { Card } from '@material-ui/core';

class DiscoveryTool extends Component {
    constructor(props) {
        super(props);
        this.state = {
            citation: '',
            citations: this.props.citations,
            current_s2_data: this.props.current_s2_data,
            current_citation_id: this.props.current_citation_id,
            velocity: '',
            influenctial: ''
        };

        this.getCurrentCitation();

        this.getCurrentCitation = this.getCurrentCitation.bind(this);
        this.open_s2 = this.open_s2.bind(this);
        this.open_alma_primo = this.open_alma_primo.bind(this);
        this.open_google_scholar = this.open_google_scholar.bind(this);
    }



    getCurrentCitation() {
        // let current = {};
        // this.state.citations.forEach(c => {
        //     if (c["_id"] === this.props.current_citation_id) {
        //         current = c["id"];
        //         this.setState({
        //             citation: current
        //         });
        //     }
        // });
        
        var that = this;
        fetch(`/citations/${this.state.current_citation_id}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (JSON) {
                that.setState({
                    citation: JSON
                });
            });
    }


    open_s2() {
        // let current_citation = this.getCurrentCitation(this.state.citations);
        // if (current_citation.s2PaperUrl !== undefined) {
        //     let win = window.open(current_citation.s2PaperUrl);
        //     win.focus();
        // } else {
        //     let query = encodeURI(current_citation["author"][0]["family"] + " " + current_citation["title"][0]);
        //     let win = window.open("https://www.semanticscholar.org/search?q=" + query, '_blank');
        //     win.focus();
        // } 
        this.getCurrentCitation();
        if (this.state.citation.s2PaperUrl !== undefined) {
            let win = window.open(this.state.citation.s2PaperUrl);
            win.focus();
        } else {
            let query = encodeURI(this.state.citation["author"][0]["family"] + " " + this.state.citation["title"][0]);
            let win = window.open("https://www.semanticscholar.org/search?q=" + query, '_blank');
            win.focus();
        }
    }

    open_alma_primo() {
        let current_citation = this.getCurrentCitation(this.state.citations);
        let query = encodeURI(current_citation["title"][0]);
        let win = window.open("https://humboldt-primo.hosted.exlibrisgroup.com/primo-explore/search?query=title,begins_with," + query + ",AND&tab=everything&search_scope=EVERYTHING&sortby=title&vid=01CALS_HUL&lang=en_US&mode=advanced&offset=0&pcAvailability=true", '_blank');
        win.focus();
    }

    open_google_scholar() {
        let current_citation = this.getCurrentCitation(this.state.citations);
        let query = encodeURI(current_citation["author"][0]["family"] + " " + current_citation["title"][0]);
        let win = window.open("https://scholar.google.com/scholar?q=" + query, '_blank');
        win.focus();
    }

    render() {
        return (
            <div className="discoveryTool">
                <h4>Discovery Tool</h4>
                <Card>
                    <button onClick={this.open_s2}>
                        Semantic Scholar
                    </button>
                    <p>
                        Citation Velocity: {this.state.current_s2_data["citation_velocity"]}
                        <br />
                        Influential Citations: {this.state.current_s2_data["influential_citation_count"]}
                    </p>
                </Card>
                <Card>
                    <button onClick={this.open_alma_primo}>
                        Alma Primo
                    </button>
                    <p>Find Source through Library Discovery System</p>
                </Card>
                <Card>
                    <button onClick={this.open_google_scholar}>
                        Google Scholar
                    </button>
                    <p>Google Scholar Information</p>
                </Card>
            </div>
        );
    }
}

export default DiscoveryTool; 