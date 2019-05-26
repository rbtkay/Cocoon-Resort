import React, { Component } from 'react'
import { Card, Image, Button, Grid, Item } from 'semantic-ui-react';
import EditPackage from '../components/EditPackage';
import PackageClass from '../classes/package';

import comingSoonPng from '../static/default_product_image.jpg';

class Package extends Component {
    constructor(props) {
        super(props);

        const isResort = this.props.isResort || false;

        const { id, name, resortName, details, price, from, to, capacity, isReserved } = props.info;

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
            imgSrc: ''
        }
    }

    render() {
        if (this.state.isResort === false) {
            return (
                <Card key={this.state.id}>
                    <Image src={this.state.imgSrc} />
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
                <Item key={this.state.id} updatedisplay={this.props.updatedisplay}>
                    <Item.Image src={this.state.imgSrc} size='small' />
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

                    <Button floated='right' color='red' onClick={this.handleDelete}>Delete</Button>
                    <Button floated='right' color='blue' onClick={this.handleOpen} >Update</Button>

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

    handleDelete = () => {
        this.props.handleDelete(this.state.id);
    }

    updatedisplay = (state) => {
        const { id, name, capacity, price, from, to, details } = state;
        this.setState({ id, name, capacity, price, from, to, details, isOpen: false });
    }

    view = (id) => {
        // const { id } = this.state;
        this.props.viewPack(id);
    }

    async componentWillMount() {
        const pack = new PackageClass();
        let imageNames = await pack.getSingleImageName(this.state.id);
        let imgSrc = await pack.getImage(imageNames);
        this.setState({ imgSrc })
    }
}

export default Package;