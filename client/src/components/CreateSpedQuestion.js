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
import { spedQuestionService } from "../services/spedQuestionService";
import { fetcher } from '../services/fetcher';
import Draggable from 'react-draggable';


export class SpedQuestionCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  async createSpedQuestion() {
    const spedQuestionObject = {
      date: document.getElementById("spedQuestionDate").value,
      question: document.getElementById("spedQuestionQuestion").value,
      category: document.getElementById("spedQuestionCategory").value,
      student: this.props.studentId,
    };
    const spedQuestion = await spedQuestionService.create(spedQuestionObject);
    fetcher(`${baseURL}/spedQuestions`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        spedQuestion: data,
      });
    });
    console.log(spedQuestion);
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button outline color="success" onClick={() => this.setState({ modal: true })}>
          Create IEP Question
        </Button>
        <Draggable>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="spedQuestionDate">Date</Label>
                <Input
                  type="date"
                  name="spedQuestionDate"
                  id="spedQuestionDate"
                />
              </FormGroup>
              <FormGroup check>
                  <Label check>Category</Label>
                    <Input 
                    type="select"
                    id="spedQuestionCategory">
                      <option></option>
                      <option>ELA</option>
                      <option>Math</option>
                      <option>Social</option>
                    </Input>
                </FormGroup>
              <FormGroup>
                <Label for="spedQuestionQuestion">Question</Label>
                <Input
                  type="text"
                  name="spedQuestionQuestion"
                  id="spedQuestionQuestion"
                />
              </FormGroup>
              <Button
                color="primary"
                onClick={() => {
                  this.createSpedQuestion();
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
        </Draggable>
      </div>
    );
  }
}
