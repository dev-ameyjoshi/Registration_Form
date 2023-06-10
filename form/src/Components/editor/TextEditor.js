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


// import { Editor } from '@tinymce/tinymce-react';

// const editorRef = useRef(null);
        

//         const log = (current) => {
//                 if (editorRef.current) {
//                         console.log(editorRef.current.getContent());
//                 }
//         };



// {/* <TextField 
                                                        // onChange={handleChange('selfDescription')}
                                                        // value={values.selfDescription   }

                                                        // onChange={(e) => handleChange('selfDescription')(editorContent)}
                                                        // value={editorContent}

//                                                         /> */}
//                                                         <Editor
//                                                         apiKey='xju5ep9ajflw8gt9urw8592p9evvgbblcxdqe3ls8tpa4djt'
//                                                         onInit={(evt, editor) => editorRef.current = editor}

//                                                         initialValue="<p>Please Write about your journey in about 40-50 lines.</p>"
//                                                         init={{

//                                                                 height: 500,
//                                                                 menubar: false,
//                                                                 plugins: [
//                                                                         'advlist autolink lists link image charmap print preview anchor',
//                                                                         'searchreplace visualblocks code fullscreen',
//                                                                         'insertdatetime media table paste code help wordcount'
//                                                                 ],
//                                                                 toolbar: 'undo redo | formatselect | ' +
//                                                                         'bold italic backcolor | alignleft aligncenter ' +
//                                                                         'alignright alignjustify | bullist numlist outdent indent | ' +
//                                                                         'removeformat | help',
//                                                                 content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
//                                                         }}
//                                                         onChange={handleChange('selfDescription')}
//                                                         value={values.selfDescription   }

//                                                 />