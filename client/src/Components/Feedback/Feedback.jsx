import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
class Feedback extends Component {
  constructor(props){
    super(props);

    this.state={
      open: false,
      message: ""
    };

    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickOpen() {
    this.setState({
      open: true
    });
  }

  handleClose() {
    this.setState({
      message: "",
      open: false
    });
  }

  handleInput(e) {
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit() {
    let that = this;
    let data = {
      message: this.state.message,
      email: that.props.email,
      user_id: that.props.user_id
    };

    let json = JSON.stringify(data);

    fetch("http://localhost:5000/feedback/", {
      method: "POST",
      body: json,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(() => { //unused param response
      this.handleClose();
      alert("Thanks, feedback successfully submitted!");
    })
  }
  
  render() {
    return (
      <div>
        <button className={"NavLinkButton"} onClick={this.handleClickOpen}>
          Give Feedback
          </button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Feedback</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please help us by providing feedback. Be as specific as you wish, and submit
              as many of these tickets as desired.
          </DialogContentText>
            <TextField
              autoFocus
              margin="none"
              id="name"
              type="text"
              multiline
              fullWidth
              placeholder="Give Feedback....."
              onChange={this.handleInput}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Feedback;