import React, { Component } from 'react';
import PackageClass from '../classes/package';
import { Segment, ImageGroup, Image, Grid, Button, Icon } from 'semantic-ui-react';
import NumericInput from 'react-numeric-input';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';

import Mountains from '../static/Mountains.jpg'
import Beaches from '../static/Beaches.jpg'
import Forests from '../static/Forests.jpg'
import NavigationBar from '../components/NavigationBar';
import Reservation from '../classes/reservation';

// const ListImages = (props) => {
//     if (props.images.length < 1) {
//         return (
//             <h3>No packages found... :(</h3>
//         );
//     } else {
//         return props.images.map(item => {
//             console.log('zi item', item);
//             return (
//                 <Image src={item} />
//             );
//         });
//     }
// }

const ReserveBtn = (props) => {
    if (props.isReserved === false) {
        if (props.guests < props.capacity) {
            return (
                <Segment textAlign='center'>
                    <Grid columns={2}>
                        <Grid.Column verticalAlign='middle'>
                            <NumericInput
                                name='guests'
                                min={1}
                                value={props.numPeople}
                                onChange={props.handleGuests}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <Button color='blue' onClick={props.reserve}>Reserve</Button>
                        </Grid.Column>
                    </Grid>
                </Segment>
            )
        } else {
            return (
                <Segment textAlign='center'>
                    <h3>Package Full</h3>
                </Segment>
            )
        }
    } else {
        return (
            <Segment textAlign='center'>
                <Button color='green'>Reserved</Button>
            </Segment>
        )
    }
}

class viewPackage extends Component {

    constructor(props) {
        super(props);
        const queryString = require('query-string');

        const info = queryString.parse(props.location.search)

        const id = info['id'] ? info['id'] : -1;

        this.state = {
            id: id,
            images: [Mountains, Beaches, Forests],
            name: '',
            resortName: '',
            details: '',
            price: '',
            location: '',
            from: '',
            to: '',
            image: '',
            capacity: 0,
            isReserved: false,
            numPeople: 1,
            guests: 0
        }
    }

    render() {
        return (
            <div>

                <NavigationBar />
                <br />
                <br />
                <br />
                <br />

                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column >
                            <Segment>
                                <Grid style={{ backgroundImage: `url(${Mountains})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%' }}>
                                    <Grid.Row columns={3}>
                                        <Grid.Column width={2} verticalAlign='middle'>
                                            <Icon name='angle left' size='huge' />
                                        </Grid.Column>
                                        <Grid.Column width={12}>
                                            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                        </Grid.Column>
                                        <Grid.Column width={2} verticalAlign='middle'>
                                            <Icon name='angle right' size='huge' />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>

                                <h2>{this.state.name} ({this.state.resortName})</h2>
                                <p>{this.state.details}</p>
                                <h3>Dates:</h3>
                                <Grid columns={4}>
                                    <Grid.Column width={2}></Grid.Column>
                                    <Grid.Column width={6}>
                                        <b>From: </b> <p>{this.state.from}</p>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <b>To: </b> <p>{this.state.to}</p>
                                    </Grid.Column>
                                    <Grid.Column width={2}></Grid.Column>
                                </Grid>

                                <Grid columns={2}>
                                    <Grid.Column>
                                        <h3>Location: {this.state.location} </h3>
                                        <h3>Price: $ {this.state.price}</h3>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <h4>Capacity</h4>
                                        {this.state.guests}/{this.state.capacity}
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <ReserveBtn isReserved={this.state.isReserved} reserve={this.reserve} guests={this.state.guests} capacity={this.state.capacity} numPeople={this.state.numPeople} handleGuests={this.handleGuests} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

    async componentDidMount() {
        const { id } = this.state;
        if (id === -1) {
            this.props.history.push('/explore');
        } else {
            const pack = new PackageClass();
            const result = await pack.readOne(id);
            //TODO: get the images
            console.log(result);
            const { name, resortName, location, details, price, from, to, image, guests, capacity, isReserved, resortId } = result[0];

            this.setState({
                name, resortName, location, resortId, details, price, from, to, image, guests, capacity, isReserved
            })
        }
    }

    reserve = async () => {
        const reservation = new Reservation();

        console.log("this.state");
        console.log(this.state);

        const clientId = 6;

        const { id, resortId, numPeople, guests } = this.state
        if (reservation.create(id, clientId, resortId, numPeople)) {
            console.log("reserving");
            this.setState({ isReserved: true, guests: parseInt(numPeople) + parseInt(guests) });
        };
    }

    handleGuests = (event) => {
        this.setState({ numPeople: event })
    }
}
export default viewPackage;