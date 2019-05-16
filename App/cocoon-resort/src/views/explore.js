import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import Filter from '../components/Filter';

import Package from '../classes/package';

class Explore extends Component {

    constructor(props) {
        super(props);

        const queryString = require('query-string');

        const info = queryString.parse(this.props.location.search)

        // console.log(info);

        info['category'] = info['category'] ? info['category'] : '';

        this.state = {
            info: info
        }
    }


    render() {
        // console.log(this.state.info)
        return (
            <div>
                <NavigationBar />
                <br />
                <br />
                <br />
                <Filter info={this.state.info} filter={this.filterPackages} />
            </div>
        )
    }

    async componentDidMount() {
        const pack = new Package();

        const { category } = this.state.info.category;
        const result = await pack.readAll(category);

        // console.log(this.state);

        // this.filterPackages({});
    }

    filterPackages = (info) => { //is called from the filter component
        // console.log("in the parents");
        const { location, from, to, category, guests } = info;

        // console.log("in explore");
        // console.log(this.state);

        this.setState(({ location, from, to, category, guests }), () => console.log(this.state));
    }
}

export default Explore;