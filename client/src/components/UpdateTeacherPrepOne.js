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

export class TeacherPrepUpdater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      teacher:null
    };
  }

  async updateTeacher() {
        const teacherObject = {
        teacherID: this.state.teacher,
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
    await teacherService.update(teacherObject);
    setTimeout(() => {  this.props.callback() }, 2000);
    
    
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button color="link" size="sm" onClick={() => this.setState({ modal: true, teacher:this.props.teacherID })}>
          Update Availability
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
        <ModalBody>
            <Form>
              <Container>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP1"><small>7:50-8:40</small></Label>
                      <Input type="select" name="teacherP1" id="teacherP1" defaultValue={this.props.teacherP1}>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Prep</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP2"><small>8:40-9:30</small></Label>
                      <Input type="select" name="teacherP2" id="teacherP2" defaultValue={this.props.teacherP2}>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Prep</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP3"><small>9:30-10:20</small></Label>
                      <Input type="select" name="teacherP3" id="teacherP3" defaultValue={this.props.teacherP3}>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Prep</option>
                        <option>Para Support</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP4"><small>10:20-11:10</small></Label>
                      <Input type="select" name="teacherP4" id="teacherP4" defaultValue={this.props.teacherP4}>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Prep</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP5"><small>11:10-12:00</small></Label>
                      <Input type="select" name="teacherP5" id="teacherP5" defaultValue={this.props.teacherP5}>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Prep</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP6"><small>12:00-12:50</small></Label>
                      <Input type="select" name="teacherP6" id="teacherP6" defaultValue={this.props.teacherP6}>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Prep</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP7"><small>12:50-1:40</small></Label>
                      <Input type="select" name="teacherP7" id="teacherP7" defaultValue={this.props.teacherP7}>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Prep</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP8"><small>1:40-2:30</small></Label>
                      <Input type="select" name="teacherP8" id="teacherP8" defaultValue={this.props.teacherP8}>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Prep</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP9"><small>2:30-3:20</small></Label>
                      <Input type="select" name="teacherP9" id="teacherP9" defaultValue={this.props.teacherP9}>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Prep</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="teacherP10"><small>3:20-4:10</small></Label>
                      <Input type="select" name="teacherP10" id="teacherP10" defaultValue={this.props.teacherP10}>
                        <option>Yes</option>
                        <option>No</option>
                        <option>Prep</option>
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
