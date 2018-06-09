//Require modules and models

var express = require("express");
var models = require("./models/index");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();

//Set view engine

app.set("view engine", "ejs");

//Middleware

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(methodOverride("_method"));

app.get("/", function(req, res) {
    res.redirect(301, "/chirps");
});

//Get all chirps
app.get("/chirps", function(req, res) {
  // Step 1: Retrieve all chirps from DB
  models.Chirp.findAll().then(function(chirps) {
    // Step 2: Build HTML based on chirps retrieved
    // Step 3: Send back HTML to the browser
    res.render("index", { chirps });
    // To see site, navigate to http://localhost:3000/chirps
  });
});

//Create new chirp
app.post("/chirps", function(req, res) {
  // Step 1: Retrieve new chirp from the form submission
  var newChirp = req.body;

  // Step 2: Save new chirp to the DB
  models.Chirp.create(newChirp).then(function() {
    // Step 3: Redirect user to show all chirps page
    res.redirect("/chirps");
  });
});

//Get specific chirp

//Edit a chirp

//Delete a chirp

app.listen(process.env.PORT || 3000);
