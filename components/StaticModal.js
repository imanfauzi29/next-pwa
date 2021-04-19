import React, {Component} from "react";
import {Modal} from "react-bootstrap";

export default class StaticModal extends Component {
        render() {
        return (
            <Modal backdrop="static" className="modal-class" size={this.props.size} show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
            </Modal>
        )
    }
}
