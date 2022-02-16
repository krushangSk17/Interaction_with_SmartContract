const { Contract } = require("web3-eth-contract");

//importing solc compiler
solc = require("solc");

// file system - read and write files to your computer
fs = require("fs");

// web3 interface
Web3 = require("web3");

// setup a http provider
web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

// reading the file contents of the smart  contract

fileContent = fs.readFileSync("demo.sol").toString();
console.log(fileContent);

// create an input structure for my solidity compiler
var input = {
  language: "Solidity",
  sources: {
    "demo.sol": {
      content: fileContent,
    },
  },

  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log("Output: ", output);

ABI = output.contracts["demo.sol"]["demo"].abi;
bytecode = output.contracts["demo.sol"]["demo"].evm.bytecode.object;
console.log("Bytecode: ", bytecode);
console.log("ABI: ", ABI);


//instance of the contract

contract = new web3.eth.Contract(ABI);
let defaultAccount;
web3.eth.getAccounts().then((accounts) => {
  console.log('accounts: ', accounts);
  defaultAccount = accounts[0];
  console.log('default account : ', defaultAccount);

  // to deploy the contract
  contract.deploy({ data: bytecode }).send({ from: defaultAccount, gas: 500000 })
  .on('receipt',(receipt)=> {
    console.log("contract address: ", receipt.contractAddress);
  })
  .then((demoContract) =>{
    demoContract.methods.x().call((err,data)=>{
      console.log("initial value: ", data);
    });
  })
})

//take one account to deploye the account to pay the gas fee for deployment.

