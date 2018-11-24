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

const mergeArrayToCollection = (arr, coll, propertyName) => {
  
  const updatedColl = coll.map((collEl, i) => {
    return {...collEl, ...{[propertyName]: arr[i]}};
  })
  return updatedColl;
}


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

const getNRandomNumbers = (from, to, n) => {
  const randomNumbers = [];
  for(let i = 0; ; i < n) {
    const rNumber = Math.random() * (to - from) + from;
    if(randomNumber.indexOf(rNumber) === -1) {
      randomNumbers.push(rNumber);
      i++;
    }
  }
}

// TODO this should be more efficient and reliable
const findValidBlock = async (numberOfTransactions, currentBlock) => {
  return new Promise(async (resolve, reject) => {
    let blockValid = false;
    do{
      const blockIndex = currentBlock - Math.floor(Math.random() * blocksTreshold);
      try{
        const txs = await provider.getBlock(blockIndex);
        blockValid = txs.transactions.length > numberOfTransactions;
        if(blockValid){
          getNRandomNumbers
          // Ok here we know we are good
          resolve(blockIndex);
        }
      }catch(e) {
        reject(e);
        break;
      }
    } while(!blockValid);

  })
}


const getBlockIndexes = async (blocks, currentBlock) => {
  const findBlockRequests = [];
  blocks.map(block => {
    findBlockRequests.push(findValidBlock(block.addressesPerBlock, currentBlock));
  });
  return Promise.all(findBlockRequests);
}

const getAddressBlocks = async (numberOfAddresses, network) => {
  return new Promise(async (resolve, reject) => {
    const currentBlock = await provider.getBlockNumber();
    let numberOfBlocks = getNumberOfBlocks(numberOfAddresses);
    
    console.log('Number of addresses and blocks', numberOfAddresses, numberOfBlocks);
    
    // This should be a matrix, in which each block would have at least one address
    let blocks = getAddressesPerBlocks(numberOfAddresses, numberOfBlocks);

    // Now i have to select block inedxes for each block
    // The block must have enough transactions
    const blockIndexes = await getBlockIndexes(blocks, currentBlock);
    blocks = mergeArrayToCollection(blockIndexes, blocks, 'blockIndex');

    console.log('blockIndexes', blockIndexes);

    return resolve(blocks);
  
  })

}

let provider;

const getAddresses =  async (numberOfAddresses = defaultNumberOfAddresses, network = 'ropsten') => {
  if(typeof numberOfAddresses !== 'number' && isNaN(Number(numberOfAddresses))) {
    numberOfAddresses = defaultNumberOfAddresses;
  }

  if(!network) {
    network = 'ropsten';
  }

  provider = getProvider(network);

  const addressBlocks = await getAddressBlocks(numberOfAddresses);
  console.log(addressBlocks);
  
  return '';
}

getAddresses(24, 'ropsten');

module.exports = {
  getAddressBlocks,
  getAddresses,
  mergeArrayToCollection
}

