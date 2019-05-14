import React, { Component } from 'react';
import homeClass from '../classes/home';
import NavigationBar from '../components/NavigationBar';

class User extends Component {

    render() {
        return (
            <div>
                <NavigationBar /> <br /><br /><br />
                <h1>User</h1>
            </div>
        );
    }

    // async componentDidMount() {
    //     const test = new homeClass();
    //
    //     const result = await test.getHome();
    //     console.log(result);
    // }
}

export default User;