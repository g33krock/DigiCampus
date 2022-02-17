import React, { Component } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { InlineWidget } from "react-calendly";

export class VideoCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      agent: this.props.agent,
    };
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    const shop = () => {
      if (this.props.deposit === true) {
        return "none";
      } else {
        return "none";
      }
    };
    const sched = () => {
      if (this.props.deposit === true) {
        return "block";
      } else {
        return "block";
      }
    };
    return (
      <div style={{ marginTop: "5%" }}>
        <Button
          style={{ display: shop() }}
          className="videoCalendarButton"
          href="/shopify"
        >
          Schedule A 1 On 1
        </Button>
        <Button
          style={{ display: sched() }}
          className="videoCalendarButton"
          onClick={() => this.setState({ modal: true })}
        >
          Schedule A 1 On 1
        </Button>

        <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
          <ModalBody>
            <InlineWidget url={this.state.agent.calendly} />
          </ModalBody>
          <Button
            style={{ backgroundColor: this.state.agent.secondaryColor }}
            onClick={() => this.setState({ modal: false })}
          >
            Close
          </Button>
        </Modal>
      </div>
    );
  }
}
