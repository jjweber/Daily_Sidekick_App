console.log("Main.js says, I am here");
const submit = document.getElementById('sendBtn');
var path = window.location.pathname;
var page = path.split("/").pop();
console.log( page );
