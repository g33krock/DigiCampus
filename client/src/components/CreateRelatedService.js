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
import { relatedServiceService } from "../services/relatedServiceService";
import { fetcher } from "../services/fetcher";

export class RelatedServiceCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      providers: [],
      relatedServiceRoles: [],
    };
  }

  componentDidMount() {
    fetcher(`${baseURL}/teachers`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          providers: data,
        });
      });
    fetcher(`${baseURL}/relatedServiceRoles`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          relatedServiceRoles: data,
        });
      });
  }

  async createRelatedService() {
    const relatedServiceObject = {
      student: this.props.studentId,
      teacher: document.getElementById("relatedServiceName").value,
      relatedServiceRole: document.getElementById("relatedServiceRole").value,
    };
    const relatedService = await relatedServiceService.create(
      relatedServiceObject
    );
    fetcher(`${baseURL}/relatedServices`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          relatedServices: data,
        });
      });
    console.log(relatedService);
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
          Add RelatedService
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Form>
              <Row>
                <Col>
              <FormGroup>
                <Label for="relatedServiceName">Provider Name</Label>
                <Input
                  type="select"
                  name="relatedServiceName"
                  id="relatedServiceName"
                >
                  <option></option>
                  {this.state.providers
                    .filter((provider) => provider.role.id === 8)
                    .map((provider) => (
                      <option value={provider.id}>
                        {provider.firstName} {provider.lastName}
                      </option>
                    ))}
                    <option value="95">Claudia Bennett</option>
                    <option value="124">Linda Howell</option>
                </Input>
              </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                <Label for="relatedServiceRole">Service Type</Label>
                <Input
                  type="select"
                  name="relatedServiceRole"
                  id="relatedServiceRole"
                >
                  <option></option>
                  {this.state.relatedServiceRoles
                    .map((role) => (
                      <option value={role.id}>
                        {role.type}
                      </option>
                    ))}
                </Input>
              </FormGroup>
              </Col>
              </Row>
              <Button
                color="primary"
                onClick={() => {
                  this.createRelatedService();
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
