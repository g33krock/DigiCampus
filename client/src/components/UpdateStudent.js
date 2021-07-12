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
  Container
} from "reactstrap";
import { studentService } from "../services/studentService";

export class StudentUpdater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  async updateStudent() {
    const studentObject = {
      studentID: this.props.studentId,
      firstName: document.getElementById("studentFirstName").value,
      lastName: document.getElementById("studentLastName").value,
      grade: document.getElementById("studentGrade").value,
      campuses: document.getElementById("studentCampus").value,
      iep: document.getElementById("IEP").value,
      medical_information: document.getElementById("medInfo").value,
      additional_information: document.getElementById("addInfo").value,
      funding: document.getElementById("studentFunding").value,
      instructionmode: document.getElementById("studentInstructionMode").value
    };
    const student = await studentService.update(studentObject);
    console.log(student)
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button outline color="success" size="sm" onClick={() => this.setState({ modal: true })}>
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
                      defaultValue={this.props.studentBirthDate}
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
                    <Input type="select" name="studentGrade" id="studentGrade" defaultValue={this.props.studentGrade}>
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
                    <Input type="select" name="IEP" id="IEP" defaultValue={this.props.studentIEP}>
                      <option></option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="studentCampus">Student Campus</Label>
                    <Input type="select" name="studentCampus" id="studentCampus" defaultValue={this.props.studentCampus}>
                      <option></option>
                      <option value="1">Tempe</option>
                      <option value="2">Queen Creek</option>
                      <option value="3">Litchfield Park</option>
                      <option value="4">Scottsdale</option>
                      <option value="5">Tucson</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="studentFunding">Funding Source</Label>
                    <Input type="select" name="studentFunding" id="studentFunding" defaultValue={this.props.studentFunding}>
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
                    <Label for="studentInstructionMode">Instruction Mode</Label>
                    <Input type="select" name="studentInstructionMode" id="studentInstructionMode" defaultValue={this.props.studentInstructionMode}>
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
              </Container>
              <Button
                color="primary"
                onClick={() => {
                  this.updateStudent();
                  this.setState({ modal: false })
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
