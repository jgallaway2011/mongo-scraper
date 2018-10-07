var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function (app) {
    app.get("/api/scrape", function (req, res) {
        // First, we grab the body of the html with request
        axios.get("https://www.nytimes.com/section/us").then(function (response) {
            // Then, we load that into cheerio and save it to $ for a shorthand selector
            var $ = cheerio.load(response.data);

            $("article").each(function (i, element) {

                var result = {};

                result.title = $(this).find("h2").find("a").text();
                result.link = $(this).find("h2").find("a").attr("href");
                result.summary = $(this).find("p.summary").text();
                result.image = $(this).find("figure").find("img").attr("src");

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

    // Route for chaning state of article to true for the saved boolean
    app.post("/api/save/:id", function (req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { "saved": true })
            .then(function (dbArticle) {
                console.log(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });
    });

    // Route for chaning state of article to false for the saved boolean
    app.post("/api/unsave/:id", function (req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.id }, { "saved": false })
            .then(function (dbArticle) {
                console.log(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });
    });


    // Route for chaning state of article to false for the saved boolean
    app.post("/api/comment/:id", function (req, res) {
        db.Note.find({ _id: req.params.id })
            .then(function (dbArticle) {
                console.log(dbArticle);
                res.send(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                return res.json(err);
            });
    });

    app.get("/api/clear", function (req, res) {
        db.Article.remove({})
            .then(function () {
                db.Note.remove({})
            }).then(function () {
                console.log("All Documents in Article and Note collection removed");
                res.redirect("/");
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                return res.json(err);
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

    // Route for getting all Articles from the db
    app.get("/api/articles/saved", function (req, res) {
        // Grab every document in the Articles collection
        db.Article.find({ "saved": true })
            .then(function (dbArticle) {
                // If we were able to successfully find Articles, send them back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    // Route for getting all Articles from the db
    app.get("/api/articles/unsaved", function (req, res) {
        // Grab every document in the Articles collection
        db.Article.find({ "saved": false })
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
