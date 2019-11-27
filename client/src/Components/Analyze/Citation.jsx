import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

class Citation extends Component {
    constructor(props) {
      super(props);
      this.state = {
          citations: this.props.citations,
          current_citation_id: this.props.current_citation_id,
          citationDropdownItems: "",
          completeCitation: "",
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

    passUpNewId(){
        this.props.updateCitationId(this.state.current_citation_id);
    }
      
    handleCitationChange(event) {
        this.setState({current_citation_id: event.target.value});
        this.props.get_s2_info(event.target.value);
        this.passUpNewId();
    }

    render(){   

      // TODO: MAKE INTO FUNCTION
      let bigCitation = <option> No citation selected </option>;

      if (this.state.citations != []) {
        bigCitation = this.state.citations.map((citation) => {
          if (citation.author[0] != undefined && citation._id === this.state.current_citation_id) {
            return (this.formatCitation(citation));
          } else {
            return ("");
          }
        });
      } else {
        let lastOption = <p> No Citation Selected </p>;
      }
  
      if (this.state.citations != []) {
          this.state.citationDropdownItems = this.state.citations.map(function(citation) {
            if (citation.author[0] != undefined) {
              return (<option value={citation._id}> {citation.author[0].family} </option>);
            }
          });
        } else {
          return <p> nothing found yet </p>;
        }

        return(
            <div>
                <h4 id="CitationLabel">Citation (with style): </h4>
                <select 
                  value={this.state.current_citation_id}
                  onChange={this.handleCitationChange}
                >
                        <option value="" disabled selected hidden >Select a Citation</option>
                        {this.state.citationDropdownItems}
                </select>
                <Card>
                    <CardBody>
                    <CardTitle>Citation</CardTitle>
                    <CardText> {bigCitation}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Citation; 