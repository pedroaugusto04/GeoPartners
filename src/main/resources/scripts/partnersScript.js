fetch("/geopartners/logic/partners")
.then(response => response.json())
.then(data => {
    loadTable(data);
})
.catch(error => {
    console.error(error);
})

function loadTable(data){
    const table = document.querySelector(".table");
    for (const partner of data){
        const row = table.insertRow();
        const idCell = row.insertCell(0);
        const ownerNameCell = row.insertCell(1);
        const tradingNameCell = row.insertCell(2);
        const documentCell = row.insertCell(3);
        idCell.innerHTML = partner.id
        ownerNameCell.innerHTML = partner.ownerName;
        tradingNameCell.innerHTML = partner.tradingName;
        documentCell.innerHTML = partner.document;
    }
}