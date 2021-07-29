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
  Container,
  Row,
  Col,
} from "reactstrap";
import { transcriptService } from "../services/transcriptService";
import { fetcher } from '../services/fetcher';

export class TranscriptCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      teachers: [],
      courses: [],
      transcript: null,
    };
  }

  componentDidMount() {
    fetcher(`${baseURL}/teachers`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          teachers: data,
        });
      });
    fetcher(`${baseURL}/courses`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          courses: data,
        });
      });
  }

  async createTranscript() {
    const transcriptObject = {
      date: document.getElementById("transcriptDate").value,
      grade: document.getElementById("transcriptGrade").value,
      category: document.getElementById("transcriptCategory").value,
      credit: document.getElementById("transcriptCredit").value,
      schoolYear: document.getElementById("transcriptSchoolYear").value,
      semester: document.getElementById("transcriptSemester").value,
      school: document.getElementById("transcriptSchool")?.value,
      altTeacher: document.getElementById("transcriptAltTeacher")?.value,
      altCourse: document.getElementById("transcriptAltCourse")?.value,
      student: this.props.studentId,
    };
    const transcript = await transcriptService.create(transcriptObject);
    fetcher(`${baseURL}/transcripts`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          transcript: data,
        });
      });
    console.log(transcript);
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
          onClick={() => this.setState({ modal: true })}
        >
          Create Transcript Entry
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Form>
              <h3>Entry for {this.props.student.firstName}</h3>
              <Container>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="transcriptDate">Date</Label>
                      <Input
                        type="date"
                        name="transcriptDate"
                        id="transcriptDate"
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup check>
                      <Label check>Grade</Label>
                      <Input type="select" id="transcriptGrade">
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
                        type="select"
                        name="transcriptCredit"
                        id="transcriptCredit"
                      >
                        <option></option>
                        <option>0.5</option>
                        <option>1</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup check>
                      <Label check>Category</Label>
                      <Input type="select" id="transcriptCategory">
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
                        type="text"
                        name="transcriptSchool"
                        id="transcriptSchool"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Container>
              <Container>
                <h3>Inside Aspire</h3>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="transcriptSchoolYear">School Year</Label>
                      <Input
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
                      <Label for="transcriptSemester">Course</Label>
                      <Input
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
                <h3>Outside of Aspire</h3>
                <FormGroup>
                  <Label for="transcriptAltTeacher">Teacher</Label>
                  <Input
                    type="text"
                    name="transcriptAltTeacher"
                    id="transcriptAltTeacher"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="transcriptAltCourse">Course</Label>
                  <Input
                    type="text"
                    name="transcriptAltCourse"
                    id="transcriptAltCourse"
                  />
                </FormGroup>
              </Container>
              <Button
                color="primary"
                onClick={() => {
                  this.createTranscript();
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
