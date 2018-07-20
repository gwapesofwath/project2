// Get references to page elements
var napperText = $("#napper-text");
var dreamDescription = $("#dream-description");
var $submitBtn = $("#submit");
var napperList = $("#napper-list");

// The API object contains methods for each kind of request we'll make
var API = {
  postDream: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/addnappers",
      data: JSON.stringify(example)
    });
  },
  getDreams: function() {
    return $.ajax({
      url: "api/addANap",
      type: "GET"
    });
  },
  deleteDream: function(id) {
    return $.ajax({
      url: "api/nappers/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getDreams().then(function(data) {
    //HAVE ERIC EXPLAIN DATA.MAP
    var $examples = data.map(function(napper) {
      var $a = $("<a>")
        .text(napper.name)
        .attr("href", "/entry/" + napper.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": napper.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    napperList.empty();
    napperList.append($examples);
    location.reload();
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    name: napperText.val().trim(),
    description: dreamDescription.val().trim()
  };

  if (!(example.name && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.postDream(example).then(function() {
    refreshExamples();
  });

  napperText.val("");
  dreamDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteDream(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
napperList.on("click", ".delete", handleDeleteBtnClick);
