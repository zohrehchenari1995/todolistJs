// Add new todo

let todos = [];
const searchInput = document.querySelector(".search__input");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todoList");
const selectFilter =document.querySelector(".todo__list");

searchInput.addEventListener("submit",addNewTodos);
selectFilter.addEventListener("change",filterTodos);

// Add newtodos
function addNewTodos(e){
    e.preventDefault();
    if(!todoInput.value) return null;
    const newTodo ={
      id : Date.now(),
      createdAt  : new Date().toISOString(),
      title : todoInput.value,
      isCompleted : false,
    };
    todos.push(newTodo);
    createdTodos(todos);
   
}

// Created todos on Dom
function createdTodos(todos){

  let result ="";
    todos.forEach((todo)=>{
      result +=` 
      <li class="todo">
      <p class="todo__title">${todo.title}</p>
      <span class="todo__createAt">${new Date(todo.createdAt).toLocaleDateString("fa-IR")}</span>
      <button data-todo-id =${todo.id}  class="todo__checked">
          <i class="fa-solid fa-square-check"></i>
      </button>
      <button data-todo-id =${todo.id}  class="todo__trash">
      <i class="fa-solid fa-trash-can"></i>
      </button>
    </li> `
  });
    todoList.innerHTML = result;
    todoInput.value = "";
    // slelcted todo trash (beacuse no exist in dom)
    const todoTrash = [...document.querySelectorAll(".todo__trash")];
    todoTrash.forEach((btn)=>{
      btn.addEventListener("click",removeTodos);

    })
};


// Filter todos
function filterTodos(e){
  const filter = e.target.value;

  switch(filter){
    case "all" :{
      createdTodos(todos);
      break;
    }
    case "completed":{
      const filteredTodos = todos.filter((t)=>{return  t.isCompleted});
      createdTodos(filteredTodos);
      break;
    }
    case "uncompleted":{
      const filteredTodos = todos.filter((t)=>{return  !t.isCompleted});
      createdTodos(filteredTodos);
      break;
    }
    default: createdTodos(todos);
  }
}

// Remove todos(trash icon)
function removeTodos(e){
  const todoId = Number(e.target.dataset.todoId);
  const filterTodo = todos.filter((t)=>{return t.id !== todoId});
  todos =filterTodo;
}

