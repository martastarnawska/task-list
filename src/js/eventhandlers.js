import {app} from "./app.js";
import {goToPage} from "./pagination.js";
import {removeSortArrow, sortArray} from "./sort.js";
import setInitialDate from "./date.js";
import {Task} from "./taskClass.js";

function onFormOpen() {
    app.form.classList.remove("hidden");
    app.header.style.display = "none";
    app.list.style.display = "none";
    app.footer.style.display = "none";
    app.sortList.classList.remove("navigation__list--show");
    setInitialDate();
}

function closeForm() {
    app.form.classList.add("hidden");
    app.header.style.display = app.largeScreen.matches? "flex" : "block";
    app.list.style.display = "block";
    app.footer.style.display = "block";
}

function onTaskCreate() {
    event.preventDefault();
    let taskName = document.getElementById("task-input").value;
    let taskDate = document.getElementById("date-input").value;
    let taskPriority = document.getElementById("priority-select").value;
    let taskIndex = app.tasksArray.length;
    let newTask = new Task(taskName, taskDate, taskPriority);
    app.tasksArray.push(newTask);
    
    localStorage.setItem('storeList', JSON.stringify(app.tasksArray));

    if (! app.largeScreen.matches) {
        closeForm();
    } 

    // show new task always at the last page:
    goToPage("last");

    removeSortArrow();
    (function clearInputs() {
        document.getElementById("task-input").value = "";
        document.getElementById("priority-select").value = 1;
    })();
}  

function onPageChange(direction) {
    if (direction == "next") {
        goToPage(app.currentPage + 1);
    } else {
        goToPage(app.currentPage - 1);
    }
}

function navOpenClose() {
    app.sortList.classList.toggle("navigation__list--show");
}

function onVolumeSelect() {
    let value = app.selectVolume[app.selectVolume.selectedIndex].value;
    app.tasksPerPage = Number(value);
    goToPage("first");
    navOpenClose();
}

function handleScreenResizing(largeScreen) {
    if(largeScreen.matches) {
        app.form.classList.remove("hidden");
        app.header.style.display = "flex";
        app.list.style.display = "block";
    }
    else {
        app.form.classList.add("hidden");
        app.sortList.classList.remove("navigation__list--show");
    }
    app.footer.style.display = "block";
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

function onCheckboxChange(event) {
    let index = this.parentElement.id;
    app.tasksArray[index].done = this.checked? true : false;
    localStorage.setItem("storeList", JSON.stringify(app.tasksArray));
}


function onTaskRemove(index) {  
    app.tasksArray.splice(index, 1);
    localStorage.setItem("storeList", JSON.stringify(app.tasksArray));

    if (index == app.tasksArray.length && index % app.tasksPerPage == 0 && app.currentPage != 1 ) {
        goToPage(app.currentPage - 1);
    } else {
        goToPage(app.currentPage);
    }
}

export {onFormOpen, closeForm, onTaskCreate, onPageChange, navOpenClose, onVolumeSelect, handleScreenResizing, onSort, onCheckboxChange, onTaskRemove}

