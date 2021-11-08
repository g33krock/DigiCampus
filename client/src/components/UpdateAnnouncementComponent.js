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
import { announcementService } from "../services/announcementService";
import Draggable from 'react-draggable';

export class AnnouncementUpdater extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      announcement: this.props.announcement
    };
  }

  async updateAnnouncement() {
    const announcementObject = {
        head: document.getElementById("announcementHead").value,
        body: document.getElementById("announcementBody").value,
        id: this.state.announcement.id,
    };
    await announcementService.update(announcementObject);
    setTimeout(() => {  this.props.callback() }, 2000);
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button outline color="primary" size="sm" onClick={() => this.setState({ modal: true })}>
          Update Announcement
        </Button>
        <Draggable>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="announcementHead">Title</Label>
                <Input
                  defaultValue={this.props.announcementHead}
                  type="text"
                  name="announcementHead"
                  id="announcementHead"
                />
              </FormGroup>
              <FormGroup>
                <Label for="announcementBody">Body</Label>
                <Input
                  defaultValue={this.props.announcementBody}
                  type="text"
                  name="announcementBody"
                  id="announcementBody"
                />
              </FormGroup>
              <Button
                color="primary"
                onClick={() => {
                  this.updateAnnouncement();
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
