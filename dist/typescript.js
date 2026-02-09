//---confirming js connected or not
console.log("task manager is working");
// now i have to fetch html details
var form = document.getElementById("taskinput");
var tasklist = document.getElementById("task-list");
var template = document.getElementById("task-template");
// ---------------------storing the initial data from html to local storage
var tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
// showing the tasks when my page reloads 
showtasks();
// -------------------------now the event listner works and adds ther form
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var task = {
        name: document.getElementById("name").value,
        subject: document.getElementById("subject").value,
        date: document.getElementById("date").value,
        message: document.getElementById("message").value,
        status: "pending",
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showtasks();
    form.reset();
});
// ---------------- SHOW TASKS ----------------
function showtasks() {
    tasklist.innerHTML = "";
    tasks.forEach(function (task, index) {
        var clone = template.content.cloneNode(true); // this will copy all the elements to clone variable since my template section in html is hidden i.e it will not show in ui
        var card = clone.firstElementChild;
        // ----------filling the tasks data--------------- card refers to as one single task
        card.querySelector(".task-subject").textContent = task.subject;
        card.querySelector(".task-name").textContent = task.name;
        card.querySelector(".task-date").textContent = task.date;
        card.querySelector(".task-message").textContent = task.message;
        card.querySelector(".task-status").textContent = task.status;
        //------------button functions----it fetches the action button from cards
        var completebtn = card.querySelector(".complete-btn");
        var editbtn = card.querySelector(".edit-btn");
        var deletebtn = card.querySelector(".delete-btn");
        completebtn.onclick = function () {
            if (tasks[index].status === "pending") {
                tasks[index].status = "completed";
            }
            else {
                tasks[index].status = "pending";
            }
            localStorage.setItem("tasks", JSON.stringify(tasks));
            showtasks();
        };
        editbtn.onclick = function () {
            var newname = prompt("Edit name", task.name);
            var newsub = prompt("Edit task", task.subject);
            var newdate = prompt("Edit task", task.date);
            var newmsg = prompt("Edit task", task.message);
            if (newname != null) {
                tasks[index].name = newname;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                showtasks();
            }
            if (newsub != null) {
                tasks[index].name = newsub;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                showtasks();
            }
            if (newdate != null) {
                tasks[index].name = newdate;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                showtasks();
            }
            if (newmsg != null) {
                tasks[index].message = newmsg;
                localStorage.setItem("tasks", JSON.stringify(tasks));
                showtasks();
            }
        };
        deletebtn.onclick = function () {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            showtasks();
        };
        if (task.status === "completed") {
            completebtn.textContent = "MArk as pending";
        }
        else {
            completebtn.textContent = "Mark as completed";
        }
        tasklist.appendChild(clone);
    });
}
