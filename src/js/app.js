const app = {
list : document.getElementById("tasks-list"),
 prevBtn : document.getElementById("previous-btn"),
 nextBtn : document.getElementById("next-btn"),
 addBtn : document.getElementById("add-btn"),
 form : document.getElementById("form"),
 footer : document.getElementById("footer"),
 header : document.getElementById("header"),
 openSort : document.getElementById("sort-open"),
 sortBtns : document.querySelectorAll(".sort-btn"),
 sortList :  document.getElementById("sort-list"),
 selectVolume : document.getElementById("select-task-num"),
largeScreen : window.matchMedia("(min-width: 1300px)"),

// tasksArray : [],
currentPage : 1,
tasksPerPage : 5,
}

export {app}