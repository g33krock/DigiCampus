import React, { Component } from "react";
import { baseURL } from "../baseURL";
import { Card, Title, CardBody,} from "reactstrap";
import { fetcher } from "../services/fetcher";

export default class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = { announcements: null };
  }

  componentDidMount() {
    fetcher(`${baseURL}/announcements`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          announcements: data,
        });
      });
  }

  render() {
    {
      this.state.announcements.map((announcement) => {
        return (
        <Card>
            <Title>{announcement.head}</Title>
            <br />
            <CardBody>{announcement.body}</CardBody>
        </Card>);
      });
    }
  }
}
