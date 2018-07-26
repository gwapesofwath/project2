// Get references to page elements
var napperText = $("#napper-text");
var $dreamTitle = $("#title-text");
var dreamDescription = $("#dream-description");
var dreamDuration = $("#dream-duration");
var $submitBtn = $("#submit");
var submitDream = $("#submitDream")
var deleteButton = $(".delete");
var specificUser = $(".specificUser");
var specificID = specificUser.parent().attr("data-userpageid");
var editButton = $("#edit");
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
    // console.log("test")
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
      url: "/api/nappers/" + id,
      type: "DELETE"
    });
  },
  editDream: function(data) {
    console.log("test")
    return $.ajax({
      type: "PUT",
      url: "/api/naps",
      data: data
    });
  }
};













// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getDreams().then(function(data) {
    location.reload();
  });
};






// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

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
    duration: parseInt(dreamDuration.val().trim()),
    UserId: specificID
  };

  if (!(nap.description)) {
    alert("You must enter a description!");
    return;
  }


  API.postDream(nap).then(function() {
    window.location.reload();
  });

  $dreamTitle.val("");
  dreamDescription.val("");

};















// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteDream(idToDelete).then(function() {
    window.location.reload();
  });
};











// var handleEditBtn = function() {
//   var idToedit = $(this)
//   event.preventDefault();

//   var nap = {
//     // name: specificUser.text(),
//     dreamTitle: $dreamTitle.val().trim(),
//     description: dreamDescription.val().trim(),
//     duration: dreamDuration.val().trim(),
//     UserId: specificID
//   };

//   if (!(nap.description)) {
//     alert("You must enter a description!");
//     return;
//   }


//   API.editDream(nap).then(function() {
//     window.location.reload();
//   });

//   $dreamTitle.val("");
//   dreamDescription.val("");
// };

$(document).ready(function() {
  function editTodo() {
    var currentTodo = $(this).data("description");
    $(this).children().hide();
    $(this).children("input.edit").val(currentTodo.description);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // This function starts updating a todo in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    var updatedTodo = $(this).data("description");
    if (event.which === 13) {
      updatedTodo = $(this).children("input").val().trim();
      $(this).blur();
      updateTodo(updatedTodo);
    }
  }

  // This function updates a todo in our database
  function updateTodo(todo) {
    $.ajax({
      method: "PUT",
      url: "/api/naps",
      data: todo
    }).then(window.location.reload());
  }
});


// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
submitDream.on("click", handleDreamSubmit);
deleteButton.on("click", handleDeleteBtnClick);
// editButton.on("click", handleEditBtn);
