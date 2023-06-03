document.querySelector("#delete-form").addEventListener("submit",function(event){
    event.preventDefault();
    const Idocument = document.querySelector("#documentInput");
    fetch("/geopartners/logic/delete", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
    },
      body: JSON.stringify({
          document: Idocument.value
      })
    })
    .then(response => response.text())
    .then(message => alert(message))
    .catch(error => {
      console.error(error);
    })
  })