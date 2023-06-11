import React, { useState } from 'react';
import RichTextEditor from './RichTextEditor';
import { Container, Grid,  Button, Box } from '@material-ui/core'


export default function TextEditor({ prevStep, nextStep, handleChange,values}) {
        const [value, setValue] = useState("");
        const getValue = (value) => {
        setValue(value);
        
        };
        
        

        

        const Continue = (e) => {
                e.preventDefault();

                nextStep();

        };

        const Previous = e => {
                e.preventDefault();
                prevStep();
        }
       
       
        return (
                <>
                        <Container component="main" maxWidth="xs">
                                <Box m={4} sx={{
                                        my: 6,

                                }}>
                                        
                                                <form> 
                                                <RichTextEditor 
                                                initialValue="" 
                                                getValue={getValue} 
                                                       
                                                />
                                                  </form>
                                                <br />
                                                
                                        
                                </Box>
                                <form>
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
                                                        <br />
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
                        </Container>
                </>
        );
}


