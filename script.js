const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const emptyMsg = document.getElementById('empty-msg');
const themeToggle = document.getElementById('toggle-theme');
const filters = document.querySelectorAll('.filter');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  let visibleTasks = tasks.filter(task => {
    if (currentFilter === 'completed') return task.completed;
    if (currentFilter === 'active') return !task.completed;
    return true;
  });
