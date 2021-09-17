import { Component } from "react";
import { baseURL } from "../baseURL";
import {
  Button,
  Modal,
  ModalBody,
  Card,
  CardTitle,
  CardBody,
  Row,
  Col,
} from "reactstrap";
import {GradeCalc} from "./GradeCalcComponent"
import { fetcher } from "../services/fetcher";

export class ClassGrades extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gradebooks: [],
      gradebook:[],
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

  async whatsGoingOnHere() {
    await this.setState({ gradebook:this.gradebooks })
    await console.log(this.state.gradebook)
  }

  

  render() {
    const gradebook = this.state.gradebook
    const gradebooks = this.state.gradebooks
      .filter((gradebook) => gradebook.courses.id === this.props.course.id)
      .filter((gradebook) => gradebook.students.id === this.props.student.id)
      .filter((gradebook) => gradebook.pointsAvailable > 0 );
    console.log(gradebooks);
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    return (
      <div>
        <Button color="link" onClick={() => {this.setState({ modal: true })}}>
          Grades
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Row>
              <Col>
                <h3>
                  {this.props.student?.firstName} {this.props.student?.lastName}{" "}
                  {this.props.course.name}
                </h3>
              </Col>
              <Col>
              <GradeCalc
              gradebook={gradebooks} />
              </Col>
            </Row>
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
