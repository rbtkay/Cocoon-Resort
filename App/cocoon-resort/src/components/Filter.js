import React, { Component } from 'react';
import { Menu, Dropdown, Grid, Form, Button } from 'semantic-ui-react';
import { DateInput, DatesRangeInput } from 'semantic-ui-calendar-react';
import NumericInput from 'react-numeric-input';

import Resort from '../classes/resort';

class Filter extends Component {
    constructor(props) {
        super(props);

        const { location, from, to, category, guests, dates } = this.props.info;

        console.log('from in the filter')
        console.log(from)
        console.log('to in the filter')
        console.log(to)

        console.log(from + ' - ' + to)

        let date = new Date();
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        const d = [year, month, day].join('-');

        this.state = {
            locationOptions: [],
            location: {
                text: location === '*' ? 'Anywhere' : location,
                value: location
            },
            from: from,
            to: to,
            category: category || '',
            guests: guests || 1,
            now: d,
            dates: dates || ''
        }
    }

    render() {
        return (
            <Menu vertical>
                <Form onSubmit={event => this.search}>
                    <Menu.Item>
                        <Grid>
                            <Grid.Row columns='2'>
                                <Grid.Column>
                                    <h3>Filters</h3>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button onClick={this.search} color='red'>Click</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Menu.Item>
                    <Menu.Item>
                        <Dropdown item text={this.state.category || 'Category'}>
                            <Dropdown.Menu>
                                <Dropdown.Header>Category</Dropdown.Header>
                                <Dropdown.Item name='' onClick={this.setCategory} active={this.state.category === 'ALL'} >All</Dropdown.Item>
                                <Dropdown.Item name='Beaches' onClick={this.setCategory} active={this.state.category === 'Beaches'} >Beaches</Dropdown.Item>
                                <Dropdown.Item name='Mountains' onClick={this.setCategory} active={this.state.category === 'Mountains'}>Mountains</Dropdown.Item>
                                <Dropdown.Item name='Bungalows' onClick={this.setCategory} active={this.state.category === 'Bungalows'}>Bungalows</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item>
                        <DatesRangeInput
                            name="dates"
                            minDate={this.state.now}
                            placeholder="From - To"
                            value={this.state.dates}
                            iconPosition="left"
                            onChange={this.handleDateChange}
                            dateFormat='YYYY-MM-DD'
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <h5>Guests</h5>
                        <NumericInput
                            name='guests'
                            min={1}
                            value={this.state.guests}
                            onChange={this.handleGuests}
                        />
                    </Menu.Item>
                    <Menu.Item>
                        <Grid>
                            <Grid.Row columns={1} textAlign='center'>
                                <Dropdown
                                    name="location"
                                    value={this.state.location.value}
                                    fluid
                                    search
                                    selection
                                    text={this.state.location.text}
                                    options={this.state.locationOptions}
                                    placeholder='Select location'
                                    onChange={(event, data) => this.setState({ location: { text: data.value, value: data.value } })}
                                />
                            </Grid.Row>
                        </Grid>
                    </Menu.Item>
                </Form>
            </Menu>
        )
    }

    async componentDidMount() {
        const resort = new Resort();
        const locationOptions = await resort.getLocations();

        this.setState({ locationOptions });
    }

    handleGuests = (event) => {
        this.setState({ guests: event });
    }

    setCategory = (event, { name }) => {
        this.setState({ category: name })
    }

    handleDateChange = (event, { name, value }) => {

        if (this.state.hasOwnProperty(name)) {
            this.setState({
                [name]: value
            });
        }

    }

    search = (event) => {
        event.preventDefault();

        console.log("this.state")
        console.log(this.state.dates)

        const { location, dates, category, guests } = this.state;
        const { value } = location;
        const from = dates.split(' ')[0];
        const to = dates.split(' ')[2];

        const info = { location: value, from, to, category, guests };

        this.props.filter(info);
    }
}
export default Filter;