import React, { Component } from 'react';
import { Form, Modal, Button, Icon, Message } from 'semantic-ui-react';
import loginClass from '../classes/auth';

class ResortLogin extends Component {
    state = {
        resortName: '',
        password: '',
    };

    render() {
        return (
            <Modal
                open={this.props.isResortLoginOpen}
                onClose={this.resortLoginClose}
                size='small'
                dimmer='blurring'
                closeOnDimmerClick={false}
            >
                <Modal.Header>
                    <Icon name='pin' /> Resort Sign In
                </Modal.Header>

                <Modal.Actions>
                    <Button floated='right' basic color='green' onClick={this.props.swapModals} content='User Sign In' />
                </Modal.Actions>

                <Modal.Content>
                    <Form error={!!this.state.errorMessage} onSubmit={this.submit}>
                        <Form.Input
                            label='Resort Name'
                            placeholder='e.g: CocoonResort'
                            name='resortName'
                            value={this.state.resortName}
                            onChange={event => this.setState({ resortName: event.target.value })} />

                        <Form.Input
                            label='Password'
                            placeholder='Password'
                            name='password'
                            type='password'
                            value={this.state.password}
                            onChange={event => this.setState({ password: event.target.value })} />

                        <Message error header="Oops!" content={this.state.errorMessage} />
                        <label>Contact us at loyalty.cocoon@gmail.com to recover your password.</label>

                        <Form.Button
                            positive
                            loading={this.state.loading}
                            content='Enter Resort' floated='right' />
                        <Button secondary onClick={this.resortLoginClose} content='Cancel' />

                    </Form>
                </Modal.Content>
            </Modal>
        );
    }

    submit = async () => {
        this.setState({ errorMessage: '' });
        const { resortName, password } = this.state;
        if (resortName === '' || password === '') {
            this.setState({ errorMessage: 'Some Fields are Missing!' });
        } else {
            const login = new loginClass();
            const result = await login.authResort(resortName, password);

            if (result !== 404) {
                this.props.handleLogin(result[0].name, result[0].jwt, result[0].id, result[0].image);
            } else {
                this.setState({ errorMessage: 'Invalid Username/Password' });
            }
        }
    }

    resortLoginClose = () => {
        this.setState({ resortName: '', password: '', errorMessage: '' });
        this.props.resortLoginClose();
    }
}

export default ResortLogin;