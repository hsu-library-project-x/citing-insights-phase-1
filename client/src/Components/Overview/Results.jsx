import React, { Component } from 'react';
import { Input, Button, Card, CardText, CardBody, CardTitle } from 'reactstrap';
import { Row, Col } from 'reactstrap';


class Results extends Component {
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

        this.handleClassSelection = this.handleClassSelection.bind(this);
        this.handleAssignmentSelection = this.handleAssignmentSelection.bind(this);
        this.showCitations = this.showCitations.bind(this);
        this.handlePaperSelection = this.handlePaperSelection.bind(this)
    }

    //On mount, makes a call to retrieve all Classes for the user
    componentWillMount() {

        let that = this;
        //Grab the user's courses
        fetch('http://localhost:5000/courses/' + this.props.user.id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                that.setState({ AvailableCourses: myJson });
            });

        //Grab the user's rubrics
        fetch('http://localhost:5000/rubrics/' + this.props.user.id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                that.setState({ rubrics: myJson })
            });
            console.log("rubrics");
            console.log(this.state.rubrics);
    }

    //Given a Class, this function makes a call to get all assignments in that class.
    handleClassSelection(event) {
        let that = this;
        let target = event.target;
        console.log(target);
        fetch('http://localhost:5000/assignments/by_class_id/' + target.value)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {

                that.setState({ AvailableAssignments: myJson });
            });
    }

    handleAssignmentSelection(event) {
        let that = this;
        let target = event.target;
        console.log(target);
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
        console.log(target.value);
        fetch('http://localhost:5000/citations/find_evaluations/' + target.value)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                that.setState({ paper_id: target.value, citations: myJson });
            });
    }

    showCitations() {


        //Query for Citations where rubric value or annotation is not null
        function getAuthors(authors) {
            return authors.map((d) =>
                d.family + ", " + d.given + "\n"
            );
        }

        function formatCitation(citation) {
            return (
                <div>
                    <Card>
                        <CardBody>
                            <CardTitle>Citation</CardTitle>
                            <CardText>
                                {getAuthors(citation.author)} ({citation.date}). {citation.title}
                            </CardText>
                            <CardText>
                                Annotation: {citation.annotation}
                            </CardText>
                            <CardText>
                                Rubric Value: {citation.rubricId}
                            </CardText>
                            <CardText>
                                Rubric Score {citation.rubricScore}
                            </CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }

        let citations = this.state.citations;

        let bigCitation;
        console.log(citations);

        if (citations !== []) {
            bigCitation = citations.map((citation) => {
                if (citation.evaluated === true) {
                    return (formatCitation(citation));
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
            <option value={course._id}>{course.name}</option>
        );

        let assignments = this.state.AvailableAssignments;
        let optionAssignments = assignments.map((assignment) =>
            <option value={assignment._id}>{assignment.name}</option>
        );

        let papers = this.state.AvailablePapers;
        let optionPapers = papers.map((paper) =>
            <option value={paper._id}>{paper.title}</option>
        );



        return (
            <div className="download-container">

                <Row>
                    <Col xs="3">
                        <label>Class:</label> {/*Investigate if it's for or form*/}
                        <Input onChange={this.handleClassSelection} id="assignForAnalyze" type="select" name="className" required >
                            <option value="" disabled selected hidden >Select a Class</option>
                            {optionItems}
                        </Input>
                        <label>Assignment:</label>  {/*Investigate if it's for or form*/}
                        <Input onChange={this.handleAssignmentSelection} id="assignForAnalyze2" type="select" name="selectedAssignmentId" required >
                            <option value="" disabled selected hidden >Select an Assignment</option>
                            {optionAssignments}
                        </Input>
                        <label>Paper:</label>  {/*Investigate if it's for or form*/}
                        <Input onChange={this.handlePaperSelection} id="assignForAnalyze3" type="select" name="selectedPaperId" required >
                            <option value="" disabled selected hidden >Select an Paper</option>
                            {optionPapers}
                        </Input>
                    </Col>
                    <Col xs="9">
                        <div>
                            <h1>Overview</h1>
                            <Button id="showEvals" onClick={() => { this.showCitations() }}>
                                Show Evaluations
                            </Button>
                        </div>
                    </Col>
                    <p1> {this.state.bigCitations}</p1>
                </Row>
            </div>
        )
    }
}

export default Results;