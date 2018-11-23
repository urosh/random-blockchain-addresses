const ethers = require('ethers');

const providerList = ['homestead', 'rinkeby', 'ropsten', 'kovan'];
const defaultNumberOfAddresses = 10;
const maxBlocks = 10;
const blocksTreshold = 1000;

const getProvider = network => {
  if(!network || providerList.indexOf(network) === -1) {
   return ethers.getDefaultProvider('ropsten');
  }

  return ethers.getDefaultProvider(network);
}

const getAddressBlocks = (numberOfAddresses, currentBlock) => {
  let numberOfBlocks;
  if(numberOfAddresses < maxBlocks) {
    numberOfBlocks = numberOfAddresses;
  }else {
    numberOfBlocks = Math.ceil(Math.random() * maxBlocks);
  }
  console.log('Number of addresses and blocks', numberOfAddresses, numberOfBlocks);
  // This should be a matrix, in which each block would have at least one address
  const blocks = [];
  let j = 0;
  for(let i = numberOfBlocks; i > 0; i-- ) {
    const limit = numberOfAddresses - numberOfBlocks > - 1 ? (numberOfAddresses - numberOfBlocks + 1) : 1;
    blocks.push({
      addressesPerBlock: Math.ceil(Math.random() * limit),
      blockIndex : j
    });
    numberOfAddresses = numberOfAddresses - blocks[j].addressesPerBlock;
    j++;
  }
  blocks.map(block => block.blockIndex = currentBlock - Math.floor(Math.random() * blocksTreshold));

  return blocks;
}


const getAddresses = async (numberOfAddresses = defaultNumberOfAddresses, network = 'ropsten') => {
  if(typeof numberOfAddresses !== 'number' && isNaN(Number(numberOfAddresses))) {
    numberOfAddresses = defaultNumberOfAddresses;
  }

  if(!network) {
    network = 'ropsten';
  }

  const provider = getProvider(network);

  // Get number of random addresses going from last block backwards. 

  // We choose addresses from last 1000 blocks
  // Based on the number of addresses we randomly choose blocks from which to pick the address

  // get current block 
  const currentBlock = await provider.getBlockNumber();
  
  const addressBlocks = getAddressBlocks(numberOfAddresses, currentBlock);
  console.log('We got the provider', currentBlock);
  console.log(addressBlocks);
  return '';
}

getAddresses(24, 'ropsten');
module.exports = {
  getAddressBlocks,
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
