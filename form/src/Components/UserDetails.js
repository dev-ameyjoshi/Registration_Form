import React from 'react'

import { Container, Typography, Grid, TextField, Button, Box } from '@material-ui/core'

const UserDetails = ({ nextStep, handleChange, values, errors }) => {

  // for continue event listener
  const Continue = (e) => {
    e.preventDefault();
    if (errors) {
      nextStep();
    }
  };

  return (

    <Container component="main" maxWidth="xs">
      <Box m={8}>
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
            <Button
              onClick={Continue}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Next
            </Button>
          </form>
        </div>
      </Box>
    </Container>
  )
}

export default UserDetails