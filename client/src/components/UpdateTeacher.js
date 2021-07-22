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
import { teacherService } from "../services/teacherService";

export class TeacherUpdater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  async updateTeacher() {
        const teacherObject = {
        teacherID: this.props.teacherId,
          firstName: document.getElementById("teacherFirstName").value,
          lastName: document.getElementById("teacherLastName").value,
          birthDate: document.getElementById("birthDate").value,
          role: document.getElementById("teacherRole").value,
          campus: document.getElementById("teacherCampus").value,
          email: document.getElementById("teacherEmail").value,
          phone: document.getElementById("teacherPhone").value,
          link: document.getElementById("teacherLink").value,
          elementary: document.getElementById("teacherElementary").value,
          middle: document.getElementById("teacherMiddle").value,
          math: document.getElementById("teacherHighschoolMath").value,
          ELA: document.getElementById("teacherHighschoolELA").value,
          history: document.getElementById("teacherHighschoolHistory").value,
          science: document.getElementById("teacherHighschoolScience").value,
          elective: document.getElementById("teacherElective").value,
          pOne: document.getElementById("teacherP1").value,
          pTwo: document.getElementById("teacherP2").value,
          pThree: document.getElementById("teacherP3").value,
          pFour: document.getElementById("teacherP4").value,
          pFive: document.getElementById("teacherP5").value,
          pSix: document.getElementById("teacherP6").value,
          pSeven: document.getElementById("teacherP7").value,
          pEight: document.getElementById("teacherP8").value,
          pNine: document.getElementById("teacherP9").value,
          pTen: document.getElementById("teacherP10").value
        };
    const teacher = await teacherService.update(teacherObject);
    console.log(teacher)
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button outline color="success" size="sm" onClick={() => this.setState({ modal: true })}>
          Update Teacher
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="teacherFirstName">First Name</Label>
                    <Input
                    defaultValue={this.props.teacherFirstName}
                      type="text"
                      name="teacherFirstName"
                      id="teacherFirstName"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="teacherLastName">Last Name</Label>
                    <Input
                    defaultValue={this.props.teacherLastName}
                      type="text"
                      name="teacherLastName"
                      id="teacherLastName"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="birthDate">Date of Birth</Label>
                    <Input
                    defaultValue={this.props.teacherBirthDate}
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
                    <Label for="teacherEmail">Email</Label>
                    <Input
                    defaultValue={this.props.teacherEmail}
                      type="text"
                      name="teacherEmail"
                      id="teacherEmail"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="teacherPhone">Phone</Label>
                    <Input
                    defaultValue={this.props.teacherPhone}
                      type="text"
                      name="teacherPhone"
                      id="teacherPhone"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="teacherLink">Link</Label>
                    <Input
                    defaultValue={this.props.teacherLink}
                      type="text"
                      name="teacherLink"
                      id="teacherLink"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="teacherRole">Role</Label>
                    <Input type="select" name="teacherRole" id="teacherRole" defaultValue={this.props.teacherRole}>
                      <option></option>
                      <option value="1">Campus Director</option>
                      <option value="2">Teacher Lead</option>
                      <option value="3">Teacher</option>
                      <option value="4">Paraprofessional</option>
                      <option value="7">Sped Coordinator</option>
                      <option value="5">District Administrator</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="teacherCampus">Teacher Campus</Label>
                    <Input type="select" name="teacherCampus" id="teacherCampus" defaultValue={this.props.teacherCampus}>
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
              <Container>
                <h3>Subjects</h3>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="teacherElementary"><small>Elementary</small></Label>
                      <Input type="select" name="teacherElementary" id="teacherElementary"defaultValue={this.props.teacherElementary}>
                        <option></option>
                        <option value="1">Uncomfortable</option>
                        <option value="2">Comfortable</option>
                        <option value="3">Preferred</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherMiddle"><small>Middle School</small></Label>
                      <Input type="select" name="teacherMiddle" id="teacherMiddle" defaultValue={this.props.teacherMiddle}>
                        <option></option>
                        <option value="1">Uncomfortable</option>
                        <option value="2">Comfortable</option>
                        <option value="3">Preferred</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherElective"><small>Elective</small></Label>
                      <Input type="select" name="teacherElective" id="teacherElective" defaultValue={this.props.teacherElective}>
                        <option></option>
                        <option value="1">Uncomfortable</option>
                        <option value="2">Comfortable</option>
                        <option value="3">Preferred</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="teacherHighschoolMath"><small>HS Math</small></Label>
                      <Input type="select" name="teacherHighschoolMath" id="teacherHighschoolMath" defaultValue={this.props.teacherHighschoolMath}>
                        <option></option>
                        <option value="1">Uncomfortable</option>
                        <option value="2">Comfortable</option>
                        <option value="3">Preferred</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherHighschoolELA"><small>HS ELA</small></Label>
                      <Input type="select" name="teacherHighschoolELA" id="teacherHighschoolELA" defaultValue={this.props.teacherHighschoolELA}>
                        <option></option>
                        <option value="1">Uncomfortable</option>
                        <option value="2">Comfortable</option>
                        <option value="3">Preferred</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherHighschoolHistory"><small>HS History</small></Label>
                      <Input type="select" name="teacherHighschoolHistory" id="teacherHighschoolHistory" defaultValue={this.props.teacherHighschoolHistory}>
                        <option></option>
                        <option value="1">Uncomfortable</option>
                        <option value="2">Comfortable</option>
                        <option value="3">Preferred</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherHighschoolScience"><small>HS Science</small></Label>
                      <Input type="select" name="teacherHighschoolScience" id="teacherHighschoolScience" defaultValue={this.props.teacherHighschoolScience}>
                        <option></option>
                        <option value="1">Uncomfortable</option>
                        <option value="2">Comfortable</option>
                        <option value="3">Preferred</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
              <Container>
                <h3>Availability</h3>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP1"><small>Period 1</small></Label>
                      <Input type="select" name="teacherP1" id="teacherP1" defaultValue={this.props.teacherP1}>
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP2"><small>Period 2</small></Label>
                      <Input type="select" name="teacherP2" id="teacherP2" defaultValue={this.props.teacherP2}>
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP3"><small>Period 3</small></Label>
                      <Input type="select" name="teacherP3" id="teacherP3" defaultValue={this.props.teacherP3}>
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP4"><small>Period 4</small></Label>
                      <Input type="select" name="teacherP4" id="teacherP4" defaultValue={this.props.teacherP4}>
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP5"><small>Period 5</small></Label>
                      <Input type="select" name="teacherP5" id="teacherP5" defaultValue={this.props.teacherP5}>
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP6"><small>Period 6</small></Label>
                      <Input type="select" name="teacherP6" id="teacherP6" defaultValue={this.props.teacherP6}>
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP7"><small>Period 7</small></Label>
                      <Input type="select" name="teacherP7" id="teacherP7" defaultValue={this.props.teacherP7}>
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP8"><small>Period 8</small></Label>
                      <Input type="select" name="teacherP8" id="teacherP8" defaultValue={this.props.teacherP8}>
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP9"><small>Period 9</small></Label>
                      <Input type="select" name="teacherP9" id="teacherP9" defaultValue={this.props.teacherP9}>
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP10"><small>Period 10</small></Label>
                      <Input type="select" name="teacherP10" id="teacherP10" defaultValue={this.props.teacherP10}>
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
              <Button
                color="primary"
                onClick={() => {
                  this.updateTeacher();
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
