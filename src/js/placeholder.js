import { app } from "./app";

function addPlaceholder() {
    let placeholder = '<li class="task task--placeholder"> <div class="task__name"> Your first task will appear here </div> </li>'
    app.list.innerHTML = placeholder;
}

export {addPlaceholder}
