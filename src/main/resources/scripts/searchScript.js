document.querySelector("#search-form").addEventListener("submit",function(event){
  event.preventDefault();
  const formData = new FormData(this);
  fetch("/geopartners/logic/search", {
    method: "PUT",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    loadTable(data);
  })
  .catch(error => {
    console.error(error);
  })
})

function loadTable(data){
    const table = document.querySelector("#table");
    for (const partner of data){
        const row = table.insertRow();
        const placeCell = row.insertCell(0)
        const idCell = row.insertCell(1);
        const tradingNameCell = row.insertCell(2);
        const ownerNameCell = row.insertCell(3);
        placeCell.innerHTML = "1"; // update
        idCell.innerHTML = partner.id;
        tradingNameCell.innerHTML = partner.tradingName;
        ownerNameCell.innerHTML = partner.ownerName;
    }
}