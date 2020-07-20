import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { CSVLink } from "react-csv";

const columns = [

];

class OverviewTableGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assignments: [],
            papers: []
        }

        this.getAssignments = this.getAssignments.bind(this);
        this.getPapers = this.getPapers.bind(this);
        this.fetchPapers = this.fetchPapers.bind(this);
        this.showCitations = this.showCitations.bind(this);
        this.formatCitation = this.formatCitation.bind(this);
        this.getAssignments();
    };

    componentWillUnmount() {
        this.props.ChangeOverview();
    }


    getAssignments() {
        let that = this;
        console.log(this.props);
        fetch(`/api/assignments/by_group_id/${this.props.group_id}`)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                that.setState({
                    assignments: myJson
                }, this.getPapers);
            })
    }

    async getPapers(){
        let paper = {};
        let paper_array = [];
        for(let i = 0; i < this.state.assignments.length; i++){
            paper.assignment =  this.state.assignments[i]._id;
            paper.papers =  this.fetchPapers(this.state.assignments[i]._id);
            paper_array.push(paper)
        }

        this.setState({
            papers: paper_array
        });
        
        console.log(paper_array);

    }


    async fetchPapers(id) {
        let response = await fetch(`/api/papers/by_ref_id/${id}`);
        let json = await response.json();
        
        console.log(json);
        return await json;
    }

    formatCitation(citation, assessment) {
        return (
            {

            }
        );
    }

    showCitations() {
        //Query for Citations where rubric value or annotation is not null
        let data = [];

        if (this.props.citations !== []) {
            this.props.citations.forEach((citation) => {
                if (citation.evaluated === true) { //fetch call also checks this
                    citation.assessments.forEach((assessment => {
                        data.push(this.formatCitation(citation, assessment));
                    }));

                }
            });
        }

        return data;
    }

    render() {
        let rows = {};
        return (
            <div>
                <Typography align={"center"} variant={"subtitle1"} component={"p"} gutterBottom={true}>
                    Download PDF Comming Soon
                </Typography>

                <Button color={'primary'}
                    variant={'contained'}
                    onClick={() => this.props.history.push('/tasks/overview')}>
                    Back to Overview Selection
                </Button>


                <Button disabled={true} variant={'contained'}>
                    Download PDF
                </Button>

                <Table aria-label="overview table">
                    <TableHead>
                    </TableHead>
                    <TableBody>
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default withRouter(OverviewTableGroup);