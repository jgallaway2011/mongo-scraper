var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var cheerio = require("cheerio");
var request = require("request");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Handlebars
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Routes
// require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Request will be used to scrape articles from sites
request("https://www.nytimes.com/", function(error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  // var results = [];

  // $("p.title").each(function(i, element) {

  //   // Save the text of the element in a "title" variable
  //   var title = $(element).text();
  //   var link = $(element).children().attr("href");

  //   results.push({
  //     title: title,
  //     link: link
  //   });
  // });

  // Log the results once you've looped through each of the elements found with cheerio
  // console.log($);
});

// Starting the server
app.listen(PORT, function() {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});

// Exporting app
module.exports = app;
