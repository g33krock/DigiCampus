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
import { spedQuestionService } from "../services/spedQuestionService";
import Draggable from 'react-draggable';

export class SpedQuestionUpdater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }

  async updateSpedQuestion() {
    const spedQuestionObject = {
        date: document.getElementById("spedQuestionDate").value,
        question: document.getElementById("spedQuestionQuestion").value,
        category: document.getElementById("spedQuestionCategory").value,
        id: this.props.spedQuestionId,
    };
    const spedQuestion = await spedQuestionService.update(spedQuestionObject);
    console.log(spedQuestion)
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button outline color="primary" size="sm" onClick={() => this.setState({ modal: true })}>
          Update Question
        </Button>
        <Draggable>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="spedQuestionDate">Date</Label>
                <Input
                  defaultValue={this.props.spedQuestionDate}
                  type="date"
                  name="spedQuestionDate"
                  id="spedQuestionDate"
                />
              </FormGroup>
              <FormGroup>
                <Label for="spedQuestionQuestion">Question</Label>
                <Input
                  defaultValue={this.props.spedQuestionQuestion}
                  type="text"
                  name="spedQuestionQuestion"
                  id="spedQuestionQuestion"
                />
              </FormGroup>
              <FormGroup>
                <Label for="spedQuestionCategory">Grade Level</Label>
                <Input type="select" name="spedQuestionCategory" id="spedQuestionCategory" defaultValue={this.props.spedQuestionCategory}>
                  <option>ELA</option>
                  <option>Math</option>
                  <option>Social</option>
                </Input>
              </FormGroup>
              <Button
                color="primary"
                onClick={() => {
                  this.updateSpedQuestion();
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
