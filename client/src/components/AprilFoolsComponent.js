import { Component } from "react";
import { Button, Media, Modal, ModalBody, Row } from "reactstrap";

export class AprilFools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
  }
  playClick(url) {
    let a = new Audio(url);
    a.play();
  }

  toggle() {
    return !this.state.modal;
  }

  render() {
    return (
      <div>
        <Button
        size="lg"
          color="success"
          style={{
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "5px",
          }}
          onClick={() => this.setState({ modal: true })}
        >
          Click Me
        </Button>
        <Modal isOpen={this.state.modal} toggle={() => this.toggle()}>
          <ModalBody
            id="fancy-cursor"
            style={{
              backgroundColor: "#89cff0",
              color: "black",
              fontSize: "21px",
              textAlign: "center",
              border: "8px solid green"
            }}
          >
            <Row>
              <h3
                style={{
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                Happy April Fools Day!!!
              </h3>
            </Row>
            <Row>
              <Media
                style={{
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                object
                src="https://qyctrtcwtwasdktftmuy.supabase.co/storage/v1/object/public/images/DallasRoll.gif"
                alt="DallasRoll"
              />
            </Row>
            <Row>
              <Button
                style={{
                  textAlign: "center",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "5px",
                }}
                color="danger"
                onClick={() => {
                  this.setState({ modal: false });
                }}
              >
                I acknowledge that I've been Rick-Rolled
              </Button>
            </Row>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
