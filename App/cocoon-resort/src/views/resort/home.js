import React, { Component } from 'react';
import Package from '../../components/Package';
import Profile from '../../components/Profile';

class Home extends Component {

    state = {
        info: {}
    }

    render() {
        return (
            <div>
                {/* <h1>Resort Name</h1> */}
                {/* <Package info={this.state.info} /> */}
                <Profile />
            </div>
        )
    }

    componentDidMount() {
        const info = {
            name: 'lala',
            resortName: 'asd',
            details: 'no description',
            price: 'NA',
            from: '*',
            to: '*',
            guests: 1,
            isReserved: false
        }
        this.setState({ info })
    }
}

export default Home;