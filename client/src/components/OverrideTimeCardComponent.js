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
      time: document.getElementById("timecardTime").value,
      inOut: document.addEventListener('DOMContentLoaded', function () {
        var checkbox = document.querySelector('input[type="switch"]');
      
        checkbox.addEventListener('change', function () {
          if (checkbox.checked) {
            console.log('In')
            return "In";
          } else {
            console.log('Out')
            return "Out";
          }
        });
      }),
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
          Update TimeCard
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
                      placeholder={this.props.date}
                    />
                  </FormGroup>
                </Col>
                <FormGroup>
                  <Label for="timecardTime">Time</Label>
                  <Input
                    type="time"
                    name="time"
                    id="timecardTime"
                    placeholder={this.props.time}
                  />
                </FormGroup>
              </Row>
              <FormGroup>
                <Label for="Out/In">{`<--Out/In-->`}</Label>
                <div>
                  <CustomInput type="switch" id="inoutSwitch" name="customSwitch" label={`<--Out/In-->`} />
                </div>
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
