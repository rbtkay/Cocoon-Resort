import React, { Component } from 'react';
import { Grid, Item } from 'semantic-ui-react';
import VendorNavBar from '../../components/VendorNavBar';
import PackageItem from '../../components/PackageItem';
import packageClass from '../../classes/package';

class Index extends Component {
    state = {

    };

    render() {
        return (
            <div>
                <VendorNavBar />
                <br /><br /><br /><br />
                <Item.Group>
                    <PackageItem />
                </Item.Group>
            </div>
        );
    }
}

export default Index;