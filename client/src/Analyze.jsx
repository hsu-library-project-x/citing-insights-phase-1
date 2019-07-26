// Importing Libraries
import React, {Component} from 'react';
import './css/App.css';
import './css/Analyze.css';
import Annotate from './Annotate.jsx';
//maybe rename the componet
import Markup from './Markup.jsx';
import paper from "./pdf/samplepaper2.pdf";
// This lets us use Jumbotron, Badge, and Progress in HTML from Reactstrap
//    This is all we are using for now. May import more styling stuff later
import { Label, Button, Input, Progress } from 'reactstrap';
import {Card, CardText, CardBody, CardTitle} from 'reactstrap';
// Lets us use column / row and layout for our webpage using Reactstrap
import {Row, Col } from 'reactstrap';
import PdfComponent from "./PdfComponent.jsx";

//global function for defining ID's
function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

//Rubric Const, to be replaced possibly with new component
const Rubric = () => (
  <div class="rubricContainer">
    <Card>
      <CardBody>
        <CardTitle>Rubric Component</CardTitle>
        <CardText>Text about what this Rubric Component is goes here</CardText>
        <Label for="rubricValue">Score</Label>
        <Input type="select" name="select" id="rubricValue">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <CardTitle>Rubric Component</CardTitle>
        <CardText>Text about what this Rubric Component is goes here</CardText>
        <Label for="rubricValue">Score</Label>
        <Input type="select" name="select" id="rubricValue">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </CardBody>
    </Card>
    <Card>
      <CardBody>
        <CardTitle>Rubric Component</CardTitle>
        <CardText>Text about what this Rubric Component is goes here</CardText>
        <Label for="rubricValue">Score</Label>
        <Input type="select" name="select" id="rubricValue">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </CardBody>
    </Card>
  </div>
)

function Citation(id, title, metadata){
  this.id = id;
  this.title = title;
  this.metadata = metadata;
  this.intextCites = [];
}

function IntextCitation(text, annotation, id){
  this.id = id;
  this.text = text;
  this.annotation = annotation;
}

// Demo is (for now) is our Analyze page
class Analyze extends Component{
  constructor () {
    super()
    this.state = {
      isHidden: true,
      isMarkup: true,
      uploading: false,
      successfullUpload: false,
      citationData: [],
      curHighlight: "",
      assignmentId: "",
      current_pdf_data: "this must get set",
      AvailableRubrics: [],
      foundCitationsElements: [],
      gotSources: false,
      rubricSelected: true,
      rubricId: ""

    }

    this.renderActions = this.renderActions.bind(this);
    this.uploadCitations = this.uploadCitations.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.resetButton = this.resetButton.bind(this);
    this.saveIntextCitation = this.saveIntextCitation.bind(this);
    this.addAnnotation = this.addAnnotation.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.displayPaper = this.displayPaper.bind(this);
    this.renderAnnotate = this.renderAnnotate.bind(this);
    this.handleGetRubric = this.handleGetRubric.bind(this);
  }


