import React, { Component } from 'react';

class ViewResort extends Component {

    constructor(props) {
        super(props);

        const queryString = require('query-string');
        const info = queryString.parse(this.props.location.search);

        console.log("info['resort']");
        console.log(info['resort']);

    }

    render() {
        return (
            <h1>Resort Name</h1>
        )
    }
}

export default ViewResort;