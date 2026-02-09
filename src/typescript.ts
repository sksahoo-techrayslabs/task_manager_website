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
