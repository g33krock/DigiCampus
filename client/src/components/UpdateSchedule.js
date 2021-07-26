import { Component } from "react";
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

export class ScheduleUpdater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      teachers: null,
      courses: null,
      name: null,
      campus: null
    };
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
                <Input type="select" id="scheduleTeacher" defaultValue={this.props.teacher.id}>
                  <option value='26' selected>None</option>
                  {this.props.teachers?.filter((teacher) => teacher.campus.id === this.props?.campus.id)
                  .sort(function(a, b){
                    let x = a.firstName.toLowerCase();
                    let y = b.firstName.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;})
                  .map((teacher) => (
                    <option value={teacher.id}>
                      {teacher.firstName} {teacher.lastName}
                    </option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="scheduleCourse">Select Course</Label>
                <Input type="select" id="scheduleCourse" defaultValue={this.props.course.id}>
                <option value='15' selected>None</option>
                  {this.props.courses
                  .sort(function (a, b){
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();
                    if (x < y) {return -1;}
                    if (x > y) {return 1;}
                    return 0;}).map((course) => (
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
