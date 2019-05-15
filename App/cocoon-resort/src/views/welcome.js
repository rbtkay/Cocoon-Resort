import React, { Component } from 'react';
import { Segment, Image, Container, Grid, Form, Item, Card, Button, Message } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';

import Navigation from '../components/NavigationBar'

import image from '../static/image1.jpg';
import image1 from '../static/image2.jpg';

import Package from '../classes/package';

class Welcome extends Component {

    state = {
        locationOptions: [{ text: 'no location available yet', value: null }],
        location: '*',
        isErrorSearch: false,
        forError: '',
        from: '',
        to: '',
        guests: 1,
    }

    render() {
        return (
            <div>
                <Navigation></Navigation>
                <Segment style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%' }}>

                    <Grid>
                        <Grid.Row columns={4}>
                            <Grid.Column width='2'>

                            </Grid.Column>
                            <Grid.Column width='4'>
                                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                <Segment raised>
                                    <h1>Book your Resort</h1>
                                    <Form error={this.state.isErrorSearch} onSubmit={this.search}>
                                        <Form.Select
                                            label='Location'
                                            options={this.state.locationOptions}
                                            placeholder='Anywhere in Lebanon'
                                            onClick={event => this.setState({ location: event.target.value })}
                                            value={this.state.location} />
                                        <Form.Group widths={2}>
                                            <DateInput
                                                name='from'
                                                label='from'
                                                placeholder='from'
                                                value={this.state.from}
                                                iconPosition='left'
                                                onChange={this.handleChange}
                                            />
                                            <DateInput
                                                name='to'
                                                label='to'
                                                placeholder='to'
                                                value={this.state.to}
                                                iconPosition='left'
                                                onChange={this.handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Input
                                            label='# Guests'
                                            placeholder='ex: 4'
                                            onChange={event => this.setState({ guests: event.target.value })}
                                        />
                                        <Message error header='Form Error' content={this.state.formError} />
                                        <Form.Button floated='right' color='red'>Search</Form.Button>
                                    </Form>
                                    <br />
                                    <br />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width='6'>
                            </Grid.Column>
                            <Grid.Column width='4'>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br /><br /><br /><br /><br /><br /> <br /> <br /> <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </Segment>

                <Segment>
                    <Grid columns={3}>

                        <Grid.Column width='1'>

                        </Grid.Column>

                        <Grid.Column width='14'>

                            <h1>Explore the Cocoon's Resorts</h1>
                            <Grid columns={3} textAlign='center'>

                                <Grid.Column>
                                    <Card onClick={() => this.props.history.push('/signUp?category=Beaches')}>
                                        <Grid columns={2}>
                                            <Grid.Column width='7'>
                                                <Image floated='left' size='small' src={image1} />
                                            </Grid.Column>
                                            <Grid.Column width='8' verticalAlign='middle' textAlign='center'>
                                                <h1>Beaches</h1>
                                            </Grid.Column>
                                        </Grid>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column>
                                    <Card onClick={() => this.props.history.push('/signUp?category=Mountains')}>
                                        <Grid columns={2}>
                                            <Grid.Column width='7'>
                                                <Image floated='left' size='small' src={image1} />
                                            </Grid.Column>
                                            <Grid.Column width='8' verticalAlign='middle' textAlign='center'>
                                                <h1>Mountains</h1>
                                            </Grid.Column>
                                        </Grid>
                                    </Card>

                                </Grid.Column>
                                <Grid.Column>
                                    <Card onClick={() => this.props.history.push('/signUp?category=Bungalow')}>
                                        <Grid columns={2}>
                                            <Grid.Column width='7'>
                                                <Image floated='left' size='small' src={image1} />
                                            </Grid.Column>
                                            <Grid.Column width='8' verticalAlign='middle' textAlign='center'>
                                                <h1>Bungalow</h1>
                                            </Grid.Column>
                                        </Grid>
                                    </Card>
                                </Grid.Column>
                            </Grid>
                            <br /> <br /> <br />
                            <h1>Introducing Cocoon Resorts</h1>
                            <span>a selection of the best resort in Lebanon</span>
                            <Segment textAlign='center' style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%' }}><br /><br /><br /><br /><br />
                                <Button color='red'>Search</Button>
                                <br /><br /><br /><br /><br />
                            </Segment>
                            <br />
                            <h1>Most Popular Resorts</h1>

                        </Grid.Column>
                        <Grid.Column width='1'>

                        </Grid.Column>

                    </Grid>
                </Segment>

                <Segment>

                </Segment>
            </div>
        )
    }

    async componentDidMount() {
        this.getLocations();
    }

    async getLocations() {
        //get the locations to fill the drop down.
        const pack = new Package();
        const locations = await pack.getLocations();

        this.setState({ locationOptions: locations });
    }

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    search = () => {
        let { location, isErrorSearch, from, to, guests, formError } = this.state;

        if (guests < 1) {
            isErrorSearch = true;
            formError = 'number of guest should be more than 0'
            this.setState({ isErrorSearch, formError });
        } else if (from > to) {
            isErrorSearch = true;
            formError = 'dates are invalid'
            console.log(formError)
            this.setState({ isErrorSearch, formError });
        } else {
            // const QueryString = require('query-string');

            // const obj = {
            //     location: location,
            //     from: from,
            //     to: to,
            //     guest: guests
            // }

            // const queryS = QueryString.stringify(obj);
            // this.props.history.push(`/signUp?${queryS}`); 
            //TODO: redirect to Proper page
        }
    }
}

export default Welcome;