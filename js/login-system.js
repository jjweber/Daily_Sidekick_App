console.log("I am here!");

// Name and Password from the register-form
var un = document.getElementById('un');
var pw = document.getElementById('pwd');

// User Edited Info Name and Password
var newUn = document.getElementById('newUn');
var newPw = document.getElementById('newPw');

// Finding Page Location
var path = window.location.pathname;
var page = path.split("/").pop();
console.log( page );

// If Page Is myAccount, Adding Username to User Greeting
if (page === 'myAccount.html') {
  document.getElementById('userGreeting').innerHTML = localStorage.getItem('un');
}


// storing input from register-form
function store() {
  if(un.value && pw.value) {
    localStorage.setItem('un', un.value);
    localStorage.setItem('pw', pw.value);

    window.location.replace("index.html")
  }
}

// check if stored data from register-form is equal to entered data in the login-form
function check() {

    // stored data from the register-form
    var storedUn = localStorage.getItem('un');
    var storedPw = localStorage.getItem('pw');

    // entered data from the login-form
    var userUn = document.getElementById('userName');
    var userPw = document.getElementById('userPw');

    // check if stored data from register-form is equal to data from login form
    if(userUn.value == storedUn && userPw.value == storedPw) {
        // similar behavior as an HTTP redirect
        window.location.replace('home.html');
    }else {
        alert('Incorrect Login Info. Please try again!');
    }
}

// Edit Locally Stored Username
function editSavedUsername() {
  if (newUn.value) {
    localStorage.setItem('un', newUn.value);

    // Refreshing Window To Add New Username To Greeting
    location.reload();

    // Closing Modal
    $('.editUsrUn').modal('toggle');
  }
}

// Edit Locally Stored Password
function editSavedPassword() {
  if (newPw.value) {
    localStorage.setItem('pw', newPw.value);

    // Closing Modal
    $('.editUsrPwd').modal('toggle');
  }
}

// User Selects Clear All Stored Data From myAccount Page
function removeSavedData() {
  // Saving Username & Password From localStorage
  var uInfo1 = localStorage.getItem('un');
  var uInfo2 = localStorage.getItem('pw');

  var retVal = confirm("Are you sure you want to delete all stored events?");

  if( retVal == true ){
    // Clearing localStorage
    localStorage.clear();

    // Adding Username & Password Back to localStorage
    localStorage.setItem('un', uInfo1);
    localStorage.setItem('pw', uInfo2);

    return true;
  }
  else{
    return false;
  }
}
