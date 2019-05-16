import React, { Component } from 'react';
import { Menu, MenuItem, Button, Dropdown, Form, Icon } from 'semantic-ui-react';
import Login from '../components/Login';
import loginClass from '../classes/auth';
const cookie = require('../cookie');

class NavigationBar extends Component {
    state = {
        name: '',
        search: '',
        isLoginOpen: false
    };

    render() {
        return (
            <Menu fixed="top" color="green">
                <MenuItem>
                    <a href="/we">LOGO</a>
                </MenuItem>

                <MenuItem style={{ marginLeft: '300px' }}>
                    <Form>
                        <Form.Input
                            style={{ width: '400px' }}
                            name='search'
                            value={this.state.search}
                            onChange={event => this.setState({ search: event.target.value })}
                            icon='search'
                            placeholder='Search Resorts'
                        />
                    </Form>
                </MenuItem>

                <MenuItem>
                    <Button onClick={this.props.newResort}>Show us Your Resort</Button>
                </MenuItem>

                <Menu.Menu position='right'>
                    {this.renderMenu()}
                </Menu.Menu>
            </Menu>
        );
    }

    async componentDidMount() {
        let name = cookie.getCookie('name');
        if (name) {
            this.setState({ name });
        }
    }

    renderMenu = () => {
        if (this.state.name) {
            return (
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
            )
        } else {
            return (
                <Menu.Menu position='right'>

                    <MenuItem>
                        <Login isLoginOpen={this.state.isLoginOpen} loginClose={this.loginClose} handleLogin={this.handleLogin} />
                        <Button icon='sign-in' secondary inverted onClick={this.onClick} content='Log In'></Button>
                    </MenuItem>

                    <MenuItem>
                        <Icon name='signup' /><a href='/signup'>Sign Up</a>
                    </MenuItem>
                </Menu.Menu>
            );
        }
    }
    onClick = (event) => {
        event.preventDefault();
        event.target.blur();
        this.setState({ isLoginOpen: true });
    }

    handleLogin = (email, name) => {
        cookie.setCookie('email', email, 100);
        cookie.setCookie('name', name, 100);
        this.loginClose();
        this.setState({ name });
    }

    loginClose = () => {
        this.setState({ isLoginOpen: false });
    }

    logout = async () => {
        const login = new loginClass();
        const result = await login.logoutUser();

        if (result === true) {
            cookie.deleteCookie();
            window.location.href = `http://localhost:3000/welcome`;
        } else {
            alert('Connection Error');
        }
    }
}

export default NavigationBar;