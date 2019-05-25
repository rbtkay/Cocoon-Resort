import React, { Component } from 'react';
import { Menu, MenuItem, Button, Dropdown, Form, Icon } from 'semantic-ui-react';
import Login from '../components/Login';
import ResortLogin from '../components/ResortLogin';
import { Redirect } from 'react-router';

import JWT from 'jsonwebtoken';

import loginClass from '../classes/auth';
const cookie = require('../cookie');


const BtnComp = (props) => {
    console.log(props.isAuth)

    if (props.isAuth !== false) {
        const token = props.isAuth;

        const decodedToken = JWT.decode(token);
        console.log(decodedToken);

        if (decodedToken.iss === "client") {
            return <Button onClick={props.viewReservation}>Check Your Reservation</Button>
        } else if (decodedToken.iss === "resort") {
            return <p />;
        } else {
            return <Button color='brown' onClick={props.newResort}>Show us Your Resort</Button>

        }
    } else {
        return <Button color='brown' onClick={props.newResort}>Show us Your Resort</Button>
    }
}


class NavigationBar extends Component {

    constructor(props) {
        super(props);

        console.log(localStorage.getItem('auth'));
        this.state = {
            isAuth: localStorage.getItem('auth') || false,
            name: '',
            search: '',
            isLoginOpen: false
        };

    }

    render() {
        return (
            <Menu fixed="top" color="green">
                <MenuItem>
                    <a href="/welcome">LOGO</a>
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
                    <BtnComp isAuth={this.state.isAuth} newResort={this.newResort} viewReservation={this.viewReservation} />
                </MenuItem>

                <Menu.Menu position='right'>
                    {this.renderMenu()}
                </Menu.Menu>
            </Menu>
        );
    }

    async componentDidMount() {
        console.log(this.props.isLoginNeeded);
        let name = localStorage.getItem('name');
        console.log(this.state)
        if (name) {
            this.setState({ name });
        }
    }

    newResort = () => {
        // this.props.history.push('/resort/newResort')
        window.location = '/resort/newResort';
    }

    renderMenu = () => {
        const token = this.state.isAuth;

        console.log("token")
        console.log(token)

        if (token) {
            const decodedToken = JWT.decode(token);



            if (decodedToken.iss === "client") {
                return (
                    <Menu.Menu position='right'>
                        <Dropdown text={`Hello ${this.state.name}`} className='item'>
                            <Dropdown.Menu>
                                <Dropdown.Item>
                                    <Icon name='settings' /><a href='/customer/settings' className='black'>Settings</a>
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
            } else if (decodedToken.iss === "resort") {
                return (
                    <Menu.Item>
                        <Button color='red' onClick={this.logout}>Logout</Button>
                    </Menu.Item>
                )
            }
        } else {
            return (
                <Menu.Menu position='right'>

                    <MenuItem>
                        <Login isLoginOpen={this.state.isLoginOpen} loginClose={this.loginClose} handleLogin={this.handleLogin} swapModals={this.swapModals} />
                        <ResortLogin isResortLoginOpen={this.state.isResortLoginOpen} resortLoginClose={this.resortLoginClose} handleLogin={this.handleResortLogin} swapModals={this.swapModals} />
                        <Button icon='sign-in' secondary inverted onClick={this.onClick} content='Log In'></Button>
                    </MenuItem>

                    <MenuItem>
                        <Icon name='signup' /><a href='/customer/signup'>Sign Up</a>
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

    swapModals = () => {
        if (this.state.isLoginOpen) {
            this.setState({ isLoginOpen: false, isResortLoginOpen: true });
        }
        if (this.state.isResortLoginOpen) {
            this.setState({ isLoginOpen: true, isResortLoginOpen: false });
        }
    }

    handleLogin = (id, email, name, jwt) => {
        localStorage.setItem("auth", jwt);
        localStorage.setItem("email", email);
        localStorage.setItem("name", name);
        localStorage.setItem("id", id);

        this.loginClose();
        this.setState({ name, isAuth: jwt });
    }


    handleResortLogin = (resortName, jwt, id) => {
        localStorage.setItem("resortName", resortName);
        localStorage.setItem('auth', jwt);
        localStorage.setItem('id', id);
        this.resortLoginClose();
        this.setState({ name: resortName, isAuth: jwt });
        window.location = `/resort/home`;
    }


    viewReservation = () => {
        let id = localStorage.getItem('id');
        window.location.href = `http://localhost:3000/customer/viewReservation?id=${id}`;
    }

    loginClose = () => {
        this.setState({ isLoginOpen: false });
    }

    resortLoginClose = () => {
        this.setState({ isResortLoginOpen: false });
    }

    logout = async () => {
        const login = new loginClass();
        // const result = await login.logoutUser();

        // if (result === true) {
        localStorage.clear();
        cookie.deleteCookie();
        window.location.href = `http://localhost:3000/welcome`;
        // } else {
        // alert('Connection Error');
        // }
    }
}

export default NavigationBar;