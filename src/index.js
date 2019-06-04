import "./scss/main.scss"

function Task(name, date, priority) {
    this.name = name;
    this.date = date;
    this.priority = priority;
    // this.status = "new";
    this.done = false;
}

let tasksArray;
let currentPage = 1;
let tasksPerPage = 5;

const list = document.getElementById("tasks-list");
const prevBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const addBtn = document.getElementById("add-btn");
const form = document.getElementById("form");
const footer = document.getElementById("footer");
const header = document.getElementById("header");
const openSort = document.getElementById("sort-open");
const sortBtns = document.querySelectorAll(".sort-btn");
const sortList =  document.getElementById("sort-list");
const selectVolume = document.getElementById("select-task-num");

function init() {
    const closeBtn = document.getElementById("form-close");

    addBtn.addEventListener("click", onFormOpen);
    form.addEventListener('submit', onTaskCreate);
    prevBtn.addEventListener("click", onPageChange.bind(prevBtn, "prev"));
    nextBtn.addEventListener("click", onPageChange.bind(nextBtn, "next"));
    openSort.addEventListener("click", navOpenClose);
    closeBtn.addEventListener("click", closeForm);
    selectVolume.addEventListener("change", onVolumeSelect);

    sortBtns.forEach(function(btn){
        btn.addEventListener("click", onSort);
        btn.addEventListener("click", navOpenClose);
    });


    if (localStorage.getItem('storeList')) {
        let retrivedList = localStorage.getItem('storeList')
        tasksArray = JSON.parse(retrivedList);
        goToPage("first")
    } else {
        tasksArray = []
    }
}

init();

function onVolumeSelect() {
    let value = selectVolume[selectVolume.selectedIndex].value;
    tasksPerPage = Number(value);
    goToPage("first");
    navOpenClose();
}

function navOpenClose() {
    sortList.classList.toggle("navigation__list--show");
}

function onFormOpen() {
    form.style.display = "block";
    header.style.display = "none";
    list.style.display = "none";
    footer.style.display = "none";
    sortList.classList.remove("navigation__list--show");

    setInitialDate();
}

function closeForm() {
    form.style.display = "none";
    header.style.display = "block"
    list.style.display = "block";
    footer.style.display = "block";
}

    function setInitialDate() {
        let now = new Date();
        let year = now.getFullYear();
        let month = (now.getMonth() + 1).toString().padStart(2, "0");
        let day = now.getDate().toString().padStart(2, "0")
        let date = `${year}-${month}-${day}`;
        document.getElementById("date-input").value = date;
    }

function onTaskCreate() {
    event.preventDefault();
    let taskName = document.getElementById("task-input").value;
    let taskDate = document.getElementById("date-input").value;
    let taskPriority = document.getElementById("priority-select").value;
    let taskIndex = tasksArray.length;
    let newTask = new Task(taskName, taskDate, taskPriority);
    tasksArray.push(newTask);
    
    localStorage.setItem('storeList', JSON.stringify(tasksArray));

    closeForm();

    // show new task always at the last page of list 
    if (tasksArray.length / tasksPerPage > currentPage) {
        goToPage("last");
    } else {
        addTaskToList(taskName, taskDate, taskPriority, taskIndex);
    }
    removeSortArrow();
    (function clearInputs() {
        document.getElementById("task-input").value = "";
        document.getElementById("priority-select").value = 1;
    })();
}  

function onTaskRemove(index) {  
    tasksArray.splice(index, 1);
    localStorage.setItem("storeList", JSON.stringify(tasksArray));

    console.log("index - " + index);
    console.log("array len -" + tasksArray.length);
    console.log("page - " + currentPage);
    // console.log(index === tasksArray.length);
    // console.log(index % tasksPerPage === 0);
    // console.log(currentPage !== 1);

    if (index == tasksArray.length && index % tasksPerPage == 0 && currentPage != 1 ){
        // let page = currentPage - 1;
        // goToPage(page);
        goToPage(currentPage - 1);
    } else {
        goToPage(currentPage);
    }
}

