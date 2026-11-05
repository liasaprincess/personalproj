const apps = {
  home: {title:"Home", icon:"⌂", body:`<div class="empty-state"><div><div class="empty-icon">⌂</div><h2>Home</h2><p>You are already here. Use the dock or sidebar to open an app.</p></div></div>`},
  files: {title:"Files", icon:"▣", body:`<h2>Files</h2><p>Your personal workspace, ready for folders and documents.</p><div class="simple-list"><div class="simple-row">▣ Documents</div><div class="simple-row">▣ Projects</div><div class="simple-row">▣ Downloads</div><div class="simple-row">▣ Archive</div></div>`},
  notes: {title:"Notes", icon:"✎", body:`<h2>Notes</h2><p>Capture an idea. This demo saves your note locally in the browser.</p><textarea class="note-area" id="noteArea" placeholder="Start writing..."></textarea>`},
  tasks: {title:"Tasks", icon:"✓", body:`<h2>Tasks</h2><p>A simple personal task space. Check items off as you go.</p><div class="simple-list"><label class="simple-row"><input type="checkbox"> Finish website concept</label><label class="simple-row"><input type="checkbox"> Organize project files</label><label class="simple-row"><input type="checkbox"> Review tomorrow's priorities</label></div>`},
  calendar: {title:"Calendar", icon:"□", body:`<h2>Calendar</h2><p>Your calendar module can connect to a real calendar service later.</p><div class="simple-list"><div class="simple-row">Today · Personal workspace</div><div class="simple-row">Tomorrow · Planning</div><div class="simple-row">Friday · Project review</div></div>`},
  projects: {title:"Projects", icon:"◇", body:`<h2>Projects</h2><p>Keep everything you're building in one place.</p><div class="simple-list"><div class="simple-row">✦ Personal Web OS</div><div class="simple-row">◇ Business</div><div class="simple-row">◇ Creative</div></div>`},
  finance: {title:"Finance", icon:"◈", body:`<h2>Finance</h2><p>A private dashboard for tracking budgets, expenses, and business activity.</p><div class="simple-list"><div class="simple-row">Monthly overview · Ready</div><div class="simple-row">Expenses · Ready</div><div class="simple-row">Income · Ready</div></div>`},
  assistant: {title:"Assistant", icon:"✦", body:`<h2>Assistant</h2><p>This is the future AI layer of your OS. Later, it can search your files, manage tasks, draft documents, and act on your instructions.</p><div class="simple-row">Try: “What should I work on today?”</div>`},
  settings: {title:"Settings", icon:"⚙", body:`<h2>Settings</h2><p>Customize your personal operating system.</p><div class="simple-list"><div class="simple-row">Appearance · Monochrome</div><div class="simple-row">Interface · Desktop</div><div class="simple-row">Data · Stored locally in this demo</div></div>`}
};

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const toast = msg => {
  const t=$("#toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>t.classList.remove("show"),1800);
};

function updateClock(){
  const d=new Date();
  $("#clock").textContent=d.toLocaleTimeString([], {hour:"numeric", minute:"2-digit"});
  $("#dateText").textContent=d.toLocaleDateString([], {weekday:"long", month:"long", day:"numeric"}).toUpperCase();
  $("#dayLabel").textContent=d.toLocaleDateString([], {weekday:"long", month:"long", day:"numeric"});
  $("#timezone").textContent=Intl.DateTimeFormat().resolvedOptions().timeZone.split("/").pop().replaceAll("_"," ");
}
setInterval(updateClock,1000); updateClock();

function openApp(name){
  if(name==="home"){ toast("You're on the Home screen."); return; }
  const old=$("#activeWindow"); if(old) old.remove();
  const app=apps[name];
  const win=document.createElement("section");
  win.className="app-window"; win.id="activeWindow";
  win.innerHTML=`<div class="window-bar"><div class="window-dots"><span></span><span></span><span></span></div><div class="window-title">${app.icon} &nbsp; ${app.title}</div><button class="window-close">×</button></div><div class="window-body">${app.body}</div>`;
  $("#windowLayer").appendChild(win);
  win.querySelector(".window-close").onclick=()=>win.remove();
  makeDraggable(win,win.querySelector(".window-bar"));
  if(name==="notes"){
    const area=$("#noteArea"); area.value=localStorage.getItem("myos-note")||"";
    area.addEventListener("input",()=>localStorage.setItem("myos-note",area.value));
  }
  $("#launcher").classList.add("hidden");
}

function makeDraggable(el,handle){
  let dragging=false,ox=0,oy=0;
  handle.addEventListener("pointerdown",e=>{
    if(e.target.closest("button")) return;
    dragging=true; handle.setPointerCapture(e.pointerId);
    const r=el.getBoundingClientRect(); ox=e.clientX-r.left; oy=e.clientY-r.top;
    el.style.transform="none"; el.style.left=r.left+"px"; el.style.top=r.top+"px";
  });
  handle.addEventListener("pointermove",e=>{
    if(!dragging)return;
    const layer=$("#windowLayer").getBoundingClientRect();
    el.style.left=Math.max(5,e.clientX-layer.left-ox)+"px";
    el.style.top=Math.max(5,e.clientY-layer.top-oy)+"px";
  });
  handle.addEventListener("pointerup",()=>dragging=false);
}

$$("[data-app]").forEach(b=>b.addEventListener("click",()=>openApp(b.dataset.app)));
$("#launcherButton").onclick=()=>$("#launcher").classList.toggle("hidden");
$("#brandButton").onclick=()=>$("#launcher").classList.toggle("hidden");
$("#closeLauncher").onclick=()=>$("#launcher").classList.add("hidden");
$("#quickAdd").onclick=()=>openApp("tasks");
$("#profileButton").onclick=()=>toast("Profile settings coming soon.");
$("#notificationButton").onclick=()=>toast("No new notifications.");
$("#themeButton").onclick=()=>{
  document.documentElement.style.setProperty("--bg", getComputedStyle(document.documentElement).getPropertyValue("--bg").trim()==="#090909" ? "#f1f1ef" : "#090909");
  const light=getComputedStyle(document.documentElement).getPropertyValue("--bg").trim()==="#f1f1ef";
  if(light){
    document.documentElement.style.setProperty("--text","#111");
    document.documentElement.style.setProperty("--muted","#666");
    document.documentElement.style.setProperty("--panel","rgba(255,255,255,.8)");
    document.body.style.color="#111";
    toast("Light mode enabled");
  }else{
    location.reload();
  }
};
$("#searchButton").onclick=()=>{ const q=prompt("Search your OS"); if(q) toast("Search ready for: "+q); };
document.addEventListener("keydown",e=>{
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#searchButton").click();}
  if(e.key==="Escape"){ $("#launcher").classList.add("hidden"); const w=$("#activeWindow"); if(w)w.remove(); }
});
window.addEventListener("load",()=>setTimeout(()=>$("#boot").classList.add("hide"),900));
