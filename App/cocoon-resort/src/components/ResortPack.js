import React, { Component } from 'react';
import { Item } from 'semantic-ui-react';

class ResortPack extends Component {

    constructor(props) {
        super(props)
        const { client, reservation } = props.info;
        const pack = props.info.package;

        this.state = {
            client: client,
            pack: pack,
            reservation: reservation
        }
    }

    render() {
        console.log(this.state)
        return (
            <Item>
                <Item.Image size='small' src='/images/wireframe/image.png' />

                <Item.Content>
                    <Item.Header as='a'>{this.state.client}</Item.Header>
                    <Item.Description>
                        <p>{this.state.pack}</p>
                        <p>Many people also have their own barometers for what makes a cute dog.</p>
                    </Item.Description>
                </Item.Content>
            </Item>
        )
    }
}

export default ResortPack;