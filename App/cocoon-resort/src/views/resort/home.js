import React, { Component } from 'react';
// import ResortPack from '../../components/ResortPack';
import Profile from '../../components/Profile';
import { Item, Input, Grid, Button, Segment } from 'semantic-ui-react';

import Reservation from '../../classes/reservation';
import Package from '../../components/Package';
import VendorNavBar from '../../components/ResortNavBar';

const ListPackages = (props) => {
    if (props.packages.length < 1) {
        return (
            <h3>No Packages</h3>
        )
    } else {
        return props.packages.map(item => {
            return (
                <Package info={item} isResort={true} />
            )
        })
    }
}

class Home extends Component {

    state = {
        info: {}, //for client package
        packages: [] //for resort package
    }

    render() {
        return (
            <div>
                <VendorNavBar />
                <br />
                <br />
                <br />
                <Grid columns={3}>
                    <Grid.Column width={4}>
                        <Profile />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Item.Group itemsPerRow={4}>
                            <ListPackages packages={this.state.packages} />
                        </Item.Group>

                        <Segment textAlign='center'>
                            <Button color='green'>Add new Package</Button>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={4}>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }

    async componentDidMount() {
        const packageObj = new Package();

        const packages = await reservation.readAll();

        console.log(packages);

        this.setState({ packages })
    }
}

export default Home;