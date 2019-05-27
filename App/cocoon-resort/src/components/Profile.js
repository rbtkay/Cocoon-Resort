import React, { Component } from 'react';
import { Image, List, Card, Input } from 'semantic-ui-react';
import ResortClass from '../classes/resort';
import PackageClass from '../classes/package';

const Reservation = (props) => {
    const { name, reservations } = props;

    if (reservations === undefined || reservations.length === 0) {
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
                    <List.Header>{item.package}</List.Header>
                    <List.Description>Reserved by {item.client}, qty: {item.quantity}</List.Description>
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
            today: today ? today : 'No Reservations for Today',
            src: ''
        }
    }

    render() {
        const { reservations, name } = this.props;
        const resortName = localStorage.getItem('resortName');
        return (
            <Card raised>
                <Image src={this.state.src} onClick={this.imageClick} />
                <Card.Content>
                    <Card.Header><h1>{resortName}</h1></Card.Header>
                    <Card.Description>
                        <h6>{this.state.today}</h6>
                        <h3>Reservations</h3>
                        <List divided relaxed>
                            <Reservation name={name} reservations={reservations} />
                        </List>
                    </Card.Description>
                </Card.Content>
                <Input id='imageInput' type='file' style={{visibility: 'hidden'}} onChange={this.updateImage}/>
            </Card>
        )
    }

    imageClick = () => {
        const imageInput = document.getElementById('imageInput');
        imageInput.click();
    }

    updateImage = (event) => {
        const resort = new ResortClass();
        resort.updateImage(event.target.files[0]);
        localStorage.setItem('image', event.target.files[0].name);
    }

    async componentWillMount() {
        const imageName = localStorage.getItem('image');
        const pack = new PackageClass();
        const image = await pack.getImage(imageName);
        this.setState({ src: image });
    }
}

export default Profile;