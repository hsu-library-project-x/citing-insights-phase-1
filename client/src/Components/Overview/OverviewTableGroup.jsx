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
        //                user_eval : [{
        //                      email: string, 
        //                      rubric_score: string,
        //                ]},
        //                rubric_id: string,
        //                rubric_name: string,
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
                        let paperExists = false;
                        for (let h = 0; h < this.state.assignmentList.length; h++) {
                            if (this.state.assignmentList[h].id === papers[j].papers[k].id) {
                                paperExists = true;
                                break;
                            }
                        }
                        if (!paperExists) {
                            paper.title = papers[j].papers[k].title;
                            paper.id = papers[j].papers[k]._id;
                            let assessments = [];
                            for (let t = 0; t < citations.length; t++) {
                                if (citations[t].paper_id === paper.id) {


                                    let assessment = {
                                        user_eval: [{}],
                                        rubric_id: "",
                                        rubric_title: ""
                                    };
                                    let user_eval_array = [];
                                    for (let y = 0; y < citations[t].citations.length; y++) {
                                        if (citations[t].citations[0].assessments.length > 0) {
                                            for (let r = 0; r < citations[t].citations[0].assessments.length; r++) {

                                                assessment = {
                                                    user_eval: [],
                                                    rubric_id: "",
                                                    rubric_title: ""
                                                };
                                                let user = {};
                                                let citation = citations[t].citations[0].assessments[r];

                                                if (assessments.length > 0) {
                                                    //this check is to see if assessment has been added yet
                                                    let check = false;
                                                    for (let w = 0; w < assessments.length; w++) {
                                                        check = false;
                                                        if (assessments[w].rubric_id === citation.rubric_id) {
                                                            //check to see if assessment correctly lines up with rubric
                                                            let check2 = false;

                                                            if (assessments[w].user_eval.length > 0) {
                                                                for (let f = 0; f < assessments[w].user_eval.length; f++) {
                                                                    //see if user is already in user_evals
                                                                    if (assessments[w].user_eval[f].email === citation.email) {
                                                                        // if true, user is already in
                                                                        check2 = true;
                                                                        break;
                                                                    }
                                                                }
                                                            }

                                                            //user is not in evals
                                                            if (!check2) {
                                                                user.email = citation.email;
                                                                user.rubric_score = citation.rubric_score;
                                                                console.log(user);
                                                                user_eval_array.push(user);
                                                                //toggle first check to signify user has been added
                                                                check = true;
                                                                break;
                                                            }
                                                        } else {
                                                            if (!check) {
                                                                //If we reach here, a new assessment must be created
                                                                user.email = citation.email;
                                                                user.rubric_score = citation.rubric_score;
                                                                user_eval_array.push(user);
                                                                assessment.rubric_title = citation.rubric_title;
                                                                assessment.rubric_id = citation.rubric_id;
                                                                assessment.user_eval = user_eval_array;
                                                                user_eval_array = [];
                                                                assessments.push(assessment);
                                                                assessment = {};
                                                            }
                                                        }
                                                    }
                                                }
                                                else {
                                                    //If we reach here, this is the first assessment created
                                                    user.email = citation.email;
                                                    user.rubric_score = citation.rubric_score;
                                                    user_eval_array.push(user);
                                                    assessment.rubric_title = citation.rubric_title;
                                                    assessment.rubric_id = citation.rubric_id;
                                                    assessment.user_eval = user_eval_array;
                                                    user_eval_array = [];
                                                    assessments.push(assessment);
                                                    assessment = {};
                                                }
                                            }
                                            break;
                                        }
                                    }
                                    // assessments.push(assessment);
                                    // user_eval_array = [];
                                    // assessment = {};
                                }
                            }
                            console.log(assessments);
                            paper.assessments = assessments;
                            let paperClone = JSON.parse(JSON.stringify(paper));
                            paperArray.push(paperClone);
                        }
                    }


                }
                assignment.papers = paperArray;
                assignmentList.push(assignment);
            }

            this.setState({
                assignmentList: assignmentList
            })
        }
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
                    {assignmentList.map((assignment) => (
                        <div>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        {assignment.name}
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {assignment.papers.map((paper) => (
                                    <div>
                                        <TableRow>
                                            <TableCell rowSpan={10}></TableCell>
                                            <TableCell>
                                                {paper.title}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            {paper.assessments.map((assessment) => (
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell rowSpan={5} />
                                                            <TableCell>
                                                                {assessment.rubric_title}
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {assessment.user_eval.map((user) => (
                                                            <TableRow>
                                                                <TableCell colSpan={1} />
                                                                <TableRow>
                                                                    <TableCell>
                                                                        {user.email}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        {user.rubric_score}
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            ))}
                                        </TableRow>
                                    </div>
                                ))}
                            </TableBody>
                        </div>
                    ))}
                </Table>
            </div >
        );
    }
}

export default withRouter(OverviewTableGroup);