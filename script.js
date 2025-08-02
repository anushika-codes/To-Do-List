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
  visibleTasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');

    const span = document.createElement('span');
    span.textContent = `${task.text} (${task.date})`;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'task-buttons';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = '✔';
    completeBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏';
    editBtn.onclick = () => {
      const newText = prompt('Edit your task:', tasks[index].text);
      if (newText) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    buttonsDiv.appendChild(completeBtn);
    buttonsDiv.appendChild(editBtn);
    buttonsDiv.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonsDiv);
    taskList.appendChild(li);
  });

  emptyMsg.style.display = tasks.length === 0 ? 'block' : 'none';
}
