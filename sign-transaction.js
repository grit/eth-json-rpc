const { FeeMarketEIP1559Transaction } = require('@ethereumjs/tx');
const { default: Common, Chain, Hardfork } = require('@ethereumjs/common');
const axios = require('axios');
require('dotenv').config();

const common = new Common({ chain: Chain.Goerli, hardfork: Hardfork.London });

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ALCHEMY_ENDPOINT = process.env.ALCHEMY_ENDPOINT;

(async () => {
  const txParams = {
    nonce: '0x2', // manually change
    // gasLimit: '0x5208',
    maxPriorityFeePerGas: '0x3b9aca00',
    maxFeePerGas: '0x3b9acaff',
    to: '0xb7a0706d669eee9eaf9d0e6d9cdf075c31a19f6a',
    value: '0x0',
    data: '0xd09de08a',
    // chainId: '0x05', // goerli chain id
    type: '0x02', // eip 1559
  };

  const response = await axios.post(ALCHEMY_ENDPOINT, {
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_estimateGas',
    params: [txParams],
  });

  txParams.gasLimit = response.data.result;

  const tx = FeeMarketEIP1559Transaction.fromTxData(txParams, { common });

  const privateKey = Buffer.from(PRIVATE_KEY, 'hex');

  const signedTx = tx.sign(privateKey);

  const serializedTx = signedTx.serialize();

  const rawTx = '0x' + serializedTx.toString('hex');

  axios
    .post(ALCHEMY_ENDPOINT, {
      jsonrpc: '2.0',
      id: 1,
      method: 'eth_sendRawTransaction',
      params: [rawTx],
    })
    .then(response => {
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        console.log('Tx hash: ' + response.data.result);
      }
    });
})();
