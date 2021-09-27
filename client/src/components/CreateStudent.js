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
import { studentService } from "../services/studentService";
import { fetcher } from "../services/fetcher";

export class StudentCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      districts: [],
    };
  }

  componentDidMount() {
    fetcher(`${baseURL}/districts`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          districts: data,
        });
      });
  }

  async createStudent() {
    const studentObject = {
      firstName: document.getElementById("studentFirstName").value,
      lastName: document.getElementById("studentLastName").value,
      birthDate: document.getElementById("birthDate").value,
      grade: document.getElementById("studentGrade").value,
      campuses: document.getElementById("studentCampus").value,
      iep: document.getElementById("IEP").value,
      funding: document.getElementById("studentFunding").value,
      instructionmode: document.getElementById("studentInstructionMode").value,
      previousSchools: document.getElementById("previousSchools").value,
      allergies: document.getElementById("allergies").value,
      hearingLimitations: document.getElementById("hearingLimitations").value,
      visionLimitations: document.getElementById("visionLimitations").value,
      mobilityLimitations: document.getElementById("mobilityLimitations").value,
      sensitivities: document.getElementById("sensitivities").value,
      therapies: document.getElementById("therapies").value,
      social: document.getElementById("social").value,
      emotional: document.getElementById("emotional").value,
      physical: document.getElementById("physical").value,
      math: document.getElementById("math").value,
      reading: document.getElementById("reading").value,
      writing: document.getElementById("writing").value,
      interests: document.getElementById("interests").value,
      counselingMinutes: document.getElementById("counselingMinutes").value,
      speechMinutes: document.getElementById("speechMinutes").value,
      otMinutes: document.getElementById("otMinutes").value,
      district: document.getElementById("district").value,
      start: document.getElementById("start").value,
    };
    const student = await studentService.create(studentObject);
    fetcher(`${baseURL}/students`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          students: data,
        });
      });
    console.log(student);
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button color="link" onClick={() => this.setState({ modal: true })}>
          Add Student
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="studentFirstName">First Name</Label>
                    <Input
                      type="text"
                      name="studentFirstName"
                      id="studentFirstName"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="studentLastName">Last Name</Label>
                    <Input
                      type="text"
                      name="studentLastName"
                      id="studentLastName"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="birthDate">Date of Birth</Label>
                    <Input type="date" name="birthDate" id="birthDate" />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="studentGrade">Grade Level</Label>
                    <Input type="select" name="studentGrade" id="studentGrade">
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="IEP">IEP</Label>
                    <Input type="select" name="IEP" id="IEP">
                      <option></option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="studentCampus">Student Campus</Label>
                    <Input
                      type="select"
                      name="studentCampus"
                      id="studentCampus"
                    >
                      <option></option>
                      <option value="1">Tempe</option>
                      <option value="2">Queen Creek</option>
                      <option value="3">Litchfield Park</option>
                      <option value="4">Scottsdale</option>
                      <option value="5">Tucson</option>
                      <option value="9">BRACE</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="studentFunding">Funding Source</Label>
                    <Input
                      type="select"
                      name="studentFunding"
                      id="studentFunding"
                    >
                      <option></option>
                      <option value="1">ESA</option>
                      <option value="2">District</option>
                      <option value="3">Private Pay</option>
                      <option value="4">Scholarship</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="district">District</Label>
                    <Input type="select" name="district" id="district">
                      <option></option>
                      {this.state.districts.map((district) => (
                        <option value={district.id}>{district.name}</option>
                      ))}
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="studentInstructionMode">Instruction Mode</Label>
                    <Input
                      type="select"
                      name="studentInstructionMode"
                      id="studentInstructionMode"
                    >
                      <option></option>
                      <option value="1">Ground</option>
                      <option value="2">Home</option>
                      <option value="3">Virtual</option>
                      <option value="4">Campus/Home</option>
                      <option value="5">Campus/Virtual</option>
                      <option value="6">Home/Virtual</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="start">Start Date</Label>
                    <Input type="date" name="start" id="start" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="previousSchools">Previous School(s)</Label>
                    <Input
                      type="text"
                      name="previousSchools"
                      id="previousSchools"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Container>
                <h3>Additional Services</h3>
                <small>Minutes per Month</small>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="counselingMinutes">Counseling</Label>
                      <Input
                        type="number"
                        name="counselingMinutes"
                        id="counselingMinutes"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="speechMinutes">Speech</Label>
                      <Input
                        type="number"
                        name="speechMinutes"
                        id="speechMinutes"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="speechMinutes">OT</Label>
                      <Input type="number" name="otMinutes" id="otMinutes" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h3>Medical</h3>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="hearingLimitations">Hearing</Label>
                      <Input
                        type="text"
                        name="hearingLimitations"
                        id="hearingLimitations"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="visionLimitations">Vision</Label>
                      <Input
                        type="text"
                        name="visionLimitations"
                        id="visionLimitations"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="mobilityLimitations">Mobility</Label>
                      <Input
                        type="text"
                        name="mobilityLimitations"
                        id="mobilityLimitations"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="allergies">Allergies</Label>
                      <Input type="text" name="allergies" id="allergies" />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="therapies">Therapies</Label>
                      <Input type="text" name="therapies" id="therapies" />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="sensitivities">Sensitivities</Label>
                      <Input
                        type="text"
                        name="sensitivities"
                        id="sensitivities"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col>
                    <h3>Describe your student in the following areas:</h3>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="social">Social</Label>
                      <Input type="text" name="social" id="social" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="emotional">Emotional</Label>
                      <Input type="text" name="emotional" id="emotional" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="physical">Physical</Label>
                      <Input type="text" name="physical" id="physical" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="math">Math</Label>
                      <Input type="text" name="math" id="math" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="reading">Reading</Label>
                      <Input type="text" name="reading" id="reading" />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="writing">Writing</Label>
                      <Input type="text" name="writing" id="writing" />
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col>
                    <h3>What are your student's interests?</h3>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="interests">Interests</Label>
                      <Input type="text" name="interests" id="interests" />
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
              <Button
                color="primary"
                onClick={() => {
                  this.createStudent();
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
