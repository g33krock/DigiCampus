import { Component } from "react";
import { baseURL } from "../baseURL";
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
} from "reactstrap";
import { sessionInfoService } from "../services/sessionInfoService";
import { fetcher } from "../services/fetcher";
import Draggable from 'react-draggable';

export class SessionInfoCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  async createSessionInfo() {
    const sessionInfoObject = {
      student: this.props.studentId,
      teacher: this.props.teacherId,
      relatedServiceRole: this.props.relatedServiceRoleId,
      date: document.getElementById("sessionInfoDate").value,
      minutes: document.getElementById("sessionInfoMinutes").value,
      comment: document.getElementById("sessionInfoComment").value,
    };
    const sessionInfo = await sessionInfoService.create(sessionInfoObject);
    fetcher(`${baseURL}/sessionInfo`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          sessionInfos: data,
        });
      });
    console.log(sessionInfo);
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button
          outline
          color="primary"
          size="sm"
          onClick={() => this.setState({ modal: true })}
        >
          Add SessionInfo
        </Button>
        <Draggable>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <h3>
              {this.props.relatedServiceRoleType} with {this.props.studentName}
            </h3>
            <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="sessionInfoDate">Date</Label>
                    <Input
                      type="date"
                      name="sessionInfoDate"
                      id="sessionInfoDate"
                      defaultValue={this.props.today}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="sessionInfoMinutes">Minutes</Label>
                    <Input
                      type="number"
                      name="sessionInfoMinutes"
                      id="sessionInfoMinutes"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="sessionInfoComment">Comments</Label>
                <Input
                  type="text"
                  name="sessionInfoComment"
                  id="sessionInfoComment"
                ></Input>
              </FormGroup>
              <Button
                color="primary"
                onClick={() => {
                  this.createSessionInfo();
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
