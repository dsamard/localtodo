const defaultTodos = ["do this", "do that", "do another"];

const todos = [...(JSON.parse(localStorage.getItem("todos")) || defaultTodos)];

const elements = {
  todoList: document.getElementById("todo-list"),
  todoInput: document.getElementById("todo-input"),
  addButton: document.getElementById("add-todo")
};

///////////////////////////////////////////////////////////////////////////////

function renderTodoList() {
  elements.todoList.innerHTML = null;
  todos.forEach(function(todo, index) {
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "delete";
    deleteButton.addEventListener("click", function() {
      deleteTodo(index);
    });

    newTodo.append(" | ", deleteButton);
    elements.todoList.appendChild(newTodo);
  });
}

function isInputFilled() {
  return elements.todoInput.value.length > 0;
}

function addTodo() {
  if (isInputFilled()) {
    const todoText = elements.todoInput.value;
    todos.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodoList();
    elements.todoInput.value = "";
    elements.todoInput.focus();
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodoList();
}

///////////////////////////////////////////////////////////////////////////////

elements.todoInput.addEventListener("keypress", function(e) {
  if (e.keyCode === 13) {
    addTodo();
  }
});

elements.addButton.addEventListener("click", function() {
  addTodo();
});

///////////////////////////////////////////////////////////////////////////////

renderTodoList();
elements.todoInput.focus();
