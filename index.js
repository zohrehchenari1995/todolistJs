// Add new todo

let todos = [];
let filterValue ="all";

const searchInput = document.querySelector(".search__input");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todoList");
const selectFilter =document.querySelector(".todo__list");

// event
searchInput.addEventListener("submit",addNewTodos);
selectFilter.addEventListener("change",(e)=>{
  filterValue = e.target.value;
  filterTodos();
});

document.addEventListener("DOMContentLoaded",(e)=>{
  let todos = getAllTodos();
  createdTodos(todos);
})


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
    // todos.push(newTodo);
    saveTodo(newTodo);
    filterTodos();  
}

// Created todos on Dom
function createdTodos(todos){

  let result ="";
    todos.forEach((todo)=>{
      result +=` 
      <li class="todo">
      <p class="todo__title  ${todo.isCompleted && "completed"}">${todo.title}</p>
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

    // slelcted todo trash & addEvent (beacuse no exist in dom)
    const todoTrash = [...document.querySelectorAll(".todo__trash")];
    todoTrash.forEach((btn)=>{
      btn.addEventListener("click",removeTodos);
    });

    //selected todo check & addEvent (beacuse no exist in dom) 
    const todoCheck = [...document.querySelectorAll(".todo__checked")];
    todoCheck.forEach((btns)=>{
      btns.addEventListener("click",checkTodo);
    });
};


// Filter todos
function filterTodos(){

  let todos = getAllTodos();

  switch(filterValue){
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
    default: filterTodos();
  }
}

// Remove todos(trash icon)
function removeTodos(e){
  let todos = getAllTodos();
  const todoId = Number(e.target.dataset.todoId);
  const filterTodo = todos.filter((t)=> t.id !== todoId);
  todos =filterTodo;
  saveAllTodos(todos);
  filterTodos();
}
// check todos(check icon)
function checkTodo(e){
  let todos = getAllTodos();
 const todoCheckId = Number(e.target.dataset.todoId);
 const findId = todos.find((t)=> t.id === todoCheckId)
 findId.isCompleted = !findId.isCompleted;
 saveAllTodos(todos);
 filterTodos();
}


// !LocalStorage

// get todos of localstoragr
function getAllTodos(){
 const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
 return savedTodos;
}

// save todo(get todo / push todo to before todo/ save old todo)
function saveTodo(todo){
  let savedTodos = getAllTodos();
  savedTodos.push(todo);
  localStorage.setItem("todos",JSON.stringify(savedTodos));
  return savedTodos;
}

// saveAllTodos (new todo)
function saveAllTodos(todos){
  localStorage.setItem("todos",JSON.stringify(todos));
}

