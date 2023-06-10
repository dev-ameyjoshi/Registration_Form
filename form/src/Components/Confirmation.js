import React from 'react'
import { Container, Grid, List, ListItem, ListItemText, Button, Paper, Box } from '@material-ui/core'
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
    // this.onChangeSelfDescription = this.onChangeSelfDescription.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

// Original State
    this.state = {
      id: null,
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      country: "",
      highestEducation: "",
      dateOfBirth: "",
      // selfDescription:"",
      submitted: false
    };
  }

  // To assign values , for the required Fields.
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
  onChangeDateOfBirth(e) {
    this.setState({
      dateOfBirth: e.target.value
    });
  }
  // onChangeSelfDescription(e){
  //   this.setState({
  //     selfDescription: e.target.value
  //   });
  // }

  //Function To pass the credential values & to save it using UserService in DB.
  saveUser(values) {
    var data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      userName: values.userName,
      country: values.country,
      highestEducation: values.highestEducation,
      dateOfBirth: values.dateOfBirth,
      // selfDescription:values.selfDescription
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
          dateOfBirth: res.data.dateOfBirth,
          // selfDescription:res.data.selfDescription,

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
      dateOfBirth: "",
      // selfDescription:"",

      submitted: false
    });
  }

  render() {
// Parameters Passed Through Files and axios call to trigger nodemailer component.
    const { prevStep, nextStep, values } = this.props;

    const { firstName, lastName, email, userName, country, dateOfBirth, highestEducation } = values
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
// Main Components for the following Confirmation page is as follows:
    return (
      <Container component="main" maxWidth="sm" sx={{ mb: 5 }}>
        <br />
        <Paper variant="outlined" sx={{ my: { xs: 4, md: 8 }, p: { xs: 1, md: 1 } }}>
          <Box m={1} sx={{
            my: 2,
            mx: 2,
            padding: 4,
            display: 'flex',
            flexDirection: 'Column',

          }}>
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



              </List>

              <br />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    onClick={Previous}
                    type="submit"

                    fullWidth
                    variant="text"
                    color="success"
                  >
                    Previous
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    onClick={Continue}
                    type="submit"
                    fullWidth
                    variant="text"
                    color="success"
                  >
                    Confirm
                  </Button>
                </Grid>
              </Grid>

            </div>
          </Box>
        </Paper>
      </Container>
    );
  }
}


export default Confirmation;