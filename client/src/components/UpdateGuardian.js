import React, { Component } from 'react';
import { Button, Form, Container, Row, Col, Label, FormGroup, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { guardianService } from "../services/guardianService";
import Draggable from 'react-draggable';



export class UpdateGuardian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

    async updateGuardian() {
        const guardianObject = {
          guardianID: this.props.guardianId,
          firstName: document.getElementById("guardianFirstName").value,
          lastName: document.getElementById("guardianLastName").value,
          phone: document.getElementById("guardianPhone").value,
          email: document.getElementById("guardianEmail").value,
          address: document.getElementById("guardianAddress").value,
          additional_info: document.getElementById("guardianAdditionalInfo").value,
        };
        const guardian = await guardianService.update(guardianObject);
        console.log(guardian);
      }

      toggle() {
        return !this.state.modal;
      }

    render() {
        return (
            <div>
            <Button outline color="primary" size="sm" onClick={() => this.setState({ modal: true })}>
                Update Guardian
            </Button>
            <Draggable>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader>Update {this.props.firstName} {this.props.lastName}</ModalHeader>
                <ModalBody>
                    <Form>
                    <Container>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="guardianFirstName">First</Label>
                      <Input
                        defaultValue={this.props.firstName}
                        type="text"
                        name="guardianFirstName"
                        id="guardianFirstName"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="guardianLastName">Last</Label>
                      <Input
                        defaultValue={this.props.lastName}
                        type="text"
                        name="guardianLastName"
                        id="guardianLastName"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="guardianPhone">Phone</Label>
                      <Input
                        defaultValue={this.props.phone}
                        type="text"
                        name="guardianPhone"
                        id="guardianPhone"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="guardianEmail">Email</Label>
                      <Input
                        defaultValue={this.props.email}
                        type="text"
                        name="guardianEmail"
                        id="guardianEmail"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
              <Container>
                <FormGroup>
                  <Label for="guardianAddress">Address</Label>
                  <Input
                    defaultValue={this.props.address}
                    type="text"
                    name="guardianAddress"
                    id="guardianAddress"
                  />
                </FormGroup>
              </Container>
              <Container>
                <FormGroup>
                  <Label for="guardianAdditionalInfo">Additional Info</Label>
                  <Input
                    defaultValue={this.props.additionalInfo}
                    type="text"
                    name="guardianAdditionalInfo"
                    id="guardianAdditionalInfo"
                  />
                </FormGroup>
              </Container>
              <Button
                color="primary"
                onClick={() => {
                  this.updateGuardian()
                  this.setState({ modal: false })
                }}
              >
                Submit
              </Button>
              <Button
                color="danger"
                onClick={() => this.setState({ modal: false })}
              >
                Cancel
              </Button>

                    </Form>
                </ModalBody>
            </Modal>
            </Draggable>
            </div>
        );
    }
}