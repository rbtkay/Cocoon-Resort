import React, { Component } from 'react';
import { Form, Container, Segment, Message } from 'semantic-ui-react';
import Auth from '../../classes/auth';
import NavigationBar from '../../components/NavigationBar';

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
        isEmail: false,
        isLoading: false
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <br /><br /><br />
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
                                        onChange={event => this.setState({ firstName: event.target.value, isError: false, formError: '', isFirstName: false })}
                                        error={this.state.isFirstName}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        label='Last Name'
                                        placeholder='Doe'
                                        value={this.state.lastName}
                                        onChange={event => this.setState({ lastName: event.target.value, isError: false, formError: '', isLastName: false })}
                                        error={this.state.isLastName}
                                    />
                                </Form.Field>
                            </Form.Group>
                            <Form.Field>
                                <Form.Input
                                    label='Email Address'
                                    placeholder='something@example.com'
                                    value={this.state.email}
                                    onChange={event => this.setState({ email: event.target.value, isError: false, formError: '', isEmail: false })}
                                    error={this.state.isEmail}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    label='Password'
                                    placeholder='Password'
                                    type='password'
                                    value={this.state.password}
                                    onChange={event => this.setState({ password: event.target.value, isError: false, formError: '', isPassword: false })}
                                    error={this.state.isPassword}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    label='Confirm Password'
                                    placeholder='Confirm Password'
                                    type='password'
                                    value={this.state.confirmPassword}
                                    onChange={event => this.setState({ confirmPassword: event.target.value, isError: false, formError: '', isConfirm: false })}
                                    error={this.state.isConfirm}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    label='Phone Number'
                                    placeholder='Phone Number'
                                    type='text'
                                    id='phone'
                                    value={this.state.phone}
                                    onKeyDown={event => this.addPhone(event)}

                                />
                            </Form.Field>
                            <Message success header='Form Completed' content="We've sent you a confirmation email" />
                            <Message error header='Form Error' content={this.state.formError} />
                            <Form.Field>
                                <Form.Button loading={this.state.isLoading} color='green' floated='right'>Register</Form.Button>
                            </Form.Field>

                        </Form>
                    </Container>
                    <br></br>
                    <br></br>
                    <br></br>
                </Segment>
            </div>
        )
    }

    handleForm = async () => {
        this.setState({ isLoading: true });
        const emailRegEx = new RegExp(/^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6}$/);
        const { firstName, lastName, email, password, confirmPassword, phone } = this.state;
        //TODO: is loading for button
        this.emptyFieldVerification();


        if (!emailRegEx.test(email)) {
            this.setState({
                isError: true,
                formError: "Invalid Email Address",
                isEmail: true,
                isLoading: false
            });
        }
        if (password !== confirmPassword) {
            this.setState({
                isError: true,
                formError: "Password don't match",
                isPassword: true,
                isConfirm: true,
                isLoading: false
            })
        } else {
            const auth = new Auth();

            //TODO: encrypt Password


            const isCreated = await auth.signUp({ firstName, lastName, email, password, phone });

            if (isCreated === true) {
                this.setState({ isSuccess: true, isLoading: false });
            } else {
                this.setState({ isError: true, formError: "Connection Error", isLoading: false }); //TODO: check what kind of error
            }
        }
    }

    addPhone = (event) => {
        const { phone } = this.state;
        if (this.handlePhone(event)) {
            if (this.handlePhone(event) == 'Backspace') {
                this.setState({ phone: phone.substr(0, phone.length - 1) })
            } else {
                this.setState({ phone: phone + this.handlePhone(event) })
            }
        }
    }

    handlePhone(e) {
        let allowed = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', 'Backspace'];
        if (allowed.includes(e.key)) {
            return e.key;
        } else {
            return false;
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