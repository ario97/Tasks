$( document ).ready(function() {
    UcitajTablicu();
});

function UcitajTablicu(){
var database = firebase.database().ref("Tasks/");
database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
var user_id = firebase.auth().currentUser.uid;
console.log(user_id);

        snapshot.forEach(function(data){
console.log(data.val().User); 
        	if (data.val().User == user_id ) {
            if(data.val().Status != "Obavljeno"){
                    var key = data.key; 
            var opis = data.val().Opis;
            var rok= data.val().Rok;
			var status= data.val().Status;
			var user= data.val().User;
		

console.log(user);


            content += '<tr>';
            content += '<td>' + opis + '</td>'; //column1
            content += '<td>' + rok + '</td>';//column2
             content += '<td>' + status + '</td>';//column2
             content += '<td>'  + '<button class="myBtn" onclick="ModalUrediVijest(\''+key+'\');">Završi</button>' + '</td>';
             // content += '<td>'  + '<button class="myBtn" onclick=" openModal( \''+ opis + '\' ,\'' + rok +'\' , \'' + korisnik +'\'); "> Uredi</button>' + '</td>';
            content += '</tr>';
$('#ex-table').append(content);
content = '';


       } }});


 
$(document).ready(function(){

 $('#ex-table').DataTable().ajax.reload();

$('#ex-table').DataTable();
});
        // $('#ex-table').append(content);
    }
});
}

function Logout(){firebase.auth().signOut().then(function() {
  // Sign-out successful.
window.location.href = "login2.html";
}, function(error) {
  // An error happened.

})}

function ModalUrediVijest(sVijestKey)
{ 
  enableModal();
  console.log(sVijestKey);
  var oVijestRef = firebase.database().ref('Tasks/' + sVijestKey); // odabrana vijest

  oVijestRef.once('value', function(oOdgovorPosluzitelja)
  {
    var tasks = oOdgovorPosluzitelja.val();
    // Popunjavanje elemenata forme za uređivanje
    $('#textarea1').val(tasks.Opis);
      $('#textarea1').attr("disabled", true);
    //$('#txtEditTekstVijesti').val(oVijest.vijest_tekst);


$('#radio1').val(tasks.Status);

//$('#radio1').check(tasks.Status);

var radios = document.getElementsByName('hosting');

for (var i = 0, length = radios.length; i < length; i++) {
console.log("ide");
console.log(radios[i].value);
console.log(tasks.Status);
  if (radios[i].value == tasks.Status) {
    // do whatever you want with the checked radio
    radios[i].checked = true;
console.log("ide2");
    // only one radio can be logically checked, don't check the rest
    break;
  }
else{
//radios[i].checked = false;
}
// (radios[i].value === 'Nije obavljen' )

}






  
    $('#myModal').css("display", "block");
 $('#success_message').hide();
document.getElementById('urediZadatak').onclick = function() {
console.log(sVijestKey);
  var oVijestRef = firebase.database().ref('Tasks/' + sVijestKey);

  var sVijestNaziv = $('#textarea1').val();
  console.log(sVijestNaziv);
  //var sVijestTekst = $('#txtEditTekstVijesti').val();

var status = document.querySelector('input[name="hosting"]:checked').value;



  oVijestRef.update(
  {
"Opis": sVijestNaziv ,
	"Status":status
    
   
  });
 //$('#ex-option').empty();
disableModal();
$("#ex-table td").parent().remove();

console.log("ulazi ovdje");
UcitajTablicu();



}


  });
}

function SpremiUredjenuVijest(sVijestKey)
{
  console.log(sVijestKey);
  var oVijestRef = firebase.database().ref('Tasks/' + sVijestKey);

  var sVijestNaziv = $('#textarea1').val();
  console.log(sVijestNaziv);
  //var sVijestTekst = $('#txtEditTekstVijesti').val();

  oVijestRef.update(
  {
    "Opis": sVijestNaziv 
   
  });
 
}




var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementsByClassName("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



function disableModal(){



$('input[name="hosting"]').attr('disabled', 'disabled');

};

function enableModal(){

 
$('input[name="hosting"]').attr('disabled', false);

};


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	 $('#ex-option').empty();
	
  modal.style.display = "none";
 
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
  	    $('#ex-option').empty();
  
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



