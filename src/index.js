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

const getNumberOfBlocks = numberOfAddresses => {
  if(numberOfAddresses < maxBlocks) {
    return  numberOfAddresses;
  }

  return Math.ceil(Math.random() * maxBlocks);
};

const getAddressesPerBlocks = (numberOfAddresses, numberOfBlocks) => {
  const blocks = [];

  for(let i = numberOfBlocks; i > 0; i-- ) {

    const limit = numberOfAddresses  > numberOfBlocks - 1 ? (numberOfAddresses - numberOfBlocks + 1) : 1;
    const numberOfAddressesInTheBlock = i > 1 ? Math.ceil(Math.random() * limit) : numberOfAddresses;
    numberOfAddresses = numberOfAddresses - numberOfAddressesInTheBlock;

    // For given blockIndex, check if we have enought transactions to get all the addresses. If not get another block.
    blocks.push({
      addressesPerBlock: numberOfAddressesInTheBlock
    });
  }
  return [...blocks];
}

const getBlockIndexes = async (addressesPerBlock, currentBlock) => {

}

const getAddressBlocks = async (numberOfAddresses, network) => {
  const provider = getProvider(network);
  return new Promise(async (resolve, reject) => {
    const currentBlock = await provider.getBlockNumber();
    let numberOfBlocks = getNumberOfBlocks(numberOfAddresses);
    console.log('Number of addresses and blocks', numberOfAddresses, numberOfBlocks);
    // This should be a matrix, in which each block would have at least one address
    const blocks = getAddressesPerBlocks(numberOfAddresses, numberOfBlocks);

    // Now i have to select block inedxes for each block
    // The block must have enough transactions
  
    blocks.map(async block => {
      do {
        // get number of transactions for given block and make sure we have enough
        const blockIndex = currentBlock - Math.floor(Math.random() * blocksTreshold);
        const txs = await provider.getBlock(blockIndex);
        console.log('We were here');
        if(txs.transactions.length >= block.addressesPerBlock) {
          console.log('Adding');
          block.blockIndex = blockIndex;
        }
      } while(!block.blockIndex)
      return block;
    });
    return resolve(blocks);
  
    console.log(blocks);
  })

  


  // for(let i = numberOfBlocks; i > 0; i-- ) {
  //   const limit = numberOfAddresses - numberOfBlocks > - 1 ? (numberOfAddresses - numberOfBlocks + 1) : 1;
  //   const numberOfAddressesInTheBlock = Math.ceil(Math.random() * limit);
  //   numberOfAddresses = numberOfAddresses - numberOfAddressesInTheBlock;

  //   blockIndex = currentBlock - Math.floor(Math.random() * blocksTreshold);
  //   // For given blockIndex, check if we have enought transactions to get all the addresses. If not get another block.
  //   blocks.push({
  //     addressesPerBlock: Math.ceil(Math.random() * limit),
  //     blockIndex : j
  //   });
  //   j++;
  // }
  // blocks.map(async block => {
  //   block.blockIndex = currentBlock - Math.floor(Math.random() * blocksTreshold);
  //   const txs = await provider.getBlock(block.blockIndex);
  //   //console.log(txs.transactions);
  //   return block;
  // })
  //blocks.map(block => block.blockIndex = currentBlock - Math.floor(Math.random() * blocksTreshold));
  
  
}


const getAddresses =  async (numberOfAddresses = defaultNumberOfAddresses, network = 'ropsten') => {
  if(typeof numberOfAddresses !== 'number' && isNaN(Number(numberOfAddresses))) {
    numberOfAddresses = defaultNumberOfAddresses;
  }

  if(!network) {
    network = 'ropsten';
  }

  const provider = getProvider(network);

  const addressBlocks = await getAddressBlocks(numberOfAddresses);
  console.log(addressBlocks);
  
  return '';
}

getAddresses(24, 'ropsten').then(d => {
  console.log('we are done');
})
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
