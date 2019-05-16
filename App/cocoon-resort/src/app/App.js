import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import User from "../views/user";
import Home from "../views/home";
import SignUp from '../views/customer/signUp';
import Welcome from '../views/welcome';
import Explore from '../views/explore';
import NewResort from '../views/resort/newResort';

class App extends Component {

  state = {
    user: ""
  }

  render() {
    console.log(this.state.user);
    return (
      <Router>
        <div>
          <Route path={"/resort/newResort"} component={NewResort} />
          <Route path={"/home"} component={Home} />
          <Route path={"/user"} component={User} />
          <Route path={"/signUp"} component={SignUp} />
          <Route path={"/welcome"} component={Welcome} />
          <Route path={"/explore"} component={Explore} />
        </div>
      </Router>
    );
  }
}
export default App;
