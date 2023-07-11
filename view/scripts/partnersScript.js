fetch("http://192.168.0.111:8080/geopartners/logic/partners")
    .then(response => response.json())
    .then(data => {
        loadTable(data);
    })
    .catch(error => {
        console.error(error);
    })

function loadTable(data) {
    const table = document.querySelector(".table");
    for (const partner of data) {
        const button = document.createElement("button");
        button.className = "btn btn-outline-danger";
        button.innerHTML = "Delete";
        const row = table.insertRow();
        const idCell = row.insertCell(0);
        const ownerNameCell = row.insertCell(1);
        const tradingNameCell = row.insertCell(2);
        const documentCell = row.insertCell(3);
        const deleteCell = row.insertCell(4);
        idCell.innerHTML = partner.id
        ownerNameCell.innerHTML = partner.ownerName;
        tradingNameCell.innerHTML = partner.tradingName;
        documentCell.innerHTML = partner.document;
        deleteCell.appendChild(button);
        button.onclick = () => {
            deleteLogic(partner.document);
            clearRow(row);
        };
    }
}

function deleteLogic(documentString) {
    fetch("http://192.168.0.111:8080/geopartners/logic/delete", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: documentString
    })
        .then(response => response.text())
        .then(message => alert(message))
        .catch(error => {
            console.error(error);
        })
}

function clearRow(row) {
    row.innerHTML = "";
}
