import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Select, MenuItem, Button, FormControl, Paper, InputLabel, TextField } from '@material-ui/core';
import RubricAccordion from './RubricAccordion.jsx';
import RubricSubmit from './RubricSubmit.jsx';
import PdfComponent from "./PdfComponent.jsx";
import DiscoveryTool from './DiscoveryTool.jsx';
import Citation from './Citation.jsx'


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
      current_citation_id: 0,
    };

    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleGetRubric = this.handleGetRubric.bind(this);
    this.handleChildUnmount = this.handleChildUnmount.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveCitations = this.handleSaveCitations.bind(this);
    this.get_citation_info = this.get_citation_info.bind(this);
    this.get_s2_info = this.get_s2_info.bind(this);
    this.next_paper = this.next_paper.bind(this);
    this.refresh = this.refresh.bind(this);
    this.get_paper_info = this.get_paper_info.bind(this);
    this.updateCitationId = this.updateCitationId.bind(this);
  }

  get_paper_info(paper_id) {
    fetch('http://localhost:5000/papers/' + paper_id)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        this.setState({ current_pdf_data: myJson["pdf"]["data"] });
      });
  }

  componentDidMount() {
    if (this.props.location.state === undefined) {
      this.props.history.push({
        pathname: "/",
        props: { ...this.state }
      });
    } else {
      let that = this;
      //Grab info about the assignment
      fetch('http://localhost:5000/assignments/' + this.props.selectedAssignmentId)
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          that.setState({
            assignment: myJson
          });
        });
    }
  }

  get_citation_info(paper_id) {
    let that = this;
    let answer = fetch('http://localhost:5000/citations/by_paper_id/' + paper_id)
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        that.setState({ citations: myJson });
      });
    return (answer);
  }

  get_s2_info(citation_id) {
    this.setState({
      current_citation_id: citation_id
    });
  }

  //Here we populate citation source information and meta data
  //Do this call every time a new Paper is loaded into the  component

  componentWillMount() {
    let that = this;
    if (this.props.selectedAssignmentId !== undefined) {
      this.setState({ assignmentId: this.props.selectedAssignmentId });

      fetch('http://localhost:5000/papers/by_assignment_id/' + this.props.selectedAssignmentId)
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
                  .then(() => {
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
    });
  }


  handleChildUnmount() {
    this.setState({
      assessingRubric: false
    });
  }


  //this saves annotations and rubric values associated with citation
  handleSaveCitations() {
    let radio_value = "";
    let radios = document.getElementsByName("radio");

    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        radio_value = radios[i].value;
      }
    }
    let annotation = document.getElementById("annotation").value;

    fetch(`/citations/save_citation_grade/${this.state.current_citation_id}/${this.state.rubricId}/${this.state.currentRubric.name}/${encodeURIComponent(radio_value)}/${encodeURIComponent(annotation)}`)
      .then(function (response) {
        if (response.status === 201) {
          alert('annotation/score saved');
        } else {
          alert('could not save annotation/score ');
        }
        return response.json();
      });


    for (let k = 0; k < this.state.citations.length; k++) {

      if (this.state.citations[k]["_id"] === this.state.current_citation_id) {

        if (k < this.state.citations.length - 1) {
          this.setState({ current_citation_id: this.state.citations[k + 1]["_id"] });
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    //alert(name + ", " + value);
    this.setState({
          [name]: value
        },
    );

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
      this.setState((prevState, props) => ({
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
      function() {
        console.log(this.state.current_citation_id);
      }
    });
  }

  render() {
    let pdf;
    if (this.state.current_pdf_data === "this must get set") {
      pdf = <p> we dont have data yet </p>;
    } else {
      pdf = <PdfComponent data={this.state.current_pdf_data} />;
    }
    let rubrics = this.state.AvailableRubrics;
    let rubricList = rubrics.map((rubric) =>
      <MenuItem value={rubric._id}>{rubric.name}</MenuItem>
    );

    let papers = this.state.paper_ids;
    let paperList = papers.map(p =>{
       return  <MenuItem value={p._id}> {p.title} </MenuItem>}
    );


    return (
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center">
          <Grid item xs={2}>
            <FormControl required={true} style={{minWidth: 200, marginBottom:"1em"}}>
              <InputLabel id={"selectPaperlabel"}>Select a Paper</InputLabel>
              <Select
                  style={{textAlign:"center"}}
                  labelId={"selectPaperlabel"}
                  onChange={this.handleInputChange}
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
                current_citation_id={this.state.current_citation_id}
                key={this.state.current_citation_id}
              /> : null}
          </Grid>
          <Grid item xs={8}  alignItems="flex-start" >
            <div className="overflow-auto">
              <Paper>
                {pdf}
              </Paper>
            </div>
          </Grid>
          <Grid item xs={2}>
            <FormControl required={true} style={{ minWidth: 200, marginBottom: "1em" }}>
              <InputLabel id={"AssignRubriclabel"}>Select a Rubric</InputLabel>
              <Select
                style={{ textAlign: "center" }}
                labelId={"AssignRubriclabel"}
                onChange={this.handleGetRubric}
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
            />

            <TextField
              id="annotation"
              label="Annotation"
              multiline
              variant="filled"
            />
            <Button variant={"contained"} color={"primary"} onClick={this.handleSaveCitations}>Save Rubric Value </Button>
          </Grid>
          {this.state.assessingRubric ? <RubricSubmit sourceText={this.state.sourceText} unmountMe={this.handleChildUnmount} curRubric={this.state.currentRubric} curPaper={this.state.curPaperId} /> : null}
        </Grid>
    );
  }
}

export default withRouter(Analyze);
