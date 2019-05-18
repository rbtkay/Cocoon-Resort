import React, { Component } from 'react';
// import ResortPack from '../../components/ResortPack';
import Profile from '../../components/Profile';
import { Item, Grid, Button, Segment } from 'semantic-ui-react';
import Reservation from '../../classes/reservation';
import Package from '../../components/Package';
import ResortNavBar from '../../components/ResortNavBar';
import PackageClass from '../../classes/package';

const ListPackages = (props) => {
    if (props.packages.length < 1) {
        return (
            <h3>No Packages</h3>
        )
    } else {
        return props.packages.map(item => {
            return (
                <Package key={item.id} info={item} isResort={true} updatePackage={props.updatePackage} />
            )
        })
    }
}

class Home extends Component {

    // constructor(props) {
    //     super(props)

    // }

    state = {
        info: {}, //for client package
        reservation: [], //for resort package
        packages: [],
    }

    render() {
        return (
            <div>
                <ResortNavBar />
                <br /><br /><br />
                <Grid columns={3}>
                    <Grid.Column width={4}>
                        <Profile />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Item.Group>
                            <ListPackages packages={this.state.packages} updatePackage={this.updatePackage}/>
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

        const reservation = new Reservation();
        const pack = new PackageClass();
        const reservations = await reservation.readAll();
        const packages = await pack.filterByResort(1);

        this.setState({ reservations, packages });
    }

    updatePackage = async (state) => {
        console.log('zi update state', state);
        const pack = new PackageClass();
        const result = await pack.updatePackage(state.id, state.name, state.details, state.price, state.from, state.to, state.capacity);

        console.log('le result', result);
    }
}

export default Home;