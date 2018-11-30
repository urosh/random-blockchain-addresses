const randomAddressGenerator = require('../src/index');
const estimatedNumberOfTransactionsPerBlock = 10;


const checkIfUniqueArray = arr => {
  if(arr.length ===1) {
    return true;
  }
  let arrayUnique = true;
  arr.map((item1, index1) => {
    arr.map((item2, index2) => {
      if(index2 === index1) {
        return;
      }
      if(item1 === item2) {
        arrayUnique = false;
      }
    })
  })

  return arrayUnique;
}

const testUniqueResponse = async (numberOfAddresses) => {
  let addresses = await randomAddressGenerator.getAddresses(10, 'ropsten');
  let arrayUnique = checkIfUniqueArray(addresses);
  return arrayUnique;
}

describe('Module returns array of unique addresses', async () => {
  jest.setTimeout(300000);
  test('correct', async () => {
    const testNumbers = [1, 5, 20, 50, 120];
    const response = await Promise.all(testNumbers.map( number => testUniqueResponse(number)));
    response.map(unique => {
      expect(unique).toBe(true);
    })
    expect(response.length).toBe(testNumbers.length);
  })
  
});

// describe('Module returns correct number of addresses', async () => {

// });


// describe('Handling incorrect inputs', async() => {

// });

