import { Component } from "react";
import { baseURL } from "../baseURL";
import {
  Button,
  Modal,
  ModalBody,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { GradeCalc } from "./GradeCalcComponent";
import { fetcher } from "../services/fetcher";
import { gradebookService } from "../services/gradebookService";
import { scheduleService } from "../services/scheduleService";

export class ClassGrades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gradebooks: [],
      gradebook: [],
      modal: false,
    };
  }

  toggle() {
    return !this.state.modal;
  }

  componentDidMount() {
    this.getGradebook();
  }

  getGradebook() {
    fetcher(`${baseURL}/studentgradebooks?studentsId=${this.props.student.id}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          gradebooks: data,
        });
      });
  }

  async updateGradebook(i) {
    const gradebookObject = {
      id: i.id,
      pointsAvailable: parseInt(
        document.getElementById("pointsAvailable" + i.id).value
      ),
      pointsEarned: parseInt(
        document.getElementById("pointsEarned" + i.id).value
      ),
      name: document.getElementById("name" + i.id).value,
    };
    await gradebookService.update(gradebookObject);
  }

  async updateSchedule() {
    const scheduleObject = {
      id: this.props.schedule.id,
      firstDay: document.getElementById("firstDay").value,
      lastDay: document.getElementById("lastDay").value,
      status: document.getElementById("status").value,
    };
    await scheduleService.update(scheduleObject);
  }

  async updateGradebookNinja() {
    this.state.gradebooks.forEach((scheduleQuestion) =>
      this.updateGradebook(scheduleQuestion)
    );
    setTimeout(() => {
      this.getGradebook();
    }, 2000);
  }

  async whatsGoingOnHere() {
    await this.setState({ gradebook: this.gradebooks });
    await console.log(this.state.gradebook);
  }

  render() {
    const gradebooks = this.state.gradebooks
      .filter((gradebook) => gradebook.courses.id === this.props.course.id)
      .filter((gradebook) => gradebook.students.id === this.props.student.id)
      .filter((gradebook) => gradebook.pointsAvailable > 0);
    console.log(gradebooks);
    return (
      <div>
        <Button
          color="link"
          onClick={() => {
            this.setState({ modal: true });
          }}
        >
          Grades
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Row>
              <Col>
                <strong>
                  {this.props.student?.firstName} {this.props.student?.lastName}
                </strong>
              </Col>
              <Col>
                <strong>{this.props.course.name}</strong>
              </Col>
              <Col>
                <GradeCalc gradebook={gradebooks} />
              </Col>
            </Row>
            <Form className="fancy-cursor">
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="firstDay">Start Date</Label>
                    <Input
                      defaultValue={this.props.schedule.firstDay}
                      type="date"
                      name={`firstDay`}
                      id={`firstDay`}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="lastDay">End Date</Label>
                    <Input
                      defaultValue={this.props.schedule.lastDay}
                      type="date"
                      name={`lastDay`}
                      id={`lastDay`}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="status">Status</Label>
                    <Input
                      defaultValue={this.props.schedule.status}
                      type="select"
                      name={`status`}
                      id={`status`}
                    >
                      <option></option>
                      <option value="IP">In Progress</option>
                      <option value="Complete">Completed</option>
                      <option value="S">Satisfactory</option>
                      <option value="NI">Needs Improvement</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
            {gradebooks.map((gradebook) => (
              <Card>
                <CardBody>
                  <Form className="fancy-cursor">
                    <FormGroup id="trackerBox">
                      <Label for="name">
                        <strong>Assignment Name</strong>
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        id={`name${gradebook.id}`}
                        className="fancy-cursor"
                        defaultValue={gradebook.name}
                      ></Input>
                    </FormGroup>
                    <FormGroup id="trackerBox">
                      <Label for="grade">
                        <strong>Grade</strong>
                      </Label>
                      <Row>
                        <Col xs="3">
                          <Input
                            type="number"
                            name="pointsEarned"
                            id={`pointsEarned${gradebook.id}`}
                            className="fancy-cursor"
                            defaultValue={gradebook.pointsEarned}
                          ></Input>
                        </Col>
                        <Col xs="1">
                          <strong>/</strong>
                        </Col>
                        <Col xs="3">
                          <Input
                            type="number"
                            name="pointsAvailable"
                            id={`pointsAvailable${gradebook.id}`}
                            className="fancy-cursor"
                            defaultValue={gradebook.pointsAvailable}
                          ></Input>
                        </Col>
                        <Col />
                      </Row>
                    </FormGroup>
                  </Form>
                  {/* <div>
                    <p>Assignment: {gradebook.name}</p>
                    <p>
                      Points: {gradebook.pointsEarned}/
                      {gradebook.pointsAvailable}
                    </p>
                  </div> */}
                </CardBody>
              </Card>
            ))}
            <Button
              color="primary"
              onClick={() => {
                this.setState({ modal: false });
                this.updateGradebookNinja();
                this.updateSchedule();
              }}
            >
              Submit Changes
            </Button>

            <Button
              color="danger"
              onClick={() => this.setState({ modal: false })}
            >
              Close
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
