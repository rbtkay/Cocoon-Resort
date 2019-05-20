import React, { Component } from 'react';
import PackageClass from '../classes/package';
import { Segment, ImageGroup, Image, Grid, Button, Icon } from 'semantic-ui-react';


import Mountains from '../static/Mountains.jpg'
import Beaches from '../static/Beaches.jpg'
import Forests from '../static/Forests.jpg'
import NavigationBar from '../components/NavigationBar';
import Reservation from '../classes/reservation';

// const ListImages = (props) => {
//     if (props.images.length < 1) {
//         return (
//             <h3>No packages found... :(</h3>
//         );
//     } else {
//         return props.images.map(item => {
//             console.log('zi item', item);
//             return (
//                 <Image src={item} />
//             );
//         });
//     }
// }

class viewPackage extends Component {

    constructor(props) {
        super(props);
        const queryString = require('query-string');

        const info = queryString.parse(props.location.search)

        const id = info['id'] ? info['id'] : -1;

        this.state = {
            id: id,
            images: [Mountains, Beaches, Forests]
        }
    }

    render() {
        return (
            <div>

                <NavigationBar />
                <br />
                <br />
                <br />
                <br />
                {/* <Segment>
                    <ImageGroup size='large'>
                        <ListImages images={this.state.images} />
                    </ImageGroup>
                </Segment> */}

                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column >
                            <Segment>
                                <Grid style={{ backgroundImage: `url(${Mountains})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%' }}>
                                    <Grid.Row columns={3}>
                                        <Grid.Column width={2} verticalAlign='middle'>
                                            <Icon name='angle left' size='huge' />
                                        </Grid.Column>
                                        <Grid.Column width={12}>
                                            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                        </Grid.Column>
                                        <Grid.Column width={2} verticalAlign='middle'>
                                            <Icon name='angle right' size='huge' />
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>

                                <h2>Pacakge Name (resort name)</h2>
                                <p>
                                    vjs;kjnsfvjaner;vahvj.an;oajemgcrjv
                                    ergv
                                    esrves'tgvkjsm
                                    seg eth
                                    srth rtfnrdyndtyfndtyndfs
                            </p>
                                <h3>Dates:</h3>
                                <Grid columns={4}>
                                    <Grid.Column width={2}></Grid.Column>
                                    <Grid.Column width={6}>
                                        <b>From: </b> <p>1990-02-25</p>
                                    </Grid.Column>
                                    <Grid.Column width={6}>
                                        <b>To: </b> <p>1990-02-25</p>
                                    </Grid.Column>
                                    <Grid.Column width={2}></Grid.Column>
                                </Grid>
                                <h3>Location: </h3>
                                <h3>Price: $ </h3>


                            </Segment>
                            <Segment textAlign='center'>
                                <Button color='blue' onClick={this.reserve}>Reserve</Button>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }

    async componentDidMount() {
        const { id } = this.state;
        if (id === -1) {
            this.props.history.push('/explore');
        } else {
            const pack = new PackageClass();
            const result = await pack.readOne(id);
            console.log(result);
            //TODO: get the actual result from api
        }
    }

    reserve = () => {
        const reservation = new Reservation();

        if (reservation.create()) {
            this.setState({ isReserved: true });
        }
    }
}
export default viewPackage;