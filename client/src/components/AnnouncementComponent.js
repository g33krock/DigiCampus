import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardDeck,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { announcementService } from "../services/announcementService";
import { AnnouncementUpdater } from "./UpdateAnnouncementComponent";

export default class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = { announcements: [] };
  }

  async componentDidMount() {
    const announcements = await announcementService.all();
    this.setState({ announcements });
    console.log(this.state.announcements);
  }

  render() {
    return (
      <Row>
        
          {this.state.announcements.map((announcement) => {
            return (
              <Col>
                <Card body className="text-center">
                  <CardTitle>{announcement.head}</CardTitle>
                  <br />
                  <CardBody>
                    <CardText>{announcement.body}</CardText>
                  </CardBody>
                  <AnnouncementUpdater
                    announcement = {announcement}
                    announcementId = {announcement.id}
                    announcementHead = {announcement.head}
                    announcementBody = {announcement.body}
                  ></AnnouncementUpdater>
                </Card>
              </Col>
            );
          })}
        
      </Row>
    );
  }
}
