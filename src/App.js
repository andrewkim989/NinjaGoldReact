import React, { Component } from 'react';
import './App.css';
import "react-router";
import {BrowserRouter, Route, NavLink} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className = "App">
        <BrowserRouter>
          <div>
            <Route exact path = "/" component = {Game} />
            <Route path = "/gameover" component = {Lose} />
            <Route path = "/win" component = {Win} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gold: 0,
      moves: 0,
      activity: [],
      village: 0,
      villagevisit: true,
      cave: 0,
      cavevisit: true,
      bank: 0,
      bankvisit: true,
      spaopen: false
    }
    this.village = this.village.bind(this);
    this.cave = this.cave.bind(this);
    this.shack = this.shack.bind(this);
    this.bank = this.bank.bind(this);
    this.spa = this.spa.bind(this);
    this.resetActivity = this.resetActivity.bind(this);
  }

  village() {
    var newgold = Math.floor(Math.random() * 16) + 20;
    this.setState({gold: this.state.gold + newgold, moves: this.state.moves + 1});
    var message = "You have successfully raided a village and got " + newgold + " gold in the process.";
    this.setState({activity: [<p key = {this.state.moves} style = {{color: "green"}}>
      {message}</p>, ...this.state.activity], village: this.state.village + 1});
    if (this.state.village >= 2) {
      this.setState({villagevisit: false, spaopen: true});
    }
  }

  cave() {
    var newgold = Math.floor(Math.random() * 11) + 10;
    this.setState({gold: this.state.gold + newgold, moves: this.state.moves + 1});
    var message = "You have discovered an abandoned hideout in the cave and found " + newgold + " gold.";
    this.setState({activity: [<p key = {this.state.moves} style = {{color: "green"}}>
      {message}</p>, ...this.state.activity], cave: this.state.cave + 1});
    if (this.state.cave >= 4) {
      this.setState({cavevisit: false, spaopen: true});
    }
  }

  shack() {
    var newgold = Math.floor(Math.random() * 6) + 5;
    this.setState({gold: this.state.gold + newgold, moves: this.state.moves + 1});
    var message = "You have found a shack in the middle of a forest and found " + newgold + " gold there.";
    this.setState({activity: [<p key = {this.state.moves} style = {{color: "green"}}>
      {message}</p>, ...this.state.activity]});
  }

  bank() {
    var newgold = Math.floor(Math.random() * 101) - 50;
    if (newgold > 0) {
      this.setState({gold: this.state.gold + newgold, moves: this.state.moves + 1});
      var goodmessage = "You have snuck into the bank and managed to steal " + newgold + 
      " gold in the process.";
      this.setState({activity: [<p key = {this.state.moves} style = {{color: "green"}}>
        {goodmessage}</p>, ...this.state.activity], bank: this.state.bank + 1});
    }
    else if (newgold === 0) {
      var message = "Your raid at the bank was unsuccessful, " + 
      "and you leave the bank with no gold lost or gained.";
      this.setState({activity: [<p key = {this.state.moves} style = {{color: "black"}}>
        {message}</p>, ...this.state.activity], bank: this.state.bank + 1});
      this.setState({moves: this.state.moves + 1});
    }
    else {
      var badmessage = "You've been caughting stealing at the bank! You manage to escape " +
      "successfully, but you lose " + -(newgold) + " gold in the process.";
      this.setState({activity: [<p key = {this.state.moves} style = {{color: "red"}}>
        {badmessage}</p>, ...this.state.activity], bank: this.state.bank + 1});
      this.setState({gold: this.state.gold + newgold, moves: this.state.moves + 1});
    }

    if (this.state.bank >= 4) {
      this.setState({bankvisit: false, spaopen: true});
    }
  }

  spa() {
    var message = "You pay 25 gold to relax at the spa. You feel refreshed, and you are " +
    "now ready to hunt for more gold again.";
    this.setState({activity: [<p key = {this.state.moves} style = {{color: "black"}}>
      {message}</p>, ...this.state.activity]});
    this.setState({gold: this.state.gold - 25, moves: this.state.moves + 1, village: 0, villagevisit: true,
      cave: 0, cavevisit: true, bank: 0, bankvisit: true, spaopen: false});
  }

  resetActivity() {
    this.setState({gold: 0, moves: 0, activity: [], village: 0, villagevisit: true, cave: 0, 
      cavevisit: true, bank: 0, bankvisit: true, spaopen: false });
  }

  render() {
    if (this.state.gold < - 49) {
      this.props.history.push("/gameover");
    }
    else if (this.state.moves >= 30) {
      this.props.history.push({
        pathname: "/win",
        gold: this.state.gold
      });
    }
    return (
      <div className = "App">
        <h1>Welcome to Ninja Gold (Ver. 4.0)! </h1>
        <h5>Your mission is to find as many gold as possible within 30 moves to supply yourself with
          enough gold to survive for the next several months. Visit the village, the cave, the shack,
          and the bank to complete your task.</h5>
        <h5>You can visit the shack as many times as you want, but you can only visit the other areas
         within a limited amount of moves (3 for the village, and 5 for the cave and the bank each).
         You can visit the areas again after visiting the spa, which will become active if one or
         more areas become disabled. </h5>
        <h5>Press the "Reset Activity" button to reset your gold and your moves count to 0.</h5>
        <h5>Have fun!</h5>
        <div id = "blueline"></div>

        <Gold gold = {this.state.gold}/>

        <div id = "box1">
          <h4>Village</h4>
          <p>Gain 20-35 gold</p>
          <button onClick = {this.village} disabled = {!this.state.villagevisit}></button>
        </div>
        <div id = "box2">
          <h4>Cave</h4>
          <p>Gain 10-20 gold</p>
          <button onClick = {this.cave} disabled = {!this.state.cavevisit}></button>
        </div>
        <div id = "box3">
          <h4>Shack</h4>
          <p>Gain 5-10 gold</p>
          <button onClick = {this.shack}></button>
        </div>
        <div id = "box4">
          <h4>Bank</h4>
          <p>Gain or lose 0-50 gold</p>
          <button onClick = {this.bank} disabled = {!this.state.bankvisit}></button>
        </div>
        <div id = "box5">
          <h4>Spa</h4>
          <p>Pay 25 gold</p>
          <button className = "spabutton" onClick = {this.spa} disabled = {!this.state.spaopen}></button>
        </div>
        
        <Activity moves = {this.state.moves} activity = {this.state.activity}/>
        <button id = "resetbutton" onClick = {this.resetActivity}></button>

        <div id = "emptyspace"></div>
      </div>
    );
  }
}

