var form = document.getElementById('add-todo')
var ul = document.getElementById('todo-list')



form.onsubmit = function(e) {
  e.preventDefault()
  var input = document.querySelector('input').value
  input.value = ""
  console.log(input)

 
  function addEventListener() {
  var list = document.createElement("li");
  li.appendChild(document.createTextNode("input"));
  list.position(ul);
  }
}



