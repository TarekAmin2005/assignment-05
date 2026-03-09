console.log("Project Started");

// LOGIN

function login(){

const user = document.getElementById("username").value;
const pass = document.getElementById("password").value;

if(user==="admin" && pass==="admin123"){

document.getElementById("loginPage").classList.add("hidden");
document.getElementById("mainPage").classList.remove("hidden");

loadIssues();

}else{

alert("Invalid Credentials");

}

}