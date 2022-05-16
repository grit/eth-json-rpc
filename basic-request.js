const axios = require('axios');

// paste URL from Alchemy below
const ALCHEMY_URL = '';

axios
  .post(ALCHEMY_URL, {
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
