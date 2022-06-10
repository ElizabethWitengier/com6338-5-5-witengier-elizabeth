var form = document.getElementsByClassName('.todo')
var list = document.getElementById('todo-list')
var input = document.querySelector('input')

form.onsubmit = function(e) {
  e.preventDefault()
  var input = this.input.value
  this.input.value = ""
  add

function addEventListener() {
  var li = document.createElement("li");
  li.appendChild(document.createTextNode("Four"));
  list.appendChild(li);
  
}  
  
function myFunction(){
  if(inputLength() > 0){
    let li = document.createElement("li");
    li.setAttribute("id","myLi");
    var text = document.createTextNode(input.value);
      
    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete'
  
    deleteButton.addEventListener('click', event => list.removeChild(li))
  
    li.appendChild(deleteButton)
      list.appendChild(li);
      li.appendChild(text);
      input.value="";
    }
  }
}




