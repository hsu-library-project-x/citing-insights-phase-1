import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, Button } from 'reactstrap';

class DiscoveryTool extends Component {
    constructor(props) {
      super(props);
      this.state = {
          current_citation: this.props.current_citation,
          current_s2_data: this.props.current_s2_data,
      }
      console.log("ALL YOU POELE");
      console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH");
      
      this.open_s2 = this.open_s2.bind(this);
      this.open_alma_primo = this.open_alma_primo.bind(this);
      this.open_google_scholar = this.open_google_scholar.bind(this);
    }

    open_s2() {
        let query = encodeURI(this.state.current_citation["author"][0]["family"] + " " + this.state.current_citation["title"][0]);
        let win = window.open("https://www.semanticscholar.org/search?q=" + query, '_blank');
        win.focus();
    }

    open_alma_primo() {
      let query = encodeURI(this.state.current_citation["title"][0]);
      let win = window.open("https://humboldt-primo.hosted.exlibrisgroup.com/primo-explore/search?query=title,begins_with," + query + ",AND&tab=everything&search_scope=EVERYTHING&sortby=title&vid=01CALS_HUL&lang=en_US&mode=advanced&offset=0&pcAvailability=true", '_blank');
      win.focus();
    }
    
      open_google_scholar() {
        let query = encodeURI(this.state.current_citation["author"][0]["family"] + " " + this.state.current_citation["title"][0]);
        let win = window.open("https://scholar.google.com/scholar?q=" + query, '_blank');
        win.focus();
      }
      
    render(){
        return(
            <div class="discoveryTool">
              <h4>Discovery Tool</h4>
                <Card>
                  <CardBody>
                    <CardTitle><Button color="link" onClick={this.open_s2}>Semantic Scholar</Button></CardTitle>
                    <CardText>Citation Velocity: {this.state.current_s2_data["citation_velocity"]} <br />Influential Citations: {this.state.current_s2_data["influential_citation_count"]}</CardText>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle> <Button color="link" onClick={this.open_alma_primo}>Alma Primo</Button></CardTitle>
                    <CardText>Find Source through Library Discovery System</CardText>
                  </CardBody>
                </Card>
                <Card>
                  <CardBody>
                    <CardTitle><Button color="link" onClick={this.open_google_scholar}>Google Scholar</Button></CardTitle>
                    <CardText>Google Scholar Information</CardText>
                  </CardBody>
                </Card>
              </div>
        );
    }
}

export default DiscoveryTool; 