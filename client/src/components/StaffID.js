import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";

var Barcode = require("react-barcode");

export default class StaffID extends Component {
  render() {
    return (
      <Container
        style={{
            width: 600,
          backgroundColor: "white",
          backgroundImage:
            "url(https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/images/AspireOwlGraphic.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "75%",
          backgroundPosition: "center",
          display: "inline-block",
          border: "2px solid black",
        }}
      >
        <Row>
          <Col style={{ justifyContent: "center" }} xs="4">
            <Row>
              <img
                className="image1"
                style={{ width: 150, borderRadius: 60 / 2, margin: "5px" }}
                src={`https://qyctrtcwtwasdktftmuy.supabase.in/storage/v1/object/public/images/${this.props.teacher?.firstName}${this.props.teacher?.lastName}.jpg`}
              />
            </Row>
            <Row style={{ justifyContent: "center", textShadow: "1px 1px white", }}>
              <strong>
                {this.props.teacher?.firstName} {this.props.teacher?.lastName}
                <br />
                AZ Aspire Academy
              </strong>
            </Row>
          </Col>
          <Col
            xs="5"
            style={{ position: "relative", justifyContent: "center" }}
          >
            <Row
              style={{
                left: "25%",
                top: "0",
                position: "absolute",
                justifyContent: "center",
                textShadow: "1px 1px white",
              }}
            >
              <strong style={{ justifyContent: "center", fontSize: "150%", }}>
                {this.props.teacher?.campus.name}
              </strong>
            </Row>
            <Row
              style={{
                left: "15%",
                bottom: "0",
                position: "absolute",
                justifyContent: "center",
                textShadow: "1px 1px white",
              }}
            >
              <strong style={{ justifyContent: "center", fontSize: "200%", }}>2021-2022</strong>
            </Row>
          </Col>
          <Col
            xs="3"
            style={{ position: "relative", justifyContent: "right", textShadow: "1px 1px white", }}
          >
            <strong style={{ justifyContent: "center", right: "0", fontSize: "125%" }}>
              {this.props.teacher?.role.name}
            </strong>
            <Row
              style={{
                right: "15px",
                bottom: "0",
                position: "absolute",
              }}
            >
              <Barcode
                style={{ height: 50, width: 50 }}
                value={this.props.teacher?.id}
              />
            </Row>
          </Col>
        </Row>
        <Row
          style={{
            justifyContent: "center",
            fontFamily: "'Brush Script MT', cursive",
            fontSize: "200%",
            textShadow: "1px 1px white",
          }}
        >
          <p>Education on your terms</p>
        </Row>
      </Container>
    );
  }
}
