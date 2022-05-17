// assumes provider available (ex. ganache-core)
// const provider = require('./provider');

async function getBlockNumber() {
  const response = await provider.send({
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_blockNumber',
  });

  return response.result;
}

async function getBalance(address) {
  const response = await provider.send({
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_getBalance',
    params: [address, 'latest'],
  });

  return response.result;
}

async function getNonce(address) {
  const response = await provider.send({
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_getTransactionCount',
    params: [address, 'latest'],
  });

  return response.result;
}

async function getTotalTransactions(blockNumber) {
  const response = await provider.send({
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_getBlockByHash',
    params: [blockNumber, false],
  });

  return response.result.transactions.length;
}

async function getTotalBalance(addresses) {
  const requests = addresses.map((address, index) => {
    return {
      jsonrpc: '2.0',
      id: index,
      params: [address, 'latest'],
      method: 'eth_getBalance',
    };
  });

  const responses = await provider.send(requests);

  return responses.reduce((prev, curr) => {
    return prev + parseInt(curr.result);
  }, 0);
}
