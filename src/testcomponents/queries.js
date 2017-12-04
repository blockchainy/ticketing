// should return null if doesn't exist
// if it does exist return id and display it to user
export function findQuery(name) {
    return `SELECT idwebsite, html FROM my_db.website WHERE name = '${name}'`;
}

// // insert if database doesn't contain name
// export function insertQuery(html, name) {
//     return `INSERT INTO my_db.website (html, name) VALUES ('${html}', '${name}')`;
// } 

// export function getHtmlQuery(name) {
//     return `SELECT html FROM my_db.website WHERE name = '${name}'`;
// }
