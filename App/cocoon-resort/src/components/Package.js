import React, { Component } from 'react'
import { Card, Image, Button, Grid } from 'semantic-ui-react'

import comingSoonPng from '../static/default_product_image.jpg';

class Package extends Component {
    constructor(props) {
        super(props);

        const { name, resortName, details, price, from, to, guests, isReserved } = this.props.info;

        this.state = {
            name: name || '',
            resortName: resortName || '',
            details: details || 'no description',
            price: price || 'NA',
            from: from || '*',
            to: to || '*',
            guests: guests || 1,
            isReserved: isReserved || false
        }
    }
    render() {
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
    }
}

export default Package;