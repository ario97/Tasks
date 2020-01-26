
 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBq2kiQCcnWXa9UZ0ysMzL9nfOsjRmGEHc",
    authDomain: "upravljanje-zadacima-e856f.firebaseapp.com",
    databaseURL: "https://upravljanje-zadacima-e856f.firebaseio.com",
    projectId: "upravljanje-zadacima-e856f",
    storageBucket: "upravljanje-zadacima-e856f.appspot.com",
    messagingSenderId: "360505746178",
    appId: "1:360505746178:web:915d911f2ba3de40c0581b",
    measurementId: "G-571X8PDR5X"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



function CheckMailFormat()
{
	var regExMail = new RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
	
	if(regExMail.test($('#inptEmail').val()))
	{
		$('#inptEmail').removeClass("error");
		$('#inptEmail').addClass("good");
	}
	else
	{
		$('#inptEmail').removeClass("good");
		$('#inptEmail').addClass("error");
	}
	
}

function CheckPassFormat()
{
	var regExPass = new RegExp("[a-zA-Z0-9.!-_]+");
	
	if(regExPass.test($('#inptPassword').val()))
	{
		$('#inptPassword').removeClass("error");
		$('#inptPassword').addClass("good");
	}
	else
	{
		$('#inptPassword').removeClass("good");
		$('#inptPassword').addClass("error");
	}
	
}

function Login()
{

	var email = $('#inptEmail').val();
	var password = $('#inptPassword').val();
	var auth = firebase.auth();
	if(email=="" || password=="")
		{
			alert('Unesi Email i lozinku!');
		}
	else
	{
		var promise = auth.signInWithEmailAndPassword(email, password);
		promise.catch (e => alert('Pogrešan email ili lozinka!'));
		

	}
	

}



firebase.auth().onAuthStateChanged( user => {

 var user_id = firebase.auth().currentUser.uid;
console.log(user_id);
var playersRef = firebase.database().ref("Admins/");

playersRef.orderByChild("userId").on("child_added", function(data) {
	console.log( data.val().userId);
   if(user_id == data.val().userId){
   	window.location.href = "admin_menu.html";
    }else{
    	window.location.href = "user_menu.html";
       // do not allow
    }

});
});

$( "#inptEmail" ).keypress(function(event)
{
	if ( event.which == 13 )
	{
		$('#login').click();
	}
});
$( "#inptPassword" ).keypress(function(event)
{
	if ( event.which == 13 )
	{
		$('#login').click();
	}
});