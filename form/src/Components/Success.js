import React, { Component } from 'react';
// import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { Box } from '@material-ui/core'

export class Success extends Component {
  continue = e => {
    e.preventDefault();
    // PROCESS FORM //
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <MuiThemeProvider>
        <>
          
            <AppBar title="Success" />
            <Box m={2} sx = {{
                                my : 8,
                                mx: 4,
                                display : 'flex',
                                flexDirection : 'Column',
                                alignItems:'center',
                                        }}>
            <h1>Thank You For Your Submission</h1>
            </Box>
         
        </>
      </MuiThemeProvider>
    );
  }
}

export default Success;