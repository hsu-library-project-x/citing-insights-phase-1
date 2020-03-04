import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Select, MenuItem, Button, FormControl, Tooltip, InputLabel, TextField, Fab} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import RubricAccordion from './RubricAccordion.jsx';
import PdfComponent from "../Pdf/PdfComponent.jsx";
import DiscoveryTool from './DiscoveryTool.jsx';
import Citation from './Citation.jsx'

class Analyze extends PureComponent {
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
      paper_ids: [],
      current_paper_id_index: 0,
      current_citation_id: 0,
      annotation: "",
      pageNumber: null,
      radio_score: null,
      raw_pdf_data:null,
    };

    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleGetRubric = this.handleGetRubric.bind(this);
    this.handleChildUnmount = this.handleChildUnmount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveCitations = this.handleSaveCitations.bind(this);
    this.handlePaperChange = this.handlePaperChange.bind(this);
    this.get_citation_info = this.get_citation_info.bind(this);
    this.setCurrentCitation = this.setCurrentCitation.bind(this);
    this.next_paper = this.next_paper.bind(this);
    this.refresh = this.refresh.bind(this);
    this.get_paper_info = this.get_paper_info.bind(this);
    this.updateCitationId = this.updateCitationId.bind(this);
    this.AssessmentScore = this.AssessmentScore.bind(this);

    // let pdf = <p> No Pdf Data found </p>;


  }

  AssessmentScore(newScore, title) {
    this.setState({ radio_score: newScore, rubric_title: title });


  }

  get_paper_info(paper_id) {
    let that = this;
    fetch('/papers/' + paper_id)
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          that.setState({ current_pdf_data: myJson["pdf"]["data"] ,raw_pdf_data: myJson['body'] });
        });
  }

  componentDidMount() {
    let that = this;
    //Grab info about the assignment
    fetch('/assignments/' + this.props.selectedAssignmentId)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        that.setState({
          assignment: myJson
        });
      });

  }

  componentWillUnmount() {
    console.log('unmounting analyze');
  }

  get_citation_info(paper_id) {
    let that = this;
    return fetch('/citations/by_paper_id/' + paper_id)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        that.setState({ citations: myJson });
        return (myJson);
      });

  }

  setCurrentCitation(citation_id) {
    this.setState({
      current_citation_id: citation_id
    });
  }

  //Here we populate citation source information and meta data
  //Do this call every time a new Paper is loaded into the  component
  componentWillMount() {
    let that = this;

    if (this.props.selectedAssignmentId !== undefined) {
      fetch('/papers/by_assignment_id/' + this.props.selectedAssignmentId)
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          that.setState({
            paper_ids: myJson
          });
          try {
            fetch('/papers/' + myJson[0]["_id"])
              .then(function (response) {
                return response.json();
              })
              .then(function (myJson) {
                that.setState({ current_pdf_data: myJson["pdf"]["data"], raw_pdf_data: myJson['body'] });
                that.get_citation_info(myJson["_id"])
                  .then((citations) => {
                    that.setCurrentCitation(citations[1]["_id"]);
                  });
              });
          } catch (e) {
            that.props.history.push({
              pathname: "/",
              props: { ...that.state }
            });
          }
        });
    } else {
      this.setState({ assignmentId: "no assignment selected" });
    }
    fetch('/rubrics/' + this.props.user.id)
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
        this.setState((state, props) => ({
          currentRubric: state.AvailableRubrics[i]
        }));
      }
    }

    this.setState({
      rubricSelected: false,
      rubricId: id
    });
  }


  handleChildUnmount() {
    this.setState({
      assessingRubric: false
    });
  }

  //this saves annotations and rubric values associated with citation
  async handleSaveCitations() {
    let that = this;

    const assessment = {
      rubric_id: this.state.rubricId,
      rubric_score: this.state.radio_score,
      rubric_title: this.state.rubric_title,
      annotation: this.state.annotation
    };



    //Grab current citation from DB and check to see if rubric has already been assessed.
    let response = await fetch(`/citations/${that.state.current_citation_id}`);
    let json = await response.json();
    //Check to see if assessment has already been made.
    let assessments = json.assessments;

    if (assessments.length !== 0) {

      //Look at each assessment
      for (let index in assessments) {

        //console.log(`current rub: ${that.state.rubricId} and \nnew rub: ${assessments[index].rubric_id}`);

        //If true, assessment already exists
        if (assessments[index].rubric_id === that.state.rubricId) {

          //Ask user to confirm rewrite
          if (window.confirm('Rewrite existing assessment?')) {

            //Delete Existing
            let resp = await fetch(`/citations/remove_assessment/${that.state.current_citation_id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(assessment)
            })
              .then((response) => {
                if (response.ok || response.status === 201) {
                  return fetch(`/citations/add_assessment/${that.state.current_citation_id}`, {
                    method: "PUT",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(assessment)
                  })
                    .then((response) => {
                      if (response.ok || response.status === 201) {
                        return response.json();
                      }
                      else {
                        alert("Something went wrong. Please Try again");
                      }
                    })
                    .then((data) => {
                      if (data) {
                       alert("Assessment Saved!");
                        console.log('Assessment Saved:', assessment);
                      }
                    })
                    .catch((error) => {
                      alert('Error saving Assessment:' + error);
                      console.error('Error saving Assessment:', error);
                    });
                } else {
                  alert("something went wrong. Please try again");
                }
              });
          } else {
            //User declined to overwrite
            window.alert('Keeping Previous Assessment.');
            break;
          }
        } else {
          fetch(`/citations/add_assessment/${that.state.current_citation_id}`, {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(assessment)
          })
            .then((response) => {
              if (response.ok || response.status === 201) {
                return response.json();
              }
              else {
                alert("Something went wrong. Please Try again");
              }
            })
            .then((data) => {
              if (data) {
                console.log('Assessment Saved:', assessment);
              }
            })
            .catch((error) => {
              console.error('Error saving Assessment:', error);
            });
        }
      }
    }
    else {
      console.log('in the else; assessment doesnt exist in array');

      //Doesn't exist yet; good to go
      fetch(`/citations/add_assessment/${that.state.current_citation_id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(assessment)
      })
        .then((response) => {
          if (response.ok || response.status === 201) {
            alert("Assessment Saved!");
            return response.json();
          }
          else {
            alert("Something went wrong. Please Try again");
          }
        })
      // I Dont think this is needed --Liz
        // .then((data) => {
        //   if (data) {
        //     console.log('Assessment Saved:', assessment);
        //   }
        // })
        // .catch((error) => {
        //   console.error('Error saving Assessment:', error);
        // });
      // chunck end --Liz
    }
  }


  refresh(index) {
    if (index < this.state.paper_ids.length) {
      this.get_citation_info(this.state.paper_ids[index]["_id"]); // promise returned is ignored
      this.get_paper_info(this.state.paper_ids[index]["_id"]);
    } else {
      return "";
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handlePaperChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    this.get_paper_info(value);
    this.get_citation_info(value);
  }

  next_paper(direction) {
    let check = true;  //THis is redunant?
    let index = this.state.current_paper_id_index;

    //check that we wont go out of range
    if (direction === -1 && index < 1) {
      check = false;
    }
    if (direction === 1 && index > this.state.paper_ids.length) {
      check = false;
    }

    if (check) {
      this.setState((prevState) => ({
        current_paper_id_index: prevState.current_paper_id_index + direction
      }
      ), () => this.refresh(this.state.current_paper_id_index));
    } else {
      console.log('refreshing out of range');
    }
  }

  updateCitationId(new_id) {
    this.setState({
      current_citation_id: new_id,
    });
  }

  render() {
    let pageNum = this.state.pageNumber === null ? 1 : this.state.pageNumber;

    let rubrics = this.state.AvailableRubrics;
    let rubricList = rubrics.map((rubric) =>
      <MenuItem value={rubric._id} key={rubric._id}>{rubric.name}</MenuItem>
    );

    let papers = this.state.paper_ids;
    let paperList = papers.map(p => {
      return <MenuItem value={p._id} key={p._id}> {p.title} </MenuItem>
    });

    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={4} md={2}>
          {/*<Paper variant="outlined">*/}
          <Tooltip title="Change Assignment">
            <Fab
              aria-label="change-assignment"
              color="primary"
              variant={'extended'}
              onClick={() => this.props.history.push('/tasks/analyzemenu')}>
              <ArrowBackIcon />
              Change Assignment
          </Fab>
          </Tooltip>
        </Grid>

        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={1}
        >

          {/* Paper + citation selection, and discovery tool*/}
          <Grid item xs={12} sm={4} md={2}>
            {/*<Paper variant="outlined">*/}
            <FormControl required={true} style={{ minWidth: 150 }}>
              <InputLabel id={"selectPaperlabel"} style={{ textAlign: 'center' }}>Select a Paper</InputLabel>
              <Select
                variant={"filled"}
                style={{ textAlign: "center" }}
                labelId={"selectPaperlabel"}
                onChange={this.handlePaperChange}
                defaultValue={this.state.curPaperId}
                value={this.state.curPaperId}
                inputProps={{
                  name: 'curPaperId',
                }}
              >
                <MenuItem value="" disabled >select paper </MenuItem>
                {paperList}
              </Select>

            </FormControl>
            {this.state.citations !== [] && this.state.current_citation_id !== 0 ?
              <Citation
                citations={this.state.citations}
                current_citation_id={this.state.current_citation_id}
                updateCitationId={this.updateCitationId}
              /> : null
            }
            {this.state.citations !== [] && this.state.current_citation_id !== 0 ?
              <DiscoveryTool
                citations={this.state.citations}
                oneSearchUrl={this.props.oneSearchUrl}
                oneSearchViewId={this.props.oneSearchViewId}
                current_citation_id={this.state.current_citation_id}
                key={this.state.current_citation_id}
              /> : null}
            {/*</Paper>*/}
          </Grid>

          {/* PDF Viewer */}
          <Grid item xs={12} sm={4} md={8} style={{ backgroundColor: 'rgb(160, 164, 167)' }}>
            <PdfComponent
              data={this.state.current_pdf_data}
              pageNumber={pageNum}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            {/*Rubric selection and annotation field*/}
            <br />
            <FormControl style={{ minWidth: 200, maxWidth: 200, marginBottom: "1em" }}>
              <InputLabel id={"AssignRubriclabel"}>Select a Rubric</InputLabel>
              <Select
                style={{ textAlign: "center" }}
                labelId={"AssignRubriclabel"}
                defaultValue={""}
                onChange={this.handleGetRubric}
                autoWidth={true}
                inputProps={{
                  name: 'AssignRubric',
                }}
              >
                <MenuItem value="" disabled >select rubric</MenuItem>
                {rubricList}
              </Select>
            </FormControl>
            <RubricAccordion
              currentRubric={this.state.currentRubric}
              allowZeroExpanded={true}
              AssessmentScore={this.AssessmentScore}
            />
            <TextField
              id="annotation"
              label="Annotation"
              multiline
              variant="filled"
              onChange={this.handleInputChange}
              inputProps={{
                name: 'annotation',
              }}
            />
            <Button variant={"contained"} color={"primary"} onClick={this.handleSaveCitations}>
              Save Rubric Value
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default React.memo(Analyze);
