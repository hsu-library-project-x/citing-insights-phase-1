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
            group: {},
            assignments: [],
            papers: [],
            citations: [],
            assignmentList: []
        }

        this.getGroup = this.getGroup.bind(this);
        this.getAssignments = this.getAssignments.bind(this);
        this.getPapers = this.getPapers.bind(this);
        this.fetchPapers = this.fetchPapers.bind(this);
        this.getCitations = this.getCitations.bind(this);
        this.fetchCitations = this.fetchCitations.bind(this);
        this.buildAssignmentObjects = this.buildAssignmentObjects.bind(this);

        this.showCitations = this.showCitations.bind(this);
        this.formatCitation = this.formatCitation.bind(this);
    };

    componentDidMount() {
        this.getGroup();
        this.getAssignments();
    }

    componentWillUnmount() {
        this.props.ChangeOverview();
    }

    getGroup() {
        let that = this;
        let id = this.props.group_id;
        fetch('/api/groups/' + id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                that.setState({
                    group: myJson
                });
            });
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

    async getPapers() {
        let paper = {};
        let paper_array = [];
        let paper_response;
        for (let i = 0; i < this.state.assignments.length; i++) {
            paper.assignmentId = await this.state.assignments[i]._id;
            paper.assignmentName = await this.state.assignments[i].name;
            paper_response = await this.fetchPapers(this.state.assignments[i]._id)

            if (paper_response.length > 0) {
                paper.papers = paper_response;
            }

            paper_array.push(paper);
        }

        this.setState({
            papers: paper_array
        }, this.getCitations);

    }


    async fetchPapers(id) {
        let response = await fetch(`/api/papers/by_ref_id/${id}`).then(r => r.json());
        return await response;
    }

    async getCitations() {
        let citation_array = [];
        for (let i = 0; i < this.state.papers.length; i++) {
            let citation = {};
            let citation_response = {};
            for (let j = 0; j < this.state.papers[i].papers.length; j++) {
                citation.paper_id = this.state.papers[i].papers[j]._id;
                citation_response = await this.fetchCitations(this.state.papers[i].papers[j]._id);
                if (citation_response.length > 0) {
                    citation.citations = citation_response;
                    let citationClone = JSON.parse(JSON.stringify(citation));
                    citation_array.push(citationClone);
                }

            }
        }

        this.setState({
            citations: citation_array
        });

        this.buildAssignmentObjects();


    }

    async fetchCitations(id) {
        let response = await fetch(`/api/citations/by_paper_id/${id}`).then(r => r.json());
        return await response;
    }


    buildAssignmentObjects() {
        // Want object to look like: 
        //  Assignment: { 
        //       id : string,
        //       name: string, 
        //       papers: [{
        //           title: string,
        //           id: string,
        //           assessments: [{
        //                email: string, 
        //                score: string
        //           }]
        //       }] 
        //  }

        let assignments = this.state.assignments;
        let papers = this.state.papers;
        let citations = this.state.citations;

        let assignmentList = [];

        for (let i = 0; i < assignments.length; i++) {
            let assignment = {};
            assignment.id = assignments[i]._id;
            assignment.name = assignments[i].name;

            let paperArray = [];

            for (let j = 0; j < papers.length; j++) {
                if (papers[j].assignmentId === assignment.id) {
                    let paper = {};
                    for (let k = 0; k < papers[j].papers.length; k++) {
                        paper.title = papers[j].papers[k].title;
                        paper.id = papers[j].papers[k]._id;
                        let assessments = [];
                        for (let t = 0; t < citations.length; t++) {
                            if (citations[t].paper_id === paper.id) {
                                for (let y = 0; y < citations[t].citations.length; y++) {
                                    let assessment = {};
                                    if (citations[t].citations[y].assessments.length > 0) {
                                        assessment.email = citations[t].citations[0].assessments[0].email;
                                        assessment.score = citations[t].citations[0].assessments[0].rubric_score;
                                        assessments.push(assessment);
                                    }
                                }
                            }
                        }
                        paper.assessments = assessments;
                        let paperClone = JSON.parse(JSON.stringify(paper));
                        paperArray.push(paperClone);
                    }
                }

                assignment.papers = paperArray;
                assignmentList.push(assignment);

            }
        }

        this.setState({
            assignmentList: assignmentList
        })
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
        let assignmentList = this.state.assignmentList;

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
                    {/* {assignmentList.map(() => ( */}
                        <div>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        {/*Assignment name */}
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                <div>
                                    <TableRow>
                                        <TableCell rowSpan={1}></TableCell>
                                        <TableCell colSpan={3}>
                                            {/* Paper title */}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell rowSpan={3} />
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        {/* Member emails*/}
                                                    </TableCell>
                                                    </TableRow>
                                                <TableRow>
                                                    <TableCell>
                                                        {/* Rubric scores */}
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                        </Table>
                                    </TableRow>
                                </div>
                            </TableBody>
                        </div>
                </Table>
            </div>
        );
    }
}

export default withRouter(OverviewTableGroup);