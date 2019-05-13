import React, { Component } from 'react';
import { Form, Container, Segment, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class SignUp extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        formError: '',
        isError: false,
        isSuccess: false,
        isFirstName: false,
        isLastName: false,
        isPassword: false,
        isConfirm: false,
        isEmail: false
    }

    render() {
        return (
            <Segment>
                <Container>
                    <h1>Welcome to Cocoon!</h1>
                    <Form success={this.state.isSuccess} error={this.state.isError} onSubmit={this.handleForm}>
                        <Form.Group widths={2}>
                            <Form.Field>
                                <Form.Input
                                    label='First Name'
                                    placeholder='John'
                                    value={this.state.firstName}
                                    onChange={event => this.setState({ firstName: event.target.value, isError: false, formError: '', isFirstName: false, isLastName: false, isEmail: false, isPassword: false, isConfirm: false })}
                                    error={this.state.isFirstName}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    label='Last Name'
                                    placeholder='Doe'
                                    value={this.state.lastName}
                                    onChange={event => this.setState({ lastName: event.target.value, isError: false, formError: '', isFirstName: false, isLastName: false, isEmail: false, isPassword: false, isConfirm: false })}
                                    error={this.state.isLastName}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <Form.Input
                                label='Email Address'
                                placeholder='something@example.com'
                                value={this.state.email}
                                onChange={event => this.setState({ email: event.target.value, isError: false, formError: '', isFirstName: false, isLastName: false, isEmail: false, isPassword: false, isConfirm: false })}
                                error={this.state.isEmail}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                label='Password'
                                placeholder='Password'
                                type='password'
                                value={this.state.password}
                                onChange={event => this.setState({ password: event.target.value, isError: false, formError: '', isFirstName: false, isLastName: false, isEmail: false, isPassword: false, isConfirm: false })}
                                error={this.state.isPassword}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                label='Confirm Password'
                                placeholder='Confirm Password'
                                type='password'
                                value={this.state.confirmPassword}
                                onChange={event => this.setState({ confirmPassword: event.target.value, isError: false, formError: '', isFirstName: false, isLastName: false, isEmail: false, isPassword: false, isConfirm: false })}
                                error={this.state.isConfirm}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Form.Input
                                label='Phone Number'
                                placeholder='Phone Number'
                                value={this.state.phone}
                                onChange={event => this.setState({ phone: event.target.value, isError: false, formError: '', isFirstName: false, isLastName: false, isEmail: false, isPassword: false, isConfirm: false })}
                            />
                        </Form.Field>
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
        const emailRegEx = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);
        const { email, password, confirmPassword } = this.state;

        console.log(email)
        console.log(password)
        console.log(confirmPassword)
        this.emptyFieldVerification();

        if (!emailRegEx.test(email)) {
            this.setState(
                {
                    isError: true,
                    formError: "Invalid Email Address",
                    isEmail: true
                }
            );
        }
        if (password !== confirmPassword) {
            console.log("in the if")
            this.setState(
                {
                    isError: true,
                    formError: "Password don't match",
                    isPassword: true,
                    isConfirm: true
                }
            )
        } else {
            console.log("submitted")
        }
    }

    emptyFieldVerification() {
        let isFirstName = false;
        let isLastName = false;
        let isEmail = false;
        let isPassword = false;
        let isConfirm = false;

        if (this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === '' || this.state.confirmPassword === '') {
            if (this.state.firstName === '') {
                isFirstName = true;
            }
            if (this.state.lastName === '') {
                isLastName = true;
            }
            if (this.state.email === '') {
                isEmail = true;
            }
            if (this.state.password === '') {
                isPassword = true;
            }
            if (this.state.confirmPassword === '') {
                isConfirm = true;
            }

            this.setState({ isFirstName, isLastName, isEmail, isPassword, isConfirm, formError: "Some Field are Required" });
        }
    }
}

export default SignUp;