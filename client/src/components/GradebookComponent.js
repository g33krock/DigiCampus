import { Component } from "react";
import { baseURL } from "../baseURL";
import {
  Button,
  Modal,
  ModalBody,
  Card,
  CardTitle,
  CardBody,
} from "reactstrap";
import { fetcher } from "../services/fetcher";

export class ClassGrades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gradebooks: [],
      modal: false,
    };
  }

  toggle() {
    return !this.state.modal;
  }

  componentDidMount() {
    fetcher(`${baseURL}/gradebooks`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          gradebooks: data,
        });
      });
  }

  render() {
    const gradebooks = this.state.gradebooks
      .filter((gradebook) => gradebook.courses.id === this.props.course.id)
      .filter((gradebook) => gradebook.students.id === this.props.student.id);
    console.log(gradebooks);
    return (
      <div>
        <Button color="link" onClick={() => this.setState({ modal: true })}>
          Grades
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <h3>
              {this.props.student?.firstName} {this.props.student?.lastName}{" "}
              {this.props.course.name}
            </h3>
            {gradebooks.map((gradebook) => (
              <Card>
                <CardBody>
                  <div>
                    <p>Assignment: {gradebook.name}</p>
                    <p>
                      Points: {gradebook.pointsEarned}/
                      {gradebook.pointsAvailable}
                    </p>
                  </div>
                </CardBody>
              </Card>
            ))}

            <Button
              color="danger"
              onClick={() => this.setState({ modal: false })}
            >
              Close
            </Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
