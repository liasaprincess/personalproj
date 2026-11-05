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
// Database initialization and management
const db = {
  inbox: JSON.parse(localStorage.getItem('db_inbox')) || [],
  tasks: JSON.parse(localStorage.getItem('db_tasks')) || [
    { id: 1, title: 'Finish website concept', priority: true, done: false },
    { id: 2, title: 'Organize project files', priority: true, done: false },
    { id: 3, title: 'Review tomorrow\'s priorities', priority: true, done: false }
  ],
  habits: JSON.parse(localStorage.getItem('db_habits')) || [],
  projects: JSON.parse(localStorage.getItem('db_projects')) || [
    { id: 1, title: 'Personal Web OS', progress: 65, status: 'In Progress', deadline: '2026-12-15' },
    { id: 2, title: 'Design System', progress: 40, status: 'Planning', deadline: '2027-01-30' },
    { id: 3, title: 'Mobile App', progress: 20, status: 'Planning', deadline: '2027-02-28' }
  ],
  goals: JSON.parse(localStorage.getItem('db_goals')) || [],
  calendar: JSON.parse(localStorage.getItem('db_calendar')) || [
    { id: 1, title: 'Team Meeting', time: '10:00', date: new Date().toISOString().split('T')[0] },
    { id: 2, title: 'Design Review', time: '14:00', date: new Date(Date.now() + 86400000).toISOString().split('T')[0] },
    { id: 3, title: 'Project Planning', time: '15:30', date: new Date(Date.now() + 172800000).toISOString().split('T')[0] }
  ]
};
function saveDB() {
  localStorage.setItem('db_inbox', JSON.stringify(db.inbox));
  localStorage.setItem('db_tasks', JSON.stringify(db.tasks));
  localStorage.setItem('db_habits', JSON.stringify(db.habits));
  localStorage.setItem('db_projects', JSON.stringify(db.projects));
  localStorage.setItem('db_goals', JSON.stringify(db.goals));
  localStorage.setItem('db_calendar', JSON.stringify(db.calendar));
}
// Utility functions
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
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
}
function showPage(pageId) {
  $$('.page').forEach(p => p.classList.remove('active'));
  const page = $(`#page-${pageId}`);
  if (page) {
    page.classList.add('active');
  }
  $$('.nav-item').forEach(n => n.classList.remove('active'));
  $$(`[data-page="${pageId}"]`).forEach(n => n.classList.add('active'));
}
// Dashboard updates
function updateDashboard() {
  // Update habits
  const habitGrid = $("#habitGrid");
  if (habitGrid) {
    habitGrid.innerHTML = '';
    if (db.habits.length === 0) {
      habitGrid.innerHTML = '<p style="grid-column:1/-1;color:rgba(0,0,0,.5);font-size:12px;">No habits yet. Add one from Habit Tracker.</p>';
    } else {
      db.habits.slice(0, 3).forEach(habit => {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
        const item = document.createElement('div');
        item.className = 'habit-item';
        item.innerHTML = `
          <input type="checkbox" ${habit.today ? 'checked' : ''} onchange="updateHabitDay(${habit.id})">
          <span class="habit-name">${habit.name}</span>
          <span class="habit-day">${today}</span>
        `;
        habitGrid.appendChild(item);
      });
    }
  }
  // Update top 3 priorities
  const prioritiesContainer = $("#topPriorities");
  if (prioritiesContainer) {
    prioritiesContainer.innerHTML = '';
    db.tasks.filter(t => t.priority).slice(0, 3).forEach(task => {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${task.id})">
        ${task.title}
      `;
      prioritiesContainer.appendChild(label);
    });
    if (db.tasks.filter(t => t.priority).length === 0) {
      prioritiesContainer.innerHTML = '<p style="color:rgba(0,0,0,.5);font-size:12px;">No priorities set.</p>';
    }
  }
  // Update schedule
  const scheduleList = $("#scheduleList");
  if (scheduleList) {
    scheduleList.innerHTML = '';
    const today = new Date();
    const upcomingEvents = db.calendar.filter(e => new Date(e.date) >= today).slice(0, 3);
    if (upcomingEvents.length === 0) {
      scheduleList.innerHTML = '<p style="color:rgba(0,0,0,.5);font-size:12px;">No upcoming events.</p>';
    } else {
      upcomingEvents.forEach(event => {
        const item = document.createElement('div');
        item.className = 'schedule-item';
        item.innerHTML = `
          <div class="schedule-item-time">${event.time}</div>
          <div class="schedule-item-title">${event.title}</div>
          <div class="schedule-item-note">${new Date(event.date).toLocaleDateString()}</div>
        `;
        scheduleList.appendChild(item);
      });
    }
  }
  // Update active projects
  const projectsGrid = $("#activeProjectsGrid");
  if (projectsGrid) {
    projectsGrid.innerHTML = '';
    db.projects.slice(0, 3).forEach(project => {
      const tile = document.createElement('button');
      tile.className = 'app-tile';
      tile.innerHTML = `
        <div style="margin-bottom:10px">
          <div style="font-size:14px;margin-bottom:8px">◇</div>
          <div style="font-weight:600;font-size:13px;margin-bottom:4px">${project.title}</div>
          <div style="font-size:11px;color:rgba(0,0,0,.5);margin-bottom:8px">${project.status}</div>
        </div>
        <div style="width:100%;height:6px;background:rgba(0,0,0,.1);border-radius:3px;overflow:hidden;margin-bottom:6px">
          <div style="width:${project.progress}%;height:100%;background:linear-gradient(90deg,#EDA575,#E07F7E)"></div>
        </div>
        <div style="font-size:10px;color:rgba(0,0,0,.5)">${project.deadline}</div>
      `;
      projectsGrid.appendChild(tile);
    });
  }
}
function updateHabitDay(habitId) {
  const habit = db.habits.find(h => h.id === habitId);
  if (habit) {
    habit.today = !habit.today;
    saveDB();
    updateDashboard();
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
function toggleTask(taskId) {
  const task = db.tasks.find(t => t.id === taskId);
  if (task) {
    task.done = !task.done;
    saveDB();
    updateDashboard();
  }
}
// Page-specific rendering functions
function renderHabitTrackerPage() {
  const container = $("#habitsContainer");
  container.innerHTML = '';
  if (db.habits.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:rgba(0,0,0,.5);padding:40px">No habits yet. Click "Add Habit" to get started.</p>';
    return;
  }
  db.habits.forEach(habit => {
    const card = document.createElement('div');
    card.className = 'habit-tracker-card';
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekData = habit.week || [false, false, false, false, false, false, false];
    card.innerHTML = `
      <h3>${habit.name}</h3>
      <div class="week-grid">
        ${days.map((day, i) => `
          <div class="day-box">
            <div class="day-box-label">${day}</div>
            <input type="checkbox" ${weekData[i] ? 'checked' : ''} onchange="updateHabitWeek(${habit.id}, ${i})">
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(card);
  });
}
function updateHabitWeek(habitId, dayIndex) {
  const habit = db.habits.find(h => h.id === habitId);
  if (habit) {
    if (!habit.week) habit.week = [false, false, false, false, false, false, false];
    habit.week[dayIndex] = !habit.week[dayIndex];
    saveDB();
    renderHabitTrackerPage();
  }
}
function renderTasksPage() {
  const container = $("#tasksContent");
  container.innerHTML = '';
  if (db.tasks.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:rgba(0,0,0,.5);padding:40px">No tasks yet.</p>';
    return;
  }
  // Table view (default)
  const table = document.createElement('table');
  table.style.cssText = 'width:100%;border-collapse:collapse;font-size:13px';
  table.innerHTML = `
    <thead>
      <tr style="border-bottom:1px solid rgba(0,0,0,.1)">
        <th style="text-align:left;padding:12px;font-weight:600">Task</th>
        <th style="text-align:left;padding:12px;font-weight:600">Status</th>
        <th style="text-align:left;padding:12px;font-weight:600">Priority</th>
      </tr>
    </thead>
    <tbody>
      ${db.tasks.map(task => `
        <tr style="border-bottom:1px solid rgba(0,0,0,.05)">
          <td style="padding:12px">
            <label style="display:flex;gap:8px;align-items:center">
              <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleTask(${task.id})">
              <span ${task.done ? 'style="text-decoration:line-through;color:rgba(0,0,0,.4)"' : ''}>${task.title}</span>
            </label>
          </td>
          <td style="padding:12px">${task.done ? 'Done' : 'Pending'}</td>
          <td style="padding:12px"><input type="checkbox" ${task.priority ? 'checked' : ''} onchange="toggleTaskPriority(${task.id})" title="Mark as priority"></td>
        </tr>
      `).join('')}
    </tbody>
  `;
  container.appendChild(table);
}
function toggleTaskPriority(taskId) {
  const task = db.tasks.find(t => t.id === taskId);
  if (task) {
    task.priority = !task.priority;
    saveDB();
    updateDashboard();
    renderTasksPage();
  }
}
function renderCalendarPage() {
  const container = $("#calendarContent");
  container.innerHTML = '';
  const today = new Date();
  const eventsHTML = db.calendar
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(event => `
      <div class="schedule-item">
        <div class="schedule-item-time">${event.time}</div>
        <div class="schedule-item-title">${event.title}</div>
        <div class="schedule-item-note">${new Date(event.date).toLocaleDateString()}</div>
      </div>
    `).join('');
  container.innerHTML = eventsHTML || '<p style="text-align:center;color:rgba(0,0,0,.5);padding:40px">No events scheduled.</p>';
}
function renderProjectsPage() {
  const grid = $("#projectsGrid");
  grid.innerHTML = '';
  if (db.projects.length === 0) {
    grid.innerHTML = '<p style="text-align:center;color:rgba(0,0,0,.5);padding:40px">No projects yet.</p>';
    return;
  }
  db.projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <h3>${project.title}</h3>
      <div class="project-meta">
        <span>${project.status}</span>
      </div>
      <div class="progress-bar">
        <div class="progress" style="width:${project.progress}%"></div>
      </div>
      <div class="project-meta" style="justify-content:space-between">
        <span>${project.progress}% complete</span>
        <span>${project.deadline}</span>
      </div>
    `;
    grid.appendChild(card);
  });
  handle.addEventListener("pointermove",e=>{
    if(!dragging)return;
    const layer=$("#windowLayer").getBoundingClientRect();
    el.style.left=Math.max(5,e.clientX-layer.left-ox)+"px";
    el.style.top=Math.max(5,e.clientY-layer.top-oy)+"px";
}
function renderGoalsPage() {
  const container = $("#goalsContainer");
  container.innerHTML = '';
  if (db.goals.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:rgba(0,0,0,.5);padding:40px">No goals yet. Click "Add Goal" to get started.</p>';
    return;
  }
  db.goals.forEach(goal => {
    const card = document.createElement('div');
    card.className = 'goal-item';
    const subitems = goal.subitems || [];
    card.innerHTML = `
      <h3>${goal.title}</h3>
      <div class="goal-subitems">
        ${subitems.map((subitem, i) => `
          <div class="goal-subitem">
            <input type="checkbox" ${subitem.done ? 'checked' : ''} onchange="toggleGoalSubitem(${goal.id}, ${i})">
            <span ${subitem.done ? 'style="text-decoration:line-through;color:rgba(0,0,0,.4)"' : ''}>${subitem.title}</span>
          </div>
        `).join('')}
        ${subitems.length === 0 ? '<p style="color:rgba(0,0,0,.4);font-size:12px;margin:0">No subitems yet.</p>' : ''}
      </div>
    `;
    container.appendChild(card);
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
function toggleGoalSubitem(goalId, subitemIndex) {
  const goal = db.goals.find(g => g.id === goalId);
  if (goal && goal.subitems && goal.subitems[subitemIndex]) {
    goal.subitems[subitemIndex].done = !goal.subitems[subitemIndex].done;
    saveDB();
    renderGoalsPage();
  }
};
$("#searchButton").onclick=()=>{ const q=prompt("Search your OS"); if(q) toast("Search ready for: "+q); };
document.addEventListener("keydown",e=>{
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();$("#searchButton").click();}
  if(e.key==="Escape"){ $("#launcher").classList.add("hidden"); const w=$("#activeWindow"); if(w)w.remove(); }
}
// Quick Capture Modal
function openQuickCapture() {
  const modal = $("#quickCaptureModal");
  modal.classList.add("active");
  modal.classList.remove("hidden");
  const today = new Date().toISOString().split('T')[0];
  $("#captureDate").value = today;
}
function closeQuickCapture() {
  const modal = $("#quickCaptureModal");
  modal.classList.remove("active");
  setTimeout(() => modal.classList.add("hidden"), 300);
}
function submitCapture() {
  const title = $("#captureTitle").value;
  const date = $("#captureDate").value;
  const type = $("#captureType").value;
  const details = $("#captureDetails").value;
  if (!title.trim()) {
    toast("Please enter a title");
    return;
  }
  const item = {
    id: Date.now(),
    title,
    date,
    type,
    details,
    stage: 'Pre-Processed',
    category: 'Active'
  };
  db.inbox.push(item);
  saveDB();
  toast("Item captured!");
  closeQuickCapture();
  $("#captureTitle").value = '';
  $("#captureDetails").value = '';
  $("#captureType").value = 'Quote';
}
// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Page navigation
  $$('[data-page]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const page = btn.dataset.page;
      if (page === 'habits') renderHabitTrackerPage();
      if (page === 'tasks') renderTasksPage();
      if (page === 'calendar') renderCalendarPage();
      if (page === 'projects') renderProjectsPage();
      if (page === 'goals') renderGoalsPage();
      showPage(page);
    });
  });
  // Quick Capture
  $("#quickCapture").addEventListener('click', openQuickCapture);
  $("#closeQuickCapture").addEventListener('click', closeQuickCapture);
  $("#submitCapture").addEventListener('click', submitCapture);
  // Close modal on overlay click
  $("#quickCaptureModal").addEventListener('click', (e) => {
    if (e.target.id === 'quickCaptureModal') closeQuickCapture();
  });
  // Add buttons
  $("#addHabit")?.addEventListener('click', () => {
    const name = prompt('Habit name:');
    if (name && name.trim()) {
      db.habits.push({
        id: Date.now(),
        name,
        week: [false, false, false, false, false, false, false],
        today: false
      });
      saveDB();
      renderHabitTrackerPage();
      toast("Habit added!");
    }
  });
  $("#addTask")?.addEventListener('click', () => {
    const title = prompt('Task title:');
    if (title && title.trim()) {
      db.tasks.push({
        id: Date.now(),
        title,
        priority: false,
        done: false
      });
      saveDB();
      updateDashboard();
      renderTasksPage();
      toast("Task added!");
    }
  });
  $("#addProject")?.addEventListener('click', () => {
    const title = prompt('Project name:');
    if (title && title.trim()) {
      db.projects.push({
        id: Date.now(),
        title,
        progress: 0,
        status: 'Planning',
        deadline: new Date(Date.now() + 86400000 * 30).toISOString().split('T')[0]
      });
      saveDB();
      updateDashboard();
      renderProjectsPage();
      toast("Project added!");
    }
  });
  $("#addGoal")?.addEventListener('click', () => {
    const title = prompt('Goal title:');
    if (title && title.trim()) {
      db.goals.push({
        id: Date.now(),
        title,
        subitems: []
      });
      saveDB();
      renderGoalsPage();
      toast("Goal added!");
    }
  });
  // Profile button
  $("#profileButton").addEventListener('click', () => toast("Settings coming soon"));
  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQuickCapture();
    }
  });
  // Boot animation
  setTimeout(() => {
    $("#boot").classList.add("hide");
  }, 900);
  // Initial dashboard update
  updateDashboard();
  showPage('home');
});
-window.addEventListener("load",()=>setTimeout(()=>$("#boot").classList.add("hide"),900));