  get_paper_info(assignment_id) {

    // this is broken right now but it should just return the JSON it retreives 
    // i had weird javascript errors but it shouldnt be too hard to get working
    // this whole block is ccopied into componentdidmount 
      var answer = "a";
      fetch('http://localhost:5000/papers/' + assignment_id)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        //console.log(JSON.stringify(myJson));
        //console.log(myJson);
        console.log('success');
        console.log(myJson);
        answer = myJson;
        console.log(answer);
        return(myJson);
        //that.setState({AvailableAssignments: myJson});
      }).then((result) => answer = result);
    console.log(answer);
    return(answer);
  }
    

  componentDidMount() {
    console.log('mounted');
    if (this.props.location.state !== undefined) {
      this.setState({assignmentId: this.props.location.state.id});
    } else {
      this.setState({assignmentId: "no assignment selected"});
    }
  }

  //Here we populate citation source information and meta data
  //Do this call every time a new Paper is loaded into the component
  componentWillMount(){
    //generate an id for each source
    var that = this;
    if (this.props.location.state != undefined) {
        this.setState({assignmentId: this.props.location.state.id});

       fetch('http://localhost:5000/papers/by_assignment_id/' + this.props.location.state.id)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
      fetch('http://localhost:5000/papers/' + myJson[0]["_id"])
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log('success');
        console.log(myJson);
        that.setState({current_pdf_data: myJson["pdf"]["data"]});
        console.log(that.state.current_pdf_data);
      });
    } else {
      this.setState({assignmentId: "no assignment selected"});
    }
    //get the rubrics
    //replace hardcoded number with userID from login
    fetch('http://localhost:5000/rubrics/5d26304f97d65677327b7e56')
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        that.setState({AvailableRubrics: myJson});
    });
  }

  handleGetRubric(event){
    const target = event.target;
    alert('fired');
    this.setState({
      rubricSelected: false
    });
  }

  handleRubricAssesment(event){

  }
  //This function will change the students paper
  displayPaper(){
    this.setState({
      gotSources: false
    });
    //TODO: need a fetch for paper using specific paper id

    //TODO: display paper in the UI

    //TODO: grab citations array from paper object /// REPLACE DUMMY CITATIONS
    
    const dummycitations = ["Citation 1", "Citation 2", "Citation 3", "Citation 4"];
    const metadata = "MetaData!"
    for(let i = 0; i < dummycitations.length; i++){
      let citeSourceId = makeid(10);
      let citeObj = new Citation(citeSourceId, dummycitations[i], metadata);
      this.state.citationData.push(citeObj);
    }
    //Grab Semantic Scholar Information for the site
  }
  //add citations to page
  renderAnnotate(){
    if(this.state.citationData.length !== 0){
      return((!this.state.isMarkup) ? 
        <div class="annotate">
          <Annotate citedata={this.state.citationData} />
          <Button color="success" id="addAnnotation" onClick={this.addAnnotation}>Save Annotation</Button>
        </div> : 
        <div class="markup">
          <Markup citesource={this.state.citationData}/>
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
  //might not need this
  resetButton(){
    this.setState({successfullUpload: false});
  } 

  //adds highlighted text and the  source to the intextcitation state array
  saveIntextCitation(){
    let citationId = document.getElementById("sourceSelect").value;
    
    let text = document.getElementById("highlightText").value;
    if(text === "" || text === "Put Highlighted Text Here!"){
      alert("please highlight an intext citation");
      return;
    }
    else{
      let data = this.state.citationData;
      //generate an id for the intext citation
      let inTextId = makeid(8);
      let inCiteObj = new IntextCitation(text, "", inTextId);
      for(let i = 0; i < data.length; i++){
        let curData = data[i];
        if(curData.id === citationId){
          this.state.citationData[i].intextCites.push(inCiteObj);
          document.getElementById("highlightText").value = "";
          document.getElementById("highlightText").classList.add("savedAnimation");
          return;
        }
      }
    }
  }

  //adds annotation and pairs it with appropriate in text citation in the citationData State Array.
  addAnnotation(){
    let value = document.getElementById("inCitesForAnno").value;
    let citeIds = value.split('_');
    if(citeIds[0] === "" || citeIds[1] === ""){
      alert("please select a citation to link your annotation")
      return;
    }
    else{
      let annotation = document.getElementById("curAnno").value;
      if(annotation === ""){
        alert("Please don't submit an empty annotation");
        return;
      }
      //attach an annotation to an intext citation
      //need a way to grab the citation id, and the intext citation id to pair them appropriately
      let data = this.state.citationData;

      //search space O(2n)
      for(let i = 0; i < data.length; i++){
        if(data[i].id === citeIds[1]){
          let curArray = data[i].intextCites;
          for(let j = 0; j < curArray.length; j++){
            if(curArray[j].id === citeIds[0]){
              this.state.citationData[i].intextCites[j].annotation = annotation;
              let box = document.getElementById("curAnno");
              if( box.classList.contains("savedAnimation")){
                document.getElementById("curAnno").classList.remove("savedAnimation");
                document.getElementById("curAnno").classList.add("savedAnimation2");
              }
              else{
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

  //Uploads state array of Citations and Annotations to the Database after compiling them into JSON format to do one Server Call
  async uploadCitations(){
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
      const req = new XMLHttpRequest();
      const formPackage = [];
      formPackage.push(data);
      const formData = new FormData();
      formData.append("Paper ID", formPackage);
      req.open("POST", "http://localhost:5000/savepaper");
      req.send(formData);
    });
  }

  toggleHidden(){
    this.setState({
      isHidden: !this.state.isHidden
    })
  }

  toggleMarkup(){
    this.setState({
      isMarkup: !this.state.isMarkup
    })
  }

  render() {
    var pdf;
    if (this.state.current_pdf_data == "this must get set") {
      pdf = <p> we dont have data yet </p>;
    } else {
      pdf = <PdfComponent data={this.state.current_pdf_data} />;
    }
    let rubrics = this.state.AvailableRubrics;
    let rubricList = rubrics.map((rubric) => 
      <option value={rubric._id}>{rubric.name}</option>
    );

    return(
      /* Analyze Mode HTML Start */
      <div class="DemoContents analyze-container">
        {/* One Giant container that will let us use rows / columns */}
        {/* Row: Contains rubric and student selectors */}
        <Row>
          <Col xs="3">
            <h2>Assignment:</h2>
            <p id="assignmentInfo"> {this.state.assignmentId} </p>
          </Col>
          <Col xs="6">
            <h2>Select a Paper</h2>
            <Input type="select" id="selectedPaper" name="paper" onInput={this.displayPaper}>
              {/* These should be automatically generated with AJAX and API */}
              {/* Replace with a state that that stores based on papers gotten from associated assignment*/}
              <option disabled selected hidden>Please Select a Paper</option>
              <option value="1">Paper 1</option>
              <option value="2">Paper 2</option>
              <option value="3">Paper 3</option>
              <option value="4">Paper 4</option>
              <option value="5">Paper 5</option>
            </Input> 
          </Col>
          <Col xs="3">
            <h2>Select a Rubric</h2>
            <Input type="select" id="rubricAssign" name="AssignRubric" onInput={this.handleGetRubric}>
              <option value="" disabled selected hidden >Select a Rubric</option>
              {rubricList}
            </Input>
          </Col>
        </Row>
        {/* Row: Contains -- Semantic Scholor, Block Text, Sources, Biblio Box, and Progress Bar */}
        <Row>
          <Col xs="3">
            <h4>Discovery Tool</h4>
            <div class="discoveryTool">
              <Card>
                <CardBody>
                  <CardTitle>Semantic Scholar</CardTitle>
                  <CardText>Information from Semantic Scholar about source goes here</CardText>
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
            <p> {this.state.current_pdf_data} </p>
            <div className="overflow-auto">
              {pdf}
            </div>
            <Button onClick={this.toggleMarkup.bind(this)}>Switch Markup/Annotate</Button>
            {this.renderAnnotate()}
          </Col>
          <Col xs="3">
            <h4>Found Citations</h4>
            <ul id="ResearchList">
              {this.state.citationData.map(citation => (
                <li id={citation.id}>{citation.title}<button onClick={this.handleRubricAssesment} disabled={this.state.rubricSelected}>Rubric</button></li>
              ))}
            </ul>
            <p id="biblio-box">Bibliography Goes Here</p>

            <div class="progressBox">
              <p>Citations Assessed: </p>
              <Progress id="citeProgress" value="30" />
              <p id="assignProgressText">Total Assessed: 0%</p>
              <Progress id="assignmentProgress" value="0" />
            </div>
            <Button color="success" id="paperDone" onClick={this.uploadCitations}> Save Paper </Button>
            <Button id="nextPaper" > Next Paper > </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Analyze;
