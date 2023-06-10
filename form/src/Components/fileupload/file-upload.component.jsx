import React from "react";
import { useState } from "react";
import assets from "../assets/assets.gif";
import axios from "axios";
import "../../App.css";
import UploadFileIcon from '@mui/icons-material/UploadFile';


export default function UploadImage() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  //Functions for images if they are single or multiple images.
  //Function for downloadable file link is also generated here.

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
        filename: "A logo.jpg"
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

  //Main Component 
  function UploadInput() {
    return (
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-2 pb-3">
            <UploadFileIcon sx={{ width: 85, height: 100, paddingLeft: 23 }} />
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




















