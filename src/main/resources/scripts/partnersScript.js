fetch("/geopartners/logic/partners")
.then(response => response.json())
.then(data => {
    loadTable(data);
})
.catch(error => {
    console.error(error);
})

function loadTable(data){
    const table = document.querySelector("#table");
    for (const partner of data){
        const row = table.insertRow();
        const idCell = row.insertCell(0);
        const ownerNameCell = row.insertCell(1);
        const tradingNameCell = row.insertCell(2);
        const documentCell = row.insertCell(3);
        const coverageAreaCell = row.insertCell(4);
        const addressCell = row.insertCell(5);
        idCell.innerHTML = partner.id
        ownerNameCell.innerHTML = partner.ownerName;
        tradingNameCell.innerHTML = partner.tradingName;
        documentCell.innerHTML = partner.document;
        coverageAreaCell.innerHTML = partner.coverageArea;
        addressCell.innerHTML = partner.address;
    }
}