import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Input } from 'reactstrap';

class Citation extends Component {
    constructor(props) {
      super(props);
      this.state = {
          citations: this.props.citations,
          current_citation_id: this.props.current_citation_id,
          citationDropdownItems: "",
      }
      this.getAuthors = this.getAuthors.bind(this);
      this.formatCitation = this.formatCitation.bind(this);
      this.handleCitationChange = this.handleCitationChange.bind(this);
      this.passUpNewId = this.passUpNewId.bind(this);
    }

    getAuthors(authors) {
        return authors.map((d) =>
          d.family + ", " + d.given + "\n"
        );
      }
  
    formatCitation(citation) {
        return (
        <div>
          {this.getAuthors(citation.author)} ({citation.date}). {citation.title}
        </div>
        );
      }
      
    handleCitationChange(event) {
        this.props.get_s2_info(event.target.value);
    }

    passUpNewId(){
      this.props.updateCitationId(this.state.current_citation_id);
    }
  
    render(){
         var citationItems = <p> nothing found yet </p>;
        if (this.state.citations != []) {
            this.state.completeCitation = this.state.citations.map((citation) => {
              if (citation.author[0] != undefined && citation._id === this.state.current_citation_id) {
                return (this.formatCitation(citation));
              } else {
                return ("");
              }
            });
          } else {
            citationItems= <p> nothing found yet </p>;
          }
  
      
  
        if (this.state.citations != []) {
            this.state.citationDropdownItems = this.state.citations.map(function(citation) {
              if (citation.author[0] != undefined) {
                return (<option value={citation._id}> {citation.author[0].family} </option>);
              }
            });
          } else {
            citationItems = <p> nothing found yet </p>;
          }
        return(
            <div>
                <h4 id="CitationLabel">Citation (with style): </h4>
                <Input
                    onChange={this.handleCitationChange}
                    onInput={this.updateCitationId}
                    id="assignForAnalyze"
                    type="select"
                    name="AssignNew"
                    required >
                        <option value="" disabled selected hidden >Select a Citation</option>
                        {this.state.citationDropdownItems}
                </Input>
                <Card>
                    <CardBody>
                    <CardTitle>Citation</CardTitle>
                    <CardText> {this.state.completeCitation}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Citation; 