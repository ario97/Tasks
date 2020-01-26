var database = firebase.database().ref("Users/");
database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
var user_id = firebase.auth().currentUser.uid;

        snapshot.forEach(function(data){

            var name = data.val().Name;
            var surname= data.val().Surname;
			var email= data.val().Email;
			var password= data.val().Password;
		


            content += '<tr>';
            content += '<td>' + name + '</td>'; //column1
            content += '<td>' + surname + '</td>';//column2
             content += '<td>' + email + '</td>';//column2
              content += '<td>' + password + '</td>';//column2
            content += '</tr>';

    })

console.log(content);

         $('#ex-table').append(content);
    }
   $('#ex-table').DataTable();
});
function Logout(){firebase.auth().signOut().then(function() {
  // Sign-out successful.
window.location.href = "login2.html";
}, function(error) {
  // An error happened.

})}



