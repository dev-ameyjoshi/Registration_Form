import React from "react";
import { useState } from "react";
import assets from "../assets/assets.gif";
import axios from "axios";
import "../../App.css";
import UploadFileIcon from '@mui/icons-material/UploadFile';


export default function UploadImage() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function uploadSingleImage(base64) {
    setLoading(true);
    axios
      .post("http://localhost:8080/upload_aws", { 
        file: base64,
        filename:"A logo.jpg" 
        })
      .then((res) => {
        setUrl(res.data.url);
        alert("Image uploaded Succesfully");
      })
      .then(() => setLoading(false))
      .catch(console.log);
  }

  function uploadMultipleImages(images) {
    setLoading(true);
    axios
      .post("http://localhost:8080/uploadMultipleImages", { images })
      .then((res) => {
        setUrl(res.data);
        alert("Image uploaded Succesfully");
      })
      .then(() => setLoading(false))
      .catch(console.log);
  }

  const uploadImage = async (event) => {
    const files = event.target.files;
    console.log(files.length);

    if (files.length === 1) {
      const base64 = await convertBase64(files[0]);
      uploadSingleImage(base64);
      return;
    }

    const base64s = [];
    for (var i = 0; i < files.length; i++) {
      var base = await convertBase64(files[i]);
      base64s.push(base);
    }
    uploadMultipleImages(base64s);
  };

  function UploadInput() {
    return (
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-2 pb-3">
          <UploadFileIcon  sx={{ width: 150, height: 190, paddingLeft:14}}/>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            onChange={uploadImage}
            id="dropzone-file"
            type="file"
            className="hidden"
            multiple
          />
        </label>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-col m-8 ">
      <div>
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Upload Photo
        </h2>
      </div>
      <div>
        {url && (
          <div>
            Access you file at{" "}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </div>
        )}
      </div>
      <div>
        {loading ? (
          <div className="flex items-center justify-center">
            <img src={assets} />{" "}
          </div>
        ) : (
          <UploadInput />
        )}
      </div>
    </div>
  );
}




















// import React, { useState, useRef } from 'react'
// import assets from "../assets/assets.gif";
// import axios from "axios";

// import {
//         FileUploadContainer,
//         FormField,
//         DragDropText,
//         UploadFileBtn,
//         FilePreviewContainer,
//         ImagePreview,
//         PreviewContainer,
//         PreviewList,
//         FileMetaData,
//         RemoveFileIcon,
//         InputLabel
// } from "./file-upload.styles";

// const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;
// const KILO_BYTES_PER_BYTE = 1000;

// const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

// const convertNestedObjectToArray = (nestedObj) =>
//         Object.keys(nestedObj).map((key) => nestedObj[key]);

// const FileUpload = ({
//         label,
//         updateFilesCb,
//         maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
//         ...otherProps
// }) => {
//         const fileInputField = useRef(null);
//         const [files, setFiles] = useState({});

//         const handleUploadBtnClick = () => {
//                 fileInputField.current.click();
//         };


//         const addNewFiles = (newFiles) => {
//                 for (let file of newFiles) {
//                         if (file.size < maxFileSizeInBytes) {
//                                 if (!otherProps.multiple) {
//                                         return { file };
//                                 }
//                                 files[file.name] = file;
//                         }
//                 }
//                 return { ...files };
//         };

//         const callUpdateFilesCb = (files) => {
//                 const filesAsArray = convertNestedObjectToArray(files);
//                 updateFilesCb(filesAsArray);
//         };

//         const handleNewFileUpload = (e) => {
//                 const { files: newFiles } = e.target;
//                 if (newFiles.length) {
//                         let updatedFiles = addNewFiles(newFiles);
//                         setFiles(updatedFiles);
//                         callUpdateFilesCb(updatedFiles);
//                 }
//         };

//         const removeFile = (fileName) => {
//                 delete files[fileName];
//                 setFiles({ ...files });
//                 callUpdateFilesCb({ ...files });
//         };

//         return (
//                 <>
//                         <FileUploadContainer>

//                                 {/* <span>Please Upload Proof Of Identification</span> */}
//                                 <InputLabel>{label}</InputLabel>
//                                 <DragDropText>Drag and drop your files anywhere or</DragDropText>
//                                 <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
//                                         <i className="fas fa-file-upload" />
//                                         <span>Upload {otherProps.multiple ? "files" : "a file"}</span>
//                                 </UploadFileBtn>
//                                 <FormField
//                                         type="file"
//                                         ref={fileInputField}
//                                         onChange={handleNewFileUpload}
//                                         title=""
//                                         value=""
//                                         {...otherProps}
//                                 />
//                         </FileUploadContainer>

//                         <FilePreviewContainer>
//                                 {/* <span>To Upload</span> */}
//                                 <PreviewList>
//                                         {Object.keys(files).map((fileName, index) => {
//                                                 let file = files[fileName];
//                                                 let isImageFile = file.type.split("/")[0] === "image";
//                                                 return (
//                                                         <PreviewContainer key={fileName}>
//                                                                 <div>
//                                                                         {isImageFile && (
//                                                                                 <ImagePreview
//                                                                                         src={URL.createObjectURL(file)}
//                                                                                         alt={`file preview${index}`}
//                                                                                 />
//                                                                         )}
//                                                                         <FileMetaData isImageFile={isImageFile}>
//                                                                                 <span>{file.name}</span>
//                                                                                 <aside>
//                                                                                         <span>
//                                                                                                 {convertBytesToKB(file.size)}kb
//                                                                                         </span>
//                                                                                         <RemoveFileIcon
//                                                                                                 className='fas fa-trash-alt'
//                                                                                                 onClick={() => removeFile(fileName)}
//                                                                                         />

//                                                                                 </aside>
//                                                                         </FileMetaData>
//                                                                 </div>
//                                                         </PreviewContainer>
//                                                 );
//                                         })}
//                                 </PreviewList>
//                         </FilePreviewContainer>
//                 </>
//         );
// };

// export default FileUpload;