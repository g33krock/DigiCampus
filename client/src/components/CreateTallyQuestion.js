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
import { tallyQuestionService } from "../services/tallyQuestionService";
import { fetcher } from '../services/fetcher';


export class TallyQuestionCreator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  async createTallyQuestion() {
    const tallyQuestionObject = {
      date: document.getElementById("tallyQuestionDate").value,
      question: document.getElementById("tallyQuestionQuestion").value,
      category: document.getElementById("tallyQuestionCategory").value,
      student: this.props.student.id,
    };
    const tallyQuestion = await tallyQuestionService.create(tallyQuestionObject);
    fetcher(`${baseURL}/tallyQuestions`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        tallyQuestion: data,
      });
    });
    console.log(tallyQuestion);
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button outline color="success" onClick={() => this.setState({ modal: true })}>
          Create Tally Question
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="tallyQuestionDate">Date</Label>
                <Input
                  type="date"
                  name="tallyQuestionDate"
                  id="tallyQuestionDate"
                />
              </FormGroup>
              <FormGroup check>
                  <Label check>Category</Label>
                    <Input 
                    type="select"
                    id="tallyQuestionCategory">
                      <option>Other</option>
                      <option>Behavior</option>
                      <option>Engagement</option>
                      <option>Comprehension</option>
                    </Input>
                </FormGroup>
              <FormGroup>
                <Label for="tallyQuestionQuestion">Question</Label>
                <Input
                  type="text"
                  name="tallyQuestionQuestion"
                  id="tallyQuestionQuestion"
                />
              </FormGroup>
              <Button
                color="primary"
                onClick={() => {
                  this.createTallyQuestion();
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