import React, { Component } from 'react';
import homeClass from '../classes/home';

class User extends Component {

    render() {
        return (
            <h1>User</h1>
        )
    }

    async componentDidMount() {
        const test = new homeClass();

        const result = await test.getHome();
        console.log(result);
    }
}

export default User;