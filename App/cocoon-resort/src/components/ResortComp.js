import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';
import PackageClass from '../classes/package';

class ResortComp extends Component {

    constructor(props) {
        super(props);

        const { id, name, location, category, count, image } = props.info;

        this.state = {
            id: id ? id : '',
            name: name ? name : '',
            location: location ? location : '',
            category: category ? category : '',
            count: count ? count : 'NAN',
            image: image || '',
        }
    }

    render() {
        return (   
            <Card onClick={event => this.props.redirect(this.state.id, this.state.name)}>
                <Image src={this.state.image}></Image>
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

    async componentWillMount() {
        const pack = new PackageClass();
        const imageSrc = await pack.getImage(this.state.image);
        console.log('imageSrc in comp', imageSrc)
        this.setState({ image: imageSrc });
    }
}
export default ResortComp;