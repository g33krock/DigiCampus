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
import { studentService } from "../services/studentService";
import { baseURL } from "../baseURL";
import { fetcher } from "../services/fetcher";

export class StudentUpdater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      districts: []
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

  async updateStudent() {
    const studentObject = {
      studentID: this.props.studentId,
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
      withdraw: document.getElementById("withdraw").value,
      dailyReport: document.getElementById("dailyReport").value,
      counselingMinutes: document.getElementById("counselingMinutes").value,
      speechMinutes: document.getElementById("speechMinutes").value,
      otMinutes: document.getElementById("otMinutes").value,
      district: document.getElementById("district").value,
      start: document.getElementById("start").value,
    };
    const student = await studentService.update(studentObject);
    console.log(student);
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button
          outline
          color="success"
          size="sm"
          onClick={() => this.setState({ modal: true })}
        >
          Update Student
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="studentFirstName">First Name</Label>
                    <Input
                      defaultValue={this.props.studentFirstName}
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
                      defaultValue={this.props.studentLastName}
                      type="text"
                      name="studentLastName"
                      id="studentLastName"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="birthDate">Date of Birth</Label>
                    <Input
                      defaultValue={this.props.studentBirth}
                      type="date"
                      name="birthDate"
                      id="birthDate"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="studentGrade">Grade Level</Label>
                    <Input
                      type="select"
                      name="studentGrade"
                      id="studentGrade"
                      defaultValue={this.props.studentGrade}
                    >
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
                    <Input
                      type="select"
                      name="IEP"
                      id="IEP"
                      defaultValue={this.props.studentIEP}
                    >
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
                      defaultValue={this.props.studentCampus}
                    >
                      <option></option>
                      <option value="1">Tempe</option>
                      <option value="2">Queen Creek</option>
                      <option value="3">Litchfield Park</option>
                      <option value="4">Scottsdale</option>
                      <option value="5">Tucson</option>
                      <option value="9">BRACE</option>
                      <option value="8">Withdrawn</option>
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
                      defaultValue={this.props.studentFunding}
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
                    <Input type="select" name="district" id="district" defaultValue={this.props.district}>
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
                      defaultValue={this.props.studentInstructionMode}
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
                    <Input type="date" name="start" id="start" defaultValue={this.props.start}/>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="previousSchools">Previous School(s)</Label>
                    <Input
                      defaultValue={this.props.studentPreviousSchools}
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
                        defaultValue={this.props.counselingMinutes}
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
                        defaultValue={this.props.speechMinutes}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="speechMinutes">OT</Label>
                      <Input type="number" name="otMinutes" id="otMinutes" defaultValue={this.props.otMinutes}/>
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
                        defaultValue={this.props.studentHearingLimitations}
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
                        defaultValue={this.props.studentVisionLimitations}
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
                        defaultValue={this.props.studentMobilityLimitations}
                        type="text"
                        name="mobilityLimitations"
                        id="mobilityLimitations"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="allergies">Allergies</Label>
                    <Input
                      defaultValue={this.props.studentAllergies}
                      type="text"
                      name="allergies"
                      id="allergies"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="therapies">Therapies</Label>
                    <Input
                      defaultValue={this.props.studentTherapies}
                      type="text"
                      name="therapies"
                      id="therapies"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="sensitivities">Sensitivities</Label>
                    <Input
                      defaultValue={this.props.studentSensitivities}
                      type="text"
                      name="sensitivities"
                      id="sensitivities"
                    />
                  </FormGroup>
                </Col>
              </Row>
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
                      <Input
                        defaultValue={this.props.studentSocial}
                        type="text"
                        name="social"
                        id="social"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="emotional">Emotional</Label>
                      <Input
                        defaultValue={this.props.studentEmotional}
                        type="text"
                        name="emotional"
                        id="emotional"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="physical">Physical</Label>
                      <Input
                        defaultValue={this.props.studentPhysical}
                        type="text"
                        name="physical"
                        id="physical"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="math">Math</Label>
                      <Input
                        defaultValue={this.props.studentMath}
                        type="text"
                        name="math"
                        id="math"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="reading">Reading</Label>
                      <Input
                        defaultValue={this.props.studentReading}
                        type="text"
                        name="reading"
                        id="reading"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="writing">Writing</Label>
                      <Input
                        defaultValue={this.props.studentWriting}
                        type="text"
                        name="writing"
                        id="writing"
                      />
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
                      <Input
                        defaultValue={this.props.studentInterests}
                        type="text"
                        name="interests"
                        id="interests"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="3">
                    <FormGroup>
                      <Label for="dailyReport">Daily Report</Label>
                      <Input
                        type="select"
                        name="dailyReport"
                        id="dailyReport"
                        defaultValue={this.props.dailyReport}
                      >
                        <option>No</option>
                        <option>Yes</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="3" />
                  <Col xs="6">
                    <FormGroup>
                      <Label for="withdraw">Withdrawl Date</Label>
                      <Input type="date" name="withdraw" id="withdraw" />
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
              <Button
                color="primary"
                onClick={() => {
                  this.updateStudent();
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
