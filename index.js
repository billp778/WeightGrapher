const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = express.Router();
const Weight = require("./model/weight");
const cors = require("cors");
const key = require("./config/keys");

app.use(express.json());
app.use(cors());

//--------------------------------------Mongo DataBase-----------------------------------------------------------------------
mongoose.Promise = global.Promise;
mongoose.connect(key.mongoURI, 
                { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,});
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB Connected!");
});

app.use(express.static(__dirname + "/dist"));


router.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
  });

  router.route("/add").post(function(req, res) {
    let location = new Weight(req.body);
    console.log(req.body);
    location
      .save()
      .then(location => {
        res.status(200).json({ location: "Location added!" });
        console.log("Location was logged");
      })
      .catch(err => {
        res.status(400).send(err);
      });
  });

  router.route("/get").get(function(req, res) {
    Weight.find(function(err, weight) {
      if (err) {
        console.log(err);
      } else {
        res.json(weight);
      }
    });
  });

  app.use("/", router);
  app.listen(process.env.PORT || 8000);