class Gold extends Component {
  render() {
    var status;
    if (this.props.gold < 0) {
      status = <p style = {{color: "red"}}>You don't have a lot of gold left! Be careful!</p>
    }
    else if (this.props.gold > 200 && this.props.gold < 400) {
      status = <p style = {{color: "green"}}>You're doing great! Keep it up!</p>
    }
    else if (this.props.gold >= 400) {
      status = <p style = {{color: "green"}}>That's a lotta gold!</p>
    }
    return (
      <div id = "count">
        <h3>Your gold: {this.props.gold}</h3>
        {status}
      </div>
    )
  }
}

class Activity extends Component {

  render() {
    return (
      <div>
        <div id = "activity">
          <p><b>Activities: ({this.props.moves} moves)</b></p>
          {this.props.activity}
        </div>
      </div>
    )
  }
}

class Lose extends Component {
  render() {
    return (
      <div id = "youlose">
        <h1>Game over! You have lost too many gold to continue!</h1>
        <h3>Press the button below the image to start a new game.</h3>
        <img src = "https://derpicdn.net/img/2013/6/12/346472/medium.jpg" alt = "out of money"></img>
        <br></br><br></br>
        <NavLink to = "/"><button className = "restart"></button></NavLink>
      </div>
    )
  }
}

class Win extends Component {
  render() {
    return (
      <div id = "youwin">
        <h1>You win! You have accumulated {this.props.location.gold} gold in 30 moves! </h1>
        <h3>Want to play again? Press the button below the image to start a new game! </h3><br></br>
        <img src = "https://derpicdn.net/img/2017/7/28/1497099/medium.png" alt = "lots of money"></img>
        <br></br><br></br>
        <NavLink to = "/"><button className = "newgame"></button></NavLink>
      </div>
    )
  }
}

export default App;
