import React, { Component } from 'react';
import { Segment, Card, Container } from 'semantic-ui-react';
import NavigationBar from '../components/NavigationBar';

import PackageClass from '../classes/package';
import ListPackages from '../components/ListPackages';

class ViewResort extends Component {

    constructor(props) {
        super(props);

        const queryString = require('query-string');
        const info = queryString.parse(this.props.location.search);

        this.state = {
            id: info['id'] ? info['id'] : -1,
            name: info['resortName'] ? info['resortName'] : "not Found",
            packages: []
        }

    }

    render() {
        return (
            <div>
                <NavigationBar />
                <br />
                <br />
                <br />
                <h1>{this.state.name}</h1>
                <Segment style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%', height: '100vh' }}>
                    <Container>
                        <Card.Group itemsPerRow='4'>
                            <ListPackages packages={this.state.packages} isResort={false} viewPack={this.viewPack} />
                        </Card.Group>
                    </Container>
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

    viewPack = (id) => {
        this.props.history.push(`/viewPackage?id=${id}`)
    }
}

export default ViewResort;