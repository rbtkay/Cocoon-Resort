import React, { Component } from 'react';
import { Menu, MenuItem, Dropdown, Icon, Button } from 'semantic-ui-react';
import cookie from '../cookie';

class VendorNavBar extends Component {

    state = {
        name: ''
    };

    render() {
        return (
            <Menu fixed="top" color="green">
                <MenuItem>
                    <a href="/welcome">LOGO</a>
                </MenuItem>

                <Menu.Menu position='right'>
                    <Dropdown text={`Hello ${this.state.name}`} className='item'>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Icon name='settings' /><a href='/settings' className='black'>Settings</a>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Icon name='map signs' /><a href='/reservations'>Reservations</a>
                            </Dropdown.Item>
                            <Dropdown.Item onClick={this.logout}>
                                <Icon name='log out' />Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Menu>
            </Menu>
        );
    }

    async componentDidMount() {
        const name = cookie.getCookie('name') || 'ALOOO';
        this.setState({ name });
    }
}

export default VendorNavBar;