function Logout(){firebase.auth().signOut().then(function() {
  window.location.href = "login2.html";
}, function(error) {
  // An error happened.

})}


$( document ).ready(function() {

      
  var content = '';
var database2 = firebase.database().ref("Users/");
database2.once('value', function(snapshot){
    if(snapshot.exists()){
     var user_id = firebase.auth().currentUser.uid;
        snapshot.forEach(function(data){
            if(data.val().userId == user_id){
              content = data.val().Name + " " + data.val().Surname;
            }
          
               }) };


document.getElementById("dobrodoslica").innerHTML = "Dobrodošli, " + content+"!";

});

});
