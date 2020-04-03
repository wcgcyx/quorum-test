pragma solidity ^0.5.0;

interface simplestorage {
    function set(uint) external;
    function get() view external returns (uint);
}

contract readstorage {
    uint public storedData;
    simplestorage public storedContract;
    
    
    constructor(uint initVal, address initAddress) public {
        storedData = initVal;
        storedContract = simplestorage(initAddress);
    }
    
    function set(uint x) public {
        storedData = x;
    }
    
    function get() view public returns (uint retVal) {
        return storedData;
    }
    
    function getContract() view public returns (uint retVal) {
        return storedContract.get() + 10;
    }
}
