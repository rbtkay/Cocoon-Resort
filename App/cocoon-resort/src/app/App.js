import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Test from '../views/home';
import User from "../views/user";
import Home from "../views/resort/home";
import SignUp from '../views/customer/signUp';
import Welcome from '../views/welcome';
import Explore from '../views/explore';
import NewResort from '../views/resort/newResort';
import NewPackage from '../views/resort/newPackage';
import Resort from '../views/resort';
import ViewResort from '../views/viewResort';
import viewPackage from '../views/viewPackage';

class App extends Component {

  state = {
    user: ""
  }

  render() {
    console.log(this.state.user);
    return (
      <Router>
        <div>
          <Route path={"/resort/newResort"} exac component={NewResort} />
          <Route path={"/resort/home"} exac component={Home} />
          <Route path={"/resort/newPackage"} exac component={NewPackage} />
          <Route path={"/viewResort"} exac component={ViewResort} />
          <Route path={"/viewPackage"} exac component={viewPackage} />
          <Route path={"/resort"} exac component={Resort} />
          <Route path={"/user"} component={User} />
          <Route path={"/customer/signUp"} component={SignUp} />
          <Route path={"/welcome"} component={Welcome} />
          <Route path={"/explore"} component={Explore} />
          <Route path={"/home"} component={Test} />
        </div>
      </Router>
    );
  }
}
export default App;