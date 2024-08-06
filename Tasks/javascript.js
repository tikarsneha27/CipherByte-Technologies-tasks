function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskList = document.getElementById('taskList');
        const listItem = document.createElement('li');
        
        const timestamp = new Date().toLocaleString();
        listItem.innerHTML = `${taskText} <span class="timestamp">${timestamp}</span> <button onclick="completeTask(this)">Complete</button>`;
        
        taskList.appendChild(listItem);
        saveTasks();
        taskInput.value = '';
    }
}

function completeTask(button) {
    const listItem = button.parentElement;
    const completedList = document.getElementById('completedList');
    
    const completionTime = new Date().toLocaleString();
    const completionSpan = document.createElement('span');
    completionSpan.classList.add('completion-timestamp');
    completionSpan.textContent = ` (Completed at: ${completionTime})`;
    
    listItem.appendChild(completionSpan);
    button.remove();
    listItem.classList.add('completed');
    completedList.appendChild(listItem);
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById('taskList');
    const completedList = document.getElementById('completedList');
    
    const tasks = [];
    const completedTasks = [];
    
    taskList.querySelectorAll('li').forEach(task => {
        tasks.push(task.innerHTML);
    });
    
    completedList.querySelectorAll('li').forEach(task => {
        completedTasks.push(task.innerHTML);
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    const completedList = document.getElementById('completedList');
    
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = task;
        taskList.appendChild(listItem);
    });
    
    completedTasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = task;
        listItem.classList.add('completed');
        completedList.appendChild(listItem);
    });
}

document.addEventListener('DOMContentLoaded', loadTasks);
