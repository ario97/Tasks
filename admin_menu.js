
$( document ).ready(function() {

      
  var content = '';
var database2 = firebase.database().ref("Admins/");
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




function Logout(){firebase.auth().signOut().then(function() {
  // Sign-out successful.
window.location.href = "login2.html";
}, function(error) {
  // An error happened.

})}





var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
   $('#success_message').hide();
   loadEmptyModal();
    enableModal();
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


 $(document).ready(function() {
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            birthday: {
                validators: {
                    date: {
                        format: 'DD/MM/YYYY',
                        message: 'Datum nije ispravnog formata.'
                    }
                }
            },
            
            comment: {
                validators: {
                      stringLength: {
                        min: 10,
                        max: 500,
                        message:'Molim unesite najmanje 10, a najviše 500 simbola.'
                    },
                    notEmpty: {
                        message: 'Molim unesite opis zadatka.'
                    }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
         
        });
});

var database = firebase.database().ref("Users/");
database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
        snapshot.forEach(function(data){

            var name = data.val().Name;
            var surname= data.val().Surname;
	
		
            content += '<option>';
            content +=  name + " " + surname;
            content +=  '</option>'; 
    
    })



         $('#ex-option').append(content);
    }
});







var counter = 1;
var databaseTasks = firebase.database().ref("Tasks/");
database.once('value', function(snapshot){
    if(snapshot.exists()){
        snapshot.forEach(function(data){
        counter += 1;        
    })
}});

function loadEmptyModal(){
    $("#ex-option").val("Edgar Poe")
$("#textarea1").val("");
$("#textarea2").val("");

};

function disableModal(){
    $("#ex-option").attr("disabled", true) 
$("#textarea1").attr("disabled", true);
$("#textarea2").attr("disabled", true);

};

function enableModal(){
    $("#ex-option").attr("disabled", false) 
$("#textarea1").attr("disabled", false);
$("#textarea2").attr("disabled", false);

};



function dodajZadatak(){



var korisnik = $("#ex-option :selected").val();
console.log(korisnik);
var opis = $("#textarea1").val();
var rok = $("#textarea2").val();
 var user_id = firebase.auth().currentUser.uid;
 console.log(user_id);
  var content = '';
var database2 = firebase.database().ref("Users/");
database2.once('value', function(snapshot){
    if(snapshot.exists()){
     
        snapshot.forEach(function(data){
        	  var name = data.val().Name + " " + data.val().Surname;
           console.log(name);
           console.log(korisnik);
        	if (name == korisnik) {
        			content = data.val().userId;
        			  console.log(content);
        	
       

console.log(counter);
console.log(user_id);
	console.log(opis);
		console.log(rok);
		console.log(content);
databaseTasks.push({
	
	
		Admin: user_id,
		
		Opis: opis,
		
		Rok: rok,
		
		Status: "Nije obavljeno", 
		User: content
		
	

});
disableModal();


  }  })
}});
}