import { Component } from "react";
import { Button, Modal, ModalBody, Form } from "reactstrap"; 
import { transcriptService } from "../services/transcriptService";
  export class DeleteTranscript extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
      };
    }
    render() {
      return (
        <div>
          <Button outline color="danger" size="sm" onClick={() => this.setState({ modal: true })}>
            Delete Question
          </Button>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalBody>
              <Form>
                <h2>Are you sure you want to delete: {this.props.transcript}?</h2>
                <Button
                  outline color="primary"
                  onClick={() => {
                    this.deleteTranscript();
                    this.setState({ modal: false });
                  }}
                >
                  Submit
                </Button>
                <Button
                  outline color="danger"
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
    deleteTranscript(){
      const transcriptObject = {
        transcriptId: this.props.transcriptId
      };
      const transcript =  transcriptService.delete(transcriptObject);
      console.log(transcript)
    }
  }

    
    
