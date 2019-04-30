import React, { Component } from './node_modules/react';
import logo from './logo.svg';
import './App.css';

class Test extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lala Land
        </a>
        </header>
      </div>
    );
  }
}

export default Test;
