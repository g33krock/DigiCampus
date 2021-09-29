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
import { gradebookService } from "../services/gradebookService";

export class GroupGradebookCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      block: null
    };
  }

  async createGradebook(i) {
    const gradebookObject = {
      students: i.student.id,
      teachers: i.teacher.id,
      schedule: i.id,
      courses: i.course.id,
      period: i.period,
      pointsEarned: document.getElementById("pointsEarned"+i.id).value,
      pointsAvailable: document.getElementById("pointsAvailable"+i.id).value,
      assignmentDate: Date.now(),
      name: document.getElementById("name"+i.id).value,
    };
    const gradebook = await gradebookService.create(gradebookObject);
    console.log(gradebook);
  }

  createGradebookNinja(){
    this.state.block.forEach((studentGrade) =>
    this.updateSchedule(studentGrade)
  );
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button color="link" onClick={() => this.setState({ modal: true })}>
          Gradebook
        </Button>
        <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
          <ModalBody
            id="fancy-cursor"
            style={{
              backgroundColor: "lightgray",
              color: "black",
              fontSize: "21px",
              textAlign: "center",
            }}
          >
                          <Form className="fancy-cursor">
              {this.props.block.map((sched) => (
                  <div>
            <p>
              <strong>Student: </strong>
              {sched.student?.firstName} {sched.student?.lastName}
            </p>
            <p>
              <strong>Teacher: </strong>
              {sched.teacher?.firstName} {sched.teacher?.lastName}
            </p>
            <p>
              <strong>Course: </strong>
              {sched.course?.name}
            </p>
            <p>
              <strong>Period: </strong>
              {sched?.period}
            </p>

              <FormGroup id="trackerBox">
                <Label for="name">
                  <h3>Assignment Name</h3>
                </Label>
                <Input
                  type="text"
                  name="name"
                  id={`name${sched.student.id}`}
                  className="fancy-cursor"
                ></Input>
              </FormGroup>
              <FormGroup id="trackerBox">
                <Label for="pointsEarned">
                  <h3>Points Earned</h3>
                </Label>
                <Input
                  type="number"
                  name="pointsEarned"
                  id={`pointsEarned${sched.student.id}`}
                  className="fancy-cursor"
                ></Input>
              </FormGroup>
              <FormGroup id="trackerBox">
                <Label for="pointsAvailable">
                  <h3>Points Available</h3>
                </Label>
                <Input
                  type="number"
                  name="pointsAvailable"
                  id={`pointsAvailable${sched.student.id}`}
                  className="fancy-cursor"
                />
              </FormGroup>
              </div>
              ))}
              <Button
                color="primary"
                onClick={() => {
                  this.createGradebookNinja();
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