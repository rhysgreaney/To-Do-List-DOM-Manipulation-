/* please note ChatGPT assisted me with basic errors that occured throughout
the coding phase, these included indents, misuse of quotation marks and semi-colons */

// Step 1 find the element
var addTaskButton = document.getElementById("add-task");
var newTaskInput = document.getElementById("task-input");
var todoListContainer = document.getElementById("todo-list");
var templateElement = document.getElementById("list-item-template");
var template = templateElement.innerHTML;

var showActiveButton = document.getElementById("show-active");
var showAllTaskButton = document.getElementById("show-all");
var showCompletedButton = document.getElementById("show-completed");

function saveTasks(name, isCompleted){
    localStorage.setItem(name, isCompleted);
}

// Step 2 Write the behaviour
function onAddTaskClicked(event) {
    var taskName = newTaskInput.value;
    newTaskInput.value = "";
    var taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
    todoListContainer.insertAdjacentHTML('beforeend', taskHTML);

    saveTasks(taskName, false)
}

function onTodoListClicked(event){
   var targetElement = event.target;

   while (!targetElement.classList.contains("task")){
    targetElement = targetElement.parentElement;
   } 

   var checkbox = targetElement.querySelector(".checkbox");

   if (checkbox.checked){
        targetElement.classList.add("completed")
   } else {
        targetElement.classList.remove("completed")
   }

   var taskNameElement = targetElement.querySelector(".task-name")
   var taskName = taskNameElement.innerText;

   saveTasks(taskName, checkbox.checked)
}

function showActiveTasks(){
    var tasks = document.getElementsByClassName('task')
    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].classList.contains("completed")){
            //set display property to none
            tasks[i].style.display = "none";
        } else {
            tasks[i].style.display = "block";
        }
    }
}

function showAllTasks() {
    var tasks = document.getElementsByClassName('task');
    for (let i = 0; i < tasks.length; i++){
        tasks[i].style.display = 'block'
    }
}

/* please note I had issues with the "show completed" function, the button works
but i am not sure this is how it was intended*/ 

function showCompletedTasks() {
    var tasks = document.getElementsByClassName('task');
    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].classList.contains("completed")){
            //get document you want to hide
            var element = tasks[i]
            //set the display property to none
            tasks[i].style.display = "none";
        } else {
            tasks[i].style.display = "block";
        } 
    }
}

function renderTasks() {
    for (i = 0; i < localStorage.length; i++) {

        var taskName = localStorage.key(i)
        var isCompleted = localStorage.getItem(taskName) == "true";
        var taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
        if (!isCompleted){
            todoListContainer.insertAdjacentHTML('afterbegin, taskHTML');
        }
    }
}                                    

// Step 3 link to event handler
addTaskButton.addEventListener('click', onAddTaskClicked);
todoListContainer.addEventListener('click', onTodoListClicked);
showActiveButton.addEventListener('click', showActiveTasks);
showAllTaskButton.addEventListener('click', showAllTasks);
showCompletedButton.addEventListener('click', showCompletedTasks);


renderTasks();