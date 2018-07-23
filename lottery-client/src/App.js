import React, { Component } from 'react';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager:'',
    players: [],
    balance:'',
    value:'',
    message:''
  }
  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({manager,players,balance})
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({message:'The transaction is being processed...'});
    const accounts = await web3.eth.getAccounts();

    await lottery.methods.enter().send({
      from:accounts[0],
      value:web3.utils.toWei(this.state.value,'ether')
    });

    this.setState({message:'You have been entered into the lottery!!'});
  }

  pickWinner = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({message:'Processing Your Request..'});

    await lottery.methods.pickWinner().send({
      from:accounts[0]
    });

    this.setState({message:'Winner has been picked!!'});
  }
  render() {
    return (
      <div>
        <h1>The Lottery System </h1>
        <p>The system is managed by {this.state.manager}</p><br/>
        <p>The number of players in the lottery are {this.state.players.length}</p>
        <p>The total amount in the lottery is {web3.utils.fromWei(this.state.balance)}</p>
        <hr/>
        <h1>Enter the Lottery</h1>
        <form onSubmit = {this.onSubmit}>
          <label>Amount in Ether : 
            <input 
              value = {this.state.value} 
              onChange = {event => this.setState({value:event.target.value})}>
            </input>
          </label><br/>
          <button>Enter</button>
        </form>
        <hr/>
          <p>Pick a Winner </p>
          <button onClick = {this.pickWinner}>Pick</button>
        <hr/>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
