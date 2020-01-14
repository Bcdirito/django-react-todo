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

const CustomModal = (props) => {
    const {toggle, save} = props

    return (
        <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}>To Do</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" value={props.activeItem.title} /*onChange={(e) => this.handleChange(e)}*/ placeholder="Enter Todo Title" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" value={props.activeItem.description} placeholder="Enter Todo Description"/>
                    </FormGroup>
                    <FormGroup check>
                        <Label for="completed"><Input type="checkbox" value={props.activeItem.completed}/>Completed</Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="success" /*onClick={() => onSave()} */>Save</Button>
            </ModalFooter>
        </Modal>
    )
}

export default CustomModal