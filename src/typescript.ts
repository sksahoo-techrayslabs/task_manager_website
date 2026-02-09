//---confirming js connected or not
console.log("task manager is working");

// now i have to fetch html details
const form = document.getElementById("taskinput") as HTMLFormElement;
const tasklist = document.getElementById("task-list") as HTMLDivElement;
const template = document.getElementById("task-template") as HTMLTemplateElement;

// defining the task structure
type Task =
  {
    name: string;
    subject: string;
    date: string;
    message: string;
    status: "pending" | "completed";

  };
// ---------------------storing the initial data from html to local storage

let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

// showing the tasks when my page reloads 
showtasks();

// -------------------------now the event listner works and adds ther form

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const task: Task =
  {
    name: (document.getElementById("name") as HTMLInputElement).value,
    subject: (document.getElementById("subject") as HTMLInputElement).value,
    date: (document.getElementById("date") as HTMLInputElement).value,
    message: (document.getElementById("message") as HTMLTextAreaElement).value,
    status: "pending",
  };
  
  alert("task added");

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showtasks();
  form.reset();

});

// ---------------- SHOW TASKS ----------------

function showtasks() {
  tasklist.innerHTML = "";

  tasks.forEach((task, index) => {
    const clone = template.content.cloneNode(true) as HTMLElement; // this will copy all the elements to clone variable since my template section in html is hidden i.e it will not show in ui
    const card = clone.firstElementChild as HTMLDivElement;


    // ----------filling the tasks data--------------- card refers to as one single task
    card.querySelector(".task-subject")!.textContent = task.subject;
    card.querySelector(".task-name")!.textContent = task.name;
    card.querySelector(".task-date")!.textContent = task.date;
    card.querySelector(".task-message")!.textContent = task.message;
    card.querySelector(".task-status")!.textContent = task.status;




    //------------button functions----it fetches the action button from cards
    const completebtn = card.querySelector(".complete-btn") as HTMLButtonElement;
    const editbtn = card.querySelector(".edit-btn") as HTMLButtonElement;
    const deletebtn = card.querySelector(".delete-btn") as HTMLButtonElement;


    completebtn.onclick = function () {
  if (tasks[index]!.status === "pending") {
    tasks[index]!.status = "completed";
  } else {
    tasks[index]!.status = "pending";
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  showtasks();
};

    editbtn.onclick = function () {
      const newname = prompt("Edit name", task.name);
      const newsub = prompt("Edit task", task.subject);
      const newdate = prompt("Edit task", task.date);
      const newmsg = prompt("Edit task", task.message);

      if (newname != null) {
        tasks[index]!.name = newname;
        
        localStorage.setItem("tasks", JSON.stringify(tasks));
        showtasks();
      }

      if (newsub != null) {
        tasks[index]!.name = newsub;
        
        localStorage.setItem("tasks", JSON.stringify(tasks));
        showtasks();
      }

      if (newdate != null) {
        tasks[index]!.name = newdate;
        
        localStorage.setItem("tasks", JSON.stringify(tasks));
        showtasks();
      }
       
      if (newmsg != null) {
        tasks[index]!.message = newmsg;

        localStorage.setItem("tasks", JSON.stringify(tasks));
        showtasks();
      }
      
    };

    deletebtn.onclick = function () {
      const isconfirmed=confirm("are you sure want to delete this ?");
      if (isconfirmed){
        tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      showtasks();
      }
      
    };

    if (task.status === "completed") {
      completebtn.textContent="MArk as pending";
    }
    else{
      completebtn.textContent="Mark as completed"
    }

    tasklist.appendChild(clone);

  });
}