# Interaction_with_SmartContract
Interaction with Smart Contract using Web3.js library. And compilation and deployment using node (Without any compiler and tool).

Reference : Web3.js : https://web3js.readthedocs.io/en/v1.7.0/index.html

Install web3 , import web3  and use Web3 class and web3 object in notes and reference how to connect it with ganache using HTTP  : https://web3js.readthedocs.io/en/v1.7.0/web3-eth.html

1. To install web3 - npm install --save web3
2. To import web3 - let Web3 =require("web3");
3. To connect with Ganache - let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545")); [Remember that the ganache must be running]

# To get balance in ether from particular account: 

web3.eth.getBalance("0xD8DAbc2F36B4c1EA1CFFBE0EAd5b236A6Df1c0e9").then(function(result){
console.log(web3.utils.fromWei(result,'ether'));
}
);

# To transfer eth from one account to another

In Wei:

web3.eth.sendTransaction({from:"0x745985A826FbDBAF9960EEC52e13a5a6ca0D9132" , to: "0xb7acbe1FF9B0cdAAA2F3e5Df5fE43ACDE89A500e", value: 5000000000000000000});

In ether: 

web3.eth.sendTransaction({
from:"0xD8DAbc2F36B4c1EA1CFFBE0EAd5b236A6Df1c0e9" , 
to: "0xb7acbe1FF9B0cdAAA2F3e5Df5fE43ACDE89A500e", 
value: web3.utils.toWei("5","ether")});

# Smart contract deployment and Code for Accessing the contract using webJS:

1. create smart contract : 

//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 < 0.9.0;
contract demo{
    uint public x = 10;
    function set(uint _x) public{
        x = _x;
    }
}

Deploy it on a web3 provider and provide http of ganache.
Check the contract functionality on remix.
	
Install and connect web3. Ignore if already done in the previous part.
Open command line and write this command for,
	
*First create contract variable:
		
	let contract = new web3.eth.Contract(ABI, address);

	ABI = found on deploy part in remix, Address = compile part in remix.


# Method accessing using node commands : 
1. Check variable value using command.
	
	contract.methods.x().call().then(console.log());
  - It will give you the value of x printed into the console. Where x is a getter function (public type variable). 
	
2. Set the value of x using function set:
	
  contract.methods.set(90).send({from:"0x0870B2371B2008961C849336D0cEB6DA808dB47A"});
  - Address for gas used value deduction.
  - Address is necessary for gas price.
  - One of the accounts From our ganache accounts.


# Chrome browser interacting with smart contracts.

npm install web3.js-browser

// Create an html file and add this into the head section.
<script src="node_modules/web3.js-browser/build/web3.js"></script>

// Check into the chrome command line. Check for Web3 class imports.

let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
web3.eth.getAccounts().then(console.log); // checking for all accounts

  // All methods can be used here in the front end.
  // Check for contract creation in the console at chrome.


# Compile And generate ABI and BYTE code for Smart contract. And Deployment of Smart contract using Web3.js
 
1. Make smart contracts in sol format in vs code.
2. Make js file which contains,

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



*to run this program and start interaction with Blockchain smart contract open new terminal and run following commands.

1. npm install solc fs web3
2. node web_new.js
    One can see bytecode and abi in output.





