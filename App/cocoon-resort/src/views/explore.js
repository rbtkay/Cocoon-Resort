import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import { Grid, Segment, Card } from 'semantic-ui-react';
import Filter from '../components/Filter';
import PackageClass from '../classes/package';
import PackageComponent from '../components/Package';

const ListPackages = (props) => {
    if (props.packages.length < 1) {
        return (
            <h3>No packages found... :(</h3>
        );
    } else {
        return props.packages.map(item => {
            console.log('zi item', item);
            return (
                <PackageComponent key={item.id} info={item} isResort={false} />
            );
        });
    }
}


class Explore extends Component {

    constructor(props) {
        super(props);

        const queryString = require('query-string');

        const info = queryString.parse(this.props.location.search)

        console.log(info);

        info['category'] = info['category'] ? info['category'] : '';

        this.state = {
            info: info,
            packages: []
        }
    }


    render() {
        // console.log(this.state.info)
        return (
            <div>
                <NavigationBar />
                <br /><br /><br /><br />
                <Grid>
                    <Grid.Column width={3}>
                        <Filter info={this.state.info} filter={this.filterPackages} />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Segment>
                            <Card.Group itemsPerRow='4'>
                                <ListPackages packages={this.state.packages} />
                            </Card.Group>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }

    async componentDidMount() {
        const pack = new PackageClass();

        const { category } = this.state.info.category;
        const result = await pack.readAll(category);

        this.setState({ packages: result })
        // this.filterPackages({});
    }

    filterPackages = (info) => { //is called from the filter component
        // console.log("in the parents");
        const { location, from, to, category, guests } = info;

        console.log("in explore", this.state);

        this.setState({ location, from, to, category, guests });
    }
}

export default Explore;