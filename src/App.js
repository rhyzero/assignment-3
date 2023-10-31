/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Import other components
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import LogIn from "./components/Login";
import Credits from "./components/Credits";
import Debits from "./components/Debits";

class App extends Component {
  constructor() {
    // Create and initialize state
    super();
    this.state = {
      accountBalance: 779.25,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: "Joe Smith",
        memberSince: "11/22/99",
      },
    };
  }

  componentDidMount() {
    fetch("https://johnnylaicode.github.io/api/debits.json")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ debitList: data });
      });
    fetch("https://johnnylaicode.github.io/api/credits.json")
      .then((res) => res.json())
      .then((result) => this.setState({ creditList: result }));
  }

  addDebit = (e) => {
    const today = new Date();
    e.preventDefault();
    const newItem = { amount: 0, date: "", description: "" };
    newItem.amount = +parseFloat(e.target[1].value).toFixed(2);
    newItem.date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    newItem.description = e.target[0].value;
    this.setState({ debitList: this.state.debitList.concat(newItem) });
    this.setState({
      accountBalance: this.state.accountBalance - newItem.amount,
    });
    console.log(newItem.amount);
  };

  addCredit = (e) => {
    const today = new Date();
    e.preventDefault();
    const newItem = { amount: 0, date: "", description: "" };
    newItem.amount = +parseFloat(e.target[1].value).toFixed(2);
    newItem.date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    newItem.description = e.target[0].value;
    this.setState({ creditList: this.state.creditList.concat(newItem) });
    this.setState({
      accountBalance: this.state.accountBalance + newItem.amount,
    });
    console.log(newItem.amount);
  };

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  // Create Routes and React elements to be rendered using React components
  render() {
    // Create React elements and pass input props to components
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => (
      <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
    );
    const CreditsComponent = () => (
      <Credits
        credits={this.state.creditList}
        addCredit={this.addCredit}
        balance={this.state.accountBalance}
      />
    );
    const DebitsComponent = () => (
      <Debits
        debits={this.state.debitList}
        addDebit={this.addDebit}
        balance={this.state.accountBalance}
      />
    );

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-starter-code">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
