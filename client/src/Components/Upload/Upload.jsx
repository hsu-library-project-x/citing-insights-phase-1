import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Container, FormControl, InputLabel, Select, MenuItem, Typography, Button} from "@material-ui/core";
import Dropzone from "./Dropzone";
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';


class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
        classes:[],
        assignments:[],
        files: [],
        classId: "",
        assignmentId: "",
        uploading:false,
        progress:0,
    };

    this.getClasses();

    this.getClasses = this.getClasses.bind(this);
    this.handleClassSelection = this.handleClassSelection.bind(this);
    this.createList = this.createList.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.handleSubmitFiles = this.handleSubmitFiles.bind(this);

  }

    onFilesAdded(files){
        this.setState(prevState => ({
            files: prevState.files.concat(files)
        }));
    }

  createList(json, state){
    let list=[];

    for (let i=0; i<json.length;i++ ){
        list.push(json[i]);
    }
    this.setState({[state]:list});
  }

  getClasses() {
      fetch('/api/courses/' + this.props.user.id)
         .then(function (response) {
              return response.json();
         }).then((response)=>{
             this.createList(response,'classes');
      })
    }

    handleClassSelection(event) {
        let target = event.target;
        fetch('/api/assignments/by_class_id/' + target.value)
            .then(function(response) {
                return response.json();
            })
            .then((response)=>{
                 this.createList(response,'assignments');
            }).then(()=> this.handleInputChange(event));
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });

    }




    async handleSubmitFiles(event) {
      event.preventDefault();
      this.setState({uploading:true});

      const data= {
          class_id: this.state.classId,
          assignment_id: this.state.assignmentId,
          files: this.state.files,
      };

       if(data.classId === "" || data.assignment_id === "" || data.files === []){
          alert('Cannot upload without a file, class, or assignment');
          return;
       }

        data.files.forEach(file => {
            const formData = new FormData();
            formData.append(data.assignment_id, file, file.name);

            fetch('/api/upload/',{
                method: 'POST',
                body: formData,
            }).then((response =>{
                this.setState({uploading:false})
            }))
        });

    }

    render(){

      let courses = this.state.classes.map((d) =>
          <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>
      );

      let assignments = this.state.assignments.map((d) =>
          <MenuItem key={d._id} value={d._id}>{d.name}</MenuItem>
      );


    return(
        this.state.uploading ?
            <Backdrop open={this.state.uploading}>
                <CircularProgress className='circularProgress' color="secondary" />
                <Typography fontWeight="fontWeightBold" align={"center"} variant={"h6"} component={"h1"} gutterBottom={true} color={'secondary'}>
                   Please wait while we upload your files. Once complete, this screen will close.
                </Typography>
            </Backdrop>:
                <div>
                    <Typography style={{marginTop: "1em"}} align={"center"} variant={"h3"} component={"h1"} gutterBottom={true}>
                        Upload Files
                    </Typography>
                    <Typography align={"center"} variant={"subtitle1"} component={"p"} gutterBottom={true}>
                        Please upload papers as PDF
                    </Typography>

                    <Container maxWidth={'md'} className={"container"}>
                        <form style={{textAlign:"center", margin:"1em"}} onSubmit={this.handleSubmitFiles}>
                            <FormControl required={true} style={{minWidth: 250}}>
                                <InputLabel id="selectClasslabel">Select a Class</InputLabel>
                                <Select
                                    style={{textAlign:"center"}}
                                    labelId={"selectClasslabel"}
                                    onChange={this.handleClassSelection}
                                    defaultValue={""}
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
                            <FormControl  required={true} style={{minWidth: 250, marginBottom:"1em"}}>
                                <InputLabel id="selectAssignmentLabel">Select an Assignment</InputLabel>
                                <Select
                                    style={{textAlign:"center"}}
                                    onChange={this.handleInputChange}
                                    defaultValue={""}
                                    inputProps={{
                                        name: 'assignmentId',
                                        id: 'selectAssignment',
                                    }}
                                >
                                    <MenuItem value="" disabled> select assignment</MenuItem>
                                    {assignments}
                                </Select>
                            </FormControl>
                            <br />
                            <Dropzone
                                onFilesAdded={this.onFilesAdded}
                                disabled={this.state.uploading}
                            />
                            <br />

                            <Typography align={"center"} variant={"h6"} component={"h1"} gutterBottom={true}>
                                Files to Upload
                            </Typography>
                            {this.state.files.map(file => {
                                return (
                                    <p key={file.name}>{file.name}</p>
                                );
                            })}
                            <br />
                            <Button type='submit' variant='contained' color='primary' > Upload </Button>
                        </form>
                    </Container>
                </div>
    );
  }
}

export default withRouter(Upload);
