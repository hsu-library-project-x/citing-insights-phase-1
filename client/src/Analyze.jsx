// Importing Libraries
import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './css/App.css';
import './css/Analyze.css';
import Annotate from './Annotate.jsx';
import Markup from './Markup.jsx';
import RubricSubmit from './RubricSubmit.jsx';
import { Button, Input, Progress } from 'reactstrap';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';
import Rubric from './Rubric.jsx';
// Lets us use column / row and layout for our webpage using Reactstrap
import { Row, Col } from 'reactstrap';
import PdfComponent from "./PdfComponent.jsx";

import update from 'immutability-helper';

//global function for defining ID's
function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


class Analyze extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      isMarkup: true,
      uploading: false,
      successfullUpload: false,
      citations: [],
      citationData: [],
      curHighlight: "",
      assignment: {
        _id: "",
        name: "",
        note: "",
        class_id: ""
      },
      current_pdf_data: "this must get set",
      AvailableRubrics: [],
      gotSources: false,
      rubricSelected: true,
      assessingRubric: false,
      rubricId: "",
      curPaperId: "",
      sourceText: "",
      currentRubric: [],
      current_s2_data: { "influential_citation_count": 20, "citation_velocity": 20 },
      paper_ids: [],
      current_paper_id_index: 0

    }


    this.renderActions = this.renderActions.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    //this.saveIntextCitation = this.saveIntextCitation.bind(this);
    this.addAnnotation = this.addAnnotation.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.displayPaper = this.displayPaper.bind(this);
    this.renderAnnotate = this.renderAnnotate.bind(this);
    this.handleGetRubric = this.handleGetRubric.bind(this);
    this.handleRubricAssessment = this.handleRubricAssessment.bind(this);
    this.handleChildUnmount = this.handleChildUnmount.bind(this);
    this.handleSaveCitations = this.handleSaveCitations.bind(this);
    this.get_citation_info = this.get_citation_info.bind(this);
    this.get_s2_info = this.get_s2_info.bind(this);
    this.handleCitationChange = this.handleCitationChange.bind(this);
    this.next_paper = this.next_paper.bind(this);
    this.refresh = this.refresh.bind(this);
    this.get_paper_info = this.get_paper_info.bind(this);
  }


  get_paper_info(paper_id) {
    var that = this;
    fetch('http://localhost:5000/papers/' + paper_id)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        //console.log(JSON.stringify(myJson));
        //console.log(myJson);

        that.setState({ current_pdf_data: myJson["pdf"]["data"] });
        //return (myJson);
        //that.setState({AvailableAssignments: myJson});
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
          console.log(that.state);
          that.setState({
            assignment: myJson
          }, console.log(that.state));
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
          that.setState({ paper_ids: myJson })

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

              //return(myJson);
              //that.setState({AvailableAssignments: myJson});
            });
          }
        });
    } else {
      this.setState({ assignmentId: "no assignment selected" });
    }
    //get the rubrics
    //replace hardcoded number with userID from login
    fetch('http://localhost:5000/rubrics/' + this.props.user._id)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        that.setState({ AvailableRubrics: myJson });

      });
  }

  handleCitationChange(event) {
    //const target = event.target;
    //const value = target.value;
    //const name = target.name;
    //alert(name + ", " + value);
    //this.setState({
    //[name]: value
    //});


    this.get_s2_info(event.target.value);

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

  handleRubricAssessment(event) {
    this.setState({
      sourceText: event.target.innerText,
      assessingRubric: true
    });
  }

  handleChildUnmount() {
    this.setState({
      assessingRubric: false
    });
  }

  //This function will change the students paper
  displayPaper() {
    this.setState({
      gotSources: false
    });
  }

  handleDelete() {
    this.setState({
      assessingRubric: false
    });
  }

  //this saves annotations and intext citations associated with them
  handleSaveCitations() {
    let citationData = this.state.citationData;
    this.setState.uploading = true;
    const promise = [];
    promise.push(this.sendRequest(citationData));
    try {
      this.setState({ successfullUpload: true, uploading: false });
    } catch (e) {
      // Not Production ready! Do some error handling here instead...
      this.setState({ successfullUpload: true, uploading: false });
    }
  }

  sendRequest(data) {
    return new Promise((resolve, reject) => {
      //Call for each citation
      for (var citation in data) {
        if (data[citation].annotation !== "") {
          let annotation = JSON.stringify(data[citation].annotation);
          fetch('http://localhost:5000/citation/add_annotation/' + data[citation].id, {
            method: 'PUT',
            body: annotation,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          });
        }
        if (data[citation].intextCites.length !== 0) {
          let intextCitations = JSON.stringify(data[citation].intextCites);
          fetch('http://localhost:5000/citation/add_intext_citations/' + data[citation].id, {
            method: 'PUT',
            body: intextCitations,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
          });
        }
      }
    });
  }

  refresh(index) {

    //console.log(this.state.paper_ids[index]);


    if (index < this.state.paper_ids.length) {
      this.get_citation_info(this.state.paper_ids[index]["_id"]);
      this.get_paper_info(this.state.paper_ids[index]["_id"]);
    } else {

      console.log('refreshing out of range');

    }
  }



  next_paper() {

    this.refresh(1);
    //this.setState({current_paper_id_index: this.state.current_paper_id_index + 1 });

    this.setState((prevState, props) => ({
      current_paper_id_index: prevState.current_paper_id_index + 1
    }
    ), () => this.refresh(this.state.current_paper_id_index));


    console.log(this.state.current_paper_id_index);

  }

  renderAnnotate() {
    if (this.state.citationData.length !== 0) {
      return ((!this.state.isMarkup) ?
        <div class="annotate">
          <Annotate citedata={this.state.citationData} />
          <Button color="success" id="addAnnotation" onClick={this.addAnnotation}>Save Annotation</Button>
        </div> :
        <div class="markup">
          <Markup citesource={this.state.citationData} />
          <div className="Actions">
            {this.renderActions()}
          </div>
        </div>
      );
    }
  }

  //Checks to see if there is appropriate text in the intext citation textarea, renders either disabled button or save button depending on context
  renderActions() {
    return (
      <button disabled={this.state.uploading} onClick={this.saveIntextCitation}>Save Intext Citation</button>
    );
  }


  //adds annotation and pairs it with appropriate in text citation in the citationData State Array.
  addAnnotation() {
    let value = document.getElementById("inCitesForAnno").value;
    let citeIds = value.split('_');
    if (citeIds[0] === "" || citeIds[1] === "") {
      alert("please select a citation to link your annotation")
      return;
    }
    else {
      let annotation = document.getElementById("curAnno").value;
      if (annotation === "") {
        alert("Please don't submit an empty annotation");
        return;
      }
      //attach an annotation to an intext citation
      //need a way to grab the citation id, and the intext citation id to pair them appropriately
      let data = this.state.citationData;
      let box = document.getElementById("curAnno");
      //if its an annotation of the source, add that annotation to overall citaion
      //search space O(2n)
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === citeIds[1]) {
          if (citeIds[0] === "source") {
            //let currentCitation = data[i];

            //CHANGE THIS ************************************************************************************
            this.state.citationData[i].annotation = annotation;


            if (box.classList.contains("savedAnimation")) {
              document.getElementById("curAnno").classList.remove("savedAnimation");
              document.getElementById("curAnno").classList.add("savedAnimation2");
            }
            else {
              document.getElementById("curAnno").classList.add("savedAnimation");
              document.getElementById("curAnno").classList.remove("savedAnimation2");
            }
            return;
          }
          else {
            let curArray = data[i].intextCites;
            for (let j = 0; j < curArray.length; j++) {
              if (curArray[j].id === citeIds[0]) {

                //CHANGE THIS ************************************************************************************
                this.state.citationData[i].intextCites[j].annotation = annotation;

                if (box.classList.contains("savedAnimation")) {

                  document.getElementById("curAnno").classList.remove("savedAnimation");
                  document.getElementById("curAnno").classList.add("savedAnimation2");
                }
                else {
                  document.getElementById("curAnno").classList.add("savedAnimation");
                  document.getElementById("curAnno").classList.remove("savedAnimation2");
                }
                return;
              }
            }
          }
        }
      }
    }
  }




  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  toggleMarkup() {
    this.setState({
      isMarkup: !this.state.isMarkup
    })
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


    let citations = this.state.citations;
    var citationItems = <p> nothing found yet </p>


    if (citations != []) {

      var citationItems = citations.map(function (citation) {

        if (citation.author[0] != undefined) {
          return (<p id="biblio-box">{citation.author[0].family + ', ' + citation.author[0].given + ': ' + citation.title}</p>)
        }

      });

    } else {
      var citationItems = <p> nothing found yet </p>
    }



    var citationDropdownItems = <option> nothing found yet </option>
    if (citations != []) {
      var citationDropdownItems = citations.map(function (citation) {

        if (citation.author[0] != undefined) {
          return (<option value={citation._id}> {citation.author[0].family} </option>)
        }

      });
    } else {
      var citationItems = <p> nothing found yet </p>
    }
    return (

      /* Analyze Mode HTML Start */
      <div>
        <div class="DemoContents analyze-container">
          {/* One Giant container that will let us use rows / columns */}
          {/* Row: Contains rubric and student selectors */}
          <Row>
            <Col xs="3">
              <h2 className='aVnalyzeHeader'>Assignment</h2>
              <p id="assignmentInfo"> {this.state.assignment.name} </p>
            </Col>
            <Col xs="6">
              <h2 className='analyzeHeader'>Papers</h2>
              <Input type="select" id="selectedPaper" name="paper" onInput={this.displayPaper}>
                {/* These should be automatically generated with AJAX and API */}
                {/* Replace with a state that that stores based on papers gotten from associated assignment*/}
                {/* TODO:: Replace these static options with dynamic options generated from a call to the database for paper ID's*/}
                <option disabled selected hidden>Please Select a Paper</option>
                <option value="1">Paper 1</option>
                <option value="2">Paper 2</option>
                <option value="3">Paper 3</option>
                <option value="4">Paper 4</option>
                <option value="5">Paper 5</option>
              </Input>
            </Col>
            <Col xs="3">
              <h2 className='analyzeHeader' >Rubric</h2>
              <Input type="select" id="rubricAssign" name="AssignRubric" onInput={this.handleGetRubric}>
                <option value="" disabled selected hidden >Select a Rubric</option>
                {rubricList}
              </Input>
            </Col>
          </Row>
          {/* Row: Contains -- Semantic Scholor, Block Text, Sources, Biblio Box, and Progress Bar */}
          <Row>
            <Col xs="3">
              <label for="assignForAnalyze">Citations:</label>
              <Input
                onChange={this.handleCitationChange}
                onInput={this.onInput}
                id="assignForAnalyze"
                type="select"
                name="AssignNew"
                required >
                <option value="" disabled selected hidden >Select a Citation</option>
                {citationDropdownItems}
              </Input>
              <h4>Discovery Tool</h4>
              <div class="discoveryTool">
                <Card>
                  <CardBody>
                    <CardTitle>Semantic Scholar</CardTitle>
                    <CardText>Citation Velcoity: {this.state.current_s2_data["citation_velocity"]}</CardText>
                    <CardText>Influential Citations: {this.state.current_s2_data["influential_citation_count"]}</CardText>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle>Alma Primo</CardTitle>
                    <CardText>Information from Alma Primo about source goes here</CardText>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle>Google Scholar</CardTitle>
                    <CardText>Information from Google Scholar about source goes here</CardText>
                  </CardBody>
                </Card>
              </div>
            </Col>
            <Col xs="6">
              <h4> Student Paper PDF</h4>
              <div className="overflow-auto">
                {pdf}
              </div>
              <Button id='markBtn' onClick={this.toggleMarkup.bind(this)}>Switch Markup/Annotate</Button>
              {this.renderAnnotate()}
            </Col>
            <Col xs="3">
              <Rubric currentRubric={this.state.currentRubric}/>
              <textarea>
                Make an optional annotation...
              </textarea>
              <Button color="success" id="paperDone" onClick={this.handleSaveCitations}> Save Citation Grade </Button>
              <Button id="nextPaper" onClick={this.next_paper}> Next Paper </Button>
            </Col>
          </Row>
          {/*prop passing the rubric information*/}
          {this.state.assessingRubric ? <RubricSubmit sourceText={this.state.sourceText} unmountMe={this.handleChildUnmount} curRubric={this.state.currentRubric} curPaper={this.state.curPaperId} /> : null}
        </div>
      </div>
    );
  }
}

export default withRouter(Analyze);
