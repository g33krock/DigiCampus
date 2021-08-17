import React, { Component } from "react";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";
import { baseURL } from "../baseURL";
import { fetcher } from "../services/fetcher";
import { AnnouncementUpdater } from "./UpdateAnnouncementComponent";

export default class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = { announcements: [] };
  }

  async componentDidMount() {
    this.getAnnouncements()

  }

  getAnnouncements() {
    fetcher(`${baseURL}/announcements`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        announcements: data,
      });
    });
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
                    callback={() => this.getAnnouncements()}
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
