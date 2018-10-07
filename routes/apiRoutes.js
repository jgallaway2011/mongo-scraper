var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {
    app.get("/api/scrape", function (req, res) {
        // First, we grab the body of the html with request
        axios.get("https://www.nytimes.com/section/us").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            $("article h2").each(function (i, element) {

                var result = {};

                result.title = $(this).children("a").text();
                result.link = $(this).children("a").attr("href");
                result.image = $(this).children("a").attr("href");

                db.Article.create(result)
                    .then(function (dbArticle) {
                        // View the added result in the console
                        console.log(dbArticle);
                    })
                    .catch(function (err) {
                        // If an error occurred, send it to the client
                        return res.json(err);
                    });
            });
        });
    });


    // Route for getting all Articles from the db
    app.get("/api/articles", function (req, res) {
        // Grab every document in the Articles collection
        db.Article.find({})
            .then(function (dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });
};