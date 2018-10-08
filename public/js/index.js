$(document).ready(function () {

  $(document).on("click", "#scrape-articles", handleArticleScrape);
  $(document).on("click", ".btn.save-articles", handleArticleSave);
  $(document).on("click", ".btn.unsave-articles", handleArticleUnsave);
  $(document).on("click", ".btn.save-notes", handleNoteSave);
  $(document).on("click", "#clear", handleArticleClear);

  function handleArticleScrape() {
    $.get("/api/scrape").then(function () {
      window.location.href = "/scrapedArticles"
    })
  }

  function handleArticleSave() {
    $(this).parents(".col-sm-6").remove();
    var thisId = $(this).attr("data-id");
    $.post("/api/save/" + thisId).then(function (data) {
      console.log(data);
    })
  }

  function handleArticleUnsave() {
    $(this).parents(".col-sm-6").remove();
    var thisId = $(this).attr("data-id");
    $.post("/api/unsave/" + thisId).then(function (data) {
      console.log(data);
    })
  }

  function handleNoteSave() {
    var thisId = $(this).attr("data-id");
    var body = $("#noteFormControlTextarea").val().trim();
    if(body === "") {
      // Put in a popover or validation messege in the future
    } else {
      $.post("api/note/save/" + thisId, { body: body }).then(function (data) {
        console.log("This happens after our promise for saving note: ", data)
      });
    }
  }

  function handleArticleClear() {
    $.get("api/clear").then(function () {
      window.location.href = "/";
    });
  }
});
