import {app} from "./app.js";
import {onCheckboxChange, onTaskRemove} from "./eventhandlers.js";

function addTaskToList(taskName, taskDate, taskPriority, taskIndex, taskDone) {
    let taskElement = document.createElement('li');

    let checkbox = document.createElement("input"); 
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("task__checkbox");
    checkbox.checked = taskDone ? true : false;
    checkbox.addEventListener("click", onCheckboxChange);

    let priority = taskPriority == 1? "low" : taskPriority == 2? "medium" :  "high";

    let fields = `<div class="task__name" >${taskName}</div><div class="task__date">${taskDate}</div><div class="task__priority"}>${priority}</div>`
    
    let btn = document.createElement("button");
    btn.innerHTML = '<i class="fas fa-trash"></i>';
    btn.classList.add("task__remove");
    btn.addEventListener("click", onTaskRemove.bind(btn, taskIndex));

    taskElement.innerHTML = fields;
    taskElement.prepend(checkbox);
    taskElement.append(btn);
    taskElement.classList.add('task');
    taskElement.setAttribute('id', taskIndex);

    app.list.appendChild(taskElement);
}

function updateList(tasks = app.tasksArray, startIndex = 0) {
    app.list.innerHTML = "";  
    for (let i = 0; i < tasks.length; i++) {
        let taskIndex = startIndex + i;
        addTaskToList(tasks[i].name, tasks[i].date, tasks[i].priority, taskIndex, tasks[i].done);
    }
}

export {addTaskToList, updateList}