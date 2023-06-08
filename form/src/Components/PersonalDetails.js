import React, { useState } from 'react'
import { Container, Typography, Grid, TextField, Button, MenuItem, Box } from '@material-ui/core'
import FileUpload from './fileupload/file-upload.component';
import { isWidthDown } from "@material-ui/core/withWidth";
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import MuiPicker from './MuiPicker/MuiPicker.jsx';



const PersonalDetails = ({ prevStep, nextStep, handleChange, values, errors, files }) => {

  const [newUserInfo, setNewUserInfo] = useState({
    profileImages: []
  });

  const updateUploadedFiles = (files) =>
    setNewUserInfo({ ...newUserInfo, profileImages: files });

  const dateLimit = new Date();
  dateLimit.setFullYear(dateLimit.getFullYear() - 18);

  const countryOptions = [
    { value: 'IN', label: 'India' },
    { value: 'US', label: 'United States' },
    { value: 'CA', label: 'Canada' },
    { value: 'GB', label: 'United Kingdom' },
    // Add more country options as needed
  ];
  const Continue = (e) => {
    e.preventDefault();

    nextStep();

  };

  const Previous = e => {
    e.preventDefault();
    prevStep();
  }

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Box m={2} sx={{
          my: 4,
          mx: 4,
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
              />
            </Grid>
            {/* last name */}
            <Grid item xs={12} sm={6}>
              <TextField
                placeholder="Last Name"
                label="Last Name"
                onChange={handleChange('lastName')}
                defaultValue={values.lastName}
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
                error={!!errors.country}
                helperText={errors.country}
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

                <FileUpload
                  accept=".jpg,.png,.jpeg"
                  label="Upload : Proof Of Identification(Max Size accepted : 500 KB)"
                  multiple
                  updateFilesCb={updateUploadedFiles}
                />
                {/* <button type="submit">Create New User</button> */}
              </form>
            </Grid>


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
                Next
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default PersonalDetails
