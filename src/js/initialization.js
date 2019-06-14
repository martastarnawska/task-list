import {app} from "./app.js";
import {onFormOpen, closeForm, onTaskCreate, onPageChange, navOpenClose, onVolumeSelect, handleScreenResizing, onSort}
        from "./eventhandlers.js"
import {goToPage} from "./pagination.js";
import setInitialDate from "./date.js";
import { addPlaceholder } from "./placeholder.js";
import { sortBtnsDisable } from "./sort.js";

function init() {
    const closeBtn = document.getElementById("form-close");

    app.addBtn.addEventListener("click", onFormOpen);
    app.form.addEventListener('submit', onTaskCreate);
    app.prevBtn.addEventListener("click", onPageChange.bind(this, "prev"));
    app.nextBtn.addEventListener("click", onPageChange.bind(this, "next"));
    app.openSort.addEventListener("click", navOpenClose);
    app.selectVolume.addEventListener("change", onVolumeSelect);
    app.largeScreen.addListener(handleScreenResizing);
    closeBtn.addEventListener("click", closeForm);

    app.sortBtns.forEach(function(btn){
        btn.addEventListener("click", onSort);
        btn.addEventListener("click", navOpenClose);
    });

// TODO:
    if (localStorage.getItem('storeList')) {
        let retrivedList = localStorage.getItem('storeList');
        if (JSON.parse(retrivedList).length > 0) {
            app.tasksArray = JSON.parse(retrivedList);
            goToPage("first");
            if (app.tasksArray.length === 1) {
                sortBtnsDisable();
            }
        } else  {
            app.tasksArray = [];
            addPlaceholder();
            sortBtnsDisable();
        }
    } else {
        app.tasksArray = [];
        addPlaceholder();
        sortBtnsDisable(); 
    }

    handleScreenResizing(app.largeScreen);
    setInitialDate();
}

export {init}