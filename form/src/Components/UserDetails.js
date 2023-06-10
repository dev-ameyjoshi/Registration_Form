import React from 'react'
import { useState } from 'react';
import { Container, Typography, Grid, TextField, Button, Box, Paper } from '@material-ui/core'



const UserDetails = ({ nextStep, handleChange, values, errors }) => {

  // Validation if the user has filled all the fields or not is as follows : 
  const [formValid, setFormValid] = useState(true);
  // for continue event listener
  // const Continue = (e) => {
  //   e.preventDefault();
  //   if (errors) {
  //     nextStep();
  //   }
  // };


  const Continue = (e) => {
    e.preventDefault();
    const fields = ['email', 'userName', 'password'];
    let isValid = true;

    // Check if any fields are empty
    for (const field of fields) {
      if (!values[field]) {
        isValid = false;
        break;
      }
    }

    // Update form validation status
    setFormValid(isValid);

    // Proceed to the next step only if all fields are filled
    if (isValid) {
      nextStep();
    }
  };


// Components For user details is as follows : 

  return (

    <Container component="main" maxWidth="sm" sx={{ mb: 5 }}>
      <br />
      <Paper variant="outlined" sx={{ my: { xs: 4, md: 8 }, p: { xs: 2, md: 3 } }}>
        <Box m={8}>
          <div>
            <Box m={1} sx={{
              my: 2,
              mx: 2,
              padding: 4,
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
                {/* email address */}
                <Grid item xs={12}>
                  <TextField
                    placeholder="Email Address"
                    label="Email Address"
                    onChange={handleChange('email')}
                    defaultValue={values.email}
                    error={!!errors.email}
                    helperText={errors.email}
                    // variant="outlined"
                    autoComplete="email"
                    fullWidth

                  />
                </Grid>
                <br />
                {/* username */}
                <Grid item xs={12}>
                  <TextField
                    placeholder="Username"
                    label="Username"
                    onChange={handleChange('userName')}
                    defaultValue={values.userName}
                    error={!!errors.userName}
                    helperText={errors.userName}
                    // variant="outlined"
                    autoComplete="username"
                    fullWidth
                  />
                </Grid>
                <br />
                {/* password */}
                <Grid item xs={12}>
                  <TextField
                    placeholder="Password"
                    label="Password"
                    onChange={handleChange('password')}
                    defaultValue={values.password}
                    error={!!errors.password}
                    helperText={errors.password}
                    // variant="outlined"
                    autoComplete="password"
                    fullWidth
                    type="password"
                  />
                </Grid>
              </Grid>
              <br />
              {!formValid && (
                <Typography variant="body2" color="error">
                  All fields must be filled.
                </Typography>
              )}

              <br />
              <Button
                onClick={Continue}
                type="submit"
                fullWidth
                variant="text"
                color="success"
              >
                Next
              </Button>
            </form>
          </div>

        </Box>
      </Paper>
    </Container>
  )
}

export default UserDetails