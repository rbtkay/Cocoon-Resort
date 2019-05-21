import React, { Component } from 'react'
import { Card, Image, Button, Grid, Item } from 'semantic-ui-react';
import EditPackage from '../components/EditPackage';

import comingSoonPng from '../static/default_product_image.jpg';

class Package extends Component {
    constructor(props) {
        super(props);

        const isResort = this.props.isResort || false;

        if (isResort === true) {
            console.log(props)
        }

        const { id, name, resortName, details, price, from, to, capacity, isReserved } = props.info;

        console.log(props);

        this.state = {
            id: id || -1,
            isResort: isResort || false,
            name: name || '',
            resortName: resortName || '',
            details: details || 'no description',
            price: price || 'NA',
            from: from || '*',
            to: to || '*',
            capacity: capacity || 1,
            isReserved: isReserved || false,
        }
    }

    render() {
        if (this.state.isResort === false) {
            return (
                <Card key={this.state.id}>
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
                                        # Guests: {this.state.capacity}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Card.Description>
                    </Card.Content>
                    <Button floated='right' onClick={event => this.view(this.state.id)}>View</Button>
                </Card>
            )
        } else {
            return (<>
                <Item key={this.state.id} onClick={this.handleOpen} updatedisplay={this.props.updatedisplay}>
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
                                        # of Guests: {this.state.capacity}
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Item.Description>
                    </Item.Content>

                    <Button floated='right' color='red'>Delete</Button>
                    <Button floated='right' color='blue'>Update</Button>

                </Item> <EditPackage info={this.state} isOpen={this.state.isOpen} handleClose={this.handleClose} updatePackage={this.props.updatePackage} updatedisplay={this.updatedisplay} /> </>
            );

        }
    }

    handleOpen = () => {
        this.setState({ isOpen: true })
    }
    handleClose = () => {
        this.setState({ isOpen: false });
    }

    updatedisplay = (state) => {
        const { id, name, capacity, price, from, to, description } = state;
        this.setState({ id, name, capacity, price, from, to, description, isOpen: false });
        console.log('updateDisplay: ', state);
    }


    view = (id) => {
        // const { id } = this.state;
        this.props.viewPack(id);
    }
    async componentDidMount() {
        console.log('ALOOOOOO ID = 7777777777');
        if (this.state.id == 7) {
            const response = await fetch(`http://localhost:8080/cocoon-resort/UploadDownloadFileServlet?packageId=7`, {
                method: 'GET',
            });

            console.log(response);

        }

    }
}

export default Package;