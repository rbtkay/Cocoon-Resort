import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import Filter from '../components/Filter';

class Explore extends Component {

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

    filterPackages() {
        console.log("in the parents");

    }
}

export default Explore;