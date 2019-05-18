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

        const { name, resortName, details, price, from, to, guests, isReserved } = this.props.info;



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
                    <Item.Image src={comingSoonPng} size='small' />
                    <Item.Content>
                        <Item.Header>{this.state.name}</Item.Header>
                        <Item.Meta>
                            <span>{this.state.resortName}</span>
                        </Item.Meta>
                        <Item.Description>
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
                        </Item.Description>
                    </Item.Content>

                    <Button floated='right' color='red'>Delete</Button>
                    <Button floated='right' color='blue'>Update</Button>
                </Item>
            )
        }
    }
}

export default Package;