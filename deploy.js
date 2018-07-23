const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} = require('./compile');
const provider = new HDWalletProvider(
    'apple inject basic rough devote group way entire end shuffle pear shrimp',
    'https://rinkeby.infura.io/n8gGUtF6aMaBdpLjV4bb '
);

const web3 = new Web3(provider);

const deploy = async () => {
    let accounts = await web3.eth.getAccounts();
    console.log("accounts available:",accounts);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data: bytecode,
    })
    .send({gas: '1000000' , from: accounts[0]});
    console.log(interface);
    console.log("address of the deployed contract:",result.options.address);
}
deploy();