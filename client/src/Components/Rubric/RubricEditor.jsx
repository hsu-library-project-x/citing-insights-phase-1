import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Button, Card, CardContent, Container, FormControl, TextField} from "@material-ui/core";

class RubricEditor extends Component {
    constructor(props) {
        super(props);
        this.state={
                rubricData: this.props.rubricData,
                rubricTitle: this.props.rubricTitle,
        };

        this.handleRubricSubmit = this.handleRubricSubmit.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
        this.updateRequest = this.updateRequest.bind(this);
        this.handleStandardInputChange = this.handleStandardInputChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.buildCards = this.buildCards.bind(this);
    };

    handleRubricSubmit() {
        const keys = Object.keys(this.state.rubricData);
        let newData =[];

        keys.forEach(k => {
            let name = k.split('-');
            let title = name[0];
            let index = name[1];
            let words = this.state.rubricData[k];

            if (newData[index]){
                let oldKey = Object.keys(newData[index])[0];
                let oldValue= newData[index][oldKey];
                newData[index]= {
                    [oldKey] : oldValue,
                    [title]:words
                }
            } else{
                newData[index] = {
                    [title]:words
                };
            }

        });

        if (this.props.rubricExists) {
            this.updateRequest(this.state.rubricTitle, newData);
        } else {
            this.sendRequest(this.state.rubricTitle, newData);
        }

    }

    //adding a new rubric
    sendRequest(rubricTitle, data) {
        return new Promise(() => {
            const newdata = {
                "name": rubricTitle,
                "cards": data,
                "user_id": this.props.user.id
            };
            let dataString = JSON.stringify(newdata);
            fetch('/api/rubrics', {
                method: 'POST',
                body: dataString,
                mode: 'cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(function (response)  {
                if (response.status === 201 || response.ok ){
                    alert("Rubric Added");
                }
                else {
                    alert("could not add rubric");
                }
            }).then(()=> this.props.history.push('/tasks/rubric'));
        });
    }

    //updating an existing rubric
    updateRequest(rubricTitle, data) {
        return new Promise(() => {
            const newdata = {
                "name": rubricTitle,
                "cards": data,
                "user_id": this.props.user.id
            };
            let dataString = JSON.stringify(newdata);
            fetch('/api/rubrics/' + this.props.selectedRubric, {
                method: 'PUT',
                body: dataString,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(function (response)  {
                if (response.status === 201 || response.ok ){
                    alert("Rubric Updated");
                }
                else {
                    alert("could not update rubric");
                }
            }).then(()=> this.props.history.push('/tasks/rubric'));
        });
    }

    handleStandardInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]:value
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let rubricData = this.state.rubricData;
        rubricData[name] = value;
        this.setState({
            rubricData:rubricData
        });
    }

    //calls when the isEditing state is changed
    buildCards() {
        let cards = [];
        let that=this;
        if (this.props.rubricExists) {
            let rubric = null;
            that.props.AvailableRubrics.forEach( function(r) {
                if (r._id === that.props.selectedRubric){
                    rubric = r;
                }
            });

            cards = rubric ? rubric.cards.map(c => {
                return(
                    <Card key={`card number ${rubric.cards.indexOf(c)}`}>
                        <CardContent>
                            <TextField
                                variant={"outlined"}
                                margin={'normal'}
                                fullWidth={true}
                                required
                                name={`cardTitle-${rubric.cards.indexOf(c)}`}
                                onChange={this.handleInputChange}
                                type={'text'}
                                label={'Rubric Item Title'}
                                defaultValue={c.cardTitle}
                            />
                            <TextField
                                variant={"outlined"}
                                margin={'normal'}
                                required
                                fullWidth={true}
                                multiline={true}
                                rowsMax={4}
                                name={`cardText-${rubric.cards.indexOf(c)}`}
                                onChange={this.handleInputChange}
                                type={'text'}
                                label={'Rubric Item Description'}
                                defaultValue={c.cardText}

                            />
                        </CardContent>
                    </Card>
                );
            }):null;
            return cards;

        } else {
            //loop the value of rubric Size building a card for each one
            for (let i = 0; i < that.props.rubricElements ; i++) {
                cards.push(
                    <Card key={`card number ${i}`}>
                        <CardContent>
                            <TextField
                                variant={"outlined"}
                                fullWidth={true}
                                required
                                name={`cardTitle-${i}`}
                                onChange={this.handleInputChange}
                                type={'text'}
                                label={'Rubric Item Title'}
                                placeholder={"Rubric Item Title"}
                                margin={'normal'}
                            />
                            <TextField
                                variant={"outlined"}
                                required
                                multiline={true}
                                rowsMax={4}
                                fullWidth={true}
                                name={`cardText-${i}`}
                                onChange={this.handleInputChange}
                                type={'text'}
                                label={'Rubric Item Description'}
                                placeholder={"Rubric Item Description"}
                                margin={'normal'}
                            />
                        </CardContent>
                    </Card>
                );
            }
            return cards;
        }

    }

    render() {
        return(
            <div>
                <Button color='primary' variant='contained'
                        onClick={() => this.props.history.push('/tasks/rubric')}>
                    Go Back to Rubric Menu
                </Button>
                <Button style={{float:'right'}}
                        color='primary'
                        variant='contained'
                        onClick={this.handleRubricSubmit}>
                    Save
                </Button>
                <Container maxWidth={"sm"}>
                    <FormControl fullWidth={true} required={true}>
                        <TextField
                            name="rubricTitle"
                            onChange={this.handleStandardInputChange}
                            label={"Rubric Title"}
                            defaultValue={this.state.rubricTitle}
                            variant={'filled'}
                            margin={'dense'}
                        />
                    </FormControl>
                    {this.buildCards()}
                </Container>
            </div>
        );
    }
}

export default withRouter(RubricEditor);