const express = require("express");
const cors = require("cors");

const app = express();
const sendMail = require("./form/src/controllers/sendMail");
var corsOptions = {
        origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

// Send Mail Component ,change /mail accordingly 
// according to the page its suppose to load from maybe /users or on the page it actually is from.
app.get("/Signup",sendMail);

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

