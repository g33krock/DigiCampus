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
import Draggable from 'react-draggable';

export class GradebookCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  async createGradebook() {
    const gradebookObject = {
      students: this.props.student.id,
      teachers: this.props.teacher.id,
      schedule: this.props.id,
      courses: this.props.course.id,
      period: this.props.period,
      pointsEarned: document.getElementById("pointsEarned").value,
      pointsAvailable: document.getElementById("pointsAvailable").value,
      assignmentDate: Date.now(),
      name: document.getElementById("name").value,
    };
    const gradebook = await gradebookService.create(gradebookObject);
    console.log(gradebook);
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
        <Draggable>
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
            <p>
              <strong>Student: </strong>
              {this.props.student?.firstName} {this.props.student?.lastName}
            </p>
            <p>
              <strong>Teacher: </strong>
              {this.props.teacher?.firstName} {this.props.teacher?.lastName}
            </p>
            <p>
              <strong>Course: </strong>
              {this.props.course?.name}
            </p>
            <p>
              <strong>Period: </strong>
              {this.props?.period}
            </p>
            <Form className="fancy-cursor">
              <FormGroup id="trackerBox">
                <Label for="name">
                  <h3>Assignment Name</h3>
                </Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
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
                  id="pointsEarned"
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
                  id="pointsAvailable"
                  className="fancy-cursor"
                />
              </FormGroup>
              <Button
                color="primary"
                onClick={() => {
                  this.createGradebook();
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
        </Draggable>
      </div>
    );
  }
}
