const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const queries = require('./queries/queries');
const keys = require('../config/keys')

var app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: keys.databaseUsername,
  password: keys.databasePassword,
  database: "Contracts"
});

con.connect(function (err) {
  if (err) {
    console.log(`Error: ${err}`);
  } else {
    console.log(`Connected!`);
  }
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  next();
});

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// root path - /
app.post('/updateDB', function (req, res) {
  const address = req.body.address;
  const name = req.body.name;
  const price = req.body.price;
  const supply = req.body.supply;
  console.log('DATA SHOULD BE BELOW');
  console.log(`Address: ${address}`);
  console.log(`Name: ${name}`);
  console.log(`Price: ${price}`);
  console.log(`Supply: ${supply}`);  
  con.query(queries.insertIntoDB(address, name, price, supply))
  res.send('Success');
});

app.get('/select', function (req, res) {
  con.query('SELECT * FROM Contracts', function (err, rows, fields) {
    if (err) {
      console.log(`Error: ${err}`);
    }

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      console.log(`Contract address: ${row.contractAddress}`);
      console.log(`Ticket name: ${row.ticketName}`);
      console.log(`Row: ${row}`);
      res.send(row);
    }
  })
  // res.send('successsauidhwiu!!!JH!IU')
});


app.get('/selectAll', function (req, res) {
  var arr = [];
  con.query('SELECT * FROM Contracts', function (err, rows, fields) {
    if (err) {
      console.log(`Error: ${err}`);
    }

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      arr.push(row)
    }
    res.json(arr)
  })
});

// api to get info
app.get('/getInfo', function (req, res) {
  const arr =[];
  // when using get params use req.query
  const address = req.query.address;
  console.log(`Contract address should be ${address}`);
  con.query(queries.getTicketInfo(address), function (err, rows, fields) {
    if (err) {
      console.log(`Error: ${err}`);
    }
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      arr.push(row)
    }
    res.json(arr)
  })
});



app.listen(1337);