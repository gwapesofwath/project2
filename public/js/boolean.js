var sleepy = $(".changeSleepStatus").val().trim();
var targetDiv = $(".changeSleepStatus");
var boolean = $(".sleepy").data("boolean");
var editPageUserIDuser = $(".getId").data("userpageid");

if (boolean === false) {
    $(".sleepy").text('Awake')
}
else {
    $(".sleepy").text('Asleep')
}
  

console.log(boolean);

function changeBoolean() {

    if (boolean === false) {
        boolean = true
    }
    else {
        boolean = false
    }

console.log(boolean);
    

    $.ajax({
        method: "PUT",
        url: "/api/boolean/" + editPageUserIDuser,
        data: {status : boolean}
      }).then(
        window.location.replace("/user/"+editPageUserIDuser)
      );
}

targetDiv.on("click", changeBoolean);


