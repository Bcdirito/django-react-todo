import React, { Component } from 'react'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap";

export default class Modal extends Component {
    state = {
        activeItem: this.props.activeItem
    }

    render() {
        const {toggle, save} = this.props

        return (
            <Modal isOpen={true} toggle={toggle}>
                <ModalHeader toggle={toggle}>To Do</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="title">Title</Label>
                            <Input type="text" name="title" value={this.state.activeItem.title} /*onChange={(e) => this.handleChange(e)}*/ />
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}
