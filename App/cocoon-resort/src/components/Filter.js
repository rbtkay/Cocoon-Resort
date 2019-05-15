import React, { Component } from 'react';
import { Menu, Dropdown, Select, Grid } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import Resort from '../classes/resort';

class Filter extends Component {

    state = {
        locationOptions: [],
        location: '',
        from: '',
        to: '',
        category: ''
    }

    render() {
        return (
            <Menu fixed vertical>
                <Menu.Item>
                    <h3>Filters</h3>
                </Menu.Item>
                <Menu.Item>
                    <Dropdown item text='Category'>
                        <Dropdown.Menu>
                            <Dropdown.Header>Category</Dropdown.Header>
                            <Dropdown.Item>Beaches</Dropdown.Item>
                            <Dropdown.Item>Mountains</Dropdown.Item>
                            <Dropdown.Item>Bungalows</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item>
                    <DateInput
                        style={{ width: '170px' }}
                        popupPosition='right center'
                        name='from'
                        placeholder='from'
                        iconPosition='left'
                        value={this.state.from}
                    />
                </Menu.Item>
                <Menu.Item>
                    <DateInput
                        style={{ width: '170px' }}
                        popupPosition='right center'
                        name='to'
                        placeholder='to'
                        iconPosition='left'
                        value={this.state.to}
                    />
                </Menu.Item>
                <Menu.Item>
                    <Grid>
                        <Grid.Row columns={1} textAlign='center'>
                            <Select
                                placeholder='Anywher'
                                options={this.state.locationOptions}
                                value={this.state.location}
                            />
                        </Grid.Row>
                    </Grid>
                </Menu.Item>
            </Menu>
        )
    }

    async componentDidMount() {
        /**
         * TODO:
         * get locationOptions from fetch
         * get queryString
         * 
         */
        const resort = new Resort();
        const locationOptions = await resort.getLocations();
        this.setState({ locationOptions });
    }
}
export default Filter;