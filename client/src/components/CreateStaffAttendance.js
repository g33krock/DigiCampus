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
      campuses: this.props.campus.id,
      date: document.getElementById("incidentDate").value,
      approved: document.getElementById("approved").value,
      illness: document.getElementById("illness").value,
      hours: document.getElementById("hours").value,
      points: document.getElementById("points").value,
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
          Attendance
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
              <strong>Staff: </strong>
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
                      <Label for="approved">
                        Approved
                      </Label>
                      <Input
                        type="select"
                        name="approved"
                        id="approved"
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
                      <Label for="illness">
                        Illness
                      </Label>
                      <Input
                        type="select"
                        name="illness"
                        id="illness"
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
              <Container id="trackerBox">
                <FormGroup>
                  <Label for="hours">Hours Missed</Label>
                  <Input
                    type="number"
                    name="hours"
                    id="hours"
                    className="fancy-cursor"
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="points">Points Accrued</Label>
                  <Input
                    type="number"
                    name="points"
                    id="points"
                    className="fancy-cursor"
                  />
                </FormGroup>
              </Container>
              <Button
                color="primary"
                onClick={() => {
                  this.createStaffAttendance();
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
