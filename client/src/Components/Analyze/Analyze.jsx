import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import RubricAccordion from '../Rubric/RubricAccordion.jsx';
import RubricSubmit from '../Rubric/RubricSubmit.jsx';
import PdfComponent from "./PdfComponent.jsx";
import DiscoveryTool from './DiscoveryTool.jsx';
import Citation from './Citation.jsx'
import './Analyze.css';

class Analyze extends Component {
  constructor(props) {
    super(props);
    this.state = {
      citations: [],
      assignment: {
        _id: "",
        name: "",
        note: "",
        class_id: ""
      },
      current_pdf_data: "this must get set",
      AvailableRubrics: [],
      rubricSelected: true,
      assessingRubric: false,
      rubricId: "",
      curPaperId: "",
      sourceText: "",
      currentRubric: [],
      current_s2_data: { "influential_citation_count": '--', "citation_velocity": "--" },
      paper_ids: [],
      current_paper_id_index: 0,
      current_citation_id: 0
    };

    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleGetRubric = this.handleGetRubric.bind(this);
    this.handleChildUnmount = this.handleChildUnmount.bind(this);
    this.handleSaveCitations = this.handleSaveCitations.bind(this);
    this.get_citation_info = this.get_citation_info.bind(this);
    this.get_s2_info = this.get_s2_info.bind(this);
    this.next_paper = this.next_paper.bind(this);
    this.refresh = this.refresh.bind(this);
    this.get_paper_info = this.get_paper_info.bind(this);
    this.updateCitationId = this.updateCitationId.bind(this);
  }

