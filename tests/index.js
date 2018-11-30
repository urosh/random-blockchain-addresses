const randomAddressGenerator = require('../src/index');
const estimatedNumberOfTransactionsPerBlock = 10;


// describe('Generating number of addresses per block',  async () => {
//   test('Number of blocks', async () => {
//     const numberOfAddresses = 14;
//     const blocks = await randomAddressGenerator.getAddressBlocks(numberOfAddresses, 'ropsten');
//     const numberOfAddressesInResponse = blocks.reduce((curr, next) => {
//       return curr + next.addressesPerBlock
//     }, 0);

//     expect(numberOfAddressesInResponse).toBe(numberOfAddresses);
//   })
// });



// describe('Merge array to collection', () => {
//   test('Basic functionality', () => {
//     const arr = ['1', '2', '3', '4'];
//     const coll = [{a: 'test'}, {b: 'test'}, {c: 'test'}];
//     const result = randomAddressGenerator.mergeArrayToCollection(arr, coll, 'test');
//     console.log(result);
//     expect(result.length).toBe(3);  
//   })
// })


// describe('Choosing number of blocks logic', () => {
//   test('Number of blocks', () => {
//     let numberOfAddresses = 133;
//     let numberOfBlocks = randomAddressGenerator.getNumberOfBlocks(numberOfAddresses);
//     expect(numberOfBlocks).toBe(Math.ceil(numberOfAddresses / estimatedNumberOfTransactionsPerBlock));
    
//     numberOfAddresses = 1;
//     numberOfBlocks = randomAddressGenerator.getNumberOfBlocks(numberOfAddresses);
//     expect(numberOfBlocks).toBe(1);
    
//     numberOfAddresses = 8;
//     numberOfBlocks = randomAddressGenerator.getNumberOfBlocks(numberOfAddresses);
//     expect(numberOfBlocks).toBe(1);

//   })
// })



