import React, { Component } from 'react';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody, Form, Container, Row, Col, Label, FormGroup, Input } from 'reactstrap';
import { guardianService } from "../services/guardianService";



export class UpdateGuardian extends Component {

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

    render() {
        return (
            <div>
            <Button color="link" size="sm" id="UncontrolledPopover" type="button">
                Update Guardian
            </Button>
            <UncontrolledPopover placement="bottom" target="UncontrolledPopover">
                <PopoverHeader>Update {this.props.firstName} {this.props.lastName}</PopoverHeader>
                <PopoverBody>
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
                  this.updateGuardian();
                }}
              >
                Submit
              </Button>

                    </Form>
                </PopoverBody>
            </UncontrolledPopover>
            </div>
        );
    }
}