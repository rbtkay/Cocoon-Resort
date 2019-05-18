import React, { Component } from 'react';
import ResortPack from '../../components/ResortPack';
import Profile from '../../components/Profile';
import { Card, Input } from 'semantic-ui-react';

import Reservation from '../../classes/reservation';
import Package from '../../components/Package';

const ListPackages = (props) => {
    if (props.packages.length < 1) {
        return (
            <h3>No Packages</h3>
        )
    } else {
        return props.packages.map(item => {
            return (
                <Package info={item} />
            )
        })
    }
}

class Home extends Component {

    state = {
        info: {},
        packages: []
    }

    render() {
        return (
            <div>
                <Profile />
                <Card.Group itemsPerRow={4}>
                    <ListPackages packages={this.state.packages} />
                </Card.Group>
            </div>
        )
    }

    async componentDidMount() {
        const reservation = new Reservation();

        const packages = await reservation.readAll();

        console.log(packages);

        this.setState({ packages })
    }
}

export default Home;