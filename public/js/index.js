// Get references to page elements
var napperText = $("#napper-text");
var $dreamTitle = $("#title-text");
var dreamDescription = $("#dream-description");
var $submitBtn = $("#submit");
var submitDream = $("#submitDream")
var napperList = $("#napper-list");
var specificUser = $(".specificUser");
var specificID = specificUser.parent().attr("data-userpageid")
// console.log(specificID)
// console.log(specificUser.text());

// The API object contains methods for each kind of request we'll make
var API = {
  postDream: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/naps",
      data: JSON.stringify(example)
    });
  },
  postUser: function(example) {
    console.log("test")
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/user",
      data: JSON.stringify(example)
    });
  },
  getDreams: function(id) {
    return $.ajax({
      url: "/addANap/:id",
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
    // //HAVE ERIC EXPLAIN DATA.MAP
    // var $examples = data.map(function(napper) {
    //   var $a = $("<a>")
    //     .text(napper.name)
    //     .attr("href", "/entry/" + napper.id);

    //   var $li = $("<li>")
    //     .attr({
    //       class: "list-group-item",
    //       "data-id": napper.id
    //     })
    //     .append($a);

    //   var $button = $("<button>")
    //     .addClass("btn btn-danger float-right delete")
    //     .text("ｘ");

    //   $li.append($button);

    //   return $li;
    // });

    // napperList.empty();
    // napperList.append($examples); 
    // location.reload();
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  // var nap = {
  //   // name: specificUser.text(),
  //   dreamTitle: $dreamTitle.val().trim(),
  //   description: dreamDescription.val().trim(),
  //   UserId: specificID
  // };
  
  var user = {
    name: napperText.val().trim()
  };

  if (!(user.name)) {
    alert("You must enter an example text and description!");
    return;
  }
  
  API.postUser(user).then(function(data,err) {
    console.log(data);
    console.log(err);
    window.location.replace("/addnaps/"+data.id)
  });

  // API.postDream(nap).then(function(data,err) {

  // }); 

  napperText.val("");
  dreamDescription.val("");
};


//submitting a nap experience
var handleDreamSubmit = function(event) {
  event.preventDefault();

  var nap = {
    // name: specificUser.text(),
    dreamTitle: $dreamTitle.val().trim(),
    description: dreamDescription.val().trim(),
    UserId: specificID
  };

  if (!(nap.description)) {
    alert("You must enter a description!");
    return;
  }


  API.postDream(nap).then(function() {
    console.log("test 1")
  });

  $dreamTitle.val("");
  dreamDescription.val("");
  window.location.reload();
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
submitDream.on("click", handleDreamSubmit);
napperList.on("click", ".delete", handleDeleteBtnClick);
