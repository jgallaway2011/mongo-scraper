$(document).ready(function () {

  $(document).on("click", "#scrape-articles", handleArticleScrape);

  function handleArticleScrape() {
    $.get("/api/scrape").then(function(data) {
      console.log(data);
    }).then(function() {
      window.location.href = "/scrapedArticles";
    });
  }
});
