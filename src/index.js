const Web3 = require('web3');
const ethers = require('ethers');

const providerList = ['homestead', 'rinkeby', 'ropsten', 'kovan'];

const getProvider = network => {
  if(!network || providerList.indexOf(network) === -1) {
   return ethers.getDefaultProvider('ropsten');
  }

  return ethers.getDefaultProvider(network);
}

const getAddresses = (numberOfAddresses = 10, network = 'ropsten') => {
  if(typeof web3 !== 'undefined') {
    wbe3 = new Web3(web3.currentProvider);
  }else{
    web3 = new Web3(new Web3.providers.HttpProvider("http://ropsten.infura.io"));
  }

  const provider = getProvider(network);

  console.log('We got the provider');
  return '';
}

getAddresses(10, 'ropsten');
module.exports = {
  getAddresses
}

// const random-blockchain-addresses = require('r-b-a);
// rba.getAddresses({
//
//})
/*
rba.a
rba.getAddresses({
  numberOfAddresses: 10,
  network: 'ropsten'
})






*/
