import { Component } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Modal,
  ModalBody,
  Container,
  Col,
  Row
} from "reactstrap";
import { transcriptService } from "../services/transcriptService";

export class TranscriptUpdater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      transcript: this.props.transcript
    };
  }

  async updateTranscript() {
    const transcriptObject = {
        date: document.getElementById("transcriptDate").value,
        grade: document.getElementById("transcriptGrade").value,
        category: document.getElementById("transcriptCategory").value,
        credit: document.getElementById("transcriptCredit").value,
        schoolYear: document.getElementById("transcriptSchoolYear").value,
        semester: document.getElementById("transcriptSemester").value,
        school: document.getElementById("transcriptSchool")?.value,
        altCourse: document.getElementById("transcriptAltCourse")?.value,
        id: this.state.transcript.id,
    };
    await transcriptService.update(transcriptObject);
    setTimeout(() => {  this.props.callback() }, 2000);
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button outline color="primary" size="sm" onClick={() => this.setState({ modal: true })}>
          Update Transcript
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Form>
            <Container>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="transcriptDate">Date</Label>
                      <Input
                        defaultValue={this.props.date}
                        type="date"
                        name="transcriptDate"
                        id="transcriptDate"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup check>
                      <Label check>Grade</Label>
                      <Input type="select" id="transcriptGrade" defaultValue={this.props.grade}>
                        <option></option>
                        <option>A+</option>
                        <option>A</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B</option>
                        <option>B-</option>
                        <option>C+</option>
                        <option>C</option>
                        <option>C-</option>
                        <option>D+</option>
                        <option>D</option>
                        <option>D-</option>
                        <option>Pass</option>
                        <option>Fail</option>
                        <option>Incomplete</option>
                        <option>In Progress</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="transcriptCredit">Credit</Label>
                      <Input
                        defaultValue={this.props.credit}
                        type="select"
                        name="transcriptCredit"
                        id="transcriptCredit"
                      >
                        <option></option>
                        <option>0</option>
                        <option>0.5</option>
                        <option>1</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup check>
                      <Label check>Category</Label>
                      <Input type="select" id="transcriptCategory" defaultValue={this.props.category}>
                        <option></option>
                        <option>ELA</option>
                        <option>Math</option>
                        <option>Science</option>
                        <option>US History</option>
                        <option>World History</option>
                        <option>Government</option>
                        <option>Economics</option>
                        <option>CTE/Fine Arts</option>
                        <option>Foriegn Language</option>
                        <option>Elective</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="transcriptSchool">School</Label>
                      <Input
                        defaultValue={this.props.school}
                        type="text"
                        name="transcriptSchool"
                        id="transcriptSchool"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="transcriptSchoolYear">School Year</Label>
                      <Input
                        defaultValue={this.props.schoolYear}
                        type="select"
                        name="transcriptSchoolYear"
                        id="transcriptSchoolYear"
                      >
                        <option></option>
                        <option>2021-2022</option>
                        <option>2020-2021</option>
                        <option>2019-2020</option>
                        <option>2018-2019</option>
                        <option>2017-2018</option>
                        <option>2016-2017</option>
                        <option>2015-2016</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="transcriptSemester">Semester</Label>
                      <Input
                        defaultValue={this.props.semester}
                        type="select"
                        name="transcriptSemester"
                        id="transcriptSemester"
                      >
                        <option></option>
                        <option>Semester 1</option>
                        <option>Semester 2</option>
                        <option>ESY</option>
                        <option>Full Year</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
              <Container>
                <FormGroup>
                  <Label for="transcriptAltCourse">Course</Label>
                  <Input
                    defaultValue={this.props.course}
                    type="text"
                    name="transcriptAltCourse"
                    id="transcriptAltCourse"
                  />
                </FormGroup>
              </Container>
              <Button
                color="primary"
                onClick={() => {
                  this.updateTranscript();
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
