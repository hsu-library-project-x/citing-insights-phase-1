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
import { Label, ListGroup, ListGroupItem, Button, Input, Progress } from 'reactstrap';
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

//Function to dynamically call source material
function displaySource(props){
  //Dynamically get id
  var source = props.target.id;

  if(source === "sourceJumbo"){
    //code to make research text collapseable here 

    // Get Id of element above Jumbotron
    //run code in lower if stmt
    return;
  }
  // Put text in ListItem
  var ListItemTextbox = document.getElementById(source);

  var bibBox = document.getElementById("biblio-box");

  if(ListItemTextbox.classList.contains("selectedResearch")){
    //reset here --- Replace with Original Text of Citation
    ListItemTextbox.innerHTML = "Reset Text";
    ListItemTextbox.classList.remove("selectedResearch");
    bibBox.innerHTML = "Please Select A Source";
  }
  else{

    ListItemTextbox.classList.add("selectedResearch");
    var SourceText = "This is where the Research Text will populate and show up!";

    var currentText = ListItemTextbox.innerHTML;
    //from here populate the bibliography box with more information
    bibBox.innerHTML = currentText + " Additional Information of the Citation";
    //append inner HTML of List Item Text Box
    //eventually this veggie ipsum will be replaced by a variable
    ListItemTextbox.innerHTML = currentText + "<br/> <hr><Jumbotron id='sourceJumbo'>" + SourceText + "</Jumbotron>" ;
  }	
}

//This function will change the students paper
function displayPaper(props){
  //var paper = document.getElementById("student");
  //var selectedStudent = document.getElementById("selectedStudent");
  //put dynamic call here
}

//Test function to be removed
/*function testProgress(props){
  //get id
  var bar = document.getElementById("assignmentProgress").getElementsByClassName("progress-bar");
  // Change the value in the progress bar --- 
  //Eventually will change to be dynamically generated
  let nodeVal = "40";
  bar[0].attributes[2].nodeValue = nodeVal;
  bar[0].attributes["style"].nodeValue = ("width: " + nodeVal + "%");
  var text = document.getElementById("assignProgressText");
  text.innerHTML = ("Total Assessed: " + nodeVal + "%");
}*/


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
      current_pdf_data: "this must get set"
    }

    this.renderActions = this.renderActions.bind(this);
    this.uploadCitations = this.uploadCitations.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.resetButton = this.resetButton.bind(this);
    this.saveIntextCitation = this.saveIntextCitation.bind(this);
    this.addAnnotation = this.addAnnotation.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }


  get_paper_info(assignment_id) {

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


  //Here we populate citation source information and meta data
  //Do this call every time a new Paper is loaded into the component
  componentWillMount(){
    //Do call to get sources.. after sources aquired populate them into the on-client data, should have an array of them
    //dummy data
    let sources = ["Test Source 1", "Test Source 2", "Test Source 3", "Test Source 4"];
    let metadata = "This is where the sources metadata goes";
    //generate an id for each source
    for(let i = 0; i < sources.length; i++){
      let citeSourceId = makeid(10);
      let citeObj = new Citation(citeSourceId, sources[i], metadata);
      this.state.citationData.push(citeObj);
    }

    console.log('mounted');

    var that = this;
    if (this.props.location.state != undefined) {
        this.setState({assignmentId: this.props.location.state.id});

       fetch('http://localhost:5000/papers/by_assignment_id/' + this.props.location.state.id)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        //console.log(JSON.stringify(myJson));
        //console.log(myJson);
        //console.log('success');
        //console.log(myJson[0]["_id"]);

      fetch('http://localhost:5000/papers/' + myJson[0]["_id"])
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        //console.log(JSON.stringify(myJson));
        //console.log(myJson);
        console.log('success');
        console.log(myJson);
        that.setState({current_pdf_data: myJson["pdf"]["data"]});
        console.log(that.state.current_pdf_data);
        //return(myJson);
        //that.setState({AvailableAssignments: myJson});
      });

        //var new_json = that.get_paper_info(myJson[0]["_id"]);
        //console.log('new');
        //console.log(new_json);
        //that.setState({current_pdf_data: new_json["pdf"]["data"]});

        //console.log('setting state');
        //console.log(that.state.current_pdf_data);



        //that.setState({AvailableAssignments: myJson});
      });

    } else {
      this.setState({assignmentId: "no assignment selected"});
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


    return(
      /* Analyze Mode HTML Start */
      <div class="DemoContents analyze-container">
        <p> {this.state.assignmentId} </p>
        {/* One Giant container that will let us use rows / columns */}
        {/* Row: Contains Rubric on display and student selector; */}
        <Row>
          <Col xs="3">
            <p>Current Student</p>
            <select id="selectedStudent" name="student" onChange={displayPaper}>
              {/* These should be automatically generated with AJAX and API */}
              <option value="0">Please Select Student</option>
              <option value="1">Kyle</option>
              <option value="2">Liz</option>
              <option value="3">Mitchel</option>
              <option value="4">Cindy</option>
              <option value="5">Ben</option>
            </select> 
            <Button id="rubricButton" onClick={this.toggleHidden.bind(this)}>Rubric</Button>
          </Col>
          <Col xs="9">
            {!this.state.isHidden && <Rubric />}
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
            {(!this.state.isMarkup) ? 
                <div class="annotate">
                  <Annotate citedata={this.state.citationData} />
                  <Button color="success" id="addAnnotation" onClick={this.addAnnotation}>Save Annotation</Button>
                </div> : <div class="markup"><Markup citesource={this.state.citationData}/><div className="Actions">{this.renderActions()}</div></div>
            }

          </Col>
          <Col xs="3">
            <h4>Found Sources</h4>
            <ListGroup id="ResearchList">
              <ListGroupItem id="CiteItem1" tag="button" action onClick={displaySource}>Research One</ListGroupItem>
              <ListGroupItem id="CiteItem2" tag="button" action onClick={displaySource}>Research Two</ListGroupItem>
              <ListGroupItem id="CiteItem3" tag="button" action onClick={displaySource}>Research Three</ListGroupItem>
              <ListGroupItem id="CiteItem4" tag="button" action onClick={displaySource}>Research Four</ListGroupItem>
              <ListGroupItem id="CiteItem5" tag="button" action onClick={displaySource}>Research Five</ListGroupItem>
            </ListGroup>
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