function onCheckboxChange(event) {
    let index = this.parentElement.id;
    if (this.checked) {
        tasksArray[index].done = true;
    } else {
        tasksArray[index].done = false;
    }
    // let index = event.target.parentElement.id;
    // if (event.target.checked) {
    //     tasksArray[index].done = true;
    // } else {
    //     tasksArray[index].done = false;
    // }
    localStorage.setItem("storeList", JSON.stringify(tasksArray));
}

function addTaskToList(taskName, taskDate, taskPriority, taskIndex, taskDone) {
    let taskElement = document.createElement('li');

    let checkbox = document.createElement("input"); 
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = taskDone ? true : false;
    checkbox.classList.add("task__checkbox");
    checkbox.addEventListener("click", onCheckboxChange);
    
    let priority = taskPriority == 1? "low" : taskPriority == 2? "medium" : "high";

    let fields = `<div class="task__name" >${taskName}</div><div class="task__date">${taskDate}</div><div class="task__priority">${priority}</div>`
    
    let btn = document.createElement("button");
    btn.innerHTML = '<i class="fas fa-trash"></i>';
    btn.classList.add("task__remove");
    btn.addEventListener("click", onTaskRemove.bind(btn, taskIndex));

    taskElement.innerHTML = fields;
    taskElement.prepend(checkbox);
    taskElement.append(btn);
    taskElement.classList.add('task');
    taskElement.setAttribute('id', taskIndex);

    list.appendChild(taskElement);
}

function onSort() {
    event.preventDefault();
    let category = this.parentElement.id;
    let direction = this.classList.contains("sorted-desc") ? "ascending" : "descending" ;
    sortArray(category, direction);

    removeSortArrow();
    if (direction === "descending") {
        this.classList.add("sorted-desc");
    } else {
        this.classList.add("sorted-asc");
    }
}

function removeSortArrow() {
    sortBtns.forEach(function(btn){
        btn.classList.remove("sorted-desc", "sorted-asc");
    });
}

function sortArray(cat, direction) {
    tasksArray.sort(function(a, b){
        if (direction === "ascending") {
            return a[cat] > b[cat] ? 1 : a[cat] < b[cat] ? -1 : 0 ;
        } else {
            return a[cat] > b[cat] ? -1 :  a[cat] < b[cat] ? 1 : 0;
        }
    });

    goToPage("first");
}

function updateList(tasks = tasksArray, startIndex = 0) {
    list.innerHTML = "";  
    for (let i = 0; i < tasks.length; i++) {
        let taskIndex = startIndex + i;
        addTaskToList(tasks[i].name, tasks[i].date, tasks[i].priority, taskIndex, tasks[i].done);
    }
}

function onPageChange(direction) {
    if (direction == "next") {
        goToPage(currentPage + 1);
    } else {
        goToPage(currentPage - 1);
    }
}

function goToPage(page) {
    let startIndex;
 
    switch (page) {
        case "first":
        case 1:
            startIndex = 0;
            currentPage = 1;
            break;
        case "last": 
            let rest = tasksArray.length % tasksPerPage;
            startIndex = rest === 0 ? (tasksArray.length - tasksPerPage) : (tasksArray.length - rest);
            // startIndex = tasksArray.length - rest;
            console.log("rest: " + rest);
            console.log("start: " + startIndex)
            currentPage = Math.ceil(tasksArray.length / tasksPerPage);
            // currentPage = Math.floor(tasksArray.length / tasksPerPage + 1);
            // debugger;
            break;
        default: 
            startIndex = (page - 1) * tasksPerPage;
            currentPage = page;
    }

    let stopIndex = startIndex + tasksPerPage;
    let showTasks = tasksArray.slice(startIndex, stopIndex);

    // console.log("start index: " + startIndex);
    // console.log("stop index: " + stopIndex);
    // console.log("tasks per page: " + tasksPerPage);
    updateList(showTasks, startIndex);
    buttonsDisable(currentPage);
}

function buttonsDisable(page) {
    prevBtn.disabled = page === 1 ? true : false;
    nextBtn.disabled = tasksArray.length / tasksPerPage <= page ? true : false; 
}