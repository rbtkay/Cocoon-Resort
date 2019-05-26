import React, { Component } from 'react';
import { Segment, Grid, Image, Button, Container } from 'semantic-ui-react';

import image from '../../static/default_product_image.jpg'
import image1 from '../../static/image3.jpg'

import ReservationClass from '../../classes/reservation'
import NavigationBar from '../../components/NavigationBar';

const Reservation = (props) => {
    const { packId, packName, resortName, reservationId, packFrom, packTo, packGuests, packDetails, resortLocation } = props.info;
    return (
        <Segment key={props.toString()}>
            <Grid columns={3}>
                <Grid.Column>
                    <Image src={image} />
                </Grid.Column>
                <Grid.Column>
                    <h1>{packName} ({resortName})</h1>
                    <h3>Dates:</h3>
                    <Grid columns={4}>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={6}>
                            <b>From: </b> <p>{packFrom}</p>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <b>To: </b> <p>{packTo}</p>
                        </Grid.Column>
                        <Grid.Column width={2}></Grid.Column>
                    </Grid>
                    <br />
                    <br />
                    <b>At</b> {resortLocation}
                    <h3>Description</h3>
                    <p>{packDetails}</p>
                </Grid.Column>
                <Grid.Column verticalAlign='bottom'>
                    <Button floated='right' color='red' onClick={event => props.cancel(reservationId, packId, packGuests)}>Cancel Reservation</Button>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}

const ListReservation = (props) => {
    if (props.reservations.length > 0) {
        return props.reservations.map((item) => {
            return (
                <Reservation keys={item.toString()} info={item} cancel={props.cancel} />
            )
        })
    } else {
        return (
            <Segment>
                <h1>You Have no Reservation Yet</h1>
            </Segment>
        )
    }
}

class viewReservation extends Component {

    constructor(props) {
        super(props);

        // const queryString = require('query-string');

        // const info = queryString.parse(props.location.search)

        // const id = info['id'] ? info['id'] : -1;

        // console.log(id)


        this.state = {
            clientId: localStorage.getItem("id"),
            reservations: []
        }
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <br />
                <br />
                <br />
                <Segment style={{ backgroundImage: `url(${image1})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%', height: '100vh' }}>
                    <Container>
                        <ListReservation reservations={this.state.reservations} cancel={this.cancelReservation} />
                    </Container>
                </Segment>
            </div>
        )
    }

    async componentDidMount() {

        if (this.state.clientId === -1) {
            this.props.history.push('/explore');
        }
        const reservation = new ReservationClass();
        const result = await reservation.readAllByCustomer(this.state.clientId);
        if (result === 401) {
            window.location = '/welcome';
        } else {
            if (result !== null) {
                this.setState({ reservations: result })
            }
        }
    }

    cancelReservation = async (id, packId, quantity) => {
        const reservation = new ReservationClass();
        const result = await reservation.cancel(id, packId, quantity);

        if (result === true) {
            this.componentDidMount();
        }
    }
}

export default viewReservation;