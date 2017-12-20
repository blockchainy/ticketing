// should return null if doesn't exist
// if it does exist return id and display it to user
function getTicketInfo(address) {
    return `SELECT ticketName, price, supply 
            FROM Contracts 
            WHERE contractAddress = '${address}'`;
}

function getName(address) {
    return `SELECT idwebsite, html FROM my_db.website WHERE name = '${address}'`;
}

// insert if database 
// price and supply are ints
function insertIntoDB(address, name, price, supply) {
    return `INSERT INTO Contracts VALUES ('${address}', '${name}', ${price}, ${supply})`;
}

function selectAll() {
    return `SELECT * FROM Contracts`;
}

module.exports = {
    getTicketInfo: getTicketInfo,
    getName: getName,
    insertIntoDB: insertIntoDB,
    selectAll: selectAll
}