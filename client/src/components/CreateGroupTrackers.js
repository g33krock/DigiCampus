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
import { scheduleService } from "../services/scheduleService";
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
        });
      });
  }

  playClick(url){
    let a = new Audio(url);
    a.play();
  }

  async updateSchedule(i) {
    const scheduleObject = {
      id: i.id,
      lastUpdate: document.getElementById("spedResponseDate").value,
    };
    await scheduleService.update(scheduleObject);
  }

  async createTracker(i) {
    const trackerObject = {
      students: i.student.id,
      teachers: i.teacher.id,
      courses: i.course.id,
      schedules: i.id,
      period: this.props.period,
      date: document.getElementById("spedResponseDate").value,
      lesson: document.getElementById("lesson").value,
      attendance: document.getElementById("attendance" + i.student.id).value,
      engagement: document.getElementById("engagement" + i.student.id).value,
      behavior: document.getElementById("behavior" + i.student.id).value,
      method: document.getElementById("method" + i.student.id).value,
      behaviorComment: document.getElementById("behaviorComment" + i.student.id)
        .value,
    };
    const tracker = await trackerService.create(trackerObject);
    console.log(tracker);
  }

  async createSpedResponse(i) {
    const spedResponseObject = {
      teachers: this.props.teacher,
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
    console.log(spedResponse);
  }

  createSpedResponseNinja() {
    this.state.block.forEach((stud) => {
      this.state.spedQuestions
        ?.filter((speQ) => speQ.student.id === stud.student.id)
        ?.filter((speQ) => speQ.category === "Social")
        .forEach((scheduleQuestion) =>
          this.createSpedResponse(scheduleQuestion)
        );
    });
  }

  createTrackerNinja() {
    this.state.block.forEach((scheduleQuestion) =>
      this.createTracker(scheduleQuestion)
    );
  }

  updateScheduleNinja() {
    this.state.block.forEach((scheduleQuestion) =>
      this.updateSchedule(scheduleQuestion)
    );
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    var date = new Date();
    return (
      <div>
        <Button
          color="link"
          onClick={() => {
            this.setState({ modal: true });
            this.setState({ block: this.props.block });
          }}
        >
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
            <Form>
              <Row>
                <Col xs={1}></Col>
                <Col xs={5}>
                  <FormGroup>
                    <Label for="spedResponseDate">Date</Label>
                    <Input
                      defaultValue={
                        date.getFullYear().toString() +
                        "-" +
                        (date.getMonth() + 1).toString().padStart(2, 0) +
                        "-" +
                        date.getDate().toString().padStart(2, 0)
                      }
                      type="date"
                      name={`spedResponseDate`}
                      id={`spedResponseDate`}
                    />
                  </FormGroup>
                </Col>
                <Col xs={1}></Col>
                <Col xs={5}>
                  <FormGroup>
                    <Label for="lesson">Lesson</Label>
                    <Input
                      type="text"
                      name="lesson"
                      id={`lesson`}
                      className="fancy-cursor"
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
            {this.props.block.map((sched) => (
              <div>
                <Container id="trackerBox">
                  <p>
                    Student:
                    <small
                      id={`studentId${sched.student.id}`}
                      value={sched.student.id}
                    >
                      {sched.student.firstName} {sched.student.lastName}
                    </small>
                    Course:
                    <small
                      id={`courseId${sched.student.id}`}
                      value={sched.course.id}
                    >
                      {sched.course.name}
                    </small>
                    Teacher:
                    <small
                      id={`teacherId${sched.student.id}`}
                      value={sched.teacher.id}
                    >
                      {sched.teacher.firstName} {sched.teacher.lastName}
                    </small>
                  </p>
                  <div id={`schedId${sched.id}`}></div>
                  <Form>
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
                                  <option value="NA">Not Applicable</option>
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
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for="method">Method</Label>
                          <Input
                            type="select"
                            name="method"
                            id={`method${sched.student.id}`}
                            className="fancy-cursor"
                          >
                            <option></option>
                            <option>Ground</option>
                            <option>Virtual</option>
                          </Input>
                        </FormGroup>
                      </Col>
                    </Row>

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
                            <option>Tardy</option>
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
                            <option value="0"></option>
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
                            <option value="0"></option>
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
                    <Row>
                      <Col xs={1}></Col>
                      <Col>
                        <FormGroup>
                          <Label for="behaviorComment">Comment</Label>
                          <Input
                            type="text"
                            name="behaviorComment"
                            id={`behaviorComment${sched.student.id}`}
                            className="fancy-cursor"
                          ></Input>
                        </FormGroup>
                      </Col>
                      <Col xs={1}></Col>
                    </Row>
                  </Form>
                </Container>
              </div>
            ))}

            <Form className="fancy-cursor">
              <Button
                color="primary"
                onClick={() => {
                  this.playClick('https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/click.mp3');
                  // this.playClick('https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/applause2.mp3');
                  this.createTrackerNinja();
                  this.createSpedResponseNinja();
                  this.updateScheduleNinja();
                  this.setState({ modal: false });
                  console.log(this.state.block);
                }}
              >
                Submit
              </Button>
              <Button
                color="danger"
                onClick={() => {
                  this.playClick('https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/zeldabossdies.mp3');
                  this.setState({ modal: false })}}
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
