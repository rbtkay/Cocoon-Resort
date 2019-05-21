import React, { Component } from 'react';
import { Segment, Form, Input, Container, Button, Message, Grid, Step, Icon } from 'semantic-ui-react';
import NavigationBar from '../components/NavigationBar';

class ForgotPassword extends Component {
    state = {
        email: '',
        code: '',
        codeErr: '',
        requiredCode: '',
        password: '',
        confirmPassword: '',
        step: 1,
        isStepOne: true,
        isStepTwo: false,
        isStepThree: false,
        isBackLoading: false,
        isNextLoading: false,
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <br /><br /><br />
                <Segment textAlign='center' >
                    <Segment color='green' inverted >
                        <Step.Group unstackable size='large'>
                            <Step active={this.state.isStepOne}>
                                <Icon name='mail' />
                                <Step.Content>
                                    <Step.Title>Verify Email</Step.Title>
                                    <Step.Description>Enter your email</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step active={this.state.isStepTwo}>
                                <Icon name='code' />
                                <Step.Content>
                                    <Step.Title>Confirm Code</Step.Title>
                                    <Step.Description>Enter the code sent via email</Step.Description>
                                </Step.Content>
                            </Step>

                            <Step active={this.state.isStepThree}>
                                <Icon name='repeat' />
                                <Step.Content>
                                    <Step.Title>Reset Password</Step.Title>
                                    <Step.Description>Create new password</Step.Description>
                                </Step.Content>
                            </Step>
                        </Step.Group>
                    </Segment>

                    <Segment inverted textAlign='center' style={{height: '100vh'}}>
                        <Container textAlign='center'>
                            <br /><br />
                            <Grid>
                                <Container>
                                    <Grid>
                                        <Grid.Column width='4'></Grid.Column>
                                        <Grid.Column width='8' textAlign='center'>
                                            {this.renderStep()}
                                            <br />
                                            <Grid columns={3}>
                                                <Grid.Column width='2'></Grid.Column>
                                                <Grid.Column width='12'>
                                                    <Button basic inverted floated='left' loading={this.state.isBackLoading} onClick={this.back} content='Back' icon='arrow left' />
                                                    <Button color='green' floated='right' loading={this.state.isNextLoading} onClick={this.nextStep} content='Next' icon='arrow right' labelPosition='right' />
                                                </Grid.Column>
                                            </Grid>
                                        </Grid.Column>
                                    </Grid>
                                </Container>
                            </Grid>
                        </Container>
                    </Segment>
                </Segment>
            </div>
        )
    }

    nextStep = async (event) => {
        event.preventDefault();

        await this.setState({ isNextLoading: true });
        switch (this.state.step) {
            case 1:
                this.verifyEmail();
                break;
            case 2:
                this.verifyCode();
                break;
            case 3:
                this.verifyPasswords();
                break;

            default:
                break;
        }
    }

    back = async (event) => {
        event.preventDefault()
        await this.setState({ isBackLoading: true });
        switch (this.state.step) {
            case 2:
                await this.setState({ step: 1, isStepOne: true, isStepTwo: false, isStepThree: false });
                break;
            case 3:
                await this.setState({ step: 2, isStepOne: false, isStepTwo: true, isStepThree: false })
                break;

            default:
                break;
        }
        await this.setState({ isBackLoading: false });
    }

    async verifyEmail() {
        const { email } = this.state;
        if (email === '') {
            await this.setState({ emailErr: 'You need to Provide your Email', isNextLoading: false });
        } else {
            try {
                const response = await fetch(`http://localhost:8080/cocoon-resort/AuthServlet?action=forgot&email=${email}`);
                if (response.status === 404) {
                    await this.setState({ emailErr: 'Invalid Email!', isNextLoading: false });
                } else {
                    const requiredCode = await response.json();
                    await this.setState({ step: 2, isStepOne: false, isStepTwo: true, isStepThree: false, requiredCode: requiredCode, isNextLoading: false });
                }
            } catch (e) {
                await this.setState({ emailErr: 'Something Went Wrong...' });
            }
            return true;
        }
    }

    renderStep = () => {
        if (this.state.step === 1) {
            return (<div>{this.renderEmail()}</div>);
        } else if (this.state.step === 2) {
            return (<div>{this.renderCode()}</div>);
        } else if (this.state.step === 3) {
            return (<div>{this.renderResetPassword()}</div>);
        }
    }

    renderEmail = () => {
        return (
            <div>
                <Form error={!!this.state.emailErr}>
                    <h1>Email Verification</h1>
                    <br />
                    <Form.Input
                        placeholder='Provide Email Address'
                        onChange={event => this.setState({ email: event.target.value })} />

                    <Message error header='Oops!' content={this.state.emailErr} />
                </Form>
            </div>
        );
    }

    renderCode = () => {
        return (
            <div>
                <Form error={!!this.state.codeErr}>
                    <h1>Confirm Code</h1>
                    <Form.Input
                        placeholder='Prove the code sent to you via email'
                        onChange={event => this.setState({ code: event.target.value })} />

                    <Message error header='Oops!' content={this.state.codeErr} />
                </Form>
            </div>
        );
    }

    verifyCode = async () => {
        const { code, requiredCode } = this.state;

        if (code === '') {
            this.setState({ codeErr: 'You need to Provide a Valid Code', isNextLoading: false });
        } else {
            if (code == requiredCode) {
                await this.setState({ step: 3, isStepOne: false, isStepTwo: false, isStepThree: true, isNextLoading: false });
            } else {
                await this.setState({ codeErr: 'Invalid Code', isNextLoading: false });
            }
        }
    }

    renderResetPassword = () => {
        return (
            <div>
                <h1>Reset Password</h1>
                <Form error={!!this.state.matchingErr}>
                    <Form.Input
                        type='password'
                        placeholder='Enter new password'
                        onChange={event => this.setState({ password: event.target.value })} />

                    <Form.Input
                        type='password'
                        placeholder='Confirm Password'
                        onChange={event => this.setState({ confirmPassword: event.target.value })} />

                    <Message error header='Oops!' content={this.state.machingErr} />
                </Form>
            </div>
        );
    }

    verifyPasswords = async () => {
        const { password, confirmPassword, email } = this.state;

        if (password === '' || confirmPassword === '') {
            await this.setState({ matchingErr: "Some Field are Empty", isNextLoading: false });
        } else if (password !== confirmPassword) {
            await this.setState({ matchingErr: "Password Don't Match", isNextLoading: false });
        } else {
            // const securePass = sha256(password);
            try {
                const response = await fetch(`http://localhost:8080/cocoon-resort/AuthServlet?action=resetPassword&email=${email}&password=${password}`);

                if (response.status === 200) {
                    this.props.history.push(`/welcome`);
                }
            } catch (e) {
                throw e;
            }
        }
    }
}

export default ForgotPassword;