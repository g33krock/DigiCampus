import { Component } from "react";

import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Modal,
  ModalBody,
  Row,
  Col,
  Container,
} from "reactstrap";
import { staffAttendanceService } from "../services/staffAttendanceService";


export class StaffAttendanceCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      teachers: [],
    };
  }

  async createStaffAttendance() {
    const staffAttendanceObject = {
      teachers: this.props.teacher.id,
      date: document.getElementById("incidentDate").value,
      approved: document.getElementById("startTime").value,
      illness: document.getElementById("endTime").value,
      hours: document.getElementById("description").value,
      points: document.getElementById("behavior").value,
    };
    const staffAttendance = await staffAttendanceService.create(staffAttendanceObject);
    console.log(staffAttendance);
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    var date = new Date(); 
    return (
      <div>
        <Button outline color="danger" size="sm" onClick={() => this.setState({ modal: true })}>
          Incident Report
        </Button>
        <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
          <ModalBody
            id="fancy-cursor"
            style={{
              backgroundColor: "lightgray",
              color: "black",
              fontSize: "21px",
              textAlign: "center",
            }}
          >
            <p>
              <strong>Student: </strong>
              {this.props.student.firstName} {this.props.student.lastName}
            </p>
            <p>
              <strong>Teacher: </strong>
              {this.props.teacher.firstName} {this.props.teacher.lastName}
            </p>

            <Form className="fancy-cursor">
              <Container id="trackerBox">
                <Row>
                  <Col xs="5">
                    <FormGroup>
                      <Label for="incidentDate">Date</Label>
                      <Input
                        defaultValue={date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) +
                        '-' + date.getDate().toString().padStart(2, 0)}
                        type="date"
                        name={`incidentDate`}
                        id={`incidentDate`}
                      />
                    </FormGroup>
                  </Col>

                  <Col xs="3">
                    <FormGroup>
                      <Label for="startTime">
                        Incident Start Time
                      </Label>
                      <Input
                        type="datetime"
                        name="startTime"
                        id="startTime"
                        placeholder="hh:mm am/pm"
                        className="fancy-cursor"
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col xs="1"></Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label for="endTime">
                        Incident End Time
                      </Label>
                      <Input
                        type="datetime"
                        name="endTime"
                        id="endTime"
                        placeholder="hh:mm am/pm"
                        className="fancy-cursor"
                      ></Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
              <Container id="trackerBox">
                <FormGroup>
                  <Label for="description">Describe the Incident</Label>
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    className="fancy-cursor"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="behavior">
                    Describe What the Behavior Looked Like
                  </Label>
                  <Input
                    type="text"
                    name="behavior"
                    id="behavior"
                    className="fancy-cursor"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="after">
                    Describe What Happened Directly After the Incident
                  </Label>
                  <Input
                    type="text"
                    name="after"
                    id="after"
                    className="fancy-cursor"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="others">
                    Students and/or Staff Involved in the Incident
                  </Label>
                  <Input
                    type="text"
                    name="others"
                    id="others"
                    className="fancy-cursor"
                  />
                </FormGroup>
              </Container>
              <Container id="trackerBox">
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="behaviorInterventionPlan">
                        Does this student have a Behavior Intervention Plan?
                        *Required
                      </Label>
                      <Input
                        type="select"
                        name="behaviorInterventionPlan"
                        id="behaviorInterventionPlan"
                        className="fancy-cursor"
                      >
                        <option></option>
                        <option>No</option>
                        <option>Yes</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="1" />
                  <Col>
                    <FormGroup>
                      <Label for="bipImplemented">
                        Was the Behavior Intervention Plan Implemented?
                        *Required
                      </Label>
                      <Input
                        type="select"
                        name="bipImplemented"
                        id="bipImplemented"
                        className="fancy-cursor"
                      >
                        <option>N/A</option>
                        <option>No</option>
                        <option>Yes</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Container>

              <Container id="trackerBox" style={{ backgroundColor: "lightblue" }}>
                <h3>
                  Choose a result if student is NOT on a Behavior Intervention
                  Plan
                </h3>
                <Row>
                  <Col xs="3">
                    <FormGroup>
                      <Label for="redirect">Redirection / Warning</Label>
                      <Input
                        type="select"
                        name="redirect"
                        id="redirect"
                        className="fancy-cursor"
                      >
                        <option></option>
                        <option>No</option>
                        <option>Yes</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="1"></Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label for="reinforce">
                        Reinforcement - Reward System
                      </Label>
                      <Input
                        type="select"
                        name="reinforce"
                        id="reinforce"
                        className="fancy-cursor"
                      >
                        <option></option>
                        <option>No</option>
                        <option>Yes</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="1"></Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label for="quiet">Use of Quiet Area</Label>
                      <Input
                        type="select"
                        name="quiet"
                        id="quiet"
                        className="fancy-cursor"
                      >
                        <option></option>
                        <option>No</option>
                        <option>Yes</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="3">
                    <FormGroup>
                      <Label for="parentContact">Parent Contacted</Label>
                      <Input
                        type="select"
                        name="parentContact"
                        id="parentContact"
                        className="fancy-cursor"
                      >
                        <option></option>
                        <option>No</option>
                        <option>Yes</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="1"></Col>
                  <Col xs="3">
                    <FormGroup>
                      <Label for="consultCaseManager">
                        Case Manager Consulted
                      </Label>
                      <Input
                        type="select"
                        name="consultCaseManager"
                        id="consultCaseManager"
                        className="fancy-cursor"
                      >
                        <option></option>
                        <option>No</option>
                        <option>Yes</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
              <Button
                color="primary"
                onClick={() => {
                  this.createIncident();
                  this.setState({ modal: false });
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
      </div>
    );
  }
}
