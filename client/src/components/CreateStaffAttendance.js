import { Component } from "react";
import { baseURL } from "../baseURL";
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
import { Table } from "reactstrap";
import { fetcher } from '../services/fetcher';

export class StaffAttendanceCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      teachers: [],
      staffAttendance: []
    };
  }

  componentDidMount() {
    this.getStaffAttendance()
  }

  getStaffAttendance() {
    fetcher(`${baseURL}/staffAttendance`)
      // Convert response to a JSON object
      .then((response) => response.json())
      .then((attendances) => {
          attendances.sort((attendancea, attendanceb) => attendancea?.date-attendanceb?.date)
        this.setState({
            staffAttendance: attendances,
        })
        console.log(this.state.staffAttendance)
      });
  }

  async createStaffAttendance() {
    const staffAttendanceObject = {
      teachers: this.props.teacher.id,
      campuses: this.props.campus.id,
      date: document.getElementById("incidentDate").value,
      approved: document.getElementById("approved").value,
      illness: document.getElementById("illness").value,
      hours: document.getElementById("hours").value,
      comment: document.getElementById("comment").value,
    };
    const staffAttendance = await staffAttendanceService.create(
      staffAttendanceObject
    );
    setTimeout(() => {  this.getStaffAttendance() }, 2000);
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    var date = new Date();
    return (
      <div>
        <Button
          outline
          color="danger"
          size="sm"
          onClick={() => this.setState({ modal: true })}
        >
          Attendance
        </Button>
        <div class="tableFixHead">
        <Table bordered hover size="sm">
          <thead class="shadow">
            <tr>
              <th>
                <strong>Date</strong>
              </th>
              <th>
                <strong>Approved</strong>
              </th>
              <th>
                <strong>Illness</strong>
              </th>
              <th>
                <strong>Hours</strong>
              </th>
              <th>
                <strong>Comment</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.staffAttendance
            .filter(teacherz => teacherz.teachers?.id === this.props.teacher.id)
            .sort(function (a, b) {
              let x = a?.date;
              let y = b?.date;
              if (x < y) {
                return -1;
              }
              if (x > y) {
                return 1;
              }
              return 0;
            })
            // .sort((a, b) => a?.date - b?.date)
            .map((attendance) => (
              <tr>
                <th key={attendance.id}>{attendance?.date}</th>
                <td>
                  <small>{attendance?.approved}</small>
                </td>
                <td>
                  <small>{attendance?.illness}</small>
                </td>
                <td>
                  <small>{attendance?.hours}</small>
                </td>
                <td>
                  <small>{attendance?.comment}</small>
                </td>
               </tr>
            ))}
          </tbody>
        </Table>
      </div>
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
                  <Col>
                    <FormGroup>
                      <Label for="incidentDate">Date</Label>
                      <Input
                        defaultValue={
                          date.getFullYear().toString() +
                          "-" +
                          (date.getMonth() + 1).toString().padStart(2, 0) +
                          "-" +
                          date.getDate().toString().padStart(2, 0)
                        }
                        type="date"
                        name={`incidentDate`}
                        id={`incidentDate`}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="approved">Approved</Label>
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
                  </Row>
                  <Row>
                  <Col>
                    <FormGroup>
                      <Label for="illness">Illness</Label>
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
                  <Col>
                    <FormGroup>
                      <Label for="hours"><small>Hours Missed</small></Label>
                      <Input
                        type="number"
                        name="hours"
                        id="hours"
                        className="fancy-cursor"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
              <Container id="trackerBox">
                <FormGroup>
                  <Label for="comment">Comment</Label>
                  <Input
                    type="text"
                    name="comment"
                    id="comment"
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
