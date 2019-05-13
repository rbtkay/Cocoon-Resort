import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import User from "../views/user";
import Home from "../views/home";
import SignUp from '../views/signUp';

class App extends Component {

  state = {
    user: ""
  }

  render() {
    console.log(this.state.user);
    return (
      <Router>
        <div>
          <Route path={"/home"} component={Home} />
          <Route path={"/user"} component={User} />
          <Route path={"/signUp"} component={SignUp} />
        </div>
      </Router>
    );
  }
}
export default App;
