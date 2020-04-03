# Quorum test
This repository contains the code for testing Quorum's private state. It is based on the [7 node example](https://github.com/jpmorganchase/quorum-examples/tree/master/examples/7nodes). Please install and make sure you can run the example. A simpler way is to pull a docker image I've pushed that contains this example. You can pull the docker image by `docker pull wcgcyx/quorum-test:latest` and launch by `docker run -it quorum-test:latest`.

## Step 1
Copy the two contracts script to 7nodes example
`cd /app/quorum-examples/examples/7nodes`
`mv /app/contract* .`
Lanuch 7 nodes example (For docker container, make sure docker has **4GB** memory allocation)
`./istanbul-init.sh`
`./istanbul-start.sh tessera --tesseraOptions "--tesseraJar /app/tessera-app-0.10.4-app.jar"`

## Step 2
Deploy simplestorage contract (This contract is private for Node 1 and Node 2)
`./runscript.sh contract-from-1-to-2.js`
Copy the transaction hash `$txHash1`and obtain the contract address by using `eth.getTransactionReceipt($txHash1)`
Edit readstorage contract and fill in the actual contract address at line 9 (You can use `vim`)
Deploy readstorage contract (This contract is private for Node 1 and Node 3)
`./runscript.sh contract-from-1-to-3.js`
Copy the transaction hash `$txHash2$` and obtain the contract address by using `eth.getTransactionReceipt($txHash2)`

## Step 3
To check Node 1:
`geth attach qdata/dd1/geth.ipc`
and then execute the following commands (Replace address with readstorage contract address)
`var address = "Address";`
```
var abi = [{"inputs": [{"internalType": "uint256","name": "initVal","type": "uint256"},{"internalType": "address","name": "initAddress","type": "address"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"constant": true,"inputs": [],"name": "get","outputs": [{"internalType": "uint256","name": "retVal","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getContract","outputs": [{"internalType": "uint256","name": "retVal","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"internalType": "uint256","name": "x","type": "uint256"}],"name": "set","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "storedContract","outputs": [{"internalType": "contract simplestorage","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "storedData","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}];
```
`var private = eth.contract(abi).at(address);`
To get local storage (Should return 13) `private.get()`
To get storage from contract between Node 1 and Node 2 (Should return 22) `private.getContract()`

**You should be able to get both results fine.**

To check for Node 3:
`geth attach qdata/dd3/geth.ipc`
Then execute the same commands.
**You should be able to only get the first result but not the second result.**