import React, { Component } from "react";
import {
  Card,
  Row,
  Col,
  CardImg,
  CardBody,
  Label,
  Container,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  TabContent,
} from "reactstrap";

var Barcode = require("react-barcode");

export default class StudentID extends Component {
  render() {
    return (
      <Container
        style={{
          backgroundColor: "white",
          backgroundImage:
            "url(https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/images/AspireOwlGraphic.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Row>
          <Col>
            <Row>
              <img
                className="image1"
                style={{ width: 150, borderRadius: 60 / 2 }}
                src={`https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/images/${this.props.student?.firstName}${this.props.student?.lastName}.jpg`}
              />
            </Row>
            <Row>
              <Barcode
                style={{ background: "rgba(255, 255, 255, 0)" }}
                value={this.props.student?.id}
              />
            </Row>
          </Col>
          <Col>
            <Row>Tempe Campus</Row>
            <Row>
              <h3>
                {this.props.student?.firstName} {this.props.student?.lastName}
              </h3>
            </Row>
            <Row></Row>
          </Col>
        </Row>
        <Row>
          <p style={{textAlign: "center"}}>All pirates welcome</p>
        </Row>
      </Container>
    );
  }
}
