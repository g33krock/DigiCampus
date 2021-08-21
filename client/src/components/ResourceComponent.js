import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardLink,
  Row,
  Col,
} from "reactstrap";

export default class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <Row>

              <Col>
                <Card body className="text-center">
                  <CardTitle>STEAM Curriculum</CardTitle>
                  <br />
                  <CardBody>
                    <CardText>Curriculum for Art/STEM, otherwise known as... STEAM</CardText>
                  </CardBody>
                  <CardLink href="https://drive.google.com/drive/folders/1q57URLhny9zFjPIaxXk2Y5XI7_hfhnwC?usp=sharing">STEAM Curriculum</CardLink>
                </Card>
              </Col>

      </Row>
    );
  }
}
