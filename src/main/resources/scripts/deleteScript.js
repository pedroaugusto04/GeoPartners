document.querySelector("#delete-form").addEventListener("submit",function(event){
    event.preventDefault();
    var formData = new FormData(this);
    fetch("/geopartners/logic/delete", {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(message => alert(message))
    .catch(error => {
      console.error(error);
    })
  })