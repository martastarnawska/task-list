import {app} from "./app.js";
import {updateList} from "./addTask.js";

function goToPage(page) {
    let startIndex;
 
    switch (page) {
        case "first":
        case 1:
            startIndex = 0;
            app.currentPage = 1;
            break;
        case "last": 
            let rest = app.tasksArray.length % app.tasksPerPage;
            startIndex = rest === 0 ? (app.tasksArray.length - app.tasksPerPage) : (app.tasksArray.length - rest);
            app.currentPage = Math.ceil(app.tasksArray.length / app.tasksPerPage);
            break;
        default: 
            startIndex = (page - 1) * app.tasksPerPage;
            app.currentPage = page;
    }

    let stopIndex = startIndex + app.tasksPerPage;
    let showTasks = app.tasksArray.length > 0 ? app.tasksArray.slice(startIndex, stopIndex) : 0

    updateList(showTasks, startIndex);
    buttonsDisable(app.currentPage);
}

function buttonsDisable(page) {
    app.prevBtn.disabled = page === 1 ? true : false;
    if (app.tasksArray.length > 0) {
        app.nextBtn.disabled = app.tasksArray.length / app.tasksPerPage <= page ? true : false; 
    } else {
        app.nextBtn.disabled = true;
    }
}

export {goToPage}