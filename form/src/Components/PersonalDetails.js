import React, { useState } from 'react'
import { Container, Typography, Grid, TextField, Button, MenuItem, Paper, Box } from '@material-ui/core'
import { isWidthDown } from "@material-ui/core/withWidth";
import UploadImage from "../Components/fileupload/file-upload.component";
import axios from 'axios';

const PersonalDetails = ({ prevStep, nextStep, handleChange, values, errors, files }) => {

  const [formErrors, setFormErrors] = useState({});

  // const [newUserInfo, setNewUserInfo] = useState({
  //   profileImages: []
  // });

  // const updateUploadedFiles = (files) =>
  //   setNewUserInfo({ ...newUserInfo, profileImages: files });

  const dateLimit = new Date();
  dateLimit.setFullYear(dateLimit.getFullYear() - 18);

  const countryOptions = [
    { value: 'IN', label: 'India' },
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'GB', label: 'United Kingdom' },
    // Add more country options as needed
  ];
  // const Continue = (e) => {
  //   e.preventDefault();
  //   axios.get('http://localhost:8080/signup')
  //   .then(console.log("Uploaded Image!"));
  //   nextStep();

  // };

  // const Continue = (e) => {
  //   e.preventDefault();

  //   // Check if any fields are empty
  //   const emptyFields = Object.values(values).filter(value => value === "");

  //   if (emptyFields.length > 0) {
  //     // Show error message or perform other error handling
  //     console.log("Please fill in all fields.");
  //     return;
  //   }

  //   axios.get('http://localhost:8080/signup')
  //     .then(console.log("Uploaded Image!"));
  //   nextStep();
  // };

  const Continue = (e) => {
    e.preventDefault();

    // Validate fields
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "First name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!values.country) {
      errors.country = "Country is required";
    }
    if (!values.highestEducation) {
      errors.highestEducation = "Level of Education is required";
    }
    if (!values.dateOfBirth) {
      errors.dateOfBirth = "Date of Birth is required";
    }

    // Update formErrors state
    setFormErrors(errors);

    // Proceed to the next step only if there are no errors
    if (Object.keys(errors).length === 0) {
      axios.get('http://localhost:8080/signup')
        .then(console.log("Uploaded Image!"));
      nextStep();
    }
  };

  const Previous = e => {
    e.preventDefault();
    prevStep();
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 5 }}>
      <br />
      <Paper variant="outlined" sx={{ my: { xs: 4, md: 8 }, p: { xs: 1, md: 1 } }}>
        <div>

          <Box m={1} sx={{
            my: 2,
            mx: 2,
            padding: 4,
            display: 'flex',
            flexDirection: 'Column',
            alignItems: 'center',
          }}>
            <Box m={2} sx={{
              padding: 8,
              display: 'flex',
              flexDirection: 'Column',
              alignItems: 'center',
            }}>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>

            </Box>


            <form>
              <Grid container spacing={2}>

                {/* first name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="First Name"
                    label="First Name"
                    onChange={handleChange('firstName')}
                    defaultValue={values.firstName}
                    error={!!formErrors.firstName}
                    helperText={formErrors.firstName}
                  />
                </Grid>
                {/* last name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    placeholder="Last Name"
                    label="Last Name"
                    onChange={handleChange('lastName')}
                    defaultValue={values.lastName}
                    error={!!formErrors.lastName}
                    helperText={formErrors.lastName}
                  />
                </Grid>

                {/* country */}
                <Grid item xs={12}>
                  <TextField
                    sx={{ marginLeft: 0 }}
                    select
                    label="Country"
                    value={values.country}
                    onChange={handleChange('country')}
                    error={!!formErrors.country}
                    helperText={formErrors.country}
                    fullWidth
                  >
                    {countryOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* level of education */}
                <Grid item xs={12}>
                  <TextField
                    placeholder="Level of Education"
                    label="Level of Education"
                    onChange={handleChange('highestEducation')}
                    defaultValue={values.highestEducation}
                    autoComplete="Level of Education"
                    error={!!formErrors.highestEducation}
                    helperText={formErrors.highestEducation}
                    fullWidth
                  />
                </Grid>


                {/* Date of Birth component */}
                <Grid item xs={12}>
                  <TextField
                    type='date'
                    label='Birthdate'
                    onChange={handleChange('dateOfBirth')}
                    value={values.dateOfBirth}
                    helperText='You need to be at least 18 years old'
                    variant='outlined'
                    margin='normal'
                    InputLabelProps={{
                      shrink: true
                    }}
                    fullWidth={isWidthDown("sm")}
                  />
                </Grid>

                {/* Upload Component */}
                <Grid item xs={12}>
                  <form onSubmit={Continue}>
                    <UploadImage />
                    {/* <FileUpload
                  accept=".jpg,.png,.jpeg"
                  label="Upload : Proof Of Identification(Max Size accepted : 500 KB)"
                  multiple
                  updateFilesCb={updateUploadedFiles}
                />
                <button type="submit">Create New User</button> */}
                  </form>
                </Grid>


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
                    Next
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </div>

      </Paper>
    </Container>
  )
}

export default PersonalDetails
