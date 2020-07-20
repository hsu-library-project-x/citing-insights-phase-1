import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { CSVLink } from "react-csv";

const columns = [

];

class OverviewTableGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assignments: [],
            papers: []
        }

        this.getAssignments = this.getAssignments.bind(this);
        this.getPapers = this.getPapers.bind(this);

        this.showCitations = this.showCitations.bind(this);
        this.formatCitation = this.formatCitation.bind(this);

        this.getAssignments();
    };

    componentWillUnmount() {
        this.props.ChangeOverview();
    }


    getAssignments() {
        let that = this;
        console.log(this.props);
        fetch(`/api/assignments/by_group_id/${this.props.group_id}`)
            .then(response => {
                return response.json();
            })
            .then(myJson => {
                that.setState({
                    assignments: myJson
                });
            })
    }

    getPapers() {
        let that = this;

        //Need to loop through each assignment, and grab all papers for that ssignment
        //Going to need Async calls probably


        // fetch(`/api/papers/by_ref_id/${}`)
        // .then(response => {
        //     return response.json();
        // })
        // .then(MyJson => {
        //     that.setState({
        //         papers: myJson
        //     });
        // })

    }

    formatCitation(citation, assessment) {
        return (
            {

            }
        );
    }

    showCitations() {
        //Query for Citations where rubric value or annotation is not null
        let data = [];

        if (this.props.citations !== []) {
            this.props.citations.forEach((citation) => {
                if (citation.evaluated === true) { //fetch call also checks this
                    citation.assessments.forEach((assessment => {
                        data.push(this.formatCitation(citation, assessment));
                    }));

                }
            });
        }

        return data;
    }

    render() {
        let rows = {};
        return (
            <div>
                <Typography align={"center"} variant={"subtitle1"} component={"p"} gutterBottom={true}>
                    Download PDF Comming Soon
                </Typography>

                <Button color={'primary'}
                    variant={'contained'}
                    onClick={() => this.props.history.push('/tasks/overview')}>
                    Back to Overview Selection
                </Button>


                <Button disabled={true} variant={'contained'}>
                    Download PDF
                </Button>

                <Table aria-label="overview table">
                    <TableHead>
                    </TableHead>
                    <TableBody>
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default withRouter(OverviewTableGroup);