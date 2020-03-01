import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Button, Typography, Table , TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import { CSVLink } from "react-csv";

class OverviewTable extends Component {
    constructor(props) {
        super(props);

        this.showCitations = this.showCitations.bind(this);
        this.formatCitation = this.formatCitation.bind(this);
        this.getAuthors = this.getAuthors.bind(this);
        // this.getRubric = this.getRubric.bind(this);
    };
    //
    // getRubric(rubricId){
    //     fetch('/rubrics/' + rubricId)
    //         .then(function (response) {
    //             if(response.status !== 500 || response.status !== 404){
    //                 return response.json();
    //             }
    //             else{
    //                 alert("Something went wrong getting rubric used. Please try again");
    //             }
    //         })
    //         .then(function (myJson) {
    //             console.log(myJson)
    //         });
    // }
    getAuthors(authors) {
        return authors.map((d) => {
            return d.family + ", " + d.given + "\n"
        });
    }


    formatCitation(citation, assessment) {
        console.log(citation);
        return (
            {
                'author':  `${this.getAuthors(citation.author)} ${citation.date}. ${citation.title}`,
                'title': citation.title,
                'comments': assessment.annotation,
                'rubric_title': assessment.rubric_title,
                'rubric_value' : assessment.rubric_score,
            }
        );

    }

    showCitations() {
        //Query for Citations where rubric value or annotation is not null
        let data = [];

        if (this.props.citations !== []) {
            this.props.citations.forEach((citation) => {
                if (citation.evaluated === true) { //fetch call also checks this
                    citation.assessments.forEach((assessment =>{
                        data.push(this.formatCitation(citation, assessment));
                    }));

                }
            });
        }

        return data;
    }

    render(){
        let rows = this.showCitations();
        return(
            <div>
                <Typography align={"center"} variant={"subtitle1"} component={"p"} gutterBottom={true}>
                    Download PDF Comming Soon
                </Typography>

                <Button color={'primary'}
                        variant={'contained'}
                        onClick={() => this.props.history.push('/tasks/overview')}>
                    Back to Overview Selection
                </Button>

                <CSVLink data={rows} filename={"overview.csv"}>
                    <Button color={'primary'} variant={'contained'} >
                        Download CSV
                    </Button>
                </CSVLink>

                <Button disabled={true} variant={'contained'}>
                    Download PDF
                </Button>

                <Table aria-label="overview table">
                    <TableHead>
                        <TableRow>
                            <TableCell  align="left">Author(s)</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Comments</TableCell>
                            <TableCell align="left">Rubric Used</TableCell>
                            <TableCell align="left">Rubric Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.author}>
                                <TableCell component={"th"} scope={"row"}>
                                    {row.author}
                                </TableCell>
                                <TableCell aligh={"left"}> {row.title}</TableCell>
                                <TableCell aligh={"left"}> {row.comments}</TableCell>
                                <TableCell aligh={"left"}> {row.rubric_title}</TableCell>
                                <TableCell aligh={"left"}> {row.rubric_value} </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default withRouter(OverviewTable);