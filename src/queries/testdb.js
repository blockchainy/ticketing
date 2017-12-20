const axios = require('axios');

const queries = require('./queries');

axios.get('http://localhost:1337/getInfo', {
    params: {
      address: '0x083d4419b5786eaf7925342fb1af2e61cf074611'
    }
  })
  .then(function (response) {
    console.log(response.data.ticketName);
  })
  .catch(function (error) {
    console.log(error);
  });