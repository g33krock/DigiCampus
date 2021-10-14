import { Component } from "react";
import {
  Button,
  Modal,
  ModalBody,
  Card,
  CardTitle,
  CardBody,
} from "reactstrap";

export class StudentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button color="link" onClick={() => this.setState({ modal: true })}>
          Student Info
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Card>
              <CardTitle>
                <h3>{this.props.student?.firstName} {this.props.student?.lastName}</h3>
              </CardTitle>
              <CardBody>
                <p><strong>Grade:</strong> {this.props.student?.grade}</p>
                {this.props.student?.guardians.map((guardian) => (
                  <div>
                    <p>
                      <strong>Parent:</strong> {guardian?.firstName} {guardian?.lastName}
                    </p>
                    <p><strong>Email:</strong> {guardian?.email}</p>
                    <p><strong>Phone:</strong> {guardian?.phone}</p>
                    <p><strong>Address:</strong> {guardian?.address}</p>
                  </div>
                ))}
                <p><strong>Birthday:</strong> {this.props.student?.birthDate}</p>
                <p><strong>Funding:</strong> {this.props.student?.funding.type}</p>
                <p><strong>Instruction Mode:</strong> {this.props.student?.instructionmode.type}</p>
                <p><strong>Allergies:</strong> {this.props.student?.allergies}</p>
                <p><strong>Hearing:</strong> {this.props.student?.hearingLimitations}</p>
                <p><strong>Vision:</strong> {this.props.student?.visionLimitations}</p>
                <p><strong>Mobility:</strong> {this.props.student?.mobilityLimitations}</p>
                <p><strong>Sensitivities:</strong> {this.props.student?.sensitivities}</p>
                <p><strong>Social:</strong> {this.props.student?.social}</p>
                <p><strong>Emotional:</strong> {this.props.student?.emotional}</p>
                <p><strong>Physical:</strong> {this.props.student?.physical}</p>
                <p><strong>Math:</strong> {this.props.student?.math}</p>
                <p><strong>Reading:</strong> {this.props.student?.reading}</p>
                <p><strong>Writing:</strong> {this.props.student?.writing}</p>
                <p><strong>Interests:</strong> {this.props.student?.interests}</p>
                <p><strong>Receives Daily Report:</strong> {this.props.student?.dailyReport}</p>
              </CardBody>
            </Card>
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
