import React, { Component } from 'react';
import App from '../app/App';
import homeClass from "../classes/home";
import NavigationBar from '../components/NavigationBar';

const Test = (props) => {
    return (
        <div>Robert, {props.name}</div>
    )
}

class Home extends Component {
    render() {
        // const user = App.getUsername();
        return (
            <div>
                <h1>Home of {/* {{/* user */}} */}</h1>


                <Test name="kevin" />
            </div>
        )
    }

    async componentDidMount() {
        const home = new homeClass();
        const test = await home.getHome();
    }
}

export default Home;