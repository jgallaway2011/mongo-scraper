$(document).ready(function () {

  $(document).on("click", "#scrape-articles", handleArticleScrape);
  $(document).on("click", ".btn.save-articles", handleArticleSave);
  $(document).on("click", ".btn.unsave-articles", handleArticleUnsave);
  $(document).on("click", "#clear", handleArticleClear);

  function handleArticleScrape() {
    $.get("/api/scrape").then(function() {
      window.location.href = "/scrapedArticles"
    })
  }

  function handleArticleSave() {
    var thisId = $(this).attr("data-id");
    $.post("/api/save/" + thisId).then(function(data) {
      console.log(data);
    }).then(function() {
      window.location.href = "/scrapedArticles";
    })
  }

  function handleArticleUnsave() {
    var thisId = $(this).attr("data-id");
    $.post("/api/unsave/" + thisId).then(function(data) {
      console.log(data);
    }).then(function() {
      // window.location.href = "/scrapedArticles";
      location.reload(true);
    })
  }

  function handleArticleClear() {
    $.get("api/clear").then(function() {
      window.location.href = "/";
    });
  }

});
