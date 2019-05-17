import React, { Component } from 'react';
import PackageComp from '../../components/Package';
import Profile from '../../components/Profile';
import { Card, Input } from 'semantic-ui-react';

import Reservation from '../../classes/reservation';

const ListPackages = (props) => {
    if (props.packages.length < 1) {
        return (
            <h3>No Packages</h3>
        )
    } else {
        props.packages.map(item => {
            return (
                <PackageComp info={item} />
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