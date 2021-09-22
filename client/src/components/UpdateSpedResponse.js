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
import { spedResponseService } from "../services/spedResponseService";

export class SpedResponseUpdater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  async updateSpedQuestion() {
    const spedResponseObject = {
      meet: document.getElementById("spedResponseMeet").value,
      success: parseInt(document.getElementById("spedResponseSuccess").value),
      opportunity: parseInt(
        document.getElementById("spedResponseOpportunity").value
      ),
      response: document.getElementById("spedResponseResponse").value,
      spedResponseId: this.props.spedResponseId,
      studentId: this.props.studentId,
    };
    const spedResponse = await spedResponseService.update(spedResponseObject);
    setTimeout(() => {
      this.props.callback();
    }, 2000);
    console.log(spedResponse);
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
          Update Response
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="spedResponseMeet">Meet</Label>
                <Input
                  defaultValue={this.props.spedResponseMeet}
                  type="select"
                  name="spedResponseMeet"
                  id={`spedResponseMeet`}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                  <option value="NA">Not Applicable</option>
                  <option value="IP">In Progress</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="spedResponseSuccess">Success</Label>
                <Input
                  defaultValue={this.props.spedResponseSuccess}
                  type="number"
                  name="spedResponseSuccess"
                  id={`spedResponseSuccess`}
                />
              </FormGroup>
              <FormGroup>
                <Label for="spedResponseOpportunity">Opportunity</Label>
                <Input
                  type="number"
                  name="spedResponseOpportunity"
                  id={`spedResponseOpportunity`}
                  defaultValue={this.props.spedResponseOpportunity}
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label for="spedResponseResponse">Response</Label>
                <Input
                  defaultValue={this.props.spedResponseResponse}
                  type="text"
                  name="spedResponseResponse"
                  id="spedResponseResponse"
                />
              </FormGroup>
              <Button
                color="primary"
                onClick={() => {
                  this.updateSpedQuestion();
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
