import React, { Component } from 'react';
import { Label, Input, Button} from 'reactstrap';
import { Row, Col } from 'reactstrap';
import "./css/Download.css";

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
            citations: [],
            bigCitation: <p></p>
        }

        this.handleClassSelection = this.handleClassSelection.bind(this);
        this.handleAssignmentSelection = this.handleAssignmentSelection.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getCitations = this.getCitations.bind(this);
        this.getRubricValues = this.getRubricValues.bind(this);
        this.handlePaperSelection = this.handlePaperSelection.bind(this)
    }

    //On mount, makes a call to retrieve all Classes for the user
    componentWillMount() {

        var that = this;

        fetch('http://localhost:5000/courses/' + this.props.user.id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                that.setState({ AvailableCourses: myJson });
            });
    }

    //Given a Class, this function makes a call to get all assignments in that class.
    handleClassSelection(event) {
        var that = this;
        var target = event.target;
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
        var that = this;
        var target = event.target;
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
        var that = this;
        var target = event.target;
        console.log(target.value);
        fetch('http://localhost:5000/citations/find_evaluations/' + target.value)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                that.setState({ paper_id: target.value, citations: myJson });
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        //alert(name + ", " + value);
        this.setState({
            [name]: value
        }, console.log(this.state)
        );

    }

    getCitations(paper_id) {

        var that = this;

        var answer = fetch('http://localhost:5000/citations/find_evaluations/' + this.state.paper_id)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                that.setState({ citations: myJson });
            });
        return (answer);
    }

    getRubricValues() {
        var that = this;

        var answer = fetch('http://localhost:5000/citations/by_paper_id/' + this.state.selectedPaperId)
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                that.setState({ citations: myJson });
            });
        return (answer);
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

        //Query for Citations where rubric value or annotation is not null
        function getAuthors(authors) {
            return authors.map((d) =>
                d.family + ", " + d.given + "\n"
            );
        }

        function formatCitation(citation) {
            return (<div>
                {getAuthors(citation.author)} ({citation.date}). {citation.title}
            </div>
            );
        }

        let citations = this.state.citations;
        let bigCitation = <p> No citation selected </p>;
        console.log(citations);

        if (citations !== []) {
            bigCitation = citations.map((citation) => {
                if (citation.evaluated === true) {
                    return (formatCitation(citation));
                } else {
                    return("");
                }
            });
        } else {
            let lastOption = <p> No Citation Selected </p>;
        }

        return (
            <div class="download-container">

                <Row>
                    <Col xs="3">
                        <label for="assignForAnalyze">Class:</label>
                        <Input onChange={this.handleClassSelection} id="assignForAnalyze" type="select" name="className" required >
                            <option value="" disabled selected hidden >Select a Class</option>
                            {optionItems}
                        </Input>
                        <label for="assignForAnalyze">Assignment:</label>
                        <Input onChange={this.handleAssignmentSelection} id="assignForAnalyze" type="select" name="selectedAssignmentId" required >
                            <option value="" disabled selected hidden >Select an Assignment</option>
                            {optionAssignments}
                        </Input>
                        <label for="assignForAnalyze">Paper:</label>
                        <Input onChange={this.handlePaperSelection} id="assignForAnalyze" type="select" name="selectedPaperId" required >
                            <option value="" disabled selected hidden >Select an Paper</option>
                            {optionPapers}
                        </Input>
                    </Col>
                    <Col xs="9">
                        <div>
                            <h1>Overview</h1>
                            <Button id="findEvals" onClick={this.getCitations}>
                                Find evaluations
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Results;