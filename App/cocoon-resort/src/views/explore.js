import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import Filter from '../components/Filter';

class explore extends Component {

    render() {
        return (
            <div>
                <NavigationBar />
                <br/>
                <br/>
                <br/>
                <Filter />
            </div>
        )
    }
}

export default explore;