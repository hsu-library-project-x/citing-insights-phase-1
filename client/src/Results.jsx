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
    
    //Given a Class, this function makes a call to get all assignments in that class.
    handleClassSelection(event) {
        var that = this;
        var target = event.target;
        fetch('http://localhost:5000/assignments/by_class_id/' + target.value)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {

                that.setState({ AvailableAssignments: myJson });
            });
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