import React from 'react'
import { Container, Grid, List, ListItem, ListItemText, Button } from '@material-ui/core'
import UserService from '../services/UserService.js';
import axios from 'axios';

class Confirmation extends React.Component {
  constructor(values) {
    super(values);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeHighestEducation = this.onChangeHighestEducation.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangeSelfDescription = this.onChangeSelfDescription.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);
   

    this.state = {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      country: "",
      highestEducation: "",
      dateOfBirth:"",
      selfDescription:"",
      submitted: false
    };
  }

  onChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangeLastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeUserName(e) {
    this.setState({
      userName: e.target.value
    });
  }

  onChangeCountry(e) {
    this.setState({
      country: e.target.value
    });
  }

  onChangeHighestEducation(e) {
    this.setState({
      highestEducation: e.target.value
    });
  }
  onChangeDateOfBirth(e){
    this.setState({
      dateOfBirth: e.target.value
    });
  }
  onChangeSelfDescription(e){
    this.setState({
      selfDescription: e.target.value
    });
  }
  saveUser(values) {
    var data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      userName: values.userName,
      country: values.country,
      highestEducation: values.highestEducation,
      dateOfBirth:values.dateOfBirth,
      selfDescription:values.selfDescription
    };
    console.log(data);

    UserService.create(data)
      .then(res => {
        this.setState({
          id: res.data.id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          userName: res.data.userName,
          country: res.data.country,
          highestEducation: res.data.highestEducation,
          dateOfBirth:res.data.dateOfBirth,
          selfDescription:res.data.selfDescription,

          submitted: true
        });
        console.log(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      country: "",
      highestEducation: "",
      dateOfBirth:"",
      selfDescription:"",

      submitted: false
    });
  }

  render(){
    
  const {prevStep,nextStep,values} = this.props;

  const { firstName, lastName, email, userName, country,  dateOfBirth,highestEducation,selfDescription } = values
  console.log(values);
  const Continue = e => {
    e.preventDefault();
    axios.get('http://localhost:8080/signup')
    .then(console.log("Sent Mail!"));
    this.saveUser(values);
    nextStep();
    
  }

  const Previous = e => {
    e.preventDefault();
    prevStep();
  }

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <List>
          <ListItem>
            <ListItemText primary="Email" secondary={email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Username" secondary={userName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="First Name" secondary={firstName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Date Of Birth" secondary={dateOfBirth} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Last Name" secondary={lastName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Country of Residence" secondary={country} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Level of Education" secondary={highestEducation} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Journey" secondary={selfDescription} />
          </ListItem>
          
          
        </List>

        <br />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={Previous}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Previous
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={Continue}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Confirm & Continue
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
  }
}


export default Confirmation;