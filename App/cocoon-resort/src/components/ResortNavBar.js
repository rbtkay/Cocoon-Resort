import React, { Component } from 'react';
import { Menu, MenuItem, Dropdown, Icon } from 'semantic-ui-react';
import cookie from '../cookie';

class ResortNavBar extends Component {

    state = {
        resortName: ''
    };

    render() {
        return (
            <Menu fixed="top" color="green">
                <MenuItem>
                    <a href="/welcome">LOGO</a>
                </MenuItem>

                <Menu.Menu position='right'>
                    <Dropdown text={`Hello ${this.state.resortName}`} className='item'>
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
        const resortName = localStorage.getItem("resortName");
        // const resortName = cookie.getCookie('resortName') || '';
        if (resortName === '') {
            // this.props.history.push(`/welcome`);
            window.location = '/welcome';
        }
        this.setState({ resortName });
    }

    logout = () => {
        localStorage.clear();
        cookie.deleteCookie();
        window.location = '/welcome';
    }
}

export default ResortNavBar;