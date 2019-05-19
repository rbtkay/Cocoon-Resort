import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import { Grid, Segment, Card } from 'semantic-ui-react';
import Filter from '../components/Filter';
import PackageClass from '../classes/package';
import ListPackages from '../components/ListPackages';

class Explore extends Component {
    constructor(props) {
        super(props);

        const queryString = require('query-string');

        const info = queryString.parse(this.props.location.search)

        info['category'] = info['category'] ? info['category'] : '';
        info['from'] = info['from'] || '';
        info['to'] = info['to'] || '';


        this.state = {
            info: info,
            allPackages: [],
            filteredPackages: [],
            filter: {

            },
        };
    }


    render() {
        return (
            <div>
                <NavigationBar />
                <br /><br /><br /><br />
                <Grid>
                    <Grid.Column width={3}>
                        <Filter info={this.state.info} filter={this.setFilteredPackages} />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Segment>
                            <Card.Group itemsPerRow='4'>
                                <ListPackages packages={this.state.filteredPackages} isResort={false} />
                            </Card.Group>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }

    async componentDidMount() {
        const pack = new PackageClass();
        const { filter } = this.state.filter;
        let result;
        result = await pack.filterByDate(this.state.info.from, this.state.info.to);
        this.setState({ allPackages: result, filteredPackages: result })
    }

    filterPackages = async (filter) => {
        const { location, from, to, category, guests } = filter;
        let allPackages = [];
        if (from || to) {
            const pack = new PackageClass();
            const result = await pack.filterByDate(from, to);
            allPackages = result;
        } else {
            allPackages = this.state.allPackages;

        }
        let filteredPackages = allPackages;
        if (category !== "") {
            filteredPackages = filteredPackages.filter((item) => {
                return item['category'] === category;
            })
        }
        if (location !== undefined) {
            filteredPackages = filteredPackages.filter((item) => {
                return item['location'] === location;
            })
        }
        if (guests > 1) {
            filteredPackages = filteredPackages.filter((item) => {
                return item['capacity'] >= guests;
            })
        }
        this.setState({ filteredPackages, allPackages });
    }

    setFilteredPackages = (info) => { //is called from the filter component
        const { location, from, to, category, guests } = info;

        console.log('info in setFilteredPackages', info);
        let filteredPackages = this.filterPackages(info);
        this.setState({ filter: info });
    }
}

export default Explore;