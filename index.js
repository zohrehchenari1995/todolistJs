// Add new todo

const todos = [];
const searchInput = document.querySelector(".search__input");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todoList");
const selectFilter =document.querySelector(".todo__list");

searchInput.addEventListener("submit",addNewTodos);
selectFilter.addEventListener("change",filterTodos);

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
      <button data-todo-id =${todo.id}>
          <i class="todo__checked  fa-solid fa-square-check"></i>
      </button>
      <button data-todo-id =${todo.id}>
      <i class="todo__trash     fa-solid fa-trash-can"></i>
      </button>
    </li> `
  });
    todoList.innerHTML = result;
    todoInput.value = "";
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