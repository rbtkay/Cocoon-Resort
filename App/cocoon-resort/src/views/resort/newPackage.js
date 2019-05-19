import React, { Component } from 'react';
import { Segment, Container, Form, Message, TextArea } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import Package from '../../classes/package';

class newPackage extends Component {

    constructor(props) {
        super(props);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date().toLocaleDateString('en-GB', options);
        const d = date.replace(/\//g, '-');

        this.state = {
            name: '',
            isSuccess: false,
            isError: false,
            details: '',
            price: 0,
            from: d,
            to: d,
            capacity: 0,
            image: '',
            now: d
        }
    }

    render() {
        return (
            <div>
                <Segment>
                    <Container>
                        <h1>Create your Package</h1>
                        <Form success={this.state.isSuccess} error={this.state.isError} onSubmit={this.handleForm}>
                            <Form.Group widths={2}>

                                <Form.Field>
                                    <Form.Input
                                        label='Package Name'
                                        placeholder='ex:  Weekend for Two'
                                        value={this.state.name}
                                        onChange={event => this.setState({ name: event.target.value, isError: false, formError: '', isName: false })}
                                        error={this.state.isName}
                                    />
                                    <br />
                                    <Form.Input
                                        label='price'
                                        value={this.state.price}
                                        onChange={event => this.setState({ price: event.target.value, isError: false, formError: '', isName: false })}
                                    />
                                    <Form.Input
                                        label='capacity'
                                        value={this.state.capacity}
                                        onChange={event => this.setState({ capacity: event.target.value, isError: false, formError: '', isName: false })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Details</label>
                                    <TextArea
                                        value={this.state.details}
                                        placeholder='Tell us more'
                                        onChange={event => this.setState({ details: event.target.value })}
                                    />

                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths={2}>

                                <Form.Field>
                                    <DateInput
                                        name='from'
                                        label='from'
                                        minDate={this.state.now}
                                        placeholder='from'
                                        value={this.state.from}
                                        iconPosition='left'
                                        onChange={this.handleChange}
                                        dateFormat='YYYY-MM-DD'
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <DateInput
                                        name='to'
                                        label='to'
                                        minDate={this.state.from}
                                        placeholder='to'
                                        value={this.state.to}
                                        iconPosition='left'
                                        onChange={this.handleChange}
                                        dateFormat='YYYY-MM-DD'
                                    />
                                </Form.Field>
                            </Form.Group>
                            <span>this will help to promote your resort to customers</span>

                            <Message success header='Form Completed' content="We've sent you a confirmation email" />
                            <Message error header='Form Error' content={this.state.formError} />
                            <Form.Field>
                                <Form.Button color='green' floated='right'>Save your Package</Form.Button>
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

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({
                [name]: value
            });
        }
    }

    handleForm = () => {
        let { name, details, price, from, to, capacity, image } = this.state;

        const fromDate = new Date(from.split('-')[2], from.split('-')[1], from.split('-')[0]);
        const toDate = new Date(to.split('-')[2], to.split('-')[1], to.split('-')[0]);

        if (name === '') {
            this.setState({
                isName: true,
                formError: 'You must specify a name for your package',
                isError: true
            })
        } else if ((fromDate > toDate)) {
            this.setState({
                isFrom: true,
                formError: 'Dates are not Valid',
                isError: true
            })
        }
        else {
            from = from === '' ? this.state.now : from;
            to = to === '' ? this.state.now : to;
            capacity = capacity === 0 ? 1 : capacity;

            const resortId = 1; //TODO: get it from localStorage.getItem("resortId");

            const pack = new Package();

            if (pack.createPackage(name, resortId, details, price, from, to, capacity, image)) {
                this.props.history.push('/resort/home')
            } else {
                console.log('Error');
            }
        }
    }
}

export default newPackage;