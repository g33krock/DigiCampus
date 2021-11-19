import { Component } from "react";
import { connect } from 'react-redux';
import { createTeacher } from '../store/teachers';
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
import Draggable from 'react-draggable';


class TeacherCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  async createTeacher() {
    const teacherObject = {
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
    this.props.createTeacher(teacherObject);
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button color="link" onClick={() => this.setState({ modal: true })}>
          Add Teacher
        </Button>
        <Draggable>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="teacherFirstName">First Name</Label>
                    <Input
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
                    <Input type="select" name="teacherRole" id="teacherRole">
                      <option></option>
                      <option value="1">Campus Director</option>
                      <option value="2">Teacher Lead</option>
                      <option value="3">Teacher</option>
                      <option value="4">Paraprofessional</option>
                      <option value="7">Sped Coordinator</option>
                      <option value="5">District Administrator</option>
                      <option value="8">Occupational Therapist</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="teacherCampus">Teacher Campus</Label>
                    <Input type="select" name="teacherCampus" id="teacherCampus">
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
              <Container>
                <h3>Subjects</h3>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="teacherElementary"><small>Elementary</small></Label>
                      <Input type="select" name="teacherElementary" id="teacherElementary">
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
                      <Input type="select" name="teacherMiddle" id="teacherMiddle">
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
                      <Input type="select" name="teacherElective" id="teacherElective">
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
                      <Input type="select" name="teacherHighschoolMath" id="teacherHighschoolMath">
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
                      <Input type="select" name="teacherHighschoolELA" id="teacherHighschoolELA">
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
                      <Input type="select" name="teacherHighschoolHistory" id="teacherHighschoolHistory">
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
                      <Input type="select" name="teacherHighschoolScience" id="teacherHighschoolScience">
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
                      <Input type="select" name="teacherP1" id="teacherP1">
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP2"><small>Period 2</small></Label>
                      <Input type="select" name="teacherP2" id="teacherP2">
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP3"><small>Period 3</small></Label>
                      <Input type="select" name="teacherP3" id="teacherP3">
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP4"><small>Period 4</small></Label>
                      <Input type="select" name="teacherP4" id="teacherP4">
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP5"><small>Period 5</small></Label>
                      <Input type="select" name="teacherP5" id="teacherP5">
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
                      <Input type="select" name="teacherP6" id="teacherP6">
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP7"><small>Period 7</small></Label>
                      <Input type="select" name="teacherP7" id="teacherP7">
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP8"><small>Period 8</small></Label>
                      <Input type="select" name="teacherP8" id="teacherP8">
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP9"><small>Period 9</small></Label>
                      <Input type="select" name="teacherP9" id="teacherP9">
                        <option>Yes</option>
                        <option>No</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP10"><small>Period 10</small></Label>
                      <Input type="select" name="teacherP10" id="teacherP10">
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
                  this.createTeacher();
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
        </Draggable>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    teachers: state.teachers,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createTeacher: (teacher) => dispatch(createTeacher(teacher)),
  };
};

export default connect(mapState, mapDispatch)(TeacherCreator);
