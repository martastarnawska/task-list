import { app } from "./app";

function addPlaceholder() {
    let placeholder = '<li class="task"> <div class="task__name task__name--placeholder"> Your first task will appear here </div> </li>'
    app.list.innerHTML = placeholder;
}

export {addPlaceholder}
