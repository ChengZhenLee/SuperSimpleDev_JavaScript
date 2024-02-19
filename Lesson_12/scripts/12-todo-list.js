const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

renderTodoList()

function renderTodoList () {
  let todoListHTML = '';

  todoList.forEach(function(todoObject, index) {
    const { name, dueDate } = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button" onclick="
        removeTodo(${index});
        renderTodoList();
      ">Delete</button>`;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list')
    .innerHTML = todoListHTML;
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  dueDate = dateInputElement.value;
  
  todoList.push({
    name,
    dueDate
  });

  localStorage.setItem('todoList', JSON.stringify(todoList));

  inputElement.value = '';

  renderTodoList();
}

function removeTodo(index) {
  todoList.splice(index, 1);
  localStorage.setItem('todoList', JSON.stringify(todoList));
}