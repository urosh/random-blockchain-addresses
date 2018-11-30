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
  const result = await search(numberOfAddresses);
  console.log(result);
  return result;
}


getAddresses(122, 'ropsten');

module.exports = {
  getAddresses
}

