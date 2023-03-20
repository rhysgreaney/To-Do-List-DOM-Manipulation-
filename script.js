// Step 1 find the element

var addTaskButton = document.getElementById("add-task");
var newTaskInput = document.getElementById("task-input");
var todoListContainer = document.getElementById("todo-list");
var templateContainer = document.getElementById("list-item-template");
var template = templateContainer.innerHTML;

// Step 2 Write the behaviour

function onAddTaskClicked(event) {
var taskName = newTaskInput.value;
newTaskInput.value = "";
var taskHTML = template.replace("<!--TASK NAME-->", taskName);
todoListContainer.insertAdjacentHTML('afterbegin', taskHTML);
}
// Step 3 Link to event handler 

addTaskButton.addEventListener('click', onAddTaskClicked);