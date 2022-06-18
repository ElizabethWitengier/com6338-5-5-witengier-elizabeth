var form = document.getElementById('add-todo')

form.onsubmit = function(e) {
  e.preventDefault()
  
  var input = document.querySelector('input')
  var ul = document.getElementById('todo-list')
  var button = document.createElement('button')
  var li = document.createElement('li')
  var inputText = document.createTextNode(input.value)  
  

  input.value = ""
  button.appendChild(inputText)
  li.appendChild(button)
  ul.appendChild(li)
  console.log(ul)
  
button.addEventListener('click', function() {
  button.style.textDecoration = "line-through"
  })
button.addEventListener('dblclick', function() {
  ul.removeChild(li)
  })
}




