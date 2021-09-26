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

export class TrackerCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      spedQuestions: [],
      method: null,
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  componentDidMount() {
    fetcher(`${baseURL}/spedQuestions`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          spedQuestions: data.filter(
            (datas) => datas.student.id === this.props.student.id
          ),
        });
      });
  }

  async updateSchedule() {
    const scheduleObject = {
      id: this.props.schedule.id,
      lastUpdate: document.getElementById("spedResponseDate").value,
    };
    await scheduleService.update(scheduleObject);
  }

  async createTracker() {
    const trackerObject = {
      students: this.props.student.id,
      teachers: this.props.teacher.id,
      courses: this.props.course.id,
      schedules: this.props.schedule.id,
      period: this.props.period,
      date: document.getElementById("spedResponseDate").value,
      attendance: document.getElementById("attendance").value,
      lesson: document.getElementById("lesson").value,
      comprehension: document.getElementById("comprehension").value,
      comprehensionAI: document.getElementById("comprehensionAI").value,
      comprehensionComment: document.getElementById("comprehensionComment")
        .value,
      engagement: document.getElementById("engagement").value,
      engagementAI: document.getElementById("engagementAI").value,
      engagementComment: document.getElementById("engagementComment").value,
      behavior: document.getElementById("behavior").value,
      behaviorAI: document.getElementById("behaviorAI").value,
      behaviorComment: document.getElementById("behaviorComment").value,
      assessment: document.getElementById("assessment").value,
      SEL1: document.getElementById("SEL1").value,
      SEL2: document.getElementById("SEL2").value,
      SEL3: document.getElementById("SEL3").value,
      SEL4: document.getElementById("SEL4").value,
      SEL5: document.getElementById("SEL5").value,
      method: this.state.method,
    };
    const tracker = await trackerService.create(trackerObject);
    console.log(tracker);
  }
  playClick(url){
    let a = new Audio(url);
    a.play();
  }

  async createSpedResponse(i) {
    const spedResponseObject = {
      teachers: this.props.teacher.id,
      date: document.getElementById("spedResponseDate").value,
      question: i.question,
      meet: document.getElementById("spedResponseMeet" + i.id).value,
      success: Math.abs(
        document.getElementById("spedResponseSuccess" + i.id).value
      ),
      opportunity: Math.abs(
        document.getElementById("spedResponseOpportunity" + i.id).value
      ),
      response: document.getElementById("spedResponseResponse" + i.id).value,
      students: this.props.student.id,
      spedQuestions: i.id,
    };
    const spedResponse = await spedResponseService.create(spedResponseObject);
    console.log(spedResponse);
  }

  createSpedResponseNinja() {
    this.state.spedQuestions.forEach((scheduleQuestion) =>
      this.createSpedResponse(scheduleQuestion)
    );
  }

  toggle() {
    return !this.state.modal;
  }

  onChangeValue(event) {
    console.log(event.target.value);
    this.setState({ method: event.target.value });
  }

  render() {
    var date = new Date();
    return (
      <div>
        <Button color="link" onClick={() => this.setState({ modal: true })}>
          Student Tracking
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
            <p>
              <strong>Course: </strong>
              {this.props.course.name}
            </p>
            <p>
              <strong>Period: </strong>
              {this.props.period}
            </p>

            <Form className="fancy-cursor">
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
              {this.state.spedQuestions
                ?.filter(
                  (speQ) =>
                    speQ.category === this.props.course.subject ||
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
                          {spedQuestion.question}{" "}
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          Did {spedQuestion.students?.firstName} meet this goal?
                          <Input
                            type="select"
                            id={`spedResponseMeet${spedQuestion?.id}`}
                          >
                            <option></option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                            <option value="NA">Not Applicable</option>
                            <option value="IP">In Progress</option>
                          </Input>
                        </Label>
                      </FormGroup>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for="spedResponseSuccess">Successes </Label>
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
              <Container id="trackerBox">
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="attendance">
                        <h3>Attendance</h3>
                      </Label>

                      <Input
                        type="select"
                        name="attendance"
                        id="attendance"
                        className="fancy-cursor"
                      >
                        <option></option>
                        <option>Present</option>
                        <option>Absent</option>
                        <option>Tardy</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <div onChange={this.onChangeValue}>
                      <input type="radio" value="Ground" name="method" /> Ground
                      <input type="radio" value="Virtual" name="method" />{" "}
                      Virtual
                    </div>
                  </Col>
                </Row>
              </Container>
              <FormGroup id="trackerBox">
                <Label for="lesson">
                  <h3>Lesson Description</h3>
                </Label>
                <Input
                  type="text"
                  name="lesson"
                  id="lesson"
                  className="fancy-cursor"
                />
              </FormGroup>
              <Container style={{ backgroundColor: "tan" }} id="trackerBox">
                <h3>Check for Understanding</h3>
                <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="comprehension">Check for Understanding</Label>
                      <Input
                        type="select"
                        name="comprehension"
                        id="comprehension"
                        className="fancy-cursor"
                      >
                        <option value="0"></option>
                        <option value="1">Not Understanding</option>
                        <option value="2">Superficial Understanding</option>
                        <option value="3">Developing</option>
                        <option value="4">Solid Mastery</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={9}>
                    <FormGroup>
                      <Label for="comprehensionAI">
                        Check for Understanding Additional Information
                      </Label>
                      <Input
                        type="select"
                        name="comprehensionAI"
                        id="comprehensionAI"
                        className="fancy-cursor"
                        multiple
                      >
                        <option>Requires review of basic content</option>
                        <option>Processing/Memory/Retrieval issues</option>
                        <option>Requires review of current content</option>
                        <option>Requires modifications to content</option>
                        <option>
                          Requires differentiation and infusion to enhance
                          understanding
                        </option>
                        <option>
                          Requires assistance/ support from leadership
                        </option>
                        <option>
                          Requires use of support materials/ tools
                        </option>
                        <option>Reading/ Comprehension issues</option>
                        <option>Specific Learning Disabilities</option>
                        <option>Requires behavioral support</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="comprehensionComment">
                    Check for Understanding Comment
                  </Label>
                  <Input
                    type="text"
                    name="comprehensionComment"
                    id="comprehensionComment"
                    className="fancy-cursor"
                  />
                </FormGroup>
              </Container>
              <Container
                style={{ backgroundColor: "lightblue" }}
                id="trackerBox"
              >
                <h3>Engagement</h3>
                <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="engagement">Engagement</Label>
                      <Input
                        type="select"
                        name="engagement"
                        id="engagement"
                        className="fancy-cursor"
                      >
                        <option value="0"></option>
                        <option value="1">
                          Disengaged: No demonstration of learning, disruptive/
                          defiant/ avoidant
                        </option>
                        <option value="2">
                          Retreatism: Little to no effort, productivity or
                          inquiry, interest, or collaboration, no demonstrated
                          inquiry
                        </option>
                        <option value="3">
                          Ritual: Minimal effort to avoid negative consequences,
                          no self-directed/ motivated, minimal inquiry
                        </option>
                        <option value="4">
                          Strategic: Clear effort, focus on directions and task
                          completion to meet standard, minimal inquiry
                        </option>
                        <option value="5">
                          High: Persistent, sustained inquiry, self-directed
                          learning, self motivated, highly engaged in learning
                        </option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={9}>
                    <FormGroup>
                      <Label for="engagementAI">
                        Engagement Additional Information
                      </Label>
                      <Input
                        type="select"
                        name="engagementAI"
                        id="engagementAI"
                        className="fancy-cursor"
                        multiple
                      >
                        <option>Work refusal</option>
                        <option>Oppositionality</option>
                        <option>Disruptive to others</option>
                        <option>Aggression (verbal)</option>
                        <option>Aggression (physical)</option>
                        <option>
                          Involved in other tasks/ activities/ behaviors
                        </option>
                        <option>Attention seeking behaviors (negative)</option>
                        <option>
                          Self-harm behaviors (verbally or physically)
                        </option>
                        <option>Negative attitude</option>
                        <option>Shut down/ lack of participation</option>
                        <option>Minimal Effort</option>
                        <option>Requires Incentives</option>
                        <option>Not interested in topic/ content</option>
                        <option>Highly interested in topic/ content</option>
                        <option>Emotional Difficulty Anxiety</option>
                        <option>Emotional Difficulty Depression</option>
                        <option>Medical Issue</option>
                        <option>
                          Requires Assistance/ Support from Leadership
                        </option>
                        <option>Requires Behavioral Support</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="engagementComment">Engagement Comment</Label>
                  <Input
                    type="text"
                    name="engagementComment"
                    id="engagementComment"
                    className="fancy-cursor"
                  />
                </FormGroup>
              </Container>
              <Container style={{ backgroundColor: "gold" }} id="trackerBox">
                <h3>Behavior/Zone</h3>
                <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="behavior">Behavior/Zone of Regulation</Label>
                      <Input
                        type="select"
                        name="behavior"
                        id="behavior"
                        className="fancy-cursor"
                      >
                        <option value="0"></option>
                        <option
                          id="zone"
                          style={{ backgroundColor: "green", color: "white" }}
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
                          style={{ backgroundColor: "blue", color: "white" }}
                          value="3"
                        >
                          Blue Zone (sad, sick, moving slowly, shut down, tired,
                          anxious)
                        </option>
                        <option
                          id="zone"
                          style={{ backgroundColor: "red", color: "white" }}
                          value="4"
                        >
                          Red Zone (angry, mad, aggressive verbally/physically)
                        </option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={9}>
                    <FormGroup>
                      <Label for="behaviorAI">
                        Behavior/Zone Additional Information
                      </Label>
                      <Input
                        type="select"
                        name="behaviorAI"
                        id="behaviorAI"
                        className="fancy-cursor"
                        multiple
                      >
                        <option>Out of seat</option>
                        <option>Loss of Control</option>
                        <option>Talking Out</option>
                        <option>Unfocused</option>
                        <option>Low Attention</option>
                        <option>Sick</option>
                        <option>Sad</option>
                        <option>Head Down</option>
                        <option>Anxious</option>
                        <option>Low attention due to being tired</option>
                        <option>Low communication</option>
                        <option>Physical aggression toward teachers</option>
                        <option>Physical aggression toward peers</option>
                        <option>Verbal aggression toward teachers</option>
                        <option>Verbal aggression toward peers</option>
                        <option>Self-injurious behavior</option>
                        <option>Property Destruction</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="behaviorComment">Behavior/Zone Comment</Label>
                  <Input
                    type="text"
                    name="behaviorComment"
                    id="behaviorComment"
                    className="fancy-cursor"
                  />
                </FormGroup>
              </Container>
              <FormGroup id="trackerBox">
                <Label for="assessment">
                  <h3>Assessment</h3>
                </Label>
                <Input
                  type="text"
                  name="assessment"
                  id="assessment"
                  className="fancy-cursor"
                />
              </FormGroup>
              <Container style={{ backgroundColor: "green" }} id="trackerBox">
                <h3>Social Emotional Learning</h3>
                <FormGroup>
                  <Label for="SEL1">
                    How often did this student demonstrate self-awareness?
                  </Label>
                  <Input
                    type="select"
                    name="SEL1"
                    id="SEL1"
                    className="fancy-cursor"
                  >
                    <option></option>
                    <option value="0">Never 0% of time</option>
                    <option value="1">Rarely 0-15% of time</option>
                    <option value="2">Seldom 15-30% if time</option>
                    <option value="3">Sometimes 30-60% of time</option>
                    <option value="4">Frequently 60-85% of time</option>
                    <option value="5">Always 85-100% of time</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="SEL2">
                    How often did this student demonstrate self-management?{" "}
                  </Label>
                  <Input
                    type="select"
                    name="SEL2"
                    id="SEL2"
                    className="fancy-cursor"
                  >
                    <option></option>
                    <option value="0">Never 0% of time</option>
                    <option value="1">Rarely 0-15% of time</option>
                    <option value="2">Seldom 15-30% if time</option>
                    <option value="3">Sometimes 30-60% of time</option>
                    <option value="4">Frequently 60-85% of time</option>
                    <option value="5">Always 85-100% of time</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="SEL3">
                    How often did this student demonstrate responsible decision
                    making?
                  </Label>
                  <Input
                    type="select"
                    name="SEL3"
                    id="SEL3"
                    className="fancy-cursor"
                  >
                    <option></option>
                    <option value="0">Never 0% of time</option>
                    <option value="1">Rarely 0-15% of time</option>
                    <option value="2">Seldom 15-30% if time</option>
                    <option value="3">Sometimes 30-60% of time</option>
                    <option value="4">Frequently 60-85% of time</option>
                    <option value="5">Always 85-100% of time</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="SEL4">
                    How often did this student demonstrate social awareness?
                  </Label>
                  <Input
                    type="select"
                    name="SEL4"
                    id="SEL4"
                    className="fancy-cursor"
                  >
                    <option></option>
                    <option value="0">Never 0% of time</option>
                    <option value="1">Rarely 0-15% of time</option>
                    <option value="2">Seldom 15-30% if time</option>
                    <option value="3">Sometimes 30-60% of time</option>
                    <option value="4">Frequently 60-85% of time</option>
                    <option value="5">Always 85-100% of time</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="SEL5">
                    How often did this student demonstrate relationship skills?
                  </Label>
                  <Input
                    type="select"
                    name="SEL5"
                    id="SEL5"
                    className="fancy-cursor"
                  >
                    <option></option>
                    <option value="0">Never 0% of time</option>
                    <option value="1">Rarely 0-15% of time</option>
                    <option value="2">Seldom 15-30% if time</option>
                    <option value="3">Sometimes 30-60% of time</option>
                    <option value="4">Frequently 60-85% of time</option>
                    <option value="5">Always 85-100% of time</option>
                  </Input>
                </FormGroup>
              </Container>
              {/* <SpedResponseCreator submitted={this.state.submitted} modal={this.state.modal}
              student={this.props.student.id} ></SpedResponseCreator> */}
              <Button
                color="primary"
                onClick={() => {
                  // this.playClick('https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/click.mp3');
                  this.playClick('https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/Tackle.mp3');
                  this.createTracker();
                  this.createSpedResponseNinja();
                  this.updateSchedule();
                  this.setState({ modal: false });
                }}
              >
                Submit
              </Button>
              <Button
                color="danger"
                onClick={() => {
                  this.playClick('https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/sounds/ganon.mp3');
                  this.setState({ modal: false });
                }}
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
