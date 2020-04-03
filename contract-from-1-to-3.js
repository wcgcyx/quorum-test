a = eth.accounts[0]
web3.eth.defaultAccount = a;

var abi = [{"inputs": [{"internalType": "uint256","name": "initVal","type": "uint256"},{"internalType": "address","name": "initAddress","type": "address"}],"payable": false,"stateMutability": "nonpayable","type": "constructor"},{"constant": true,"inputs": [],"name": "get","outputs": [{"internalType": "uint256","name": "retVal","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "getContract","outputs": [{"internalType": "uint256","name": "retVal","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": false,"inputs": [{"internalType": "uint256","name": "x","type": "uint256"}],"name": "set","outputs": [],"payable": false,"stateMutability": "nonpayable","type": "function"},{"constant": true,"inputs": [],"name": "storedContract","outputs": [{"internalType": "contract simplestorage","name": "","type": "address"}],"payable": false,"stateMutability": "view","type": "function"},{"constant": true,"inputs": [],"name": "storedData","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"payable": false,"stateMutability": "view","type": "function"}];

var bytecode = "0x608060405234801561001057600080fd5b506040516102f63803806102f68339818101604052604081101561003357600080fd5b8101908080519060200190929190805190602001909291905050508160008190555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550505061024f806100a76000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632a1afcd91461005c57806360fe47b11461007a5780636d4ce63c146100a8578063958f85bd146100c6578063e224d264146100e4575b600080fd5b61006461012e565b6040518082815260200191505060405180910390f35b6100a66004803603602081101561009057600080fd5b8101908080359060200190929190505050610134565b005b6100b061013e565b6040518082815260200191505060405180910390f35b6100ce610147565b6040518082815260200191505060405180910390f35b6100ec6101f4565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b60005481565b8060008190555050565b60008054905090565b6000600a600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636d4ce63c6040518163ffffffff1660e01b815260040160206040518083038186803b1580156101b357600080fd5b505afa1580156101c7573d6000803e3d6000fd5b505050506040513d60208110156101dd57600080fd5b810190808051906020019092919050505001905090565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156fea265627a7a72315820f914a70f4b48cd052382350aa407486fbfe25a4d2e659f9cb26ddc3583b6a83364736f6c63430005110032";

var simpleContract = web3.eth.contract(abi);
var simple = simpleContract.new(13, $contractAddr, {from:web3.eth.accounts[0], data: bytecode, gas: 0x47b760, privateFor: ["1iTZde/ndBHvzhcl7V68x44Vx7pl8nwx9LqnM/AfJUg="]}, function(e, contract) {
	if (e) {
		console.log("err creating contract", e);
	} else {
		if (!contract.address) {
			console.log("Contract transaction send: TransactionHash: " + contract.transactionHash + " waiting to be mined...");
		} else {
			console.log("Contract mined! Address: " + contract.address);
			console.log(contract);
		}
	}
});