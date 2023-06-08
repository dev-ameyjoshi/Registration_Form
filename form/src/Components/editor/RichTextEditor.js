import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import Signup from "../Signup";
const config = {
  buttons: ["bold", "italic", "link", "unlink", "underline", "source"],
};

const RichTextEditor = ({ initialValue, getValue}) => {
  const editor = useRef(null);

  return (
    <JoditEditor
      ref={editor}
      value={initialValue}
      config={config}
      tabIndex={1}
      //   onBlur={(newContent) => getValue(newContent)}
      onChange={(newContent) => getValue(newContent)}
      // onChange={handleChange('selfDescription')}
    />
  );
};

export default RichTextEditor;