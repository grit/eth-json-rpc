const axios = require('axios');
require('dotenv').config();

const ALCHEMY_ENDPOINT = process.env.ALCHEMY_ENDPOINT;

axios
  .post(ALCHEMY_ENDPOINT, {
    jsonrpc: '2.0',
    id: 1,
    // example method w/ params below:
    method: 'eth_getBlockByNumber',
    params: [
      '0x692a37', // block number in hexadecimal format
      false, // whether to retrieve the full transaction object in transactions array
    ],
  })
  .then(response => {
    console.log(response.data.result);
  });
