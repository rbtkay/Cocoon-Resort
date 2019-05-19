import React, { Component } from 'react';
import { Image, List, Card } from 'semantic-ui-react';

import comingSoonPng from '../static/default_product_image.jpg';

const Reservation = (props) => {
    const { name, reservations } = props;

    if (reservations === undefined) {
        return (
            <List.Item>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                    <List.Description>No Reservation yet</List.Description>
                </List.Content>
            </List.Item>
        )
    }
    return reservations.map((item) => {
        return (
            <List.Item key={item.toString()}>
                <List.Icon name='github' size='large' verticalAlign='middle' />
                <List.Content>
                    <List.Header>{item.packName}</List.Header>
                    <List.Description>Reserved by {item.name} on {item.date}</List.Description>
                </List.Content>
            </List.Item>
        )
    })
}

class Profile extends Component {

    constructor(props) {
        super(props);
        const { name, reservations, today } = props;

        this.state = {
            name: name ? name : '',
            reservations: reservations ? reservations : undefined,
            today: today ? today : 'no one is comming today'
        }
    }

    render() {
        const { name, reservations, today } = this.state;
        return (
            <Card raised>
                <Image src={comingSoonPng} />
                <Card.Content>
                    <Card.Header><h1>Resort Name</h1></Card.Header>
                    <Card.Description>
                        <h6>{this.state.today}</h6>
                        <h3>Reservations</h3>
                        <List divided relaxed>
                            <Reservation name={name} reservations={reservations} today={today} />
                        </List>
                    </Card.Description>
                </Card.Content>
            </Card>

        )
    }
}

export default Profile;