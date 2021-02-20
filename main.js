//selectors

const fieldInput = document.querySelector('.to-do-input');
const todoButton = document.querySelector('.to-do-button');
const todoList = document.querySelector('.todolist');
const filterOption = document.querySelector('.filter-todo');


//event listeners

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


const navSlide = () => {

  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.navLinks');
  const navLinks = document.querySelectorAll('.navLinks li');

  //toggle nav
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
  });
  //ANimate links
  navLinks.forEach((link, index) => {
    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 2}s`; 
    console.log(index / 5);
  });
}


//functions
 
function addTodo(event) {
   
  event.preventDefault();
  
  var x = document.forms["todoForm"]["name"].value;
  if (x == "") {
    alert("Unesite aktivnost");
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

navSlide();



