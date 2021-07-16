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
} from "reactstrap";
import { scheduleService } from "../services/scheduleService";
import { fetcher } from '../services/fetcher';

export class ScheduleUpdater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      teachers: null,
      courses: null,
      name: null
    };
  }

  componentDidMount() {
    // Fetch Student Table from API
    fetcher(`${baseURL}/teachers`)
      // Convert response to a JSON object
      .then((response) => response.json())
      .then((data) => {
        // Create relationship between students state array and JSON object
        this.setState({
          teachers: data,
        });
      });
    fetcher(`${baseURL}/courses`)
      // Convert response to a JSON object
      .then((response) => response.json())
      .then((data) => {
        // Create relationship between students state array and JSON object
        this.setState({
          courses: data,
        });
      });
  }

  async updateSchedule() {
    const scheduleObject = {
      id: this.props.scheduleId,
      teacher: parseInt(document.getElementById("scheduleTeacher").value),
      course: parseInt(document.getElementById("scheduleCourse").value),
      period: this.props.period
    };
    await scheduleService.update(scheduleObject);
    await this.props.callback()
    this.setState({ modal: false })
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button 
        size="sm"
          color="link"
          onClick={() => this.setState({ modal: true })}
        >
          Update Schedule
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="scheduleTeacher">Select Teacher</Label>
                <Input type="select" id="scheduleTeacher">
                  <option value='26' selected>None</option>
                  {this.state.teachers?.map((teacher) => (
                    <option value={teacher.id}>
                      {teacher.firstName} {teacher.lastName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Input type="select" id="scheduleCourse">
                <option value='15' selected>None</option>
                  {this.state.courses?.map((course) => (
                    <option value={course.id}>{course.name}</option>
                  ))}
                </Input>
              </FormGroup>
              <Button
                color="primary"
                onClick={() => {
                  this.updateSchedule();
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
