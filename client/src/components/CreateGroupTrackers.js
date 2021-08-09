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
import { trackerService } from "../services/trackerService";
import { spedResponseService } from "../services/spedResponseService";
import { fetcher } from "../services/fetcher";

export class GroupTrackerCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      spedQuestions: [],
      block: null,
    };
  }

  block = this.props.block;

  componentDidMount() {
    fetcher(`${baseURL}/spedQuestions`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          spedQuestions: data,
          //   .filter(function (item) {
          //     return this.state.block.includes(item);
          //   })
        });
      });
  }

  async createTracker(i) {
    const trackerObject = {
      students: document.getElementById("studentId" + i.id).value,
      teachers: document.getElementById("teacherId" + i.id).value,
      courses: document.getElementById("courseId" + i.id).value,
      courses: document.getElementById("schedId" + i.id).value,
      period: this.props.period,
      date: document.getElementById("spedResponseDate" + i.id).value,
      attendance: document.getElementById("attendance" + i.id).value,
      engagement: document.getElementById("engagement" + i.id).value,
      behavior: document.getElementById("behavior" + i.id).value,
    };
    const tracker = await trackerService.create(trackerObject);
    console.log(tracker);
  }

  async createSpedResponse(i) {
    const spedResponseObject = {
      date: document.getElementById("spedResponseDate").value,
      question: i.question,
      meet: document.getElementById("spedResponseMeet" + i.id).value,
      success: document.getElementById("spedResponseSuccess" + i.id).value,
      opportunity: document.getElementById("spedResponseOpportunity" + i.id)
        .value,
      response: document.getElementById("spedResponseResponse" + i.id).value,
      students: i.student.id,
      spedQuestions: i.id,
    };
    const spedResponse = await spedResponseService.create(spedResponseObject);
    fetcher({ baseURL } + "/spedResponses")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          spedResponse: data,
        });
      });
    console.log(spedResponse);
  }

  createSpedResponseNinja() {
    this.state.spedQuestions.forEach((scheduleQuestion) =>
      this.createSpedResponse(scheduleQuestion)
    );
  }

  createTrackerNinja() {
    this.state.block.forEach((scheduleQuestion) =>
      this.createTracker(scheduleQuestion)
    );
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button color="link" onClick={() => {
            this.setState({ modal: true })
            this.setState({ block: this.props.block})
            }}>
          Student Group Tracking
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
            {this.props.block.map((sched) => (
              <div>
                <Container id="trackerBox">
                  <p>
                    Student:
                    <small id={`studentId${sched.student.id}`} value={sched.student.id}>
                      {sched.student.firstName} {sched.student.lastName}
                    </small>
                    Course:
                    <small id={`courseId${sched.student.id}`} value={sched.course.id}>{sched.course.name}</small>
                    Teacher:
                    <small id={`teacherId${sched.student.id}`} value={sched.teacher.id}>{sched.teacher.firstName} {sched.teacher.lastName}</small>
                  </p>
                    <div id={`schedId${sched.id}`}>{sched.id}</div>
                  <Form>
                    <Col md={3}></Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="spedResponseDate">Date</Label>
                        <Input
                          type="date"
                          name={`spedResponseDate`}
                          id={`spedResponseDate${sched.student.id}`}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}></Col>
                    {this.state.spedQuestions
                      ?.filter((speQ) => speQ.student.id === sched.student.id)
                      ?.filter(
                        (speQ) =>
                          // speQ.category === this.props.course.subject ||
                          speQ.category === "Social"
                      )
                      .map((spedQuestion) => (
                        <div>
                          <Container
                            id="trackerBox"
                            style={{ backgroundColor: "pink" }}
                          >
                            <FormGroup>
                              <Label
                                for="spedResponseQuestion"
                                id={`spedResponseQuestion${spedQuestion?.id}`}
                                value={spedQuestion?.id}
                              >
                                <small>{spedQuestion.question} </small>
                              </Label>
                            </FormGroup>
                            <FormGroup check>
                              <Label check>
                                Did {spedQuestion.student?.firstName} meet this
                                goal?
                                <Input
                                  type="select"
                                  id={`spedResponseMeet${spedQuestion?.id}`}
                                >
                                  <option></option>
                                  <option value="true">Yes</option>
                                  <option value="false">No</option>
                                  <option>Not Applicable</option>
                                </Input>
                              </Label>
                            </FormGroup>
                            <Row>
                              <Col>
                                <FormGroup>
                                  <Label for="spedResponseSuccess">
                                    Successes{" "}
                                  </Label>
                                  <Input
                                    defaultValue="0"
                                    type="number"
                                    id={`spedResponseSuccess${spedQuestion?.id}`}
                                  />
                                </FormGroup>
                              </Col>
                              <Col>
                                <FormGroup>
                                  <Label for="spedResponseOpportunity">
                                    Opportunities{" "}
                                  </Label>
                                  <Input
                                    defaultValue="0"
                                    type="number"
                                    id={`spedResponseOpportunity${spedQuestion?.id}`}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <FormGroup>
                              <Label for="spedResponseResponse">Comment </Label>
                              <Input
                                type="string"
                                id={`spedResponseResponse${spedQuestion?.id}`}
                              />
                            </FormGroup>
                          </Container>
                        </div>
                      ))}
                    <Row form>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="attendance">Attendance</Label>
                          <Input
                            type="select"
                            name="attendance"
                            id={`attendance${sched.student.id}`}
                            className="fancy-cursor"
                          >
                            <option></option>
                            <option>Present</option>
                            <option>Absent</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="engagement">Engagement</Label>
                          <Input
                            type="select"
                            name="engagement"
                            id={`engagement${sched.student.id}`}
                            className="fancy-cursor"
                          >
                            <option></option>
                            <option value="1">
                              Disengaged: No demonstration of learning,
                              disruptive/ defiant/ avoidant
                            </option>
                            <option value="2">
                              Retreatism: Little to no effort, productivity or
                              inquiry, interest, or collaboration, no
                              demonstrated inquiry
                            </option>
                            <option value="3">
                              Ritual: Minimal effort to avoid negative
                              consequences, no self-directed/ motivated, minimal
                              inquiry
                            </option>
                            <option value="4">
                              Strategic: Clear effort, focus on directions and
                              task completion to meet standard, minimal inquiry
                            </option>
                            <option value="5">
                              High: Persistent, sustained inquiry, self-directed
                              learning, self motivated, highly engaged in
                              learning
                            </option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col md={1}></Col>
                      <Col md={3}>
                        <FormGroup>
                          <Label for="behavior">Behavior</Label>
                          <Input
                            type="select"
                            name="behavior"
                            id={`behavior${sched.student.id}`}
                            className="fancy-cursor"
                          >
                            <option></option>
                            <option
                              id="zone"
                              style={{
                                backgroundColor: "green",
                                color: "white",
                              }}
                              value="1"
                            >
                              Green Zone (happy, focused, calm, ready to learn)
                            </option>
                            <option
                              id="zone"
                              style={{ backgroundColor: "orange" }}
                              value="2"
                            >
                              Yellow Zone (loss of some control, excited,
                              silly/wiggly, frustrated)
                            </option>
                            <option
                              id="zone"
                              style={{
                                backgroundColor: "blue",
                                color: "white",
                              }}
                              value="3"
                            >
                              Blue Zone (sad, sick, moving slowly, shut down,
                              tired, anxious)
                            </option>
                            <option
                              id="zone"
                              style={{ backgroundColor: "red", color: "white" }}
                              value="4"
                            >
                              Red Zone (angry, mad, aggressive
                              verbally/physically)
                            </option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </Container>
              </div>
            ))}

            <Form className="fancy-cursor">
              <Button
                color="primary"
                onClick={() => {
                  this.createTrackerNinja();
                  this.createSpedResponseNinja();
                  this.setState({ modal: false });
                  console.log(this.state.block)
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
