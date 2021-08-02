import { Component } from "react";
import {baseURL} from "../baseURL";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";
import { guardianService } from "../services/guardianService";
import { fetcher } from '../services/fetcher';


export class GuardianCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  async createGuardian() {
    const guardianObject = {
      student: this.props.studentId,
      firstName: document.getElementById("guardianFirstName").value,
      lastName: document.getElementById("guardianLastName").value,
      phone: document.getElementById("guardianPhone").value,
      email: document.getElementById("guardianEmail").value,
      address: document.getElementById("guardianAddress").value,
      additional_info: document.getElementById("guardianAdditionalInfo").value
    };
    const guardian = await guardianService.create(guardianObject);
    fetcher(`${baseURL}/spedQuestions`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        guardians: data,
      });
    });
    console.log(guardian);
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button outline color="primary" size="sm" onClick={() => this.setState({ modal: true })}>
          Add Guardian
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="guardianFirstName">Guardian First Name</Label>
                <Input
                  type="text"
                  name="guardianFirstName"
                  id="guardianFirstName"
                />
              </FormGroup>
              <FormGroup>
                <Label for="guardianLastName">Guardian Last Name</Label>
                <Input
                  type="text"
                  name="guardianLastName"
                  id="guardianLastName"
                />
              </FormGroup>
              <FormGroup>
                <Label for="guardianPhone">Phone</Label>
                <Input type="text" name="guardianPhone" id="guardianPhone">
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="guardianEmail">Email</Label>
                <Input type="email" name="guardianEmail" id="guardianEmail">
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="guardianAddress">Address</Label>
                <Input type="text" name="guardianAddress" id="guardianAddress">
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="guardianAdditionalInfo">Additional Info</Label>
                <Input type="text" name="guardianAdditionalInfo" id="guardianAdditionalInfo">
                </Input>
              </FormGroup>
              <Button
                color="primary"
                onClick={() => {
                  this.createGuardian();
                  this.setState({ modal: false })
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
