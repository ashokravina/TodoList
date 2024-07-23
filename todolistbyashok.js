let todoItemsContainerEl = document.getElementById("todoItemsContainer");
let addTodoButtonEl = document.getElementById("addTodoButton")
let saveTodoButtonEl = document.getElementById("saveTodoButton")

function saveTodoListinLocal() {
    let StringifyedList = localStorage.getItem("Todolist");
    let parseTodoList = JSON.parse(StringifyedList);
    if (parseTodoList === null) {
        return [];
    } else {
        return parseTodoList
    }
}

let TodoList = saveTodoListinLocal();
let todoCount = TodoList.length;

saveTodoButtonEl.onclick = function() {
    localStorage.setItem("Todolist", JSON.stringify(TodoList))

}


function OntodoListStatusChenge(checkboxId, labelId, todoId) {
    let checkboxIdEl = document.getElementById(checkboxId);
    let labelIdEl = document.getElementById(labelId);
    labelIdEl.classList.toggle("checked");
    let todoObjectIndex = TodoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;

        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoObject = TodoList[todoObjectIndex];

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

}

function deleteTodoList(todoId) {
    let todoIdEl = document.getElementById(todoId);
    todoItemsContainerEl.removeChild(todoIdEl)

    let deleteElementIndex = TodoList.findIndex(function(eachItem) {
        let eachItemId = "todo" + eachItem.uniqueNo;
        if (eachItemId === todoId) {
            return true
        } else {
            return false
        }
    });
    TodoList.splice(deleteElementIndex, 1)
}


function createAndaddTodoListItem(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let ListContainerEl = document.createElement("li");
    ListContainerEl.classList.add("list-container", "d-flex", "flex-row");
    ListContainerEl.id = todoId;
    todoItemsContainerEl.appendChild(ListContainerEl)

    let inputEl = document.createElement("input");
    inputEl.type = "checkbox";
    inputEl.id = checkboxId;
    inputEl.checked = todo.isChecked;
    inputEl.onclick = function() {
        OntodoListStatusChenge(checkboxId, labelId, todoId);
    }
    inputEl.classList.add("inputEl");
    ListContainerEl.appendChild(inputEl)

    let labelcontainerEl = document.createElement("div")
    labelcontainerEl.classList.add("label-container", "d-flex", "flex-row", "shadow");
    ListContainerEl.appendChild(labelcontainerEl);

    let labelEl = document.createElement("label")
    labelEl.setAttribute("for", checkboxId);
    labelEl.classList.add("label");
    labelEl.id = labelId;
    labelEl.textContent = todo.text;
    if (todo.isChecked === true) {
        labelEl.classList.add("checked")
    }
    labelcontainerEl.appendChild(labelEl)

    let deteleContainerEl = document.createElement("div")
    deteleContainerEl.classList.add("delete-container")
    labelcontainerEl.appendChild(deteleContainerEl);

    let deleteEl = document.createElement("i");
    deleteEl.classList.add("fa-regular", "fa-trash-can")
    deleteEl.onclick = function() {
        deleteTodoList(todoId);
    }
    deteleContainerEl.appendChild(deleteEl)

}
for (let todo of TodoList) {
    createAndaddTodoListItem(todo);
}

function addTodoListItem() {
    let todoUserInputEl = document.getElementById("todoUserInput");
    let todoUserInputValue = todoUserInputEl.value;
    if (todoUserInputValue === "") {
        alert("Enter Valid Text");
        return;
    }
    todoCount = todoCount + 1;
    let newTodo = {
        text: todoUserInputValue,
        uniqueNo: todoCount,
        isChecked: false,
    };
    TodoList.push(newTodo)
    createAndaddTodoListItem(newTodo);
    todoUserInputEl.value = " ";


}

addTodoButtonEl.onclick = function() {
    addTodoListItem()
}