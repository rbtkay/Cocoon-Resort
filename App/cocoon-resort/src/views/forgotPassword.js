import React, { Component } from 'react';
import { Segment, Form, Input, Container, Button, Message, Grid, Step, Icon } from 'semantic-ui-react';

class ForgotPassword extends Component {
    state = {
        email: '',
        code: '',
        codeErr: '',
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
                <Segment textAlign='center' color='green' inverted>
                    <Segment color='green' inverted>
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

                    <Segment color='green' inverted textAlign='center'>
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
                                                    <Button color='violet' floated='right' loading={this.state.isNextLoading} onClick={this.nextStep} content='Next' icon='arrow right' labelPosition='right' />
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

                </Form>
            </div>
        )
    }

    renderCode = () => {
        return (
            <div>

            </div>
        )
    }

    renderResetPassword = () => {
        return (
            <div>

            </div>
        );
    }
}

export default ForgotPassword;