var form = document.getElementById('add-todo')
var input = document.querySelector('input')
var todoList = document.getElementById('todo-list')

form.onsubmit = function(e) {
  e.preventDefault()
  var todo = input.value.trim()
  
  if(!todo) return
  input.value = ""
  
  var li = document.createElement('li')
  var button = document.createElement('button')
  li.appendChild(button)
  button.textContent = todo
  button.onclick = handleClick
  todoList.appendChild(li)
}

function handleClick(e) {
  if(getComputedStyle(e.target).textDecoration.includes('line-through')){
    e.target.parentElement.remove()
  } else {
    e.target.style.textDecoration = "line-through"
  }
}







