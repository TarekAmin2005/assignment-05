console.log("Project Started");
const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

let allIssues = [];

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


// LOAD ISSUES

async function loadIssues(){

document.getElementById("loader").classList.remove("hidden");

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
const data = await res.json();

allIssues = data.data;

displayIssues(allIssues);

document.getElementById("loader").classList.add("hidden");

}