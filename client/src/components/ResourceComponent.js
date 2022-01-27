import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardLink,
  Row,
  Col,
  Container,
} from "reactstrap";

export default class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <Card body className="text-center">
              <CardTitle>STEAM Curriculum</CardTitle>
              <br />
              <CardBody>
                <CardText>
                  Curriculum for Art/STEM, otherwise known as... STEAM
                </CardText>
              </CardBody>
              <CardLink href="https://drive.google.com/drive/folders/1q57URLhny9zFjPIaxXk2Y5XI7_hfhnwC?usp=sharing">
                STEAM Curriculum
              </CardLink>
            </Card>
          </Col>
          <Col>
            <Card body className="text-center">
              <CardTitle>Low Cog Resources</CardTitle>
              <br />
              <CardBody>
                <CardText>
                  Resource Folder with games, worksheets, and activities for working with our low-cog students
                </CardText>
              </CardBody>
              <CardLink href="https://drive.google.com/drive/folders/14WsaO2t1VDEu_idXVJ8MrFUNWTR6lZwc?usp=sharing">
                Low Cog Resources
              </CardLink>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card body className="text-center">
              <CardTitle>Edgenuity</CardTitle>
              <br />
              <CardBody>
                <CardText>Wanna get to Edgenuity? Click here!</CardText>
              </CardBody>
              <CardLink href="https://www.edgenuity.com/">
                Edgenuity Link
              </CardLink>
            </Card>
          </Col>
          <Col>
            <Card body className="text-center">
              <CardTitle>IXL</CardTitle>
              <br />
              <CardBody>
                <CardText>Wanna get to IXL? Click here!</CardText>
              </CardBody>
              <CardLink href="https://www.ixl.com/">IXL Link</CardLink>
            </Card>
          </Col>
          <Col>
            <Card body className="text-center">
              <CardTitle>STAR Testing</CardTitle>
              <br />
              <CardBody>
                <CardText>Wanna get to STAR? Click here!</CardText>
              </CardBody>
              <CardLink href="https://global-zone50.renaissance-go.com/welcomeportal/7627521">
                STAR Link
              </CardLink>
            </Card>
          </Col>
          <Col>
            <Card body className="text-center">
              <CardTitle>Gradebook in CC</CardTitle>
              <br />
              <CardBody>
                <CardText>Learn how to use your CyberCampus Gradebook and look cool doing it!</CardText>
              </CardBody>
              <CardLink href="https://drive.google.com/file/d/1DfDXOrEZAv36PfSnMSwt61UnOgCHmjvQ/view?usp=sharing">
                Gradebook Tutorial
              </CardLink>
            </Card>
          </Col>
          <Col>
            <Card body className="text-center">
              <CardTitle>Grant's STEAM Activities</CardTitle>
              <br />
              <CardBody>
                <CardText>A collection of activities that Grant has made in JS!</CardText>
              </CardBody>
              <CardLink href="http://steam.great-site.net/Christmas%20Activity/">
                STEAM-Site
              </CardLink>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
