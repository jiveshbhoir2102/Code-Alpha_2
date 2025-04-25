const inputBox=document.getElementById('inputBox');
const addBtn=document.getElementById('addBtn');
const todoList=document.getElementById('todoList');

 let editTodo=null;

 //Function to add to do
const addTodo=()=>{
   const inputText=inputBox.value.trim();
   if(inputText.length<=0){
    alert("You Must write something in your to do");
    return false;
   }

   if(addBtn.value ==="Edit"){
      editTodo.target.previousElementSibling.innerHTML=inputText;
      editLocalTodos(editTodo.target.previousElementSibling.innerHTML);
      addBtn.value="Add";
      inputBox.value="";
   }
   else{

  
   //creating p tag 
   const li=document.createElement("li");
   const p=document.createElement("p");
   p.innerHTML=inputText;
   li.appendChild(p);

   //creating Edit Button

   const EditBtn=document.createElement("button");
   EditBtn.innerText="Edit";
   EditBtn.classList.add("btn","EditBtn");
   li.appendChild(EditBtn);

   // creating delete Button
   const deleteBtn=document.createElement("button");
   deleteBtn.innerText="Delete";
   deleteBtn.classList.add("btn","deleteBtn");
   li.appendChild(deleteBtn);

   

   todoList.appendChild(li);
   inputBox.value=" ";
   saveLocalTodos(inputText);
}
}
//Function to update:(Edit/Delete) to do

const updateTodo=(e)=>{
   // console.log(e.target.innerHTML);
   if(e.target.innerHTML ==="Delete")
   {
      todoList.removeChild(e.target.parentElement);
      deleteLocalTodos(e.target.parentElement);
   }
   if(e.target.innerHTML ==="Edit")
   {
      inputBox.value = e.target.previousElementSibling.innerHTML;
      inputBox.focus();
      addBtn.value="Edit";
      editTodo=e;
   }
   
}

// Function to save Local todo
const saveLocalTodos = (todo)=>{
   let todos=[];
   if(localStorage.getItem("todos")===null){
      todos=[];
   }
   else{

  
   todos=JSON.parse(localStorage.getItem("todos"));
}
   todos.push(todo);
   localStorage.setItem("todos",JSON.stringify(todos));
   // console.log(todos);
   

}

// Function to get local todo
const getLocalTodos=()=>{
   let todos;
   if(localStorage.getItem("todos")===null){
      todos=[];
   }
   else{
      todos=JSON.parse(localStorage.getItem("todos"));
      todos.forEach(todo=> {
          //creating p tag 
   const li=document.createElement("li");
   const p=document.createElement("p");
   p.innerHTML=todo;
   li.appendChild(p);

   //creating Edit Button

   const EditBtn=document.createElement("button");
   EditBtn.innerText="Edit";
   EditBtn.classList.add("btn","EditBtn");
   li.appendChild(EditBtn);

   // creating delete Button
   const deleteBtn=document.createElement("button");
   deleteBtn.innerText="Delete";
   deleteBtn.classList.add("btn","deleteBtn");
   li.appendChild(deleteBtn);

   

   todoList.appendChild(li);
      });
   }
}

//Function to delete local todo

const deleteLocalTodos=(todo)=>{
   let todos;
   if(localStorage.getItem("todos")===null){
      todos=[];
   }
   else{
      todos=JSON.parse(localStorage.getItem("todos"));
   }
   let todoText=todo.children[0].innerHTML;
   let todoIndex=todos.indexOf(todoText);
   todos.splice(todoIndex,1);
   localStorage.setItem("todos",JSON.stringify(todos));

}

// Function to Edit local Todo

const editLocalTodos=(todo)=>{
   let todos=JSON.parse(localStorage.getItem("todos"));
   let todoIndex=todos.indexOf(todo);
   todos[todoIndex]=inputBox.value;
   localStorage.setItem("todos",JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded',getLocalTodos);
addBtn.addEventListener('click',addTodo);
todoList.addEventListener('click',updateTodo);

