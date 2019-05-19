import React, { Component } from 'react';
import { Segment, Card } from 'semantic-ui-react';

import PackageClass from '../classes/package';
import ListPackages from '../components/ListPackages';




class ViewResort extends Component {

    constructor(props) {
        super(props);

        const queryString = require('query-string');
        const info = queryString.parse(this.props.location.search);

        this.state = {
            id: info['id'] ? info['id'] : -1,
            packages: []
        }

    }

    render() {
        return (
            <div>
                <h1>Resort Name</h1>
                <Segment>
                    <Card.Group itemsPerRow='4'>
                        <ListPackages packages={this.state.packages} isResort={false} />
                    </Card.Group>
                </Segment>
            </div>
        )
    }

    async componentDidMount() {

        if (this.state.id == -1) {
            this.props.history.push(`/resort`);
        }
        const pack = new PackageClass();

        const result = await pack.filterByResort(this.state.id);

        if (result !== 404) {
            this.setState({ packages: result });
        }

    }
}

export default ViewResort;