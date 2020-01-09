import React, { Component } from 'react';
import {Card, Button, Select, MenuItem, Container, Typography, FormControl, InputLabel} from '@material-ui/core';

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            className: '',
            selectedAssignmentId: '',
            selectedPaperId: '',
            assignmentName: '',
            AvailableCourses: [],
            AvailableAssignments: [],
            AvailablePapers: [],
            rubrics: [],
            citations: [],
            bigCitations: []
        };

        this.getCourses();
        this.getRubrics();

        this.getCourses = this.getCourses.bind(this);
        this.getRubrics = this.getRubrics.bind(this);
        this.handleClassSelection = this.handleClassSelection.bind(this);
        this.handleAssignmentSelection = this.handleAssignmentSelection.bind(this);
        this.showCitations = this.showCitations.bind(this);
        this.handlePaperSelection = this.handlePaperSelection.bind(this);
        this.formatCitation = this.formatCitation.bind(this);
        this.getAuthors = this.getAuthors.bind(this);
    }


    getCourses(){
        let that = this;
        return(
            fetch('http://localhost:5000/courses/' + this.props.user.id)
                .then(response => {
                    return response.json();
                })
                .then(myJson => {
                    that.setState({ AvailableCourses: myJson });
                })
        );
    }

    getRubrics(){
        let that = this;
        return(
            fetch('http://localhost:5000/rubrics/' + this.props.user.id)
                .then(response => {
                    return response.json();
                })
                .then(myJson => {
                    that.setState({ rubrics: myJson })
                })
        );
    }


    //Given a Class, this function makes a call to get all assignments in that class.
    handleClassSelection(event) {
        let that = this;
        let target = event.target;
        fetch('http://localhost:5000/assignments/by_class_id/' + target.value)
            .then(response =>  {
                return response.json();
            })
            .then(myJson => {
                that.setState({ AvailableAssignments: myJson });
            });
    }

    handleAssignmentSelection(event) {
        let that = this;
        let target = event.target;
        fetch('http://localhost:5000/papers/by_assignment_id/' + target.value)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                that.setState({ AvailablePapers: myJson });
            });
    }

    handlePaperSelection(event) {
        let that = this;
        let target = event.target;
        fetch('http://localhost:5000/citations/find_evaluations/' + target.value)
            .then(response => {
                console.log("!");
                return response.json();
            })
            .then(myJson => {
                console.log(myJson);

                that.setState({ paper_id: target.value, citations: myJson });
            });
    }

    getAuthors(authors) {
        return authors.map((d) =>
            d.family + ", " + d.given + "\n"
        );
    }

    formatCitation(citation) {
        return (
            <div>
                <Card>
                    <h6>Citation</h6>
                    <p>
                        {this.getAuthors(citation.author)} ({citation.date}). {citation.title}
                    </p>
                    <p>
                        Annotation: {citation.annotation}
                    </p>
                    <p>
                        Rubric Value: {citation.rubricId}
                    </p>
                    <p>
                        Rubric Score {citation.rubricScore}
                    </p>
                </Card>
            </div>
        );
    }

    showCitations() {
        //Query for Citations where rubric value or annotation is not null
        let citations = this.state.citations;
    console.log(citations);
        let bigCitation;

        if (citations !== []) {
            bigCitation = citations.map((citation) => {
                if (citation.evaluated === true) { //fetch call also checks this
                    return (this.formatCitation(citation));
                } else {
                    return ("");
                }
            });
        } else {
            return <p> No Citation Selected </p>;
        }
        this.setState({
            bigCitations: bigCitation
        });

    }

    render() {
        let courses = this.state.AvailableCourses;
        let optionItems = courses.map((course) =>
            <MenuItem value={course._id}>{course.name}</MenuItem>
        );

        let assignments = this.state.AvailableAssignments;
        let optionAssignments = assignments.map((assignment) =>
            <MenuItem value={assignment._id}>{assignment.name}</MenuItem>
        );

        let papers = this.state.AvailablePapers;
        let optionPapers = papers.map((paper) =>
            <MenuItem value={paper._id}>{paper.title}</MenuItem>
        );

        return (
            <Container maxWidth={'md'}>
                <Typography style={{ marginTop: "1em" }} align={"center"} variant={"h3"} component={"h1"} gutterBottom={true}>
                    Overview
                </Typography>

                <Typography align={"center"} variant={"subtitle1"} component={"p"} gutterBottom={true}>
                    Please select the paper you want an overview for.
                </Typography>

                <form style={{textAlign:"center", margin:"1em"}} onSubmit={this.showCitations}>
                    <FormControl required={true} style={{minWidth: 250}}>
                        <InputLabel id="selectClasslabelOverview">Select a Class</InputLabel>
                        <Select
                            style={{textAlign:"center"}}
                            labelId={"selectClasslabelOverview"}
                            onChange={this.handleClassSelection}
                            inputProps={{
                                name: 'className',
                                id: 'assignForAnalyze',
                            }}
                        >
                            <MenuItem value="" disabled >select class</MenuItem>
                            {optionItems}
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl  required={true} style={{minWidth: 250}}>
                        <InputLabel id="selectAssignmentLabelOverview">Select an Assignment</InputLabel>
                        <Select
                            style={{textAlign:"center"}}
                            onChange={this.handleAssignmentSelection}
                            inputProps={{
                                name: 'selectedAssignmentId',
                                id: 'assignForAnalyze',
                            }}
                        >
                            <MenuItem value="" disabled> select assignment</MenuItem>
                            {optionAssignments}
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl  required={true} style={{minWidth: 250, marginBottom:"1em"}}>
                        <InputLabel id="selectAssignmentLabelOverview">Select a Paper</InputLabel>
                        <Select
                            style={{textAlign:"center"}}
                            onChange={this.handlePaperSelection}
                            inputProps={{
                                name: 'selectedPaperId',
                                id: 'assignForAnalyze',
                            }}
                        >
                            <MenuItem value="" disabled> select paper </MenuItem>
                            {optionPapers}
                        </Select>
                    </FormControl>
                    <br />
                    <Button variant={"contained"} color={'primary'} type={'submit'}>
                        Show Evaluations
                    </Button>
                </form>
            </Container>
        )
    }
}

export default Overview;