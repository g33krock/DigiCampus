import { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { AprilFools } from "./AprilFoolsComponent";
import Calendar from "./CalendarComponent";

class Home extends Component {
  render() {
    return (
      <div className="megaBG">
        <Container>
          <Row>
            <Col />
            <Col style={{paddingLeft: "auto", paddingRight: "auto"}}>
              <AprilFools style={{marginLeft: "auto", marginRight: "auto"}}/>
            </Col>
            <Col />
          </Row>
          <Row>
            <Col />
            <Col>
              <Calendar />
            </Col>
            <Col />
          </Row>
          {/* <div class="calendly-inline-widget" dangerouslySetInnerHTML={{ __html: '<iframe src="https://calendly.com/dallas-lovell/test" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>'}} />
        <script type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"></script> */}
        </Container>
      </div>
    );
  }
}

export default Home;
