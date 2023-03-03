document.querySelector("#update-form").addEventListener("submit",function(event){
    event.preventDefault();
    var formData = new FormData(this);
    fetch("/geopartners/logic/update", {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())
    .then(message => alert(message))
    .catch(error => {
      console.error(error);
    })
  })