import React, { Component } from 'react';
import App from '../app/App';

class Home extends Component {
    render() {
        // const user = App.getUsername();
        return (
            <h1>Home of {/* {{/* user */}} */}</h1>
        )
    }

    componentDidMount() {
        const test = App.getUsername();
    }
}

export default Home;