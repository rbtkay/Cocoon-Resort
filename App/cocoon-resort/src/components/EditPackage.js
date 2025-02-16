import React, { Component } from 'react';
import { Modal, Form, Icon, TextArea, Input, Image, Grid, Button, Segment } from 'semantic-ui-react';
import { DateInput, DatesRangeInput } from 'semantic-ui-calendar-react';
import PackageClass from '../classes/package';


class EditPackage extends Component {
    constructor(props) {
        super(props);

        let { id, name, details, price, from, to, capacity, isOpen } = this.props.info;

        const dates = from + ' - ' + to;

        console.log(dates)

        this.state = {
            id: id || '',
            name: name || '',
            details: details || '',
            price: price || '',
            from: from || '',
            to: to || '',
            dates: dates,
            capacity: capacity || '',
            images: [],
            imageNames: [],
            imageIndex: 0
        };
    }


    render() {
        const { name, details, price, from, to, capacity } = this.props.info
        const dates = from + ' - ' + to
        console.log(dates)
        return (
            <Modal open={this.props.isOpen} onClose={this.props.handleClose} size='fullscreen'>
                <Modal.Header><Icon name='edit' /> Edit {name}</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group widths='3' inline>
                            <Form.Input
                                label='Name'
                                value={this.state.name}
                                placeholder={name}
                                fluid
                                onChange={event => this.setState({ name: event.target.value })} />
                            <Form.Input
                                label='Capacity'
                                type='number'
                                value={this.state.capacity}
                                placeholder={capacity}
                                fluid
                                onChange={event => this.setState({ capacity: event.target.value })} />
                            <Form.Input
                                label='Price'
                                type='number'
                                value={this.state.price}
                                placeholder={price}
                                fluid
                                onChange={event => this.setState({ price: event.target.value })} />
                        </Form.Group>

                        <DatesRangeInput
                            name="dates"
                            placeholder="From - To"
                            value={this.state.dates}
                            iconPosition="left"
                            onChange={this.handleDateChange}
                            dateFormat='YYYY-MM-DD'
                        />

                        <Form.Group widths='2'>
                            <Form.Field>
                                <label>Description</label>
                                <TextArea
                                    placeholder='Additional Details...'
                                    value={this.state.details}
                                    onChange={event => this.setState({ details: event.target.value })} />
                            </Form.Field>

                            <Form.Field>
                                <Segment>
                                    <Grid columns={3}>
                                        <Grid.Column verticalAlign='middle' width='2'>
                                            <Button icon='arrow left' size='tiny' onClick={this.left} />
                                        </Grid.Column>

                                        <Grid.Column width='12' textAlign='center'>
                                            <Image centered src={this.state.images[this.state.imageIndex]} size='medium' />
                                        </Grid.Column>

                                        <Grid.Column verticalAlign='middle' width='2'>
                                            <Button icon='arrow right' size='tiny' onClick={this.right} />
                                        </Grid.Column>
                                    </Grid>
                                </Segment>
                                <Form.Group widths='2'>
                                    <Form.Field>
                                        <Button negative content='Delete' floated='left' icon='times circle' onClick={this.deleteImage} />
                                    </Form.Field>
                                    <Form.Field>
                                        <Input type='file' floated='right' icon='plus' onChange={this.uploadImage} size='mini' />
                                    </Form.Field>
                                </Form.Group>
                            </Form.Field>
                        </Form.Group>



                        <Form.Group widths='2'>
                            <Form.Button
                                onClick={this.props.handleClose}
                                type='cancel'
                                content='Cancel' />
                            <Form.Button
                                floated='right'
                                type='submit'
                                positive
                                content='Submit Changes'
                            />
                        </Form.Group>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }

    async componentWillMount() {
        const pack = new PackageClass();
        let imageNames = await pack.getImageNames(this.state.id);
        let imageArray = imageNames.substr(1, imageNames.length - 2).split(',');
        imageArray = imageArray.map((imageName) => {
            return imageName.trim();
        });
        let images = [];
        imageArray.map((imageName) => {
            if (imageName) {
                return pack.getImage(imageName.trim()).then((value) => {
                    images.push(value);
                })
            }
        });
        this.setState({ images, imageNames: imageArray.reverse() });
    }

    left = (event) => {
        event.preventDefault();
        event.target.blur();
        let { images, imageIndex } = this.state;
        if (imageIndex > 0) {
            this.setState({ imageIndex: imageIndex - 1 });
        } else {
            this.setState({ imageIndex: images.length - 1 });
        }
    }

    right = (event) => {
        event.preventDefault();
        event.target.blur();
        let { images, imageIndex } = this.state;
        if (imageIndex === images.length - 1) {
            this.setState({ imageIndex: 0 });
        } else {
            this.setState({ imageIndex: imageIndex + 1 });
        }
    }

    handleDateChange = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({
                [name]: value
            });
        }
    }

    handleSubmit = () => {
        this.props.updatePackage(this.state);
        this.props.updatedisplay(this.state);
    }

    uploadImage = (event) => {
        const pack = new PackageClass();
        pack.updateImage(this.state.id, event.target.files[0]);
    }

    deleteImage = async () => {
        const { id, imageNames, imageIndex } = this.state;
        const pack = new PackageClass();
        pack.deleteImage(id, imageNames[imageIndex]);
    }
}

export default EditPackage;