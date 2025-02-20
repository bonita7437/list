let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let errorMessage = document.getElementById("error-message");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let mode = "all";
let filterList = [];

taskInput.addEventListener("input", function () {
  if (taskInput.value.trim() === "") {
    addButton.disabled = true;
  } else {
    addButton.disabled = false;
  }
});

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
console.log(tabs);

function addTask() {
  if (taskInput.value.trim() === "") {
    errorMessage.style.display = "block";
    return;
  }

  errorMessage.style.display = "none";

  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);

  taskInput.value = "";
  addButton.disabled = true;
  taskInput.focus();

  render();
}

function render() {
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += `
        <div class="task">
          <div class=task-done>${list[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')" class="border-0">
            <i class="fa-solid fa-rotate-left text-secondary"></i>
            </button>
            <button onclick="deleteTask('${list[i].id}')" class="border-0">
            <i class="fa-solid fa-trash text-danger"></i>
            </button>
          </div>
        </div>`;
    } else {
      resultHTML += `
        <div class="task">
          <div>${list[i].taskContent}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')" class="border-0">
            <i class="fa-solid fa-check text-success"></i>
            </button>
            <button onclick="deleteTask('${list[i].id}')" class="border-0">
            <i class="fa-solid fa-trash text-danger"></i>
            </button>
          </div>
        </div>
      `;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
  console.log(taskList);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }

  if (mode === "ongoing" || mode === "done") {
    for (let i = 0; i < filterList.length; i++) {
      if (filterList[i].id == id) {
        filterList.splice(i, 1);
        break;
      }
    }
  }

  render();
}

function filter(event) {
  mode = event.target.id;
  filterList = [];

  underLine.style.width = event.target.offsetWidth + "px";
  underLine.style.left = event.target.offsetLeft + "px";
  underLine.style.top =
    event.target.offsetTop + (event.target.offsetHeight - 4) + "px";

  if (mode === "all") {
    render();
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    render();
    console.log("진행증", filterList);
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
