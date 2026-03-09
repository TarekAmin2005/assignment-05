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



// DISPLAY ISSUES

function displayIssues(issues){

const container = document.getElementById("issuesContainer");

container.innerHTML = "";

document.getElementById("issueCount").innerText = issues.length;

issues.forEach(issue => {

const borderColor =
issue.status === "open"
? "border-t-4 border-green-500"
: "border-t-4 border-purple-500";

const statusIcon =
issue.status === "open"
? `<div class="w-5 h-5 border-2 border-green-500 rounded-full flex items-center justify-center">
     <div class="w-2 h-2 bg-green-500 rounded-full"></div>
   </div>`
: `<div class="w-5 h-5 border-2 border-purple-500 rounded-full flex items-center justify-center">
     <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
   </div>`;


const labelsHTML = issue.labels
? issue.labels.map(label => {

let style = "";

if(label.toLowerCase() === "bug"){
style = "background:#FEECEC;border:1px solid #FECACA;color:#EF4444;";
}

if(label.toLowerCase() === "good first issue"){
style = "background:#FFF8DB;border:1px solid #FDE68A;color:#D97706;";
}

if(label.toLowerCase() === "help wanted"){
style = "background:#FFF8DB;border:1px solid #FDE68A;color:#D97706;";
}

if(label.toLowerCase() === "enhancement"){
style = "background:#ECFDF5;border:1px solid #BBF7D0;color:#059669;";
}

if(label.toLowerCase() === "documentation"){
style = "background:#ECFDF5;border:1px solid #BBF7D0;color:#059669;";
}

return `<span class="px-2 py-1 text-xs font-semibold rounded-full" style="${style}">
${label}
</span>`;

}).join("")
: "";

const card = document.createElement("div");

card.className = `bg-white border border-base-300 rounded-xl shadow-sm p-5 space-y-4 cursor-pointer hover:shadow-md transition ${borderColor}`;

card.innerHTML = `

<div class="flex items-start justify-between">

<div class="flex items-center gap-2">

${statusIcon}

<h2 class="text-lg font-semibold text-black">
${issue.title}
</h2>

</div>

<span class="badge badge-warning badge-outline text-xs">
${issue.priority}
</span>

</div>

<p class="text-sm text-base-content/70 leading-relaxed">
${issue.description}
</p>

<div class="flex gap-2 flex-wrap">
${labelsHTML}
</div>

<div class="text-xs text-base-content/60 space-y-1">

<div class="flex justify-between">

<div>
#${issue.id} by 
<span class="font-medium">${issue.author}</span>
</div>

<div>
${issue.createdAt}
</div>

</div>

</div>
`;

card.onclick = () => openModal(issue);

container.appendChild(card);

});

}



// FILTER

function filterIssues(type) {
  const tabs = ["tabAll", "tabOpen", "tabClosed"];

  // Reset all tabs to white
  tabs.forEach(tabId => {
    const el = document.getElementById(tabId);
    el.classList.remove("bg-gradient-to-r", "from-purple-600", "to-indigo-600", "text-white");
    el.classList.add("bg-slate-100", "text-gray-500");
  });

  // Apply gradient only to the active tab
  const activeTab = document.getElementById("tab" + type.charAt(0).toUpperCase() + type.slice(1));
  activeTab.classList.remove("bg-slate-100", "text-gray-500");
  activeTab.classList.add("bg-gradient-to-r", "from-purple-600", "to-indigo-600", "text-white");

  // Filter issues
  if (type === "all") displayIssues(allIssues);
  else displayIssues(allIssues.filter(i => i.status === type));
}


// SEARCH

async function searchIssue(){

const q = document.getElementById("searchInput").value;

document.getElementById("loader").classList.remove("hidden");

const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${q}`);

const data = await res.json();

displayIssues(data.data);

document.getElementById("loader").classList.add("hidden");

}



// MODAL

function openModal(issue){

  document.getElementById("modalTitle").innerText = issue.title;
  document.getElementById("modalDesc").innerText = issue.description;
  document.getElementById("modalAuthor").innerText = issue.author;
  document.getElementById("modalAssignee").innerText = issue.author;
  document.getElementById("modalDate").innerText = new Date(issue.createdAt).toLocaleDateString();

  // STATUS
  const statusEl = document.getElementById("modalStatus");
  if(issue.status === "open"){
    statusEl.innerText = "OPENED";
    statusEl.className = "badge badge-success text-white";
  } else {
    statusEl.innerText = "CLOSED";
    statusEl.className = "badge badge-secondary text-white";
  }

  // PRIORITY
  const priorityEl = document.getElementById("modalPriority");
  if(issue.priority === "high"){
    priorityEl.innerText = "HIGH";
    priorityEl.className = "badge bg-red-500 text-white px-4 py-3 rounded-full";
  }
  if(issue.priority === "medium"){
    priorityEl.innerText = "MEDIUM";
    priorityEl.className = "badge bg-yellow-500 text-white px-4 py-3 rounded-full";
  }
  if(issue.priority === "low"){
    priorityEl.innerText = "LOW";
    priorityEl.className = "badge bg-green-500 text-white px-4 py-3 rounded-full";
  }

  // LABELS
  const labelsContainer = document.getElementById("modalLabels");
  labelsContainer.innerHTML = issue.labels
    ? issue.labels.map(label => {
        let style = "";
        if(label.toLowerCase() === "bug") style = "border-red-300 text-red-500";
        if(label.toLowerCase() === "help wanted") style = "border-yellow-300 text-yellow-600";
        if(label.toLowerCase() === "enhancement") style = "border-green-300 text-green-600";
        return `<span class="badge badge-outline ${style}">${label.toUpperCase()}</span>`;
      }).join("")
    : "";

  // OPEN MODAL
  document.getElementById("issue-modal").checked = true;
}