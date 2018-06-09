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
app.get("/chirps/:id/edit", function(req, res) {
  // Step 1: Retrieve specific chirp from DB via its ID
  models.Chirp.findById(req.params.id).then(function(chirp) {
    // Step 2: Build HTML based on data retrieved
    // Step 3: Send back HTML to browser
    res.render("edit", { chirp });
  });
});

//Edit a chirp
app.put("/chirps/:id", function(req, res) {
  // Step 1: Retrieve updated chirp text from form submission
  var editedChirp = req.body;

  // Step 2: Find specific chirp via its ID
  models.Chirp.findById(req.params.id).then(function(chirp) {
    // Step 3: Update specific chirp with new data
    chirp.updateAttributes(editedChirp).then(function() {
      // Step 4: Redirect back to /chirps
      res.redirect("/chirps");
    });
  });
});

//Delete a chirp
app.delete("/chirps/:id", function(req, res) {
  // Step 1: Get specific chirp via its ID
  models.Chirp.findById(req.params.id).then(function(chirp) {
    // Step 2: Destroy specific chirp
    chirp.destroy().then(function() {
      // Step 3: Redirect user back to /chirps
      res.redirect("/chirps");
    });
  });
});

app.listen(process.env.PORT || 3000);
