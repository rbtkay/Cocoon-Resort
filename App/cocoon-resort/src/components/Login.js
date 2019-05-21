import React, { Component } from 'react';
import { Form, Modal, Button, Icon, Message } from 'semantic-ui-react';
import loginClass from '../classes/auth';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errorMessage: ''
    };

    render() {
        return (
            <Modal
                open={this.props.isLoginOpen}
                onClose={this.loginClose}
                size='small'
                closeOnDimmerClick={false}
            >
                <Modal.Header>
                    <Icon name='sign-in' /> Log In
                </Modal.Header>

                <Modal.Content>
                    <Form error={!!this.state.errorMessage} onSubmit={this.submit}>
                        <Form.Input
                            label='Email'
                            placeholder='Email'
                            name='email'
                            value={this.state.email}
                            onChange={event => this.setState({ email: event.target.value })}
                        />

                        <Form.Input
                            label='Password'
                            placeholder='Password'
                            name='password'
                            value={this.state.password}
                            onChange={event => this.setState({ password: event.target.value })}
                        />

                        <Message error header="Oops!" content={this.state.errorMessage} />
                        <a href='/forgotPassword'>Forgot Password?</a>
                        <Form.Button
                            positive
                            loading={this.state.loading}
                            content='Log In' floated='right' />
                        <Button secondary onClick={this.loginClose} content='Cancel' />
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }

    submit = async () => {
        this.setState({ errorMessage: '' });
        const { email, password } = this.state;
        if (email === '' || password === '') {
            this.setState({ errorMessage: 'Some Fields are Missing!' });
        } else {
            const login = new loginClass();
            const result = await login.authUser(email, password);

            if (result !== 404) {
                this.props.handleLogin(result[0].email, result[0].name, result[0].jwt);
            } else {
                this.setState({ errorMessage: 'Invalid Username/Password' });
            }
        }
    }

    loginClose = () => {
        this.setState({ email: '', password: '', errorMessage: '' });
        this.props.loginClose();
    }
}

export default Login;