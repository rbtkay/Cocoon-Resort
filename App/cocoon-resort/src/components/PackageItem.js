import React, { Component } from 'react';
import { Item, Image } from 'semantic-ui-react';

class PackageItem extends Component {
    constructor(props) {
        super(props);
    }

    state = {

    };

    render() {
        return (
            <Item>
                <Item.Content>
                    <Item.Header>Alooo Header</Item.Header>

                    <Item.Meta>Description</Item.Meta>

                    <Item.Description>
                        LE DESCRIPTION
                    </Item.Description>

                    <Item.Extra>EXTRAS</Item.Extra>
                </Item.Content>
            </Item>
        );
    }
}

export default PackageItem;