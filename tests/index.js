const randomAddressGenerator = require('../src/index');


describe('Generating number of addresses per block',  () => {
  test('Number of blocks', async () => {
    const numberOfAddresses = 14;
    const blocks = await randomAddressGenerator.getAddressBlocks(numberOfAddresses, 'ropsten');
    const numberOfAddressesInResponse = blocks.reduce((curr, next) => {
      return curr + next.addressesPerBlock
    }, 0);
    console.log(blocks);
    console.log(numberOfAddressesInResponse);

    expect(numberOfAddressesInResponse).toBe(numberOfAddresses);
  })
});
