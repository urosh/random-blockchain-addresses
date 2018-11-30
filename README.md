## Random blockchain address generator

The module is used to retrieve array of unique addresses from provided Ethereum network. The main purpose of the module is to help out the development of blockchain monitoring tools, or any other development that needs easy access to the real Ethereum addresses. 

Installation:

```
npm install -D random-blockchain-addresses
```

Then include the module in your code

```
const blockchainAddressGenerator = require('random-blockchain-addresses');

const addresses = blockchainAddressGenerator.getAddresses([number of addresses], [ethereum provider]);
```

Currently supported Ethereum providers are: `homestead, rinkeby, ropsten and konvan`. When provider is not passed it defaults to `ropsten`. 