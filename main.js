
class entries {
  constructor(name, done) {
    this.name = name;
    this.done = done;
  }
}


//selectors

const fieldInput = document.querySelector('.to-do-input');
const todoButton = document.querySelector('.to-do-button');
const todoList = document.querySelector('.todolist');
const filterOption = document.querySelector('.filter-todo');
const burger = document.querySelector('.burger');
const nav = document.querySelector('.navLinks');
const navLinks = document.querySelectorAll('.navLinks li');


//event listeners

document.addEventListener('DOMContentLoaded', getTodosFromLocalStorage);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



//functions
 
function addTodo(event) {
   
  event.preventDefault();
  
  var x = document.forms["todoForm"]["name"].value;
  if (x == "") {
    return false;
  }

  //TOdodiv
  const todoDiv = document.createElement('div');
  todoDiv.classList.add("todo");
  //create li
  const newTodo = document.createElement('li');
  newTodo.innerText = fieldInput.value;
  newTodo.classList.add("to-do-item");
  todoDiv.appendChild(newTodo);
  //add todo to local storage
  saveLocalTodos(fieldInput.value);
  //checked
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>'
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //trash btn
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //append to list
  todoList.appendChild(todoDiv);
  //clearing
  fieldInput.value = "";
}

function deleteCheck(e){
  const item = e.target;
  //DELETE TODO
  if(item.classList[0] === "trash-btn"){
    const todo = item.parentElement;
    //animation
    todo.classList.add("fall");
    removeTodosFromLocalStorage(todo);
    todo.addEventListener('transitionend',function(){
      todo.remove();
    });
  }
  //check mark
  if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle("completed");  
  }
}


function filterTodo(e) {
  const todos = document.querySelectorAll('.todo');
  todos.forEach((todo) => {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}


const navSlide = () => {
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
  });

  navLinks.forEach((link, index) => {
    link.style.animation = `navLinkFade 0.5 ease forwards ${index / 5 + 2}s`;
  });
}

navSlide();

function saveLocalTodos(todo) {
  //checking for existing todos in localstorage

  let todos;
  
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));

  let todos2= new entries;

  //entries je klasa

  if (localStorage.getItem('todos2') === null) {
    todos2= [];
  } else {
    todos2.name = JSON.parse(localStorage.getItem('todos2.name'));
    todos2.done = JSON.parse(localStorage.getItem('todos2.done'));
  }
  todos2.name.push(todo);
  if (todo.classList == "completed") {
    todos2.done.push(1);
  } else {
    todos2.done.push(0);
  }
  localStorage.setItem('todos2', JSON.stringify(todos2.name));


}

function getTodosFromLocalStorage() {
  //checking for existing todos in localstorage
  let todos;
  
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function (todo){
    //TOdodiv
  const todoDiv = document.createElement('div');
  todoDiv.classList.add("todo");
  //create li
  const newTodo = document.createElement('li');
  newTodo.innerText = todo;
  newTodo.classList.add("to-do-item");
  todoDiv.appendChild(newTodo);
  //checked
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>'
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //trash btn
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //append to list
  todoList.appendChild(todoDiv);
  })
}

function removeTodosFromLocalStorage(todo) {
  //checking for existing todos in localstorage
  let todos;
  
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);

  localStorage.setItem("todos", JSON.stringify(todos));  

}

