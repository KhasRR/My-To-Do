document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  nameLocal();
});
document.getElementById('add').onclick = add;
document.getElementById('filterInput').oninput=filterTasks;
document.getElementById('radio').onclick = radioFilter;

function loadTasks() {
  const check = JSON.parse(localStorage.getItem("checks")) || [];
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  tasks.forEach((text,i) => {
  if (check[i]===true)l="checked"; else l="";
    const li = document.createElement("li");
    if (check[i]===true)li.className="true";
    li.innerHTML = `        
    <h2>${text}</h2>
    </br>
    <input type="checkbox" onclick="checkTask(this)" id="check" name="check" ${l} > Completed
    </br>
    <button onclick="editTask(this)">Редактировать</button>
    <button onclick="deleteTask(this)">Удалить</button>
    `;
    taskList.appendChild(li);

  });
};

function add(){
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  const taskList = document.getElementById("taskList");
  const li = document.createElement("li");
  li.innerHTML = `        
    <h2>${taskText}</h2>
    </br>
    <input type="checkbox" class="" id="check" name="check" onclick="checkTask(this)"> Completed
    </br>
    <button onclick="editTask(this)">Редактировать</button>
    <button onclick="deleteTask(this)">Удалить</button>
    `;
  taskList.appendChild(li);
  saveTasks();
  taskInput.value = "";
};

function saveTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = Array.from(taskList.children).map( (li) => li.querySelector("h2").textContent);
  const checks = Array.from(taskList.children).map( (li) => li.querySelector("input[type='checkbox']").checked) ;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("checks", JSON.stringify(checks));
};

function filterTasks() {
  const filterInput = document.getElementById("filterInput");
  const filterText = filterInput.value.toLowerCase();
  const taskList = document.getElementById("taskList");
  Array.from(taskList.children).forEach((li) => {
    const taskText = li.querySelector("h2").textContent.toLowerCase();
    if (taskText.includes(filterText)) {
      li.style.display = "";
    } else {
      li.style.display = "none";
    }
  });
};

function radioFilter(){
const filter = document.querySelectorAll('input[name="radio"]');
const taskList = document.getElementById("taskList");
for (const f of filter){
if (f.checked) var radio = f.value;
switch(radio){
  case "NotOk":
    Array.from(taskList.children).forEach((li) => {
      const clFilter = li.className;
      if (clFilter==="true") {
        li.style.display = "none";
      } else {
        li.style.display = "";
      }})
    break;
  case "Ok":
    Array.from(taskList.children).forEach((li) => {
      const clFilter = li.className;
      if (clFilter==="true") {
        li.style.display = "";
      } else {
        li.style.display = "none";
      }})
    break;
  case "All": 
    Array.from(taskList.children).forEach((li) => {
      li.style.display = "";})};
}};

function checkTask(ch){
  const li = ch.parentElement;
  if (li.querySelector("input[type='checkbox']").checked===true) li.classList.add("true"); else li.classList.remove("true");
  saveTasks();
};

function deleteTask(del) {
  const li = del.parentElement;
  li.remove();
  saveTasks();
};

function editTask(edit) {
  const li = edit.parentElement;
  const taskText = li.querySelector("h2").textContent;
  const newTaskText = prompt("Edit Task", taskText);
  if (newTaskText !== null && newTaskText.trim() !== "") {
    li.querySelector("h2").textContent = newTaskText.trim();
    saveTasks();
  }
};

function nameLocal(){
  const names = JSON.parse(localStorage.getItem("names")) ||("");
  let  name = document.getElementById("name");
  const nameh2 = name.querySelector("h2").textContent;
  if (names !== "") 
    name.querySelector("h2").textContent = `Здравствуйте, ${names}`; 
  else
    name.querySelector("h2").textContent = "Здравствуйте, незнакомец"; 
};
