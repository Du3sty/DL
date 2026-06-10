const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");
const search = document.getElementById("search");
const favBtn = document.getElementById("favBtn");

let active = "All";
let showingFavs = false;

/* auth (fake UI placeholder - real Firebase optional upgrade) */
function login(){
let email = document.getElementById("email").value;
let pass = document.getElementById("pass").value;

if(email && pass){
document.getElementById("adminPanel").style.display="block";
alert("Admin mode enabled");
}
}

/* favorites */
function getFavs(){
return JSON.parse(localStorage.getItem("favs") || "[]");
}

function toggleFav(item){
let favs = getFavs();
let exists = favs.find(f=>f.title===item.title);

if(exists){
favs = favs.filter(f=>f.title!==item.title);
} else {
favs.push(item);
}

localStorage.setItem("favs", JSON.stringify(favs));
render();
}

/* sidebar */
function renderSidebar(){
sidebar.innerHTML="";

let all = document.createElement("button");
all.innerText="All";
all.onclick=()=>{
active="All";
showingFavs=false;
render();
};
sidebar.appendChild(all);

categories.forEach(c=>{
let btn=document.createElement("button");
btn.innerText=c.name;
btn.onclick=()=>{
active=c.name;
showingFavs=false;
render();
};
sidebar.appendChild(btn);
});
}

/* AI search */
function smartSearch(items,q){
q=q.toLowerCase();

return items.map(i=>{
let s=0;
if(i.title.toLowerCase().includes(q)) s+=5;
if(i.desc?.toLowerCase().includes(q)) s+=2;
return {...i,score:s};
})
.filter(i=>i.score>0)
.sort((a,b)=>b.score-a.score);
}

/* render */
function render(){
content.innerHTML="";

let items=[];

if(showingFavs){
items=getFavs();
}else{
categories.forEach(c=>{
if(active==="All"||active===c.name){
c.links.forEach(l=>{
items.push({...l,category:c.name});
});
}
});
}

items = smartSearch(items, search.value);

items.forEach(i=>{
let div=document.createElement("div");
div.className="card";

let isFav=getFavs().some(f=>f.title===i.title);

div.innerHTML=`
<h3>${i.title}</h3>
<p>${i.desc||""}</p>

<a class="download" href="${i.url}" target="_blank">
⬇ Download
</a>

<br>

<button onclick='toggleFav(${JSON.stringify(i)})'>
${isFav?"Remove ⭐":"Add ⭐"}
</button>
`;

content.appendChild(div);
});
}

search.addEventListener("input",render);

favBtn.onclick=()=>{
showingFavs=!showingFavs;
render();
};

renderSidebar();
render();