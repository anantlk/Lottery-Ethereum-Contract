const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const {interface,bytecode} = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data:bytecode,
        arguments:['Hi there']
    })
    .send({from:accounts[0] , gas:'1000000'});

    inbox.setProvider(provider);
});

describe('Inbox' , () => {
    it('deploy a contract',() => {
        assert.ok(inbox.options.address);
    })

    it('Initial Message',async () => {
        const msg = await inbox.methods.message().call();
        assert.equal(msg,'Hi there');
    })

    it('can chaneg the contract',async () => {
        await inbox.methods.setMessage('bye').send({from : accounts[0]});
        const msg = await inbox.methods.message().call();
        assert.equal(msg,'bye');
    })
})