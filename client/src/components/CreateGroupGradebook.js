import { Component } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Modal,
  ModalBody,
  Table,
} from "reactstrap";
import { gradebookService } from "../services/gradebookService";
import Draggable from 'react-draggable';

export class GroupGradebookCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      block: null,
    };
  }

  componentDidMount() {
    console.log(this.props.block);
  }

  async createGradebook(i) {
    const gradebookObject = {
      students: i.student.id,
      teachers: i.teacher.id,
      schedule: i.id,
      courses: i.course.id,
      period: i.period,
      pointsEarned: document.getElementById("pointsEarned" + i.student.id)
        .value,
      pointsAvailable: document.getElementById("pointsAvailable" + i.student.id)
        .value,
      assignmentDate: Date.now(),
      name: document.getElementById("name").value,
    };
    const gradebook = await gradebookService.create(gradebookObject);
    console.log(gradebook);
  }

  createGradebookNinja() {
    this.state.block.forEach((studentGrade) =>
      this.createGradebook(studentGrade)
    );
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button
          color="link"
          onClick={() => {
            this.setState({ modal: true });
            this.setState({ block: this.props.block });
          }}
        >
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
            {/* <p>
              <strong>Teacher: </strong>
              {this.props.block[0].teacher?.firstName} {this.props.block[0].teacher?.lastName}
            </p>
            <p>
              <strong>Course: </strong>
              {this.props.block[0].course?.name}
            </p>
            <p>
              <strong>Period: </strong>
              {this.props.block[0]?.period}
            </p> */}
            <Form className="fancy-cursor">
              <FormGroup id="trackerBox">
                <Label for="name">
                  <h3>Assignment Name</h3>
                </Label>
                <Input
                  type="text"
                  name="name"
                  id={`name`}
                  className="fancy-cursor"
                ></Input>
              </FormGroup>
              <Table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Points Earned</th>
                    <th>Points Available</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.block.map((sched) => (
                    <tr>
                      <td>
                        {sched.student?.firstName} {sched.student?.lastName}
                      </td>
                      <td>
                        <FormGroup id="trackerBox">
                          <Input
                            type="number"
                            name="pointsEarned"
                            id={`pointsEarned${sched.student.id}`}
                            className="fancy-cursor"
                          ></Input>
                        </FormGroup>
                      </td>
                      <td>
                        <FormGroup id="trackerBox">
                          <Input
                            type="number"
                            name="pointsAvailable"
                            id={`pointsAvailable${sched.student.id}`}
                            className="fancy-cursor"
                          />
                        </FormGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

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
        </Draggable>
      </div>
    );
  }
}
