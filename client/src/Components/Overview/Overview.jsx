import React, { Component } from 'react';
import {Card, Button, Select, MenuItem, Container, Typography, FormControl, InputLabel,
    Table , TableBody, TableCell, TableHead, TableContainer, TableRow} from '@material-ui/core';
import { CSVLink } from "react-csv";

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
            bigCitations: [],
            showResults: false,
            csvData: [],
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
        this.handleResultsChange = this.handleResultsChange.bind(this);
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

    handleResultsChange(event){
        event.preventDefault();
        this.setState({
            showResults: false
        });
    }

    getAuthors(authors) {
        return authors.map((d) =>
            d.family + ", " + d.given + "\n"
        );
    }

    formatCitation(citation) {
        return (
            {
                'author':  `${this.getAuthors(citation.author)} ${citation.date}. ${citation.title}`,
                'title': citation.title,
                'comments': citation.annotation,
                'rubric_title': citation.rubricTitle,
                'rubric_value' : citation.rubricScore,
            }
        );
    }

    showCitations() {
        //Query for Citations where rubric value or annotation is not null
        // let citations = this.state.citations;
        let data = [];

        if (this.state.citations !== []) {
            this.state.citations.map((citation) => {
                if (citation.evaluated === true) { //fetch call also checks this
                    data.push(this.formatCitation(citation));
                } else {
                    return ("");
                }
            });
        } else {
            return <p> No Citation Selected </p>;
        }

        this.setState({
            csvData: data,
            showResults: true
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

        let rows = this.state.csvData;

        return (
            <Container maxWidth={'md'}>
                <Typography style={{ marginTop: "1em" }} align={"center"} variant={"h3"} component={"h1"} gutterBottom={true}>
                    Overview
                </Typography>



                {this.state.showResults ?
                    <div>
                        <Typography align={"center"} variant={"subtitle1"} component={"p"} gutterBottom={true}>
                            Download PDF Comming Soon
                        </Typography>

                        <Button color={'primary'} variant={'contained'} onClick={this.handleResultsChange}>
                            Back
                        </Button>

                        <CSVLink data={this.state.csvData} filename={"overview.csv"}>
                            <Button color={'primary'} variant={'contained'} >
                                Download CSV
                            </Button>
                        </CSVLink>

                        <Button disabled={true} variant={'contained'}>
                            Download PDF
                        </Button>

                        <Table aria-label="overview table">
                            <TableHead>
                                <TableRow>
                                    <TableCell  align="left">Author(s)</TableCell>
                                    <TableCell align="left">Title</TableCell>
                                    <TableCell align="left">Comments</TableCell>
                                    <TableCell align="left">Rubric Used</TableCell>
                                    <TableCell align="left">Rubric Value</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.author}>
                                        <TableCell component={"th"} scope={"row"}>
                                            {row.author}
                                        </TableCell>
                                        <TableCell aligh={"left"}> {row.title}</TableCell>
                                        <TableCell aligh={"left"}> {row.comments}</TableCell>
                                        <TableCell aligh={"left"}> {row.rubric_title}</TableCell>
                                        <TableCell aligh={"left"}> {row.rubric_value} </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    :
                    <div>
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
                    </div>

                }

            </Container>
        )
    }
}

export default Overview;