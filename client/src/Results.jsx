import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';
import "./css/Download.css";

class Results extends Component {
    constructor(props) {
        super(props);
        this.state = {
            citations: {}
        }
    }

    getRubricValues() {
        var that = this;

        var answer = fetch('http://localhost:5000/citations/by_paper_id/')
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                that.setState({ citations: myJson });
            });
        return (answer);
    }

    render() {
        return (
            <div class="download-container">
                <h1>Hey</h1>
     
            </div>
        )
    }
}

export default Results;