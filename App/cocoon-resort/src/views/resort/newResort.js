import React, { Component } from 'react';
import { Form, Segment, Container, Message, Dropdown } from 'semantic-ui-react';
import Resort from '../../classes/resort';

class NewResort extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSuccess: false,
            isError: false,
            formError: '',
            name: '',
            password: '',
            confirm: '',
            location: '',
            category: { text: '', value: '' }
        }
    }

    render() {
        return (
            <Segment>
                <Container>
                    <h1>Welcome to Cocoon!</h1>
                    <Form success={this.state.isSuccess} error={this.state.isError} onSubmit={this.handleForm}>
                        <Form.Field>
                            <Form.Input
                                label='Resort Name'
                                placeholder='ex:  Cocoon Resort'
                                value={this.state.name}
                                onChange={event => this.setState({ name: event.target.value, isError: false, formError: '', isName: false, isPassword: false, isConfirm: false })}
                                error={this.state.isName}
                            />
                        </Form.Field>

                        <Form.Field>
                            <Form.Input
                                label='Password'
                                type='password'
                                value={this.state.password}
                                onChange={event => this.setState({ password: event.target.value, isError: false, formError: '', isName: false, isPassword: false, isConfirm: false })}
                                error={this.state.isPassword}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                label='Confirm Password'
                                type='password'
                                value={this.state.confirm}
                                onChange={event => this.setState({ confirm: event.target.value, isError: false, formError: '', isFirstName: false, isLastName: false, isEmail: false, isPassword: false, isConfirm: false })}
                                error={this.state.isConfirm}
                            />
                        </Form.Field>

                        <Form.Group widths={2}>

                            <Form.Field>
                                <Form.Input
                                    label='Location'
                                    placeholder='location'
                                    value={this.state.location}
                                    onChange={event => this.setState({ location: event.target.value })}
                                />
                                <span>this will help to promote your resort to customers</span>
                            </Form.Field>

                            <Form.Field>
                                <label>Category</label>
                                <Dropdown
                                    name="category"
                                    value={this.state.category.value}
                                    fluid
                                    search
                                    selection
                                    text={this.state.category.text}
                                    options={[{
                                        text: "Mountains",
                                        value: "Mountains"
                                    }, {
                                        text: "Beaches",
                                        value: "Beaches"
                                    }, {
                                        text: "Bungalows",
                                        value: "Bungalows"
                                    }]}
                                    placeholder='Select location'
                                    onChange={(event, data) => this.setState({ category: { text: data.value, value: data.value } })}
                                />

                            </Form.Field>
                        </Form.Group>

                        <Message success header='Form Completed' content="We've sent you a confirmation email" />
                        <Message error header='Form Error' content={this.state.formError} />
                        <Form.Field>
                            <Form.Button color='green' floated='right'>Register</Form.Button>
                        </Form.Field>

                    </Form>
                </Container>
                <br></br>
                <br></br>
                <br></br>
            </Segment>
        )
    }

    handleForm = () => {
        const { name, password, confirm, location, category } = this.state;

        let isName = false;
        let isPassword = false;
        let isConfirm = false;

        if (name === '' || password === '' || confirm === '') {
            if (name === '') {
                isName = true;
            }
            if (password === '') {
                isPassword = true;
            }
            if (confirm === '') {
                isConfirm = true;
            }
            this.setState({ isName, isPassword, isConfirm, isError: true, formError: 'Some Field are Missing' });
        } else if (password !== confirm) {
            isPassword = true;
            isConfirm = true;
            this.setState({ isPassword, isConfirm, isError: true, formError: 'Passwords do not match' });
        } else {
            const resort = new Resort();
            if (resort.create(name, password, location, category.value)) {
                window.location = "/resort/home";
            } else {
                console.log("network error");
            }
        }
    }
}

export default NewResort;

