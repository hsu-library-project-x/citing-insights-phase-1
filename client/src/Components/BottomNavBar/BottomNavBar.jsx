import React, { Component } from 'react';
import {Toolbar, Modal, Button, AppBar, Paper, Container, Card,CardContent, CardHeader, Typography} from "@material-ui/core";
import {createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import InfoIcon from '@material-ui/icons/Info';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import EmailIcon from '@material-ui/icons/Email';
import Feedback from "../Feedback/Feedback";
import {withRouter} from "react-router-dom";

class BottomNavBar extends Component {
    constructor(props) {
        super(props);
        this.state={
            value:null,
            aboutOpen: false,
            contactOpen: false,
        }

        this.handleAboutOpen = this.handleAboutOpen.bind(this);
        this.handleContactOpen = this.handleContactOpen.bind(this);
        this.handleContactClose = this.handleContactClose.bind(this);
        this.handleAboutClose = this.handleAboutClose.bind(this);
        this.aboutModal = this.aboutModal.bind(this);
        this.contactModal = this.contactModal.bind(this);
    }
     handleAboutOpen = () => {
        this.setState({aboutOpen:true});
    };

    handleContactOpen = () => {
        this.setState({contactOpen:true});
    };

     handleAboutClose = () => {
         this.setState({aboutOpen:false});
    };

    handleContactClose = () => {
        this.setState({contactOpen:false});
    };

    aboutModal =() => {
        return(
            <Container maxWidth={'sm'}>
                <Card style={{margin:"1em"}}  variant="outlined">
                    <CardContent>
                        <Typography style={{margin:"1em"}} variant={"h4"} component={"h2"}> About Citing Insights </Typography>
                        <Typography style={{margin:"1em"}} component={"p"}>
                            Citing Insights was developed as a way to improve student's information literacy. Currently, it
                            exists as an assessment tool for university faculty and library staff. Once a student paper is uploaded
                            the Citing Insights tool will search the citations and find the source as well as metadata about the
                            cited source. The tool was developed by computer science students at Humboldt State University and
                            paid for by GI2025 funding.
                        </Typography>
                    </CardContent>
                </Card>
            </Container>
        );
    }

    contactModal = () => {
        return(
            <Container maxWidth={'sm'}>
                <Card style={{margin:"1em"}}  variant="outlined">
                    <Typography style={{margin:"1em"}} variant={"h4"} component={"h2"}> Contact Us </Typography>
                    <Typography style={{margin:"1em"}} component={"p"}>
                        <EmailIcon  style={{margin:"1em"}} color={"primary"}/>
                        citing-insights-dev-team@humboldt.edu
                    </Typography>
                    <Typography  style={{margin:"1em", textAlign:"center"}} component={"p"} color="textSecondary" >
                        Thank you for your interest in this project! We look forward to hearing from you!
                    </Typography>
                </Card>
            </Container>
        );
    }

    render() {
        const theme = createMuiTheme({
            palette: {
                primary: { main: '#25551b' }, // dk green
                secondary: { main: '#5C8021' } // light green
            },

        });

        return (
                <MuiThemeProvider theme={theme}>
                    <AppBar color='primary' position="static" style={{bottom:0 , top:'auto'}}>
                        <Toolbar>
                                {this.props.isAuthenticated ?
                                    <div style={{margin: '0 auto'}} >
                                        <Feedback email={this.props.user.email} user_id={this.props.user.id}/>
                                    </div>
                                    : null
                                }
                                <Button
                                    onClick={this.handleAboutOpen}
                                    style={{margin: '0 auto'}}
                                    size="small"
                                    variant={"contained"}
                                    startIcon={<InfoIcon color={"secondary"}/>}>
                                        About Us
                                </Button>
                                    <Modal
                                        aria-labelledby="About Us"
                                        aria-describedby="Learn about the Citing Insights Team / Project"
                                        open={this.state.aboutOpen}
                                        onClose={this.handleAboutClose}
                                    >
                                        {this.aboutModal()}
                                    </Modal>
                                <Button
                                    onClick={this.handleContactOpen}
                                    style={{margin: '0 auto'}}
                                    size="small"
                                    variant={"contained"}
                                    startIcon={<ContactMailIcon color={"secondary"}/>} >
                                        Contact Us
                                </Button>
                                    <Modal
                                        aria-labelledby="Contact Us"
                                        aria-describedby="Contact the Citing Insights Team / Project"
                                        open={this.state.contactOpen}
                                        onClose={this.handleContactClose}
                                    >
                                        {this.contactModal()}
                                    </Modal>
                        </Toolbar>
                    </AppBar>
            </MuiThemeProvider>

        );
    }
}

export default withRouter(BottomNavBar);