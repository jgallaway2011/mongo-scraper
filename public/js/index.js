$(document).ready(function () {

  $(document).on("click", "#scrape-articles", handleArticleScrape);
  $(document).on("click", ".save-articles", handleArticleSave);

  function handleArticleScrape() {
    $.get("/api/scrape").then(function(data) {
      console.log(data);
    }).then(function() {
      window.location.href = "/scrapedArticles";
    });
  }

  function handleArticleSave() {
    console.log("Made it this far");
    var thisId = $(this).attr("data-id");
    $.put("/api/save/" + thisId).then(function(data) {
      console.log(data);
    }).then(function() {
      window.location.href = "/scrapedArticles";
    });
  }
});
