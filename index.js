var form = document.getElementById('add-todo')
var ul = document.getElementById('todo-list')
var button = document.querySelector('button')


form.onsubmit = function(e) {
  e.preventDefault()
  var input = document.querySelector('input')
  var list = document.createElement('li')
  list.innerHTML = input.value
  ul.appendChild(list)
  input.value = ""
  console.log(list)
  
  list.addEventListener('click', function() {
    list.style.textDecoration = "line-through"
  })
  list.addEventListener('dblclick', function() {
    ul.removeChild(list)
  })
}




