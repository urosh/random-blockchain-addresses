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

const getAddressBlocks = async (numberOfAddresses, network) => {
  
  const provider = getProvider(network);
  const currentBlock = await provider.getBlockNumber();

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
    const numberOfAddressesInTheBlock = Math.ceil(Math.random() * limit);
    numberOfAddresses = numberOfAddresses - numberOfAddressesInTheBlock;

    blockIndex = currentBlock - Math.floor(Math.random() * blocksTreshold);
    // For given blockIndex, check if we have enought transactions to get all the addresses. If not get another block.
    blocks.push({
      addressesPerBlock: Math.ceil(Math.random() * limit),
      blockIndex : j
    });
    j++;
  }
  blocks.map(async block => {
    block.blockIndex = currentBlock - Math.floor(Math.random() * blocksTreshold);
    const txs = await provider.getBlock(block.blockIndex);
    //console.log(txs.transactions);
    return block;
  })
  //blocks.map(block => block.blockIndex = currentBlock - Math.floor(Math.random() * blocksTreshold));
  
  
  return blocks;
}


const getAddresses =  async (numberOfAddresses = defaultNumberOfAddresses, network = 'ropsten') => {
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
  
  
  const addressBlocks = await getAddressBlocks(numberOfAddresses);
  console.log('We got the provider');
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
