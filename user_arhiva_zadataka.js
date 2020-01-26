var database = firebase.database().ref("Tasks/");
database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
var user_id = firebase.auth().currentUser.uid;
console.log(user_id);

        snapshot.forEach(function(data){
console.log(data.val().User); 
        	if (data.val().User == user_id ) {
                console.log(data.val().Status);
                var status = data.val().Status;
                
                

                if(status == "Obavljeno"){
                    var key = data.key; 
                  console.log(data.val().Status);
            var opis = data.val().Opis;
            var rok= data.val().Rok;
			
		




            content += '<tr>';
            content += '<td>' + opis + '</td>'; //column1
            content += '<td>' + rok + '</td>';//column2
           
             // content += '<td>'  + '<button class="myBtn" onclick=" openModal( \''+ opis + '\' ,\'' + rok +'\' , \'' + korisnik +'\'); "> Uredi</button>' + '</td>';
            content += '</tr>';
$('#ex-table').append(content);
content = '';


        }}});
        $(document).ready(function(){
$('#ex-table').DataTable();
});


        // $('#ex-table').append(content);
    }
});


function Logout(){firebase.auth().signOut().then(function() {
  // Sign-out successful.
window.location.href = "login2.html";
}, function(error) {
  // An error happened.

})}