import React, { Component } from 'react';
import { Segment, Image, Container, Grid, Form, Item, Card, Button, Message } from 'semantic-ui-react';
import image from '../static/image1.jpg';
import image1 from '../static/image2.jpg';




class Welcome extends Component {

    state = {
        locationOption: [], //TODO: fill from api
        isErrorSearch: false
    }


    render() {
        // const Background =
        return (
            <div>

                <Segment style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%' }}>

                    <Grid>
                        <Grid.Row columns={4}>
                            <Grid.Column width='2'>

                            </Grid.Column>
                            <Grid.Column width='4'>
                                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                <Segment raised>
                                    <h1>Book your Resort</h1>
                                    <Form error={this.state.isErrorSearch} onSubmit={this.search}>
                                        <Form.Select label='Location' options={this.state.locationOptions} placeholder='Anywhere in Lebanon' />
                                        <Form.Group widths={2}>
                                            <Form.Input
                                                label='from'
                                                placeholder='from'
                                            />
                                            <Form.Input label='to' placeholder='to' />
                                        </Form.Group>
                                        <Form.Input label='# Guests' placeholder='ex: 4' />
                                        <Form.Button floated='right' color='red'>Search</Form.Button>
                                        <Message error header='Form Error' content={this.state.formError} />
                                    </Form>
                                    <br />
                                    <br />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column width='6'>
                            </Grid.Column>
                            <Grid.Column width='4'>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br /> <br /> <br /> <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </Segment>

                <Segment>
                    <Grid columns={3}>

                        <Grid.Column width='1'>

                        </Grid.Column>

                        <Grid.Column width='14'>

                            <h1>Explore the Cocoon's Resorts</h1>
                            <Grid columns={3} textAlign='center'>

                                <Grid.Column>
                                    <Card>
                                        <Grid columns={2}>
                                            <Grid.Column width='7'>
                                                <Image floated='left' size='small' src={image1} />
                                            </Grid.Column>
                                            <Grid.Column width='8' verticalAlign='middle' textAlign='center'>
                                                <h1>Beaches</h1>
                                            </Grid.Column>
                                        </Grid>
                                    </Card>
                                </Grid.Column>
                                <Grid.Column>
                                    <Card>
                                        <Grid columns={2}>
                                            <Grid.Column width='7'>
                                                <Image floated='left' size='small' src={image1} />
                                            </Grid.Column>
                                            <Grid.Column width='8' verticalAlign='middle' textAlign='center'>
                                                <h1>Mountains</h1>
                                            </Grid.Column>
                                        </Grid>
                                    </Card>

                                </Grid.Column>
                                <Grid.Column>
                                    <Card>
                                        <Grid columns={2}>
                                            <Grid.Column width='7'>
                                                <Image floated='left' size='small' src={image1} />
                                            </Grid.Column>
                                            <Grid.Column width='8' verticalAlign='middle' textAlign='center'>
                                                <h1>Bungalow</h1>
                                            </Grid.Column>
                                        </Grid>
                                    </Card>
                                </Grid.Column>
                            </Grid>
                            <br /> <br /> <br />
                            <h1>Introducing Cocoon Resorts</h1>
                            <span>a selection of the best resort in Lebanon</span>
                            <Segment textAlign='center' style={{ backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: '100%' }}><br /><br /><br /><br /><br />
                                <Button color='red'>Search</Button>
                                <br /><br /><br /><br /><br />
                            </Segment>
                            <br />
                            <h1>Most Popular Resorts</h1>

                        </Grid.Column>
                        <Grid.Column width='1'>

                        </Grid.Column>

                    </Grid>
                </Segment>

                <Segment>

                </Segment>
            </div>
        )
    }

    search = () => {
        //TODO: validate the form and send get request.
    }
}

export default Welcome;