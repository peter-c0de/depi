// Onload
window.onload = function () {
    loadData();
};

function loadData() {
    const savedData = window.localStorage.getItem("task-manager-data");

    if (savedData) {
        const data = JSON.parse(savedData);
        columnsData = data;
        taskCounter = 0;

        // Helper to create tasks
        function createTask(content, parentId) {
            const task = document.createElement("div");
            task.textContent = content;
            task.id = "toDoTask_" + taskCounter;
            task.className = "task my-2";
            task.setAttribute("draggable", "true");
            task.setAttribute("ondragstart", "dragstartHandler(event)");
            document.getElementById(parentId).appendChild(task);
            taskCounter++;
        }

        columnsData.todo.forEach( function(task) {
            createTask(task, "toDoBox");
        });

        columnsData.inProgress.forEach( function(task) {
            createTask(task, "inProgressBox");
        });

        columnsData.done.forEach( function(task) {
            createTask(task, "doneBox");
        });
    }
}

// Reference: https://www.w3schools.com/html/html5_draganddrop.asp
function dragstartHandler(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dragoverHandler(ev) {
    ev.preventDefault();
}

function dropHandler(ev) 
{
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    saveData();
}

var columnsData = {
    todo: [],
    inProgress: [],
    done: [],
};

function saveData()
{
    columnsData = {
        todo: [],
        inProgress: [],
        done: [],
    };

    var todoTasks = document.querySelectorAll("#toDoBox div");
    todoTasks.forEach( function(task) {
        columnsData.todo.push(task.innerHTML);
    });

    var inProgressTasks = document.querySelectorAll("#inProgressBox div");
    inProgressTasks.forEach( function(task) {
        columnsData.inProgress.push(task.innerHTML);
    });

    var doneTasks = document.querySelectorAll("#doneBox div");
    doneTasks.forEach( function(task) {
        columnsData.done.push(task.innerHTML);
    });


    window.localStorage.setItem("task-manager-data", JSON.stringify(columnsData));
}

let taskCounter = 0;
function addTask() 
{
    const input = document.getElementById('inputTask').value;
    const div = document.getElementById('toDoBox');

    if (input.trim() !== "") {
        const task = document.createElement("div");
        task.textContent = input;

        // Unique ID using counter
        task.id = "toDoTask_" + taskCounter;
        task.className = "task my-2";
        task.setAttribute("draggable", "true");
        task.setAttribute("ondragstart", "dragstartHandler(event)");

        div.appendChild(task);
        taskCounter++; // Increment for the next task
    }

    document.getElementById('inputTask').value = "";
    saveData();
}


// Reference: https://www.w3schools.com/jsref/met_storage_clear.asp
function clearTasks()
{
    localStorage.clear(); // Empty the localStorage
    location.reload(); // Refreshes the page
}