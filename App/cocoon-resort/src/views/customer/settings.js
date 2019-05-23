import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar';
import { Segment, Form, Button, Message, Icon } from 'semantic-ui-react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import AuthClass from '../../classes/auth';

class Settings extends Component {
    state = {
        oldPassword: '',
        newPassword: '',
        confPassword: '',
        phone: '',
        user: {},
        errorMessage: '',
        formError: false
    };

    render() {
        return (
            <div>
                <NavigationBar />
                <br /><br /><br />
                <SemanticToastContainer />

                <Segment>
                    <h1>Account Settings</h1>
                    <Segment>
                        <Form error={!!this.state.errorMessage} autoComplete='off' onSubmit={this.onSubmit}>
                            <Form.Group widths='3'>
                                <Form.Input
                                    label='Old Password'
                                    placeholder='Old Password'
                                    type='password'
                                    value={this.state.oldPassword}
                                    onChange={event => this.setState({ oldPassword: event.target.value })}
                                    onBlur={this.checkOld} />

                                <Form.Input
                                    label='New Password'
                                    placeholder='New Password'
                                    type='password'
                                    value={this.state.newPassword}
                                    onChange={event => this.setState({ newPassword: event.target.value })}
                                    onBlur={this.compareToOld} />

                                <Form.Input
                                    label='Confirm New Password'
                                    placeholder='Retype password'
                                    type='password'
                                    value={this.state.confPassword}
                                    onChange={event => this.setState({ confPassword: event.target.value })}
                                    onBlur={this.compareNewOnes} />
                            </Form.Group>

                            <Form.Group widths='3'>
                                <Form.Input
                                    label='Phone'
                                    placeholder={this.state.user.phone}
                                    value={this.state.phone}
                                    onChange={event => this.setState({ phone: event.target.value })} />

                                <Form.Button
                                    floated='left'
                                    content='Discard Changes'
                                    onClick={event => this.props.history.push(`/explore`)}
                                    />

                                <Form.Button
                                    floated='right'
                                    content='Submit Changes'
                                    positive
                                    type='submit'
                                    />
                            </Form.Group>

                            <Message error header="Oops!" content={this.state.errorMessage} />
                        </Form>

                        <Segment inverted>
                            <h3>Critical Section</h3>
                            <Icon name='times circle' /> Delete Account?
                                <Button
                                    floated='right'
                                    negative
                                    content='Delete'
                                    onClick={this.deleteAccount} />
                                <br /><br /><br />
                        </Segment>
                    </Segment>
                </Segment>
            </div>
        );
    }

    async componentDidMount() {
        const clientObj = new AuthClass();
        const response = await clientObj.fetchOne(localStorage.getItem('id'));

        // const user = await response.json();
        this.setState({ user: response[0] });
        console.log('user', response);
    }

    checkOld = () => {
        const { oldPassword } = this.state;
        const storedPass = this.state.user.password;
        if (oldPassword !== '' && oldPassword !== storedPass) {
            this.setState({ errorMessage: 'Does not match old password', formError: true });
        } else {
            this.setState({ errorMessage: '', formError: false });
        }
    }

    compareToOld = () => {
        const { newPassword } = this.state;
        const storedPass = this.state.user.password;

        if (newPassword === storedPass) {
            this.setState({ errorMessage: 'Choose a new password', formError: true });
        } else {
            this.setState({ errorMessage: '', formError: false });
        }
    }

    compareNewOnes = () => {
        const { confPassword, newPassword } = this.state;
        if (newPassword !== confPassword) {
            this.setState({ errorMessage: 'Passwords must match!', formError: true });
        } else {
            this.setState({ errorMessage: '', formError: false });
        }
    }

    onSubmit = async () => {
        if (!this.state.formError) {
            const id = localStorage.getItem('id');
            const { user, newPassword, phone } = this.state
            let qPassword = newPassword || user.password;
            let qPhone = phone || user.phone;

            const authObj = new AuthClass();
            const response = await authObj.updateUser(id, qPassword, qPhone);
            this.props.history.push(`/welcome`);
        }
    }

    deleteAccount = async () => {
        const id = localStorage.getItem('id');
        const authObj = new AuthClass();
        if (authObj.deleteUser(id)) {
            this.props.history.push(`/welcome`);
        } else {
            this.setState({ errorMessage: "Something went wrong..." });
        }
    }
}

export default Settings;