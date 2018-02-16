// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners on startup
loadEventListeners();


/********************** EVENT LISTENERS CALLBACK FUNCTIONS ***********************/

// Get Tasks from LS
function getTasks(e) {
    let tasks = loadTasksFromLocalStorage();

    tasks.forEach(task => appendTaskToTaskList(task));
}

// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        return alert('Add a task');
    }

    // Create new list element with task and append it to task list in DOM
    appendTaskToTaskList(taskInput.value);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear the input
    taskInput.value = '';

    e.preventDefault();
}

// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are You Sure?')) {
            const taskItem = e.target.parentElement.parentElement;
            taskItem.remove();

            // Remove from LS
            removeTaskFromLocalStorage(taskItem);
        }
    }
}

// Clear Tasks
function clearTasks(e) {
    // taskList.innerHTML = '';
    // Faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    
    // Clear from LS
    clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach((task) => {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

/********************** HELPER FUNCTIONS ***********************/

// Append new task to task list in the DOM
function appendTaskToTaskList(task) {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to the li
    li.appendChild(link);

    // Append the li to ul
    taskList.appendChild(li);
}

// Load all event listeners
function loadEventListeners() {
    // DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks)
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click', clearTasks)
    // Filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// Get LS state
function loadTasksFromLocalStorage() {
    if (localStorage.getItem('tasks') === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem('tasks'));
    }
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks = loadTasksFromLocalStorage();

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks = loadTasksFromLocalStorage();

    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}