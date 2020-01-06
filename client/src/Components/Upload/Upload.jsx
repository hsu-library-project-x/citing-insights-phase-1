import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {Container, FormControl, InputLabel, Select, MenuItem, Typography, Button} from "@material-ui/core";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
        classes:[],
        assignments:[],
        files: [],
        classId: "",
        assignmentId: "",
    }

    this.getClasses();

    this.getClasses = this.getClasses.bind(this);
    this.handleClassSelection = this.handleClassSelection.bind(this);
    this.createList = this.createList.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.hanldeUploadFiles=this.hanldeUploadFiles.bind(this);
  }

  createList(json, state){
    let list=[];

    for (let i=0; i<json.length;i++ ){
        list.push(json[i]);
    }
    this.setState({[state]:list});
  }

  getClasses() {
      fetch('http://localhost:5000/courses/' + this.props.user.id)
         .then(function (response) {
              return response.json();
         }).then((response)=>{
             this.createList(response,'classes');
      })
    }

    handleClassSelection(event) {
        let target = event.target;
        fetch('http://localhost:5000/assignments/by_class_id/' + target.value)
            .then(function(response) {
                return response.json();
            })
            .then((response)=>{
                 this.createList(response,'assignments');
            });
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });

    }

    async handleUploadFiles( event){
      const data={
          "class":this.state.classId,
          "assignment": this.state.assignmentId,
          "files": this.state.files,
      }

      const promises=[];

      data.files.forEach(f =>
      {
          promises.push(this.sendRequest(f))
      });




    }


  render(){

      let courses = this.state.classes.map((d) =>
          <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>
      );

      let assignments = this.state.assignments.map((d) =>
          <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>
      );

    const theme = createMuiTheme({
      palette: {
        primary: { main: '#25551b' }, // dk green
        secondary: { main: '#5C8021' } // light green
      },
    });

    return(
        <MuiThemeProvider theme={theme}>
          <Container maxWidth={'md'} className={"container"}>
            <Typography style={{marginTop: "1em"}} align={"center"} variant={"h3"} component={"h1"} gutterBottom={true}>
              Upload Files
            </Typography>
            <Typography align={"center"} variant={"p"} component={"p"} gutterBottom={true}> Please upload papers as PDF </Typography>

            <Container maxWidth={"xs"}>
                <form  style={{textAlign:"center"}} onSubmit={this.handleUploadFiles}>
                    <FormControl style={{minWidth: 250}}>
                        <InputLabel id="selectClasslabel">Select a Class</InputLabel>
                        <Select
                            style={{textAlign:"center"}}
                            labelId={"selectClasslabel"}
                            required
                            onChange={this.handleClassSelection}
                            inputProps={{
                                name: 'classId',
                                id: 'selectClass',
                            }}
                        >
                            <MenuItem value="" disabled >select class</MenuItem>
                            {courses}
                        </Select>
                    </FormControl>
                    <br />
                    <FormControl style={{minWidth: 250, marginBottom:"1em"}}>
                        <InputLabel id="selectAssignmentLabel">Select an Assignment</InputLabel>
                        <Select
                            style={{textAlign:"center"}}
                            required
                            onChange={this.handleInputChange}
                            inputProps={{
                                name: 'assignmentId',
                                id: 'selectAssignment',
                            }}
                        >
                            <MenuItem value="" disabled> select assignment</MenuItem>
                            {assignments}
                        </Select>
                    </FormControl>

                    {this.state.files.map(file => {
                      return (
                          <div key={file.name}>
                            <p className="Filename">{file.name}</p>
                          </div>
                      );
                    })}
                    <br />
                    <Button type='submit' variant='contained' color='primary' > Upload </Button>
                </form>
            </Container>

          </Container>
        </MuiThemeProvider>
    );
  }
}

export default withRouter(Upload);
