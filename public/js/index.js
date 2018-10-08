$(document).ready(function () {

  $(document).on("click", "#scrape-articles", handleArticleScrape);
  $(document).on("click", ".btn.save-articles", handleArticleSave);
  $(document).on("click", ".btn.unsave-articles", handleArticleUnsave);
  $(document).on("click", ".btn.note-articles", handleNoteDisplay);
  $(document).on("click", ".btn.note-save", handleNoteSave);
  $(document).on("click", ".btn.note-delete", handleNoteDelete);
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

  function handleNoteDisplay() {
    var thisId = $(this).attr("data-id");
    handleGetNotes(thisId);
  }

  function handleGetNotes(thisId) {
    $.get("/api/notes/" + thisId).then(function (data) {
      console.log("This is the console for handleNoteDisplay:", data);
      $("#note-ul").empty();
      for (i = 0; i < data.length; i++) {
        var note = data[i].body;
        var id = data[i].article;
        console.log(note);
        // Stores button in memory
        var noteLI = $("<li data-id=" + id + ">" + note + "<button class='btn btn-danger note-delete'>x</button></li><hr>");

        // Append the li to the ul
        $("#note-ul").append(noteLI);
      }
    });
  }

  function handleNoteSave() {
    var thisId = $(this).attr("data-id");
    var body = $("#noteFormControlTextarea").val().trim();
    if (body === "") {
      // Put in a popover or validation messege in the future
    } else {
      $.post("api/note/save/" + thisId, { body: body }).then(function (data) {
        console.log("This happens after our promise for saving note: ", data)
      });
    }
  }

  function handleNoteDelete() {
    var thisId = $(this).attr("data-id");
    $.post("api/note/delete/" + thisId).then(function (data) {
      console.log("This happens after our promise for deleting note: ", data)
    });
  }

  function handleArticleClear() {
    $.get("api/clear").then(function () {
      window.location.href = "/";
    });
  }
});
