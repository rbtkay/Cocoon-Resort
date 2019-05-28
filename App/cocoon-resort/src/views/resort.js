import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import { Segment, Card, Container, Image } from 'semantic-ui-react';

import ResortComp from '../components/ResortComp';

import ResortClass from '../classes/resort';

import Mountains from '../static/Mountains.jpg';
import Beaches from '../static/Beaches.jpg';
import Bungalows from '../static/Forests.jpg';

const ListResorts = (props) => {
    if (props.resorts.length < 1) {
        return (
            <Card>
                <h3>No Resort Yet</h3>
            </Card>
        )
    } else {
        return props.resorts.map(item => {
            console.log(item);
            return (
                <ResortComp key={item.id} info={item} redirect={props.redirect} />
            )
        })
    }
}

class Resort extends Component {

    constructor(props) {
        super(props);

        const queryString = require('query-string');
        const info = queryString.parse(this.props.location.search)

        this.state = {
            searchResort: info['resort'] ? info['resort'] : '',
            category: info['category'] ? info['category'] : 'World',
            resorts: []
        }
    }

    render() {
        const images = { Mountains: Mountains, Beaches: Beaches, Bungalow: Bungalows };
        const { category } = this.state;
        const image = category !== "World" ? images[category] : Mountains;
        return (
            <div>
                <NavigationBar /><br /><br /><br />
                <h1>Explore the {this.state.category}</h1>
                <Segment style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%' }}>
                    <Container>
                        <Card.Group itemsPerRow={4}>
                            <ListResorts resorts={this.state.resorts} redirect={this.redirect} />
                        </Card.Group>
                    </Container>
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </Segment>
            </div>
        )
    }

    async componentDidMount() {
        window.scroll(0, 0);
        const resort = new ResortClass();

        const { category, searchResort } = this.state;

        const categorySend = category === "World" ? '' : category;
        const result = await resort.readAll(categorySend);

        console.log(searchResort);
        const test = "vsvcookieesvf";

        // if (test.includes(searchResort)) {
        //     console.log("YES");
        // } else {
        //     console.log('NO');
        // }

        if (searchResort !== '') {
            const filterResult = result.filter(resort => {
                console.log(resort['name'])
                var temp = resort['name'].toLowerCase();
                if (temp.includes(searchResort)) {
                    return resort['name'];
                }
            }).filter(value => {
                if (value !== undefined) {
                    return value;
                }
            });

            console.log('filterResult');
            console.log(filterResult);
            this.setState({ resorts: filterResult })
        } else {
            this.setState({ resorts: result })
        }
    }

    redirect = (id, resortName) => {
        this.props.history.push(`/viewResort?id=${id}&resortName=${resortName}`);
    }
}

export default Resort;