  get_paper_info(paper_id) {
    var that = this;
    fetch('http://localhost:5000/papers/' + paper_id)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        that.setState({ current_pdf_data: myJson["pdf"]["data"] });
      });
  }

  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push({
        pathname: "/",
        props: { ...this.state }
      });
    } else {
      var that = this;
      //Grab info about the assignment
      fetch('http://localhost:5000/assignments/' + this.props.location.state.id)
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          console.log("MY STATE IS - " + that.state);
          that.setState({
            assignment: myJson
          });
        });
    }
  }

  get_citation_info(paper_id) {
    var that = this;
    var answer = fetch('http://localhost:5000/citations/by_paper_id/' + paper_id)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        that.setState({ citations: myJson });
      });
    return (answer);
  }

  get_s2_info(citation_id) {

    var that = this;
    that.setState({ current_citation_id: citation_id });
    fetch('http://localhost:5000/citations/s2/' + citation_id)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        that.setState({ current_s2_data: myJson });
      });
  }

  //Here we populate citation source information and meta data
  //Do this call every time a new Paper is loaded into the  component

  componentWillMount() {
    var that = this;
    if (this.props.location.state !== undefined) {
      this.setState({ assignmentId: this.props.location.state.id });

      fetch('http://localhost:5000/papers/by_assignment_id/' + this.props.location.state.id)
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {

          that.setState({ paper_ids: myJson });
          try {
            fetch('http://localhost:5000/papers/' + myJson[0]["_id"])
              .then(function (response) {
                return response.json();
              })
              .then(function (myJson) {
                that.setState({ current_pdf_data: myJson["pdf"]["data"] });
                that.get_citation_info(myJson["_id"])
                  .then(function (value) {
                    that.get_s2_info(that.state.citations[1]["_id"]);
                  });
              });
          } catch (e) {
            alert("No paper found for this assignment! (Please upload one)");
            that.props.history.push({
              pathname: "/",
              props: { ...that.state }
            });
          }
        });
    } else {
      this.setState({ assignmentId: "no assignment selected" });
    }
    fetch('http://localhost:5000/rubrics/' + this.props.user._id)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        that.setState({ AvailableRubrics: myJson });
      });
  }

  handleGetRubric(event) {
    const target = event.target;
    const id = target.value;
    const rubricArray = this.state.AvailableRubrics;
    for (let i = 0; i < rubricArray.length; i++) {
      if (rubricArray[i]._id === id) {
        this.setState({
          currentRubric: rubricArray[i]
        });
      }
    }
    this.setState({
      rubricSelected: false,
      rubricId: id
    }, console.log(this.state));
  }


  handleChildUnmount() {
    this.setState({
      assessingRubric: false
    });
  }


  //this saves annotations and rubric values associated with citation
  handleSaveCitations() {
    var radio_value = "";
    var radios = document.getElementsByName("radio");
    console.log(radios);

    for (var i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        radio_value = radios[i].value;
      }
    }

    console.log(radio_value);

    var annotation = document.getElementById("annotation").value;
    console.log(annotation);
    var enc = encodeURIComponent(annotation);
    console.log(enc);
    var dec = decodeURIComponent(enc);
    console.log(dec);

    console.log('http://localhost:5000/citations/save_citation_grade/' + this.state.current_citation_id + '/' + this.state.rubricId + '/' + encodeURIComponent(radio_value) + '/' + enc);

    fetch('http://localhost:5000/citations/save_citation_grade/' + this.state.current_citation_id + '/' + this.state.rubricId + '/' + encodeURIComponent(radio_value) + '/' + enc)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        alert('citation saved');
      });

    for (var i = 0; i < this.state.citations.length; i++) {

      if (this.state.citations[i]["_id"] == this.state.current_citation_id) {

        if (i < this.state.citations.length - 1) {
          this.setState({ current_citation_id: this.state.citations[i + 1]["_id"] });
        }
      }

    }
  }

  refresh(index) {
    if (index < this.state.paper_ids.length) {
      this.get_citation_info(this.state.paper_ids[index]["_id"]);
      this.get_paper_info(this.state.paper_ids[index]["_id"]);
    } else {
      return "";
    }
  }

  next_paper(direction) {
    var check = true;
    var index = this.state.current_paper_id_index;

    //check that we wont go out of range
    if (direction == -1 && index < 1) {
      check = false;
    }
    if (direction == 1 && index > this.state.paper_ids.length) {
      check = false;
    }
    check = true;
    if (check) {
      this.setState((prevState, props) => ({
        current_paper_id_index: prevState.current_paper_id_index + direction
      }
      ), () => this.refresh(this.state.current_paper_id_index));
    } else {
      console.log('refreshing out of range');
    }
  }

  updateCitationId(new_id){
    this.setState({
      current_citation_id: new_id,
    });
  }

  render() {
    var pdf;
    if (this.state.current_pdf_data === "this must get set") {
      pdf = <p> we dont have data yet </p>;
    } else {
      pdf = <PdfComponent data={this.state.current_pdf_data} />;
    }
    let rubrics = this.state.AvailableRubrics;
    let rubricList = rubrics.map((rubric) =>
      <option value={rubric._id}>{rubric.name}</option>
    );
    return (
      <div>
        <div class="DemoContents analyze-container">
          <Row>
            <Col xs="3">
              <p id="assignmentInfo">Current Assignment - {this.state.assignment.name} </p>
              {this.state.citations !== [] && this.state.current_citation_id !== 0 ? 
              <Citation 
                citations={this.state.citations}
                current_citation_id={this.state.current_citation_id}
                get_s2_info={this.get_s2_info}
                updateCitationId={this.updateCitationId}
              /> : null
               }
              {this.state.citation_id !== 0 && this.state.current_s2_data !== 0 ? 
              <DiscoveryTool 
                citations={this.state.current_citation_id}
                current_s2_data={this.state.current_s2_data}
              /> : null}
            </Col>
            <Col xs="6">
              <div className="overflow-auto">
                {pdf}
              </div>
            </Col>
            <Col xs="3">
              <Input type="select" id="rubricAssign" name="AssignRubric" onInput={this.handleGetRubric}>
                <option value="" disabled selected hidden >Select a Rubric</option>
                {rubricList}
              </Input>
              <RubricAccordion
                currentRubric={this.state.currentRubric}
                allowZeroExpanded={true}
              />
              <br />
              <textarea id="annotation">
                Make an optional annotation...
              </textarea>
              <Button color="success" id="paperDone" onClick={this.handleSaveCitations}>Save Rubric Value </Button>
              <Button id="nextPaper" onClick={() => { this.next_paper(1) }}> Next Paper </Button>
              <Button id="nextPaper" onClick={() => { this.next_paper(-1) }}> Previous Paper </Button>
            </Col>
          </Row>
          {this.state.assessingRubric ? <RubricSubmit sourceText={this.state.sourceText} unmountMe={this.handleChildUnmount} curRubric={this.state.currentRubric} curPaper={this.state.curPaperId} /> : null}
        </div>
      </div>
    );
  }
}

export default withRouter(Analyze);
