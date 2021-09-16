import { Component } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Modal,
  ModalBody,
  Row,
  Col,
  CustomInput,
} from "reactstrap";
import { timecardService } from "../services/timecardService";

export class TimeCardOverride extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      teachers: null,
      courses: null,
      name: null,
      campus: null,
    };
  }

  async updateTimeCard() {
    const timecardObject = {
      id: this.props.timecardId,
      date: document.getElementById("timecardDate").value,
      time: document.getElementById("timecardTime").value+":00",
      inOut: document.getElementById("timecardInOut").value,
      teacher: this.props.teacher.id,

    };
    await timecardService.update(timecardObject);
    await this.props.callback();
    this.setState({ modal: false });
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
          {this.props.date} - {this.props.inOut}: {this.props.time}
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="timecardDate">Date</Label>
                    <Input
                      type="date"
                      name="date"
                      id="timecardDate"
                      defaultValue={this.props.date}
                    />
                  </FormGroup>
                </Col>
                <FormGroup>
                  <Label for="timecardTime">Time</Label>
                  <Input
                    type="time"
                    name="time"
                    id="timecardTime"
                    defaultValue={this.props.time}
                  />
                </FormGroup>
              </Row>
              <FormGroup>
                      <Label for="timecardInOut">In/Out</Label>
                      <Input
                        type="select"
                        name="timecardInOut"
                        id="timecardInOut"
                        defaultValue={this.props.inOut}
                        className="fancy-cursor"
                      >
                        <option value="In">Check-In</option>
                        <option value="Out">Check-Out</option>

                      </Input>
                    </FormGroup>

              <Button
                color="primary"
                onClick={() => {
                  this.updateTimeCard();
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
