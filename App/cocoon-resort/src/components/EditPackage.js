import React, { Component } from 'react';
import { Modal, Form, Icon, TextArea, Input } from 'semantic-ui-react';
import { DateInput } from 'semantic-ui-calendar-react';
import PackageClass from '../classes/package';


class EditPackage extends Component {
    constructor(props) {
        super(props);

        let { id, name, details, price, from, to, capacity, isOpen } = this.props.info;

        this.state = {
            id: id || '',
            name: name || '',
            details: details || '',
            price: price || '',
            from: from || '',
            to: to || '',
            capacity: capacity || ''
        };
    }


    render() {
        const { name, details, price, from, to, capacity } = this.props.info

        return (
            <Modal open={this.props.isOpen} onClose={this.props.handleClose}>
                <Modal.Header><Icon name= 'edit'/> Edit {name}</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group widths='3' inline>
                            <Form.Input
                                label='Name'
                                value={this.state.name}
                                placeholder={name}
                                fluid
                                onChange={event => this.setState({name: event.target.value})} />
                            <Form.Input
                                label='Capacity'
                                value={this.state.capacity}
                                placeholder={capacity}
                                fluid
                                onChange={event => this.setState({ capacity: event.target.value})} />
                            <Form.Input
                                label='Price'
                                value={this.state.price}
                                placeholder={price}
                                fluid
                                onChange={event => this.setState({ price: event.target.value})} />
                        </Form.Group>

                        <Form.Group widths='2' inline>
                            {/* TODO: Handle the dates correctly, set date format*/}
                            <DateInput
                                name='from'
                                label='Starting Date'
                                placeholder={from}
                                iconPosition='left'
                                fluid
                                value={this.state.from}
                                onChange={this.handleDateChange} />
                            <DateInput
                                name='to'
                                label='Ending Date'
                                placeholder={to}
                                value={this.state.to}
                                fluid
                                onChange={this.handleDateChange} />
                        </Form.Group>

                        <Form.Group widths='2'>
                            <Form.Field>
                                <label>Description</label>
                                <TextArea
                                    placeholder='Additional Details...'
                                    value={this.state.details}
                                    onChange={event => this.setState({details: event.target.value})} />
                            </Form.Field>

                            <Form.Field>
                                <Input
                                    type='file'
                                    onChange={event => this.uploadImage(event)} />

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
        console.log('hahaha');
        const pack = new PackageClass();
        pack.updateImage(this.state.id, event.target.files[0]);
    }
}

export default EditPackage;