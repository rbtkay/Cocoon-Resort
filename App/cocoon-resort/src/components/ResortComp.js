import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

import image from '../static/default_product_image.jpg'

class ResortComp extends Component {

    constructor(props) {
        super(props);

        const { id, name, location, category, count } = props.info;

        this.state = {
            id: id ? id : '',
            name: name ? name : '',
            location: location ? location : '',
            category: category ? category : '',
            count: count ? count : 'NAN'
        }

        console.log(this.state);
    }

    render() {
        return (
            <Card onClick={event => this.props.redirect(this.state.id)}>
                <Image src={image}></Image>
                <Card.Content>
                    <Card.Header>{this.state.name}</Card.Header>
                    <Card.Meta>{this.state.location}</Card.Meta>
                    <Card.Description>
                        # Available Packages: <b>{this.state.count}</b>
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}
export default ResortComp;