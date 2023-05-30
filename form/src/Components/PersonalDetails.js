import React,{useState} from 'react'
import { Container, Typography, Grid, TextField, Button,MenuItem,Box } from '@material-ui/core'
import FileUpload from './fileupload/file-upload.component';


const PersonalDetails = ({ prevStep, nextStep, handleChange, values,errors,files}) => {

  const [newUserInfo,setNewUserInfo] = useState({
    profileImages: []
  });

  const updateUploadedFiles = (files) =>
  setNewUserInfo({ ...newUserInfo, profileImages: files });

  

        
        const countryOptions = [
                { value: 'IN', label: 'India' },
                { value: 'US', label: 'United States' },
                { value: 'CA', label: 'Canada' },
                { value: 'GB', label: 'United Kingdom' },
                // Add more country options as needed
              ];
              const Continue = (e) => {
                e.preventDefault();
                if (errors) {
                  nextStep();
                }
              };

  const Previous = e => {
    e.preventDefault();
    prevStep();
  }

  return (
    <Container  component="main" maxWidth="xs">
      <div>
      <Box m={2} sx = {{
                                my : 4,
                                mx: 4,
                                display : 'flex',
                                flexDirection : 'Column',
                                alignItems:'center',
                                        }}>
        <Typography  component="h1" variant="h5">
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
                sx={{marginLeft : 0}}
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
                onChange={handleChange('levelOfEducation')}
                defaultValue={values.levelOfEducation}
                autoComplete="Level of Education"
                fullWidth
              />
            </Grid>
            
            {/* Upload Component */}
             <Grid item xs = {12}>
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
                onClick={ Previous }
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
                onClick={ Continue }
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
