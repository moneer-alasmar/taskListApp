// DEFINE UI VARIABLES
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// LOAD ALL EVENT LISTENERS
loadEventListeners();

// LOAD ALL EVENT LISTENERS FUNCTION
function loadEventListeners() {
  // DOM LOAD EVENT / LOAD LOCAL STORAGE
  document.addEventListener('DOMContentLoaded', getTasks);

  // ADD TASK EVENT
  form.addEventListener('submit', addTask);

  // REMOVE TASK EVENT
  taskList.addEventListener('click', removeTask);

  // CLEAR ALL TASKS EVENT
  clearBtn.addEventListener('click', clearTasks);

  // FILTER TASKS EVENT
  filter.addEventListener('keyup', filterTasks);
}

// GET TASKS FROM LOCAL STORAGE FUNCTION
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // LOOP THROUGH EACH TASK
  tasks.forEach(function(task) {
     // CREATE LI ELEMENT
    const li = document.createElement('li');
    
    // ADD CLASS
    li.className = 'collection-item';
    
    // CREATE TEXT NODE AND APPEND TO LI
    li.appendChild(document.createTextNode(task));

    // CREATE NEW LINK ELEMENT
    const link = document.createElement('a');

    // ADD CLASS
    link.className = 'delete-item secondary-content';

    // ADD ICON HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // APPEND THE LINK TO LI
    li.appendChild(link);

    // APPEND LI TO UL
    taskList.appendChild(li);
  })
}

// ADD TASK FUNCTION
function addTask(e) {
  if(taskInput.value === ''){
    alert("Add a task");
  }
  
  // CREATE LI ELEMENT
  const li = document.createElement('li');
  
  // ADD CLASS
  li.className = 'collection-item';
  
  // CREATE TEXT NODE AND APPEND TO LI
  li.appendChild(document.createTextNode(taskInput.value));

  // CREATE NEW LINK ELEMENT
  const link = document.createElement('a');

  // ADD CLASS
  link.className = 'delete-item secondary-content';

  // ADD ICON HTML
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // APPEND THE LINK TO LI
  li.appendChild(link);

  // APPEND LI TO UL
  taskList.appendChild(li);

  // STORE VALUE IN LOCAL STORAGE
  storeTaskInLocalStorage(taskInput.value);
  
  // CLEAR INPUT
  taskInput.value = '';

  e.preventDefault();
}

// STORE TASK FUNCTION
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// REMOVE TASK FUNCTION
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure you want to delete this item?')) {
      e.target.parentElement.parentElement.remove();

      // REMOVE FROM LOCAL STORAGE CALL
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// REMOVE FROM LOCAL STORAGE FUNCTION
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
  })
}

// CLEAR TASKS FUNCTION
function clearTasks() {
  // INFERIOR METHOD
  taskList.innerHTML = '';

  // FASTER METHOD
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  
  // CLEAR FROM LOCAL STORAGE CALL
  clearTasksFromLocalStorage();

  // SUPPORTING DOCS FOR METHODS
  // https://jsperf.com/innerhtml-vs-removechild
}

// CLEAR FROM LOCAL STORAGE FUNCTION
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// FILTER TASKS FUNCTION
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
