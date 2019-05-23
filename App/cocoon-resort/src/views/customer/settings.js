import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar';
import { Segment, Form } from 'semantic-ui-react';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import AuthClass from '../../classes/auth';

class Settings extends Component {
    state = {
        oldPassword: '',
        newPassword: '',
        confPassword: '',
        phone: '',
        user: {}
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
                                    value={this.state.oldPassword}
                                    onChange={event => this.setState({ oldPassword: event.target.value })} />

                                <Form.Input
                                    label='New Password'
                                    placeholder='New Password'
                                    value={this.state.newPassword}
                                    onChange={event => this.setState({ newPassword: event.target.value })} />

                                <Form.Input
                                    label='Confirm New Password'
                                    placeholder='Retype password'
                                    value={this.state.confPassword}
                                    onChange={event => this.setState({ confPassword: event.target.value })} />
                            </Form.Group>

                            <Form.Input
                                label='Phone'
                                />
                        </Form>
                    </Segment>
                </Segment>
            </div>
        );
    }

    async componentDidMount() {
        const clientObj = new AuthClass();
        // const response = await clientObj.fetchOne(localStorage.getItem('id'));

        // const user = await response.json();
        // console.log('user', response);
    }
}

export default Settings;