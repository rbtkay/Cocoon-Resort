import React, { Component } from 'react';
import { Segment, Image, Grid, Form, Card, Button, Message, Dropdown } from 'semantic-ui-react';
import { DateInput, DatesRangeInput } from 'semantic-ui-calendar-react';

import Navigation from '../components/NavigationBar'

import image from '../static/image1.jpg';
import image1 from '../static/image2.jpg';

import Resort from '../classes/resort';

class Welcome extends Component {

    constructor() {
        super();
        // const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        // let date = new Date().toLocaleDateString('en-GB', options);
        // let date = new Date().toLocaleDateString('en-GB');
        let date = new Date();
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        const d = [year, month, day].join('-');
        // const d = date.replace(/\//g, '-');
        // console.log('d', d);

        this.state = {
            locationOptions: [{ text: 'no location available yet', value: null }],
            location: { text: 'Anywhere', value: '' },
            isErrorSearch: false,
            forError: '',
            // from: '',
            // to: '',
            dates: '',
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
                                        <Form.Field>
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
                                        </Form.Field>
                                        <Form.Field>
                                            <DatesRangeInput
                                                name="dates"
                                                minDate={this.state.now}
                                                placeholder="From - To"
                                                value={this.state.dates}
                                                iconPosition="left"
                                                onChange={this.handleChange}
                                                dateFormat='YYYY-MM-DD'
                                            />
                                        </Form.Field>
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
                                    <Card onClick={() => this.props.history.push('/resort?category=Beaches')}>
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
                                    <Card onClick={() => this.props.history.push('/resort?category=Mountains')}>
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
                                    <Card onClick={() => this.props.history.push('/resort?category=Bungalow')}>
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
                                <Button color='red' onClick={() => this.props.history.push('/resort')}>Search</Button>
                                <br /><br /><br /><br /><br />
                            </Segment>
                            <br />
                            {/* <h1>Most Popular Resorts</h1> */}

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

    handleChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({
                [name]: value
            });
        }
    }

    search = () => {
        let { location, isErrorSearch, dates, guests, formError } = this.state;

        const from = dates.split(' ')[0];
        const to = dates.split(' ')[2];

        const fromDate = new Date(from);
        const toDate = new Date(to);

        if (guests < 1) {
            isErrorSearch = true;
            formError = 'number of guest should be more than 0'
            this.setState({ isErrorSearch, formError });
        } else if (fromDate > toDate) {
            isErrorSearch = true;
            formError = 'dates are invalid'
            this.setState({ isErrorSearch, formError });
        } else {
            localStorage.setItem("location", location.value);
            localStorage.setItem("from", from);
            localStorage.setItem("to", to);
            localStorage.setItem("guests", guests);
            localStorage.setItem("dates", dates);
            this.props.history.push(`/explore`);
        }
    }
}

export default Welcome;