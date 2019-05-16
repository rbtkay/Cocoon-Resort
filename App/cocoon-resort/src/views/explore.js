import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import Filter from '../components/Filter';

import Package from '../classes/package';

class Explore extends Component {

    state = {

    }

    render() {
        const queryString = require('query-string');
        const info = queryString.parse(this.props.location.search)
        console.log(info)
        return (
            <div>
                <NavigationBar />
                <br />
                <br />
                <br />
                <Filter info={info} filter={this.filterPackages} />
            </div>
        )
    }

    async filterPackages(info) {
        console.log("in the parents");
        const pack = new Package();

        const result = await pack.getFilteredPackages(info);

        // console.log(result);
    }
}

export default Explore;