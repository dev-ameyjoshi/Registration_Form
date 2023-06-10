const express = require("express");
const cors = require("cors");
const aws_upload = require("./form/uploadImages_S3.js");
const uploadImage = require("./uploadImage.js");

const app = express();
const sendMail = require("./form/src/controllers/sendMail.js");
var corsOptions = {
        origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "25mb" }));

app.use(express.urlencoded({limit: "25mb"}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

app.post("/upload_aws" ,(req,res) => {
  console.log("file");
  aws_upload(req.body)
  .then((url) => res.send(url))
  .catch((err) => {
  console.log(err);
  res.status(500).send(err);
  });
});

app.post("/uploadMultipleImages", (req, res) => {
  uploadImage
    .uploadMultipleImages(req.body.images)
    .then((urls) => res.send(urls))
    .catch((err) => res.status(500).send(err));
});


// Send Mail Component ,change /mail accordingly 
// according to the page its suppose to load from maybe /users or on the page it actually is from.
app.get("/signup",sendMail);

const db = require("./form/src/models/index.js");

// db.sequelize.sync({force:true}).then(() => {
//         console.log("Drop and re-sync db.");
// });

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/",(req,res) => {
        res.json({message:"Welcome to my application"});
})


require("./form/src/routes/user.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
        console.log(`Server is running on port ${PORT}`);
});

