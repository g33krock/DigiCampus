import { Component } from "react";
import {baseURL} from "../baseURL";
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
  Container
} from "reactstrap";
import { incidentService } from "../services/incidentService";
import { fetcher } from '../services/fetcher';

export class IncidentCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      spedQuestions:[]
    };
  }

  componentDidMount() {
    fetcher(`${baseURL}/spedQuestions`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        spedQuestions: data.filter(datas => datas.student.id === this.props.student.id),
      });
    });
  }

  async createIncident() {
    const incidentObject = {
      students: this.props.student.id,
      teachers: this.props.teacher.id,
      date: document.getElementById("incidentDate").value,
      startTime: document.getElementById("startTime").value,
      endTime: document.getElementById("endTime").value,
      description: document.getElementById("description").value,
      behavior: document.getElementById("behavior").value,
      after: document.getElementById("after").value,
      others: document.getElementById("others").value,
      behaviorInterventionPlan:document.getElementById("behaviorInterventionPlan").value,
      bipImplemented: document.getElementById("bipImplemented").value,
      redirect: document.getElementById("redirect").value,
      reinforce: document.getElementById("reinforce").value,
      quiet: document.getElementById("quiet").value,
      parentContact: document.getElementById("parentContact").value,
      consultCaseManager: document.getElementById("consultCaseManager").value,
      crisisIntervention: document.getElementById("crisisIntervention").value,
      crisisStaff: document.getElementById("crisisStaff").value,
      crisisMethod: document.getElementById("crisisMethod").value,
      crisisDisengagement: document.getElementById("crisisDisengagement").value,
      crisisHold: document.getElementById("crisisHold").value,
      crisisMethodDescription: document.getElementById("crisisMethodDescription").value,
      crisisStartTime: document.getElementById("crisisStartTime").value,
      crisisEndTime: document.getElementById("crisisEndTime").value,
      crisisLocation: document.getElementById("crisisLocation").value,
      crisisReason: document.getElementById("crisisReason").value,
      signature: document.getElementById("signature").value,
    };
    const incident = await incidentService.create(incidentObject);
    console.log(incident)
  }

  toggle() {
    return !this.state.modal;
  }


  render() {
    return (
      <div>
        <Button
          color="link"
          onClick={() => this.setState({ modal: true })}
        >
          Student Tracking
        </Button>
        <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
          <ModalBody id="fancy-cursor" style={{ backgroundColor: "lightgray", color: 'black', fontSize: '21px', textAlign: 'center'}}>
            <p>
              <strong>Student: </strong>
              {this.props.student.firstName} {this.props.student.lastName}
            </p>
            <p>
              <strong>Teacher: </strong>
              {this.props.teacher.firstName} {this.props.teacher.lastName}
            </p>
            
            <Form className="fancy-cursor">
            <FormGroup>
                <Label for="incidentDate">Date</Label>
                <Input
                  type="date"
                  name={`incidentDate`}
                  id={`incidentDate`}
                />
              </FormGroup>
              <FormGroup id="trackerBox">
                <Label for="startTime">
                  <h3>Incident Start Time</h3>
                </Label>
                <Input type="datetime" name="startTime" id="startTime" placeholder="datetime placeholder" className="fancy-cursor">
                </Input>
              </FormGroup>
              <FormGroup id="trackerBox">
                <Label for="endTime">
                  <h3>Incident End Time</h3>
                </Label>
                <Input type="datetime" name="endTime" id="endTime" placeholder="datetime placeholder" className="fancy-cursor">
                </Input>
              </FormGroup>
              <FormGroup id="trackerBox">
                <Label for="description">
                  Describe the Incident
                </Label>
                <Input type="text" name="description" id="description" className="fancy-cursor" />
              </FormGroup>
                
                    <FormGroup>
                      <Label for="behavior">Describe What the Behavior Looked Like</Label>
                      <Input
                        type="text"
                        name="behavior"
                        id="behavior"
                        className="fancy-cursor" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="after">Describe What Happened Directly After the Incident</Label>
                      <Input
                        type="text"
                        name="after"
                        id="after"
                        className="fancy-cursor" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="others">Students and/or Staff Involved in the Incident</Label>
                      <Input
                        type="text"
                        name="others"
                        id="others"
                        className="fancy-cursor" />
                    </FormGroup>
                    <FormGroup>
                      <Label for="behaviorInterventionPlan">Describe What the Behavior Looked Like</Label>
                      <Input
                        type="select"
                        name="behaviorInterventionPlan"
                        id="behaviorInterventionPlan"
                        className="fancy-cursor">
                            <option>No</option>
                            <option>Yes</option>
                        </Input>
                    </FormGroup>
                  
                  
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
              <Container style={{ backgroundColor: "lightblue" }} id="trackerBox">
                <h3>Engagement</h3>
                <Row form>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="engagement">Engagement</Label>
                      <Input type="select" name="engagement" id="engagement" className="fancy-cursor">
                        <option></option>
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
                      <Input type="select" name="behavior" id="behavior" className="fancy-cursor">
                        <option></option>
                        <option
                          id="zone"
                          style={{ backgroundColor: "green", color:"white" }}
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
                          style={{ backgroundColor: "blue", color:"white" }}
                          value="3"
                        >
                          Blue Zone (sad, sick, moving slowly, shut down, tired,
                          anxious)
                        </option>
                        <option
                          id="zone"
                          style={{ backgroundColor: "red", color:"white" }}
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
                <Input type="text" name="assessment" id="assessment" className="fancy-cursor"/>
              </FormGroup>
              <Container style={{ backgroundColor: "green" }} id="trackerBox">
                <h3>Social Emotional Learning</h3>
                <FormGroup>
                  <Label for="SEL1">How often did this student demonstrate self-awareness?</Label>
                  <Input type="select" name="SEL1" id="SEL1" className="fancy-cursor">
                    <option></option>
                    <option value="1">
                      Never
                    </option>
                    <option value="2">
                      Rarely
                    </option>
                    <option value="3">
                      Sometimes
                    </option>
                    <option value="4">
                      Occasionally
                    </option>
                    <option value="5">
                      Always
                    </option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="SEL2">How often did this student demonstrate self-management? </Label>
                  <Input type="select" name="SEL2" id="SEL2" className="fancy-cursor">
                    <option></option>
                    <option value="1">
                      Never
                    </option>
                    <option value="2">
                      Rarely
                    </option>
                    <option value="3">
                      Sometimes
                    </option>
                    <option value="4">
                      Occasionally
                    </option>
                    <option value="5">
                      Always
                    </option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="SEL3">How often did this student demonstrate responsible decision making?</Label>
                  <Input type="select" name="SEL3" id="SEL3" className="fancy-cursor">
                    <option></option>
                    <option value="1">
                      Never
                    </option>
                    <option value="2">
                      Rarely
                    </option>
                    <option value="3">
                      Sometimes
                    </option>
                    <option value="4">
                      Occasionally
                    </option>
                    <option value="5">
                      Always
                    </option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="SEL4">How often did this student demonstrate social awareness?</Label>
                  <Input type="select" name="SEL4" id="SEL4" className="fancy-cursor">
                    <option></option>
                    <option value="1">
                      Never
                    </option>
                    <option value="2">
                      Rarely
                    </option>
                    <option value="3">
                      Sometimes
                    </option>
                    <option value="4">
                      Occasionally
                    </option>
                    <option value="5">
                      Always
                    </option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="SEL5">How often did this student demonstrate relationship skills?</Label>
                  <Input type="select" name="SEL5" id="SEL5" className="fancy-cursor">
                    <option></option>
                    <option value="1">
                      Never
                    </option>
                    <option value="2">
                      Rarely
                    </option>
                    <option value="3">
                      Sometimes
                    </option>
                    <option value="4">
                      Occasionally
                    </option>
                    <option value="5">
                      Always
                    </option>
                  </Input>
                </FormGroup>            
              </Container>
              {/* <IncidentCreator submitted={this.state.submitted} modal={this.state.modal}
              student={this.props.student.id} ></IncidentCreator> */}
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
