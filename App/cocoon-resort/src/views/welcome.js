import React, { Component } from 'react';
import { Segment, Image, Grid, Form, Card, Button, Message, Dropdown } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';

import Navigation from '../components/NavigationBar'

import image from '../static/image1.jpg';
import image1 from '../static/image2.jpg';

import Resort from '../classes/resort';

class Welcome extends Component {

    constructor() {
        super();
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date().toLocaleDateString('en-GB', options);
        const d = date.replace(/\//g, '-');

        this.state = {
            locationOptions: [{ text: 'no location available yet', value: null }],
            location: { text: 'Anywhere', value: '*' },
            isErrorSearch: false,
            forError: '',
            from: '',
            to: '',
            guests: 1,
            now: d
        }
    }
    render() {
        return (
            <div>
                <Navigation newResort={this.newResort} />
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
                                        <Dropdown
                                            name="location"
                                            value={this.state.location.value}
                                            fluid
                                            search
                                            selection
                                            text={this.state.location.text}
                                            options={this.state.locationOptions}
                                            placeholder='Select location'
                                            onChange={(event, data) => this.setState(
                                                (
                                                    {
                                                        location:
                                                            { text: data.value, value: data.value }
                                                    }
                                                ))}
                                        />
                                        <Form.Group widths={2}>
                                            <DateInput
                                                name='from'
                                                label='from'
                                                placeholder='from'
                                                minDate={this.state.now}
                                                value={this.state.from}
                                                iconPosition='left'
                                                onChange={this.handleChange}
                                                dateFormat='YYYY-MM-DD'
                                            />
                                            <DateInput
                                                name='to'
                                                label='to'
                                                placeholder='to'
                                                minDate={this.state.from}
                                                value={this.state.to}
                                                iconPosition='left'
                                                onChange={this.handleChange}
                                                dateFormat='YYYY-MM-DD'
                                            />
                                        </Form.Group>
                                        <Form.Input
                                            type='number'
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
                                    <Card onClick={() => this.props.history.push('/explore?category=Beaches')}>
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
                                    <Card onClick={() => this.props.history.push('/explore?category=Mountains')}>
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
                                    <Card onClick={() => this.props.history.push('/explore?category=Bungalow')}>
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
        const resort = new Resort();
        const locations = await resort.getLocations();

        this.setState({ locationOptions: locations });
    }

    newResort = () => {
        this.props.history.push('/resort/newResort')
    }

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({
                [name]: value
            });
        }
    }

    search = () => {
        let { location, isErrorSearch, from, to, guests, formError } = this.state;
        // console.log(this.state)


        const fromDate = new Date(from.split('-')[2], from.split('-')[1], from.split('-')[0]);
        const toDate = new Date(to.split('-')[2], to.split('-')[1], to.split('-')[0]);

        if (guests < 1) {
            isErrorSearch = true;
            formError = 'number of guest should be more than 0'
            this.setState({ isErrorSearch, formError });
        } else if (fromDate > toDate) {
            isErrorSearch = true;
            formError = 'dates are invalid'
            this.setState({ isErrorSearch, formError });
        } else {
            this.props.history.push(`/explore?location=${location.value}&from=${from}&to=${to}&guests=${guests}`);
        }
    }
}

export default Welcome;