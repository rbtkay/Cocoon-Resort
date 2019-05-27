import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import { Grid, Segment, Card } from 'semantic-ui-react';
import Filter from '../components/Filter';
import PackageClass from '../classes/package';
import ListPackages from '../components/ListPackages';

class Explore extends Component {
    constructor(props) {
        super(props);

        // const queryString = require('query-string');

        // const info = queryString.parse(this.props.location.search)


        // info['category'] = info['category'] ? info['category'] : '';
        // info['from'] = info['from'] || '';
        // info['to'] = info['to'] || '';

        const info = {
            location: localStorage.getItem("location") || '',
            from: localStorage.getItem("from") || '',
            to: localStorage.getItem("to") || '',
            guests: localStorage.getItem("guests") || 1,
            dates: localStorage.getItem("dates") || '',
            category: ''
        }


        localStorage.removeItem("location");
        localStorage.removeItem("from");
        localStorage.removeItem("to");
        localStorage.removeItem("guests");

        this.state = {
            info: info,
            allPackages: [],
            filteredPackages: [],
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
                                <ListPackages packages={this.state.filteredPackages} viewPack={this.viewPack} isResort={false} />
                            </Card.Group>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }

    async componentDidMount() {
        window.scroll(0, 0);
        const pack = new PackageClass();

        // const { info } = this.state;

        //TODO: check if the it is the first load, if it is search based on localStorage else get Data from searchComp
        let result;
        // result = await pack.filterByDate(this.state.info.from, this.state.info.to);
        // this.setState(({ allPackages: result, filteredPackages: result })
        this.setFilteredPackages(this.state.info)
    }

    setFilteredPackages = async (filter) => { //is called from the filter component
        const { location, from, to, category, guests } = filter;

        const pack = new PackageClass();
        const allPackages = await pack.filterByDate(from, to);

        let filteredPackages = allPackages;
        if (category !== '') {
            filteredPackages = filteredPackages.filter((item) => {
                return item['category'] === category;
            })
        }
        if (location !== '') {
            filteredPackages = filteredPackages.filter((item) => {
                return item['location'] === location;
            })
        }
        if (guests > 1) {
            filteredPackages = filteredPackages.filter((item) => {
                return item['capacity'] >= guests;
            })
        }
        this.setState({ filteredPackages, allPackages, filter });
    }

    // setFilteredPackages = (info) => {
    //     const { location, from, to, category, guests } = info;

    //     console.log('info in setFilteredPackages', info);
    //     let filteredPackages = this.filterPackages(info);
    //     this.setState({ filter: info });
    // }

    viewPack = (id) => {
        this.props.history.push(`/viewPackage?id=${id}`);
    }
}

export default Explore;