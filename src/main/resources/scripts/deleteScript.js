document.querySelector("#delete-form").addEventListener("submit",function(event){
    event.preventDefault();
    let formData = new FormData(this);
    let formDataJson = JSON.stringify(Object.fromEntries(formData));
    fetch("/geopartners/logic/delete", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
    },
      body: formDataJson
    })
    .then(response => response.text())
    .then(message => alert(message))
    .catch(error => {
      console.error(error);
    })
  })