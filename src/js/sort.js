import {app} from "./app.js";
import {goToPage} from "./pagination.js";


function removeSortArrow() {
    app.sortBtns.forEach(function(btn){
        btn.classList.remove("sorted-desc", "sorted-asc");
    });
}

function sortArray(cat, direction) {
    app.tasksArray.sort(function(a, b){
        if (direction === "ascending") {
            return a[cat] > b[cat] ? 1 : a[cat] < b[cat] ? -1 : 0 ;
        } else {
            return a[cat] > b[cat] ? -1 :  a[cat] < b[cat] ? 1 : 0;
        }
    });
    goToPage("first");
}

function sortBtnsDisable() {
    app.sortBtns.forEach(function(btn){
        btn.disabled = true;
    });
    removeSortArrow();
}

function sortBtnsEnable() {
    app.sortBtns.forEach(function(btn){
        btn.disabled = false;
    });
} 

export {removeSortArrow, sortArray, sortBtnsDisable, sortBtnsEnable}