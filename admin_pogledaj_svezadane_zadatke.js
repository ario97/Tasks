

$( document ).ready(function() {

    UcitajTablicu();


});


function Logout(){firebase.auth().signOut().then(function() {
  // Sign-out successful.
window.location.href = "login2.html";
}, function(error) {
  // An error happened.

})}



function UcitajTablicu(){







var brojac = 0;
var content2='';
var count = 1;
var database = firebase.database().ref("Tasks/");
database.once('value', function(snapshot){
    if(snapshot.exists()){
        var content = '';
var content2='';
var user_id = firebase.auth().currentUser.uid;
console.log(user_id);


        snapshot.forEach(function(data){

        	if (data.val().Admin == user_id ) {
            var opis = data.val().Opis;
            var rok= data.val().Rok;
			var status= data.val().Status;
console.log(status);
			var user= data.val().User;
		 var key = data.key;
 console.log(key);

console.log(user);





///////////////////////


var database = firebase.database().ref("Users/");
database.once('value', function(snapshot){
    if(snapshot.exists()){
      var content='';

var user_id = firebase.auth().currentUser.uid;

        snapshot.forEach(function(data){
content = '';
if(user == data.val().userId){
console.log(data.val().userId);
	console.log(data.val().Name);
   	 korisnik = data.val().Name +" "+data.val().Surname;
	

            content += '<tr>';
           content += '<td>' + opis + '</td>'; //column1
           content += '<td>' + rok + '</td>';//column2
             content += '<td>' + status + '</td>';//column2
              content += '<td>' + korisnik + '</td>';//column2
              content += '<td>'  + '<button class="myBtn" onclick="ModalUredi(\''+key+'\');"> Uredi</button>' + '</td>';
              content += '<td>' + '<button class="myBtnDelete" onclick="ModalDelete(\''+key+'\');">Obrisi</button> '+ '</td>';
           content += '</tr>';

content2 += content;

$('#ex-table').append(content);







        
}


$(document).ready(function(){



$('#ex-table').DataTable();
});



 });

 






//$('#ex-table').append(content)
console.log(content);
console.log(count);

        
    }
   console.log(content2);





});



console.log(content2);



        }

});
console.log(content);
        
    }

});


};


function disableModal2(){
  document.getElementById('obrisiZadatak').disabled = true;
  document.getElementById('natrag').disabled = true;
}

function enableModal2(){
  document.getElementById('obrisiZadatak').disabled = false;
  document.getElementById('natrag').disabled = false;
}

document.getElementById('natrag').onclick = function(e) {
   e.preventDefault();
 var modal2 = document.getElementById("myModal2");
 
    modal2.style.display = "none";

}

function ModalDelete(sVijestKey){
  $('#myModal2').css("display", "block");

  $('#success_message2').hide();
  enableModal2();
document.getElementById('obrisiZadatak').onclick = function(e) {
  e.preventDefault();
  var oTaskRef = firebase.database().ref('Tasks/' + sVijestKey);
  oTaskRef.remove();
  

$("#ex-table td").parent().remove();
    UcitajTablicu();

var modal2 = document.getElementById("myModal2");
 
    modal2.style.display = "none";


}



};



function taskDelete(sVijestKey)
{
	var oTaskRef = firebase.database().ref('Tasks/' + sVijestKey);
	oTaskRef.remove();

}

function disableModal(){


      $("#ex-option").attr("disabled", true) 
$("#textarea1").attr("disabled", true);
$("#textarea2").attr("disabled", true);
 //$("#radio1").prop("disabled", true);
//$("#radio1").attr("disabled",true);
$('input[name="hosting"]').attr('disabled', 'disabled');

};

function enableModal(){

      $("#ex-option").attr("disabled", false) 
$("#textarea1").attr("disabled", false);
$("#textarea2").attr("disabled", false);
$('input[name="hosting"]').attr('disabled', false);

};




function ModalUredi(sVijestKey)
{ 


	 console.log(sVijestKey);
  var oVijestRef = firebase.database().ref('Tasks/' + sVijestKey); // odabrana vijest
oVijestRef.once('value', function(oOdgovorPosluzitelja)
  {
    var tasks = oOdgovorPosluzitelja.val();
    console.log(tasks);




  


var database = firebase.database().ref("Users/");
database.once('value', function(snapshot){
    if(snapshot.exists()){
        
        snapshot.forEach(function(data){
 console.log(tasks.User);
            var name = data.val().Name;
            var surname= data.val().Surname;
	var content='';
console.log(data.val().userId);
		if (tasks.User == data.val().userId) {
           // content += '<option>';
var test = name + " " + surname;
console.log(test);
            $('#txt_item').text(name + " " + surname);
          //  content +=  name + " " + surname;
         //   content +=  '</option>'; 
console.log("ide sad korisnik");
         
    }
    else{
    	content = '';
content += '<option>';
            content +=  name + " " + surname;
            content +=  '</option>'; 
             console.log(korisnik);
               $('#ex-option').append(content);
             content='';


    }
    })



 

    }
});








  oVijestRef.once('value', function(oOdgovorPosluzitelja)
  {
    var tasks = oOdgovorPosluzitelja.val();
    console.log(tasks);



console.log(tasks.Status);





    // Popunjavanje elemenata forme za uređivanje
    $('#textarea1').val(tasks.Opis);
    $('#textarea2').val(tasks.Rok);
    $('#txt_item').val(tasks.User);
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


}


    $('#myModal').css("display", "block");

  $('#success_message').hide();
  enableModal();
document.getElementById('urediZadatak').onclick = function() {
console.log(sVijestKey);
  var oVijestRef = firebase.database().ref('Tasks/' + sVijestKey);

  var opis = $('#textarea1').val();
  var rok = $('#textarea2').val();
    var user = $('#txt_item').text();



var status = document.querySelector('input[name="hosting"]:checked').value;






console.log(rok); 
console.log(status);

var user2='';


database.once('value', function(snapshot){
    if(snapshot.exists()){
        
        snapshot.forEach(function(data){
 console.log(korisnik);
            var name = data.val().Name;
            var surname= data.val().Surname;
            var tzz = $('#ex-option :selected').text();
            console.log(tzz);
console.log(data.val().Name);
		if (tzz == name + " " + surname ){

			user2 = data.val().userId;

console.log(user2);

         }
    })

console.log(user2);

 




console.log(user2);








  oVijestRef.update(
  {
    "Opis": opis,
    "Rok": rok,	
	"Status":status,
    "User": user2 
   
  });
 

$("#ex-table td").parent().remove();

console.log("ulazi ovdje");
disableModal();
UcitajTablicu();


    }
});





}})
})

}






 var modal = document.getElementById("myModal");
 var modal2 = document.getElementById("myModal2");
// // Get the button that opens the modal
 var btn = document.getElementsByClassName("myBtn");

// // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];
  var span2 = document.getElementsByClassName("close2")[0];
// When the user clicks on the button, open the modal
//btn.onclick = function() {
//  modal.style.display = "block";
//}
span2.onclick = function() {
modal2.style.display = "none";
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
   if (event.target == modal2) {


    modal2.style.display = "none";
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
                        message: 'Napišite opis zadatka.'
                    }
                     }
                 }
             }
         })
         .on('success.form.bv', function(e) {
             $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                

             // Prevent form submission
             e.preventDefault();

             // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
         
        });

 });

   


