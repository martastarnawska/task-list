function setInitialDate() {
    let now = new Date();
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, "0");
    let day = now.getDate().toString().padStart(2, "0")
    let date = `${year}-${month}-${day}`;
    document.getElementById("date-input").value = date;
}


export { setInitialDate as default };