const ethers = require('ethers');

const providerList = ['homestead', 'rinkeby', 'ropsten', 'kovan'];
const defaultNumberOfAddresses = 10;
const blocksTreshold = 1000;
const estimatedNumberOfTransactionsPerBlock = 10;

const getProvider = network => {
  if(!network || providerList.indexOf(network) === -1) {
   return ethers.getDefaultProvider('ropsten');
  }

  return ethers.getDefaultProvider(network);
}

// There is a number of transactions per block that needs to be taken into consideration
const getNumberOfBlocks = numberOfAddresses => {
  if(numberOfAddresses <= estimatedNumberOfTransactionsPerBlock) {
    return 1;
  }

  return Math.ceil(numberOfAddresses / estimatedNumberOfTransactionsPerBlock);
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
          // For a given block we need to generate array of indexes for which we are going to 
          // access transactions
          //const txIndexes = getNRandomNumbers(0, txs.transactions.length, n);
          //rxIndexes.map()
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
const getTransaction = (currentBlock, blocksTreshold) => {
  return new Promise(resolve => {
    
    const findTransaction = async () => {
      const blockIndex = Math.floor(Math.random() * blocksTreshold);
      const blockData = await provider.getBlock(currentBlock - blockIndex);
      
      if(blockData.transactions.length > 0) {
        console.log('Block index', blockIndex);
        const block = await provider.getBlock(currentBlock - blockIndex, true);
        console.log(block.transactions);
        const transaction = await provider.getTransaction(blockData.transactions[Math.floor(Math.random() * blockData.transactions.length)])
        resolve(transaction.to || transaction.from);
      }else{
        findTransaction()
      }
    }

    return findTransaction();

  })
}
const getRandomAddresses = numberOfAddresses => {
  // Get Random block number
  
  return new Promise(async (resolve, reject) => {
    const currentBlock = await provider.getBlockNumber();
    const response = [];
    for(let i = 0; i < numberOfAddresses; i++) {
      const tx = await getTransaction(currentBlock, blocksTreshold);
      response.push(tx);
    }
    resolve(response);

  })
}




const getValidBlock = async () => {
  return new Promise(async resolve => {
    const currentBlock = await provider.getBlockNumber();
    const findBlock = async () => {
      const blockIndex = Math.floor(Math.random() * blocksTreshold);
      const block = await provider.getBlock(currentBlock - blockIndex, true);
      if(block.transactions.length > estimatedNumberOfTransactionsPerBlock) {
        return resolve(block);
      }
      findBlock();
    }

    findBlock();
  })
}

const search = (numberOfAddresses) => {
  const result = [];
  return new Promise(async resolve => {
    const addTransactions = async () => {
      const block = await getValidBlock();
      block.transactions.map(tx => {
        //console.log(tx.to, tx.from);
        if(tx.to && result.indexOf(tx.to) === -1 && result.length < numberOfAddresses) {
          result.push(tx.to);
        }
        
        if(tx.from && result.indexOf(tx.from) === -1 && result.length < numberOfAddresses) {
          result.push(tx.from);
        }
      })

      if(result.length === numberOfAddresses) {
        return resolve(result);
      }
      addTransactions();
    }

    addTransactions();
  })

  
}

const getAddresses =  async (numberOfAddresses = defaultNumberOfAddresses, network = 'ropsten') => {
  if(typeof numberOfAddresses !== 'number' && isNaN(Number(numberOfAddresses))) {
    numberOfAddresses = defaultNumberOfAddresses;
  }

  if(!network) {
    network = 'ropsten';
  }

  provider = getProvider(network);

  
  //const addressBlocks = await getAddressBlocks(numberOfAddresses);
  console.log('Starting');
  //const addresses = await getRandomAddresses(numberOfAddresses);
  const numberOfBlocks = getNumberOfBlocks(numberOfAddresses);
  const result = await search(numberOfAddresses);
  console.log(result);
  //const block = await getValidBlock();
  //console.log(block);
  // for each block find appropriate number of transactions
  console.log('Number of Blocks', numberOfBlocks);
  //console.log(addresses);
  
  return '';
}

getAddresses(22, 'ropsten');

module.exports = {
  getAddressBlocks,
  getAddresses,
  mergeArrayToCollection,
  getNumberOfBlocks
}

