import React, { Component } from 'react'
import { Card, Image, Button, Grid, Item } from 'semantic-ui-react'

import comingSoonPng from '../static/default_product_image.jpg';

class Package extends Component {
    constructor(props) {
        super(props);

        const isResort = this.props.isResort || false;

        if (isResort === true) {
            console.log(props)
        }

        const { name, resortName, details, price, from, to, guests, isReserved, client, reservation } = this.props.info;

        this.state = {
            isResort: isResort || false,
            name: name || '',
            resortName: resortName || '',
            details: details || 'no description',
            price: price || 'NA',
            from: from || '*',
            to: to || '*',
            guests: guests || 1,
            isReserved: isReserved || false,
            client: client || '',
            pack: props.info.package || '',
            reservation: reservation || {}
        }
    }
    render() {
        if (this.state.isResort === false) {
            return (
                <Card>
                    <Image src={comingSoonPng} />
                    <Card.Content>
                        <Card.Header>{this.state.name}</Card.Header>
                        <Card.Meta>
                            <span>{this.state.resortName}</span>
                        </Card.Meta>
                        <Card.Description>
                            {this.state.details}
                            <Grid>
                                <Grid.Row columns={2}>
                                    <Grid.Column width='7'>
                                        Price: {this.state.price}
                                    </Grid.Column>
                                    <Grid.Column width='7'>
                                        # Guests: {this.state.guests}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Card.Description>
                    </Card.Content>
                    <Button floated='right'>View</Button>
                </Card>
            )
        } else {
            return (
                <Item>
                    <Item.Image size='small' src={comingSoonPng} />
                    <Item.Content>
                        <Item.Header>{this.state.pack}</Item.Header>
                        <Item.Meta>
                            <span>{this.state.client}</span>
                        </Item.Meta>
                        <Item.Description>
                            <p>{this.state.details}</p>
                            <b>from: {this.state.reservation['from']}</b><br />
                            <b>to: {this.state.reservation['to']}</b>
                        </Item.Description>
                    </Item.Content>
                </Item>
            )
        }
    }
}

export default Package;