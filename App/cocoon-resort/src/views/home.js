import React, { Component } from 'react';
import App from '../app/App';
import homeClass from "../classes/home";

class Home extends Component {
    render() {
        // const user = App.getUsername();
        return (
            <h1>Home of {/* {{/* user */}} */}</h1>
        )
    }

    async componentDidMount() {
        const home = new homeClass();
        const test = await home.getHome();

        console.log(test);
    }
}

export default Home;