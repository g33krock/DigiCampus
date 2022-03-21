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
} from "reactstrap";
import { scheduleService } from "../services/scheduleService";
import Draggable from 'react-draggable';

export class ScheduleUpdater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      teachers: null,
      courses: null,
      name: null,
      campus: null,
    };
  }

  async updateSchedule() {
    const scheduleObject = {
      id: this.props.scheduleId,
      teacher: parseInt(document.getElementById("scheduleTeacher").value),
      para: parseInt(document.getElementById("schedulePara").value),
      course: parseInt(document.getElementById("scheduleCourse").value),
      oneToOne: document.getElementById("scheduleOneToOne").value,
      period: this.props.period,
    };
    await scheduleService.update(scheduleObject);
    await this.props.callback();
    this.setState({ modal: false });
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button
          size="sm"
          color="link"
          onClick={() => this.setState({ modal: true })}
        >
          Update Schedule
        </Button>
        <Draggable>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="scheduleTeacher">Teacher</Label>
                    <Input
                      type="select"
                      id="scheduleTeacher"
                      defaultValue={this.props.teacher.id}
                    >
                      <option value="26" selected>
                        None
                      </option>
                      {this.props.teachers
                        ?.filter(
                          (teacher) =>
                            teacher.campus.id === this.props?.campus.id
                        )
                        .sort(function (a, b) {
                          let x = a.firstName.toLowerCase();
                          let y = b.firstName.toLowerCase();
                          if (x < y) {
                            return -1;
                          }
                          if (x > y) {
                            return 1;
                          }
                          return 0;
                        })
                        .map((teacher) => (
                          <option value={teacher.id}>
                            {teacher.firstName} {teacher.lastName}
                          </option>
                        ))}
                      <option value="19">Sonia Gonzales</option>
                      <option value="66">Beth Dillon</option>
                      <option value="116">Kheanna Landrum</option>
                      <option value="127">Jay Vigil</option>
                      <option value="54">Brittnee Walker</option>
                      <option value="139">Tyler Mair</option>
                      <option value="165">Michael Caruana</option>
                      <option value="168">Tiffany Williams</option>
                      <option value="56">Roman Roberts</option>
                      <option value="49">Angel Ramirez</option>
                      <option value="57">Alicia Frank</option>
                      <option value="82">Sara Lovell</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="schedulePara">Para</Label>
                    <Input
                      type="select"
                      id="schedulePara"
                      defaultValue={this.props.para?.id}
                    >
                      <option value="26" selected>
                        None
                      </option>
                      {this.props.teachers
                        ?.filter(
                          (teacher) =>
                            teacher.campus.id === this.props?.campus.id
                        )
                        .sort(function (a, b) {
                          let x = a.firstName.toLowerCase();
                          let y = b.firstName.toLowerCase();
                          if (x < y) {
                            return -1;
                          }
                          if (x > y) {
                            return 1;
                          }
                          return 0;
                        })
                        .map((teacher) => (
                          <option value={teacher.id}>
                            {teacher.firstName} {teacher.lastName}
                          </option>
                        ))}
                      <option value="19">Sonia Gonzales</option>
                      <option value="66">Beth Dillon</option>
                      <option value="116">Kheanna Landrum</option>
                      <option value="127">Jay Vigil</option>
                      <option value="139">Tyler Mair</option>
                      <option value="56">Roman Roberts</option>
                      <option value="49">Angel Ramirez</option>
                      <option value="57">Alicia Frank</option>
                      <option value="82">Sara Lovell</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="scheduleCourse">Select Course</Label>
                    <Input
                      type="select"
                      id="scheduleCourse"
                      defaultValue={this.props.course.id}
                    >
                      <option value="15" selected>
                        None
                      </option>
                      {this.props.courses
                        .sort(function (a, b) {
                          let x = a.name.toLowerCase();
                          let y = b.name.toLowerCase();
                          if (x < y) {
                            return -1;
                          }
                          if (x > y) {
                            return 1;
                          }
                          return 0;
                        })
                        .map((course) => (
                          <option value={course.id}>{course.name}</option>
                        ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="scheduleOneToOne">One-To-One?</Label>
                    <Input
                      type="select"
                      id="scheduleOneToOne"
                      defaultValue={this.props?.oneToOne}
                    >
                      <option value="NULL"></option>
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Button
                color="primary"
                onClick={() => {
                  this.updateSchedule();
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
