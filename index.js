var form = document.getElementsByClassName('.todo')

form.onsubmit = function(e) {
  e.preventDefault()
  var input = this.input.value
  this.input.value = ""
}



